import fs from 'fs';
import path from 'path';
import { INITIAL_TEAM_MEMBERS } from '@/data/teamData';
import type { TeamMember } from '@/types';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_team.json');

/**
 * Reads local custom team members from disk
 */
function readLocalTeam(): TeamMember[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return [];
    }
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading custom team file:', err);
    return [];
  }
}

/**
 * Writes local custom team members to disk
 */
function writeLocalTeam(team: TeamMember[]) {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(team, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing custom team file:', err);
  }
}

/**
 * Checks if Supabase is configured
 */
function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY !== ''
  );
}

/**
 * Fetches all team members (base master artisans + custom staff additions)
 */
export async function getMergedTeam(): Promise<TeamMember[]> {
  // If Supabase is connected, attempt to fetch from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await (supabase
        .from('team_members') as any)
        .select('*')
        .order('order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          role: row.role,
          specialty: row.specialty || '',
          bio: row.bio || '',
          experienceYears: Number(row.experience_years || 0),
          image: row.image || '',
          quote: row.quote || '',
          favoriteCloth: row.favorite_cloth || '',
          isLeadership: Boolean(row.is_leadership),
          order: row.order ?? 99,
        }));
      }
    } catch (err) {
      console.warn('Supabase team fetch failed, falling back to local store:', err);
    }
  }

  // Fallback to local store merged with mock items
  const customMembers = readLocalTeam();
  const customMap = new Map(customMembers.map((m) => [m.id, m]));

  const merged: TeamMember[] = [];

  // Base members (or their edited custom overrides)
  for (const base of INITIAL_TEAM_MEMBERS) {
    if (customMap.has(base.id)) {
      merged.push(customMap.get(base.id)!);
      customMap.delete(base.id);
    } else {
      merged.push(base);
    }
  }

  // Any newly added custom members
  for (const extra of customMap.values()) {
    merged.push(extra);
  }

  // Sort by order ascending
  merged.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return merged;
}

/**
 * Creates or updates a team member
 */
export async function saveTeamMember(member: TeamMember): Promise<TeamMember> {
  // If Supabase configured, attempt to save in Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const dbPayload = {
        name: member.name,
        role: member.role,
        specialty: member.specialty,
        bio: member.bio,
        experience_years: member.experienceYears,
        image: member.image,
        quote: member.quote || null,
        favorite_cloth: member.favoriteCloth || null,
        is_leadership: Boolean(member.isLeadership),
        order: member.order ?? 99,
      };

      const { data, error } = await (supabase
        .from('team_members') as any)
        .upsert({ id: member.id, ...dbPayload }, { onConflict: 'id' })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          role: data.role,
          specialty: data.specialty,
          bio: data.bio,
          experienceYears: Number(data.experience_years),
          image: data.image,
          quote: data.quote,
          favoriteCloth: data.favorite_cloth,
          isLeadership: data.is_leadership,
          order: data.order,
        };
      }
    } catch (err) {
      console.warn('Supabase team save failed, falling back to local file:', err);
    }
  }

  // Save to local file
  const localList = readLocalTeam();
  const existingIdx = localList.findIndex((m) => m.id === member.id);

  if (existingIdx >= 0) {
    localList[existingIdx] = member;
  } else {
    localList.push(member);
  }

  writeLocalTeam(localList);
  return member;
}

/**
 * Deletes a team member
 */
export async function deleteTeamMember(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      await (supabase.from('team_members') as any).delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete team member failed:', err);
    }
  }

  const localList = readLocalTeam();
  const filtered = localList.filter((m) => m.id !== id);
  writeLocalTeam(filtered);
  return true;
}

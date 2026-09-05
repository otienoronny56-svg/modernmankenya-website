import { create } from 'zustand';
import { FABRIC_OPTIONS, LINING_OPTIONS } from '@/data/mockData';
import type { FabricOption, LiningOption, LapelStyle, PocketStyle, ButtonConfiguration, VentStyle, BespokeConfiguration } from '@/types';

interface BespokeState {
  config: BespokeConfiguration;
  setCategory: (category: string) => void;
  setFabric: (fabric: FabricOption) => void;
  setLapel: (lapel: LapelStyle) => void;
  setPockets: (pockets: PocketStyle) => void;
  setButtons: (buttons: ButtonConfiguration) => void;
  setVents: (vents: VentStyle) => void;
  setLining: (lining: LiningOption) => void;
  setMonogram: (text: string, color?: string, font?: string) => void;
  setNotes: (notes: string) => void;
  resetConfig: () => void;
}

const initialConfig: BespokeConfiguration = {
  category: 'bespoke-suits',
  fabric: FABRIC_OPTIONS[0],
  lapel: 'Peak',
  pockets: 'Flap',
  buttons: '2-Button',
  vents: 'Double Vent',
  lining: LINING_OPTIONS[0],
  monogramText: '',
  monogramColor: '#A88A00',
  monogramFont: 'Classic Serif',
  specialNotes: '',
  estimatedPriceKes: 165000,
};

export const useBespokeStore = create<BespokeState>((set) => ({
  config: initialConfig,

  setCategory: (category) =>
    set((state) => ({ config: { ...state.config, category } })),

  setFabric: (fabric) =>
    set((state) => ({
      config: {
        ...state.config,
        fabric,
        estimatedPriceKes: fabric.priceKes,
      },
    })),

  setLapel: (lapel) =>
    set((state) => ({ config: { ...state.config, lapel } })),

  setPockets: (pockets) =>
    set((state) => ({ config: { ...state.config, pockets } })),

  setButtons: (buttons) =>
    set((state) => ({ config: { ...state.config, buttons } })),

  setVents: (vents) =>
    set((state) => ({ config: { ...state.config, vents } })),

  setLining: (lining) =>
    set((state) => ({ config: { ...state.config, lining } })),

  setMonogram: (monogramText, monogramColor, monogramFont) =>
    set((state) => ({
      config: {
        ...state.config,
        monogramText,
        monogramColor: monogramColor || state.config.monogramColor,
        monogramFont: monogramFont || state.config.monogramFont,
      },
    })),

  setNotes: (specialNotes) =>
    set((state) => ({ config: { ...state.config, specialNotes } })),

  resetConfig: () => set({ config: initialConfig }),
}));

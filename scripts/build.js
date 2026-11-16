const { spawnSync } = require('child_process');

process.env.NODE_OPTIONS = '--max-old-space-size=4096';

const isWindows = process.platform === 'win32';
const nextCmd = isWindows ? 'npx.cmd' : 'npx';

const result = spawnSync(nextCmd, ['next', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

process.exit(result.status !== null ? result.status : 0);

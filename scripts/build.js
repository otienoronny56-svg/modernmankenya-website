const { spawnSync } = require('child_process');
const path = require('path');

process.env.NODE_OPTIONS = '--max-old-space-size=4096';

const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');

const result = spawnSync(
  process.execPath,
  ['--max-old-space-size=4096', nextBin, 'build'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096',
    },
  }
);

process.exit(result.status !== null ? result.status : 0);

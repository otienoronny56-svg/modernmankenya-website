const { spawnSync } = require('child_process');
const path = require('path');

process.env.NODE_OPTIONS = '--max-old-space-size=6144';

const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');

const result = spawnSync(
  process.execPath,
  ['--max-old-space-size=6144', nextBin, 'build'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=6144',
    },
  }
);

process.exit(result.status !== null ? result.status : 0);

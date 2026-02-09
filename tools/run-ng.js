const { spawnSync } = require('child_process');

function getNodeMajor() {
  const major = parseInt(String(process.versions.node || '').split('.')[0], 10);
  return Number.isFinite(major) ? major : 0;
}

const nodeMajor = getNodeMajor();
const ngBin = require.resolve('@angular/cli/bin/ng');
const ngArgs = process.argv.slice(2);

// --openssl-legacy-provider was introduced for OpenSSL 3 (Node 17+).
// It's not supported on Node 14/16 and is removed in newer Node versions.
const nodeArgs = [];
if (nodeMajor >= 17 && nodeMajor < 20) {
  nodeArgs.push('--openssl-legacy-provider');
}

const result = spawnSync(process.execPath, [...nodeArgs, ngBin, ...ngArgs], {
  stdio: 'inherit',
  env: process.env,
});

process.exit(typeof result.status === 'number' ? result.status : 1);

const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const path = require('node:path');
const port = '4327';
const server = spawn(process.execPath, ['server.js'], {
  cwd: path.resolve(__dirname, '..'), env: { ...process.env, PORT: port }
});
let output = '';
server.stdout.on('data', chunk => { output += chunk; });
server.stderr.on('data', chunk => { output += chunk; });
(async () => {
  try {
    for (let n = 0; n < 100; n++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (output.includes('7 failing')) break;
      if (server.exitCode !== null) throw new Error(output);
    }
    assert.match(output, /18 passing/);
    assert.match(output, /7 failing/);
    assert.doesNotMatch(output, /Tests are not valid/);
    const base = `http://127.0.0.1:${port}`;
    const reportResponse = await fetch(`${base}/_api/get-tests`);
    assert.equal(reportResponse.status, 200);
    const report = await reportResponse.json();
    assert.equal(report.length, 25);
    assert.equal(report.filter(test => test.state === 'passed').length, 18);
    assert.equal(report.filter(test => test.state === 'failed').length, 7);
    for (const [url, expected] of [['/hello', 'hello Guest'], ['/hello?name=Fixture', 'hello Fixture']]) {
      assert.equal(await (await fetch(base + url)).text(), expected);
    }
    for (const [surname, name] of [['Colombo', 'Cristoforo'], ['Polo', 'Marco'], ['Vespucci', 'Amerigo'], ['da Verrazzano', 'Giovanni'], ['unknown', 'unknown']]) {
      const response = await fetch(`${base}/travellers`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ surname })
      });
      assert.equal(response.status, 200);
      assert.equal((await response.json()).name, name);
    }
    console.log('Smoke checks passed. Tutorial report remains 18 passed / 7 unfinished failures.');
  } finally {
    server.kill();
    if (server.exitCode === null) await new Promise(resolve => server.once('exit', resolve));
  }
})().catch(error => { console.error(error, output); process.exitCode = 1; });

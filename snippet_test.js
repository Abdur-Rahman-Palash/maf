const fs = require('fs');
const ts = require('typescript');
const lines = fs.readFileSync('src/components/AdminDashboard.tsx','utf8').split(/\r?\n/);
const start = 1111, end = 1335;
const snippet = lines.slice(start, end).join('\n');
function test(name, modified){
  const code = 'const X = () => (' + '\n' + modified + '\n' + ');';
  const sf = ts.createSourceFile('tmp.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  console.log(name, 'errors', sf.parseDiagnostics.length);
  sf.parseDiagnostics.forEach(d => {
    const line = code.substring(0, d.start).split(/\r?\n/).length;
    console.log(line, d.messageText);
  });
}
console.log('original');
test('original', snippet);
const linesArr = snippet.split(/\r?\n/);
const mod1 = linesArr.filter((_, i) => i !== (1334 - start)).join('\n');
console.log('removed 1334');
test('removed1334', mod1);
const mod2 = linesArr.filter((_, i) => i !== (1333 - start)).join('\n');
console.log('removed 1333');
test('removed1333', mod2);

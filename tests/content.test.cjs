const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = { window: {} };
vm.createContext(context);
for (const file of ['content.js', 'questions.js', 'reference.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/js', file), 'utf8'), context);
}
const data = context.window.STUDY;
test('four original files are available and summaries are traceable', () => {
  assert.equal(data.sources.length, 4);
  for (const source of data.sources) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', source.file)));
    assert.ok(fs.existsSync(path.join(__dirname, '..', source.summary)));
    assert.ok(source.pages > 0);
  }
});
test('the separate cheatsheet has 12 source-backed reference categories', () => {
  assert.equal(data.reference.length, 12);
  for (const category of data.reference) assert.ok(category.pages && category.rows.length && category.example);
});
test('each topic has three distinct sets, each with easy, medium and hard questions', () => {
  assert.ok(data.topics.length >= 15);
  const ids = new Set();
  for (const topic of data.topics) {
    assert.ok(topic.sections.length >= 3, topic.id);
    assert.ok(topic.example.code && topic.example.solution && topic.example.task);
    const qs = data.questions[topic.id];
    assert.equal(qs.length, 9, topic.id);
    for (let set = 0; set < 3; set++) {
      assert.deepEqual(Array.from(qs.slice(set * 3, set * 3 + 3), q => q.level), ['easy', 'medium', 'hard']);
    }
    for (const [i, q] of qs.entries()) {
      assert.ok(q.prompt && q.hint && q.explanation && q.answer, `${topic.id}:${i}`);
      assert.ok(!ids.has(q.prompt), `Repeated question: ${q.prompt}`);
      ids.add(q.prompt);
      if (q.options) assert.ok(q.options.includes(q.answer));
    }
  }
});
test('every topic points to valid PDF pages', () => {
  for (const topic of data.topics) {
    const source = data.sources.find(s => s.id === topic.source);
    assert.ok(source);
    assert.ok(topic.from > 0 && topic.to >= topic.from && topic.to <= source.pages);
  }
});

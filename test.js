'use strict';

const remark = require('remark');
const dedent = require('dedent');
const plugin = require('.');

const processMarkdown = (md, opts) => {
  return remark()
    .use(plugin, opts)
    .process(md);
};

describe('remark-lint-haiku', () => {
  test('works', () => {
    const lint = processMarkdown(dedent`
# Title

\`\`\`haiku
Parallelogram
I tried to cut from fabric
I cut a rhombus
\`\`\`
    `);
    return lint.then(vFile => {
      expect(vFile.messages.length).toBe(0);
    });
  });

  test('not three lines', () => {
    const lint = processMarkdown(dedent`
# Title

\`\`\`haiku
Parallelogram
I tried to cut from fabric
\`\`\`
    `);
    return lint.then(vFile => {
      expect(vFile.messages.length).toBe(1);
      expect(vFile.messages[0].message).toBe('Haiku has 2 lines, it should have 3 lines.');
    });
  });

  test('too few syllables', () => {
    const lint = processMarkdown(dedent`
# Title

\`\`\`haiku
Parallelogram
I tried to cut
I cut a rhombus
\`\`\`
    `);
    return lint.then(vFile => {
      expect(vFile.messages.length).toBe(1);
      expect(vFile.messages[0].message).toBe('"I tried to cut" (4), it should have 7 syllables.');
    });
  });

  test('too many syllables', () => {
    const lint = processMarkdown(dedent`
# Title

\`\`\`haiku
Parallelogram
I tried to cut to from paper
I cut a rhombus
\`\`\`
    `);
    return lint.then(vFile => {
      expect(vFile.messages.length).toBe(1);
      expect(vFile.messages[0].message).toBe('"I tried to cut to from paper" (8), it should have 7 syllables.');
    });
  });
});

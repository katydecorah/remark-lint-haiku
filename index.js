const rule = require("unified-lint-rule");
const visit = require("unist-util-visit");
const syllable = require("syllable");

const pattern = [5, 7, 5];

function lintHaiku(ast, file) {
  const check = (node) => {
    const { lang, value } = node;
    if (lang == "hku" || lang == "haiku") {
      const lines = value.split("\n");
      if (lines.length !== 3) {
        file.message(
          `Haiku has ${lines.length} lines, it should have 3 lines.`,
          node
        );
      }
      lines.forEach((line, index) => {
        const expected = pattern[index];
        const received = syllable(line);
        if (received !== expected) {
          file.message(
            `"${line}" (${received}), it should have ${expected} syllables.`,
            node
          );
        }
      });
    }
  };

  visit(ast, ["code"], check);
}

module.exports = rule("remark-lint:haiku", lintHaiku);

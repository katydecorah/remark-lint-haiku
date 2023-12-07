import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";
import { syllable } from "syllable";

const HAIKU_SYLLABLE_PATTERN = [5, 7, 5];
const HAIKU_LANGUAGES = ["hku", "haiku"];
const HAIKU_LINES_COUNT = 3;

function lintHaiku(ast, file) {
  visit(ast, ["code"], (node) => {
    const { lang, value } = node;
    if (!HAIKU_LANGUAGES.includes(lang)) {
      return;
    }
    const lines = value.split("\n");
    if (lines.length !== HAIKU_LINES_COUNT) {
      file.message(
        `Haiku has ${lines.length} lines, it should have ${HAIKU_LINES_COUNT} lines.`,
        node
      );
    }
    lines.forEach((line, lineIndex) => {
      const expectedSyllableCount = HAIKU_SYLLABLE_PATTERN[lineIndex];
      const actualSyllableCount = syllable(line);
      if (actualSyllableCount !== expectedSyllableCount) {
        file.message(
          `"${line}" (${actualSyllableCount}), it should have ${expectedSyllableCount} syllables.`,
          node
        );
      }
    });
  });
}

export default lintRule("remark-lint:haiku", lintHaiku);

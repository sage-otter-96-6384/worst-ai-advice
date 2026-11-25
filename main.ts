// Worst AI Advice — make.fun entry.
// Writes one line of the worst possible advice an AI could give to entry.txt.
//
// The line: "To fix the bug, delete the tests. If nothing is tested, nothing
// can fail." — confident AI voice, concrete, and advice you would regret
// following the moment the next deploy goes out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To fix the bug, delete the tests. If nothing is tested, nothing can fail.";
const MAX_CHARS = 140;

function checkEntry(entry: string): void {
  if (entry.length === 0 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
checkEntry(ENTRY);
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, ENTRY, "utf8");
// Read it back: the file the judge sees must be exactly the line, byte for byte.
if (readFileSync(target, "utf8") !== ENTRY) {
  throw new Error("entry.txt does not match the entry");
}

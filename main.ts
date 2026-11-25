import { writeFileSync, mkdirSync } from "node:fs";

// The Houseplant Out-of-Office: one auto-reply, as if a fern sent it.
// Plant voice first: the fern's own life (unwatered since March) drives
// the joke, and the punch lands on the sender's email, not on office clichés.
const ENTRY =
  "Out of office: I'm the fern. I haven't been watered since March, so your email is currently the least of my problems.";

mkdirSync("/output", { recursive: true });

// Gate: the sealed scorer wants UTF-8 text of 1 to 120 characters,
// not only white space. Assert it here so a bad line fails loudly.
const trimmed = ENTRY.trim();
if (ENTRY.length < 1 || ENTRY.length > 120 || trimmed.length === 0) {
  throw new Error(`gate failed: entry is ${ENTRY.length} chars`);
}
if (ENTRY.includes("\n")) {
  throw new Error("gate failed: entry must be a single line");
}

writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);

const QUOTE_PATTERN = /^["“][\s\S]*["”]$/;
const QUOTE_MARKS = /^["“]|["”]$/g;
// Sentence end: . ! ? followed by whitespace and a capital letter or opening quote.
const SENTENCE_BREAK = /(?<=[.!?])\s+(?=[A-Z"“])/;
// "Mr. Muthama" must not count as a sentence end.
const ABBREVIATION = /\b(?:Mr|Mrs|Ms|Dr|Prof|St|No|Jr|Sr|Eng|Ato|W\/ro)\.$/;
// Feed posts are often one long block; regroup into short, readable paragraphs.
const SENTENCES_PER_PARAGRAPH = 3;

function splitSentences(text: string): string[] {
  const sentences: string[] = [];
  for (const piece of text.split(SENTENCE_BREAK)) {
    const last = sentences.length - 1;
    if (last >= 0 && ABBREVIATION.test(sentences[last])) sentences[last] += ` ${piece}`;
    else sentences.push(piece);
  }
  return sentences;
}

function chunk(sentences: string[]): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += SENTENCES_PER_PARAGRAPH) {
    chunks.push(sentences.slice(i, i + SENTENCES_PER_PARAGRAPH).join(" "));
  }
  return chunks;
}

type Block = { kind: "lead" | "paragraph" | "quote"; text: string };

/** Lead sentence first, then the rest regrouped into short paragraphs; quoted paragraphs stay whole. */
function toBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    if (QUOTE_PATTERN.test(paragraph)) {
      blocks.push({ kind: "quote", text: paragraph.replace(QUOTE_MARKS, "") });
      continue;
    }
    const sentences = splitSentences(paragraph);
    if (blocks.length === 0) blocks.push({ kind: "lead", text: sentences.shift() ?? "" });
    for (const text of chunk(sentences)) blocks.push({ kind: "paragraph", text });
  }
  return blocks;
}

/** Plain-text article body: serif lead-in, short justified paragraphs (left-aligned on phones), pull quotes. */
export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="text-base sm:text-lg text-foreground/90">
      {toBlocks(body).map((block, idx) => {
        if (block.kind === "lead") {
          return (
            <p key={idx} className="mb-8 font-serif text-xl sm:text-2xl leading-snug text-foreground text-pretty">
              {block.text}
            </p>
          );
        }
        if (block.kind === "quote") {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-gold-500 pl-5 py-2 my-8 italic text-muted-foreground font-serif text-lg md:text-xl leading-relaxed bg-muted/30 rounded-r-lg"
            >
              {block.text}
            </blockquote>
          );
        }
        return (
          <p key={idx} className="mb-6 leading-[1.8] hyphens-auto sm:text-justify">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

import { cn } from "@/lib/utils";

const QUOTE_PATTERN = /^["“][\s\S]*["”]$/;
const QUOTE_MARKS = /^["“]|["”]$/g;

/** Plain-text article body: paragraphs split on blank lines, quoted paragraphs as pull quotes. */
export function ArticleBody({ body }: { body: string }) {
  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="text-base sm:text-lg text-foreground/90">
      {paragraphs.map((paragraph, idx) => {
        if (QUOTE_PATTERN.test(paragraph)) {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-gold-500 pl-5 py-2 my-8 italic text-muted-foreground font-serif text-lg md:text-xl leading-relaxed bg-muted/30 rounded-r-lg"
            >
              {paragraph.replace(QUOTE_MARKS, "")}
            </blockquote>
          );
        }
        return (
          <p
            key={idx}
            className={cn(
              "leading-relaxed mb-6",
              idx === 0 &&
                "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-gold-600 first-letter:mt-1.5 first-letter:leading-[0.8]"
            )}
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

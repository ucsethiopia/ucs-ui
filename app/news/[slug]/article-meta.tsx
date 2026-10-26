import { Calendar, Clock, MapPin, User } from "lucide-react";
import type { NewsItem } from "@/lib/types";

const WORDS_PER_MINUTE = 200;

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Date, team, city and reading time under the article headline. */
export function ArticleMeta({ item }: { item: NewsItem }) {
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
      <li className="inline-flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gold-500" aria-hidden="true" />
        <time dateTime={item.date}>{formattedDate}</time>
      </li>
      {item.team && (
        <li className="inline-flex items-center gap-2">
          <User className="h-4 w-4 text-gold-500" aria-hidden="true" />
          {item.team}
        </li>
      )}
      {item.location?.city && (
        <li className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gold-500" aria-hidden="true" />
          {item.location.city}
        </li>
      )}
      {item.body && (
        <li className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-gold-500" aria-hidden="true" />
          {readingMinutes(item.body)} min read
        </li>
      )}
    </ul>
  );
}

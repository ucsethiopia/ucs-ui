import { Container } from "@/components/shared/container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  backgroundPositionClass?: string;
  contentWrapperClassName?: string;
  descriptionClassName?: string;
  condensed?: boolean;
  wideImage?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  backgroundPositionClass = "bg-center",
  contentWrapperClassName,
  descriptionClassName,
  condensed,
  wideImage,
}: PageHeroProps) {
  // Wide image layout - side by side design
  if (wideImage && backgroundImage) {
    return (
      <section className="relative bg-navy-950 min-h-[60vh] py-16 lg:py-0">
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover ${backgroundPositionClass}`}
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/48 via-navy-950/58 to-navy-950/75" />
        </div>

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
            {/* Content */}
            <div className={`py-12 lg:py-20 ${contentWrapperClassName ?? ""}`}>
              {eyebrow && (
                <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                  {eyebrow}
                </p>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
                {title}
              </h1>
              {description && (
                <p
                  className={`text-lg text-white/70 leading-relaxed max-w-2xl ${descriptionClassName ?? ""}`}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Image - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/3] w-[50vw] max-w-[700px] -mr-[calc((50vw-min(50vw,700px))/2+2rem)] rounded-l-2xl overflow-hidden shadow-2xl">
                <div
                  className={`absolute inset-0 bg-cover ${backgroundPositionClass}`}
                  style={{ backgroundImage: `url('${backgroundImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/15 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold-500/10 rounded-lg -z-10" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={`relative bg-navy-950 ${
        condensed ? "min-h-[68vh] py-20 lg:py-20 flex items-end" : "pt-32 pb-20"
      }`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover ${backgroundPositionClass}`}
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/48 via-navy-950/58 to-navy-950/75" />
        </div>
      )}

      <Container className="relative z-10">
        <div
          className={`${condensed ? "max-w-2xl" : "max-w-3xl"} ${contentWrapperClassName ?? ""}`}
        >
          {eyebrow && (
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              {eyebrow}
            </p>
          )}
          <h1
            className={`font-serif font-bold text-white text-balance ${
              condensed
                ? "text-3xl sm:text-4xl lg:text-5xl mb-4"
                : "text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`text-lg text-white/70 leading-relaxed max-w-2xl ${descriptionClassName ?? ""}`}
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

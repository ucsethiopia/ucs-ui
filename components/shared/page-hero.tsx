interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  condensed?: boolean;
  wideImage?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  condensed,
  wideImage,
}: PageHeroProps) {
  // Wide image layout - side by side design
  if (wideImage && backgroundImage) {
    return (
      <section className="relative bg-navy-950 min-h-[60vh] py-16 lg:py-0">
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950/90" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
            {/* Content */}
            <div className="py-12 lg:py-20">
              {eyebrow && (
                <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                  {eyebrow}
                </p>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                  {description}
                </p>
              )}
            </div>

            {/* Image - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/3] w-[50vw] max-w-[700px] -mr-[calc((50vw-min(50vw,700px))/2+2rem)] rounded-l-2xl overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${backgroundImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold-500/10 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative bg-navy-950 ${
        condensed
          ? "min-h-[60vh] py-20 lg:py-24 flex items-center"
          : "pt-32 pb-20"
      }`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950/90" />
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={condensed ? "max-w-2xl" : "max-w-3xl"}>
          {eyebrow && (
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              {eyebrow}
            </p>
          )}
          <h1
            className={`font-serif font-bold text-white mb-6 text-balance ${
              condensed
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p className="text-lg text-white/70 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

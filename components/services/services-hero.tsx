"use client";

interface ServicesHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function ServicesHero({
  eyebrow = "What We Do",
  title = "Our Services",
  description,
}: ServicesHeroProps) {
  return (
    <section className="relative h-[280px] md:h-[340px] flex items-end bg-navy-950">
      {/* Background with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950/90" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content positioned bottom-left */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-6 pb-10 md:pb-16">
        {eyebrow && (
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

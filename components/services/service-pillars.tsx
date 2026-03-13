"use client";

import React, { useState, useRef } from "react";
import {
  Check,
  GraduationCap,
  Compass,
  BookOpen,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { PillarVisual } from "./pillar-visual";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface TrainingCategory {
  id: string;
  name: string;
  subtitle?: string;
  courses: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  offerings: string[];
  trainingCategories?: TrainingCategory[];
  image: string;
}

interface ServicePillarsProps {
  services: Service[];
}

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  Training: GraduationCap,
  Advisory: Compass,
  "Research & Publication": BookOpen,
  "Communication & Promotion": Megaphone,
};

export function ServicePillars({ services }: ServicePillarsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const ActiveIcon = iconMap[activeService.title] || GraduationCap;
  const hasTrainingCategories =
    activeService.title === "Training" && activeService.trainingCategories;

  const headerRef = useRef(null);
  const isHeaderVisible = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-12 md:py-20 bg-background">
      <Container>
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Expertise
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Four Pillars of Excellence
          </h2>
          <p className="text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
            Comprehensive solutions designed to help your organization achieve
            its strategic objectives and build lasting capabilities.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 justify-center flex-wrap mb-8 md:mb-10">
          {services.map((service, index) => {
            const Icon = iconMap[service.title] || GraduationCap;
            const isActive = index === activeIndex;

            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "px-3 sm:px-5 py-2 sm:py-2.5 rounded-md border-[1.5px] flex items-center gap-1.5 transition-all duration-200 cursor-pointer text-xs sm:text-sm font-medium",
                  isActive
                    ? "bg-gold-500 border-gold-500 text-navy-950"
                    : "bg-transparent border-border text-muted-foreground hover:border-gold-500/50 hover:text-foreground",
                )}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{service.title}</span>
                <span className="sm:hidden">{service.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Content - Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column: Icon Header + Animated Visual */}
          <div className="md:sticky md:top-24">
            {/* Icon + Title Header */}
            <AnimatePresence mode="wait">
            <motion.div
              key={`header-${activeService.id}`}
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gold-500 flex items-center justify-center text-navy-950">
                <ActiveIcon size={28} />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  {activeService.title}
                </h3>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {String(activeIndex + 1).padStart(2, "0")} / 04
                </p>
              </div>
            </motion.div>
            </AnimatePresence>

            {/* Animated Pillar Visual */}
            <PillarVisual
              key={activeService.id}
              pillar={activeService.title}
              className="w-full"
            />
          </div>

          {/* Right Column: Description + Offerings/Training Categories */}
          <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {/* Description paragraph */}
            <p className="text-muted-foreground leading-[1.75] mb-6">
              {activeService.description}
            </p>

            {/* Training Categories Accordion (for Training pillar only) */}
            {hasTrainingCategories ? (
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-foreground mb-4">
                  Training Programs
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {activeService.trainingCategories!.map((category) => (
                    <AccordionItem
                      key={category.id}
                      value={category.id}
                      className="border-border"
                    >
                      <AccordionTrigger className="hover:no-underline py-3 text-left">
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-semibold text-foreground text-sm sm:text-base">
                            {category.name}
                          </span>
                          {category.subtitle && (
                            <span className="text-xs text-muted-foreground font-normal">
                              {category.subtitle}
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="flex flex-col gap-1 pl-1">
                          {category.courses.map((course, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 py-1.5 text-muted-foreground"
                            >
                              <div className="flex-shrink-0 mt-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500/10">
                                <Check className="h-2.5 w-2.5 text-gold-600" />
                              </div>
                              <span className="text-xs sm:text-sm leading-tight">
                                {course}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              /* Regular Offerings List (for other pillars) */
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">
                  Offerings
                </p>
                <div className="flex flex-col gap-1.5">
                  {activeService.offerings.map((offering, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 py-2 text-foreground"
                    >
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/10">
                        <Check className="h-3 w-3 text-gold-600" />
                      </div>
                      <span className="text-sm sm:text-base">{offering}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

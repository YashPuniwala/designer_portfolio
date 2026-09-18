"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
};

export const InfiniteTextMarquee: React.FC<InfiniteTextMarqueeProps> = ({
  text = "Let's Get Started",
  link = "/components",
  speed = 30,
  showTooltip = true,
  tooltipText = "Time to Flex💪",
  fontSize = "8rem",
  textColor = "", // optional override
  hoverColor = "", // optional override
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const maxRotation = 8;

  // Touch devices fire sticky, synthetic "hover" on tap which can leave
  // the tooltip/hover colour stuck and make the marquee look broken on
  // phones/tablets. Detect that once and skip all cursor-hover behaviour.
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  useEffect(() => {
    if (!showTooltip || isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      const midpoint = window.innerWidth / 2;
      const distanceFromMidpoint = Math.abs(e.clientX - midpoint);
      const rotation = (distanceFromMidpoint / midpoint) * maxRotation;

      setRotation(e.clientX > midpoint ? rotation : -rotation);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showTooltip, isTouch]);

  // Clamp the tooltip so it can never clip off the left/right/top edge of
  // the viewport on any device size. The tooltip is centered on the
  // (clamped) cursor point via translate(-50%, -150%).
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const half = Math.min(190, Math.max(110, (vw - 48) / 2));
  const tipX = Math.min(Math.max(cursorPosition.x, half), Math.max(half, vw - half));
  const tipY = Math.min(Math.max(cursorPosition.y, 150), Math.max(150, vh - 40));

  const repeatedText = Array(10).fill(text).join(" - ") + " -";

  return (
    <>
      {showTooltip && !isTouch && (
        <div
          className={`following-tooltip fixed z-[99] pointer-events-none transition-opacity duration-300 font-bold text-center text-primary-foreground bg-primary
            px-3 py-2 sm:px-5 sm:py-3 md:px-8 md:py-4 lg:px-12 lg:py-6
            rounded-2xl sm:rounded-3xl
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          style={{
            top: `${tipY}px`,
            left: `${tipX}px`,
            maxWidth: "min(20rem, calc(100vw - 2rem))",
            transform: `rotateZ(${rotation}deg) translate(-50%, -150%)`,
            fontSize: "clamp(1.05rem, 3vw, 1.5rem)",
            lineHeight: 1.15,
          }}
        >
          <p>{tooltipText}</p>
        </div>
      )}

      <main className="marquee-viewport relative w-full overflow-hidden">
        <motion.div
          className="marquee-track whitespace-nowrap will-change-transform"
          onMouseEnter={() => !isTouch && setIsHovered(true)}
          onMouseLeave={() => !isTouch && setIsHovered(false)}
          animate={{
            x: [0, -1000],
            transition: {
              repeat: Infinity,
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {/* `next/link` is unavailable in this Vite app — swapped for an
              anchor so the component's `link` prop API is preserved. */}
          <a href={link} className="marquee-link">
            <span
              className={`cursor-pointer font-bold tracking-tight py-10 m-0 transition-all ${
                textColor ? "" : "text-black dark:text-white"
              }`}
              style={{
                fontSize,
                color: textColor || undefined,
              }}
            >
              {/* styled-jsx is Next-only — hover colour is driven by the
                  existing isHovered state instead, keeping the same prop. */}
              <span
                className="hoverable-text"
                style={{
                  color: isHovered
                    ? hoverColor || undefined
                    : textColor || undefined,
                  transition: "color 300ms ease",
                }}
              >
                {repeatedText}
              </span>
            </span>
          </a>
        </motion.div>
      </main>
    </>
  );
};

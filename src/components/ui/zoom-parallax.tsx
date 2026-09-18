'use client';

import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
	/** Optional centre text revealed before the zoom (Step 2) */
	centerText?: string;
}

/** A box measured in viewport units, anchored to the section's top-left. */
interface Box {
	l: number; // left   (vw)
	t: number; // top    (vh)
	w: number; // width  (vw)
	h: number; // height (vh)
}

/**
 * The full scroll is divided into phases. The composition is held perfectly
 * still during GRID_HOLD and TEXT, then the zoom ramps 0 → 1 across ZOOM,
 * and the finished full-bleed image is held during OUTRO before the pin
 * releases and normal page scrolling resumes.
 */
const GRID_HOLD = 0.16; // Step 1 — grid visible, no zoom
const TEXT_IN = 0.2; // Step 2 — centre text animates in
const ZOOM_START = 0.42; // Step 3 — centre image opens + zoom begins
const ZOOM_END = 0.9; // Step 4 — full-screen reached
// 0.9 → 1.0 = Step 5 — hold, then unpin back to normal scrolling

/**
 * Compact (tablet) collage — a dominant centre image ringed by supporting
 * cards. Offsets are relative to each wrapper's flex-centred position, so
 * `top: 0 / left: 0` sits dead-centre in the viewport.
 */
const COMPACT_LAYOUT = [
	{ top: '0vh', left: '0vw', width: '54vw', height: '34vh' },
	{ top: '-30vh', left: '-21vw', width: '34vw', height: '15vh' },
	{ top: '-28vh', left: '24vw', width: '30vw', height: '17vh' },
	{ top: '2vh', left: '-37vw', width: '20vw', height: '24vh' },
	{ top: '-1vh', left: '37vw', width: '20vw', height: '22vh' },
	{ top: '32vh', left: '-20vw', width: '36vw', height: '16vh' },
	{ top: '34vh', left: '23vw', width: '30vw', height: '14vh' },
];

/** Subtle depth pass for the compact/tablet collage. */
const COMPACT_DRIFT = [-50, 40, -70, 55, -40, 65, 0];

/**
 * PHONE — full-bleed masonry. Tiles the viewport edge to edge so the
 * composition always fills 100vw × 100vh with no dead space.
 */
const PHONE_MASONRY: Box[] = [
	{ l: 0, t: 0, w: 54, h: 15 },
	{ l: 55, t: 0, w: 45, h: 15 },
	{ l: 0, t: 16, w: 29, h: 15 },
	{ l: 30, t: 16, w: 70, h: 15 },
	{ l: 0, t: 32, w: 100, h: 36 }, // ★ MAIN — the zoom focal point
	{ l: 0, t: 69, w: 43, h: 31 },
	{ l: 44, t: 69, w: 56, h: 31 },
];

/** Convert a viewport-unit box into centred offsets for the flex wrapper. */
function toStyle(box: Box) {
	return {
		top: `${box.t + box.h / 2 - 50}vh`,
		left: `${box.l + box.w / 2 - 50}vw`,
		width: `${box.w}vw`,
		height: `${box.h}vh`,
	};
}

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia(query);
		const update = () => setMatches(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, [query]);

	return matches;
}

export function ZoomParallax({ images, centerText }: ZoomParallaxProps) {
	const container = useRef(null);
	const isCompact = useMediaQuery('(max-width: 860px)');
	const isPhone = useMediaQuery('(max-width: 640px)');
	const reduceMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	// Hold at 1× through the grid + text phases, ramp to full across ZOOM,
	// then hold again. Derived from the same scrollYProgress stream, so the
	// zoom stays perfectly scroll-driven with no autoplay.
	const zoomP = useTransform(
		scrollYProgress,
		[GRID_HOLD, ZOOM_START, ZOOM_END],
		[0, 0, 1],
		{ clamp: true }
	);

	// The grid eases away as the centre image takes over.
	const gridFadeP = useTransform(
		scrollYProgress,
		[ZOOM_START, Math.min(ZOOM_END, ZOOM_START + 0.12)],
		[1, 0],
		{ clamp: true }
	);

	// Centre text: fades in around TEXT_IN, holds, then clears as the image
	// opens — one motion value, so the reveal reads as a continuous move.
	const textP = useTransform(
		scrollYProgress,
		[GRID_HOLD, TEXT_IN, ZOOM_START - 0.06, ZOOM_START + 0.1],
		[0, 1, 1, 0],
		{ clamp: true }
	);

	// Scale required to take the centre tile from its native box to a full
	// viewport. Read live from the DOM so it is correct at every breakpoint
	// and stays right after a resize.
	const [zoomScale, setZoomScale] = useState(8);

	useEffect(() => {
		const el = container.current as HTMLElement | null;
		if (!el) return;

		const measure = () => {
			const tile = el.querySelector<HTMLElement>(
				isPhone
					? '[data-zoom-tile="phone"]'
					: isCompact
						? '[data-zoom-tile="compact"]'
						: '[data-zoom-tile="desktop"]'
			);
			if (!tile) return;
			const r = tile.getBoundingClientRect();
			if (!r.width || !r.height) return;
			setZoomScale(
				Math.max(window.innerWidth / r.width, window.innerHeight / r.height) * 1.08
			);
		};

		// Measure once the composition has settled, and keep it in sync.
		measure();
		const t = window.setTimeout(measure, 120);
		window.addEventListener('resize', measure);
		return () => {
			window.clearTimeout(t);
			window.removeEventListener('resize', measure);
		};
	}, [isPhone, isCompact, images.length]);

	// Reduced motion: hold the composition in its resting state — no zoom.
	const staticZero = useTransform(() => 0);
	const activeZoomP = reduceMotion ? staticZero : zoomP;

	// Ease the zoom so it accelerates into the image rather than moving
	// linearly — still fully controlled by the scroll position.
	const zoomScaleEased = useTransform(activeZoomP, (p) =>
		1 + (zoomScale - 1) * (p * p * (3 - 2 * p))
	);

	const textY = useTransform(textP, (p) => (1 - p) * 26);
	const textScale = useTransform(textP, (p) => 0.94 + p * 0.06);

	// Precomputed at top level (never inside .map) to respect the rules of
	// hooks while keeping the original per-image drift architecture.
	const driftTargets = useMemo(
		() => (isPhone ? [0, 0, 0, 0, 0, 0, 0] : COMPACT_DRIFT),
		[isPhone]
	);

	const drift0 = useTransform(scrollYProgress, [0, 1], [0, driftTargets[0]]);
	const drift1 = useTransform(scrollYProgress, [0, 1], [0, driftTargets[1]]);
	const drift2 = useTransform(scrollYProgress, [0, 1], [0, driftTargets[2]]);
	const drift3 = useTransform(scrollYProgress, [0, 1], [0, driftTargets[3]]);
	const drift4 = useTransform(scrollYProgress, [0, 1], [0, driftTargets[4]]);
	const drift5 = useTransform(scrollYProgress, [0, 1], [0, driftTargets[5]]);
	const drift6 = useTransform(scrollYProgress, [0, 1], [0, driftTargets[6]]);

	const drifts = [drift0, drift1, drift2, drift3, drift4, drift5, drift6];

	return (
		<div ref={container} className="relative h-[500vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				<motion.div
					className="absolute inset-0"
					style={{
						opacity: gridFadeP,
						// Opens out of the composition, not out of nowhere.
						transformOrigin: 'center center',
					}}
				>
					{images.map(({ src, alt }, index) => {
						const isFocus = index === 0;

						// ---- Phone: full-bleed masonry ----
						if (isPhone) {
							const box = PHONE_MASONRY[index % PHONE_MASONRY.length];
							return (
								<motion.div
									key={index}
									style={{
										scale: isFocus ? zoomScaleEased : 1,
										zIndex: isFocus ? 5 : 1,
									}}
									className="absolute top-0 flex h-full w-full items-center justify-center"
								>
									<div
										className="relative overflow-hidden rounded-[10px]"
										style={toStyle(box)}
										data-zoom-tile={isFocus ? 'phone' : undefined}
									>
										<img
											src={src || '/placeholder.svg'}
											alt={alt || `Parallax image ${index + 1}`}
											className="h-full w-full object-cover"
										/>
									</div>
								</motion.div>
							);
						}

						// ---- Compact / tablet: centre-focal collage ----
						if (isCompact) {
							return (
								<motion.div
									key={index}
							style={{
								scale: isFocus ? zoomScaleEased : 1,
								y: drifts[index % drifts.length],
								zIndex: isFocus ? 5 : 1,
							}}
									className="absolute top-0 flex h-full w-full items-center justify-center"
								>
									<div
										className="relative overflow-hidden rounded-[12px]"
										style={COMPACT_LAYOUT[index % COMPACT_LAYOUT.length]}
										data-zoom-tile={isFocus ? 'compact' : undefined}
									>
										<img
											src={src || '/placeholder.svg'}
											alt={alt || `Parallax image ${index + 1}`}
											className="h-full w-full object-cover"
										/>
									</div>
								</motion.div>
							);
						}

						// ---- Desktop: original composition, unchanged ----
						return (
							<motion.div
								key={index}
								style={{
									scale: isFocus ? zoomScaleEased : 1,
									zIndex: isFocus ? 5 : index,
								}}
								className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
							>
								<div
									className="relative h-[25vh] w-[25vw] overflow-hidden rounded-[12px]"
									data-zoom-tile={isFocus ? 'desktop' : undefined}
								>
									<img
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
								className="h-full w-full object-cover"
								/>
							</div>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Step 2 — centre text, revealed over the composition at the
			    exact spot the main image will open into. */}
			{centerText && (
					<motion.div
						style={{
							opacity: textP,
							y: textY,
							scale: textScale,
						}}
						className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
					>
						<span
							className="font-display font-bold uppercase leading-[0.92] tracking-[-0.03em] text-white"
							style={{
								fontSize: 'clamp(1.6rem, 7vw, 5rem)',
								textShadow: '0 6px 34px rgba(0,0,0,0.55)',
							}}
						>
							{centerText}
						</span>
					</motion.div>
				)}

				{/* Cinematic dark treatment over the whole composition. */}
				<div
					className="pointer-events-none absolute inset-0 z-30"
					style={{
						background:
							'radial-gradient(ellipse at center, rgba(5,5,5,0.12) 0%, rgba(5,5,5,0.34) 55%, rgba(5,5,5,0.62) 100%)',
					}}
				/>
			</div>
		</div>
	);
}

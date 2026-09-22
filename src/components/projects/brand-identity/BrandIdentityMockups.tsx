import { useEffect, useMemo, useState } from "react";
import { Reveal } from "../shared/Reveal";

export interface MockupItem {
  num: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  role?: "feature" | "landscape" | "portrait" | "square";
}

// Full catalogue of mockup images with exact measured dimensions & natural aspect ratios
const MOCKUP_ITEMS: MockupItem[] = [
  // ─── 01. STOREFRONT OPENER (Full-width editorial anchor) ──────────────────
  {
    num: "01",
    src: "/images/breww/7.png",
    width: 1474,
    height: 1067,
    alt: "Breww — Storefront Facade & Branded Awning",
    role: "feature",
  },

  // ─── CLUSTER 1: DYNAMIC MASONRY PACKING ──────────────────────────────────
  {
    num: "02",
    src: "/images/breww/27.png",
    width: 1274,
    height: 1234,
    alt: "Breww — Illuminated Circular Blade Sign",
    role: "square",
  },
  {
    num: "03",
    src: "/images/breww/25.png",
    width: 1148,
    height: 1371,
    alt: "Breww — Barista Pouring Latte Art into Branded Cup",
    role: "portrait",
  },
  {
    num: "04",
    src: "/images/breww/8.png",
    width: 1020,
    height: 1541,
    alt: "Breww — Embroidered Forest Green Staff Cap",
    role: "portrait",
  },
  {
    num: "05",
    src: "/images/breww/9.png",
    width: 1026,
    height: 1532,
    alt: "Breww — Iced Cold Brew Cup in Hands",
    role: "portrait",
  },
  {
    num: "06",
    src: "/images/breww/10.png",
    width: 944,
    height: 1667,
    alt: "Breww — Sidewalk Chalkboard A-Frame Sign",
    role: "portrait",
  },
  {
    num: "07",
    src: "/images/breww/18.png",
    width: 1536,
    height: 1024,
    alt: "Breww — Dual-Tone Embossed Business Cards",
    role: "landscape",
  },
  {
    num: "08",
    src: "/images/breww/21.png",
    width: 1476,
    height: 1066,
    alt: "Breww — Complete Takeaway Packaging Suite",
    role: "landscape",
  },
  {
    num: "09",
    src: "/images/breww/5.png",
    width: 1594,
    height: 987,
    alt: "Breww — Ceramic Dine-In Mugs on Walnut Tray",
    role: "landscape",
  },
  {
    num: "10",
    src: "/images/breww/26.png",
    width: 1220,
    height: 1289,
    alt: "Breww — Iced Americano & Matcha Cheers",
    role: "square",
  },
  {
    num: "11",
    src: "/images/breww/3.png",
    width: 1254,
    height: 1254,
    alt: "Breww — Die-Cut Mascot & Brand Stickers Pack",
    role: "square",
  },
  {
    num: "12",
    src: "/images/breww/4.png",
    width: 1399,
    height: 1124,
    alt: "Breww — Mascot & Logo Brass Keychain Mockup",
    role: "square",
  },
  {
    num: "13",
    src: "/images/breww/6.png",
    width: 1254,
    height: 1254,
    alt: "Breww — Cardboard Two-Cup Takeaway Carrier",
    role: "square",
  },
  {
    num: "14",
    src: "/images/breww/22.png",
    width: 1254,
    height: 1254,
    alt: "Breww — Croissant in Branded Patterned Paper Bag",
    role: "square",
  },
  {
    num: "15",
    src: "/images/breww/19.png",
    width: 1566,
    height: 1004,
    alt: "Breww — Mascot Cutout Sticker on Roasted Coffee Beans",
    role: "landscape",
  },
  {
    num: "16",
    src: "/images/breww/20.png",
    width: 1567,
    height: 1004,
    alt: "Breww — Set of Stickers & Character Art Collection",
    role: "landscape",
  },
  {
    num: "17",
    src: "/images/breww/15.png",
    width: 1106,
    height: 1422,
    alt: "Breww — Social Media Profile & Online Presence",
    role: "portrait",
  },
  {
    num: "18",
    src: "/images/breww/12.png",
    width: 1547,
    height: 1016,
    alt: "Breww — Bakery Takeaway & Cake Packaging Boxes",
    role: "landscape",
  },
  {
    num: "19",
    src: "/images/breww/24.png",
    width: 1223,
    height: 1286,
    alt: "Breww — Printed Cafe Food & Drink Menu",
    role: "square",
  },
  {
    num: "20",
    src: "/images/breww/13.png",
    width: 1142,
    height: 1377,
    alt: "Breww — Chocolate Chip Cookie on Branded Deli Paper",
    role: "portrait",
  },
  {
    num: "21",
    src: "/images/breww/11.png",
    width: 1078,
    height: 1460,
    alt: "Breww — Baker in Kitchen with Branded Backprint",
    role: "portrait",
  },

  // ─── 22. EDITORIAL MID-BREAK (Full-width outdoor poster) ──────────────────
  {
    num: "22",
    src: "/images/breww/2.png",
    width: 1697,
    height: 927,
    alt: "Breww — Outdoor Campaign Street Poster Series",
    role: "feature",
  },

  // ─── CLUSTER 2: DYNAMIC MASONRY PACKING ──────────────────────────────────
  {
    num: "23",
    src: "/images/breww/14.png",
    width: 1678,
    height: 937,
    alt: "Breww — Mascot Characters & Illustrated Brand Elements",
    role: "landscape",
  },
  {
    num: "24",
    src: "/images/breww/23.png",
    width: 1670,
    height: 942,
    alt: "Breww — Social Media Stories & Digital Campaign System",
    role: "landscape",
  },

  // ─── 25. FINALE CLOSER (Full-width billboard feature) ─────────────────────
  {
    num: "25",
    src: "/images/breww/1.jpeg",
    width: 2256,
    height: 1680,
    alt: "Breww — Large Street Billboard Campaign Installation",
    role: "feature",
  },
];

/** Responsive column count hook */
function useColumnCount(): number {
  const [cols, setCols] = useState<number>(() => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 960) return 2;
    return 3;
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const next = w <= 640 ? 1 : w <= 960 ? 2 : 3;
      setCols(next);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return cols;
}

/**
 * Distributes items into the shortest available column (bin-packing),
 * using normalized aspect ratios (height / width).
 */
function distributeIntoColumns(items: MockupItem[], numCols: number): MockupItem[][] {
  if (numCols <= 1) return [items];

  const columns: MockupItem[][] = Array.from({ length: numCols }, () => []);
  const heights: number[] = Array.from({ length: numCols }, () => 0);

  for (const item of items) {
    let minIndex = 0;
    for (let c = 1; c < numCols; c++) {
      if (heights[c] < heights[minIndex]) {
        minIndex = c;
      }
    }
    columns[minIndex].push(item);
    // Accumulate normalized height (height / width) + slight gap factor
    heights[minIndex] += item.height / item.width + 0.035;
  }

  return columns;
}

// ─── Individual Mockup Card ──────────────────────────────────────────────────
export function BrandMockupCard({
  num,
  src,
  alt,
  width,
  height,
  full = false,
}: {
  num: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  full?: boolean;
}) {
  return (
    <Reveal className={`cs-masonry-item${full ? " cs-item-full" : ""}`}>
      <span className="cs-masonry-num">{num}</span>
      <div
        className="cs-masonry-img-wrap"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
    </Reveal>
  );
}

// ─── Section Cluster Component ──────────────────────────────────────────────
function MasonryCluster({
  items,
  columnCount,
}: {
  items: MockupItem[];
  columnCount: number;
}) {
  const columns = useMemo(
    () => distributeIntoColumns(items, columnCount),
    [items, columnCount]
  );

  return (
    <div
      className="cs-masonry-grid"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((colItems, colIdx) => (
        <div key={colIdx} className="cs-masonry-col">
          {colItems.map((item) => (
            <BrandMockupCard key={item.src} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Main Mockups Gallery ────────────────────────────────────────────────────
export function BrandMockupGallery() {
  const columnCount = useColumnCount();

  // Divide catalogue by full-bleed editorial features to preserve visual narrative
  const opener = MOCKUP_ITEMS[0]; // 01 Storefront
  const cluster1 = useMemo(() => MOCKUP_ITEMS.slice(1, 21), []); // 02 - 21
  const midBreak = MOCKUP_ITEMS[21]; // 22 Outdoor Poster
  const cluster2 = useMemo(() => MOCKUP_ITEMS.slice(22, 24), []); // 23 - 24
  const finale = MOCKUP_ITEMS[24]; // 25 Large Billboard

  return (
    <div className="cs-mockup-flow">
      {/* 1. Feature Opener — Full width storefront */}
      <div className="cs-masonry-feature">
        <BrandMockupCard {...opener} full />
      </div>

      {/* 2. True Dynamic Masonry Cluster — 02 to 21 packed into shortest columns */}
      <MasonryCluster items={cluster1} columnCount={columnCount} />

      {/* 3. Feature Mid-Break — Outdoor campaign poster */}
      <div className="cs-masonry-feature">
        <BrandMockupCard {...midBreak} full />
      </div>

      {/* 4. Secondary Masonry Cluster — 23 to 24 */}
      <MasonryCluster items={cluster2} columnCount={Math.min(columnCount, 2)} />

      {/* 5. Finale Closer — Large billboard installation */}
      <div className="cs-masonry-feature">
        <BrandMockupCard {...finale} full />
      </div>
    </div>
  );
}

export function BrandIdentityMockups() {
  return (
    <section className="cs-section cs-mockups" aria-label="Mockups">
      <p className="cs-label">Mockups</p>
      <BrandMockupGallery />
    </section>
  );
}

export default BrandIdentityMockups;

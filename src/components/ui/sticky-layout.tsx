import { useRef } from "react";

interface StickyLayoutProps {
  children: (ref: React.RefObject<HTMLDivElement | null>) => React.ReactNode;
}

export default function StickyLayout({ children }: StickyLayoutProps) {
  const stickyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky-root">
      {children(stickyRef)}
    </div>
  );
}

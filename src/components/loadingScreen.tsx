import { useEffect, useState } from "react";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [play, setPlay] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const start = requestAnimationFrame(() => setPlay(true));

        // total sequence length: tear delay (3.1s) + tear duration (0.8s)
        const done = window.setTimeout(() => {
            setHidden(true);
            onComplete();
        }, 3900);

        return () => {
            cancelAnimationFrame(start);
            window.clearTimeout(done);
        };
    }, [onComplete]);

    if (hidden) return null;

    return (
        <>
            <style>{`
        .loader-layer {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .top-layer { clip-path: inset(0 0 50% 0); }
        .bottom-layer { clip-path: inset(50% 0 0 0); }

        .word-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.05em;
        }

        .flip-line {
          position: relative;
          perspective: 900px;
          line-height: 0.95;
        }
        .flip-line .face {
          display: block;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #fff;
          font-size: clamp(2rem, 8.5vw, 5.5rem);
          white-space: nowrap;
          backface-visibility: hidden;
        }
        .flip-line .face.accent { color: #ff8a3c; }
        .flip-line .front { transform: rotateX(0deg); }
        .flip-line .back {
          position: absolute;
          inset: 0;
          transform: rotateX(90deg);
        }

        @keyframes groupIn {
          0%   { opacity: 0; transform: scale(0.82); }
          100% { opacity: 1; transform: scale(1); }
        }
        .anim-in .word-group {
          animation: groupIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.15s;
        }

        @keyframes flipFrontOut {
          0%   { transform: rotateX(0deg); }
          100% { transform: rotateX(-100deg); }
        }
        @keyframes flipBackIn {
          0%   { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
        .anim-in .line-1 .front {
          animation: flipFrontOut 0.6s cubic-bezier(0.6, 0, 0.2, 1) forwards;
          animation-delay: 1.3s;
        }
        .anim-in .line-1 .back {
          animation: flipBackIn 0.6s cubic-bezier(0.6, 0, 0.2, 1) forwards;
          animation-delay: 1.4s;
        }
        .anim-in .line-2 .front {
          animation: flipFrontOut 0.6s cubic-bezier(0.6, 0, 0.2, 1) forwards;
          animation-delay: 2.1s;
        }
        .anim-in .line-2 .back {
          animation: flipBackIn 0.6s cubic-bezier(0.6, 0, 0.2, 1) forwards;
          animation-delay: 2.2s;
        }

        @keyframes tearUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-110%); }
        }
        @keyframes tearDown {
          0%   { transform: translateY(0); }
          100% { transform: translateY(110%); }
        }
        .anim-tear.top-layer {
          animation: tearUp 0.8s cubic-bezier(0.6, 0, 0.2, 1) forwards;
          animation-delay: 3.1s;
        }
        .anim-tear.bottom-layer {
          animation: tearDown 0.8s cubic-bezier(0.6, 0, 0.2, 1) forwards;
          animation-delay: 3.1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-layer { display: none !important; }
        }
      `}</style>

            <div
                className={`loader-layer top-layer ${play ? "anim-in anim-tear" : ""}`}
            >
                <div className="word-group">
                    <div className="flip-line line-1">
                        <span className="face front">Yash</span>
                        <span className="face back accent">Graphic</span>
                    </div>
                    <div className="flip-line line-2">
                        <span className="face front">Puniwala</span>
                        <span className="face back">Designer</span>
                    </div>
                </div>
            </div>

            <div
                className={`loader-layer bottom-layer ${play ? "anim-in anim-tear" : ""}`}
            >
                <div className="word-group">
                    <div className="flip-line line-1">
                        <span className="face front">Yash</span>
                        <span className="face back accent">Graphic</span>
                    </div>
                    <div className="flip-line line-2">
                        <span className="face front">Puniwala</span>
                        <span className="face back">Designer</span>
                    </div>
                </div>
            </div>
        </>
    );
}
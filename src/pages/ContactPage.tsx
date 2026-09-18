import { useLayoutEffect, useState } from "react";
import Nav from "@/components/Nav";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    document.title = "Contact — OPERATOR.X";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) return;

    setIsSubmitting(true);
    // Smooth editorial feedback simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="contact-page-root">
      {/* Existing shared navigation component */}
      <Nav />

      <main className="contact-main">
        <div className="contact-container">
          {/* Top category / back link */}
          <div className="contact-top-row">
            <a
              href="#home"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              ← Back to portfolio
            </a>
          </div>

          {/* Large headline */}
          <header className="contact-header">
            <h1 className="contact-title font-display font-bold uppercase leading-[0.85] tracking-[-0.04em]">
              Let's <span className="script-accent">Talk.</span>
            </h1>
            <p className="contact-subtitle">
              Have an idea, opportunity, or just want to make something interesting? Let's talk.
            </p>
          </header>

          {/* Contact layout: clean form on one side, direct studio details on the other */}
          <div className="contact-grid">
            {/* Form column */}
            <div className="contact-form-col">
              {submitted ? (
                <div className="contact-success-box">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-glow">
                    Message Received
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                    Thank you, {formState.name}.
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                    We will review your inquiry and get back to you within 24 to 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    className="mt-8 inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-field-group">
                    <label
                      htmlFor="contact-name"
                      className="contact-label font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name or organization"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="contact-input font-display text-lg text-white placeholder:text-white/20 focus:outline-none"
                    />
                  </div>

                  <div className="contact-field-group">
                    <label
                      htmlFor="contact-email"
                      className="contact-label font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="contact-input font-display text-lg text-white placeholder:text-white/20 focus:outline-none"
                    />
                  </div>

                  <div className="contact-field-group">
                    <label
                      htmlFor="contact-message"
                      className="contact-label font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Tell us about your project, timeline, or scope"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="contact-textarea font-display text-lg text-white placeholder:text-white/20 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-submit-btn group"
                    >
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em]">
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                      <span
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct contact & studio info column */}
            <div className="contact-info-col">
              <div className="contact-info-block">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:hello@operator-x.agency"
                  className="mt-3 block font-display text-xl font-medium tracking-tight text-white transition-colors duration-300 hover:text-amber-glow md:text-2xl"
                >
                  hello@operator-x.agency
                </a>
              </div>

              <div className="contact-info-block border-t border-white/10 pt-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Location &amp; Availability
                </span>
                <p className="mt-3 font-display text-base leading-relaxed text-white/80">
                  Berlin — New York — Tokyo
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Accepting select projects for Q2/Q3
                </p>
              </div>

              <div className="contact-info-block border-t border-white/10 pt-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Core Practice
                </span>
                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  Brand Strategy, Typography Systems, Digital Experiences, Motion Direction, Creative Technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple quiet footer on contact page */}
      <footer className="contact-bottom-bar">
        <div className="contact-container flex items-center justify-between">
          <span className="font-display text-xs font-bold uppercase tracking-[0.35em] text-white/50">
            Operator.X
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            © {new Date().getFullYear()} — All Rights Reserved
          </span>
        </div>
      </footer>
    </div>
  );
}

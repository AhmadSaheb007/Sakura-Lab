"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Words", href: "/view/word" },
  { label: "Kanji", href: "/view/kanji" },
  { label: "Q&A", href: "/view/jpqna" },
  { label: "Grammar", href: "/view/grammer" },
  { label: "Forms", href: "/view/form" },
  { label: "Contact", href: "/view/contact" },
];

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      className="brand"
      href="/"
      aria-label="Sakura Lab home"
      onClick={onClick}
    >
      <span className="brand-mark" aria-hidden="true">
        ✿
      </span>
      <span className="brand-name">
        sakura<span>lab</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <Brand />

          <nav className="main-nav" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link className="nav-link" href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
            <Link className="nav-cta" href="/#kana">
              Start learning <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      </header>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="mobile-menu-trigger"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
        type="button"
      >
        <span className="mobile-menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {menuOpen && (
        <div className="mobile-menu-layer">
          <button
            aria-label="Close navigation menu"
            className="mobile-menu-backdrop"
            onClick={closeMenu}
            tabIndex={-1}
            type="button"
          />
          <aside
            aria-label="Mobile navigation"
            className="mobile-nav-drawer"
            id="mobile-navigation"
          >
            <div className="mobile-drawer-header">
              <Brand onClick={closeMenu} />
              <button
                aria-label="Close navigation menu"
                className="mobile-menu-close"
                onClick={closeMenu}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav
              className="mobile-main-nav"
              aria-label="Mobile main navigation"
            >
              {navigationItems.map((item) => (
                <Link
                  className="mobile-nav-link"
                  href={item.href}
                  key={item.label}
                  onClick={closeMenu}
                >
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
              <Link
                className="mobile-nav-cta"
                href="/#kana"
                onClick={closeMenu}
              >
                Start learning <span aria-hidden="true">→</span>
              </Link>
            </nav>
            <p className="mobile-drawer-note">
              Learn Japanese, one petal at a time.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}

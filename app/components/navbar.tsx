import Link from "next/link";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Q&A", href: "/view/jpqna" },
  { label: "Kanji", href: "/view/kanji" },
  { label: "Grammar", href: "/#kana" },
  { label: "Contact", href: "/view/contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="Sakura Lab home">
          <span className="brand-mark" aria-hidden="true">
            ✿
          </span>
          <span className="brand-name">
            sakura<span>lab</span>
          </span>
        </Link>

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
  );
}

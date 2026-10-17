import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            ✿
          </span>
          <span className="brand-name">
            sakura<span>lab</span>
          </span>
        </Link>
        <p>A little practice goes a long way. がんばって!</p>
        <a className="footer-email" href="mailto:ahmad.saheb@gmail.com">
          Say hello <span aria-hidden="true">↗</span>
        </a>
        <span className="footer-copyright">© 2026 Sakura Lab</span>
      </div>
    </footer>
  );
}

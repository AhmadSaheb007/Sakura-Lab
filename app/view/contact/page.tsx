import ContactSocialLinks from "../../components/contact-social-links";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-card" aria-labelledby="contact-title">
        <div className="contact-flower contact-flower-left" aria-hidden="true">
          ✿
        </div>
        <div className="contact-flower contact-flower-right" aria-hidden="true">
          ✿
        </div>

        <div className="contact-brand-mark" aria-hidden="true">
          ✿
        </div>
        <h1 id="contact-title">Sakura Lab</h1>
        <p className="contact-tagline">For Beginners To Learn Japanese.</p>

        <p className="contact-label">Design &amp; Developed By</p>
        <h2 className="contact-author">AHMAD ABEER</h2>
        <p className="contact-social-intro">
          Have a question or want to get in touch? Find me here.
        </p>
        <ContactSocialLinks />

        <div className="contact-email">
          <span className="contact-label">FOR ANY QUERY</span>
          <a href="mailto:ahmad.saheb@gmail.com">ahmad.saheb007@gmail.com</a>
        </div>

          <div className="contact-divider" aria-hidden="true">
          <span>✿</span>
        </div>

         <div className="contact-thanks">
          <span className="contact-label">Special Thanks To</span>
          <p>SOBUJ HOSSAIN</p>
        </div>
      </section>
    </main>
  );
}

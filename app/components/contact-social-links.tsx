import {
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/AhmadSaheb007?tab=repositories",
    icon: <FaGithub />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmad-abeer/",
    icon: <FaLinkedin />,
  },
  {
    label: "Personal portfolio",
    href: "https://your-portfolio-url.com",
    icon: <IoPersonCircle />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/185RSs1obm/?mibextid=wwXIfr",
    icon: <FaFacebookSquare />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/shad_bro?igsh=MTViYzNkYm5kdTJzeQ%3D%3D&utm_source=qr",
    icon: <FaInstagram />,
  },
];

export default function ContactSocialLinks() {
  return (
    <nav className="contact-social-links" aria-label="Ahmad's social profiles">
      {socialLinks.map((social) => (
        <a
          aria-label={social.label}
          className="contact-social-link"
          href={social.href}
          key={social.label}
          rel="noopener noreferrer"
          target="_blank"
          title={social.label}
        >
          <span aria-hidden="true" className="contact-social-icon">
            {social.icon}
          </span>
        </a>
      ))}
    </nav>
  );
}

import instagramLogo from "../assets/logos/instagram.svg";
import behanceLogo from "../assets/logos/behance.svg";
import linkedinLogo from "../assets/logos/linkedin.svg";
import facebookLogo from "../assets/logos/facebook.svg";
import xLogo from "../assets/logos/x.svg";

const socials = [
  {
    icon: instagramLogo,
    href: "https://instagram.com",
  },
  {
    icon: behanceLogo,
    href: "https://behance.net",
  },
  {
    icon: linkedinLogo,
    href: "https://linkedin.com",
  },
  {
    icon: facebookLogo,
    href: "https://facebook.com",
  },
  {
    icon: xLogo,
    href: "https://x.com",
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-(--border) bg-(--background) px-6 py-7 md:px-12 lg:px-18">
      <p className="m-0 text-base text-(--muted-text)">
        © {new Date().getFullYear()} Saurav Vishwakarma. All rights reserved.
      </p>

      <div className="flex items-center gap-5">
        {socials.map(({ icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <img
              src={icon}
              className="h-6 w-6 grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110"
            />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

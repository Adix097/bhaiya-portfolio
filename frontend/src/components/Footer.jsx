import { useState } from "react";

import instagramWhite from "../assets/logos/black-and-white/instagram.svg";
import instagramColor from "../assets/logos/colored/instagram.svg";

import behanceWhite from "../assets/logos/black-and-white/behance.svg";
import behanceColor from "../assets/logos/colored/behance.svg";

import linkedinWhite from "../assets/logos/black-and-white/linkedin.svg";
import linkedinColor from "../assets/logos/colored/linkedin.svg";

import facebookWhite from "../assets/logos/black-and-white/facebook.svg";
import facebookColor from "../assets/logos/colored/facebook.svg";

import xWhite from "../assets/logos/black-and-white/x.svg";
import xColor from "../assets/logos/colored/x.svg";

const socials = [
  {
    white: instagramWhite,
    color: instagramColor,
    href: "https://instagram.com",
  },
  {
    white: behanceWhite,
    color: behanceColor,
    href: "https://behance.net",
  },
  {
    white: linkedinWhite,
    color: linkedinColor,
    href: "https://linkedin.com",
  },
  {
    white: facebookWhite,
    color: facebookColor,
    href: "https://facebook.com",
  },
  {
    white: xWhite,
    color: xColor,
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
        {socials.map(({ white, color, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-6 w-6"
          >
            <img
              src={white}
              alt=""
              className="absolute inset-0 h-6 w-6 transition-opacity duration-300 group-hover:opacity-0"
            />
            <img
              src={color}
              alt=""
              className="absolute inset-0 h-6 w-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-110"
            />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

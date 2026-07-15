import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "chhoa.anika07@gmail.com";
const CONTACT_PHONE = "+8801761651313";
const FACEBOOK_URL = "https://m.facebook.com/jonaki.chhoa.9/";
const LINKEDIN_URL = "https://www.linkedin.com/in/anika-mizan-chhoa/";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-lg px-margin-mobile md:px-margin-desktop py-xxl">
        <div className="flex flex-col gap-md">
          <span className="font-headline-md text-headline-md font-bold text-secondary">
            <Link to="/">OpenShelf</Link>
          </span>
          <p className="font-body-md text-white/80">
            Empowering readers through a modern, curated, and accessible
            literary ecosystem.
          </p>
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="font-headline-md text-body-lg mb-sm">Quick Links</h4>
          <Link className="font-label-sm text-white/80 hover:text-secondary transition-colors" to="/books">Browse Catalog</Link>
          <Link className="font-label-sm text-white/80 hover:text-secondary transition-colors" to="/pricing">Membership Plans</Link>
          <Link className="font-label-sm text-white/80 hover:text-secondary transition-colors" to="/about">About Us</Link>
          <Link className="font-label-sm text-white/80 hover:text-secondary transition-colors" to="/contact">Contact</Link>
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="font-headline-md text-body-lg mb-sm">Contact</h4>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-xs font-label-sm text-white/80 hover:text-secondary transition-colors"
          >
            <Mail className="w-4 h-4 shrink-0" /> {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="flex items-center gap-xs font-label-sm text-white/80 hover:text-secondary transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0" /> {CONTACT_PHONE}
          </a>

          <div className="flex gap-md pt-sm">

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OpenShelf on Facebook"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <FaFacebook className="w-4 h-4" />
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OpenShelf on LinkedIn"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          </div>
        </div>

        <div className="flex flex-col gap-md">
          <h4 className="font-headline-md text-body-lg">Legal</h4>
          <Link className="font-label-sm text-white/80 hover:text-secondary transition-colors" to="/privacy">Privacy Policy</Link>
          <Link className="font-label-sm text-white/80 hover:text-secondary transition-colors" to="/privacy">Terms of Service</Link>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-margin-desktop py-lg border-t border-white/10 text-center">
        <p className="font-label-sm text-white/60">
          © {new Date().getFullYear()} OpenShelf. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

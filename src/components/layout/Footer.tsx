export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-lg px-margin-mobile md:px-margin-desktop py-xxl">
        <div className="flex flex-col gap-md">
          <span className="font-headline-md text-headline-md font-bold text-secondary">Libro</span>
          <p className="font-body-md text-white/80">
            Empowering readers through a modern, curated, and accessible literary ecosystem.
          </p>
        </div>
        <div className="flex flex-col gap-sm">
          <h4 className="font-headline-md text-body-lg mb-sm">Quick Links</h4>
          <a className="font-label-sm text-white/80 hover:text-secondary transition-colors" href="/books">Browse Catalog</a>
          <a className="font-label-sm text-white/80 hover:text-secondary transition-colors" href="/pricing">Membership Plans</a>
        </div>
        <div className="flex flex-col gap-sm">
          <h4 className="font-headline-md text-body-lg mb-sm">Contact</h4>
          <p className="font-label-sm text-white/80">support@libro.io</p>
        </div>
        <div className="flex flex-col gap-md">
          <h4 className="font-headline-md text-body-lg">Newsletter</h4>
          <p className="font-label-sm text-white/80">Stay updated with new arrivals.</p>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-margin-desktop py-lg border-t border-white/10 text-center">
        <p className="font-label-sm text-white/60">© {new Date().getFullYear()} Libro Library System. All rights reserved.</p>
      </div>
    </footer>
  );
}
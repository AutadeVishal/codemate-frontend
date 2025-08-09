const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 shadow-lg rounded-t-xl">
      <aside>
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} - All rights reserved by Me Myself!
        </p>
      </aside>
    </footer>
  );
};
export default Footer;
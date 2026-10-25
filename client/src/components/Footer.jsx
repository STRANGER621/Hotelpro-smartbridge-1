import { Link } from 'react-router-dom';
import { Hotel, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
export default function Footer() {
  return <footer className="footer" id="about"><div className="container footer-main">
    <div className="footer-brand"><Link to="/" className="brand brand-light"><span className="brand-icon"><Hotel size={20}/></span><span>hotelpro<span className="brand-dot">.</span></span></Link><p>Thoughtful spaces. Unhurried moments.<br/>A better way to stay.</p><div className="socials"><a href="#about" aria-label="Instagram"><Instagram size={17}/></a><a href="#about" aria-label="Facebook"><Facebook size={17}/></a></div></div>
    <div className="footer-column"><h4>Explore</h4><Link to="/rooms">Our rooms</Link><a href="/#experience">Experiences</a><a href="/#about">Our story</a></div>
    <div className="footer-column"><h4>Guest services</h4><Link to="/bookings">My bookings</Link><Link to="/login">Guest account</Link><a href="mailto:hello@hotelpro.example">Contact us <ArrowUpRight size={13}/></a></div>
    <div className="footer-note"><span className="eyebrow">A little more considered</span><p>Good design, warm service, and room to breathe.</p></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} HotelPro Hospitality</span><span>Made for the moments in between.</span></div></footer>;
}

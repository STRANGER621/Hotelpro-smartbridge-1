import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Leaf, Sparkles, ShieldCheck, ChevronDown } from 'lucide-react';
import api from '../api.js';
import RoomCard from '../components/RoomCard.jsx';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState({ checkIn: '', checkOut: '', guests: '2' });
  useEffect(() => { api.get('/rooms').then(({data}) => setRooms(data.rooms.slice(0, 3))).catch(() => setError('Could not load rooms. Make sure the backend is running.')); }, []);
  const submitSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(search).toString();
    window.location.href = `/rooms?${query}`;
  };
  return <div>
    <section className="hero">
      <div className="hero-bg"></div><div className="hero-shade"></div>
      <div className="container hero-content">
        <div className="hero-kicker"><span className="kicker-line"></span> A BOUTIQUE HOTEL EXPERIENCE <span className="kicker-line"></span></div>
        <h1>Stay somewhere<br/><em>that stays with you.</em></h1>
        <p className="hero-copy">Quiet luxury, thoughtful details, and a sense of place.<br className="desktop-only"/> Your next favourite stay begins here.</p>
        <div className="hero-actions"><Link to="/rooms" className="btn btn-cream">Explore rooms <ArrowUpRight size={17}/></Link><a href="#experience" className="hero-secondary">Discover HotelPro <span>↓</span></a></div>
        <div className="hero-caption"><span>DESIGNED FOR THE WAY YOU WANT TO FEEL</span><span>01 — 03</span></div>
      </div>
      <div className="hero-side-note">HOSPITALITY, WITH INTENTION</div>
    </section>
    <section className="booking-strip"><form className="booking-form container" onSubmit={submitSearch}>
      <label><span>CHECK IN</span><input type="date" value={search.checkIn} min={new Date().toISOString().slice(0,10)} onChange={e=>setSearch({...search,checkIn:e.target.value})}/></label>
      <label><span>CHECK OUT</span><input type="date" value={search.checkOut} min={search.checkIn || new Date().toISOString().slice(0,10)} onChange={e=>setSearch({...search,checkOut:e.target.value})}/></label>
      <label><span>GUESTS</span><select value={search.guests} onChange={e=>setSearch({...search,guests:e.target.value})}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option></select></label>
      <button className="btn btn-dark booking-submit" type="submit">Find your stay <ArrowRight size={17}/></button>
    </form></section>
    <section className="intro-section section-pad" id="experience"><div className="container intro-grid">
      <div className="section-label"><span className="label-number">01</span><span>THE HOTELPRO FEELING</span></div>
      <div className="intro-copy"><p className="eyebrow">MORE THAN A PLACE TO SLEEP</p><h2>A slower kind of <em>somewhere.</em></h2><p className="large-copy">We believe the best stays don't ask for your attention. They give it back to you. Every space is designed to feel considered, personal, and quietly exceptional.</p><Link to="/rooms" className="underlined-link">Find your room <ArrowUpRight size={16}/></Link></div>
      <div className="intro-photo"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85" alt="Warm, thoughtfully designed hotel lounge"/><div className="photo-note"><span>THE ART OF ARRIVING</span><span>01 / HOTELPRO</span></div></div>
    </div></section>
    <section className="rooms-section section-pad"><div className="container"><div className="section-heading"><div><p className="eyebrow">YOUR SPACE, YOUR PACE</p><h2>Rooms with <em>room to breathe.</em></h2></div><Link to="/rooms" className="underlined-link">View all rooms <ArrowUpRight size={16}/></Link></div>
      {error && <p className="notice notice-error">{error}</p>}
      <div className="rooms-grid">{rooms.map((room,i)=><RoomCard room={room} index={i} key={room._id}/>)}</div>
      {!rooms.length && !error && <div className="loading-line">Finding your next stay…</div>}
    </div></section>
    <section className="values-section"><div className="container values-grid"><div className="values-heading"><p className="eyebrow">THE LITTLE THINGS MATTER</p><h2>Thoughtfully done.<br/><em>Every time.</em></h2></div><div className="value-item"><span className="value-icon"><Leaf/></span><h3>Rooted in place</h3><p>Spaces that feel connected to their surroundings, not separate from them.</p></div><div className="value-item"><span className="value-icon"><Sparkles/></span><h3>Considered comfort</h3><p>Small details, genuine materials, and the kind of comfort you notice.</p></div><div className="value-item"><span className="value-icon"><ShieldCheck/></span><h3>Care comes first</h3><p>Warm, attentive hospitality that leaves you free to enjoy the moment.</p></div></div></section>
    <section className="cta-section"><div className="cta-image"></div><div className="container cta-content"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Make room for<br/><em>something good.</em></h2><Link to="/rooms" className="btn btn-cream">Find your stay <ArrowRight size={17}/></Link></div></section>
  </div>;
}

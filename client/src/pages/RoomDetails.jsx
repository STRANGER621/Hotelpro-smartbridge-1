import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Users, BedDouble, Wifi, CalendarDays } from 'lucide-react';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: '2' });
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { api.get(`/rooms/${id}`).then(({data})=>setRoom(data.room)).catch(()=>setMessage('This room could not be found.')); }, [id]);
  const nights = form.checkIn && form.checkOut && new Date(form.checkOut)>new Date(form.checkIn) ? Math.ceil((new Date(form.checkOut)-new Date(form.checkIn))/86400000) : 0;
  const reserve = async (e) => {
    e.preventDefault(); setMessage('');
    if (!user) { navigate('/login', { state: { from: `/rooms/${id}` } }); return; }
    if (!nights) { setMessage('Choose valid check-in and check-out dates.'); return; }
    setBusy(true);
    try {
      const { data } = await api.post('/bookings', { roomId: id, ...form, guests: Number(form.guests) });
      navigate('/bookings', { state: { message: `Your reservation for ${room.name} is confirmed.` } });
    } catch (err) { setMessage(err.response?.data?.message || 'Booking could not be created.'); }
    finally { setBusy(false); }
  };
  if (!room) return <div className="container page-state">{message || 'Loading room…'}</div>;
  return <section className="details-page"><div className="container"><Link to="/rooms" className="back-link"><ArrowLeft size={16}/> All rooms</Link><div className="details-title-row"><div><p className="eyebrow">{room.category.toUpperCase()} COLLECTION</p><h1>{room.name}</h1><p className="details-subtitle">{room.description}</p></div><div className="details-price"><strong>₹{Number(room.pricePerNight).toLocaleString('en-IN')}</strong><span>per night</span></div></div>
    <div className="details-image"><img src={room.imageUrl} alt={room.name}/></div>
    <div className="details-layout"><div className="details-info"><h2>Everything in its place.</h2><p className="large-copy">{room.description} Settle in, slow down, and make the space your own.</p><div className="details-facts"><span><Users/>{room.capacity} guests</span><span><BedDouble/>{room.beds}</span><span><Wifi/>Complimentary Wi-Fi</span></div><h3>Thoughtful amenities</h3><div className="amenities-grid">{(room.amenities?.length?room.amenities:['Wi-Fi','Air conditioning','Daily housekeeping']).map(a=><span key={a}><Check size={16}/>{a}</span>)}</div></div>
    <aside className="reservation-card"><p className="eyebrow">MAKE IT YOURS</p><h2>Reserve your stay</h2><form onSubmit={reserve} className="reservation-form"><label>Check-in<input type="date" required min={new Date().toISOString().slice(0,10)} value={form.checkIn} onChange={e=>setForm({...form,checkIn:e.target.value})}/></label><label>Check-out<input type="date" required min={form.checkIn || new Date().toISOString().slice(0,10)} value={form.checkOut} onChange={e=>setForm({...form,checkOut:e.target.value})}/></label><label>Guests<select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}>{Array.from({length:room.capacity},(_,i)=><option key={i+1} value={i+1}>{i+1} guest{i?'s':''}</option>)}</select></label>
      {nights>0&&<div className="price-breakdown"><span>₹{Number(room.pricePerNight).toLocaleString('en-IN')} × {nights} nights</span><strong>₹{(room.pricePerNight*nights).toLocaleString('en-IN')}</strong></div>}
      {message&&<p className="notice notice-error">{message}</p>}<button className="btn btn-dark btn-full" disabled={busy}>{busy?'Reserving…':user?'Confirm reservation':'Sign in to reserve'} <CalendarDays size={16}/></button><p className="form-footnote">No payment is collected on this step.</p></form></aside></div>
  </div></section>;
}

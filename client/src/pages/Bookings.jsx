import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, ArrowUpRight, XCircle } from 'lucide-react';
import api from '../api.js';

const dateFmt = (d) => new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
export default function Bookings() {
  const [bookings,setBookings]=useState([]);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  const [busyId,setBusyId]=useState('');
  const location=useLocation();
  const load=()=>api.get('/bookings/mine').then(({data})=>setBookings(data.bookings)).catch(err=>setError(err.response?.data?.message||'Could not load bookings.')).finally(()=>setLoading(false));
  useEffect(()=>{load();},[]);
  const cancel=async(id)=>{if(!confirm('Cancel this reservation?'))return;setBusyId(id);setError('');try{await api.patch(`/bookings/${id}/cancel`);await load();}catch(err){setError(err.response?.data?.message||'Cancellation failed.');}finally{setBusyId('');}};
  const pay=async(id)=>{setBusyId(id);setError('');try{const {data}=await api.post(`/payments/${id}/checkout`);window.location.href=data.url;}catch(err){setError(err.response?.data?.message||'Payment could not be started.');setBusyId('');}};
  return <section className="account-page"><div className="container"><div className="account-heading"><div><p className="eyebrow">YOUR HOTELPRO ACCOUNT</p><h1>Your stays, <em>all in one place.</em></h1><p>Keep track of upcoming trips and revisit your past stays.</p></div><Link to="/rooms" className="btn btn-dark">Find another stay <ArrowUpRight size={16}/></Link></div>
    {location.state?.message&&<p className="notice notice-success">{location.state.message}</p>}{error&&<p className="notice notice-error">{error}</p>}
    {loading?<div className="loading-line">Loading your stays…</div>:bookings.length?<div className="booking-list">{bookings.map(b=><article className="booking-item" key={b._id}><img src={b.room?.imageUrl} alt={b.room?.name||'Room'}/><div className="booking-item-main"><div className="booking-topline"><span className={`status status-${b.status}`}>{b.status}</span><span className="booking-id">REF · {b._id.slice(-7).toUpperCase()}</span></div><h3>{b.room?.name||'Hotel room'}</h3><p><CalendarDays size={15}/>{dateFmt(b.checkIn)} — {dateFmt(b.checkOut)} · {b.nights} night(s)</p><span className="payment-label">Payment: {b.paymentStatus}</span></div><div className="booking-item-side"><strong>₹{Number(b.totalPrice).toLocaleString('en-IN')}</strong><span>{b.guests} guest(s)</span>{b.status!=='cancelled'&&b.paymentStatus!=='paid'&&<button className="text-link" onClick={()=>pay(b._id)} disabled={busyId===b._id}>{busyId===b._id?'Opening…':'Pay now'}</button>}{b.status!=='cancelled'&&new Date(b.checkIn)>new Date()&&<button className="cancel-link" onClick={()=>cancel(b._id)} disabled={busyId===b._id}><XCircle size={14}/> Cancel</button>}</div></article>)}</div>:<div className="empty-state"><span className="empty-icon"><CalendarDays size={24}/></span><h3>No stays booked yet</h3><p>Your next good stay is just around the corner.</p><Link to="/rooms" className="btn btn-dark">Explore rooms <ArrowUpRight size={16}/></Link></div>}
  </div></section>;
}

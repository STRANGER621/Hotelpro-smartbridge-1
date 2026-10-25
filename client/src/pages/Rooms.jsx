import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from '../api.js';
import RoomCard from '../components/RoomCard.jsx';

export default function Rooms() {
  const [params] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [guests, setGuests] = useState(params.get('guests') || '2');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    setLoading(true);
    api.get('/rooms', { params: { category, q: query, guests } }).then(({data}) => { setRooms(data.rooms); setError(''); }).catch(() => setError('Unable to load rooms. Check that the API is running.')).finally(() => setLoading(false));
  }, [category, query, guests]);
  return <section className="listing-page"><div className="listing-hero"><div className="container"><p className="eyebrow">FIND YOUR SPACE</p><h1>A room for <em>your kind of stay.</em></h1><p>From quiet weekends to longer escapes, find a space that feels like yours.</p><div className="listing-count">{rooms.length} thoughtfully appointed spaces</div></div></div>
    <div className="container listing-content"><div className="filter-bar"><div className="search-field"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search rooms or features"/></div><div className="filter-select"><SlidersHorizontal size={16}/><select value={guests} onChange={e=>setGuests(e.target.value)}><option value="">Any guests</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} guest{n>1?'s':''}</option>)}</select></div></div>
      <div className="category-tabs">{['All','Standard','Deluxe','Suite','Family'].map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'category-tab active':'category-tab'}>{c}</button>)}</div>
      {error && <p className="notice notice-error">{error}</p>}
      {loading ? <div className="loading-line">Finding your next stay…</div> : rooms.length ? <div className="rooms-grid listing-grid">{rooms.map((r,i)=><RoomCard key={r._id} room={r} index={i}/>)}</div> : <div className="empty-state"><h3>No rooms found</h3><p>Try another category or search term.</p><button className="btn btn-dark" onClick={()=>{setCategory('All');setQuery('');setGuests('');}}>Clear filters</button></div>}
    </div>
  </section>;
}

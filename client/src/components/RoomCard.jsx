import { Link } from 'react-router-dom';
import { ArrowUpRight, Users, BedDouble } from 'lucide-react';

export default function RoomCard({ room, index = 0 }) {
  return <article className="room-card" style={{ animationDelay: `${index * 70}ms` }}>
    <Link to={`/rooms/${room._id}`} className="room-image-wrap">
      <img className="room-image" src={room.imageUrl} alt={room.name} loading="lazy" />
      <span className="room-category">{room.category}</span>
      <span className="image-arrow"><ArrowUpRight size={18}/></span>
    </Link>
    <div className="room-card-body">
      <div className="room-card-title"><h3>{room.name}</h3><span className="rating">★ 4.9</span></div>
      <p className="room-description">{room.description}</p>
      <div className="room-meta"><span><Users size={15}/>{room.capacity} guests</span><span><BedDouble size={15}/>{room.beds}</span></div>
      <div className="room-card-footer"><div><strong>₹{Number(room.pricePerNight).toLocaleString('en-IN')}</strong><span> / night</span></div><Link to={`/rooms/${room._id}`} className="text-link">View room <ArrowUpRight size={15}/></Link></div>
    </div>
  </article>;
}

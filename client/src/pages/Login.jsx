import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Hotel, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [mode,setMode]=useState('login');
  const [form,setForm]=useState({name:'',email:'',password:'',phone:''});
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const {login,register}=useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const submit=async(e)=>{
    e.preventDefault();setError('');setBusy(true);
    try { if(mode==='login') await login(form.email,form.password); else await register(form); navigate(location.state?.from || '/',{replace:true}); }
    catch(err){setError(err.response?.data?.message || 'Could not sign in. Please try again.');}
    finally{setBusy(false);}
  };
  return <section className="auth-page"><div className="auth-visual"><div className="auth-visual-bg"></div><Link to="/" className="brand brand-light"><span className="brand-icon"><Hotel size={20}/></span><span>hotelpro<span className="brand-dot">.</span></span></Link><div className="auth-visual-copy"><p className="eyebrow">A BETTER WAY TO STAY</p><h2>Arrive as you are.<br/><em>Feel right at home.</em></h2><p>Thoughtful spaces for wherever life takes you.</p></div><span className="auth-photo-credit">HOSPITALITY, WITH INTENTION</span></div>
    <div className="auth-panel"><div className="auth-box"><p className="eyebrow">{mode==='login'?'WELCOME BACK':'JOIN HOTELPRO'}</p><h1>{mode==='login'?'Good to have you here.':'Your next stay awaits.'}</h1><p className="auth-sub">{mode==='login'?'Sign in to manage your reservations.':'Create an account to make every stay simpler.'}</p>
      <div className="auth-switch"><button className={mode==='login'?'selected':''} onClick={()=>{setMode('login');setError('');}}>Sign in</button><button className={mode==='register'?'selected':''} onClick={()=>{setMode('register');setError('');}}>Create account</button></div>
      <form className="auth-form" onSubmit={submit}>{mode==='register'&&<label>Full name<input required autoComplete="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>}
        <label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
        {mode==='register'&&<label>Phone (optional)<input autoComplete="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91"/></label>}
        <label>Password<input required minLength={8} type="password" autoComplete={mode==='login'?'current-password':'new-password'} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="At least 8 characters"/></label>
        {error&&<p className="notice notice-error">{error}</p>}<button className="btn btn-dark btn-full" disabled={busy}>{busy?'Please wait…':mode==='login'?'Sign in':'Create account'} <ArrowRight size={16}/></button></form><p className="auth-terms">By continuing, you agree to our terms and privacy policy.</p><Link className="auth-back" to="/">← Back to HotelPro</Link></div></div>
  </section>;
}

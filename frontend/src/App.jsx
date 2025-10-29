import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const Navbar = ({ onCTAClick }) => (
  <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-sm border-b">
    <div className="max-w-6xl mx-auto flex items-center gap-6 p-4">
      <Link to="/" className="font-semibold text-lg">Code<span className="text-codeexpress-accent">Express</span></Link>
      <nav className="ml-auto hidden md:flex gap-4 items-center">
        <Link to="/#servicios" className="text-sm">Servicios</Link>
        <Link to="/portafolio" className="text-sm">Portafolio</Link>
        <Link to="/equipo" className="text-sm">Equipo</Link>
        <button onClick={onCTAClick} className="ml-2 bg-codeexpress-accent text-black px-3 py-2 rounded-lg text-sm">Solicitá una reunión</button>
      </nav>
      <MobileMenu onCTAClick={onCTAClick} />
    </div>
  </header>
);

const MobileMenu = ({ onCTAClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden ml-auto">
      <button onClick={() => setOpen(v => !v)} className="p-2">☰</button>
      {open && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute right-4 top-16 bg-white p-4 rounded-lg w-48 shadow-lg">
          <Link to="/portafolio" onClick={() => setOpen(false)} className="block py-2">Portafolio</Link>
          <Link to="/equipo" onClick={() => setOpen(false)} className="block py-2">Equipo</Link>
          <button onClick={() => { setOpen(false); onCTAClick(); }} className="w-full text-left py-2">Solicitá una reunión</button>
        </motion.div>
      )}
    </div>
  );
};

const Hero = () => (
  <section className="bg-gradient-to-r from-white to-gray-50">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center p-8">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x:0, opacity:1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold">Ayudamos a emprendedores a transformar ideas en negocios rentables.</h1>
        <p className="mt-3 text-gray-600">Estrategia práctica, diseño y ejecución orientada a resultados. No consultoría de escritorio: trabajamos con vos.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/contacto" className="px-4 py-2 rounded-lg bg-codeexpress-accent text-black">Solicitá una reunión</Link>
          <Link to="/portafolio" className="px-4 py-2 rounded-lg border">Ver proyectos</Link>
        </div>
        <ul className="mt-4 flex gap-4 text-sm text-gray-500">
          <li>+20 empresas asesoradas</li>
          <li>+40% eficiencia promedio</li>
        </ul>
      </motion.div>
      <motion.div className="flex justify-center" initial={{ scale:0.98, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.6 }}>
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
          <img src="/public/assets/img/hero-mockup.jpg" alt="mockup" className="rounded-lg w-full h-48 object-cover" />
        </div>
      </motion.div>
    </div>
  </section>
);

const Services = () => (
  <section id="servicios" className="max-w-6xl mx-auto p-8">
    <h2 className="text-2xl font-semibold">Servicios</h2>
    <p className="text-gray-500">Soluciones pensadas para emprendedores que quieren escalar sin drama.</p>
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      <Card title="Validación de producto" text="Testeo rápido con usuarios, prototipos y métricas. De idea a MVP en 8 semanas." />
      <Card title="Estrategia comercial" text="Funnel, pricing y canales. Pruebas con público real y mejoras iterativas." />
      <Card title="Operaciones" text="Automatización y optimización de procesos para reducir horas operativas." />
    </div>
  </section>
);

const Card = ({ title, text }) => (
  <motion.article whileHover={{ y: -6 }} className="bg-white p-5 rounded-2xl shadow">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{text}</p>
  </motion.article>
);

const ProjectsGrid = () => {
  const [projects, setProjects] = useState([]);
  useEffect(()=>{
    fetch(API_BASE + '/projects')
      .then(r=>r.json())
      .then(setProjects)
      .catch(()=>setProjects([]));
  },[]);
  return (
    <section className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-semibold">Casos de éxito</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {projects.length===0 && <p className="text-gray-500">No hay proyectos públicos. Subí capturas desde el panel admin.</p>}
        {projects.map(p=> (
          <motion.article key={p.id} whileHover={{ scale:1.02 }} className="bg-white rounded-2xl overflow-hidden shadow">
            <img src={API_BASE.replace('/api','') + p.image} alt={p.title} className="w-full h-44 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.client} • {p.year}</p>
              <p className="mt-2 text-gray-600 text-sm">{p.short}</p>
              <div className="mt-3 flex justify-between items-center">
                <Link to={`/proyecto/${p.id}`} className="text-sm text-codeexpress-accent">Ver caso</Link>
                <span className="text-xs text-gray-400">Ver más →</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  useEffect(()=>{
    fetch(API_BASE + '/projects/' + id)
      .then(r=>r.json())
      .then(setProject)
      .catch(()=>setProject(null));
  },[id]);
  if(!project) return <div className="p-8">Cargando o proyecto no encontrado.</div>;
  return (
    <article className="max-w-4xl mx-auto p-8">
      <img src={API_BASE.replace('/api','') + project.image} alt={project.title} className="w-full h-64 object-cover rounded-xl shadow" />
      <h1 className="text-2xl font-semibold mt-6">{project.title}</h1>
      <p className="text-gray-500">Cliente: {project.client} • Año: {project.year}</p>
      <p className="mt-4">{project.short}</p>
      <div className="mt-6">
        <h3 className="font-semibold">Desafío</h3>
        <p className="text-gray-600">{project.challenge || '(no disponible)'}</p>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Solución</h3>
        <p className="text-gray-600">{project.solution || '(no disponible)'}</p>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Resultado</h3>
        <p className="text-gray-600">{project.result || '(no disponible)'}</p>
      </div>
    </article>
  );
};

const Team = () => {
  const [team, setTeam] = useState([]);
  useEffect(()=>{
    fetch(API_BASE + '/team')
      .then(r=>r.json())
      .then(setTeam).catch(()=>setTeam([]));
  },[]);
  return (
    <section id="equipo" className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-semibold">Equipo</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {team.map(m=> (
          <motion.div whileHover={{ y:-6 }} key={m.id} className="bg-white p-4 rounded-2xl shadow flex flex-col items-center text-center">
            <img src={API_BASE.replace('/api','') + m.photo} alt={m.name} className="w-28 h-28 rounded-full object-cover" />
            <h4 className="mt-3 font-semibold">{m.name}</h4>
            <p className="text-sm text-codeexpress-accent">{m.role}</p>
            <p className="text-sm text-gray-600 mt-2">{m.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre:'', email:'', mensaje:''});
  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(API_BASE + '/contacts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)});
      if(res.ok) { alert('Mensaje enviado — te contactamos pronto'); navigate('/'); }
      else alert('Error al enviar');
    }catch(e){ alert('Error al enviar'); }
  };
  return (
    <section id="contacto" className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-semibold">Contacto</h2>
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <input required value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} placeholder="Nombre" className="p-3 rounded-lg border" />
        <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="p-3 rounded-lg border" />
        <textarea required value={form.mensaje} onChange={e=>setForm({...form,mensaje:e.target.value})} placeholder="Mensaje" className="p-3 rounded-lg border" rows={5}></textarea>
        <button className="bg-codeexpress-accent text-black px-4 py-2 rounded-lg">Enviar</button>
      </form>
    </section>
  );
};

const Admin = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [token, setToken] = useState(localStorage.getItem('ce_token') || '');
  const login = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch((API_BASE.replace('/api','')+'/admin/login'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username:user,password:pass})});
      const json = await res.json();
      if(json.token){ localStorage.setItem('ce_token', json.token); setToken(json.token); alert('Login OK'); }
      else alert('Credenciales inválidas');
    }catch(e){ alert('error'); }
  };
  if(!token) return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-xl font-semibold">Admin</h2>
      <form onSubmit={login} className="mt-4 grid gap-3">
        <input value={user} onChange={e=>setUser(e.target.value)} placeholder="Usuario" className="p-3 rounded-lg border" />
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" className="p-3 rounded-lg border" />
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Entrar</button>
      </form>
    </div>
  );
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-xl font-semibold">Admin — Área</h2>
      <p className="text-gray-500">Autenticado con token. Usa panel PHP o amplia este SPA para CRUD.</p>
    </div>
  );
};

export default function App(){
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar onCTAClick={() => window.location.href='/contacto'} />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/portafolio" element={<ProjectsGrid />} />
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          <Route path="/equipo" element={<Team />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function MainLayout(){
  return (
    <main>
      <Hero />
      <Services />
      <ProjectsGrid />
      <Team />
      <Contact />
    </main>
  );
}

function Footer(){
  return (
    <footer className="mt-12 border-t bg-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm">© {new Date().getFullYear()} CodeExpress • Política de privacidad</div>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

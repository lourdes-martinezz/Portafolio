const express = require('express');
const router = express.Router();
const connect = require('../config/db');
// GET /api/projects
router.get('/projects', async (req,res)=>{
  try{
    const db = await connect();
    const [rows] = await db.query('SELECT id,title,client,year,short_text AS short,image_path FROM projects WHERE is_public=1 ORDER BY year DESC');
    rows.forEach(r=> r.image = r.image_path ? '/uploads/'+r.image_path : '/public/assets/img/project-placeholder.png');
    res.json(rows);
  }catch(e){ res.status(500).json({error:'db_error'}); }
});
router.get('/projects/:id', async (req,res)=>{
  try{
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ? LIMIT 1',[req.params.id]);
    if(!rows.length) return res.status(404).json({error:'not_found'});
    const r = rows[0]; r.image = r.image_path ? '/uploads/'+r.image_path : '/public/assets/img/project-placeholder.png';
    res.json(r);
  }catch(e){ res.status(500).json({error:'db_error'}); }
});
router.get('/team', async (req,res)=>{
  try{
    const db = await connect();
    const [rows] = await db.query('SELECT id,name,role,bio,photo_path FROM team');
    rows.forEach(r=> r.photo = r.photo_path ? '/uploads/'+r.photo_path : '/public/assets/img/avatar-placeholder.png');
    res.json(rows);
  }catch(e){ res.status(500).json({error:'db_error'}); }
});
router.get('/testimonials', async (req,res)=>{
  try{
    const db = await connect();
    const [rows] = await db.query('SELECT author,role,text FROM testimonials ORDER BY created_at DESC LIMIT 6');
    res.json(rows);
  }catch(e){ res.status(500).json({error:'db_error'}); }
});
router.post('/contacts', async (req,res)=>{
  try{
    const {nombre,email,mensaje} = req.body;
    const db = await connect();
    await db.query('INSERT INTO contacts (nombre,email,mensaje) VALUES (?,?,?)',[nombre,email,mensaje]);
    res.json({ok:1});
  }catch(e){ res.status(500).json({error:'db_error'}); }
});
module.exports = router;

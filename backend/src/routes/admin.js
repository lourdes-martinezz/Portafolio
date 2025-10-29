const express = require('express');
const router = express.Router();
const connect = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const auth = require('../middleware/auth');
const upload = multer({ dest: __dirname + '/uploads/' });
// POST /admin/login
router.post('/login', async (req,res)=>{
  try{
    const { username, password } = req.body;
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ? LIMIT 1',[username]);
    if(!rows.length) return res.status(401).json({error:'invalid'});
    const admin = rows[0];
    const ok = await bcrypt.compare(password, admin.password_hash);
    if(!ok) return res.status(401).json({error:'invalid'});
    const token = jwt.sign({id:admin.id,username:admin.username}, process.env.JWT_SECRET || 'dev_secret', {expiresIn:'8h'});
    res.json({token});
  }catch(e){ res.status(500).json({error:'server'}); }
});
// Protected example: create project (with image upload)
router.post('/projects', auth, upload.single('image'), async (req,res)=>{
  try{
    const { title, client, year, short_text, challenge, solution, result, is_public } = req.body;
    const image_path = req.file ? req.file.filename : null;
    const db = await connect();
    await db.query('INSERT INTO projects (title,client,year,short_text,challenge,solution,result,image_path,is_public) VALUES (?,?,?,?,?,?,?,?,?)',
      [title,client,year,short_text,challenge,solution,result,image_path,is_public?1:0]);
    res.json({ok:1});
  }catch(e){ console.error(e); res.status(500).json({error:'server'}); }
});
module.exports = router;

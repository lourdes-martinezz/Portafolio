const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({error:'no_token'});
  const [,token] = h.split(' ');
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = payload;
    next();
  }catch(e){ res.status(401).json({error:'invalid_token'}); }
};

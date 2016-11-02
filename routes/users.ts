import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';
let router = express.Router();

router.post('/Register', function(req, res, next) {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    if(err) return next(err);
    res.render("index");
  });
});

router.post('/Login/Local', function(req, res, next) {
  if(!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    if(err) return next(err);
    if(user) return res.json({ token : user.generateJWT() });
      return res.status(400).send(info);
  })(req, res, next);
});

export default router;

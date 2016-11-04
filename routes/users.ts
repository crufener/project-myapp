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
        if (err) return next(err);
        res.json(user);
    });
});

router.post('/Login', function(req, res, next) {
    if (!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
    passport.authenticate('local', function(err, user, info) {
        console.log(user);
        if (err) return next(err);
        if (user) return res.json({ token: user.generateJWT() });
        return res.status(400).send(info);
    })(req, res, next);
});


router.get('/profile', ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.json(user);
  });
});

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token);
    }
    catch (err) {
        return res.status(401).send({ message: err.message });
    }
    req.user = payload.id;
    next();
}

export default router;

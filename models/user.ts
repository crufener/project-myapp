import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';


let UserSchema = new mongoose.Schema({
  username: { 
      type: String, 
      lowercase: true, 
      unique: true,
      required: [true, "You must enter a username"]
    },
  email: { 
      type: String, 
      unique: true, 
      lowercase: true,
      required: [true, "You must enter an email"]
    },
  passwordHash: {
    type: String,
    required: [true, "You must enter a password"]
  },
  salt: String
});

UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
});

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function() {
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email
  }, 'SecretKey');
});

export default mongoose.model('User', UserSchema);
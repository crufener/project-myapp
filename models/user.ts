import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

/** Intrface for better compile time validation and more structured code guaratees */
export interface IUsers extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    salt: string,
    setPassword?;
    validatePassword?;
}

/** Create the user mongoose Schema  */
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

/**
* @function setPassword
* Define the setPassword
* @param password @type String
* @desc Hashes the password using crypto
*/
UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
});
/** Create the 'validatePassword' function to use inside routes */
UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
});
/** create @function 'generateJWT'
* It will contain the user id, unsername, and email
* stored in a JSONWEBTOKEN for easy client-side storage and validation
* @type Object
 */
UserSchema.method('generateJWT', function() {
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email
  }, 'SecretKey');
});

export default mongoose.model<IUsers>('User', UserSchema);

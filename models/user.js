import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true 
  },
  id: {
    type: String
  }
});
const User = mongoose.model('User', userSchema);

export default User;
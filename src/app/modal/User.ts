import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username?: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;

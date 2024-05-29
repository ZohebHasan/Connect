// src/types/express/index.d.ts
import { UserType } from '../src/models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: UserType & Document;
    }
  }
}

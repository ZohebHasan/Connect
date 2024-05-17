// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Request } from 'express';
// import { User, IUser } from './models/User'; 

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: 'YOUR_CLIENT_ID',
//       clientSecret: 'YOUR_CLIENT_SECRET',
//       callbackURL: '/auth/google/callback',
//       passReqToCallback: true,
//     },
//     async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
//       try {
//         const existingUser = await User.findOne({ googleId: profile.id });
//         if (existingUser) {
//           return done(null, existingUser);
//         }
//         const newUser = new User({
//           googleId: profile.id,
//           displayName: profile.displayName,
//           email: profile.emails[0].value,
//         });
//         await newUser.save();
//         return done(null, newUser);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

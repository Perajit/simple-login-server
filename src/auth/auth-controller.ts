import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateUserCredential } from './auth-service';

const JWT_SECRET = 'jwt-secret';
const TOKEN_COOKIE_KEY = 'access_token';

export async function login(req: Request, res: Response) {
  const { userName, password } = req.body;

  try {
    const userProfile = await validateUserCredential(userName, password);
    const jwtToken = jwt.sign(userProfile, JWT_SECRET);
  
    return res
      .cookie(TOKEN_COOKIE_KEY, jwtToken, { httpOnly: true, secure: true })
      .status(200)
      .json(userProfile);
  } catch(err) {
    console.log(err);

    return res
      .status(401)
      .json({ message: 'Invalid username or password'});
  }
};

export async function logout(req: Request, res: Response) {
  return res.clearCookie(TOKEN_COOKIE_KEY).end();
}

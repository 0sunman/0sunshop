import { sign, verify } from 'jsonwebtoken';

export function generateAccessToken(userId : any) {
  return sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
}

export function verifyAccessToken(token: any) {
  return verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
}
const { sign, verify } = require('jsonwebtoken');

export function generateAccessToken(userId : string) {
  return sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
}

export function verifyAccessToken(token: string) {
  return verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
}
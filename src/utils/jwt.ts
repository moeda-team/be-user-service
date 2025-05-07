import jwt, { SignOptions, Secret, JwtPayload as BaseJwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_ACCESS_SECRET: Secret =
  process.env.JWT_ACCESS_SECRET || crypto.randomBytes(64).toString('hex');
const JWT_REFRESH_SECRET: Secret =
  process.env.JWT_REFRESH_SECRET || crypto.randomBytes(64).toString('hex');
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface JwtPayload extends Omit<BaseJwtPayload, 'aud'> {
  userId: string;
  email: string;
  tokenType: TokenType;
  deviceId?: string;
  tokenId?: string;
  aud?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class JwtError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JwtError';
  }
}

export function generateTokenId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function signToken(
  payload: Partial<JwtPayload>,
  type: TokenType = TokenType.ACCESS,
): string {
  const secret = type === TokenType.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
  const expiresIn = type === TokenType.ACCESS ? JWT_ACCESS_EXPIRES_IN : JWT_REFRESH_EXPIRES_IN;

  const tokenPayload: JwtPayload = {
    ...payload,
    userId: payload.userId || '',
    email: payload.email || '',
    tokenType: type,
    tokenId: generateTokenId(),
    iat: Math.floor(Date.now() / 1000),
    aud: payload.aud,
  };

  const options: SignOptions = {
    expiresIn: Number(expiresIn),
  };

  return jwt.sign(tokenPayload, secret, options);
}

export function verifyToken(token: string, type: TokenType = TokenType.ACCESS): JwtPayload {
  try {
    const secret = type === TokenType.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new JwtError('Invalid or expired token');
  }
}

export function generateTokenPair(payload: Partial<JwtPayload>): TokenPair {
  return {
    accessToken: signToken(payload, TokenType.ACCESS),
    refreshToken: signToken(payload, TokenType.REFRESH),
  };
}

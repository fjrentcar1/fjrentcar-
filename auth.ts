import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

export type AuthUser = { id: string; name: string; email: string; role: 'CUSTOMER' | 'ADMIN' };
export type AuthSession = { user: AuthUser };

const COOKIE_NAME = 'fj_session';
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (!value) throw new Error('AUTH_SECRET belum dikonfigurasi di environment Vercel.');
  return value;
}

function encode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}
function decode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}
function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

function makeToken(user: AuthUser) {
  const payload = encode(JSON.stringify({ ...user, exp: Math.floor(Date.now() / 1000) + MAX_AGE }));
  return `${payload}.${sign(payload)}`;
}

function readToken(token: string | undefined): AuthUser | null {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(decode(payload)) as AuthUser & { exp?: number };
    if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    if (!data.id || !data.email || !data.role) return null;
    return { id: data.id, name: data.name || '', email: data.email, role: data.role };
  } catch {
    return null;
  }
}

export function createSessionToken(user: AuthUser) {
  return makeToken(user);
}

export async function auth(): Promise<AuthSession | null> {
  const store = await cookies();
  const user = readToken(store.get(COOKIE_NAME)?.value);
  return user ? { user } : null;
}

export function sessionCookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge: MAX_AGE };
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;

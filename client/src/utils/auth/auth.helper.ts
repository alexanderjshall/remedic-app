import jwt from "jsonwebtoken";
import { User } from "../../types";

export interface AuthUser {
  exp: string;
  id: number;
  isDoctor: boolean;
  iat: string;
  lang: string;
}

function parseToken(token: string): AuthUser {
  return jwt.decode(token) as AuthUser;
}

export function getTokenFromStorage(): null | AuthUser {
  const token = localStorage.getItem("authToken");
  return !token ? null : parseToken(token);
}

export function isTokenExpired(exp: string): boolean {
  return Date.now() > +exp * 1000;
}

async function fetchGQL(query: string) {
  return await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then((data) => data.json());
}

export async function loginWithTokenDoctor() {
  try {
    const response = await fetchGQL("{loginWithTokenDoctor}");
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function loginWithTokenPatient() {
  try {
    const response = await fetchGQL("{loginWithTokenPatient}");
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function checkUser(
  user: AuthUser | null
): Promise<AuthUser | null> {
  if (!user) return null;
  if (!isTokenExpired(user.exp)) return user;
  const newToken = await refreshToken(user);
  if (!newToken) return null;
  setTokenToStorage(newToken);
  return parseToken(newToken);
}

export async function refreshToken(user: AuthUser): Promise<string | null> {
  let newToken: string | null;
  if (user.isDoctor) {
    newToken = await loginWithTokenDoctor().then(
      (data) => data["loginWithTokenDoctor"]
    );
  } else {
    newToken = await loginWithTokenPatient().then(
      (data) => data["loginWithTokenPatient"]
    );
  }
  return newToken;
}

function setTokenToStorage(newToken: string) {
  localStorage.setItem("authToken", newToken);
}

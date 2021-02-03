import { parse } from "dotenv/types";
import jwt from "jsonwebtoken";
import { tokenToString } from "typescript";
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

export async function loginWithCredentials(email: string, password: string) {
  // Try to log in as patient
  let response = await fetchGQL(
    `{
      loginPatient(email: "${email}", password: "${password}")
    }`
  );
  if (response.data.loginPatient) {
    const token = response.data.loginPatient;
    setTokenToStorage(token);
    return parseToken(token);
  }
  // Try to log in as doctor
  response = await fetchGQL(
    `{loginDoctor(email: "${email}", password: "${password}")}`
  );
  if (response.data.loginDoctor) {
    const token = response.data.loginDoctor;
    setTokenToStorage(token);
    return parseToken(token);
  }
  return null;
}

export async function checkUser(
  user: AuthUser | null
): Promise<AuthUser | null> {
  if (!user) return null;
  if (!isTokenExpired(user.exp)) {
    console.log("token not expired! reurning it: ", user);
    return user;
  }
  const newToken = await refreshToken(user);
  if (!newToken) return null;
  setTokenToStorage(newToken);
  console.log("newToken", newToken);
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

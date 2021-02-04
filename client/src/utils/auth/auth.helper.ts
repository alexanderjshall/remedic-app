import jwt from "jsonwebtoken";
import { UserData } from "../../types";

export interface AuthUser {
  exp: string;
  id: number;
  isDoctor: boolean;
  iat: string;
  language: string;
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

  return await fetch(process.env.REACT_APP_BE_URL as string, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then((data) => data.json());
}

export async function loginWithTokenDoctor() {
  try {
    const response = await fetchGQL("{loginWithTokenDoctor}");
    return response.data['loginWithTokenDoctor'];
  } catch (error) {
    return null;
  }
}

export async function loginWithTokenPatient() {
  try {
    const response = await fetchGQL("{loginWithTokenPatient}");
    return response.data['loginWithTokenPatient'];
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
    return user;
  }
  const newToken = await refreshToken(user);
  if (!newToken) return null;
  setTokenToStorage(newToken);
  return parseToken(newToken);
}

export async function refreshToken(user: AuthUser): Promise<string | null> {
  return user.isDoctor ?
    await loginWithTokenDoctor() :
    await loginWithTokenPatient();
}

function setTokenToStorage(newToken: string) {
  localStorage.setItem("authToken", newToken);
}

export async function createPatient(patient: UserData) {
  let response = await fetchGQL(
    `mutation {
      createPatient(
        patientInput: {
          firstName: "${patient.firstName}",
          lastName,: "${patient.lastName}",
          email: "${patient.email}",
          password: "${patient.password}",
          language: "${patient.language}",
          postCode: "${patient.postCode}",
        }
        )
    }`
  );
  if (response.data.createPatient) {
    const token = response.data.createPatient;
    setTokenToStorage(token);
    return parseToken(token);
  } else return null;
}

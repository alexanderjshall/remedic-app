import { Response } from 'express';
import jwt from 'jsonwebtoken';

type Payload = {
  id: number;
  isDoctor: boolean;
  language: string;
}

export const createAccessToken = (payload : Payload) : string =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '15m'});

export const createRefreshToken = (id: number) : string =>
  jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '1d'});

export const setRefreshToken = (res: Response, token: string) : void => {
  res.cookie('rtc',token, {httpOnly: true});
};

import axios from 'axios';
import { Request, Response } from 'express';

export const axiosGet = async (req: Request, res: Response, params: string) => {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/${params}`, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization?.split(' ')[1]}`,
      },
    });
    return response;
  } catch (error) {
    const err = error as Error & { response: { status: number; data: string } };
    return { status: err.response.status, data: err.response.data };
  }
};

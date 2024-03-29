import {
  GenericError,
  InternalServerError,
  NotFoundError,
} from './error-utils';
import { NextApiHandler } from 'next';

interface Methods {
  GET?: NextApiHandler;
  POST?: NextApiHandler;
  PUT?: NextApiHandler;
  PATCH?: NextApiHandler;
  DELETE?: NextApiHandler;
}

export const handler =
  ({ GET, POST, PUT, PATCH, DELETE }: Methods = {}): NextApiHandler =>
  async (req, res) => {
    try {
      if (req.method === 'GET' && GET) return await GET(req, res);
      if (req.method === 'POST' && POST) return await POST(req, res);
      if (req.method === 'PUT' && PUT) return await PUT(req, res);
      if (req.method === 'PATCH' && PATCH) return await PATCH(req, res);
      if (req.method === 'DELETE' && DELETE) return await DELETE(req, res);
      throw new NotFoundError();
    } catch (error: any) {
      if (error instanceof GenericError)
        return res.status(error.status).json(error);
      res.status(500).json(new InternalServerError());
    }
  };

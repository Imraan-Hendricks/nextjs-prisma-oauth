import fs from 'fs';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { UPLOADS_DIRECTORY } from '@/utils/env-utils';
import { withSessionRoute } from '@/utils/session-utils';

interface GetRequest extends NextApiRequest {
  query: { filename?: string };
}

async function getAvatarByFilename(req: GetRequest, res: NextApiResponse) {
  const { filename } = req.query;
  if (!filename) return res.status(404).end();

  const bucketName = 'avatars';
  const filePath = `${UPLOADS_DIRECTORY}/${bucketName}/${filename}`;
  const readStream = fs.createReadStream(filePath);

  readStream.on('open', () => {
    res.writeHead(200);
    readStream.pipe(res);
  });

  readStream.on('error', (err) => {
    res.status(404).end();
  });
}

export default withSessionRoute(handler({ GET: getAvatarByFilename }));

import fs from 'fs';
import { getAvatarByFilename } from '@/services/user-service';
import { handlePromise } from '@/utils/common-utils';
import { handler } from '@/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@/utils/session-utils';

interface GetRequest extends NextApiRequest {
  query: { filename?: string };
}

async function getAvatarByFilenameHandler(
  req: GetRequest,
  res: NextApiResponse
) {
  const { filename } = req.query;
  if (!filename) return res.status(404).end();

  const [error, avatar] = await handlePromise(getAvatarByFilename(filename));
  if (error) return res.status(404).end();

  const readStream = fs.createReadStream(avatar.path);

  readStream.on('open', () => {
    res.writeHead(200);
    readStream.pipe(res);
  });

  readStream.on('error', (err) => {
    res.status(404).end();
  });
}

export default withSessionRoute(handler({ GET: getAvatarByFilenameHandler }));

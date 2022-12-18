import { handler } from '../../../../utils/api-utils';
import { signup } from './post/handler';
import { withSessionRoute } from '../../../../utils/session-utils';

export default withSessionRoute(handler({ POST: signup }));

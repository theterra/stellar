import { Router } from 'express';
import ViewHtml from 'views/Html';
const webRouter = Router();

webRouter.get('*', (req, res) => {
    new ViewHtml(req, res, 'layout/index').render();
});

export default webRouter;

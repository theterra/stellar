import express from 'express';

const router = express.Router();

router.get('/user', (_req, res) => {
    res.send('HELLO super dev!');
});

router.use((_req, res) => {
    res.snd(404).json({
        statusCode: 1,
        statusMessage: '404 Not Found',
    });
});

export default router;

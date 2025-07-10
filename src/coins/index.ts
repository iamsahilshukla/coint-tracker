import { Router, Request, Response } from 'express';
import { CoinService } from './service';

const router = Router();
const coinService = new CoinService();

// GET all coins
router.get(
  '/',
  coinService.rateLimiter,
  async (req: Request, res: Response) => {
    try {
      const coins = await coinService.getAllCoins();
      res.json(coins);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch coins' });
    }
  }
);

// POST new coin
router.post(
  '/',
  coinService.rateLimiter,
  async (req: Request, res: Response) => {
    try {
      const ip = req.ip || 'unknown';
      const { name, price } = req.body;
      const canAdd = await coinService.canAddCoin(ip);
      if (!canAdd) {
        res
          .status(403)
          .json({ error: 'Daily limit reached (50 coins per day).' });
        return;
      }
      const coin = await coinService.addCoin(ip, name, price);
      res.json(coin);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create coin' });
    }
  }
);

// SSE endpoint to poll latest coin results
router.get(
  '/sse',
  coinService.rateLimiter,
  async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

    res.write(
      'data: {"type": "connected", "message": "SSE connection established"}\n\n'
    );

    const interval = setInterval(async () => {
      try {
        const latestCoins = await coinService.getLatestCoins();
        res.write(
          `data: ${JSON.stringify({
            type: 'coins_update',
            timestamp: new Date().toISOString(),
            coins: latestCoins,
          })}\n\n`
        );
      } catch (error) {
        res.write(
          `data: ${JSON.stringify({
            type: 'error',
            message: 'Failed to fetch latest coins',
          })}\n\n`
        );
      }
    }, 2000);

    req.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected from SSE');
    });
  }
);

export default router;

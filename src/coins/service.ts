import Coin from './model';
import { Request, Response, NextFunction } from 'express';

export class CoinService {
  private rateLimitMap: Map<string, { count: number; last: number }> =
    new Map();
  private RATE_LIMIT = 5; // 5 requests/sec

  rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    const windowMs = 1000;
    const entry = this.rateLimitMap.get(ip) || { count: 0, last: now };
    if (now - entry.last > windowMs) {
      entry.count = 1;
      entry.last = now;
    } else {
      entry.count++;
    }
    this.rateLimitMap.set(ip, entry);
    if (entry.count > this.RATE_LIMIT) {
      res.status(429).json({ error: 'Too many requests. Please slow down.' });
      return;
    }
    next();
  };

  beautifyPrice(price: number | string): string {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    if (num >= 1) {
      return (Math.round(num * 2 * 100) / 100).toFixed(2);
    } else {
      const factor = 10000000;
      return (Math.ceil(num * factor) / factor).toFixed(7);
    }
  }

  async getAllCoins() {
    const coins = await Coin.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    return coins.map((coin: any) => ({
      ...coin.toJSON(),
      price: this.beautifyPrice(coin.price),
    }));
  }

  async canAddCoin(ip: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const count = await Coin.count({
      where: {
        ip,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
    });
    return count < 50;
  }

  isValidDecimalString(value: any): boolean {
    return (
      typeof value === 'string' &&
      /^-?\d+(\.\d+)?$/.test(value) &&
      !isNaN(Number(value))
    );
  }

  async addCoin(ip: string, name: string, price: string | number) {
    // Debug log for price value
    console.log('Received price in addCoin:', price, 'Type:', typeof price);
    // Validate price
    if (!this.isValidDecimalString(price.toString())) {
      throw new Error('Invalid price value');
    }
    const coin = await Coin.create({ name, price: price.toString(), ip });
    const coinData = coin.toJSON();
    return { ...coinData, price: this.beautifyPrice(coinData.price) };
  }

  async getLatestCoins() {
    const latestCoins = await Coin.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
    });
    return latestCoins.map((coin: any) => ({
      ...coin.toJSON(),
      price: this.beautifyPrice(coin.price),
    }));
  }
}

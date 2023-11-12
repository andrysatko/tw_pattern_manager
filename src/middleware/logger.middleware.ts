import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, path } = req;
        const userAgent = req.get('user-agent') || '';

        res.on('finish', () => {
            console.log(
                `${method} ${path} ${req.ip} ${res.statusCode} ${userAgent} ${new Date().toISOString()}`,
            );
        });

        next();
    }
}
import {BadRequestException, Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Request, Response} from "express";
import {assert} from "./utils/assert";
import path from "path";
import fs from "fs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':video')
  getVideo(@Req() req:Request, @Res() res:Response,@Param() video:any){
    const range = req.headers.range;
    assert(range, BadRequestException, "Requires Range header");
    const videoPath = path.join(process.cwd(), 'public', video.video);
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  }
}

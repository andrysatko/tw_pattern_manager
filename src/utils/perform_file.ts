import * as Upload from 'graphql-upload/Upload.js';
import * as fs from 'fs';
import { finished } from 'stream/promises';
import * as process from 'process';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp'
import {S3Upload_Service} from '../../AWS/aws_s3'
import {assert} from "./assert";
import * as dotenv from 'dotenv'
dotenv.config()
export async function Perform_file(file: Promise<Upload.FileUpload>,MaxWidth = 1000, MaxHeight= 1000) {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const FileName = uuidv4() + '_' + filename;
  const SupFileFormat =['png','jpeg','jpg','gif']
  if (!SupFileFormat.includes(mimetype.split('/')[1])) {
    throw new BadRequestException(
      `This (${mimetype}) file format is not supported. Please upload a any of ${SupFileFormat} file.`,
    );
  }
    const OutPutDir = path.join(process.cwd(), 'public', FileName);
    const writableStream = fs.createWriteStream(OutPutDir);
    const transformer = sharp()
        .resize(MaxWidth, MaxHeight, { fit: "inside" })
    await finished(createReadStream().pipe(transformer).pipe(writableStream));
    return FileName;
}

  export async function Perform_Video(video: Promise<Upload.FileUpload>){
  const {createReadStream, filename, mimetype, encoding} = await video;
  assert(mimetype === 'video/mp4', BadRequestException,`This file format ${mimetype} is not supported. Please upload a mp4 format.`)
  const OutPutDir = path.join(process.cwd(), 'public', filename);
  const writableStream = fs.createWriteStream(OutPutDir);
  await finished(createReadStream().pipe(writableStream));
  //TODO: resize video for performance
  const s3_response = await S3Upload_Service.PutFile(OutPutDir);
  s3_response.on('success', function(response){
    fs.unlink(OutPutDir, (err) => {});
  })
  return process.env.CLOUD_DISTRIBUTION + filename;
}
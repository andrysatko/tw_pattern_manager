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
const StaticEndpoint = process.env.STATIC_ENDPOINT
export async function File_Perform(file: Promise<Upload.FileUpload>, MaxWidth = 1000, MaxHeight= 1000,TO_S3:boolean = false) {
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
    if(TO_S3){
    const s3_response = await S3Upload_Service.PutFile(OutPutDir);
    s3_response.on('success', function(response){
      fs.unlink(OutPutDir, (err) => {});
    })
    return process.env.CLOUD_DISTRIBUTION + filename;
    }
    return process.env.DOMAIN_NAME + `/${StaticEndpoint}/` + FileName;
}

  export async function Video_Perform(video: Promise<Upload.FileUpload>, TO_S3:boolean = false) {
  let {createReadStream, filename, mimetype, encoding} = await video;
  filename = uuidv4() + '_' + filename;
  assert(mimetype === 'video/mp4', BadRequestException,`This file format ${mimetype} is not supported. Please upload a mp4 format.`)
  const OutPutDir = path.join(process.cwd(), 'public', filename);
  const writableStream = fs.createWriteStream(OutPutDir);
  await finished(createReadStream().pipe(writableStream));
  //TODO: resize video for performance
    if(TO_S3){
      const s3_response = await S3Upload_Service.PutFile(OutPutDir);
      s3_response.on('success', function(response){
        fs.unlink(OutPutDir, (err) => {});
      })
      return process.env.CLOUD_DISTRIBUTION + filename;
    }
  return process.env.DOMAIN_NAME  + `/${StaticEndpoint}/` +  filename;
}

export async function Socket_Video_Steam(VideoPath: string){

}
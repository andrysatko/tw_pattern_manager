import * as Upload from 'graphql-upload/Upload.js';
import * as fs from 'fs';
import { finished } from 'stream/promises';
import * as process from 'process';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';
import * as GM from 'gm';
export async function Perform_file(file: Promise<Upload.FileUpload>) {
  const { createReadStream, filename, mimetype, encoding } = await file;
  if (
    mimetype !== 'image/png' &&
    mimetype !== 'image/jpeg' &&
    mimetype !== 'image/jpg'
  ) {
    throw new BadRequestException(
      `This (${mimetype}) file format is not supported. Please upload a PNG or JPG file.`,
    );
  }
  const OutPutDir = path.join(process.cwd(), 'public', filename);
  const gm = GM.subClass({ imageMagick: true});
  const stream = createReadStream();
  const out = fs.createWriteStream(OutPutDir);
  stream.pipe(out);
  await finished(out);
  gm(OutPutDir)
    .resize(100, 100, '!')
    .write(OutPutDir, function (err) {
      if (err) console.log(err);
    });
  return filename;
}

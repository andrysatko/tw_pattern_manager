import * as AWS from 'aws-sdk'
import * as dotenv from 'dotenv'
import * as fs from 'fs';
import * as stream from 'stream';
import * as path from 'path';
import {HttpException} from "@nestjs/common";
dotenv.config()

const params = {
    Bucket: process.env.S3_BUCKET,
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.S3_REGION,
};
const s3 = new AWS.S3(params);

export class S3Upload_Service {
    private static readonly s3 = s3;
    private static readonly params = params;
     static async PutFile(videoPath: string){
         const ReadStream =fs.createReadStream(videoPath);

        const ps = {
            Body: ReadStream,
            Bucket: this.params.Bucket,
            Key: path.basename(videoPath),
        };
        const res = await s3.putObject(ps, function(err, data) {
            if (err) console.log(err, err.stack);
            else     console.log(data);
        });
         return res;
    }
    static async GetFile(FileName:string){
        const ps = {
            Bucket: this.params.Bucket,
            Key: FileName,
        };
        const data = await s3.getObject(ps).promise();
        return data;
    }
}

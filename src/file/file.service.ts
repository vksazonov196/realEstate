import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FILE_MODULE_CONFIG } from "./constants";
import { FileModuleConfig } from "./file.module";
import { InjectS3, S3 } from "nestjs-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class FileService {
    constructor(
        @Inject(FILE_MODULE_CONFIG) private readonly config: FileModuleConfig,
        @InjectS3() private readonly s3: S3,
    ){
        this.initBucket();
        this.initBucket("REVIEW");
    }

    private async initBucket(bucket?: string){
        try {
            await this.s3.createBucket({
                Bucket: bucket || this.config.bucket,
            })
        } catch (err) {}
    }
    
    public async getFile(key: string, bucket?: string) {
        const file = await this.s3.getObject({
            Bucket: bucket || this.config.bucket,
            Key: key
        });
        if(!file.Body) throw new NotFoundException("FILE_NOT_FOUND");
    }

    public async delete(key: string, bucket?: string){
        return await this.s3.deleteObject({
            Bucket: bucket || this.config.bucket,
            Key: key
        })
    }

    public async upload(key: string, buffer: Buffer, isPublic: boolean = true){
        return await this.s3.putObject({
            Bucket: this.config.bucket,
            Body: buffer,
            Key: key,
            ACL: isPublic ? "public-read" : "private"
        });
    }

    public async stream(key: string, bucket?: string): Promise<string> {
        return await getSignedUrl(this.s3, new GetObjectCommand({
            Bucket: bucket || this.config.bucket,
            Key: key
        }), {
            expiresIn: 60 * 15
        });
    }

    public async getUploadLink(key: string, bucket?: string): Promise<string> {
        return await getSignedUrl(this.s3, new PutObjectCommand({
            Bucket: bucket || this.config.bucket,
            Key: key
        }), {
            expiresIn: 60 * 60
        });
    }
}
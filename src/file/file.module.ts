import { DynamicModule, Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { FILE_MODULE_CONFIG } from './constants';
import { FileService } from './file.service';

export interface FileModuleConfig {
    region: string
    endpoint: string
    access_key: string
    secret: string
    bucket: string
}

@Module({})
export class FileModule {
    static forRoot(config: FileModuleConfig): DynamicModule {
        return ({
            global: true,
            module: FileModule,
            imports: [
                S3Module.forRoot({
                    config: {
                      credentials: {
                        accessKeyId: config.access_key,
                        secretAccessKey: config.secret,
                      },
                      region: config.region,
                      endpoint: config.endpoint,
                      forcePathStyle: false,
                    },
                })
            ],
            providers: [
                {
                    provide: FILE_MODULE_CONFIG,
                    useValue: config
                },
                FileService
            ],
            exports: [
                FileService
            ]
        })
    }
}

import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        let dbConfigObj = {};
        switch (process.env.DB_TYPE) {
            case 'sqlite':
                Object.assign(dbConfigObj, {
                    type: process.env.DB_TYPE,
                    synchronize: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') ? false : false,
                    database: process.env.DB_NAME,
                    autoLoadEntities: true
                });
                break;
            case 'postgres':
                break;
            default:
                throw new Error('DB_TYPE is not initalized !');
        }
        return dbConfigObj;
    }
}
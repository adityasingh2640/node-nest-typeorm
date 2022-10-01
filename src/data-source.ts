import { DataSource, DataSourceOptions } from "typeorm";

var dbConfigObj = {
    synchronize: false
};
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfigObj, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.ts'],
            migrations: [__dirname + '/migrations/*.ts']
        });
        break;
    case 'test':
        Object.assign(dbConfigObj, {
            type: 'sqlite',
            database: 'db.sqlite_test',
            entities: ['**/*.entity.js'],
            migrations: [__dirname + '/migrations/*.js']
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('NODE_ENV is not initalized !');
}
console.log(dbConfigObj);
export const appDataSource = new DataSource(dbConfigObj as DataSourceOptions);
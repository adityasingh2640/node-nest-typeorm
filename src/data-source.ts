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
        // Create schema schema_name
        // Set search_path to blogs;

        Object.assign(dbConfigObj, {
            type: 'postgres',
            port: 5432,
            host: 'localhost',
            schema: 'blogs',
            username: 'postgres',
            password: 'postgres',
            databasename: 'postgres',
            entities: ['**/*.entity.ts'],
            migrations: [__dirname + '/migrations/*.ts']
        })
        break;
    default:
        throw new Error('NODE_ENV is not initalized !');
}
console.log(dbConfigObj);
export const appDataSource = new DataSource(dbConfigObj as DataSourceOptions);
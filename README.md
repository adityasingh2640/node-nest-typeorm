# blogs
Project is enabled with two database sqlite and Postgres

By default NODE_ENV is set to 'development' and can be disable through package.json in script section.
Change set env parameter in .env.development

Start : npm run start:dev
By default NODE_ENV is set to 'development' and can be disable through package.json in script section

#For Sqlite
  In .env.development file
  Set DB_TYPE=sqlite
  SET DB_NAME=<db_name>
  SET COOKIE_KEY=<your_cookie>
  
Start : npm run start:dev
 
# For Postgres
  Create schema_name in postgres
  Step 1. Create schem <your_schema_name>
       2. Set search_path to <your_schema_name> 
  Set other parameter in .env.development file related to db
  RUN: npm run typeorm:gen
       npm run typeorm:run
  npm run start:dev
  

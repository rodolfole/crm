## CRM-API

**Note: Before setting up the development environment you must install Postgresql and configure it**


1. Inside crm-api RUN

### `yarn`

2. Create Database crm

3. Change in ormconfig.json your Database credentials

4. RUN
### `yarn migration:generate name_of_the_migration`
### `yarn migration:run`

5. RUN
### `yarn run dev`


## CRM-APP
1. Inside crm-app RUN
### `yarn`

2. RUN
### `yarn start`


**Note: After the settings you can do the following:**
1. Register new account
2. Login in the CRM
3. Create, Read, Update and Delete Clients


## Setup

* Clone this repo
* Install adonis command line tool
```bash
npm i -g @adonis/cli
```
```bash
* Open project directory in terminal and install your npm dependencies
npm i
```
* Setup your database and update .env in root directory appropriately
* Use adonis cli to run migrations
```bash
adonis migration:run
```
* Compile assets with laravel-mix npm script
```bash
npm run fdev
```
* Serve your application
```bash
adonis serve --dev
```

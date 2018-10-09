'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', 'HomeController.index');

Route.group(() => {
	Route.post('login', 'UserController.login').as('login')
    Route.post('signup', 'UserController.signup').as('signup')
})
.prefix('api/v1/auth')
.namespace('Api/v1');

Route.group(() => {

	Route.any('auth/logout', 'UserController.logout').as('logout')

	Route.get('bucketlists/:id/full', 'BucketlistController.show_full')
	Route.resource('bucketlists', 'BucketlistController').apiOnly()
    Route.resource('bucketlists.items', 'ItemController').apiOnly()
})
.prefix('api/v1')
.namespace('Api/v1')
.middleware('auth');

// Route.any('*', 'HomeController.index')

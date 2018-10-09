import VueRouter from 'vue-router'
// Import our components and pages
import Home from './components/Home'
import BuckelistsIndex from './components/BuckelistsIndex'
import BuckelistsCreate from './components/BuckelistsCreate'
import BuckelistsShow from './components/BuckelistsShow'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

import Login from './components/Login'
import Logout from './components/Logout'

export default new VueRouter({
	routes: [

		{ path: '/', component: Home,
			children: [
				{ path: '', component: Dashboard, name: 'dashboard', meta: {requires_auth: true} },
				{ path: 'bucketlists', component: BuckelistsIndex, name: 'bucketlists.index', meta: {requires_auth: true} },
				{ path: 'bucketlists/:id', component: BuckelistsShow, name: 'buckelists.show', meta: {requires_auth: true} },
			]
	 	},
		{ path: '/auth/login', component: Login, name: 'login' },
		{ path: '/auth/logout', component: Logout, name: 'logout' },
    	{ path: '*', component: NotFound }
	],
	linkActiveClass: 'is-active',
})

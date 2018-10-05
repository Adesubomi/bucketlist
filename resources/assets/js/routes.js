import VueRouter from 'vue-router'
// Import our components and pages
import Home from './components/Home'
import BuckelistsIndex from './components/BuckelistsIndex'
import BuckelistsCreate from './components/BuckelistsCreate'
import BuckelistsShow from './components/BuckelistsShow'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

import Login from './components/Login'

export default new VueRouter({
	routes: [

		{ path: '/', component: Home,
			children: [
				{ path: '', component: Dashboard, name: 'home' },
				{ path: 'bucketlists', component: BuckelistsIndex, name: 'bucketlists.index' },
				{ path: 'bucketlists/:id', component: BuckelistsShow, name: 'buckelists.show' },
			]
	 	},
		{ path: '/auth/login', component: Login },
    	{ path: '*', component: NotFound }
	],
	linkActiveClass: 'is-active',
})

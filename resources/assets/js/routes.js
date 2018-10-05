import VueRouter from 'vue-router'
// Import our components and pages
import Home from './components/Home'
import BuckelistsIndex from './components/BuckelistsIndex'
import BuckelistsCreate from './components/BuckelistsCreate'
import BuckelistsShow from './components/BuckelistsShow'

import Login from './components/Login'

export default new VueRouter({
	routes: [

		{ path: '/', component: Home,
			children: [
				{ path: 'bucketlists', component: BuckelistsIndex },
				{ path: 'bucketlists/:id', component: BuckelistsShow },
			]
	 	},
		{ path: '/auth/login', component: Login }
	],
	linkActiveClass: 'is-active'
})

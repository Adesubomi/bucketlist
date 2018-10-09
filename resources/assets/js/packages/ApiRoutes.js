export default {

	login: {
		url: '/auth/login',
		title: 'Login'
	},

	signup: {
		url: '/auth/signup',
		title: 'Signup',
	},

	bucketlists: {
		url: '/bucketlists',
		title: 'Bucketlists',
	},

	get_bucketlist: {
		url: '/bucketlists/:id',
		title: 'Bucketlist details',
	},

	get_bucketlist_full: {
		url: '/bucketlists/:id/full',
		title: 'Bucketlist details',
	},

	bucketlists_items: {
		url: '/bucketlists/:bucketlist_id/items',
		title: 'Bucketlist item',
	},
}

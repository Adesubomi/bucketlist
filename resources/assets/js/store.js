import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from 'store'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		_token: '',
		_authenticated: false,
		_user: {},
	},
	mutations: {
		initialize (state) {
			// try to get our values from local Storage
			// and put them in the store appropriately
			state._token = LocalStorage.get('_token')
			state._user = LocalStorage.get('_user')

			if (state._token && state._token.length > 0
				&& state._user.hasOwnProperty('fullname')
				&& state._user.hasOwnProperty('fullname')) {

					state._authenticated = true
			}
		},

		saveToken (state, token) {
			state._token = token
			LocalStorage.set('_token', token)
		},

		deleteToken (state) {
			state._token = ''
			LocalStorage.remove('_token')
		},

		saveUser (state, user) {
			state._user = user
			LocalStorage.user('_token', user)
		},

		authenticate (state, data) {

			const {user, token} = data


			if (user) {
				state._user = user
				LocalStorage.set('_user', user)
			}

			if (token) {
				state._token = token
				LocalStorage.set('_token', token)
			}

			state._authenticated = true
		},

		dis_authenticate (state) {

			state._user = {}
			LocalStorage.remove('_user')

			state._token = ''
			LocalStorage.remove('_token')

			state._authenticated = false

		}

	},

	getters: {
		token: state => { return state._token },
		user: state => { return state._user },
		is_authenticated: state => { return state._authenticated },
	}
})

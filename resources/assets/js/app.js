import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import VueSnotify from 'vue-snotify'
import {SnotifyPosition} from 'vue-snotify'
import VueSweetalert2 from 'vue-sweetalert2';

// Load VueRouter instance containing front end routes
import router from './routes'
import store from './store'
import Utility from './packages/Utility';
import axios from 'axios';
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.Vue = Vue
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Utility)
Vue.use(VueSweetalert2)
Vue.use(VueSnotify, {
    toast: {
        maxOnScreen: 1,
        maxAtPosition: 1,
		showProgressBar: false,
		position: SnotifyPosition.rightTop,
		timeout: 5600,
    }
});

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// let token = document.querySelector('[name="_csrf"]')
// if (token) {
// 	window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
// } else {
// 	console.error('CSRF token not found: https://adonisjs.com/docs/3.2/csrf-protection')
// }

// /* -------------------------------------------------------------- */
// // The following two additions attach a global Event Bus and a Global Storage to Vue instance
// // used to contain a single source of truth object and a communication mechanism between components.
// // Create a global Event Bus
// var EventBus = new Vue()
// // Add to Vue properties by exposing a getter for $bus
// // How to use: Emit from a Vue component this.$bus.emit('message', addionalVars)
// // Listen for and event: from a Vue component: this.$bus.on('message', (addionalVars) => { do something})
// Object.defineProperties(Vue.prototype, {
// 	$bus: {
// 		get: function () {
// 			return EventBus
// 		}
// 	}
// })
// // Setup our global store object
// // How to use it: from a Vue component: this.$globalStore.myVariable = ...
// let globalStore = {
// 	// whatever variable you want to store to the single point of truth
// }
// Vue.prototype.$globalStore = globalStore
// // Instantiate the main Vue app and attach the global store
// /* -------------------------------------------------------------- */
// /**
//  * Next, we will create a fresh Vue application instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.
//  */
//
import App from './App.vue'
import AppLoader from './partials/AppLoader'
//
const app = new Vue({
	el: '#app',
	render: h => h(App),
	router,
	store,
	components: {
		AppLoader
	},
	beforeCreate: function() {

		// get the accessToken from whereever you stored it
		this.$store.commit('initialize')

		const accessToken = store.getters.token

		// intercept requests
		axios.interceptors.request.use(request => {
            if (accessToken) { request.headers.Authorization = `Bearer ${accessToken}`; }
            return request;
        });

		// intercept responses
        axios.interceptors.response.use(response => {

            if (response.status === 401) {

				// destroy authentication keys and logout
                this.$store.commit('dis_authenticate');
                this.$router.replace({name: 'login'});
            }
            return response;
        });

		// for when navigation is initiated
        this.$router.beforeEach( (to, from, next) => {

            if ( to.meta.requires_auth !== undefined && to.meta.requires_auth === true ) {

                if ( !store.getters.is_authenticated ) {
                    next({name: 'login'});
                }
                else {
                    next();
                }
            }

			next();

        });

		// for page refresh, there is no navigation initiation
        if (this.$route.meta.requires_auth !== undefined && this.$route.meta.requires_auth === true) {
            if ( !store.getters.is_authenticated ) {
                this.$router.replace({name: 'login'});
            }
        }
	}
})

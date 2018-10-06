import ApiRoutes from './ApiRoutes'
import {AppInfo} from '../.env'

export default {
    install (Vue, options) {
		Vue.prototype.$api = {

		    base_url: AppInfo.apiUrl,

		    path: function ($name) {

		        if (ApiRoutes.hasOwnProperty($name)){
		            return ApiRoutes[$name].url;
		        }
		        return '/';
		    },

		    url: function ($name) {
		        return this.base_url + this.path($name);
		    },
		}
	}
}

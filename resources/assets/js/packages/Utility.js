import ApiRoutes from './ApiRoutes'
import {AppInfo} from '../.env'

export default {
    install (Vue, options) {
		Vue.prototype.$api = {

		    base_url: AppInfo.apiUrl,

		    path: function ($name, $params) {

		        if (ApiRoutes.hasOwnProperty($name)){

					let url = ApiRoutes[$name].url;

					if ($params) {

						for (var param in $params) {
						    if ($params.hasOwnProperty(param)) {
								url = url.replace(new RegExp(":"+ param, 'g'), $params[param]);
						    }
						}
					}


					// remove all arguments were not found in params
					url = url.replace(new RegExp(/\/\:[a-z]+/, 'g'), '');
					return url
		        }

		        return '/'
		    },

		    url: function ($name, $params) {
		        return this.base_url + this.path($name, $params);
		    },
		}
	}
}

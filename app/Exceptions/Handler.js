'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const API = use('App/Services/Api')
const Api = new API()

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, {request, response }) {

	if (error.name === 'InvalidJwtToken') {

		let errors = [];
		errors.push({message: 'The token supplied is invalid'})
		response.status(401).send(Api.failure('Unauthorized Access', {errors}));
		return
	}

    response.status(error.status).send(error.message)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler

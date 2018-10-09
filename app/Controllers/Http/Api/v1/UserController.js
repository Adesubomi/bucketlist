'use strict'

const API = use('App/Services/Api')
const Api = new API()
const User = use('App/Models/User')
const {validate} = use('Validator')
const Hash = use('Hash')

class UserController {

    async login ({ request, auth }) {

        const postData = request.all()

        const rules = {
            email: 'required',
            password: 'required'
        }
		//
        let validation = await validate(postData, rules)

        if (validation.fails()) {

            return Api.failure('Validation error', {
                errors: validation._errorMessages
            })
        }

        const user = await User.findBy('email', postData.email)
        if (!user || user.email != postData.email) {

			let errors = [];
			errors.push({message: 'Cannot find user account', field: 'email'})
			return Api.failure('Validation error', {errors: errors})
        }

        const passwordMatch = await Hash.verify(postData.password, user.password)
        if (!passwordMatch) {

			let errors = [];
			errors.push({message: 'Cannot find user account with this credentials'})
			return Api.failure('Validation error', {errors: errors})
        }

        const authenticated = await auth.withRefreshToken().generate(user)
        return Api.success('Logged in successfully', {
            token: authenticated,
            user: {fullname: user.fullname, id: user.id}
        })
    }

	async logout({auth}) {

		// return auth.user.tokens().fetch()

		const user = auth.current.user
	    const token = auth.getAuthHeader()

		await auth.user
	      .tokens()
	      .update({ is_revoked: true })

		return Api.success('Logged out')
	}

	async signup ({request}) {

        const postData = request.all()

        const rules = {
            fullname: 'required',
            email: 'required',
            password: 'required'
        }

        let validation = await validate(postData, rules)

        if (validation.fails()) {

            return Api.failure('Validation error', {
                errors: validation._errorMessages
            })
        }

        try {

            let created = await User.create({...postData})
            return Api.success('Signup is successful', created)

        } catch (e) {

            let errors = [];
            errors.push({message: e})
            return Api.failure('Unable to create your account', {errors})

        }
    }
}

module.exports = UserController

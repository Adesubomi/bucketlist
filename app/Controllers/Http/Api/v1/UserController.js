'use strict'

const API = use('App/Services/Api')
const Api = new API()
const User = use('App/Models/User')
const {validate} = use('Validator')
const Hash = use('Hash')

class UserController {

    async login ({ request, auth }) {

        const { email, password } = request.all()

        const user = await User.findBy('email', email)
        if (!user || user.email != email) {

            return {message: 'User not found'}
        }

        const passwordMatch = await Hash.verify(password, user.password)
        if (!passwordMatch) {


        }

        const authenticated = await auth.withRefreshToken().generate(user)

        return Api.success('Logged in successfully', {
            token: authenticated,
            user: {fullname: user.fullname, id: user.id}
        })
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

'use strict'

const {validate} = use('Validator')
const Logger = use('Logger')

const API = use('App/Services/Api')
const Api = new API()
const Bucketlist = use('App/Models/Bucketlist')
const Item = use('App/Models/Item')

class BucketlistController {

    async index () {

        let allList = await Bucketlist.all()
        return Api.success('List of Bucketlists', allList)
    }

    async store ({request, response}) {

        const postData = request.all()

        const rules = { name: 'required'}

        let validation = await validate(postData, rules)

        if (validation.fails()) {

            return Api.failure('Validation error', {
                errors: validation._errorMessages
            })
        }

        try {

            let created = await Bucketlist.create({...postData, created_by: Api.getUserId()})
            return Api.success('Bucketlist created successfully', created)

        } catch (e) {

            let errors = [];
            errors.push({message: e})
            return Api.failure('Unable to create bucketlist', {errors})

        }
    }

    async show ({request, response, params}) {

        try {

            const bucketlist = await Bucketlist.findOrFail(params.id)

            return Api.success('Becketlist resource', bucketlist)

        } catch (e) {

            let errors = [];
            errors.push({message: e})
			Logger.info(e);
            return Api.failure('Bucketlist not found', {errors})
        }
    }

	async show_full ({request, response, params}) {

        try {

            let bucketlist = await Bucketlist.findOrFail(params.id)

			bucketlist.items = await Item.query().where({
				bucketlist_id: bucketlist.id
			}).fetch()

            return Api.success('Becketlist resource', bucketlist)

        } catch (e) {

            let errors = [];
            errors.push({message: e})
			Logger.info(e);
            return Api.failure('Bucketlist not found', {errors})
        }
    }

    async update ({request, response, params}) {

        let buckelist = await Bucketlist.query().where({created_by: Api.getUserId(), id: params.id}).first();

        if (buckelist && buckelist.id) {

            try {

                let newUpdates = {
                    name: request.input('name')
                }

                let update = await Bucketlist.query().where({created_by: Api.getUserId(), id: params.id}).update({...newUpdates})

                let item = await Bucketlist.findOrFail(update)
                return Api.success('Becketlist updated', item)
            }
            catch (e) {

                let errors = [];
                errors.push({message: e})
                return Api.failure('Unable to fetch bucketlist', {errors})
            }
        }
        else {

            let errors = [];
            errors.push({message: 'Could not find this bucketlist'})
            return Api.failure('Unable to fetch bucketlist', {errors})
        }
    }

    async destroy ({request, response, params}) {

        let buckelist = await Bucketlist.query().where({created_by: Api.getUserId(), id: params.id}).first()

        if (buckelist && buckelist.id) {

            try {

                let deleted = await Bucketlist.query().where({created_by: Api.getUserId(), id: params.id}).delete()

                return Api.success('Becketlist deleted')
            }
            catch (e) {

                let errors = [];
                errors.push({message: e})
                return Api.failure('Unable to delete bucketlist', {errors})
            }
        }
        else {

            let errors = [];
            errors.push({message: 'Could not find this bucketlist'})
            return Api.failure('Unable to fetch bucketlist', {errors})
        }
    }
}

module.exports = BucketlistController

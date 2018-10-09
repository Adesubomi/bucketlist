'use strict'

const {validate} = use('Validator')
const Logger = use('Logger')

const API = use('App/Services/Api')
const Api = new API()

const Bucketlist = use('App/Models/Bucketlist')
const Item = use('App/Models/Item')

class ItemController {

    async index ({request, response, params}) {

		let bucketlist = await Bucketlist.find(params.bucketlists_id)
		const items = await Item.query().where('bucketlist_id', params.bucketlists_id).fetch()

		bucketlist.items = items

        return Api.success('List of Bucketlists', bucketlist)
    }

    async store ({request, response, params}) {

		const postData = request.all()

        const rules = { name: 'required'}

        let validation = await validate(postData, rules)

        if (validation.fails()) {

            return Api.failure('Validation error', {
                errors: validation._errorMessages
            })
        }

        try {

            let created = await Item.create({
				...postData,
				bucketlist_id: params.bucketlists_id
			})

            return Api.success('Item created successfully', created)

        } catch (e) {

            let errors = [];
            errors.push({message: e})
            return Api.failure('Unable to create item', {errors: errors})

        }
    }

	async show ({request, response, params}) {

		try {

			let item = await Item.query().where({
				bucketlist_id: params.bucketlists_id,
				id: params.id
			}).first()

			return Api.success('Item resource', item)

		} catch (e) {

			let errors = [];
			errors.push({message: e})
			return Api.failure('Item not found', {errors: errors})
		}
	}

    async update ({request, response, params}) {

        let item = await Item.query().where({
				bucketlist_id: params.bucketlists_id,
				id: params.id,
			}).first();

        if (item && item.id) {

            try {

                let newUpdates = {
                    name: request.input('name')
                }

                let updateId = await Item.query().where({
						id: params.id,
					}).update({...newUpdates})

                let item = await Item.findOrFail(updateId)
                return Api.success('Item updated', item)
            }
            catch (e) {

                let errors = [];
                errors.push({message: e})
                return Api.failure('Unable to update item', {errors: errors})
            }
        }
        else {

            let errors = [];
            errors.push({message: 'Could not find this item'})
            return Api.failure('Unable to update item', {errors: errors})
        }
    }

    async destroy ({request, response, params}) {

        let item = await Item.query().where({
			bucketlist_id: params.bucketlists_id,
			id: params.id,
		}).first()

        if (item && item.id) {

            try {

                let deleted = await Item.query().where({id: params.id}).delete()

                return Api.success('Item deleted')
            }
            catch (e) {

                let errors = [];
                errors.push({message: e})
                return Api.failure('Unable to delete item', {errors: errors})
            }
        }
        else {

            let errors = [];
            errors.push({message: 'Could not find this item'})
            return Api.failure('Unable to fetch item', {errors: errors})
        }
    }
}

module.exports = ItemController

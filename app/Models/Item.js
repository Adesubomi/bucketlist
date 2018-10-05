'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {

    bucketlist () {
        return this.belongsTo('App/Models/Bucketlist', 'bucketlist_id', 'id')
    }
}

module.exports = Item

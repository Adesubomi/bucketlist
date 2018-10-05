'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bucketlist extends Model {

    items () {
        return this.hasMany('App/Models/Item', 'id', 'bucketlist_id');
    }

    user () {
        return this.belongsTo('App/Models/User', 'created_by', 'id');
    }
}

module.exports = Bucketlist

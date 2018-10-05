'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BucketlistsSchema extends Schema {
  up () {
    this.create('bucketlists', (table) => {
      table.increments()
      table.integer('created_by', 11).notNullable().unsigned();
      table.string('name', 60).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('bucketlists')
  }
}

module.exports = BucketlistsSchema

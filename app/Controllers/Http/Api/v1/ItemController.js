'use strict'

class ItemController {

    index ({request, response, params}) {

    }

    store () {
        return { greeting: 'Store an item' };
    }

    show () {
        return { greeting: 'Show an item resousrce' };
    }

    update  () {
        return { greeting: 'Update an item resousrce' };
    }

    destroy () {
        return { greeting: 'Delete an item resousrce' };
    }
}

module.exports = ItemController

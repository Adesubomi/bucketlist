'use strict'
const View = use('View')

class HomeController {
    index (request, response) {
        // <a href="https://www.freepik.com/free-photo/aerial-view-of-business-data-analysis-graph_2753722.htm">Designed by Rawpixel.com</a>
        // return response;
        // return "<h1>BucketList Home !</h1>";
        return View.render('index')
    }
}

module.exports = HomeController

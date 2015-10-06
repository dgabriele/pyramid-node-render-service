import express from 'express';

export default function(app) {
    var router = express.Router();

    // add routes here...
    require('./render')(router);

    return router;
}

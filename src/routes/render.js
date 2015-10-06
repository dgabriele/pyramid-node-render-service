import express from 'express';
import path from 'path';
import fs from 'fs';
import jade from 'jade';
import React from 'react';

/** compiled Jade templates
 */
const templates = {}

/** React Components
 */
const components = require('require-dir')('../components');

/** React Component factories
 */
var factories = {};
for (var name in components) {
    factories[name] = React.createFactory(components[name]);
}

/** React Component renderer function for use in jade templates
 */
function renderComponent(name, props) {
    return React.renderToString(factories[name](props));
}

/** Render and return a Jade template.
 */
function render(templateName, req, res) {
    var context = req.body.context || {};
    context.renderComponent = renderComponent;
    res.send(templates[templateName](context));
}

export default function(router) {
    var route = router.route('/render');

    route.post((req, res) => {
        const templateName = req.body.template;
        if (templateName in templates) {
            return render(templateName, req, res);
        }
        const filepath = path.resolve(
            path.join(__dirname, `../../build/views/${templateName}.jade`));
        // compile and cache the Jade template
        fs.readFile(filepath, (err, data) => {
            if (!err) {
                templates[templateName] = jade.compile(data.toString(), {
                    filename: filepath
                });
                return render(templateName, req, res);
            } else {
                console.error(err)
                if (err.code == 'ENOENT') {
                    res.status(404).send();
                } else {
                    res.status(501).send(); // TODO handle errors
                }
            }
        });
    })
}

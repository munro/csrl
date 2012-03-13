var EventEmitter = require('events').EventEmitter,
    _ = require('underscore');

/**
 * Coordinates:
 * +-- x low to high -->
 * |\
 * y low to high
 * |  \
 * V   z higher displayed first
 */

function Entity(view, vector) {
    'use strict';

    EventEmitter.call(this);

    this.view(view);
    this.position(vector);
}

Entity.prototype = _.extend(Object.create(EventEmitter.prototype), {
    view: function (view) {
        'use strict';

        if (view !== 'undefined') {
            this.view = view;
            this.emit('view', this.view);
        }
        return this.view;
    },
    pos: function (position) {
        'use strict';

        if (position !== 'undefined') {
            this.position = position;
            this.emit('position', this.position);
        }
        return this.position;
    },
    remove: function () {
        'use strict';

        this.emit('remove');
    }
});

module.exports = Entity;

var EventEmitter = require('events').EventEmitter,
    tty = require('tty'),
    _ = require('underscore');

/*
process.stdout.on('all', function () {
    console.log('ahh', arguments);
});

process.stdin.resume();
tty.setRawMode(true);

process.stdin.on('keypress', function (char, key) {
    if (key && key.ctrl && key.name === 'c') {
        process.stdout.write('Goodbye!\n');
        process.exit();
    }
});
*/

function keyToPoint(key) {
    var points = key.split(',');
    return Number(points[0], points[1]);
}

function TTYScreen(stdout) {
    EventEmitter.call(this);

    this.entitys = [];
    this.screen = {};
    this.dirty = {};
    this.all_dirty = false;
    this.stdout = stdout;
    this.size = stdout.getWindowSize();
}

TTYScreen.prototype = _.extend(Object.create(EventEmitter.prototype), {
    redraw_delay: 1000 / 30,

    dirtySpot: function (position) {
        this.dirty[position.x + ',' + position.y] = true;
    },

    addEntity: function (entity) {
        var on_symbol,
            on_position,
            last_view = entity.view,
            last_position = entity.position,
            self = this;

        entity.on('entity', on_symbol = function (entity) {
            self.dirty[entity.position] = true;
            self.redraw();
        });

        entity.on('position', on_position = function (position) {
            self.dirty[last_position] = true;
            self.dirty[position] = true;
            self.redraw();
        });

        entity.once('remove', function () {
            entity.removeListener('symbol', on_symbol);
            entity.removeListener('position', on_position);
        });

        this.entitys.push(entity);
    },

    redraw: function () {
        var self = this;

        if (!this._redraw_timer) {
            setTimeout(function () {
                self.redrawNow();
            }, this.redraw_delay);
        }
    },

    redrawAll: function () {
        this.all_dirty = true;
        this.redrawNow();
    },

    redrawNow: function () {
        var key, line, pos, x, y, view,
            dirty = this.dirty,
            all_dirty = this.all_dirty;

        this._redraw_timer = false;
        this.dirty = {};
        this.all_dirty = false;

        if (all_dirty) {
            for (y = 0; y < this.size[1]; y += 1) {
                this.stdout.moveTo(0, 0);
                line = '';
                for (x = 0; x < this.size[0]; x += 1) {
                    view = this.screen[x + ',' + y];
                    if (view) {
                        // TODO: this could be optmized when printing similar
                        //       fg or bg colors
                        this.stdout.write(view.toString());
                    } else {
                        // TODO: this could be optimized when writing large gaps
                        this.stdout.write(' ');
                    }
                }
            }
        } else {
            for (key in dirty) {
                if (dirty.hasOwnProperty(key)) {
                    pos = keyToPoint(key);
                    
                    
                }
            }
        }
    }
});

module.exports = TTYScreen;

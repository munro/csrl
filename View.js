function View(opts) {
    'use strict';

    opts = opts || {};
    this.symbol = opts.symbol || false;
    this.bold = opts.bold || false;
    this.fg = opts.fg || false;
    this.bg = opts.bg || false;
}

View.merge = function (views) {
    'use strict';

    var i, opts;

    for (i = views.length - 1; i >= 0; i -= 1) {
        if (!opts.symbol && views[i].symbol) {
            opts.symbol = views[i].symbol;
            opts.bold = views[i].bold;
            opts.fg = views[i].fg;
        }
        if (!opts.bg && views[i].bg) {
            opts.bg = views[i].bg;
        }
        if (opts.symbol && opts.bg) {
            break;
        }
    }
    return new View(opts);
};

View.prototype = {
    clone: function (opts) {
        'use strict';

        opts = opts || {};
        return {
            symbol: opts.symbol || this.symbol,
            bold: opts.bold || this.bold,
            fg: opts.fg || this.fg,
            bg: opts.bg || this.bg
        };
    },

    merge: function (views) {
        'use strict';

        if (typeof views.length !== 'undefined') {
            views = [this].concat(views);
        } else {
            views = [this, views];
        }
        return View.merge(views);
    },

    equals: function (view) {
        'use strict';

        return (this.symbol === view.symbol && this.bold === view.bold &&
                this.fg === symbol.fg && this.bg === view.bg);
    },

    toString: function () {
        'use strict';

        return this.symbol; // TODO: output colors
    }
};

module.exports = View;

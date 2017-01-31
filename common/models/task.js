'use strict';

module.exports = function(Task) {
    Task.observe('before save', function setProperties(ctx, next) {
        if (ctx.instance) {
            ctx.instance.createdAt = new Date();
            ctx.instance.done = false;
            console.log('instance\n' + JSON.stringify(ctx));
        } else {
            console.log(ctx);
        }

        next();
    });
};

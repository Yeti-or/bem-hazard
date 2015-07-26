module.exports = function(bh) {
    bh.match('link_counter_yes', function(ctx, json) {
        if(json.counter) {
            var jsParams = {counter: json.counter};

            if(json['show-counter']) {
                jsParams['show-counter'] = json['show-counter'];
            }

            ctx.js(jsParams);
        }
    });
};

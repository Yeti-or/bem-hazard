var BH = require('../');
require('chai').should();

describe('ctx.isFirst() / ctx.isLast()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });

    it('should calc isFirst/isLast', function() {
        bh.match('button__inner', function(ctx) {
            if (ctx.isFirst()) {
                ctx.mod('first', 'yes');
            }
            if (ctx.isLast()) {
                ctx.mod('last', 'yes');
            }
        });
        bh.apply({
            block: 'button',
            content: [{ elem: 'inner' }, { elem: 'inner' }, { elem: 'inner' }]
        }).should.equal(
            '<div class="button">' +
            '<div class="button__inner button__inner_first_yes"></div>' +
            '<div class="button__inner"></div>' +
            '<div class="button__inner button__inner_last_yes"></div>' +
            '</div>'
        );
    });

    it('should calc isFirst/isLast with array mess', function() {
        bh.match('button__inner', function(ctx) {
            if (ctx.isFirst()) {
                ctx.mod('first', 'yes');
            }
            if (ctx.isLast()) {
                ctx.mod('last', 'yes');
            }
        });
        bh.apply({
            block: 'button',
            content: [
                [{ elem: 'inner' }],
                [{ elem: 'inner' }, [{ elem: 'inner' }]]
            ]
        }).should.equal(
            '<div class="button">' +
            '<div class="button__inner button__inner_first_yes"></div>' +
            '<div class="button__inner"></div>' +
            '<div class="button__inner button__inner_last_yes"></div>' +
            '</div>'
        );
    });

    it('should calc isFirst/isLast for single element', function() {
        bh.match('button__inner', function(ctx) {
            if (ctx.isFirst()) {
                ctx.mod('first', 'yes');
            }
            if (ctx.isLast()) {
                ctx.mod('last', 'yes');
            }
        });
        bh.apply({ block: 'button', content: { elem: 'inner' } }).should.equal(
            '<div class="button">' +
            '<div class="button__inner button__inner_first_yes button__inner_last_yes"></div>' +
            '</div>'
        );
    });

    it('should ignore empty array items', function() {
        bh.match('button', function(ctx) {
            if (ctx.isFirst()) {
                ctx.mod('first', 'yes');
            }
            if (ctx.isLast()) {
                ctx.mod('last', 'yes');
            }
        });
        bh.apply([
            false,
            { block: 'button' },
            {
                content: [
                    false,
                    { block: 'button' },
                    { block: 'button' },
                    { block: 'button' },
                    [null]
                ]
            },
            null
        ]).should.equal(
            '<div class="button button_first_yes"></div>' +
            '<div>' +
            '<div class="button button_first_yes"></div>' +
            '<div class="button"></div>' +
            '<div class="button button_last_yes"></div>' +
            '</div>'
        );
    });
});

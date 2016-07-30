var BH = require('../');
require('chai').should();

describe('ctx.tag()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should return html tag', function() {
        bh.match('button', function(ctx) {
            ctx.tag().should.equal('button');
        });
        bh.apply({ block: 'button', tag: 'button' });
    });
    //Seems imposible in React
    xit('should set empty tag', function() {
        bh.match('link', function(ctx) {
            ctx.tag('');
        });
        bh.match('button', function(ctx) {
            ctx.tag(false);
        });
        bh.apply({ block: 'button', content: { block: 'link', content: 'link' } }).should.equal('link');
    });
    it('should set html tag', function() {
        bh.match('button', function(ctx) {
            ctx.tag('button');
        });
        bh.apply({ block: 'button' }).should.equal('<button class="button"></button>');
    });
    it('should not override user tag', function() {
        bh.match('button', function(ctx) {
            ctx.tag('button');
        });
        bh.apply({ block: 'button', tag: 'a' }).should.equal('<a class="button"></a>');
    });
    it('should not override later declarations', function() {
        bh.match('button', function(ctx) {
            ctx.tag('input');
        });
        bh.match('button', function(ctx) {
            ctx.tag('button');
        });
        bh.apply({ block: 'button' }).should.equal('<button class="button"></button>');
    });
    it('should override later declarations with force flag', function() {
        bh.match('button', function(ctx) {
            ctx.tag('input', true);
        });
        bh.match('button', function(ctx) {
            ctx.tag('button');
        });
        bh.apply({ block: 'button' }).should.equal('<input class="button"/>');
    });
    it('should override user declarations with force flag', function() {
        bh.match('button', function(ctx) {
            ctx.tag('button', true);
        });
        bh.apply({ block: 'button', tag: 'a' }).should.equal('<button class="button"></button>');
    });
});

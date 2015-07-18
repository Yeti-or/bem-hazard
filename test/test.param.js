var BH = require('../');
require('chai').should();

describe('ctx.param()', function() {
    var bh;
    beforeEach(function() {
        bh = new BH();
    });
    it('should return param', function() {
        bh.match('button', function(ctx) {
            ctx.param('type').should.equal('button');
        });
        bh.apply({ block: 'button', type: 'button' });
    });
    it('should set param', function() {
        bh.match('button', function(ctx) {
            ctx.param('type').should.equal('button');
        });
        bh.match('button', function(ctx) {
            ctx.param('type', 'button');
        });
        bh.apply({ block: 'button' });
    });
    it('should not override user param', function() {
        bh.match('button', function(ctx) {
            ctx.param('type').should.equal('link');
        });
        bh.match('button', function(ctx) {
            ctx.param('type', 'button');
        });
        bh.apply({ block: 'button', type: 'link' });
    });
    it('should not override later declarations', function() {
        bh.match('button', function(ctx) {
            ctx.param('type').should.equal('button');
        });
        bh.match('button', function(ctx) {
            ctx.param('type', 'control');
        });
        bh.match('button', function(ctx) {
            ctx.param('type', 'button');
        });
        bh.apply({ block: 'button' });
    });
    it('should override later declarations with force flag', function() {
        bh.match('button', function(ctx) {
            ctx.param('type').should.equal('control');
        });
        bh.match('button', function(ctx) {
            ctx.param('type', 'control', true);
        });
        bh.match('button', function(ctx) {
            ctx.param('type', 'button');
        });
        bh.apply({ block: 'button' });
    });
    it('should override user declarations with force flag', function() {
        bh.match('button', function(ctx) {
            ctx.param('type').should.equal('button');
        });
        bh.match('button', function(ctx) {
            ctx.param('type', 'button', true);
        });
        bh.apply({ block: 'button', type: 'link' });
    });
});

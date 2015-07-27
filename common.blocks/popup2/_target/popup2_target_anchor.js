module.exports = function(bh) {

    bh.match('popup2_visible_yes', function(ctx, json) {
debugger
        if (ctx.__flag) { return }

        json.mainOffset = 0
        json.secondaryOffset = 0
        json.viewportOffset = 0

        if(!ctx._anchor) {
            throw new Error('Can\'t show popup without anchor');
        }

        //ctx._anchorParents = this._anchor.parents();
        //ctx._bindToAnchorParents();
    })

    bh.match('popup2_visible_no', function(ctx, json) {
        if (ctx.__flag) { return }

        //this._unbindFromAnchorParents();
        this._anchorParents = null;
        this._isAnchorVisible = undefined;
    })

    bh.match('popup2_target_anchor', function(ctx, json) {
        debugger
        ctx.mixJs({block: 'popup', mods: {'target': true}})
        ctx
            .didMount(function(ctx) {
                debugger
                this._anchor = null;
                this._anchorParents = null;
                this._destructor = null;
                this._isAnchorVisible = undefined;
                //this._updateIsAnchorVisible = $.throttle(
                //    this._updateIsAnchorVisible,
                //    this.__self.UPDATE_TARGET_VISIBILITY_THROTTLING_INTERVAL,
                //    this);







                /**
                 * Устанавливает цель, относительно которой нужно открываться.
                 *
                 * @param {jQuery|BEM.DOM} anchor
                 * @returns {BEM.DOM.popup2} this
                 */
                this.setAnchor = function(anchor) {
debugger
                    this
                        ._unbindFromAnchorParents()
                        ._unbindFromParentPopup()
                        ._unbindFromDestructor();

                    //this._anchor = anchor instanceof BEM.DOM ?
                    //    anchor.domElem :
                    //    anchor;
                    this._anchor = anchor

                    //this._destructor = beminize(this._anchor, '_' + this.__self.getName() + '-destructor');
                    this._isAnchorVisible = undefined;

                    //this._bindToDestructor();

                    //if(this.hasMod('visible', 'yes')) {
                    if(this.mod('visible') === 'yes') {
                        this._anchorParents = this._anchor.parents();
                        this
                            ._recaptureZIndex()
                            ._bindToAnchorParents()
                            ._bindToParentPopup()
                            .redraw();
                    } else {
                        this._anchorParents = null;
                        this._zIndexGroupLevel = null;
                    }

                    return this;
                }

                /**
                 * @override
                 * @private
                 */
                this._calcTargetDimensions = function() {
                    var anchor = this._anchor,
                        anchorPos = this._getOffsetOf(anchor);

                    return {
                        left: anchorPos.left,
                        top: anchorPos.top,
                        //width: anchor.outerWidth(),
                        //height: anchor.outerHeight()
                        width: anchor.offsetWidth,
                        height: anchor.offsetHeight
                    };
                }

                /**
                 * Возвращает позицию элемента относительно начала страницы с учетом ошибок IE на Windows Phone.
                 * @see https://st.yandex-team.ru/ISLCOMPONENTS-1627
                 *
                 * @private
                 * @param {jQuery} elem
                 * @returns {Object}
                 */
                this._getOffsetOf = function(elem) {
                    //var offset = elem.offset();
                    var rect = elem.getBoundingClientRect()
                    var offset = {
                        top: rect.top + document.body.scrollTop,
                        left: rect.left + document.body.scrollLeft
                    }

                    if('pageYOffset' in window) {
                        // Обычно эти разности равны 0, так что не IE и не заметит.
                        offset.top -= (window.pageYOffset - (document.documentElement.scrollTop || document.body.scrollTop));
                        offset.left -= (window.pageXOffset - (document.documentElement.scrollLeft || document.body.scrollLeft));
                    }

                    return offset;
                }

                /**
                 * @override
                 * @private
                 */
                    var __calcDrawingCss = function(drawingParams) {
                        return {
                            left: drawingParams.left,
                            top: drawingParams.top
                        };
                    }
                this._calcDrawingCss = function(drawingParams) {
                    if(typeof this._isAnchorVisible === 'undefined') {
                        this._isAnchorVisible = this._calcIsAnchorVisible();
                    }

                    return this.extend(
                        __calcDrawingCss(drawingParams),
                        {display: this._isAnchorVisible ? '' : 'none'});
                }

                /**
                 * Вычисляет, видим ли сейчас anchor попапа.
                 * @private
                 * @returns {Boolean}
                 */
                this._calcIsAnchorVisible = function() {
                    var anchor = this._anchor,
                        anchorOffset = this._getOffsetOf(anchor),
                        anchorLeft = anchorOffset.left,
                        anchorTop = anchorOffset.top,
                        //anchorRight = anchorLeft + anchor.outerWidth(),
                        //anchorBottom = anchorTop + anchor.outerHeight(),
                        anchorRight = anchorLeft + anchor.offsetWidth,
                        anchorBottom = anchorTop + anchor.offsetHeight,
                        //direction = this.getMod('direction'),
                        direction = this.mod('direction'),
                        vertBorder = Math.floor(this._checkDirection(direction, 'top') ? anchorTop : anchorBottom),
                        horizBorder = Math.floor(this._checkDirection(direction, 'left') ? anchorLeft : anchorRight),
                        res = true;

                    this._anchorParents && this._anchorParents.each(function(idx, parent) {
                        if(parent.tagName === 'BODY') {
                            return false;
                        }

                        parent = $(parent);

                        var re = /scroll|hidden|auto/,
                            hasOverflowY = re.test(parent.css('overflow-y')),
                            hasOverflowX = re.test(parent.css('overflow-x'));

                        if(hasOverflowY || hasOverflowX) {
                            var parentOffset = this._getOffsetOf(parent);

                            if(hasOverflowY) {
                                var parentTopOffset = Math.floor(parentOffset.top);
                                if(vertBorder < parentTopOffset || parentTopOffset + parent.outerHeight() < vertBorder) {
                                    res = false;
                                    return res;
                                }
                            }

                            if(hasOverflowX) {
                                var parentLeftOffset = Math.floor(parentOffset.left);
                                res = horizBorder >= parentLeftOffset && parentLeftOffset + parent.outerWidth() >= horizBorder;
                                return res;
                            }
                        }
                    }.bind(this));

                    return res;
                }

                /**
                 * @private
                 */
                this._calcZIndexGroupLevel = function() {
                    var res = this.__base.apply(this, arguments);

                    return this._destructor.findBlocksOutside('z-index-group').reduce(
                        function(res, zIndexGroup) {
                            return res + Number(zIndexGroup.getMod('level'));
                        },
                        res);
                }

                /**
                 * @private
                 */
                this._bindToAnchorParents = function() {
                    return this.bindTo(
                        this._anchorParents,
                        'scroll',
                        this._onAnchorParentsScroll);
                }

                /**
                 * @private
                 */
                this._unbindFromAnchorParents = function() {
                    this._anchorParents && this.unbindFrom(
                        this._anchorParents,
                        'scroll');
                    return this;
                }

                /**
                 * @private
                 */
                this._onAnchorParentsScroll = function() {
                    this
                        .redraw()
                        ._updateIsAnchorVisible();
                }

                /**
                 * @override
                 * @private
                 */
                this._onWinScollAndResize = function() {
                    this.__base.apply(this, arguments);
                    this._updateIsAnchorVisible();
                }

                /**
                 * Скрывает попап, если anchor не видим (ушел за полосы прокрутки) и наоборот.
                 * @private
                 */
                this._updateIsAnchorVisible = function() {
                    if(!this.domElem || !this.hasMod('visible')) {
                        return;
                    }

                    var isAnchorVisible = this._calcIsAnchorVisible();
                    if(isAnchorVisible !== this._isAnchorVisible) {
                        this._isAnchorVisible = isAnchorVisible;
                        this.redraw();
                    }
                }

                /**
                 * @private
                 */
                this._bindToDestructor = function() {
                    this._destructor.on('destruct', this._onPopupAnchorDestruct, this);
                    return this;
                }

                /**
                 * @private
                 */
                this._unbindFromDestructor = function() {
                    this._destructor && this._destructor.un('destruct', this._onPopupAnchorDestruct, this);
                    return this;
                }

                /**
                 * @private
                 */
                this._onPopupAnchorDestruct = function() {
                    this.domElem && BEM.DOM.destruct(this.domElem);
                }

                /**
                 * @private
                 */
                this._getParentPopup = function() {
                    if(this._parentPopup === undefined) {
                        this._parentPopup = this.findBlockOutside(this._anchor, this.__self.getName());
                    }

                    return this._parentPopup;
                }
                


            })
    })
}

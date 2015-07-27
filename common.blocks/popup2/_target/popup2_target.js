module.exports = function(bh) {
    bh.match('popup2_visible_yes', function(ctx, json) {
debugger
        if (ctx.__flag) { return }

        json.mainOffset = 0
        json.secondaryOffset = 0
        json.viewportOffset = 0

//TODO: reWrite this
        var p = ctx.domElem()
        p.classList.add('popup2_outside_yes')
        p.classList.add('popup2_visible_yes')

        ctx
        //    .bindToWin('scroll resize', this._onWinScollAndResize)
            // Перед перерисовкой выносим попап за viewport и ставим display: block, чтобы правильно
            // снимались его размеры
         ////   .setMod('outside', 'yes')
            //.mod('outside', 'yes')
            .redraw()
           // .delMod('outside');
            //.mod('outside', undefined);
        p.classList.remove('popup2_outside_yes')
    })

    bh.match('popup2_visible_no', function(ctx, json) {
        if (ctx.__flag) { return }

        //this.unbindFromWin('scroll resize');
    })
    bh.match('popup_target', function(ctx, json) {
        debugger
        ctx
            .didMount(function(ctx) {
                debugger

                this.__self.VIEWPORT_ACCURACY_FACTOR = 0.99

                this.__self.AVAILABLE_DIRECTIONS = [
                    'bottom-left', 'bottom-center', 'bottom-right',
                    'top-left', 'top-center', 'top-right',
                    'right-top', 'right-center', 'right-bottom',
                    'left-top', 'left-center', 'left-bottom'
                ]

                
                            //directions: this.__self.AVAILABLE_DIRECTIONS

/* ***
                onSetMod: {
                    'js': {
                        'inited': function() {
    *** */
                var AVAILABLE_DIRECTIONS = this.__self.AVAILABLE_DIRECTIONS;

                //TODO: this.getParam, this.params from ctx.js()
                //this.params.directions.forEach(function(direction) {
                json.directions.forEach(function(direction) {
                    if(AVAILABLE_DIRECTIONS.indexOf(direction) === -1) {
                        throw new Error('Can\'t init popup with "' + direction + '" direction. Available directions: ' +
                        AVAILABLE_DIRECTIONS.join(', '));
                    }
                });

                this._lastDrawingCss = {
                    left: undefined,
                    top: undefined,
                    zIndex: undefined,
                    display: undefined
                };



                this.redraw = function() {
                    debugger
                    json.mainOffset = 0
                    json.secondaryOffset = 0
                    json.viewportOffset = 0
                    //if(!this.hasMod('visible', 'yes') && !this.hasMod('outside', 'yes')) {
                    //    return this;
                    //}
                    if(ctx.mod('visible') !== 'yes') {
                        return this
                    }

                    var bestDrawingParams = this._calcBestDrawingParams();

                    //this.setMod('direction', bestDrawingParams.direction);
                    ctx.mod('direction', bestDrawingParams.direction)

                    var lastDrawingCss = this._lastDrawingCss,
                        needUpdateCss = false;

                    //$.each(
                    //    this._calcDrawingCss(bestDrawingParams),
                    //    function(name, val) {
                    //        if(lastDrawingCss[name] !== val) {
                    //            lastDrawingCss[name] = val;
                    //            needUpdateCss = true;
                    //        }
                    //    });
                    var css = this._calcDrawingCss(bestDrawingParams)
                    Object.keys(css).forEach(function(name, val) {
                        val = css[name]
                        if(lastDrawingCss[name] !== val) {
                            lastDrawingCss[name] = val;
                            needUpdateCss = true;
                        }
                    })

                    if(needUpdateCss) {
                        //this.domElem.css(lastDrawingCss);
debugger
                        this.attr('style', lastDrawingCss)
                    }

                    return this;
                }

                /**
                 * @private
                 */
                this._calcDrawingCss = function(drawingParams) {
                    return {
                        left: drawingParams.left,
                        top: drawingParams.top
                    };
                }

                /**
                 * Возвращает массив возможных параметров раскрытия с максимально доступной площадью.
                 * Каждый элемент массива описывает прямоугольную область, в которой может находиться попап. Формат элемента:
                 *
                 * ```js
                 * {
                 *     direction: 'bottom-left', // направление
                 *     height: 540,              // доступная высота области
                 *     width: 1000,              // доступная ширина области
                 *     left: 10,                 // левая координата области
                 *     top: 30                   // верхняя координата области
                 * }
                 * ```
                 *
                 * Не стоит путать параметры `top`/`left` с позицией попапа. Тут эти параметры указывают на позицию доступной
                 * области, а не попапа.
                 *
                 * @public
                 * @returns {Object[]}
                 */
                this.calcPossibleDrawingParams = function() {
                    var target = this._calcTargetDimensions(),
                        viewport = this._calcViewportDimensions(),
                        //params = this.params,
                        params = json,
                        mainOffset = params.mainOffset,
                        secondaryOffset = params.secondaryOffset,
                        viewportOffset = params.viewportOffset;

                    //return this.params.directions.map(function(direction) {
                    return params.directions.map(function(direction) {
                        var res = {
                            direction: direction,
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0
                        };

                        if(this._checkMainDirection(direction, 'bottom')) {
                            res.top = target.top + target.height + mainOffset;
                            res.height = viewport.bottom - res.top - viewportOffset;
                        } else if(this._checkMainDirection(direction, 'top')) {
                            res.height = target.top - viewport.top - mainOffset - viewportOffset;
                            res.top = target.top - res.height - mainOffset;
                        } else {
                            if(this._checkSecondaryDirection(direction, 'center')) {
                                res.height = viewport.bottom - viewport.top - 2 * viewportOffset;
                                res.top = target.top + (target.height - res.height) / 2;
                            } else if(this._checkSecondaryDirection(direction, 'bottom')) {
                                res.height = target.top + target.height - viewport.top - secondaryOffset - viewportOffset;
                                res.top = target.top + target.height - res.height - secondaryOffset;
                            } else if(this._checkSecondaryDirection(direction, 'top')) {
                                res.top = target.top + secondaryOffset;
                                res.height = viewport.bottom - res.top - viewportOffset;
                            }

                            if(this._checkMainDirection(direction, 'left')) {
                                res.width = target.left - viewport.left - mainOffset - viewportOffset;
                                res.left = target.left - res.width - mainOffset;
                            } else {
                                res.left = target.left + target.width + mainOffset;
                                res.width = viewport.right - res.left - viewportOffset;
                            }
                        }

                        if(this._checkSecondaryDirection(direction, 'right')) {
                            res.width = target.left + target.width - viewport.left - secondaryOffset - viewportOffset;
                            res.left = target.left + target.width - res.width - secondaryOffset;
                        } else if(this._checkSecondaryDirection(direction, 'left')) {
                            res.left = target.left + secondaryOffset;
                            res.width = viewport.right - res.left - viewportOffset;
                        } else if(this._checkSecondaryDirection(direction, 'center')) {
                            if(this._checkMainDirection(direction, 'top', 'bottom')) {
                                res.width = viewport.right - viewport.left - 2 * viewportOffset;
                                res.left = target.left + target.width / 2 - res.width / 2;
                            }
                        }

                        return res;
                    }, this);
                }

                /**
                 * Вычисляет лучшие параметры отображения. Под лучшими параметрами понимаются параметры для первого подходящего
                 * направления из directions, которое может обеспечить размещение 99% (VIEWPORT_ACCURACY_FACTOR) площади попапа.
                 * Если подходящего направления не найдено, то предпочтение отдается направлению, в котором попап открывался
                 * последний раз, или первому направлению из списка.
                 *
                 * @private
                 */
                this._calcBestDrawingParams = function() {
                    var popup = this._calcPopupDimensions(),
                        target = this._calcTargetDimensions(),
                        viewport = this._calcViewportDimensions(),
                        //directions = this.params.directions,
                        directions = json.directions,
                        directionsLength = directions.length,
                        direction,
                        pos,
                        viewportFactor,
                        bestDirection,
                        bestPos,
                        bestViewportFactor;

                    for(var i = 0; i < directionsLength; i++) {
                        direction = directions[i];
                        pos = this._calcPos(direction, target, popup);
                        viewportFactor = this._calcViewportFactor(pos, viewport, popup);

                        if(i === 0 ||
                            viewportFactor > bestViewportFactor ||
                            (!bestViewportFactor && this.hasMod('direction', direction))) {

                            bestDirection = direction;
                            bestViewportFactor = viewportFactor;
                            bestPos = pos;
                        }

                        if(bestViewportFactor > this.__self.VIEWPORT_ACCURACY_FACTOR) {
                            break;
                        }
                    }

                    return {
                        direction: bestDirection,
                        left: bestPos.left,
                        top: bestPos.top
                    };
                }

                /**
                 * @private
                 */
                this._calcPopupDimensions = function() {
                    //var popupWidth = this.domElem.outerWidth(),
                    //    popupHeight = this.domElem.outerHeight();

                    var dom = this.domElem(),
                        popupWidth = dom.offsetWidth,
                        popupHeight = dom.offsetHeight


                    return {
                        width: popupWidth,
                        height: popupHeight,
                        area: popupWidth * popupHeight
                    };
                }

                /**
                 * @abstract
                 * @private
                 */
                this._calcTargetDimensions = function() {}

                /**
                 * @private
                 */
                this._calcViewportDimensions = function() {
                    //var win = BEM.DOM.win,
                    var win = window,
                        //winTop = win.scrollTop(),
                        winTop = win.pageYOffset,
                        //winLeft = win.scrollLeft(),
                        winLeft = win.pageXOffset,
                        //winWidth = win.width(),
                        winWidth = win.innerWidth,
                        //winHeight = win.height();
                        winHeight = win.innerHeight

                    return {
                        top: winTop,
                        left: winLeft,
                        bottom: winTop + winHeight,
                        right: winLeft + winWidth
                    };
                }

                /**
                 * Вычисляет координаты попапа для заданного направления
                 *
                 * @private
                 * @param {String} direction Строка типа bottom-left
                 * @param {Object} target    Размеры target-a: top, left, width, height
                 * @param {Object} popup     Размеры попапа: width, height, area
                 * @returns {Object}         Координаты попапа: left, top
                 */
                this._calcPos = function(direction, target, popup) {
                    var res = {},
                        //mainOffset = this.params.mainOffset,
                        mainOffset = json.mainOffset,
                        secondaryOffset = json.secondaryOffset;

                    if(this._checkMainDirection(direction, 'bottom')) {
                        res.top = target.top + target.height + mainOffset;
                    } else if(this._checkMainDirection(direction, 'top')) {
                        res.top = target.top - popup.height - mainOffset;
                    } else if(this._checkMainDirection(direction, 'left')) {
                        res.left = target.left - popup.width - mainOffset;
                    } else if(this._checkMainDirection(direction, 'right')) {
                        res.left = target.left + target.width + mainOffset;
                    }

                    if(this._checkSecondaryDirection(direction, 'right')) {
                        res.left = target.left + target.width - popup.width - secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'left')) {
                        res.left = target.left + secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'bottom')) {
                        res.top = target.top + target.height - popup.height - secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'top')) {
                        res.top = target.top + secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'center')) {
                        if(this._checkMainDirection(direction, 'top', 'bottom')) {
                            res.left = target.left + target.width / 2 - popup.width / 2;
                        } else if(this._checkMainDirection(direction, 'left', 'right')) {
                            res.top = target.top + target.height / 2 - popup.height / 2;
                        }
                    }

                    return res;
                }

                /**
                 * Вычисляет коэффициент (factor) пересечения доступной площади для открытия попапа и собственной площади попапа.
                 * @private
                 */
                this._calcViewportFactor = function(pos, viewport, popup) {
                    //var viewportOffset = this.params.viewportOffset,
                    var viewportOffset = json.viewportOffset,
                        intersectionLeft = Math.max(pos.left, viewport.left + viewportOffset),
                        intersectionRight = Math.min(pos.left + popup.width, viewport.right - viewportOffset),
                        intersectionTop = Math.max(pos.top, viewport.top + viewportOffset),
                        intersectionBottom = Math.min(pos.top + popup.height, viewport.bottom - viewportOffset);

                    if(intersectionLeft < intersectionRight && intersectionTop < intersectionBottom) {
                        // есть пересечение
                        return (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop) / popup.area;
                    } else {
                        return 0;
                    }
                }

                /**
                 * @private
                 */
                this._checkMainDirection = function(direction, mainDirection1, mainDirection2) {
                    return direction.indexOf(mainDirection1) === 0 || (mainDirection2 && direction.indexOf(mainDirection2) === 0);
                }

                /**
                 * @private
                 */
                this._checkSecondaryDirection = function(direction, secondaryDirection) {
                    return direction.indexOf('-' + secondaryDirection) > 0;
                }

                /**
                 * @private
                 */
                this._checkDirection = function(direction, directionPart) {
                    return direction.indexOf(directionPart) >= 0;
                }

                /**
                 * @private
                 */
                this._onWinScollAndResize = function(e) {
                    this.redraw();
                }

                /**
                 * @protected
                 */
                this.getDefaultParams = function() {
                    return $.extend(
                        this.__base.apply(this, arguments),
                        {
                            mainOffset: 0,
                            secondaryOffset: 0,
                            viewportOffset: 0,
                            directions: this.__self.AVAILABLE_DIRECTIONS
                        });
                }


        })
    })
}

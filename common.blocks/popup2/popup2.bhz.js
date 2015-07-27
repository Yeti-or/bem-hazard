module.exports = function(bh) {

/* ***
        'visible': {
            'yes': function() {
*** */
    bh.match('popup2_visible_yes', function(ctx, json) {
debugger
        if (ctx.__flag) { return }

        ctx
            ._captureZIndex()
    })

    bh.match('popup2_visible_no', function(ctx, json) {
        if (ctx.__flag) { return }

        ctx
            ._releaseZIndex()
    })

    bh.match('popup2', function(ctx, json) {
        ctx
            .willReceiveProps(function(ctx, json) {
                //to persist zIndex style attr
                json.attrs = ctx.attrs()
            })
            .willMount(function(ctx, json) {
                debugger
                ctx.mod('js', 'inited')
            })
            .didMount(function(ctx, json) {

                    document.body.appendChild(ctx.domElem())
/* ***
                onSetMod: {
                    'js': {
                        'inited': function() {
    *** */

                    ctx._parentPopup = undefined; // Тут важен undefined. Означает, что попап еще не искали.
                    ctx._zIndex = null;
                    ctx._zIndexGroupLevel = null;
                    ctx._isAttachedToScope = false;
    /* ***
                    getDefaultParams: function() {
                        return {
                            zIndexGroupLevel: 0
                        };
                    }
    *** */
                    this.params = {
                        zIndexGroupLevel: 0
                    }

                    /**
                     * Хранит стеки всех z-index для открытых попапов. Имеет такую структуру:
                     * {
                     *    0: [1000, 1001, 1002], // ключ - это уровень, значения в массиве - это занятые z-index-ы
                     *    9: [10000, 10001]
                     *    // ..
                     * }
                     *
                     * @private
                     */
                    this.__self._visiblePopupsZIndexes = {}

                    /**
                     * @private
                     */
                    this.__self.ZINDEX_FACTOR = 1000



            /**
             * @private
             */
            ctx._calcZIndexGroupLevel = function() {
                var res = this.params.zIndexGroupLevel,
                    parentPopup = this._getParentPopup();

                if(parentPopup) {
                    res += parentPopup._zIndexGroupLevel;
                }

                return res;
            }

            /**
             * Выставляет себе и всем родительским попапам флаг для предотвращения закрытия по клику.
             * @private
             */
            ctx._setPreventHideByClick = function() {
                var curPopup = this;
                do {
                    curPopup._preventHideByClick = true;
                    curPopup = curPopup._getParentPopup();
                } while(curPopup);
            }

            /**
             * @private
             */
            ctx._bindToParentPopup = function() {
                var parentPopup = this._getParentPopup();
                parentPopup && parentPopup.on('beforeClose', this._onParentPopupClose, this);

                return this;
            }

            /**
             * @private
             */
            ctx._unbindFromParentPopup = function() {
                this._parentPopup && this._parentPopup.un('beforeClose', this._onParentPopupClose, this);
                this._parentPopup = undefined;

                return this;
            }

            /**
             * @private
             */
            ctx._onParentPopupClose = function() {
                this.delMod('visible');
            },

            /**
             * @private
             */
            ctx._getParentPopup = function() {
                return this._parentPopup;
            }

            /**
             * Занимает наименьший свободный z-index в стеке для своего уровня. Выставляет его DOM-элементу.
             * @private
             */
            ctx._captureZIndex = function() {
                if(this._zIndexGroupLevel === null) {
                    this._zIndexGroupLevel = this._calcZIndexGroupLevel();
                }

                var visiblePopupsZIndexes = this.__self._visiblePopupsZIndexes,
                    level = this._zIndexGroupLevel,
                    zIndexes = visiblePopupsZIndexes[level],
                    prevZIndex = this._zIndex;

                if(!zIndexes) {
                    zIndexes = visiblePopupsZIndexes[level] = [(level + 1) * this.__self.ZINDEX_FACTOR];
                }

                this._zIndex = zIndexes[zIndexes.length - 1] + 1;
                zIndexes.push(this._zIndex);

                if(this._zIndex !== prevZIndex) {
debugger
                    var style = this.attr('style')
                    this.attr('style', this.extend(style, {'zIndex': this._zIndex}), true)
                    //this.domElem().style['z-index'] = this._zIndex
                }

                return this;
            }

            /**
             * Освобождает z-index в стеке.
             * @private
             */
            ctx._releaseZIndex = function() {
                var zIndexes = this.__self._visiblePopupsZIndexes[this._zIndexGroupLevel];
                zIndexes.splice(zIndexes.indexOf(this._zIndex), 1);

                return this;
            },

            /**
             * Освобождает z-index в стеке, пересчитывает заново свой уровень (нужно, если попап переместили к другому anchor)
             * и занимает z-index заново.
             * @private
             */
            ctx._recaptureZIndex = function() {
                this._releaseZIndex();
                this._zIndexGroupLevel = null;

                return this._captureZIndex();
            }
        })
            
    })
}

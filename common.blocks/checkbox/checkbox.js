/**
 * Блок `checkbox` («чекбокс») – независимый переключатель.
 * Позволяет управлять параметром с двумя состояниями – включено и выключено.
 */
BEM.DOM.decl('checkbox', {
    /**
     * Выполняется после смены состояния модификатора checked.
     *
     * @event checkbox#change
     * @param {Boolean} checked Признак, указывающий выставлен ли модификатор checked в значение 'yes'.
     */

    /**
     * @private
     */
    onSetMod: {

        'js': function() {
            this.setMod('checked', this.elem('control').prop('checked') ? 'yes' : '');
            this._isControlFocused() && this.setMod('focused', 'yes');
        },

        'focused': {

            'yes': function() {

                if(this.isDisabled()) {
                    return false;
                }

                this._isControlFocused() || this.elem('control').focus();

                this.setMod(this.elem('box'), 'focused', 'yes');

                this.afterCurrentEvent(function() {
                    this.trigger('focus');
                });

            },

            '': function() {

                this._isControlFocused() && this.elem('control').blur();

                this.delMod(this.elem('box'), 'focused');

                this.afterCurrentEvent(function() {
                    this.trigger('blur');
                });

            }

        },

        'checked': function(modName, modVal) {

            if(this.isDisabled()) {
                return false;
            }

            this.elem('control').prop('checked', modVal === 'yes');

            this.afterCurrentEvent(function() {
               this.trigger('change', {checked: modVal === 'yes'});
            });

            this.setMod(this.elem('box'), 'checked', modVal);

        },

        'disabled': function(modName, modVal) {
            this.elem('control').prop('disabled', modVal === 'yes');
        }

    },

    /**
     * Сокращенная форма для проверки модификатора `_disabled_yes`.
     *
     * @public
     * @returns {Boolean}
     */
    isDisabled: function() {
        return this.hasMod('disabled', 'yes');
    },

    /**
     * Сокращенная форма для проверки модификатора `_checked_yes`.
     *
     * @public
     * @returns {Boolean}
     */
    isChecked: function() {
        return this.hasMod('checked', 'yes');
    },

    /**
     * Хелпер для переключения модификатора `_checked_yes`.
     *
     * @public
     */
    toggle: function() {
        this.toggleMod('checked', 'yes', '');
    },

    /**
     * Получить/установить значение контрола.
     *
     * @public
     * @param {String} [val] значение, которое нужно установить
     * @returns {String|BEM.DOM}
     */
    val: function(val) {

        var checkbox = this.elem('control');

        if(typeof val === 'undefined') {
            return checkbox.val();
        }

        checkbox.val(val);

        return this;

    },

    /**
     * Возвращает/устанавливает название нативного контрола.
     *
     * @public
     * @param {String} [val] Новое название для контрола.
     * @returns {String|BEM.DOM}
     */
    name: function(val) {
        var control = this.elem('control');

        if(!arguments.length) {
            return control.attr('name');
        }

        control.attr('name', val);

        return this;
    },

    /**
     * @private
     */
    _onClick: function(e) {
        this.isDisabled() || this.setMod('focused', 'yes');
    },

    /**
     * @private
     */
    _onChange: function(e) {
        e.target.checked ? this.setMod('checked', 'yes') : this.delMod('checked');
    },

    /**
     * Обработчик события получения/потери фокуса.
     *
     * @private
     * @param {Event} e
     */
    _onFocusInFocusOut: function(e) {
        this.setMod('focused', e.type === 'focusin' ? 'yes' : '');
    },

    /**
     * @private
     */
    _onMouseOverMouseOut: function(e) {
        this.isDisabled() ||
            this.setMod('hovered', e.type === 'mouseover' ? 'yes' : '');
    },

    /**
     * Проверяет в фокусе ли контрол.
     *
     * @private
     * @returns {Boolean}
     */
    _isControlFocused: function() {

        try {
            return this.containsDomElem($(this.__self.doc[0].activeElement));
        } catch(e) {
            return false;
        }

    }

}, {

    live: function() {
        this
            .liveBindTo('leftclick tap', function(e) {
                this._onClick(e);
            })
            .liveBindTo('control', 'change', function(e) {
                this._onChange(e);
            })
            .liveBindTo('control', 'focusin focusout', function(e) {
                this._onFocusInFocusOut(e);
            })
            .liveBindTo('mouseover mouseout', function(e) {
                this._onMouseOverMouseOut(e);
            });
    }

});

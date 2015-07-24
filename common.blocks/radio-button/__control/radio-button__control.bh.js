module.exports = function(bh) {
    bh.match('radio-button__control', function(ctx) {

        var controlAttrs = ctx.tParam('_controlAttrs');

        if(controlAttrs.disabled) {
            controlAttrs.disabled = 'disabled';
            controlAttrs.tabindex = '-1';
        } else {
            delete controlAttrs.disabled;
        }

        if(controlAttrs.checked) {
            controlAttrs.checked = 'checked';
        } else {
            delete controlAttrs.checked;
        }

        controlAttrs.type = 'radio';
        controlAttrs.name = ctx.tParam('_radioButton').name; // Прокидываем поле name из блока.

        ctx
            .tag('input')
            .attrs(controlAttrs);
    });
};

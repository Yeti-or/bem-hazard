
bh.match('button2', function(ctx, json) {
        var attrs = {
            type: 'button',
            id: json.id,
            title: json.title,
            name: json.name,
            value: json.val
        };

        ctx.param('tabIndex', '0');

        if(ctx.mod('disabled')) {
            attrs.disabled = true;
            attrs['aria-disabled'] = true;
        } else {
            attrs.tabIndex = json.tabIndex;
        }

        ctx
            .tag('button')
            .js({_tabindex: json.tabIndex})
            .attrs(attrs)
            .tParam('_size', ctx.mod('size'));

        if(!json.content) {
            ctx.content([
                json.icon && {
                    elem: 'icon',
                    icon: json.icon
                },
                json.iconLeft && {
                    elem: 'icon',
                    elemMods: {side: 'left'},
                    icon: json.iconLeft
                },
                json.iconRight && {
                    elem: 'icon',
                    elemMods: {side: 'right'},
                    icon: json.iconRight
                },
                // Текст может быть пустой строкой, поэтому hasOwnProperty.
                json.hasOwnProperty('text') && (ctx.isSimple(json.text)
                    ? {elem: 'text', content: bh.xmlEscape(json.text)}
                    : ctx.extend({}, json.text, {elem: 'text'}))
            ].filter(Boolean)); // Удаляем все undefined в массиве.
        }

        ctx
        .muMods({
            pressed: false,
            focused: false
        })

        .beforeUpdate(function() {
            if (ctx.mod('disabled')) {
                //TODO: could not delete tabIndex from node
                //I suppose it's bug in React
                ctx.attr('tabIndex', -1)
                if (ctx.muMod('focused')) {
                    ctx
                        .muMod('focused', false)
                        .domElem().bind()
                }
            }
        })

        .bind({
            onClick: function(e) {
                ctx.mod('disabled') || json.onClick && json.onClick(e)
            },
            onMouseLeave: function() {
                //TODO: bindToDoc diff from native btn
                ctx.muMod('pressed', false)
            },
            onMouseDown: function() {
                ctx.muMod('pressed', true)
            },
            onMouseUp: function() {
                ctx.muMod('pressed', false)
            },
            onKeyDown: function(e) {
                if (e.key === ' ' || e.key === 'Enter') {
                    ctx.muMod('pressed', true)
                }
            },
            onKeyUp: function(e) {
                ctx.muMod('pressed', false)
            },
            onFocus: function() {
                if (!ctx.mod('disabled')) {
                    ctx.muMod('focused', true)
                }
            },
            onBlur: function() {
                ctx.muMod('focused', false)
            }
        })

})

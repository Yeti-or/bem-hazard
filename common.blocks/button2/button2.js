
bh.match({block: 'button2'}, function(ctx, json) {
    var block = 'button2',
        content = json.children,
        cls__text = block + '__' + 'text'

    var attrs = {
        type: 'button',
        id: json.id,
        title: json.title,
        name: json.name,
        value: json.val
    };

    ctx

        ctx.param('tabindex', '0');

        if(ctx.mod('disabled')) {
            attrs.disabled = true;
            attrs['aria-disabled'] = true;
        } else {
            attrs.tabIndex = json.tabIndex;
        }

        ctx
            .tag('button')
            .js({_tabindex: json.tabindex})
            .attrs(attrs)
            .tParam('_size', ctx.mod('size'));


        ctx.content(<span className={cls__text}>{content}</span>)

        ctx
        .muMods({
            pressed: false,
            focused: false
        })

        .beforeUpdate(function() {
            if (ctx.mod('disabled')) {
                ctx.attr('tabIndex', undefined)
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

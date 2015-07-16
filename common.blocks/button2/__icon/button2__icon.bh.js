
    bh.match('button2__icon', function(ctx, json) {
        var icon = ctx.extend({}, json.icon); // Копируем, чтобы быть immutable.

        icon.block = 'icon';
        icon.mix = [{block: 'button2', elem: 'icon', elemMods: json.elemMods}].concat(icon.mix || []);
        icon.mods = ctx.extend({size: ctx.tParam('_size')}, icon.mods);

        return icon;
    });

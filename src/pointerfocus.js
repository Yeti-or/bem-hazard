(function() {

if(!window.addEventListener) {
    return;
}

var ROOT_ELEM = $(document.documentElement),
    isPointer = false;

function setPointerFlag() {
    isPointer = true;

    // Программную установку фокуса иногда заворачивают в afterCurrentEvent.
    // Чтобы корректно обрабатывать такие случаи, сбрасываем флаг во _втором_ тике.
    // NOTE: В качестве контекста указывается window, иначе в IE9 будет ошибка "Invalid calling object".
    setTimeout(setTimeout.bind(window, resetPointerFlag));
}

function resetPointerFlag() {
    isPointer = false;
}

function toggleClass() {
    ROOT_ELEM.toggleClass('pointerfocus', isPointer);
}

// Для надежности вешаем события на window на фазу захвата.
// Из-за фазы захвата не используем jQuery.

// Обычно, фокус выставляется сразу после mousedown.
// На touch устройствах mousedown также работает.
addEventListener('mousedown', setPointerFlag, true);

// FF Mac и Safari не ставят фокус большинству элементов управления по событиям мыши.
// И не позволяют выставить фокус программно в обработчике mousedown.
// Подробности: http://jsfiddle.net/mishaberezin/892yppts/2/.
// Из-за этого фокус нередко выставляют по событию mouseup, поэтому его тоже слушаем.
addEventListener('mouseup', setPointerFlag, true);

// HTMLLabelElement выставляет фокус связанному элементу по событию click.
// Также возможна программная установка фокуса по событию click.
addEventListener('click', setPointerFlag, true);

// FF не поддерживает focusin, зато умеет захват у события focus.
// Остальные браузеры умеют и то и то, но вот в IE событие
// focus ведет себя ненадежно. Например, при перемещении стрелками
// по радиогруппе, события на элементе интерфейса наступают в такой последовательности:
// keydown → focusin → click (синтетический) → focus.
// Подробности:
// * https://bugzilla.mozilla.org/687787
// * http://jsfiddle.net/mishaberezin/8gz4ryhy/10/
//
// Итого: FF (focus), IE (focusin), Остальные (не имеет значения).
// Используем проверку на window.onfocusin.
addEventListener('onfocusin' in window ? 'focusin' : 'focus', toggleClass, true);
})();

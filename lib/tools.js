const camelCase = require('camelcase')

function parseAttributes($el) {
    return Object.keys($el[0].attribs)
        .filter(key => key.startsWith('data-'))
        .reduce((obj, key) => {
            obj[camelCase(key.slice(5))] = $el[0].attribs[key];
            return obj;
        }, {});
}

function deleteConditionalCommentWrapper($, className) {
    let $previousElement = false
    let previousElementWasMatch = false

    $(`.${className}`).first().parent().contents().each(function() {
        previousElementWasMatch && $(this).remove()
        if ($(this).hasClass(className) && $previousElement[0].type === 'comment') {
            $previousElement.remove()
            previousElementWasMatch = true
        } else {
            previousElementWasMatch = false
        }
        $previousElement = $(this)
    })
}

module.exports = {
    parseAttributes,
    deleteConditionalCommentWrapper
}

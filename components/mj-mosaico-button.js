const Button = require('mjml-text').default
const tag = require('../lib/tag-factory')
const mosaico = require('../lib/mosaico')
const tools = require('../lib/tools')

const postRender = $ => {
    $('.mj-mosaico-button').each(function() {
        const { name, visible } = tools.parseAttributes($(this))

        mosaico.addVisibleModel({
            name,
            $el: $(this).next().closest('tr'),
            visibleState: visible,
        })

        mosaico.addButtonModel({
            name,
            $el: $(this).next().find('a'),
        })

        $(this).remove()
    })

    return $
}

module.exports.default = tag({
    Base: Button,
    tagName: 'mj-mosaico-button',
    postRender,
    attributes: {
        'name': '',
        'visible': ''
    }
})

const Text = require('mjml-text').default
const tag = require('../lib/tag-factory')
const mosaico = require('../lib/mosaico')
const tools = require('../lib/tools')

const postRender = $ => {
    $('.mj-mosaico-text').each(function() {
        const { name, visible } = tools.parseAttributes($(this))

        mosaico.addVisibleModel({
            name,
            $el: $(this).next().closest('tr'),
            visibleState: visible,
        })

        mosaico.addTextModel({
            name,
            $el: $(this).next().find('*:not(:has("*"))')
        })

        $(this).remove()
    })

    return $
}

module.exports.default = tag({
    Base: Text,
    tagName: 'mj-mosaico-text',
    postRender,
    attributes: {
        'name': '',
        'visible': ''
    }
})

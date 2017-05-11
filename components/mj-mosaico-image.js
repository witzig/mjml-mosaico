const Image = require('mjml-text').default
const tag = require('../lib/tag-factory')
const mosaico = require('../lib/mosaico')
const tools = require('../lib/tools')

const postRender = $ => {
    $('.mj-mosaico-image').each(function() {
        const {
            name,
            visible,
            placeholderHeight,
            showPlaceholder
        } = tools.parseAttributes($(this))

        mosaico.addVisibleModel({
            name,
            $el: $(this).next().closest('tr'),
            visibleState: visible,
        })

        mosaico.addImageModel({
            name,
            $el: $(this).next().find('img'),
            placeholderHeight,
            showPlaceholder
        })

        $(this).remove()
    })

    return $
}

module.exports.default = tag({
    Base: Image,
    tagName: 'mj-mosaico-image',
    postRender,
    attributes: {
        'name': '',
        'visible': '',
        'placeholder-height': 200,
        'show-placeholder': false
    }
})

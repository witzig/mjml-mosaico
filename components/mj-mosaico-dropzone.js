const Section = require('mjml-section').default
const tag = require('../lib/tag-factory')
const mosaico = require('../lib/mosaico')
const tools = require('../lib/tools')

const tagName = 'mj-mosaico-dropzone'

const postRender = $ => {
    tools.deleteConditionalCommentWrapper($, tagName)
    mosaico.addTemplateModel({ $ })
    mosaico.writeModel({ $ })

    $('.mj-mosaico-dropzone, .mj-mosaico-block').each(function() {
        Object.keys($(this)[0].attribs).map(key => {
            key.startsWith('data-') && !key.startsWith('data-ko-') && $(this).removeAttr(key)
        })
    })

    return $
}

module.exports.default = tag({
    Base: Section,
    tagName,
    postRender,
    attributes: {
        'ko-container': 'main',
        'ko-wrap': 'false'
    }
})

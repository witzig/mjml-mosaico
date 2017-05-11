const Section = require('mjml-section').default
const tag = require('../lib/tag-factory')
const tools = require('../lib/tools')

const tagName = 'mj-mosaico-block-begin'
const postRender = $ => {
    tools.deleteConditionalCommentWrapper($, tagName)
    return $
}

module.exports.default = tag({
    Base: Section,
    tagName,
    postRender,
    attributes: {
        'name': '',
        'postrender': ''
    }
})

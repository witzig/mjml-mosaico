const Section = require('mjml-section').default
const tag = require('../lib/tag-factory')
const tools = require('../lib/tools')
const mosaico = require('../lib/mosaico')

const tagName = 'mj-mosaico-block-end'

const postRender = $ => {
    tools.deleteConditionalCommentWrapper($, tagName)
    const $dropzone = $('.mj-mosaico-dropzone').first()

    // wrap blocks and move them to $dropzone
    let $block = false
    $('.mj-mosaico-block-begin').first().parent().contents().each(function() {
        if ($(this).hasClass('mj-mosaico-block-begin')) {
            $block = $(this)
                .appendTo($dropzone)
                .removeClass()
                .addClass('mj-mosaico-block')
        } else if ($(this).hasClass('mj-mosaico-block-end')) {
            $(this).remove()
            $block = false
        } else if ($block) {
            $(this).appendTo($block)
        }
    })

    // create block models
    $dropzone.children().each(function() {
        const { name, postrender } = tools.parseAttributes($(this))
        mosaico.addBlockModel({
            name,
            $,
            $el: $(this),
            postrender
        })
    })

    return $
}

module.exports.default = tag({
    Base: Section,
    tagName,
    postRender,
    attributes: {}
})

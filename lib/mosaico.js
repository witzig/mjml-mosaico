const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').css
const camelCase = require('camelcase')

const modelStore = []

// TODO
let postrenderCollection = {};
if (process.env.TMPL && fs.existsSync(path.join(__dirname, '..', 'templates', process.env.TMPL.toString(), 'postrender.js'))) {
    postrenderCollection = require('../templates/' + process.env.TMPL + '/postrender')
}

function addVisibleModel({ name, $el, visibleState }) {
    const modelName = camelCase(name)

    if (visibleState !== '') {
        const visibleModelName = `${modelName}Visible`

        $el.attr('data-ko-display', visibleModelName)
        $el.attr('data-mo-display-state', visibleState)

        modelStore.push(
            `${visibleModelName} {
                label: ${name};
                extend: visible;
            }`
        )
    }
}

function addImageModel({ name, $el, placeholderHeight, showPlaceholder }) {
    const modelName = camelCase(name)

    $el.attr('data-ko-editable', `${modelName}.src`)
    $el.css('-ko-attr-alt', `@${modelName}.alt`)

    $el.attr('height', placeholderHeight)
    $el.css('-ko-attr-height', '@imageHeight')
    $el.css('height', 'auto')

    $el.attr('data-ko-placeholder-width', $el.attr('width'))
    $el.attr('data-ko-placeholder-height', placeholderHeight)

    showPlaceholder === 'true' && $el.attr('data-ko-placeholder-src', $el.attr('src'))

    modelStore.push(
        `${modelName} {
            label: ${name};
            extend: image;
        }`
    )
}

function addTextModel({ name, $el }) {
    const modelName = camelCase(name)

    $el.attr('data-ko-editable', modelName)

    modelStore.push(
        `${modelName} {
            label: ${name};
            extend: text;
        }`
    )
}

function addButtonModel({ name, $el }) {
    const modelName = camelCase(name)

    $el.attr('data-ko-editable', `${modelName}.text`)
    $el.css('-ko-attr-href', `@${modelName}.url`)

    modelStore.push(
        `${modelName} {
            label: ${name};
            extend: buttonLink;
        }`
    )
}

function addBlockModel({ name, $, $el, postrender }) {
    const modelName = camelCase(name)
    const props = []
    const variants = []

    $el.attr('data-ko-block', modelName)

    // prop image?
    if ($el.find('img[data-ko-editable]').length) {
        props.push('image')
    }

    // prop text?
    if ($el.find('*[data-ko-editable]:not("img, a")').length) {
        props.push('longText')
    }

    // prop link?
    if ($el.find('a[data-ko-editable]').length) {
        props.push('buttonLink')
    }

    // props visible?
    $el.find('*[data-ko-display]').each(function () {
        const visibleModel = $(this).attr('data-ko-display')
        const visibleState = $(this).attr('data-mo-display-state')
        props.push(`${visibleModel}=${visibleState}`)
    })

    // block postrenderers
    if (postrender) {
        const jobs = postrender.split(',').map(j => j.trim())
        jobs.forEach(job => {
            const renderer = postrenderCollection[job]
            if (typeof renderer === 'function') {
                renderer({
                    $,
                    $block: $el,
                    blockProps: props,
                    blockVariants: variants,
                    modelStore,
                })
            } else {
                console.log(`postrender: ${job} is not a function`)
            }
        })
    }

    modelStore.push(
        `${modelName} {
            label: ${name};
            properties: ${props.join(' ')};
            variant: ${variants.join(' ')};
        }`
    )
}

function addTemplateModel({ $ }) {
    modelStore.push('htmlTitleText { label: HTML Title; extend: text; }')
    modelStore.push('template { label: General Settings; properties: htmlTitleText; }')
    $('title').css('-ko-bind-text', '@htmlTitleText')
}

function writeModel({ $ }) {
    const defaultModels = fs.readFileSync(path.resolve(__dirname, 'mosaico-models.css'), 'utf8')

    let models = modelStore.map(m => m.replace(/^\s+|\s+$/g, ''))
    models = models.filter((item, pos) => models.indexOf(item) === pos)
    models = beautify(models.join('\n'), {
        newline_between_rules: 0
    })

    $('head').append(
        `<style type="text/css">
            @supports -ko-blockdefs {
                ${defaultModels}
                ${models}
            }
        </style>`
    )
}

module.exports = {
    addVisibleModel,
    addImageModel,
    addTextModel,
    addButtonModel,
    addBlockModel,
    addTemplateModel,
    writeModel
};

const React = require('react')
const Raw = require('mjml-raw').default
const Section = require('mjml-section').default

module.exports = ({ Base, tagName, attributes, postRender }) => {

    function Tag() {
        return Reflect.construct(Raw, arguments, Tag)
    }

    Reflect.setPrototypeOf(Tag.prototype, Raw.prototype)
    Reflect.setPrototypeOf(Tag, Raw)

    Tag.prototype.getTagName = function() {
        const { parentMjml } = this.props
        switch (parentMjml.get('tagName')) {
            case 'mj-column':
                return 'tr'
            default:
                return 'div'
        }
    }

    Tag.prototype.dataAttributes = function() {
        const attribs = {}
        this.props.mjml.get('attributes').forEach((val, key) => {
            if (attributes[key] !== undefined) {
                attribs['data-' + key] = val
            }
        })
        return attribs
    }

    Tag.prototype.render = function() {
        return React.createElement(this.getTagName(), Object.assign({
            className: tagName,
        }, this.dataAttributes()))
    }

    Tag.tagName = tagName
    Tag.postRender = postRender
    Tag.parentTag = Base.parentTag
    Tag.rawElement = Base !== Section
    Tag.endingTag = true
    Tag.selfClosingTag = true
    Tag.defaultMJMLDefinition = {
        attributes
    }

    return Tag
}

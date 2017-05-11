// Advanced Mosaico features can be used with custom post render functions

function sectionBackgroundColor({ $block, blockProps, blockVariants, modelStore }) {
    $backgroundElement = $block.find('table').first()
    if ($backgroundElement.css('background')) {
        $backgroundElement.css('-ko-background', '@backgroundColor')
        modelStore.push('backgroundColor { label: Background Color; extend: color; }')
        blockProps.push('backgroundColor')
    }
}

function sectionBorderColor({ $block, blockProps, blockVariants, modelStore }) {
    $borderElement = $block.find('td').first()
    const borderColor = /#([a-fA-F0-9]{3}){1,2}\b/.exec($borderElement.css('border'))[0]
    if (borderColor) {
        $borderElement
            .css('border-color', borderColor)
            .css('-ko-border-color', '@borderColor')
        modelStore.push('borderColor { label: Border Color; extend: color }')
        blockProps.push('borderColor')
    }
}

function buttonStyles({ $block, blockProps, modelStore }) {
    modelStore.push('customButtonColor { label: Button Style; widget: select; options:o=Orange|w=White|b=Black; }')
    blockProps.push('customButtonColor=o')

    $a  = $block.find('a[data-ko-editable]')
    $td = $a.closest('td')

    $a .css('-ko-color',            "@[customButtonColor eq 'o' ? '#FFFFFF' : (customButtonColor eq 'w' ? '#222222' : '#FFFFFF')]")
    $a .css('-ko-background',       "@[customButtonColor eq 'o' ? '#EA4A1D' : (customButtonColor eq 'w' ? '#ffffff' : '#333333')]")
    $td.css('-ko-attr-bgcolor',     "@[customButtonColor eq 'o' ? '#EA4A1D' : (customButtonColor eq 'w' ? '#ffffff' : '#333333')]")
    $td.css('-ko-border', "1px solid @[customButtonColor eq 'o' ? '#EA4A1D' : (customButtonColor eq 'w' ? '#cccccc' : '#333333')]")
}

function imageOptionBlock({ $block, blockProps, blockVariants, modelStore }) {

    // Note: src's must be absolute. Please let me know if you get relative paths working.

    const images = [
        { id: 'o1', label: 'Blue',    alt: 'One',   height: 400, src: 'https://raw.githubusercontent.com/witzig/mjml-mosaico/master/templates/demo/images/01.jpg' },
        { id: 'o2', label: 'Colored', alt: 'Two',   height: 400, src: 'https://raw.githubusercontent.com/witzig/mjml-mosaico/master/templates/demo/images/02.jpg' },
        { id: 'o3', label: 'Grey',    alt: 'Three', height: 400, src: 'https://raw.githubusercontent.com/witzig/mjml-mosaico/master/templates/demo/images/03.jpg' },
    ]

    const options = images.reduce((a, img) => {
        a.push(`${img.id}=${img.label}`)
        return a
    }, []).join('|')

    modelStore.push(
        `demoOptImgs {
            label: Envelope Image;
            widget: select;
            options: ${options};
        }`
    )

    blockProps.push(`demoOptImgs=${images[0].id}`)
    blockVariants.push('demoOptImgs')

    const exprFor = attr => {
        return images.reduce((s, img) => {
            return `(demoOptImgs eq '${img.id}' ? '${img[attr]}' : ${s})`
        }, "''")
    }

    $block.find('img')
        .css('-ko-attr-src', `@[${exprFor('src')}]`)
        .css('-ko-attr-alt', `@[${exprFor('alt')}]`)
        .css('-ko-attr-height', `@[${exprFor('height')}]`)
        .css('height', 'auto')
}

module.exports = {
    imageOptionBlock,
    buttonStyles,
    sectionBackgroundColor,
    sectionBorderColor
}

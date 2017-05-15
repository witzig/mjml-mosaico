# MJML Mosaico Components

Some basic [MJML](https://github.com/mjmlio/mjml) Components to generate [Mosaico](https://github.com/voidlabs/mosaico) Templates. Use at your own risk.

## Installation

* Clone the repo
* `npm install` inside


* Copy `templates/demo` to `templates/name`
* Edit `templates/name/index.mjml`
* `gulp build --tmpl name` to build the template


* When using [Mailtrain](https://github.com/Mailtrain-org/mailtrain), copy `templates/name` to `mailtrain/public/mosaico/templates/name` and enable the template in your `config` file.
* When using any other Mosaico build, rename `templates/name/index.html` to `templates/name/template-name.html` and copy the template folder to your Mosaico installation.


## Components

### mj-mosaico-dropzone

`mj-mosaico-dropzone` is a self closing tag and can only be used once inside  `mj-container`. This tag renders the block dropzone in Mosaico.

```html
<mj-mosaico-dropzone />
```

### mj-mosaico-block

`mj-mosaico-block-begin` and `mj-mosaico-block-end` are self closing tags and can only be used inside  `mj-container`. They can span multiple `mj-section` or `mj-wrapper`.

```html
<mj-mosaico-block-begin name="Artcile Block" postrender="myfeature" />
<mj-section>
    ...
</mj-section>
<mj-mosaico-block-end />
```

* `name` (required) - must be unique and should end with `Block`
* `postrender` (optional) - custom postrender functions, see `template/demo/postrender.js`.


### mj-mosaico-text

`mj-mosaico-text` is a self closing 'decorator' tag and has to be placed right before `mj-text`.

```html
<mj-column>
    <mj-mosaico-text name="Body Text" visible="true" />
    <mj-text>Lorem Ipsum</mj-text>
</mj-column>
```

For single-line text fields with and no WYSIWYG editor add a `<span>` tag:  

```html
<mj-column>
    <mj-mosaico-text name="Title Text" visible="true" />
    <mj-text><span>Title</span></mj-text>
</mj-column>
```

* `name` (required) - should end with `Text`
* `visible` (optional) - if present, enables a toggle switch and sets the default state. Accepts `true` or `false`.


### mj-mosaico-button

`mj-mosaico-button` is a self closing 'decorator' tag and has to be placed right before `mj-button`.

```html
<mj-column>
    <mj-mosaico-button name="Button" visible="true" />
    <mj-button href="#">Click Me</mj-button>
</mj-column>
```

* `name` (required) - should end with `Button`
* `visible` (optional) - if present, enables a toggle switch and sets the default state. Accepts `true` or `false`.

### mj-mosaico-image

`mj-mosaico-image` is a self closing 'decorator' tag and has to be placed right before `mj-image`.

```html
<mj-column>
    <mj-mosaico-image name="Image" visible="true" placeholder-height="200" show-placeholder="true"/>
    <mj-image src="images/550x200.png" />
</mj-column>
```

* `name` (required) - should end with `Image`
* `placeholder-height` (required) - placeholder height (px)
* `show-placeholder` (optional) - if `true`, Mosaico will show the `mj-image` as placeholder
* `visible` (optional) - if present, enables a toggle switch and sets the default state. Accepts `true` or `false`.


## Notes

There're some extra divs left behind when exporting HTML in Mosaico, which shouldn't cause any rendering issues. In case you're using Mosaico with Mailtrain, add [this custom script](https://cdn.rawgit.com/witzig/7fd4218033668b920427f3204586773a/raw/adb2571e312e8a4369ee97463ff65f744e64ec98/mjml-mosaico-export-postrender.js) to your Mailtrain installation: `public/mosaico/custom/mjml-mosaico-export-postrender.js`. Then adjust your Mailtrain `config`:

```
[mosaico]
customscripts=["/mosaico/custom/mjml-mosaico-export-postrender.js"]
```


## Contributing

Contributions are welcome from everyone.

## License

GPL-V3.0

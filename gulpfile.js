const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const watch = require('gulp-watch')
const exec = require('child_process').exec
const argv = require('yargs').argv

const verify = () => {
    const tmpl = argv.tmpl && argv.tmpl.toString() || ''
    if (!fs.existsSync(path.join(__dirname, 'templates', tmpl, 'index.mjml'))) {
        console.log(`templates/${tmpl}/index.mjml not found`)
        console.log('Usage: gulp watch|build --tmpl demo')
        process.exit(1)
    }
}

const compile = (cb) => {
    exec(`TMPL=${argv.tmpl} ./node_modules/.bin/mjml ./templates/${argv.tmpl}/index.mjml -o ./templates/${argv.tmpl}/index.html`, (err, stdout, stderr) => {
        console.log(stdout, stderr)
        console.log('MJML compilation finished - ' + new Date().toTimeString().split(' ')[0])
        cb && cb()
    })
}

const thumbs = (cb) => {
    console.log('Make Thumbs ...')
    exec(`./node_modules/.bin/grunt makeThumbs:main:${argv.tmpl}`, (err, stdout, stderr) => {
        console.log(stdout, stderr)
        console.log('Make Thumbs finished - ' + new Date().toTimeString().split(' ')[0])
        cb && cb()
    })
}

gulp.task('build', (cb) => {
    verify()
    compile(() => {
        thumbs(cb)
    })
})

gulp.task('watch', () => {
    verify()
    compile()
    return watch([
        'lib/**',
        'components/**.js',
        `templates/${argv.tmpl}/index.mjml`,
        `templates/${argv.tmpl}/postrender.js`,
    ], () => {
        compile()
    })
})

gulp.task('default', ['build'])

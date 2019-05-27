const args = require('yargs').argv;
const config = require('./gulp.config')();
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const glob = require('glob');
const $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('lint', () => {
    log('Running lint');
    return gulp.src(config.appjs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', [], () => {
    log('Running Tests');
    return gulp.src(config.tests, { read: false })
        .pipe($.mocha());
});

gulp.task('watch', () => {
    gulp.watch(config.appjs, ['vet']);
    gulp.watch(config.tests, ['test']);
});

gulp.task('jscs', () => {
    log('Running JSCS');
    return gulp.src(config.appjs)
        .pipe($.jscs());
});

gulp.task('vet', ['jscs', 'lint']);
/**
 * This is pretty naff would be so much nicer to use the mocha/istanbul gulp plugins
 * but they're not workin with ES6/Gulp
 *
 * This just spawns a new process and runs istanbul and mocha directly
 *
 * @type {string}
 */
gulp.task('coverage', [], (done) => {
    log('Running Tests');

    let runTests = `${config.bin}/istanbul cover ${config.istanbulArgs} \
        --dir ${config.report} ${config.bin}/_mocha test/**/*.spec.js`;

    return gulp
        .src(config.tests, { read: false })
        .pipe($.exec(runTests, (err, stdout) => {
            console.log(err, stdout);
            done();
        }));
});

/**
 * Gets all the software licenses and creates a licenses.csv file
 */
gulp.task('license', [], (done) => {
    log('Getting licenses');

    let runLicense = `${config.bin}/license-checker --csv > licenses.csv`;

    return gulp
        .src('.')
        .pipe($.exec(runLicense, (err, stdout) => {
            console.log(err, stdout);
            done();
        }));
});

/**
 * Create a visualizer report
 */
gulp.task('plato', [], (done) => {
    log('Analyzing source with Plato');
    log('Browse to /report-server/plato/index.html to see Plato results');

    startPlatoVisualizer(done);
});

/**
 * Start Plato inspector and visualizer
 */
/* eslint no-use-before-define: [1, 'nofunc'] */
function startPlatoVisualizer(done) {
    log('Running Plato');

    let files = glob.sync(config.plato.js);
    let excludeFiles = /.*\.spec\.js/;
    let plato = require('es6-plato');

    let options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    let outputDir = `${config.report}/plato`;

    plato.inspect(files, outputDir, options, platoCompleted);

    /* eslint no-use-before-define: [1, 'nofunc'] */
    function platoCompleted(report) {
        let overview = plato.getOverviewReport(report);
        if (args.verbose) {
            log(overview.summary);
        }
        if (done) {
            done();
        }
    }
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
/* eslint no-use-before-define: [1, 'nofunc'] */
function log(msg) {
    if (typeof (msg) === 'object') {
        for (let item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

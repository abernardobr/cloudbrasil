module.exports = () => {
    const alljs = [
        './**/*.js',
        '!node_modules/**',
        '!report/**',
    ];

    const appjs = [
        './**/*.js',
        '!**/*.spec.js',
        '!node_modules/**',
        '!report/**'
    ];
    const tests = './test/**/*.spec.js';
    const report = 'report';
    const bin = 'node_modules/.bin';
    const istanbulArgs = '--include-all-sources';

    const config = {
        alljs: alljs,

        appjs: appjs,

        tests: tests,

        report: report,

        plato: {
            js: './server/**/*.js'
        },

        bin: bin,

        istanbulArgs: istanbulArgs
    };

    return config;
};

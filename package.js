Package.describe({
    name: 'nov1n:reactive-bind',
    version: '0.0.2',
    summary: 'Two way data binding for input elements.',
    git: 'https://github.com/nov1n/reactive-bind',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use([
        'underscore',
        'tracker'
    ], 'client');
    api.addFiles('reactive-bind.js', 'client');
});

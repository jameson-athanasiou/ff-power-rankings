module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.js',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coverageDirectory: '<rootDir>/reports',
    setupTestFrameworkScriptFile: '<rootDir>/enzyme.config.js'
};

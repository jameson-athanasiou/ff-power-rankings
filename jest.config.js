module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.js',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coverageDirectory: '<rootDir>/reports',
    coveragePathIgnorePatterns: [
        'index.js'
    ],
    setupTestFrameworkScriptFile: '<rootDir>/enzyme.config.js'
};

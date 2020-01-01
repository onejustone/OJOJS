module.exports = {
    transform: {'^.+\\.js?$': 'js-jest'},
    testEnvironment: 'node',
    testRegex: '/lib/.*\\.(test|spec)?\\.(js)$',
    moduleFileExtensions: ['js']
};

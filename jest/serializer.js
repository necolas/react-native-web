const createSerializer = require('./createSerializer');
const { StyleSheet } = require('../dist');

const serializer = createSerializer(StyleSheet);

module.exports = serializer;

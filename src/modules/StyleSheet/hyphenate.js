export default (string) => (string.replace(/([A-Z])/g, '-$1').toLowerCase()).replace(/^ms-/, '-ms-')

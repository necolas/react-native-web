module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['./scripts/babel/preset']
  };
};

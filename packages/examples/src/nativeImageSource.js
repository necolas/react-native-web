const nativeImageSource = (obj) => {
  const uri = obj.android || obj.ios;
  obj.uri = `./${uri}.png`;
  return obj;
}

module.exports = nativeImageSource;

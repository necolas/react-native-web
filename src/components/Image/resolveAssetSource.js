function resolveAssetSource(source) {
  return ((typeof source === 'object') ? source.uri : source) || null
}

export default resolveAssetSource

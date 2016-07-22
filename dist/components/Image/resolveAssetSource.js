function resolveAssetSource(source){
return(typeof source==='object'?source.uri:source)||null;}


module.exports=resolveAssetSource;
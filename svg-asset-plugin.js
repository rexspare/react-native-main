const plugin = require('react-native-svg-asset-plugin');

async function svgAssetPlugin(assetData) {
  if (assetData.type === 'svgpng') {
    const converted = await plugin({
      ...assetData,
      type: 'svg',
    });
    if (converted && converted.type === 'png') {
      return converted;
    }
  }
  return assetData;
}

module.exports = svgAssetPlugin;

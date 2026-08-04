// terrain.js

/**
 * Extract elevation and slope for a FeatureCollection.
 */

exports.extractTerrain = function(points, scale) {

  scale = scale || 30;

  var dem = ee.Image("USGS/SRTMGL1_003");
  var slope = ee.Terrain.slope(dem);

  var terrain = dem
      .select("elevation")
      .addBands(slope.select("slope"));

  return terrain.reduceRegions({
    collection: points,
    reducer: ee.Reducer.first(),
    scale: scale
  });

};

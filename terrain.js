function extractTerrain(points, ee, scale = 30) {

    const dem = ee.Image("USGS/SRTMGL1_003");
    const slope = ee.Terrain.slope(dem);

    const terrain = dem
        .select("elevation")
        .addBands(slope.select("slope"));

    return terrain.reduceRegions({
        collection: points,
        reducer: ee.Reducer.first(),
        scale: scale
    });
}

module.exports = {
    extractTerrain
};

// map

var format = function(d) {
    //.0f returns a digiti with zero digits at the end.
    return d3.format('.0f')(d) + ' visits';
};

var map = d3.geomap.choropleth()
    .geofile('/charts/topojson/world/countries.json')
    .colors(colorbrewer.YlGnBu[9])
    .column('Visits')
    .format(format)
    .legend(true)
    .unitId('Country Code');

d3.csv('/charts/chart-data/map.csv', function(error, data) {
    d3.select('#map')
        .datum(data)
        .call(map.draw, map);
});
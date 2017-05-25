var header = ['site', 'NDVI', 'solar', 'thermal', 'ticks'];
var ref = {'NDVI': {'color': "green", 'coef': 150, 'offset': -25, 'unit': "(N/A)"}, 'solar': {'color': "yellow", 'coef': 10, 'offset': 60, 'unit': "(Watt/sqrm)"}, 'thermal': {'color': "red", 'coef': 10, 'offset': 10, 'unit': "(Celsius)"}};
var svg_width = 240;
var svg_height = 220;
var step = 20;

$(document).ready(function(){
    
    $.ajax({
        async:false, dataType:"json",
        url:"/static/js/data.json",
        success: function(data){
            cr_table(data);
            stats(data);
        }
    });
});

// Stats Plot
function stats(data) {
    // Initiate svg
    var svg = d3.select("#container")
                .append("svg")
                .attr("width", svg_width)
                .attr("height", svg_height);
    
    // Plot x,y axises
    var x_axis = svg.append("line")
                    .attr("x1", 5)
                    .attr("y1", svg_height - 5)
                    .attr("x2", svg_width - 5)
                    .attr("y2", svg_height - 5)
                    .attr("stroke", "black");
    var y_axis = svg.append("line")
                    .attr("x1", 10)
                    .attr("y1", 5)
                    .attr("x2", 10)
                    .attr("y2", svg_height - 5)
                    .attr("stroke", "black");
    var x_label = svg.append("text")
                        .attr("x", 5)
                        .attr("y", svg_height)
                        .attr("font-size", "6")
                        .attr("font-family", "Arial")
                        .text("site");
    // Plot legend
    var r_distance = 20;
    var p_shift = 80;
    $.each(ref, function(v, o){
        var points = svg.append("circle")
                            .attr("cx", r_distance)
                            .attr("cy", 10)
                            .attr("r", 3)
                            .style("fill", function(){
                                return o['color']
                            });
        var x_label = svg.append("text")
                        .attr("x", r_distance)
                        .attr("y", 5)
                        .attr("font-size", "6")
                        .attr("font-family", "Arial")
                        .text(function(){
                            return v + o['unit']
                        });
        r_distance += p_shift;
    });
    
    // Plot variables
    $.each(data, function(key, value){
        var x_axis = 20 + key * 20;
        // Plot x ticks
        var x_tick = svg.append("line")
                    .attr("x1", x_axis)
                    .attr("y1", svg_height - 4)
                    .attr("x2", x_axis)
                    .attr("y2", svg_height - 6)
                    .attr("stroke", "black");
        // Append x labels
        var x_label = svg.append("text")
                        .attr("x", x_axis)
                        .attr("y", svg_height)
                        .attr("font-size", "6")
                        .attr("font-family", "Arial")
                        .attr("class", function(){
                            return String(key)
                        })
                        .text(function(){
                            return key
                        });
        // Plot tick numbers
        var ticks = svg.append("text")
                        .attr("x", x_axis - 2)
                        .attr("y", 30)
                        .attr("font-size", "6")
                        .attr("font-family", "Arial")
                        .attr("class", function(){
                            return String(key)
                        })
                        .attr("class", function(){
                            return "graph_" + key
                        })
                        .attr("class", "tick_number")
                        .text(function(){
                            return value.ticks
                        });
        // Plot grids
        var grid = svg.append("line")
                    .attr("x1", x_axis)
                    .attr("y1", svg_height - 5)
                    .attr("x2", x_axis)
                    .attr("y2", 32)
                    .attr("stroke", "lightgrey")
                    .attr("class", "grid")
                    .attr("class", function(){
                        return String(key)
                    })
                    .attr("class", function(){
                        return "graph_" + key
                    });
        // Plot points & Annotations
        $.each(ref, function(k, obj){
            var points = svg.append("circle")
                            .attr("cx", x_axis)
                            .attr("cy", function(){
                                return svg_height - obj['coef'] * value[k] - obj['offset']
                            })
                            .attr("r", 3)
                            .style("fill", function(){
                                return obj['color']
                            })
                            .attr("class", function(){
                                return k + " graph_" + key
                            })
                            .on("mouseover", function(){
                                var gp = $(this).attr("class").split(" ")[0];
                                d3.selectAll('.' + gp).classed('thermal', false).classed('solar', false).classed('NDVI', false)
                            })
                            .on("mouseout", function(){
                                var gp = $(this).attr("class").split(" ")[0];
                                d3.selectAll('.' + gp).classed('thermal', true).classed('solar', true).classed('NDVI', true)
                            });
            var annotations = svg.append("text")
                                .attr("x", x_axis - 8)
                                .attr("y", function(){
                                    return svg_height - obj['coef'] * value[k] - obj['offset'] - 4
                                })
                                .attr("font-size", "6")
                                .attr("font-family", "Arial")
                                .attr("class", function(){
                                    return k
                                })
                                .text(function(){
                                    return value[k]
                                });
        });
    });
};

// Insert Sampling Data to "#data" table
function cr_table(data) {
    var tr = "<table id='data' class='data'><tr class='header'>";
        // append header
        $.each(header, function(i, d){
            tr += "<td><p class='" + d + "'>" + d + "</p></td>"
        });
        tr += "</tr>"
        // append data
        $.each(data, function(key, value){
            tr += "<tr class='" + key + "'><td><p class='site'>" + key + "</p></td>";
            $.each(value, function(key2, value2){
                tr += "<td><p class='" + key2 + "'>" + value2 + "</p></td>";
            });
            tr += "</tr>";
        });
        tr += "</table>";
        $("#dt").append(tr)
};


function initMap() {
    
    var map;
    
    var center_lat = 40.926074;
    var center_lng = -73.466271;
    var lat_offset = 0.1;
    var lng_offset = 0.1;
    
    var ndvi_overlay;
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: center_lat, lng: center_lng},
        zoom: 14
    });
    
    /*var imageBounds = {
    north: center_lat + lat_offset,
    south: center_lat - lat_offset,
    east: center_lng + lng_offset,
    west: center_lng - lng_offset
  };
    
    ndvi_overlay = new google.maps.GroundOverlay('/static/js/Caumsett_solar.tif', imageBounds);
    ndvi_overlay.setMap(map);
    console.log(ndvi_overlay)*/
        
    map.data.loadGeoJson('/static/js/solar.geojson')
    
    map.data.setStyle(function(feature) {
    var ix = feature.getProperty('SR_index');
    var color = ix >= 6 ? 'red' : (ix >= 4) ? 'yellow' : (ix >= 2) ? 'green' : 'blue';
    return {
        fillColor: color,
        strokeWeight: 1,
        };
    });
    
    map.data.addListener('mouseover', function(event) {
        document.getElementById('info-box').textContent = "Solar Radiation Index: " + event.feature.getProperty('SR_index');
        
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {strokeWeight: 3});
    });
    
    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });
};

/*function addOverlay() {
    ndvi_overlay.setMap(map);
};

function removeOverlay() {
    ndvi_overlay.setMap(null);
}*/

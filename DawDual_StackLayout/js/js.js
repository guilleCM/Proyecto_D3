var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y0 = d3.scale.linear().range([height, 0]),
    y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y0).ticks(6).orient("left");
// create right yAxis
var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

var svg = d3.select("#elementoSVG").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.curso; }));
  y0.domain([0, d3.max(data, function(d) { return d.alumnosEmpiezan; })]);
  y1.domain([0, d3.max(data, function(d) { return d.alumnosEmpiezan; })]);
 
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
    .attr("class", "y axis axisLeft")
    .attr("transform", "translate(0,0)")
    .call(yAxisLeft)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .style("text-anchor", "end")
    .style("text-anchor", "end")
    .text("Empiezan");
  
  svg.append("g")
    .attr("class", "y axis axisRight")
    .attr("transform", "translate(" + (width) + ",0)")
    .call(yAxisRight)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .attr("dx", "2em")
    .style("text-anchor", "end")
    .text("Promocionan");

  bars = svg.selectAll(".bar").data(data).enter();

  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.curso); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.alumnosEmpiezan); })
    .attr("height", function(d,i,j) { return height - y0(d.alumnosEmpiezan); })
      .on("mouseover", function(d) {
        //mostrar tooltip  
        d3.select("#tooltip").classed("hidden", false)
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 25) + "px")
        d3.select("#value")
          .text(Math.round((d.alumnosPromocionan*100)/d.alumnosEmpiezan))
          .style("color", "green")
        })
      .on("mouseout", function(d) {
        d3.select(this)
          .transition()
          .duration(1500)
        d3.select("#tooltip").classed("hidden", true)
    })

  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.curso) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.alumnosPromocionan); })
    .attr("height", function(d,i,j) { return height - y1(d.alumnosPromocionan); })
      .on("mouseover", function(d) {
    //mostrar tooltip  
        d3.select("#tooltip").classed("hidden", false)
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 25) + "px")
        d3.select("#value")
          .text(Math.round((d.alumnosPromocionan*100)/d.alumnosEmpiezan))
          .style("color", "green")
    })
      .on("mouseout", function(d) {
        d3.select(this)
          .transition()
          .duration(1500)
        d3.select("#tooltip").classed("hidden", true)
    })

  text = svg.selectAll(".graph").data(data).enter();
  text.append("text")
      .attr("class", "textBar1")
      .text(function(d) { return d.alumnosEmpiezan; })
      .attr("x", function(d) { return x(d.curso) + (x.rangeBand()/5);})
      .attr("y", function(d) { return y0(d.alumnosEmpiezan-1.5); } )

  text.append("text")
      .attr("class", "textBar2")
      .text(function(d) { return d.alumnosPromocionan; })
      .attr("x", function(d) { return x(d.curso) + (x.rangeBand()/1.5) ;})
      .attr("y", function(d) { return y0(d.alumnosPromocionan-1.5); } )

});

function type(d) {
  d.alumnosEmpiezan = +d.alumnosEmpiezan;
  return d;
}

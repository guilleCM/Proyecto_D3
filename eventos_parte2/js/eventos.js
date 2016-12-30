

var puntos = [  { key: 0, value: 15 },
                { key: 1, value: 25 },
                { key: 2, value: 36 },
                { key: 3, value: 10 },
                { key: 4, value: 69 },
                { key: 5, value: 70 },
                { key: 6, value: 38 },
                { key: 7, value: 48 },
                { key: 8, value: 32 },
                { key: 9, value: 56 },
                { key: 10, value: 29 },
                { key: 11, value: 62 },
                { key: 12, value: 51 },
                { key: 13, value: 31 },
                { key: 14, value: 64 },
                { key: 15, value: 40 },
                { key: 16, value: 10 },
                { key: 17, value: 20 } ];
/*en fase de pruebas
var arr = Object.keys( puntos ).map(function ( key ) { return puntos[key]; });
var min = Math.min.apply( null, arr );
var max = Math.max.apply( null, arr );
*/


// El objetivo es hacer un data join: unir cada dato a su objeto en el DOM
// De este modo, eliminar el primer elemento del array elimina su correspondiente objeto en el DOM
// we define a key function, to be used whenever we bind data to elements
// this function specifies to take the key value of whatever d object is passed into it.
var key = function(d) {
              return d.key; }
  
// Objeto donde situaremos el elemento SVG: VIS
// Parametos de configuración de la visualización de la grafica

var vis = {
    height: 300,
    width : 700,
    maximo: 80,
    rectangulos: "null"
}

var svg = d3.select("body").append("svg")
            .attr("height", vis.height)
            .attr("width", vis.width);

var xScale = d3.scale.ordinal()
               .domain(d3.range(puntos.length))
               .rangeRoundBands([0, vis.width], 0.05);

var yScale = d3.scale.linear()
               .domain([0, vis.maximo]) //d3.max(puntos)]) 
               // reescalamos el dominio de valores: el rango se mantiene = area del elemento SVG
               .range([0, vis.height]);

svg.selectAll("rect")
   .data(puntos, key)   // key() recoge cada dato y extrae su clave
   .enter()
   .append("rect")
   .attr("x", function(dato, i) {
                                  return xScale(i); })
   .attr("y", function(dato) {
                                  return vis.height - yScale(dato.value);})  
                                  // dato ahora es una referencia al objeto {key, value}
                                  // para acceder al valor del dato dato.value
   .attr("height", function(dato) {
                                  return yScale(dato.value);})
   .attr("width", xScale.rangeBand())
   .attr("fill", function(dato) {
          return "orange";
      })
   //Añade una etiqueta cuando el puntero permanece en una barra durante unos segundos.
   /*
   .append("title")
   .text(function(d) {
         return "El valor es " + d.value;
   });
   */

   .on("mouseover", function(d) {
    d3.select(this)
      .attr("fill", "#FF4500")
    //Get this bar's x/y values, then augment for the tooltip
    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + vis.height / 2;
    //Update the tooltip position and value
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#value")
      .text(d.value);

    //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);

    })

    //Hide the tooltip
    .on("mouseout", function() {
    d3.select(this)
    .transition()
    .duration(250)
    .attr("fill", "orange")
    d3.select("#tooltip").classed("hidden", true);
    })

d3.select("p")      
    .on("click", function() {
        sortBars();
});

var sortBars = function() {

        svg.selectAll("rect")
           .sort(function(a, b) {
                 return d3.ascending(a.value, b.value);
           })
           .transition()
           .duration(1000)
           .attr("x", function(d, i) {
                 return xScale(i);
           });

};
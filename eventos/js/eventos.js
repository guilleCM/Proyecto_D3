

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
   .on("mouseover", function(d) {
        d3.select(this)
        .attr("fill", "#FF4500")
      })
   .on("mouseout", function(d) {
        d3.select(this)
        .transition()
   .duration(250)
   .attr("fill", "orange")
      });

svg.selectAll("text")
               .data(puntos, key)
               .enter()
               .append("text")
               .text(function(dato) {
                            return dato.value; })
               .attr("x", function(dato, i) {
                            return xScale(i) + xScale.rangeBand() / 2;
               })
               .attr("y", function(dato) {
                            return vis.height - yScale(dato.value) + 15;
               })
               .attr("class", "etiquetas")
               .attr("text-anchor", "middle");



//On click, actualizar todos los datos

d3.selectAll("p")
        .on("click", function() {

          // averiguar sobre qué párrafo se ha hecho clic: pendiente averiguar atributo que devuelve la pseudoclase del elemento para evitar usar id
          var paragraphID = d3.select(this).attr("id");

          if (paragraphID == "añadirValor") {
              // Añadiendo muestras al conjunto de datos                                         
              var nuevaMuestra = Math.floor(Math.random() * vis.maximo);  //New random integer (0-99)
              // averiguamos cuál es la clave del último elemento del array
              var lastKeyValue = puntos[puntos.length - 1].key;
              // introducimos el nuevo objeto (key,value) en al array: aumentar clave + 1 e introducir el valor
              puntos.push({
                  key: lastKeyValue + 1,
                  value: nuevaMuestra
              });
          } else {
              // Eliminar el primer valor del array puntos
              puntos.shift();
          }



          // recalibrar escalas
          xScale.domain(d3.range(puntos.length));  

          // en este caso no procede reescalar la escala y porque el máximo del conjunto de datos no varía
          // yScale.domain([0, d3.max(dataset)]);

          var bars = svg.selectAll("rect")     //Select all bars
                        .data(puntos, key);       //Re-bind data to existing bars, return the 'update' selection
                                               //'bars' is now the update selection

          
          // actualizar los rectángulos = volver a dibujarlos

          bars.enter()  // enter() referencia sólo a las nuevas muestras a dibujar
               // creamos nuevos rectángulos
              .append("rect")
               // ¿dónde ponemos el nuevo rectangulo? a la derecha del último, límite del SVG
              .attr("x", vis.width)
              .attr("y", function(dato) {
                              return vis.height - yScale(dato.value);
              })
              .attr("height", function(dato) {
                              return yScale(dato.value);
              })
              // calcular el ancho del rectángulo en función del ancho de la escala
              .attr("width", xScale.rangeBand())
              .attr("fill", function(dato) {
                                        return "orange";
              })
             .on("mouseover", function(d) {
                  d3.select(this)
                  .attr("fill", "#FF4500")
                })
             .on("mouseout", function(d) {
                  d3.select(this)
                  .transition()
             .duration(250)
             .attr("fill", "orange")
              });
          // movemos los rectángulos desde la derecha a su nueva posición más a la izquierda
          bars.transition()
              .ease("linear")
              .duration(500)
              .attr("x", function(d, i) {       //Set new x position, based on the updated xScale
                                    return xScale(i);
              })
              .attr("width", xScale.rangeBand());    //Set new width value, based on the updated xScale
             
          // Transición para eliminar el primer elemento del array puntos                  
          bars.exit()        // exit() referencia a los elementos que hemos eliminado
              .transition()   // Initiates a transition on the one element we're deleting
              .duration(500)
              .ease("linear")
              .attr("x", -xScale.rangeBand())   // hacemos que la barra salga de la gráfica por la derecha
              .remove();      // Deletes this element from the DOM once transition is complete



          // actualizar las etiquetas = volver a dibujarlas
          var labels = svg.selectAll("text")
                          .data(puntos, key)

          // dibujar las etiquetas
          labels.enter()  // referencia a las que "entran" de nuevo en el svg
                .append("text")
                .text(function(dato) {
                                return dato.value; })
                .attr("x", function(dato, i) {
                              return vis.width + xScale.rangeBand() / 2;
                })
                .attr("y", function(dato) {
                   return vis.height - yScale(dato.value)+15;
                })
                .attr("class", "etiquetas")
                .attr("text-anchor", "middle");

          // recolocar todas las etiquetas
          labels.transition()
                .duration(500)
                .ease("linear")
                .attr("x", function(dato, i) {
                              return xScale(i) + xScale.rangeBand() / 2;
                });

          // eliminar las etiquetas
          labels.exit()
                .transition()
                .duration(500)
                .ease("linear")
                .attr("x", -xScale.rangeBand())  // hacemos que la etiqueta salga de la gráfica por la derecha
                .remove()                   
        
        });
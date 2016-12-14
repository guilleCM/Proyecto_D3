var puntosJornada = [];
for (var i=0, equiposTotales=20; i<equiposTotales; i++) {
    puntosJornada.push(Math.round(Math.random()*80))
};
            
            // Objeto donde situaremos el elemento SVG: VIS

            var vis = {
                height: 400,
                width : 800,
                // widhtBarra : 40,     deprecated. Ahora es xScale.rangeBand()
                // posicionXbarra : 50, deprecated. Ahora es xScale()
                // posicionYbarra : 4,  deprecated. Ahora es yScale()
                suspenso : 40,
                aprobado : 50,
                maximo: 100,
                rectangulos: "null"
            }

            var svg = d3.select("body").append("svg")
                        .attr("height", vis.height)
                        .attr("width", vis.width);

            var xScale = d3.scale.ordinal()
                           .domain(d3.range(puntosJornada.length))
                           .rangeRoundBands([0, vis.width], 0.05);

            var yScale = d3.scale.linear()
                           .domain([0, vis.maximo]) //d3.max(puntosJornada)]) 
                           // reescalamos el dominio de valores: el rango se mantiene = area del elemento SVG
                           .range([0, vis.height]);

            // barras = rectángulos

            svg.selectAll("rect")
               .data(puntosJornada)
               .enter()
               .append("rect")
               .attr("x", function(dato, i) {
                                              return xScale(i); })
               .attr("y", function(dato) {
                                              return vis.height - yScale(dato);})
               .attr("height", function(dato) {
                                              return yScale(dato);})
               .attr("width", xScale.rangeBand())
               .attr("fill", function(dato) {
                                                if (dato < vis.suspenso) {
                                                  return "red";
                                                } else if (dato < vis.aprobado) {
                                                  return "orange";
                                                } else {
                                                  return "green";
                                                } 
                  });

            svg.selectAll("text")
                           .data(puntosJornada)
                           .enter()
                           .append("text").
                           text(function(dato) {
                           return dato; })
                           .attr("x", function(dato, i) {
                                        return xScale(i) + xScale.rangeBand() / 2;
                           })
                           .attr("y", function(dato) {
                              return vis.height - yScale(dato);
                           })
                           .attr("class", "etiquetas")
                           .attr("text-anchor", "middle");
 
            //On click, actualizar todos los datos
            d3.select("p")
                    .on("click", function() {

                      //New values for dataset
                      var numeroMuestras = puntosJornada.length;           
                      puntosJornada = [];                                       
                      for (var i = 0; i < numeroMuestras; i++) {          
                          var muestra = Math.floor(Math.random() * vis.maximo);  //New random integer (0-99)
                          puntosJornada.push(muestra);                        
                      }


                      //Update all rects
                      svg.selectAll("rect")
                         .data(puntosJornada)
                         .transition()
                         .delay( function(dato, i){
                                        return i /puntosJornada.length * 150;
                         })
                         .duration(3500)
                         .attr("y", function(dato) {
                            return vis.height - yScale(dato);
                         })
                         .attr("height", function(dato) {
                            return yScale(dato);
                         })
                         .attr("fill", function(dato) {
                                                if (dato < vis.suspenso) {
                                                  return "red";
                                                } else if (dato < vis.aprobado) {
                                                  return "orange";
                                                } else {
                                                  return "green";
                                                } 
                         });

                      svg.selectAll("text")
                           .data(puntosJornada)
                           .transition()
                           .duration(1000)
                           .ease("linear")
                           .text(function(dato) {
                                          return dato; })
                           .attr("x", function(dato, i) {
                                        return xScale(i) + xScale.rangeBand() / 2;
                           })
                           .attr("y", function(dato) {
                              return vis.height - yScale(dato);
                           })
                           .attr("class", "etiquetas")
                           .attr("text-anchor", "middle");
                    
                    });

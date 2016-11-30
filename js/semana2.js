var aciertos = [20.25, 65, 36.15, 54.87, 69.75, 34.10,
                38.21, 48.75, 32.25, 56.15, 29.75, 44.62,
                58.21, 34.10, 36.41, 45.50, 50];

// Objeto donde situaremos el elemento SVG: VIS

var vis = {
  height: 400,
  width: 900,
  widhtBarra: 40,
  posicionXbarra: 50,
  posicionYbarra: 4,
  suspenso: 40,
  aprobado: 50,
  rectangulos: "null",

}

var svg = d3.select("body").append("svg")
  .attr("height", vis.height)
  .attr("width", vis.width);

vis.rectangulos = svg.selectAll("rect")
  .data(aciertos)
  .enter()
  .append("rect");

vis.rectangulos.attr("x",
    function(dato, i) {
      return i * vis.posicionXbarra;
    })
  .attr("y",
    function(dato) {
      return vis.height - dato * vis.posicionYbarra;
    })
  .attr("height", function(dato) {
    return dato * vis.posicionYbarra + "px";
  })
  .attr("width", vis.widhtBarra)
  .attr("fill", "hotpink");
// <rect x="0" y="0" width="30" height="30" fill="purple"/>

var texto = svg.selectAll("text")
  .data(aciertos)
  .enter()
  .append("text");

texto.text(function(dato) {
    return dato;
  })
  .attr("x", function(dato, i) {
    return i * vis.posicionXbarra + vis.widhtBarra / 2;
  })
  .attr("y", function(dato) {
    return vis.height - dato * vis.posicionYbarra + 20;
  })
  .attr("class", "etiquetas")
  .attr("text-anchor", "middle")
  .attr("fill", function(dato) {
    if (dato < vis.suspenso) {
      return "red";
    } else if (dato < vis.aprobado) {
      return "orange";
    } else {
      return "black";
    }
  });
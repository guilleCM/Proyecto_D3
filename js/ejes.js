//apunto al CSS que me interesa para este ejercicio
//sin tener que cambiarlo cada vez en el index.html
document.getElementById('hojaCSS').href='css/test.css';

//variable que contiene los elementos visuales
var vis = {
    svgHeight: 500,
    svgWidth: 600,
    circlePadding: 30,
    circulos: "null",
};

//los datos que nos interesa representar
var dataset = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ],
                  [ 600,   150]
              ];

//ESCALAS
d3.max(dataset, function(d) {    //Devuelve 480
    return d[0];  //Referencia el primer valor del sub-arreglo
});
var xScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                     .range([vis.circlePadding, vis.svgWidth - vis.circlePadding * 2]);

var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([vis.svgHeight - vis.circlePadding, vis.circlePadding]);
var rScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([2, 5]);

//EJES
var xAxis = d3.svg.axis(); //creando un eje generico
xAxis.scale(xScale); //le decimos en que escala va a operar el eje
xAxis.ticks(5);  //establece el numero de cortes del eje
xAxis.orient("bottom"); //le decimos donde se situaran
//etiquetas del eje (arriba o abajo en el eje x, y izquierda
//o derecha para el eje y)
/*version resumida: var xAxis = d3.svg.axis()
                                      .scale(xScale)
                                      .orient("bottom");*/ 
//eje y
var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);


//Creando el SVG y proporcionandole un tamaño de ancho y de alto
var svg = d3.select("body")
            .append("svg")
            .attr("width", vis.svgWidth)
            .attr("height", vis.svgHeight);


//Creando circulos
vis.circulos = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
//modificando los atributos de cada circulo que va a ser creado
    .attr("cx", function(d) {
        return xScale(d[0]); //llama a la funcion escala de x
    })
    .attr("cy", function(d) {
        return yScale(d[1]); //llama a la funcion escala de y
    })
    .attr("r", function(d) {
        return rScale(d[1]);
    }) /*Esta funcion determina el area del circulo
    haciendo más grandes los que estan más altos posicionados
    segun su Height(altura) */

    .attr("fill", function(d) {
        if (d[1]>50) {
            return "green";
        } else {
            return "red";
        }
    }); /*testeando el color de los circulos en funcion de 
    su height*/

//Ahora creamos el texto
var texto = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text");
//modificamos los atributos del texto q se va a crear
texto.text(function(d) {
    return d[0] + "," + d[1];
}) /*El texto representara el valor 0 y el valor 1 
dentro de la lista separado por una coma >>> 5,20 */
    .attr("x", function(d) {
        return xScale(d[0]);
    })/*Modifica la posicion x del texto en funcion del
    primer valor de la lista del dato */
    .attr("y", function(d) {
        return yScale(d[1]);
    })/*Modifica la posicion y del texto en funcion del
    segundo valor de la lista del dato */

//asignamos una clase al texto para poder editar esta clase en el css
    .attr("class", "textoCirculos");

//llamando a los EJES
svg.append("g")
    .attr("class", "axis") //asigna una clase al eje
    .attr("transform", "translate(0," + (vis.svgHeight - vis.circlePadding) + ")")
    //transforma el eje x para moverlo abajo del svg, es decir a la base del elemento SVG
    .call(xAxis);
//o directamente juntandolo con el codigo de arriba seria:
/*svg.append("g")
     .call(d3.svg.axis()
     .scale(xScale)
     .orient("bottom"));*/
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + vis.circlePadding + ",0)")
    .call(yAxis);
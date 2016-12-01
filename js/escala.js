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
                  [ 220,   88 ]
              ];
//Esta lista con numeros decimales no funciona
//con numeros mayores de 25 tampoco va bien
//con numeros negativos tampoco


//variable que contiene los elementos visuales
var vis = {
    svgHeight: 100,
    svgWidth: 500,
    barPadding: 1,
    circulos: "null",
}

//Creando el SVG y proporcionandole un tamaño de ancho y de alto
var svg = d3.select("body")
            .append("svg")
            .attr("width", vis.svgWidth)
            .attr("height", vis.svgHeight);

//Creando funciones para la Escala



//Creando circulos
vis.circulos = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
//modificando los atributos de cada circulo que va a ser creado
    .attr("cx", function(d) {
        return d[0];
    })
    .attr("cy", function(d) {
        return d[1];
    })
    .attr("r", function(d) {
        return Math.sqrt (vis.svgHeight - d[1]);
    }) /*Esta funcion determina el area del circulo
    haciendo más grandes los que estan más altos posicionados
    segun su Height(altura) */

    .attr("fill", function(d) {
        if (d[1]>50) {
            return "red";
        } else {
            return "green";
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
        return d[0];
    })/*Modifica la posicion x del texto en funcion del
    primer valor de la lista del dato */
    .attr("y", function(d) {
        return d[1];
    })/*Modifica la posicion y del texto en funcion del
    segundo valor de la lista del dato */

//asignamos una clase al texto para poder editar esta clase en el css
    .attr("class", "textoCirculos")
    
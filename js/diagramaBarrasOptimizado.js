//los datos que nos interesa representar
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 
                11, 12, 15, 20, 18, 17, 16, 18, 23];
//Esta lista con numeros decimales no funciona
//con numeros mayores de 25 tampoco va bien
//con numeros negativos tampoco


//variable que contiene los elementos visuales
var vis = {
    svgHeight: 100,
    svgWidth: 500,
    barPadding: 1,
    numeroElementosDataset: dataset.length,
    rectangulos: "null",
}

//Creando el SVG y proporcionandole un tamaño de ancho y de alto
var svg = d3.select("body")
            .append("svg")
            .attr("width", vis.svgWidth)
            .attr("height", vis.svgHeight);


//Creando los rectangulos
vis.rectangulos = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
//modificando los atributos de cada rectangulo q se va a crear
vis.rectangulos.attr("x", function(d, i) {
        return i * (vis.svgWidth / vis.numeroElementosDataset);
    })
    .attr("y", function(d) {
        return vis.svgHeight - (d * 4);
    })
    .attr("width", vis.svgWidth / vis.numeroElementosDataset - vis.barPadding)
    .attr("height", function(d) {
        return d * 4;
    })
    .attr("fill", function(d) {
        return "rgb(0, " + (d*10) + ", 0)";
    })


//Ahora creamos el texto
var texto = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text");
//modificamos los atributos del texto q se va a crear
texto.text(function(d) {
        return d;
    })
    .attr("x", function(d, i) {
        return i * (vis.svgWidth / vis.numeroElementosDataset) + (vis.svgWidth / vis.numeroElementosDataset - vis.barPadding) / 2;
    })
    .attr("y", function(d) {
        return vis.svgHeight - (d * 4) + 15;
    })
//asignamos una clase al texto para poder editar esta clase en el css
    .attr("class", "textoBarras")
    
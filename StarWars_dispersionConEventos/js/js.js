var dataset=[
  { "titulo":"Episodio I: La amenaza fantasma",
    "cronologia": 1,
    "presupuesto":115,
    "recaudado":1030,
    "nota":6.2,
    "lanzamiento":1999,
    "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/1.jpg"
  },

  {"titulo":"Episodio II: El ataque de los clones",
   "cronologia": 2,
   "presupuesto":115,
   "recaudado":649,
   "nota":6.3,
   "lanzamiento":2002,
   "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/2.jpg"
 },

  {"titulo":"Episodio III: La venganza de los Sith",
   "cronologia": 3,
   "presupuesto":113,
   "recaudado":848,
   "nota":7.1,
   "lanzamiento":2005,
   "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/3.jpg"
 },

  {"titulo":"Rogue One: Una historia de Star Wars",
   "cronologia": 4,
   "presupuesto":200,
   "recaudado":600,
   "nota":7.1,
   "lanzamiento":2016,
   "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/4.jpg"
 },

  {"titulo":"Episodio IV: Una nueva esperanza",
   "cronologia": 5,
   "presupuesto":11,
   "recaudado":775.4,
   "nota":7.9,
   "lanzamiento":1977,
   "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/5.jpg"
 },

  {"titulo":"Episodio V: El imperio contraataca",
   "cronologia": 6,
   "presupuesto":18,
   "recaudado":538.4,
   "nota":8.1,
   "lanzamiento":1980,
   "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/6.jpg"
 },

  {"titulo":"Episodio VI: El retorno del Jedi",
   "cronologia": 7,
   "presupuesto":32.5,
   "recaudado":475.1,
   "nota":7.9,
   "lanzamiento":1983,
   "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/7.jpg"
 },

  {"titulo":"Episodio VII: El despertar de la fuerza",
   "cronologia": 8,
   "presupuesto":200,
   "recaudado":2200,
   "nota":7,
   "lanzamiento":2015,
   "poster": "https://raw.githubusercontent.com/guilleCM/Proyecto_D3/master/StarWars_dispersionConEventos/img/8.jpg"
 },
];

//funciones
var minimoPresupuesto = d3.min(dataset, function(d) {return d.presupuesto });
var maximoPresupuesto = d3.max(dataset, function(d) {return d.presupuesto });

var añoMaximo = d3.max(dataset, function (d) {return d.lanzamiento});

var maximoRecaudado = d3.max(dataset, function(d) {return d.recaudado; });
var minimoRecaudado = d3.min(dataset, function(d) {return d.recaudado; });

var dineroTotal=maximoPresupuesto+maximoRecaudado;

var totalPeliculas = dataset.length;

var posicionTooltip= "d.cronologia" ;

//variable que contiene los elementos visuales
var vis = {
    svgHeight: 400,
    svgWidth: 800,
    circlePadding: 30,
};

//ESCALAS
var xScale = d3.scale.linear()
                     .domain([0, totalPeliculas])
                     .range([vis.circlePadding, vis.svgWidth - vis.circlePadding * 2]);

var yScale = d3.scale.linear()
                     .domain([0, 10])
                     .range([vis.svgHeight - vis.circlePadding, vis.circlePadding]);

var rScale = d3.scale.linear()
                     .domain([minimoRecaudado, maximoRecaudado])
                     .range([10, 20]);

//eje x
var xAxis = d3.svg.axis() //creando un eje generico
                  .scale(xScale) //le decimos en que escala va a operar el eje
                  .ticks(dataset.length) //establece el numero de cortes del eje
                  .orient("bottom"); 

//eje y
var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(10);



//Creando el SVG y proporcionandole un tamaño de ancho y de alto
var svg = d3.select("body")
            .append("svg")
            .attr("width", vis.svgWidth)
            .attr("height", vis.svgHeight); 

//llamando a los EJES
svg.append("g")
    .attr("class", "axis") //asigna una clase al eje
    .attr("transform", "translate(0," + (vis.svgHeight - vis.circlePadding) + ")")
    //transforma el eje x para moverlo abajo del svg, es decir a la base del elemento SVG
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + vis.circlePadding + ",0)")
    .call(yAxis);


//Creando circulos
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
//modificando los atributos de cada circulo que va a ser creado
    .attr("cx", function(d) {
        return xScale(d.cronologia); //llama a la funcion escala de x
    })
    .attr("cy", function(d) {
        return yScale(d.nota); //llama a la funcion escala de y
    })
    .attr("r", function(d) {
        return d.recaudado/dineroTotal*40;
    }) 

    .attr("fill", "#283593")
    .attr("stroke", "#009688")
    .attr("stroke-width", function(d) {
        return d.presupuesto/dineroTotal*40;
    })
    .on("mouseover", function(d) {

      d3.select(this)
        .attr("opacity", 0.8)
        .transition()
        .duration(1000)
        .ease("elastic")
        .attr("r", function(d) {return d.recaudado/dineroTotal*80;})
        .attr("stroke-width", function(d) {
        return d.presupuesto/dineroTotal*80;
           })
      //mostrar el div poster
      d3.select("#poster")
        .style("background-image", "url("+d.poster+")")
        .style("display", "inline-block")

      //mostrar tooltip  
      d3.select("#tooltip").classed("hidden", false)

      //Colocar posicion del tooltip
      d3.select("#tooltip")
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 25) + "px")

      //Actualizar los valores para cada pelicula
      d3.select("#titulo")
        .text(d.titulo)
      d3.select("#nota")
        .text(d.nota)
      d3.select("#lanzamiento")
        .text(d.lanzamiento)
      d3.select("#presupuesto")
        .text(d.presupuesto)
      d3.select("#recaudado")
        .text(d.recaudado)
        })

    .on("mouseout", function(d) {

      d3.select(this)
        .attr("opacity", 1)
        .transition()
        .duration(1000)
        .ease("elastic")
        .attr("r", function(d) {return d.recaudado/dineroTotal*40;})
        .attr("stroke-width", function(d) {
        return d.presupuesto/dineroTotal*40;
           })
      d3.select("#poster")  
        .style("display", "none")
      d3.select("#tooltip").classed("hidden", true)

    })

d3.select("#ordenLanzamientoValores")
  .on("click", function(){
      xScale = d3.scale.linear()
                       .domain([1970, añoMaximo])
                       .range([vis.circlePadding, vis.svgWidth - vis.circlePadding * 2]);

      xAxis = d3.svg.axis() //creando un eje generico
                    .scale(xScale) //le decimos en que escala va a operar el eje
                    .ticks(dataset.length) //establece el numero de cortes del eje
                    .orient("bottom"); 

      svg.select(".axis")
            .transition()
            .duration(1000)
            .call(xAxis);

      svg.selectAll("circle")
            .transition()
            .duration(1500)
            .attr("cx", function(d) {
              return xScale(d.lanzamiento); //llama a la funcion escala de x
            })
  })

d3.select("#ordenCronologicoValores")
  .on("click", function(){

      xScale = d3.scale.linear()
                       .domain([0, totalPeliculas])
                       .range([vis.circlePadding, vis.svgWidth - vis.circlePadding * 2]);

      xAxis = d3.svg.axis() //creando un eje generico
                    .scale(xScale) //le decimos en que escala va a operar el eje
                    .ticks(dataset.length) //establece el numero de cortes del eje
                    .orient("bottom"); 

      svg.select(".axis")
            .transition()
            .duration(1000)
            .call(xAxis);

      svg.selectAll("circle")
            .transition()
            .duration(1500)
            .attr("cx", function(d) {
              return xScale(d.cronologia); //llama a la funcion escala de x
            });
  })

/*Establecemos los datos(imaginamos que
representan el numero de manzanas
vendidas en una tienda cada mes)*/
var dataset = [ 100, 200, 300, 400, 500 ];

//Creando una escala
var scale = d3.scale.linear();
scale(2.5);
//Establecemos el dominio de entrada (100 a 500)
scale.domain([100, 500]);
//Establecemos el rango de salida (10 a 350 px)
scale.range([10, 350]);
/* mismo codigo pero en una sola linea
var scale = d3.scale.linear()
                    .domain([100, 500])
                    .range([10, 350]);
*/
scale(100);  //devuelve 10
scale(300);  //devuelve 180
scale(500);  //devuelve 350
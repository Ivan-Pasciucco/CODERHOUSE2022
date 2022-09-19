const Contenedor= require('./contenedor')

const productos = new Contenedor("./productos.txt");

setTimeout(() => {
    productos.save({
        title: "escuadra",
        price: "123.45",
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      });
}, 250);
setTimeout(() => {
    productos.save({
        title: "Calculadora",
        price: 234.56,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: null,
      });
}, 500);
setTimeout(() => {
    productos.save({
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: null,
      });
},750 )

setTimeout(() => {
    console.log(productos.getAll())
},1000);

setTimeout(() => {
    console.log(productos.getById(1))
}, 1500); 

setTimeout(() => {
    productos.deleteById(2)
},2000)
setTimeout(() => {
    productos.deleteAll()
},2500)


function graphing(func, maximo, minimo) {
  executeGraph(func, minimo, maximo);
}

function executeGraph(func, rangeMin, rangeMax) {
  const spaceForGraphic = document.getElementById("spaceForGraphic"); //Se optiene el elemento canva del html

  //Configuracion de los datos del grafico
  const data = {
    labels: [], //valores del eje X
    datasets: [
      {
        label: "Enable Function",
        data: [], //valores del eje Y
        borderColor: "#ec6059", //Color de la linea
        borderWidth: 1, //Ancho de linea
        fill: false, //no rellenar el espacio del grafico
      },
    ],
  };

  for (let x = rangeMin; x <= rangeMax; x += 0.1) {
    if (typeof math.evaluate(func, { x: x }) == "object") {
      continue;
    }
    data.labels.push(x.toFixed(2)); // Se asignan todos los valores de X de los pares ordenados a la config de datos
    data.datasets[0].data.push(math.evaluate(func, { x: x })); // Se asignan los de Y a la Config de datos
  }

  //instarcia de la libreria Chart
  new Chart(spaceForGraphic, {
    type: "line", //Tipo de grafico
    data: data, //Datos del grafico
    options: {
      //opciones de configuracion
      scales: {
        x: {
          //Se define la config del eje X del grafico
          type: "linear",
          position: "center",
          max: rangeMax,
          min: rangeMin,
        },
        y: {
          // Se define la config del eje Y del grafico
          type: "linear",
          position: "center",
          max: rangeMax,
          min: rangeMin,
        },
      },
    },
  });
}
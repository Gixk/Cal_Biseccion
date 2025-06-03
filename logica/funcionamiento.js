/* //!! Este archivo contiene las intrucciones para el correcto funcionamiento de las vistas. Se encarga de darle funcionalidad a los botones, div, etc. */

// funcionalidad de los botones del cuerpo de "Inicio", permite que se abran los inputs
//& Para abrir los inputs de la funcion
document.getElementById("btnCalFun").addEventListener("click", () => {
  document.getElementById("cuadroInputsFuncion").style.display = "inline";
  document.getElementById("slogan").style.display = "none";
  document.getElementById("cuadroInputsGrafica").style.display = "none";
  document.getElementById("resultado").style.display = "none";
});




//& para abrir los inputs de la grafica
document.getElementById("btnCalGra").addEventListener("click", () => {
  document.getElementById("cuadroInputsGrafica").style.display = "inline";
  document.getElementById("slogan").style.display = "none";
  document.getElementById("cuadroInputsFuncion").style.display = "none";
  document.getElementById("resultado").style.display = "none";
});




/* //! Al tocar los botones calcular. Se llama el metodo que calcule o grafique la funcion*/
//& boton para calcular una funcion -> btn verde
document.getElementById("buttonFunx").addEventListener("click", () => {
  document.getElementById("cuadroInputsFuncion").style.display = "none";
  document.getElementById("resultado").style.display = "block";
  document.getElementById("scrollspyHeading2").style.fontSize = "50px";

  //Obtiene los datos
  const a = parseFloat(document.getElementById("interA").value);
  const b = parseFloat(document.getElementById("interB").value);
  const funcioncita = document.getElementById("funcion1").value;
  const tolerancia = math.evaluate(document.getElementById("tolerancia").value);

  //limpia el div resultado
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("resultado").style.display = "block";

  try {
    //~ si todos los valores son numeros
    if (isFinite(a) && isFinite(b) && isFinite(tolerancia)) {
      document.getElementById('resultado').innerHTML =
        '<p id="textfun">Función: <strong>' + funcioncita + '</strong></p>';
        document.getElementById("resultado").innerHTML += '<p id="resul"></p>'

      if (!bisection(funcioncita, a, b, tolerancia, "")) {
        //!Si devuelve negativo, o sea, no se logra calcular la función.
        document.getElementById("cuadroInputsFuncion").style.display = "inline"; //se muestran los inputs
        document.getElementById("resultado").style.display = "none"; //se oculta el resultado
        document.getElementById("scrollspyHeading2").style.fontSize = "100px";
      }

    } else {
      document.getElementById("resultado").innerHTML =
        "<strong>Verifique los datos.</strong>";
    }
  } catch (error) {
    document.getElementById(
      "resultado"
    ).innerHTML = `<p><strong>PROBLEMAS EN CALCULO. VERIFIQUE EL RANGO [A,B] Y EL ERROR</strong></p>`;
    console.error(error.message);
  }
});




//& boton para graficar -> btn verde
document.getElementById("buttonGraf").addEventListener("click", () => {
  //desaparecen los inputs
  document.getElementById("cuadroInputsGrafica").style.display = "none";
  //cambia de tamaño el titulo
  document.getElementById("scrollspyHeading2").style.fontSize = "50px";
  try {
    //!! No hay validaciones para ver si la funcion ingresada es válida
    //obtiene los valores
    const funcion = document.getElementById("funcion2").value;
    const maximo = parseFloat(document.getElementById("maximo").value);
    const minimo = parseFloat(document.getElementById("minimo").value);

    //limpia el div resultado
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultado").style.display = "block";

    if (maximo > 0 && minimo < 0) {
      //Se visualiza la función
      document.getElementById("resultado").innerHTML =
        '<p id="textfun">Función: <strong>' + funcion + "</strong></p>";
        //se agrega el canva para la grafica.
      document.getElementById("resultado").innerHTML +=
        '<canvas id="spaceForGraphic" class="h-100 w-100"></canvas>';
        //se llama el metodo que grafica
      graphing(funcion, maximo, minimo);
    } else {
      document.getElementById("resultado").innerHTML =
        "<strong>Verifique los datos. El rango máximo  debe ser mayor a 0 y el rango mínimo debe ser menor a 0</strong>";
    }
  } catch (error) {
    console.error(error.message);
  }
});




//!Btn limpiar, vacia los espacios en los inputs de la grafica
document.getElementById('BtnLimpiarG').addEventListener("click", () => {
  document.getElementById('funcion2').value = "";
  document.getElementById('maximo').value = "";
  document.getElementById('minimo').value = "";
});

//! Vacia los inputs de la funcion
document.getElementById('BtnLimpiarF').addEventListener("click", () => {
  document.getElementById('interA').value = "";
  document.getElementById('interB').value = "";
  document.getElementById('funcion1').value = "";
  document.getElementById('tolerancia').value = "";
});
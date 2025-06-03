function bisection(func, a, b, tolerance, value_X = "") {
  const maxIterations = 100;
  let fa = math.evaluate(func, { x: a });
  let fb = math.evaluate(func, { x: b });

  // Validación inicial
  if (fa * fb >= 0) {
    alert("No se encontró una raíz válida en el intervalo dado.");
    return false;
  }

  // Limpiar resultado y tabla
  document.getElementById("resul").innerHTML = "";
  insertTable(value_X);

  let m, fm, error;
  let i = 0;

  while (i < maxIterations) {
    m = (a + b) / 2;
    fa = math.evaluate(func, { x: a });
    fb = math.evaluate(func, { x: b });
    fm = math.evaluate(func, { x: m });

    // Calcular error
    if (value_X === "") {
      error = Math.abs((b - a) / 2);
    } else {
      error = Math.abs(value_X - m);
    }

    // Insertar fila en la tabla
    insertRow(i, a, b, m, fa, fb, fm, fa * fm, error, value_X);

    // Criterio de parada
    if (error < tolerance || fm === 0) {
      document.getElementById("resul").innerHTML = m;
      return true;
    }

    // Actualizar intervalo
    if (fa * fm < 0) {
      b = m;
    } else {
      a = m;
    }

    i++;
  }

  alert("Se alcanzó el número máximo de iteraciones.");
  return false;
}

function insertTable(value_X) {
  let html =
    `<table id="table">
      <thead>
        <tr>
          <th>Iteración</th>
          <th>A</th>
          <th>B</th>
          <th>M</th>
          <th>f(a)</th>
          <th>f(b)</th>
          <th>f(m)</th>
          <th>f(a) * f(m)</th>` +
    (value_X === ""
      ? `<th>Error</th>`
      : `<th>Error Absoluto</th><th>Error Relativo</th>`) +
    `</tr>
      </thead>
      <tbody>
      </tbody>
    </table>`;

  document.getElementById("resultado").innerHTML += html;
}

function insertRow(iter, a, b, m, fa, fb, fm, fam, error, value_X) {
  const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
  const row = tbody.insertRow();

  const data = [iter, a, b, m, fa, fb, fm, fam];

  if (value_X === "") {
    data.push(error);
  } else {
    const relativeError = error / Math.abs(m);
    data.push(error, relativeError);
  }

  data.forEach((val) => {
    const cell = row.insertCell();
    cell.innerHTML = parseFloat(val).toPrecision(6);
  });

  if (error < 0.0001) {
    row.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
  }
}

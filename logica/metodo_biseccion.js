
function bisection(func, a, b, error_value, value_X){

        if (func_a * func_b < 0) {
            console.log("if");
            insert_table(value_X);
            insert_firts_row(func, a, b, error_value, value_X);
            inserts_rows(func, value_X, error_value);
        } else {
            console.log("else");
            alert("No se encontró ninguna raíz en el intervalo dado.");
            return false;
        }

}
//----------------------------------------------------------------------------------------------------
// This method is recursive
function inserts_rows(func, value_X, error_value, counter=1){
    new_row = document.getElementById('table').getElementsByTagName('tbody')[0].insertRow();
    previous_row = document.getElementById('table').rows[counter];

    var a, b, abs_error, estimated_error;

    if (previous_row.cells[7].innerHTML > 0) {
        a = previous_row.cells[3].innerHTML
        b = previous_row.cells[2].innerHTML
    } else {
        a = previous_row.cells[1].innerHTML
        b = previous_row.cells[3].innerHTML
    }

     value_m = (Number(a) + Number(b))/2;
     func_a = math.evaluate(func, {x:a});
     func_b = math.evaluate(func, {x:b});
     func_m = math.evaluate(func, {x:value_m});

     if(value_X == ''){
        estimated_error =  math.abs(((value_m-previous_row.cells[3].innerHTML)/value_m)*100)
        first_row = [a, b, value_m, func_a , func_b, func_m, func_a * func_m, estimated_error];
    } else {
        abs_error = math.abs(value_X - value_m);
        first_row = [a, b, value_m, func_a , func_b, func_m, func_a * func_m, abs_error, abs_error/value_m];
    }

    
    cell = new_row.insertCell(0);
    cell.innerHTML = counter;
    
    for (let i = 0; i < first_row.length; i++) {
        cell = new_row.insertCell(i+1);
        cell.innerHTML = first_row[i];
    }

    if (abs_error < error_value || estimated_error < error_value) {
        console.log(func_m);
        documents.getElementById('resul').innerHTML = value_m;
        new_row.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        return;
    } else{
        inserts_rows(func, value_X, error_value, counter+1);
    }
}

//---------------------------------------------------------------------------------------------------

function insert_firts_row(func, a, b, error_value, value_X){

    new_row = document.getElementById('table').getElementsByTagName('tbody')[0].insertRow();

    value_m = (Number(a) + Number(b))/2;
    func_a = math.evaluate(func, {x:a});
    func_b = math.evaluate(func, {x:b});
    func_m = math.evaluate(func, {x:value_m});

    if(value_X == ''){
        first_row = [a, b, value_m, func_a , func_b, func_m, func_a * func_m, ''];
    } else {
        abs_error = math.abs(value_X - value_m);
        first_row = [a, b, value_m, func_a , func_b, func_m, func_a * func_m, abs_error, abs_error/value_m];
    }

    cell = new_row.insertCell(0);
    cell.innerHTML = '0';

    for (let i = 0; i < first_row.length; i++) {
        cell = new_row.insertCell(i+1);
        cell.innerHTML = first_row[i];
    }
}
//--------------------------------------------------------------------------------------------
function insert_table(value_X){
    code_html =
    '<table id="table">' +
    '<thead>' +
        '<tr>' +
            '<th>Iteracion</th>' +
            '<th>A</th>'+
            '<th>B</th>'+
            '<th>M</th>'+
            '<th>f(a)</th>'+
            '<th>f(b)</th>'+
            '<th>f(m)</th>'+
            '<th>f(a) * f(m)</th>';
    
    if (value_X == "") {
        code_html += 
            '<th>EE</th>'+
        '</tr>'+
    '</thead>'+
    '<tbody>'+
    '</tbody>'+
    '</table>';
    } else {
        code_html += 
            '<th>EA</th>'+
            '<th>ER</th>'+
        '</tr>'+
    '</thead>'+
    '<tbody>'+
    '</tbody>'+
    '</table>';
    }

    document.getElementById('resultado').innerHTML += code_html;
}

//Constructor para seguro
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo
}
Seguro.prototype.cotizarSeguro = function(informacion) {
    
    /*
        1 Mazda = 1.14
        2 BMW = 2.30
        3 Ferrari = 3.02
        4 Tesla = 2.08
        5 Nissan = 1.06

    */

    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1': 
            cantidad = base * 1.14;
            break;
        case '2': 
            cantidad = base * 2.30;
            break;
        case '3':
            cantidad = base * 3.02;
            break;
        case '4':
            cantidad = base * 2.08;
            break;
        case '5': 
            cantidad  = base * 1.06;
            break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    //Cada año de Diferencia hay que reducir 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        Si el seguro es basico se múltiplica por el 30% más
        Si el seguro es completo  50% más
    */

    if(this.tipo === 'basico') {
        cantidad *= 1.30;
    }else {
        cantidad *= 1.50;
    }

    return cantidad;
}

// Todo lo que se muestra
function Interfaz() {

}

//Mensaje que se imprime en el HTML
Interfaz.prototype.mostraMensaje = function(mensaje, tipo) {
    const div = document.createElement('div');


    if(tipo === 'error') {
        div.classList.add('mensaje', 'error');
    }else {
        div.classList.add('mensaje', 'correcto');
    }

    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 5000);

}

// Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function(seguro, total) {
    const resultado  = document.getElementById('resultado');
    let marca;

    switch(seguro.marca) {
        case '1': 
                marca = 'Mazda';
                break;
        case '2':
                marca = 'BMW';
                break;
        case '3':
                marca = 'Ferrari';
                break;  
        case '4':
                marca = 'Tesla';
                break; 
         case '5':
                marca = 'Nissan';
                break;            
    }

    // Crear un div
    const div = document.createElement('div');
    //Insertar información
    div.innerHTML = `
        <p class="header">Tu resumen:</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        <p>Total: $${total}</p>
    `;

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);
}


//Event Listeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //Leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;


    // Leer el año seleccionado del <select>
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;


    //Lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    //  Crear instancia de interfaz
    const interfaz = new Interfaz();

    // Revisamos que los campos no esten vacios
        if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
            // Interfaz imprimiendo un error
            interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo',
            'error');
        }else {
            //LIMPIAR RESULTADOS ANTERIORES
            const resultados = document.querySelector('#resultado div');
            if(resultados != null) {
                resultados.remove();
            }


            //Instanciar seguro y mostrar interfaz
            const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

            //Cotizar el seguro
            const cantidad = seguro.cotizarSeguro(seguro);
            // Mostrar el resultado
            interfaz.mostrarResultado(seguro, cantidad);
            interfaz.mostrarMensaje('Cotizando...', 'exito');
        }
    
});


const max = new Date().getFullYear();
const min = max - 21;


const selectAnios = document.getElementById('anio');


for(let i = max ; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
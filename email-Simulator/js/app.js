// VARIABLES

let email = document.getElementById('email');
let asunto = document.getElementById('asunto');
let mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

// ACTIONS LISTENERS

eventListeners();
function eventListeners(){
    //Inicio de la aplicacion y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);

    //Campos del Formaulario
    
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    // Boton de enviar en el submit
    formularioEnviar.addEventListener('submit', enviarEmail);

    // Boton de eliminar los campos del formulario

    resetBtn.addEventListener('click', resetFormulario);


}

//FUNCTIONS

function inicioApp(){
    //Desabilitar el boton de enviar

    btnEnviar.disabled = true;

}

//Valida que el campo tenga algo escrito
function validarCampo(){
    
    // Se valida la longitud del texto y que no este vacio
    validarLongitud(this);

    //Validar unicamente el email
    if(this.type === 'email') {
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');
    if(email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
        
        if(errores.length === 0){
            btnEnviar.disabled = false;
        }
        
    }
}


// Resetear el Formulario

function resetFormulario(e) {
    formularioEnviar.reset();
    e.preventDefault();
}


// Cuando se envia el correo
function enviarEmail(e) {

    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    //Gif que envia el email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';


    //Ocultar Spinner y mostrar gif oculto
    setTimeout(function(){
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);


        // No mostrar el gif email despues de 3 segundos
        setTimeout(function(){
            enviado.remove();
            formularioEnviar.reset();
        }, 3000);

    }, 2000);

    e.preventDefault();
}



//Validar longitud del texto en los campos
function validarLongitud(campo) {

    if(campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

// validar Email
function validarEmail(campo) {
    const mensaje = campo.value;

    if(mensaje.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}
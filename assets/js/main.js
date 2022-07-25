
// Referencias del HTML.
const formulario = document.querySelector('#Form');
const fechaDiv = document.querySelector('#Fecha-uf');
const valorDiv = document.querySelector('#Valor-uf');
const mensajeDiv = document.querySelector('#Div-mensaje');

// Instancia de un nuevo modal.
const modal = new bootstrap.Modal(document.querySelector("#Modal"));

// Url api UF.
const url = 'https://mindicador.cl/api';

// Expresión regular separador de miles.
const separadorMil = new RegExp(/\B(?=(\d{3})+(?!\d))/g);


// Obtención de los datos de la api, a través del método fetch.
fetch(url)
    .then((res) => res.json())
    .then((res) => {

        // Desestructuración de los datos obtenidos del json.
        const { valor, fecha } = res.uf;

        // Se instancian las fechas, se redondea el valor de la ufy se convierte a string.
        const fechaUf = new Date(fecha).toLocaleDateString();
        const fechaHoy = new Date().toLocaleDateString();
        const valorUf = Math.round(valor).toString();

        // Si la fecha obtenida de la api es igual a la fecha del día actual, ejecutar.
        if (fechaUf === fechaHoy) {

            valorDiv.innerHTML = `<span><strong>${valorUf.replace(separadorMil, ".")}</strong> CLP.</span>`;
            fechaDiv.innerHTML = `<span>${fechaUf}</span>`;

        } else {

            valorDiv.innerHTML = `<span><strong>Fechas no coinciden</strong> CLP.</span>`;
            fechaDiv.innerHTML = `<span>0</span>`;
        }
    });



// Evento submit del formulario.
formulario.addEventListener('submit', (event) => {

    // Previene la recarga automática de la página al hacer submit.
    event.preventDefault();

    // Desestructuración de los datos obtenidos del formulario.
    const { name, lastname, age, ['phone-number']: number, mail } = event.target;

    const mensaje = `Gracias por cotizar con nosotros ${name.value} ${lastname.value},
    uno de nuestros ejecutivos te llamará al teléfono ${number.value} y enviará un correo a ${mail.value}.`;

    mensajeDiv.innerHTML = `<P>${mensaje}</P>`;

    // Se resetean los datos del formulario.
    formulario.reset();

    // Se muestra el modal.
    modal.show();
});
//variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul')




//Eventos
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGastos);
}





//clases
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        //extrayendo valor
        const { presupuesto, restante} = cantidad

        //agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    imprimirAlerta(mensaje, tipo) {
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert')

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //agregar el texto
        divMensaje.textContent = mensaje;
        //agregar al html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

//instanciar
const ui = new UI();
let presupuesto;

//funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?')

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || preguntarPresupuesto <= 0) {
        window.location.reload();
    }

    //presupuesto válido
    presupuesto = new Presupuesto(presupuestoUsuario)

    ui.insertarPresupuesto(presupuesto)
}

function agregarGastos(e) {
    e.preventDefault();

    //leer campos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (gasto === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

        return;
    } else if( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no Válida', 'error');
    
        return;
    }

    //generar un objeto con el gasto
    gasto = { nombre, cantidad, id: Date.now() }

    //añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    //mensaje de que se agrego correctamente
    ui.imprimirAlerta('Gasto agregado Correctamente');

    //reinciar formulario
    formulario.reset();
}
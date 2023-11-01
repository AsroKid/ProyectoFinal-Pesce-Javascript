// LS usuario

let usuarioRegistrado = []
// Traigo el JSON de Joyeros existentes:

let JoyerosExistentes = []


fetch("/js/Joyeros.json")
    .then(response => response.json())
    .then(data => {
        JoyerosExistentes = data;
        cargarJoyerosDisponibles(JoyerosExistentes)
    })

let turnosAgendadosArray = localStorage.getItem("Joyeros-en-carrito")
turnosAgendadosArray = JSON.parse(turnosAgendadosArray)

// ------------DOM------------ //
const contenedorJoyerosDisponibles = document.querySelector("#container-Joyeros-disponibles")
const contenedorTurnosAgendados = document.querySelector("#container-turnos-agendados")
const btnConfirmar = document.querySelector("#btnConfirmar")
const btnVaciar = document.querySelector("#btnVaciar")
const btnContactoConfirmar = document.querySelector("#btnContactoConfirmar")

// --- DOM del formulario --- //
const formRegistro = document.querySelector("#formulario")
const nombreForm = document.querySelector("#nombreForm")
const apellidoForm = document.querySelector("#apellidoForm")
const correoForm = document.querySelector("#correoForm")
const documentoForm = document.querySelector("#dniForm")

// Cargar a los Joyeros a la pagina

function cargarJoyerosDisponibles() {
    contenedorJoyerosDisponibles.innerHTML = ""

    JoyerosExistentes.forEach(Joyero => {
        const div = document.createElement("div")
        div.classList.add("Joyeros-js-main", "js-separador")
        div.innerHTML = `
        <img src="${Joyero.imagen}" alt="" class="Joyeros-foto">
        <div class="Joyeros-nombre var-color-js">
            <small>Nombre</small>
            <p>${Joyero.nombre}</p>
        </div>
        <div class="Joyeros-especializacion">
            <small>especializacion</small>
            <p>${Joyero.especializacion}</p>
        </div>
        <div class="Joyeros-pago var-color-js">
            <small>Medio de Pago</small>
            <p>${Joyero.pago}</p>
        </div>   
        <div class="Joyeros-horario">
            <small>Franja horaria</small>
            <p>${Joyero.horario}</p>
        </div>
            <button class="Joyero-agregar-btn" id="${Joyero.id}">Agregar turno</button>
        </div>
        `;
        contenedorJoyerosDisponibles.append(div)

        // Boton para agregar turno al "carrito"

        const botonAgregarJoyero = document.getElementById(`${Joyero.id}`)

        botonAgregarJoyero.addEventListener("click", () => {
            agregarATurnos(Joyero.id)
        })

    })
}
cargarJoyerosDisponibles();

// Agregar turno al "carrito"

const agregarATurnos = (JoyeroID) => {

    Toastify({
        text: "Turno agregado",
        duration: 1600,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, white 24%, cadetblue 100%)",
            color: "rgba(19, 5, 2, 0.70)",
        },
        onClick: function () { }
    }).showToast();

    const JoyeroSelect = JoyeroExistentes.find((Joyero) => Joyero.id === JoyeroID)
    turnosAgendadosArray.push(JoyeroSelect)
    console.log(turnosAgendadosArray)
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    localStorage.setItem("Joyero-en-turnos", JSON.stringify(turnosAgendadosArray))
    cargarTurnosAgendados();

}


// Cargar al "carrito" de turnos 

function cargarTurnosAgendados() {
    contenedorTurnosAgendados.innerHTML = ""

    turnosAgendadosArray.forEach(Joyero => {
        const div = document.createElement("div")
        div.classList.add("Joyero-js-turnos", "js-separador")
        div.innerHTML = `
        <img src="${Joyero.imagen}" alt="" class="Joyeros-foto">
        <div class="Joyeros-nombre var-color-js">
            <small>Nombre</small>
            <p>${Joyero.nombre}</p>
        </div>
        <div class="Joyeros-especializacion">
           <small>especializacion</small>
            <p>${Joyero.especializacion}</p>
        </div>
        <div class="Joyeros-pago var-color-js">
            <small>Medio de Pago</small>
            <p>${Joyero.pago}</p>
        </div>   
        <div class="Joyeros-horario">
            <small>Franja horaria</small>
            <p>${Joyero.horario}</p>
        </div>
            <button class="Joyero-remover-btn" id="remover ${Joyero.id}">Remover turno</button>
        </div>
         `;
        contenedorTurnosAgendados.append(div)

        // Boton para eliminar turnos

        const botonRemoverJoyero = document.getElementById(`remover ${Joyero.id}`)

        botonRemoverJoyero.addEventListener("click", () => {

            Toastify({
                text: "Turno removido",
                duration: 1200,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, white 14%, red 100%)",
                    color: "rgba(19, 5, 2, 0.70)",
                },
                onClick: function () { }
            }).showToast();

            quitarDeTurnos(Joyero.id)
        })
    })
}

// Quitar del "carrito" de turnos

const quitarDeTurnos = (JoyeroID) => {
    const JoyeroSelect = turnosAgendadosArray.find((Joyero) => Joyero.id === JoyeroID)
    const findIndice = turnosAgendadosArray.indexOf(JoyeroSelect)
    turnosAgendadosArray.splice(findIndice, 1)
    console.log(turnosAgendadosArray)
    localStorage.setItem("Joyeros-en-turnos", JSON.stringify(turnosAgendadosArray))
    cargarTurnosAgendados();

}

// Botones de vacio y de confirmacion

function confirmarTurno() {
    if (turnosAgendadosArray.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: '¡Ojo!',
            text: 'No tenés ningun turno agendado, por favor intenta de nuevo',
        })
    } else {
        Swal.fire({
            title: 'Estás por confirmar los turnos, ¿deseas finalizar?',
            showDenyButton: true,
            confirmButtonText: 'Finalizar',
            confirmButtonColor: `#17594A`,
            denyButtonText: `Continuar agregando`,
            denyButtonColor: `#D7C0AE`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Confirmaste con éxito los turnos!', '', 'success')
            }
        })
    }
}

btnVaciar.addEventListener("click", () => {
    if (turnosAgendadosArray.length === 0) {
        Toastify({
            text: "No tenes turnos en la agenda para vaciar",
            duration: 2500,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, white 14%, red 100%)",
                color: "rgba(19, 5, 2, 0.70)",
            },
            onClick: function () { }
        }).showToast();
    } else if (contenedorTurnosAgendados.innerHTML !== "") {
        Swal.fire({
            title: '¿Deseas vaciar todos los turnos agendados?',
            showDenyButton: true,
            confirmButtonText: 'Vaciar',
            confirmButtonColor: `rgba(145, 14, 14, 0.918)`,
            denyButtonText: `Volver atrás`,
            denyButtonColor: `#D7C0AE`
        }).then((result) => {
            if (result.isConfirmed) {
                turnosAgendadosArray.length = 0
                localStorage.clear("Joyeros-en-turnos", JSON.stringify(turnosAgendadosArray))
                cargarTurnosAgendados()
                Toastify({
                    text: "Vaciaste el carrito de compras",
                    duration: 1200,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, white 14%, red 100%)",
                        color: "rgba(19, 5, 2, 0.70)",
                    },
                    onClick: function () { }
                }).showToast();
            } else { }
        })
    }
})

// Carrito de turnos LS (no logré dejar cargado el LS al recargar la pagina)

let turnosAgendadosLS = localStorage.getItem("productos-en-carrito");

if (turnosAgendadosLS) {
    turnosAgendadosArray = JSON.parse(turnosAgendadosLS);
    cargarTurnosAgendados();
} else {
    turnosAgendadosArray = [];
}

// Formulario - Registro de "usuario"

formRegistro.addEventListener("submit", (event) => {
    event.preventDefault();
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Puedes modificar alguna variable si la has introducido correctamente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(82, 94, 128)',
        cancelButtonColor: 'rgb(226, 6, 6)',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Volver',
    }).then((result) => {
        if (result.isConfirmed) {
            const personaRegistrada = {
                nombre: nombreForm.value,
                apellido: apellidoForm.value,
                correo: correoForm.value,
                documento: dniForm.value,
            };
            Swal.fire(
                '¡Registro exitoso!',
                `Bienvenido/a, ${personaRegistrada.nombre}, registramos correctamente tus datos: <br> Usuario: ${personaRegistrada.apellido}, ${personaRegistrada.nombre} <br> Correo: ${personaRegistrada.correo} <br> DNI/Pasaporte: ${personaRegistrada.documento}`,
                'success'
            )
        }
    });
});


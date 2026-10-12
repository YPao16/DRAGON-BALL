// ==========================================
// IMPORTACIONES DE LIBRERÍAS Y ESTILOS
// ==========================================

// Importa los estilos CSS de Bootstrap para el diseño responsivo e interfaz
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa los componentes de JavaScript de Bootstrap (modales, tooltips, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importa los iconos de FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importa SweetAlert2 para mostrar alertas emergentes estilizadas
import Swal from "sweetalert2";

// Importa la clase Acciones desde el archivo local (gestiona lógica de stats y ataques)
import Acciones from "./Acciones.js";

// Importa los estilos CSS personalizados del proyecto
import './style.css';


// ==========================================
// CAPTURA DE ELEMENTOS DEL DOM
// ==========================================

// Obtiene los botones "Aceptar" para confirmar la selección de cada jugador
const btn_player1 = document.getElementById("btn_player1");
const btn_player2 = document.getElementById("btn_player2");

// Obtiene los contenedores principales de la interfaz de cada jugador
const player1 = document.getElementById("py1");
const player2 = document.getElementById("py2");

// Obtiene los inputs donde los usuarios escriben sus nombres
const nombre1 = document.getElementById("player1");
const nombre2 = document.getElementById("player2");

// Obtiene los contenedores de los inputs (usa búsqueda de respaldo con .closest si no encuentra el ID)
const campo_player1 = document.getElementById("campo_p1") || nombre1.closest(".col-md-5");
const campo_player2 = document.getElementById("campo_p2") || nombre2.closest(".col-md-5");

// Variables globales para guardar los nombres de los personajes seleccionados
let pj1 = "", pj2 = "";

// Variables globales donde se guardarán las instancias de la clase Acciones de cada jugador
let jugador1, jugador2;
const contenedorJuego = document.getElementById("game-container");
const pantallaEnfrentamiento = document.getElementById("matchup-screen");
const btnStartBattle = document.getElementById("btn-start-battle");
const pantallaCarga = document.getElementById("loading-screen");


// ==========================================
// VALIDACIÓN DE INPUTS (SÓLO ALFANUMÉRICO)
// ==========================================

// Permite letras y números (incluidas letras acentuadas) y elimina lo demás.
const limpiarNombre = (event) => {
    event.target.value = event.target.value.replace(/[^\p{L}\p{N}]/gu, "");
};

nombre1.addEventListener("input", limpiarNombre);
nombre2.addEventListener("input", limpiarNombre);


// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

// Restablece el color de fondo de un grupo de elementos, quitando el amarillo ("bg-warning") y asignando un color base
const remover_seleccion = (color, ...elementos) => {
    elementos.map((elemento) => {
        elemento.classList.remove("bg-warning");
        elemento.classList.add(color);
    });
};

// Muestra un mensaje emergente de error personalizado usando SweetAlert2
const msj_error = (msj) => {
    Swal.fire({
        title: "Error!",
        text: msj,
        icon: "warning",
        confirmButtonColor: "#dc3545"
    });
};


// ==========================================
// PREVISUALIZACIÓN DE PERSONAJES
// ==========================================

// Captura elementos HTML de la tarjeta de vista previa del Jugador 1
const preview_p1 = document.getElementById("preview_p1");
const img_preview_p1 = document.getElementById("img_preview_p1");
const name_preview_p1 = document.getElementById("name_preview_p1");

// Captura elementos HTML de la tarjeta de vista previa del Jugador 2
const preview_p2 = document.getElementById("preview_p2");
const img_preview_p2 = document.getElementById("img_preview_p2");
const name_preview_p2 = document.getElementById("name_preview_p2");

// Diccionario que vincula el nombre o alias de un personaje con la ruta de su imagen de cuerpo completo
const MAPA_PERSONAJES = {
    "Veguitto": "./public/img/Vegitto/base.png",
    "Veguito": "./public/img/Vegitto/base.png",
    "Trunks": "./public/img/Trunks/base.png",
    "Gohan": "./public/img/Gohan/base.png",
    "Goku": "./public/img/Goku/base.png",
    "Veguetta": "./public/img/Veguetta/base.png",
    "Vegeta": "./public/img/Veguetta/base.png",
    "Cell": "./public/img/Cell/base.png",
    "Pikoro": "./public/img/Pikoro/base.png",
    "Piccolo": "./public/img/Pikoro/base.png",
    "Gogeta": "./public/img/Gogeta/base.png",
    "Gogueta": "./public/img/Gogeta/base.png"
};

const MAPA_DIALOGOS = {
    "Veguitto": "¡La fusión más poderosa ha llegado!",
    "Veguetta": "¡Te mostraré el verdadero poder de un saiyajin!",
    "Trunks": "¡No dejaré que destruyas este futuro!",
    "Gohan": "¡Esta vez lucharé con todo mi poder!",
    "Goku": "¡Estoy emocionado por este combate!",
    "Cell": "¡Contempla la perfección!",
    "Pikoro": "¡No subestimes mi poder!",
    "Gogeta": "¡Este combate terminará en un instante!"
};

const MAPA_ATAQUES = {
    "Veguitto": {
        basico: { nombre: "Golpe de energía", daño: 10 },
        especial: { nombre: "Final Flash", daño: 25 }
    },
    "Veguito": {
        basico: { nombre: "Golpe de energía", daño: 10 },
        especial: { nombre: "Final Flash", daño: 25 }
    },
    "Trunks": {
        basico: { nombre: "Corte de espada", daño: 10 },
        especial: { nombre: "Rayo Solar", daño: 25 }
    },
    "Gohan": {
        basico: { nombre: "Puñetazo de ki", daño: 10 },
        especial: { nombre: "Masenko", daño: 25 }
    },
    "Goku": {
        basico: { nombre: "Puñetazo de ki", daño: 10 },
        especial: { nombre: "Kamehameha", daño: 25 }
    },
    "Veguetta": {
        basico: { nombre: "Patada dorada", daño: 10 },
        especial: { nombre: "Big Bang Attack", daño: 25 }
    },
    "Vegeta": {
        basico: { nombre: "Patada dorada", daño: 10 },
        especial: { nombre: "Big Bang Attack", daño: 25 }
    },
    "Cell": {
        basico: { nombre: "Mordisco", daño: 10 },
        especial: { nombre: "Golpe de energía", daño: 25 }
    },
    "Pikoro": {
        basico: { nombre: "Patada rápida", daño: 10 },
        especial: { nombre: "Bola de energía", daño: 25 }
    },
    "Piccolo": {
        basico: { nombre: "Patada rápida", daño: 10 },
        especial: { nombre: "Bola de energía", daño: 25 }
    },
    "Gogeta": {
        basico: { nombre: "Golpe combinado", daño: 10 },
        especial: { nombre: "Supernova", daño: 25 }
    },
    "Gogueta": {
        basico: { nombre: "Golpe combinado", daño: 10 },
        especial: { nombre: "Supernova", daño: 25 }
    }
};

const obtenerAtaque = (personaje, tipo) => {
    const ataque = MAPA_ATAQUES[personaje]?.[tipo] || { nombre: tipo === "especial" ? "Ataque especial" : "Ataque básico", daño: tipo === "especial" ? 25 : 10 };
    const imagenBase = MAPA_PERSONAJES[personaje];
    return {
        ...ataque,
        imagen: imagenBase ? imagenBase.replace("base.png", `${tipo}.png`) : ""
    };
};

const actualizarNombresAtaques = (jugador, n) => {
    if (!jugador) return;

    const ataqueBasico = obtenerAtaque(jugador.getPersonaje(), "basico");
    const ataqueEspecial = obtenerAtaque(jugador.getPersonaje(), "especial");

    const iconoBasico = '<i class="fa-solid fa-hand-fist me-1" aria-hidden="true"></i>';
    const iconoEspecial = '<i class="fa-solid fa-fire me-1" aria-hidden="true"></i>';

    const botonBasico = document.getElementById(`p${n}-basico`);
    const botonEspecial = document.getElementById(`p${n}-especial`);
    botonBasico.innerHTML = `${iconoBasico}${ataqueBasico.nombre}`;
    botonBasico.title = `Ataque básico: ${ataqueBasico.nombre}`;
    botonBasico.setAttribute("aria-label", `Ataque básico: ${ataqueBasico.nombre}`);
    botonEspecial.innerHTML = `${iconoEspecial}${ataqueEspecial.nombre}`;
    botonEspecial.title = `Ataque especial: ${ataqueEspecial.nombre}`;
    botonEspecial.setAttribute("aria-label", `Ataque especial: ${ataqueEspecial.nombre}`);
};

function mostrarEnfrentamiento() {
    document.getElementById("matchup-img-p1").src = MAPA_PERSONAJES[pj1];
    document.getElementById("matchup-img-p1").alt = pj1;
    document.getElementById("matchup-name-p1").textContent = pj1;
    document.getElementById("matchup-player-p1").textContent = jugador1.getNombre();
    document.getElementById("matchup-dialogue-p1").textContent = `“${MAPA_DIALOGOS[pj1]}”`;
    document.getElementById("matchup-img-p2").src = MAPA_PERSONAJES[pj2];
    document.getElementById("matchup-img-p2").alt = pj2;
    document.getElementById("matchup-name-p2").textContent = pj2;
    document.getElementById("matchup-player-p2").textContent = jugador2.getNombre();
    document.getElementById("matchup-dialogue-p2").textContent = `“${MAPA_DIALOGOS[pj2]}”`;
    contenedorJuego.dataset.stage = "matchup";
    pantallaEnfrentamiento.focus();
}

btnStartBattle.addEventListener("click", () => {
    if (contenedorJuego.dataset.stage !== "matchup") return;

    btnStartBattle.disabled = true;
    pantallaCarga.classList.remove("d-none");
    pantallaCarga.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
        pantallaCarga.classList.add("d-none");
        pantallaCarga.setAttribute("aria-hidden", "true");
        contenedorJuego.dataset.stage = "battle";
        actualizarCombate();
        document.getElementById("p1-estado").focus();
    }, 1400);
});

// Captura todas las imágenes seleccionables dentro de las cuadrículas de cada jugador
const imagenes_p1 = player1.querySelectorAll(".row img");
const imagenes_p2 = player2.querySelectorAll(".row img");

// Asigna el evento click a cada imagen de personaje del Jugador 1
for (let i = 0; i < imagenes_p1.length; i++) {
    imagenes_p1[i].addEventListener("click", () => {
        // Evita cambiar la selección si el Jugador 1 ya presionó "Aceptar"
        if (jugador1) return;
        
        // Quita el borde amarillo a todas las imágenes del P1 y lo aplica a la cliqueada
        remover_seleccion("bg-danger", ...imagenes_p1);
        imagenes_p1[i].classList.remove("bg-danger");
        imagenes_p1[i].classList.add("bg-warning");
        
        // Guarda el nombre del personaje obtenido del atributo alt de la imagen
        pj1 = imagenes_p1[i].alt;
        
        // Si existe el mapa de la imagen, actualiza y muestra la vista previa
        if (img_preview_p1 && preview_p1 && MAPA_PERSONAJES[pj1]) {
            img_preview_p1.src = MAPA_PERSONAJES[pj1];
            img_preview_p1.alt = pj1;
            if (name_preview_p1) name_preview_p1.textContent = pj1;
            preview_p1.classList.remove("d-none");
        }
    });
}

// Asigna el evento click a cada imagen de personaje del Jugador 2
for (let i = 0; i < imagenes_p2.length; i++) {
    imagenes_p2[i].addEventListener("click", () => {
        // Evita cambiar la selección si el Jugador 2 ya presionó "Aceptar"
        if (jugador2) return;
        
        // Quita el borde amarillo a todas las imágenes del P2 y lo aplica a la cliqueada
        remover_seleccion("bg-primary", ...imagenes_p2);
        imagenes_p2[i].classList.remove("bg-primary");
        imagenes_p2[i].classList.add("bg-warning");
        
        // Guarda el nombre del personaje obtenido del atributo alt de la imagen
        pj2 = imagenes_p2[i].alt;
        
        // Si existe el mapa de la imagen, actualiza y muestra la vista previa
        if (img_preview_p2 && preview_p2 && MAPA_PERSONAJES[pj2]) {
            img_preview_p2.src = MAPA_PERSONAJES[pj2];
            img_preview_p2.alt = pj2;
            if (name_preview_p2) name_preview_p2.textContent = pj2;
            preview_p2.classList.remove("d-none");
        }
    });
}


// ==========================================
// CONFIRMACIÓN DE SELECCIÓN DE JUGADORES
// ==========================================

// Maneja el clic en el botón "Aceptar" del Jugador 1
btn_player1.addEventListener("click", () => {
    if (!/^[\p{L}\p{N}]+$/u.test(nombre1.value)) {
        msj_error("El jugador 1 no ah ingresado su NickName");
    } else if (pj1 == "") {
        msj_error("El jugador 1 no ah seleccionado un personaje");
    } else {
        // Crea la instancia de la clase Acciones para el Jugador 1
        jugador1 = new Acciones(nombre1.value, pj1);
        
        // Bloquea la selección confirmada y mantiene visible al personaje elegido.
        nombre1.disabled = true;
        if (campo_player1) campo_player1.classList.add("d-none");
        player1.querySelector(".character-options").classList.add("d-none");
        player1.querySelector("p").textContent = nombre1.value;
        btn_player1.classList.add("d-none");
        
        // Actualiza las barras y espera al segundo jugador antes de avanzar.
        actualizarCombate();
        if (jugador1 && jugador2) mostrarEnfrentamiento();
    }
});

// Maneja el clic en el botón "Aceptar" del Jugador 2
btn_player2.addEventListener("click", () => {
    if (!/^[\p{L}\p{N}]+$/u.test(nombre2.value)) {
        msj_error("El jugador 2 no ah ingresado su NickName");
    } else if (pj2 == "") {
        msj_error("El jugador 2 no ah seleccionado un personaje");
    } else {
        // Crea la instancia de la clase Acciones para el Jugador 2
        jugador2 = new Acciones(nombre2.value, pj2);
        
        // Bloquea la selección confirmada y mantiene visible al personaje elegido.
        nombre2.disabled = true;
        if (campo_player2) campo_player2.classList.add("d-none");
        player2.querySelector(".character-options").classList.add("d-none");
        player2.querySelector("p").textContent = nombre2.value;
        btn_player2.classList.add("d-none");
        
        // Actualiza las barras y espera al primer jugador antes de avanzar.
        actualizarCombate();
        if (jugador1 && jugador2) mostrarEnfrentamiento();
    }
});


// ==========================================
// LÓGICA DEL COMBATE
// ==========================================

// Variable de bandera para controlar si la pelea llegó a su fin
let combateTerminado = false;
let jugadorTurno = 1;
let animacionEnCurso = false;
let turnosDesdeEspecial = [0, 0];
const panelAnimacionAtaque = document.getElementById("attack-animation");
const imagenAnimacionAtaque = document.getElementById("attack-animation-image");
const tituloAnimacionAtaque = document.getElementById("attack-animation-title");
const detalleAnimacionAtaque = document.getElementById("attack-animation-detail");

// Función rápida para actualizar el texto de estado debajo de los botones
const estado = (n, mensaje) => {
    document.getElementById(`p${n}-estado`).textContent = mensaje;
};

// Función para actualizar el estado visual de las barras y el bloqueo/desbloqueo de botones
function actualizarCombate() {
    // Evalúa si ambos jugadores ya confirmaron su selección
    const listos = Boolean(jugador1 && jugador2);

    // Recorre los dos jugadores para actualizar sus respectivas interfaces
    [jugador1, jugador2].forEach((jugador, i) => {
        const n = i + 1; // Número de jugador (1 o 2)

        if (!jugador) {
            for (const accion of ["cargar", "especial", "basico", "semilla"]) {
                document.getElementById(`p${n}-${accion}`).disabled = true;
            }
            return;
        }
        
        actualizarNombresAtaques(jugador, n);

        // Recorre los atributos del personaje y actualiza las barras de progreso HTML
        for (const [stat, valor] of Object.entries({vida: jugador.getVida(), ki: jugador.getKi(), energia: jugador.getEnergia()})) {
            const barra = document.getElementById(`p${n}-${stat}`);
            barra.style.width = `${valor}%`;
            barra.textContent = `${valor}%`;
            barra.setAttribute("aria-valuenow", valor);
        }
        // Actualiza el contador de semillas en el HTML
        document.getElementById(`p${n}-semillas`).textContent = jugador.getSemilla();

        // Determina si los controles del jugador deben estar activos
        const activo = listos && !combateTerminado && !animacionEnCurso && jugadorTurno === n;

        // Reglas de activación/desactivación para cada botón según el estado actual del personaje:
        // Cargar Ki: deshabilitado si está inactivo o si ya tiene ki y energía al 100%
        document.getElementById(`p${n}-cargar`).disabled = !activo || (jugador.getKi() === 100 && jugador.getEnergia() === 100);
        
        // Ataque básico: deshabilitado si no hay suficiente Ki (<10) o Energía (<5)
        document.getElementById(`p${n}-basico`).disabled = !activo || jugador.getKi() < 10 || jugador.getEnergia() < 5;
        
        // Ataque especial: deshabilitado si no hay suficiente Ki (<20) o Energía (<15)
        const especialDisponible = turnosDesdeEspecial[n - 1] >= 2;
        const botonEspecial = document.getElementById(`p${n}-especial`);
        botonEspecial.disabled = !activo || !especialDisponible || jugador.getKi() < 20 || jugador.getEnergia() < 15;
        botonEspecial.title = especialDisponible
            ? `Ataque especial: ${obtenerAtaque(jugador.getPersonaje(), "especial").nombre}`
            : `Podrás usar el ataque especial después de ${2 - turnosDesdeEspecial[n - 1]} turno(s) propio(s).`;
        
        // Semilla del ermitaño: deshabilitada si se acabaron (0) o si todas las barras están al máximo
        const todasLasBarrasAlMaximo = jugador.getVida() === 100 && jugador.getKi() === 100 && jugador.getEnergia() === 100;
        document.getElementById(`p${n}-semilla`).disabled = !activo || jugador.getSemilla() === 0 || todasLasBarrasAlMaximo;

        // Actualización de textos informativos según la fase del juego
        if (!listos) estado(n, "Listo. Esperando al otro jugador.");
        else if (listos && combateTerminado) estado(n, "Combate terminado.");
        else if (listos) estado(n, jugadorTurno === n ? "¡Tu turno! Elige una acción." : `Turno de ${jugadorTurno === 1 ? jugador1.getNombre() : jugador2.getNombre()}.`);
    });
}

function mostrarAnimacionAtaque(jugador, ataque, alTerminar) {
    tituloAnimacionAtaque.textContent = ataque.nombre;
    detalleAnimacionAtaque.textContent = `${jugador.getNombre()}: “${MAPA_DIALOGOS[jugador.getPersonaje()]}”`;
    imagenAnimacionAtaque.src = ataque.imagen;
    imagenAnimacionAtaque.alt = `${ataque.nombre} de ${jugador.getPersonaje()}`;
    panelAnimacionAtaque.classList.remove("d-none");
    panelAnimacionAtaque.setAttribute("aria-hidden", "false");
    panelAnimacionAtaque.classList.remove("is-visible");
    void panelAnimacionAtaque.offsetWidth;
    panelAnimacionAtaque.classList.add("is-visible");

    window.setTimeout(() => {
        panelAnimacionAtaque.classList.add("d-none");
        panelAnimacionAtaque.classList.remove("is-visible");
        panelAnimacionAtaque.setAttribute("aria-hidden", "true");
        animacionEnCurso = false;
        actualizarCombate();
        if (alTerminar) {
            Swal.fire({
                title: "¡Victoria!",
                text: `${jugador.getNombre()} ganó el combate.`,
                icon: "success",
                confirmButtonText: "Volver a seleccionar"
            }).then(volverASeleccion);
        }
    }, 1800);
}

function volverASeleccion() {
    jugador1 = undefined;
    jugador2 = undefined;
    pj1 = "";
    pj2 = "";
    combateTerminado = false;
    jugadorTurno = 1;
    animacionEnCurso = false;
    turnosDesdeEspecial = [0, 0];

    nombre1.value = "";
    nombre2.value = "";
    nombre1.disabled = false;
    nombre2.disabled = false;
    campo_player1.classList.remove("d-none");
    campo_player2.classList.remove("d-none");

    for (const [n, jugador, color] of [[1, player1, "bg-danger"], [2, player2, "bg-primary"]]) {
        jugador.querySelector(".character-options").classList.remove("d-none");
        jugador.querySelector("p").textContent = "Seleccionar personaje";
        document.getElementById(`btn_player${n}`).classList.remove("d-none");
        document.getElementById(`preview_p${n}`).classList.add("d-none");
        jugador.querySelectorAll(".character-options img").forEach((imagen) => {
            imagen.classList.remove("bg-warning");
            imagen.classList.add(color);
        });
    }

    pantallaEnfrentamiento.classList.add("d-none");
    btnStartBattle.disabled = false;
    pantallaCarga.classList.add("d-none");
    pantallaCarga.setAttribute("aria-hidden", "true");
    panelAnimacionAtaque.classList.add("d-none");
    panelAnimacionAtaque.classList.remove("is-visible");
    panelAnimacionAtaque.setAttribute("aria-hidden", "true");
    contenedorJuego.dataset.stage = "selection";
    actualizarCombate();
    nombre1.focus();
}

// Función principal que ejecuta las jugadas en cada turno
function ejecutarAccion(n, accion) {
    // Si falta algún jugador o la pelea terminó, bloquea la ejecución
    if (!jugador1 || !jugador2 || combateTerminado || animacionEnCurso || jugadorTurno !== n) return;

    // Asigna atacante y rival según el número de jugador (n)
    const jugador = n === 1 ? jugador1 : jugador2;
    const rival = n === 1 ? jugador2 : jugador1;

    // Previene clicks si el botón estaba deshabilitado
    if (document.getElementById(`p${n}-${accion}`).disabled) return;
    if (accion === "especial" && turnosDesdeEspecial[n - 1] < 2) return;
    if (accion === "semilla" && (jugador.getSemilla() <= 0 || [jugador.getVida(), jugador.getKi(), jugador.getEnergia()].every((valor) => valor === 100))) return;

    let mensaje;
    let ataqueEjecutado;
    let combateGanado = false;

    // Acción 1: Cargar Ki
    if (accion === "cargar") {
        jugador.cargaEnergia();
        mensaje = "Cargaste ki (+10) y energía (+15).";
    
    // Acción 2: Usar Semilla
    } else if (accion === "semilla") {
        jugador.curacion();
        mensaje = "Semilla usada: vida, ki y energía restaurados.";
    
    // Acción 3: Ataques (Básico o Especial)
    } else {
        const especial = accion === "especial";
        const ataque = obtenerAtaque(jugador.getPersonaje(), especial ? "especial" : "basico");
        ataqueEjecutado = ataque;
        if (especial) jugador.atkEspecial(); else jugador.atkBasico();
        
        // Reduce la vida del rival asegurando que nunca sea menor a 0
        const dano = ataque.daño;
        rival.setVida(Math.max(0, rival.getVida() - dano));
        
        mensaje = `${ataque.nombre}: ${dano} de daño.`;
        
        // Notifica al rival del daño recibido
        estado(n === 1 ? 2 : 1, `Recibiste ${dano} de daño.`);

    }

    if (accion === "especial") {
        turnosDesdeEspecial[n - 1] = 0;
    } else {
        turnosDesdeEspecial[n - 1] = Math.min(2, turnosDesdeEspecial[n - 1] + 1);
    }

    // Cada acción consume el turno y habilita al otro jugador.
    jugadorTurno = n === 1 ? 2 : 1;

    // Comprobación de fin de juego cuando la vida del rival llega a 0
    if (rival.getVida() === 0) {
        combateTerminado = true;
        combateGanado = true;
    }

    // Actualiza la interfaz tras aplicar la jugada
    if (ataqueEjecutado) {
        animacionEnCurso = true;
        actualizarCombate();
        mostrarAnimacionAtaque(jugador, ataqueEjecutado, combateGanado);
    } else {
        actualizarCombate();
        estado(n, mensaje);
    }
}

// ==========================================
// REGISTRO DE EVENTOS PARA LOS BOTONES DE ACCIÓN
// ==========================================

// Recorre los 2 jugadores y sus 4 acciones posibles para enlazar los 'addEventListener' de click
for (const n of [1, 2]) {
    for (const accion of ["cargar", "especial", "basico", "semilla"]) {
        document.getElementById(`p${n}-${accion}`).addEventListener("click", () => ejecutarAccion(n, accion));
    }
}
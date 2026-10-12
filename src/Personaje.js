// Guarda los datos de cada jugador durante la partida.
class Personaje {
    // Datos iniciales de cada jugador.
    #vida = 100;
    #nombre;
    #personaje;
    #ki = 100;
    #energia = 100;
    #semilla = 2;

    // Al crear al jugador, guarda su nombre y el personaje que eligió.
    constructor(nombre, personaje = "") {
        this.#nombre = nombre;
        this.#personaje = personaje;
        
        // Muestra los valores iniciales en la consola.
        this.mostrarEstadisticas();
    }

    // Imprime en la consola cómo van las barras y las semillas.
    mostrarEstadisticas() {
        console.log(`
            nombre:${this.#nombre},
            personaje:${this.#personaje},
            *********************
            ki:${this.#ki},
            vida:${this.#vida},
            energia:${this.#energia},
            semilla:${this.#semilla},
        `);
    }

    // Estos métodos permiten consultar los datos del jugador.

    getVida() {
        return this.#vida;
    }

    getKi() {
        return this.#ki;
    }

    getEnergia() {
        return this.#energia;
    }

    getSemilla() {
        return this.#semilla;
    }

    getNombre() {
        return this.#nombre;
    }

    getPersonaje() {
        return this.#personaje;
    }

    // Estos métodos permiten actualizar sus datos.

    setVida(vida) {
        this.#vida = Math.min(100, Math.max(0, Number(vida) || 0));
    }

    setKi(ki) {
        this.#ki = Math.min(100, Math.max(0, Number(ki) || 0));
    }

    setEnergia(energia) {
        this.#energia = Math.min(100, Math.max(0, Number(energia) || 0));
    }

    setSemilla(semilla) {
        this.#semilla = Math.min(2, Math.max(0, Math.floor(Number(semilla) || 0)));
    }
}

// Deja esta clase disponible para usarla en Acciones.js.
export default Personaje;

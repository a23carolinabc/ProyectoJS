class Ticket {
    constructor(id, titulo, descripcion, prioridad, estado, tiempoEstimado, departamentoId, tecnicoId) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = this.validarPrioridad(prioridad);
        this.estado = estado; // "Abierto", "En progreso", "Cerrado"
        this.tiempoEstimado = tiempoEstimado; // en horas o días
        this.observaciones = [];
        this.departamentoId = departamentoId;
        this.tecnicoId = tecnicoId;
        this.fechaCreacion = new Date();
    }

    // Método para validar la prioridad
    validarPrioridad(prioridad) {
        const prioridadesValidas = ["alta", "media", "baja"];
        return prioridadesValidas.includes(prioridad.toLowerCase()) ? prioridad.toLowerCase() : "media";
    }

    // Método para actualizar el estado del ticket
    actualizarEstado(nuevoEstado) {
        const estadosValidos = ["Abierto", "En progreso", "Cerrado"];
        if (estadosValidos.includes(nuevoEstado)) {
            this.estado = nuevoEstado;
        } else {
            console.error("Estado no válido.");
        }
    }

    // Método para agregar una observación
    agregarObservacion(mensaje) {
        this.observaciones.push({
            mensaje: mensaje,
            fecha: new Date()
        });
    }

    // Método para mostrar detalles del ticket
    mostrarDetalles() {
        console.log(`
        ID: ${this.id}
        Título: ${this.titulo}
        Descripción: ${this.descripcion}
        Prioridad: ${this.prioridad}
        Estado: ${this.estado}
        Tiempo Estimado: ${this.tiempoEstimado}
        Departamento ID: ${this.departamentoId}
        Técnico ID: ${this.tecnicoId}
        Fecha de Creación: ${this.fechaCreacion}
        Observaciones: ${this.observaciones.length ? this.observaciones.map(obs => `\n  - ${obs.mensaje} (${obs.fecha})`).join("") : "Ninguna"}
        `);
    }
}

// Ejemplo de uso
const ticket1 = new Ticket(1, "Error en servidor", "El servidor no responde", "alta", "Abierto", "4 horas", 101, 202);
ticket1.agregarObservacion("Se revisó el log y se detectó un fallo en la base de datos.");
ticket1.actualizarEstado("En progreso");
ticket1.mostrarDetalles();

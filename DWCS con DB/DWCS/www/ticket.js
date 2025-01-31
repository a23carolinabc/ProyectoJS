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

}
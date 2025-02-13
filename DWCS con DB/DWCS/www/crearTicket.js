// ***********************
//  CLASE TICKET
// ***********************
class Ticket {

    constructor(id, titulo, descripcion, prioridad) {
        this.id = id; // ID único autogenerado
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.estado = "sin iniciar";
        this.fechaCreacion = new Date().toISOString();
    }
}

// ***********************
//  CREACIÓN DE TICKETS
// ***********************
document.getElementById("crearTicket").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recargar la página

    // Obtener valores del formulario
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
   
    // Validar que los campos no estén vacíos
    if (!titulo || !descripcion) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Generar ID único basado en timestamp
    const id = Date.now();

    // Crear el objeto Ticket
    const nuevoTicket = new Ticket(id, titulo, descripcion);

    // Guardar en localStorage
    guardarEnLocalStorage(nuevoTicket);

    // Limpiar formulario
    document.getElementById("crearTicket").reset();

    alert("Ticket creado exitosamente!");
});

// ***********************
//  LOCAL STORAGE (GUARDAR Y OBTENER)
// ***********************
function guardarEnLocalStorage(ticket) {
    let tickets = obtenerTicketsDesdeLocalStorage();
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

function obtenerTicketsDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("tickets")) || [];
}

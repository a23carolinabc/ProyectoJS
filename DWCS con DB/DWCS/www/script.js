class TicketManager {
    constructor() {
        this.tickets = this.cargarTickets();
    }

    guardarTickets() {
        localStorage.setItem("tickets", JSON.stringify(this.tickets));
    }

    cargarTickets() {
        const ticketsGuardados = localStorage.getItem("tickets");
        return ticketsGuardados ? JSON.parse(ticketsGuardados) : [];
    }

    crearTicket(titulo, descripcion, prioridad, estado, tiempoEstimado) {
        const nuevoId = this.tickets.length > 0 ? this.tickets[this.tickets.length - 1].id + 1 : 1;
        const nuevoTicket = { 
            id: nuevoId, 
            titulo, 
            descripcion, 
            prioridad, 
            estado, 
            tiempoEstimado, 
            observaciones: "" 
        };
        this.tickets.push(nuevoTicket);
        this.guardarTickets();
        return nuevoTicket;
    }

    obtenerTicket(id) {
        return this.tickets.find(ticket => ticket.id === id);
    }

    modificarTicket(id, cambios) {
        const ticket = this.obtenerTicket(id);
        if (ticket) {
            Object.assign(ticket, cambios);
            this.guardarTickets();
        }
    }

    eliminarTicket(id) {
        this.tickets = this.tickets.filter(ticket => ticket.id !== id);
        this.guardarTickets();
    }
}

// Instancia de TicketManager
const gestor = new TicketManager();

// Función para mostrar la lista de tickets en la barra lateral
function mostrarListaTickets() {
    const ticketList = document.getElementById("ticket-list");
    ticketList.innerHTML = "";

    gestor.tickets.forEach(ticket => {
        const li = document.createElement("li");
        li.textContent = `${ticket.titulo} (${ticket.prioridad})`;
        li.dataset.id = ticket.id;
        li.addEventListener("click", () => cargarTicket(ticket.id));
        ticketList.appendChild(li);
    });
}

// Función para cargar un ticket en el formulario de edición
function cargarTicket(id) {
    const ticket = gestor.obtenerTicket(id);
    if (ticket) {
        document.getElementById("ticket-id").value = ticket.id;
        document.getElementById("titulo").value = ticket.titulo;
        document.getElementById("descripcion").value = ticket.descripcion;
        document.getElementById("prioridad").value = ticket.prioridad;
        document.getElementById("estado").value = ticket.estado;
        document.getElementById("tiempoEstimado").value = ticket.tiempoEstimado;
        document.getElementById("observaciones").value = ticket.observaciones;
    }
}

// Manejo del formulario para guardar cambios en un ticket
document.getElementById("ticket-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById("ticket-id").value);
    if (!id) return;

    const cambios = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        prioridad: document.getElementById("prioridad").value,
        estado: document.getElementById("estado").value,
        tiempoEstimado: document.getElementById("tiempoEstimado").value,
        observaciones: document.getElementById("observaciones").value,
    };

    gestor.modificarTicket(id, cambios);
    mostrarListaTickets();
});

// Manejo del botón de eliminar ticket
document.getElementById("delete-ticket").addEventListener("click", function () {
    const id = parseInt(document.getElementById("ticket-id").value);
    if (!id) return;

    gestor.eliminarTicket(id);
    document.getElementById("ticket-form").reset();
    mostrarListaTickets();
});

// Función para crear un nuevo ticket de prueba (si la lista está vacía)
function crearTicketDePrueba() {
    if (gestor.tickets.length === 0) {
        gestor.crearTicket("Error en Servidor", "El servidor dejó de responder", "alta", "Abierto", 4);
        gestor.crearTicket("Fallo en Base de Datos", "No carga la base de datos", "media", "En progreso", 3);
        mostrarListaTickets();
    }
}

// Mostrar tickets al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    crearTicketDePrueba();
    mostrarListaTickets();
});

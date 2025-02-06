// =======================
// 🎫 CLASE TICKET
// =======================
class Ticket {
    constructor(id, titulo, descripcion, prioridad) {
        this.id = id; // ID único
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = this.validarPrioridad(prioridad);
        this.fechaCreacion = new Date().toISOString();
    }

    validarPrioridad(prioridad) {
        const niveles = ["Baja", "Media", "Alta"];
        return niveles.includes(prioridad) ? prioridad : "Baja";
    }
}

// =======================
// 🎟 CREACIÓN DE TICKETS
// =======================

document.getElementById("crearTicket").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recargar la página

    // Obtener valores del formulario
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const prioridad = document.getElementById("prioridad").value;

    // Validar que los campos no estén vacíos
    if (!titulo || !descripcion || !prioridad) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Generar ID único basado en timestamp
    const id = Date.now();

    // Crear el objeto Ticket
    const nuevoTicket = new Ticket(id, titulo, descripcion, prioridad);

    // Guardar en localStorage
    guardarEnLocalStorage(nuevoTicket);

    // Limpiar formulario
    document.getElementById("crearTicket").reset();

    // Cerrar modal
    cerrarModal();

    alert("🎉 Ticket creado exitosamente!");

    // Actualizar la tabla con los nuevos datos
    actualizarTablaTickets();
});

// =======================
// 💾 LOCAL STORAGE (GUARDAR Y OBTENER)
// =======================

function guardarEnLocalStorage(ticket) {
    let tickets = obtenerTicketsDesdeLocalStorage();
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

function obtenerTicketsDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("tickets")) || [];
}

// =======================
// 📊 MOSTRAR TICKETS
// =======================

function actualizarTablaTickets() {
    let tickets = obtenerTicketsDesdeLocalStorage();
    let cuerpoTabla = document.getElementById("cuerpoTablaTickets");

    // Limpiar contenido previo
    cuerpoTabla.innerHTML = "";

    tickets.forEach(ticket => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${ticket.id}</td>
            <td>${ticket.titulo}</td>
            <td>${ticket.descripcion}</td>
            <td>${ticket.prioridad}</td>
            <td>${new Date(ticket.fechaCreacion).toLocaleString()}</td>
            <td>
                <button onclick="eliminarTicket(${ticket.id})">🗑 Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// =======================
// ❌ ELIMINAR TICKET
// =======================

function eliminarTicket(id) {
    let tickets = obtenerTicketsDesdeLocalStorage();

    // Filtrar para eliminar el ticket seleccionado
    let nuevosTickets = tickets.filter(ticket => ticket.id !== id);
    
    // Guardar en localStorage
    localStorage.setItem("tickets", JSON.stringify(nuevosTickets));

    // Actualizar la tabla
    actualizarTablaTickets();

    alert("✅ Ticket eliminado correctamente.");
}

// =======================
// 🎭 MODAL (ABRIR Y CERRAR)
// =======================

// Referencias a los elementos del modal
const modal = document.getElementById("createTicketModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

// Evento para abrir el modal
openModalBtn.addEventListener("click", abrirModal);

// Evento para cerrar el modal
closeModalBtn.addEventListener("click", cerrarModal);

// Cerrar el modal al hacer clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        cerrarModal();
    }
});

function abrirModal() {
    modal.style.display = "block";
}

function cerrarModal() {
    modal.style.display = "none";
}

// =======================
// 🔄 INICIALIZAR TABLA AL CARGAR
// =======================
document.addEventListener("DOMContentLoaded", actualizarTablaTickets);

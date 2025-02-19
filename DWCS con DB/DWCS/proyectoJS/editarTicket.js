// ***********************
//  EDITAR TICKET
// ***********************
document.addEventListener("DOMContentLoaded", () => {
    actualizarTablaTickets();
});

function obtenerTicketsDesdeLocalStorage() {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    console.log("Tickets cargados para edición:", tickets);
    return tickets;
}

function actualizarTablaTickets() {
    let tickets = obtenerTicketsDesdeLocalStorage();
    let cuerpoTabla = document.getElementById("cuerpoTablaTickets");

    if (!cuerpoTabla) {
        console.error("No se encontró la tabla de tickets.");
        return;
    }

    // Limpiar contenido previo
    cuerpoTabla.innerHTML = "";

    tickets.forEach(ticket => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${ticket.id}</td>
            <td><input type="text" value="${ticket.titulo}" onchange="editarTicket(${ticket.id}, 'titulo', this.value)"></td>
            <td><input type="text" value="${ticket.descripcion}" onchange="editarTicket(${ticket.id}, 'descripcion', this.value)"></td>
            <td>
                <select onchange="editarTicket(${ticket.id}, 'prioridad', this.value)">
                    <option value="Baja" ${ticket.prioridad === "Baja" ? "selected" : ""}>Baja</option>
                    <option value="Media" ${ticket.prioridad === "Media" ? "selected" : ""}>Media</option>
                    <option value="Alta" ${ticket.prioridad === "Alta" ? "selected" : ""}>Alta</option>
                </select>
            </td>
            <td>${new Date(ticket.fechaCreacion).toLocaleString()}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

function editarTicket(id, campo, valor) {
    let tickets = obtenerTicketsDesdeLocalStorage();
    let ticketIndex = tickets.findIndex(ticket => ticket.id === id);
    
    if (ticketIndex !== -1) {
        tickets[ticketIndex][campo] = valor;
        localStorage.setItem("tickets", JSON.stringify(tickets));
        console.log(`Ticket ${id} actualizado:`, tickets[ticketIndex]);
    }
}
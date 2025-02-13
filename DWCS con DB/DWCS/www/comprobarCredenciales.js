document.addEventListener("DOMContentLoaded", () => {
    const usuarios = [
        { usuario: "usuario1", contrasena: "abc", rol: "user" },
        { usuario: "usuario2", contrasena: "abc", rol: "user" },
        { usuario: "usuario3", contrasena: "abc", rol: "user" }
    ];

    const tecnicos = [
        { usuario: "carol", contrasena: "abc", rol: "tecnico" },
        { usuario: "hugo", contrasena: "abc", rol: "tecnico" },
        { usuario: "julio", contrasena: "abc", rol: "tecnico" }
    ];

    document.getElementById("loginForm").addEventListener("submit", (evento) => {
        evento.preventDefault();

        const usuarioIngresado = document.getElementById("usuario").value;
        const contrasenaIngresada = document.getElementById("password").value;
                
        const usuario = usuarios.find(u => u.usuario === usuarioIngresado && u.contrasena === contrasenaIngresada);
        const tecnico = tecnicos.find(t => t.usuario === usuarioIngresado && t.contrasena === contrasenaIngresada);

        if (usuario) {
            localStorage.setItem("usuarioAutenticado", JSON.stringify(usuario));
            window.location.href = "crearTicket.html";
        } else if (tecnico) {
            localStorage.setItem("usuarioAutenticado", JSON.stringify(tecnico));
            window.location.href = "index.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});

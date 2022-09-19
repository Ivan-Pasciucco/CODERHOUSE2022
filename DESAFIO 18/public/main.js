const socket = io.connect();
const formChat = document.getElementById("formChat");
formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  const fyh = new Date();
  const mensaje = {
    id: Date.now(),
    author: {
      id: document.getElementById("id").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("texto").value,
    fyh: `${fyh.getDate()}/${
      fyh.getMonth() + 1
    }/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`,
  };

  socket.emit("nuevoMensaje", mensaje);
  socket.on("historialGlobal", (data) => {
    const html = data
      .map((elem, index) => {
        return `<div>
            <b style='color:blue;'>${elem.author.id}</b>
            <span style='color:brown'>[${elem.fyh}] : </span>
            <i style='color:green'>${elem.text}</i>
            </div>`;
      })
      .join(" ");
    document.getElementById("mensajes").innerHTML = html;
  });
  document.getElementById("texto").value = "";
});

socket.on("historialChat", (data) => {
  if (data.length !== 0) {
    const html = data
      .map((elem, index) => {
        return `<div>
            <b style='color:blue;'>${elem.author.id}</b>
            <span style='color:brown'>[${elem.fyh}] : </span>
            <i style='color:green'>${elem.text}</i>
            </div>`;
      })
      .join(" ");
    document.getElementById("mensajes").innerHTML = html;
  } else {
    document.getElementById("mensajes").innerHTML = "";
    formChat.reset();
  }
});

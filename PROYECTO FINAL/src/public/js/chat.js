const socket = io();

const sendMess = document.getElementById("sendMess");
const texto = document.getElementById("texto");
const divMensajes = document.getElementById("mensajes");

sendMess.addEventListener("submit", (e) => {
  e.preventDefault();
  const fyh = new Date();
  const mensaje = {
    id: 0,
    email: email,
    tipoUser: "",
    fyh: `${fyh.getDate()}/${
      fyh.getMonth() + 1
    }/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`,
    text: texto.value,
  };

  socket.emit("nuevoMensaje", mensaje);
  socket.on("historialGlobal", (data) => {
    render(data);
  });
  texto.value = "";
});

socket.on("historialChat", (data) => {
  if (data.length !== 0) {
    render(data);
  } else {
    divMensajes.innerHTML = "";
    formChat.reset();
  }
});

function render(data) {
  let color = "";
  let admin = "";
  const html = data
    .map((elem, index) => {
      if (elem.tipoUser === "Administrador") {
        color = "rgba(240, 13, 13, 0.945)";
        admin = "(admin)";
      } else {
        color = "#0B40B2";
      }
      return `<div>
                <b style='color:${color};'>${elem.email}${admin}</b>
                <span>[${elem.fyh}] : </span>
                <b style='color:#08E31C;'><i>${elem.text}</i></b>
            </div>`;
    })
    .join(" ");
  divMensajes.innerHTML = html;
}

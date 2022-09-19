const socket = io.connect();

const formProductos = document.getElementById("formulario");
formProductos.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = {
    id: formProductos[0].value,
    title: formProductos[1].value,
    price: formProductos[2].value,
    thumbnail: formProductos[3].value,
  };

  fetch("/productos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  setTimeout(() => socket.emit("guardar", "guardado con exito"), 500);
  socket.on("historialGuardar", (data) => {
    render(data);
  });

  formProductos.reset();
});

function render(data) {
  if (data.length !== 0) {
    const table = `<tr>
  <th>
    <h5>Name</h5>
  </th>
  <th>
    <h5>Price</h5>
  </th>
  <th>
    <h5>Photo</h5>
  </th>
</tr>`;
    const html = data
      .map((elem, index) => {
        return `<tr>
  <td>${elem.title}</td>
  <td>${elem.price}</td>
  <td><img width="50" src="${elem.thumbnail}"></td>
</tr>`;
      })
      .join(" ");
    const tableComplete = table + html;
    document.getElementById("productos").innerHTML = tableComplete;
  } else {
    const noProducts = `<tr>
  <td>
    <h3 class="text-danger"> No se encontraron productos </h3>
  </td>
</tr>`;
    document.getElementById("productos").innerHTML = noProducts;
  }
}

socket.on("historialProductos", (data) => {
  render(data);
});

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
    // id: Date.now(),
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

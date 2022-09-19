const socket = io.connect()

// tabla productos
// ---------------------------------------------------------------------------------------------------------------------------------------

const formProductos = document.getElementById('formulario')
formProductos.addEventListener('submit',(e) => {
    e.preventDefault()

    const datos = {
        'id': formProductos[0].value,
        'title': formProductos[1].value,
        'price': formProductos[2].value,
        'thumbnail': formProductos[3].value
    }
    
    fetch('/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then( response => {
        if(response.ok) {
            socket.emit('guardar','guardado con exito')
            socket.on('historialGuardar', data => {
                if(data.length !== 0){
                    render(data)
                }
            })
        }
     })
     .catch( error => {
        console.log(error)
     })

    formProductos.reset()

})

function render(data) {
    if(data.length !== 0){
        const table = `<tr><th><h5>Nombre</h5></th><th><h5>Precio</h5></th><th><h5>Foto</h5></th></tr>`
        const html = data
        .map((elem, index) => {
            return `<tr>
            <td>${elem.title}</td>
            <td>${elem.price}</td>
            <td><img width="50" src="${elem.thumbnail}"></td>
            </tr>`
        })
        .join(' ')
        const tableComplete = table + html
        document.getElementById('productos').innerHTML = tableComplete
    }else{
        document.getElementById('productos').innerHTML = ''
    }
}

socket.on('historialProductos', data => {
    render(data)
})

// chat
// -----------------------------------------------------------------------------------------------------------------------------------------

const formChat = document.getElementById('formChat')
formChat.addEventListener('submit',(e) => {
    e.preventDefault()
    const fyh = new Date()
    const mensaje = {
        email: document.getElementById('email').value,
        texto: document.getElementById('texto').value,
        fyh: `${fyh.getDate()}/${(fyh.getMonth() + 1)}/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`
    }
    socket.emit('nuevoMensaje', mensaje)
    socket.on('historialGlobal',data => {
        const html = data
        .map((elem, index) => {
            return `<div>
            <b style='color:blue'>${elem.email}</b>
            <span style='color:brown'>[${elem.fyh}] : </span>
            <i style='color:green'>${elem.texto}</i>
            </div>`
        })
        .join(' ')
        document.getElementById('mensajes').innerHTML = html
    })
    document.getElementById('texto').value = ''
})

socket.on('historialChat', data => {
    if(data.length !== 0){
        const html = data
        .map((elem, index) => {
            return `<div>
            <b style='color:blue'>${elem.email}</b>
            <span style='color:brown'>[${elem.fyh}] : </span>
            <i style='color:green'>${elem.texto}</i>
            </div>`
        })
        .join(' ')
        document.getElementById('mensajes').innerHTML = html
    }else{
        document.getElementById('mensajes').innerHTML = ''
        formChat.reset()
    }
})
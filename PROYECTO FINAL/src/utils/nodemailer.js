const { createTransport } = require("nodemailer");
require("dotenv").config();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAILADMIN,
    pass: process.env.PASSADMIN,
  },
});

async function newUser(data){
  console.log(data);
  try {
      const info =  await transporter.sendMail({
          from: 'Ecommerce en Node.js',
          to: process.env.EMAILADMIN,
          subject: 'Nuevo registro',
          html: `<h2>Nuevo registro de usuario</h2>
              <h3>Datos del usuario:</h3>
              <b>Email:</b> ${data.username}<br>
              <b>Password:</b> ${data.password}<br>
              <b>Nombre:</b> ${data.nombre}<br>
              <b>Numero Telefonico:</b> ${data.numtel}<br>`
      });
  } catch (e) {
      console.log(e)
  }
}

async function newOrder(nombre,email,carrito){
  const car = carrito.productos;
  let productos = ``;
  let total = 0;
  for (let i = 0; i < car.length; i++) {
      let producto = `<b> Descripcion: </b> ${car[i].descripcion} <br>
                      <b> Precio: </b> $${car[i].precio} <br>
                      <b> Categoria: </b> ${car[i].categoria} <br><br>`;
      productos = productos + producto
      total = total + car[i].precio;
  }

  try {
      const info =  await transporter.sendMail({
          from: 'Ecommerce en Node.js',
          to: process.env.EMAILADMIN,
          subject: `Nuevo pedido de ${nombre} - ${email}`,
          html: `<h2>Nuevo Pedido del usuario: ${email}</h2>
              <h2>Detalle del pedido</h2>
              <br> ${productos}
              <h2>Total de la compra: $${total}</h2>`
      });
      return 'correo enviado con exito';
  } catch (e) {
      console.log(e)
  }
}

module.exports = {newUser,newOrder};
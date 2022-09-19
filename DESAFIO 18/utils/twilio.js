const log4js = require("../utils/logs");
const logError = log4js.getLogger("error");
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.ACCOUNTID, process.env.AUTHTOKEN);

async function newOrderWp(nombre, email, carrito) {
  const car = carrito.productos;
  let productos = ``;
  let total = 0;
  for (let i = 0; i < car.length; i++) {
    let producto = `*Codigo:* ${car[i].codigo}
        *Nombre:* ${car[i].nombre}
        *Descripcion:* ${car[i].descripcion}
        *Precio:* $${car[i].precio}

        `;
    productos = productos + producto;
    total = total + car[i].precio;
  }

  try {
    const message = await client.messages.create({
      body: `Nuevo pedido de ${nombre} - ${email}

            *Detalle del pedido*
            ${productos}
            Total de la compra: $${total}`,
      from: process.env.TWILIOWP,
      to: process.env.NUMADMIN,
    });
    return "WhatsApp enviado con exito";
  } catch (e) {
    logError.error(e);
  }
}

async function newOrderSms(numTel) {
  try {
    const message = await client.messages.create({
      body: "Su pedido se ha recibido y se encuentra en proceso, muchas gracias por su compra.",
      from: process.env.NUMTWILIO,
      to: numTel,
    });
    return "SMS enviado con exito";
  } catch (e) {
    logError.error(e);
  }
}

module.exports = { newOrderWp, newOrderSms };

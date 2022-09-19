class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
  }

  addMascotas(mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas() {
    console.log(`Cantidad de mascotas: ${this.mascotas.length}`);
  }
  addBook(titulo, autor) {
    this.libros.push({ titulo, autor });
  }
  getBookNames() {
    let book = this.libros.map((books) => books.titulo);
    console.log(` Titulo de libros: ${book}`);
  }
}

const user = new Usuario(
  "Ivan",
  "Pasciucco",
  [
    {
      titulo: "La odisea",
      autor: "Homero",
    },
    {
      titulo: "Los ojos del perro siberiano",
      autor: "Alejandro Santa Ana",
    },
  ],
  ["Perro", "Gato", "Pato", "Sapo"]
);

user.getFullName();
user.addMascotas("Raton");
user.countMascotas();
user.addBook("Cronica de una muerte anunciada", "Gabriel Garcia Marquez");
user.getBookNames();

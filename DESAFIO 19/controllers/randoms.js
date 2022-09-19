class Random {
  constructor() {}

  generarRandom(cantidad) {
    let cant = 0;
    const nums = [];
    const objNum = {};

    cantidad ? (cant = parseInt(cantidad)) : (cant = 100000000);

    for (let i = 0; i < cant; i++) {
      let num = Math.floor(Math.random() * (1001 - 1) + 1);
      nums.push(num);
      objNum[num] ? objNum[num]++ : (objNum[num] = 1);
    }
    return objNum;
  }
}

const random = new Random();

module.exports = random;

class ChatDto{

    constructor(datos){
        this.id = datos.author.id;
        this.fyh = datos.fyh;
        this.text = datos.text;
    }
}

module.exports = ChatDto;
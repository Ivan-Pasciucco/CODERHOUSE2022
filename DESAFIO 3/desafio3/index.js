const express = require('express');
const app = express();
const PORT = 8080

const server = app.listen(PORT , ()=>{
    console.log(`listening on port : ${server.address().port}`)
});
let frase = {}
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

frase.fraseCompleta = ['frase inicial' , 'Auto' ,'Gato' , 'Celular']

app.get('/api/frase' , (req, res) =>{
    res.send(frase)
})
//Por lo general, se usa json, y se envían dos propiedades. Data y Status 
app.get('/api/frase/:pos',(req, res) =>{
res.send(frase.fraseCompleta[req.params.pos])
})

app.post('/api/palabras',(req, res)=>{
   
    let indice =  frase.fraseCompleta.push(req.body.palabra)
    res.json(indice-1)
})
app.delete('/api/palabras:pos',(req, res)=>{

    frase.fraseCompleta.splice(req.params.pos, 1,'')
})
//ver final de la clase y anotar cuando usar params

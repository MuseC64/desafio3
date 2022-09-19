const express = require('express')
const app = express()
const Contenedor = require('./contenedor')

app.get('/', (req,res) => {
    res.send('<h1 style="color:blue;"> Bienvenidos al servidor expres</h1>')
})


let contenedor = new Contenedor('productos.txt')

const getProductList = async() => {
    const listP = JSON.stringify(await contenedor.getAll())
    return listP
}

const getRandomProduct = async() => {
    const min = 1
    const listP = await contenedor.getAll()
    const max = listP.length
    console.log(min,max)
    let id_rand = Math.floor(Math.random()*(max-min)+min)
    let prodRand = JSON.stringify(await contenedor.getById(id_rand))
    return prodRand
}
app.get('/productos', async (req,res) => {
    res.send(`Los productos disponibles son: ${(await getProductList())}`)
    
})

app.get('/productoRandom', async (req,res) => {
    res.send(`Un producto aleatorio del catálogo es: ${(await getRandomProduct())}`)
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
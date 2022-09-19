const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file 
    }

    // Obtiene un Objeto correspondiente al archivo asociado con la clase Contenedor.
    // Este objeto contiene la totalidad del contenido del archivo, el cual corresponde a un array.
    // En caso de no poder obtener el contenido y genera error, se asume es porque el archivo en cuestión no existe
    async getAll(){
        try{
            let contenido  = await fs.promises.readFile(this.file)
            let contenidoObj = JSON.parse(contenido)
            return contenidoObj

        }
        catch (err)
        {
            console.log("El archivo referenciado no existe")
        }

    }

    // Guarda un producto en el archivo asociado con la clase Contenedor
    async save(producto){
        try{ 
            let contenidoObj = await this.getAll()
            let newId = 1;
            const nId = contenidoObj.length
            if(nId > 0){
                newId = nId + 1;
            }

            producto.id = newId;

            contenidoObj.push(producto)
            await fs.promises.writeFile(this.file, JSON.stringify(contenidoObj))
//            console.log('Agregado')
        }
        catch (err) {
            console.log("No fue posible agregar el producto")
        }
    }

    // Obtiene el producto asociado al ID id y devuelve el objeto asociado a dicho producto
    async getById(id){
        try{ 
            let contenidoObj = await this.getAll()
            let prodSelect = contenidoObj.find(prod => prod.id == id)
//            console.log(prodSelect)
            return prodSelect
        }
        catch (err) {
            console.log("No existe el producto asociado con el ID insertado")
        }
    }

    // Elimina el producto asociado al ID id del archivo asociado a la clase Contenedor
    async deleteById(id){
        try{ 
            let contenidoObj = await this.getAll()
            let contenidoFiltrado = contenidoObj.filter(prod => prod.id != id)
            await fs.promises.writeFile(this.file, JSON.stringify(contenidoFiltrado))
        }
        catch (err) {
            console.log("No existe un producto con el ID insertado")
        }
    }

    // Elimina todos los productos del archivo asociado a la clase Contenedor
    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }

}

module.exports = Contenedor


//let contenido = contenedor.getAll()
//console.log(contenido[0])
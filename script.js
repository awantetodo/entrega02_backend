const { rejects } = require('assert');
const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async save(title, price, thumbnail) {
        try {
            const data = await fs.promises.readFile(`./${this.nombre}`, 'utf8')
            const arrayProductos = JSON.parse(data);
            arrayProductos.push({
                id: arrayProductos.length + 1,
                title: title,
                price: price,
                thumbnail: thumbnail
            });
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(arrayProductos, null, '\t'));

        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            await fs.promises.unlink(`./${this.nombre}`, 'utf8')
        } catch (error) {
            throw error;
        }
    }

    async getByID(id) {
        return this.data.find(p => p.id == id)
    }

    async deleteById(id) {
        const idx = this.data.findIndex(p => p.id == id)
        this.data.splice(idx, 1)

        this.write()
    }

    getAll() {
        this.data = []

        console.log(this.getAll)
    }
}

let contenedor1 = new Contenedor("productos.txt");

contenedor1.save("Producto test", 8, "www.test.com")
    .then(data => { console.log("Se guardó correctamente el producto") })
    .catch(error => { console.log("Error al guardar el archivo") })

contenedor1.deleteAll()
    .then(data => { console.log("Se pudo borrar el archivo correctamente") })
    .catch(error => { console.log("Error al borrar el archivo") })

contenedor1.getByID()
    .then(data => { console.log("Se pudo encontrar el id en el archivo correctamente") })
    .catch(error => { console.log("Error al ecnontrar el id en el archivo") })

contenedor1.deleteById()
    .then(data => { console.log("Se pudo borrar el id en archivo correctamente") })
    .catch(error => { console.log("Error al borrar el id en archivo") })

contenedor1.getAll()

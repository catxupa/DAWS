import { Router } from "express"
import { categoriacontroler } from "../controler/categoria.controler.js"


const categoriaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const rota = Router()

rota.post(categoriaRoute.create, categoriacontroler.createCategoria)
rota.get(categoriaRoute.getById, categoriacontroler.getCategoriaById)
rota.get(categoriaRoute.getAll, categoriacontroler.getAllCategoria)
rota.put(categoriaRoute.update, categoriacontroler.updateCategoria)
rota.delete(categoriaRoute.delete, categoriacontroler.deleteCategoria)


export { rota }
import { Router } from "express"
import { prestadorControler } from "../controler/prestador.controler.js"


const prestadorRoute = {
    create: "/create",
    getById: "/get-prestador-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const ruter = Router()

// rota para inserir um novo prestador na base de dados !*
ruter.get(prestadorRoute.getALL, prestadorControler.getAllPrestadores)
ruter.get(prestadorRoute.getById, prestadorControler.getPrestadorById)
ruter.post(prestadorRoute.create, prestadorControler.createPrestador)
ruter.put(prestadorRoute.update, prestadorControler.updatePrestador)
ruter.delete(prestadorRoute.delete, prestadorControler.deletePrestador)

export { ruter }

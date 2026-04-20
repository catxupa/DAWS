import { Router } from "express"
import { prestadorControler } from "../controler/prestador.controler.js"
import authMiddelware, { autorized } from "../security/auth.middelware.js"
import { Role } from "../util/types.js"


const prestadorRoute = {
    create: "/create",
    getById: "/get-prestador-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const ruter = Router()

// rotas que precisam de autenticação  
ruter.use(authMiddelware)
ruter.get(prestadorRoute.getALL, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), prestadorControler.getAllPrestadores)
ruter.get(prestadorRoute.getById, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), prestadorControler.getPrestadorById)
ruter.post(prestadorRoute.create, autorized([Role.ADMIN]), prestadorControler.createPrestador)
ruter.put(prestadorRoute.update, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestadorControler.updatePrestador)
ruter.delete(prestadorRoute.delete, autorized([Role.ADMIN]), prestadorControler.deletePrestador)

export { ruter }

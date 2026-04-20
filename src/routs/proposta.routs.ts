import { Router } from "express"
import { propostaControler } from "../controler/proposta.controler.js"
import authMiddelware, { autorized, isOwner } from "../security/auth.middelware.js"
import { Role } from "../util/types.js"
import { propostaModel } from "../models/proposta.models.js"


const propostaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id"
}

const ruterss = Router()


// rotas que precisam de autenticação
ruterss.use(authMiddelware)
ruterss.post(propostaRoute.create, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), propostaControler.createProposta)

ruterss.get(propostaRoute.getById, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA,]), propostaControler.getPropostaById)

ruterss.get(propostaRoute.getALL, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), propostaControler.getAllPropostas)

ruterss.put(propostaRoute.update, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), isOwner(propostaModel, "owner"), propostaControler.updateProposta)

ruterss.delete(propostaRoute.delete, autorized([Role.ADMIN, Role.PRESTADOR]), isOwner(propostaModel, "owner"), propostaControler.deleteProposta)

ruterss.put(propostaRoute.aceitar, autorized([Role.ADMIN, Role.CLIENTE]), propostaControler.aceitarProposta)

export { ruterss } 

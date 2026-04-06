import { Router } from "express"
import { propostaControler } from "../controler/proposta.controler.js"


const propostaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id"
}

const ruterss = Router()

// rota para inserir nova proposta na base de dados !*
ruterss.post(propostaRoute.create, propostaControler.createProposta)
ruterss.get(propostaRoute.getById, propostaControler.getPropostaById)
ruterss.get(propostaRoute.getALL, propostaControler.getAllPropostas)
ruterss.put(propostaRoute.update, propostaControler.updateProposta)
ruterss.delete(propostaRoute.delete, propostaControler.deleteProposta)
ruterss.put(propostaRoute.aceitar, propostaControler.aceitarProposta)

export { ruterss }

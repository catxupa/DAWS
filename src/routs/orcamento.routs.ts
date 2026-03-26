import { Router } from "express"
import { orcamentoControler } from "../controler/orcamento.controler.js"


const orcamentoRoute = {
    create: "/create",
    getById: "/get-orcamento-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const ruters = Router()

// rota para inserir um novo orcamento na base de dados !*
ruters.post(orcamentoRoute.create, orcamentoControler.createOrcamento)
ruters.get(orcamentoRoute.getById, orcamentoControler.getOrcamento)
ruters.get(orcamentoRoute.getALL, orcamentoControler.getAllOrcamentos)
ruters.put(orcamentoRoute.update, orcamentoControler.updateOrcamento)
ruters.delete(orcamentoRoute.delete, orcamentoControler.deleteOrcamento)

export { ruters }
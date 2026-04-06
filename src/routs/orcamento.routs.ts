import { Router } from "express"
import { orcamentoControler } from "../controler/orcamento.controler.js"
import type { getUserById } from "../user.js"
 


const orcamentoRoute = {
    create: "/create",
    getById: "/get-by-id/:id", 
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    calcular: "/calcular/:id",
    getOrcamentoPorId: "/get-orcamento-por-id/:id"
    
}

const ruters = Router()

// rota para inserir um novo orcamento na base de dados !*
ruters.post(orcamentoRoute.create, orcamentoControler.createOrcamento)
ruters.get(orcamentoRoute.getById, orcamentoControler.getOrcamento)
ruters.get(orcamentoRoute.getALL, orcamentoControler.getAllOrcamentos)
ruters.put(orcamentoRoute.update, orcamentoControler.updateOrcamento)
ruters.delete(orcamentoRoute.delete, orcamentoControler.deleteOrcamento)
ruters.put(orcamentoRoute.calcular, orcamentoControler.calcularOrcamento)
ruters.get(orcamentoRoute.getOrcamentoPorId, orcamentoControler.getOrcamentoPorId)


export { ruters }
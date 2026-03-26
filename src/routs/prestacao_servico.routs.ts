import { Router } from "express"
import { prestacaoControler } from "../controler/prestacao.controler.js"


const prestacao_servicoRoute = {
    create: "/create",
    getById: "/get-prestacao-servico-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const ruterrs = Router()

// rota para inserir um novo prestacao_servico na base de dados !*
ruterrs.post(prestacao_servicoRoute.create, prestacaoControler.createPrestacaoServico)
ruterrs.get(prestacao_servicoRoute.getById, prestacaoControler.getPrestacaoServicoById)
ruterrs.get(prestacao_servicoRoute.getALL, prestacaoControler.getAllPrestacoesServico)
ruterrs.put(prestacao_servicoRoute.update, prestacaoControler.updatePrestacaoServico)
ruterrs.delete(prestacao_servicoRoute.delete, prestacaoControler.deletePrestacaoServico)

export { ruterrs }
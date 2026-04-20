import { Router } from "express"
import { prestacaoControler } from "../controler/prestacao.controler.js"
import authMiddelware, { autorized } from "../security/auth.middelware.js"
import { Role } from "../util/types.js"


const prestacao_servicoRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllDetalhada: "/get-all-detalhada",
    getPrestacaocategoria: "/get-by-categoria"

}

const ruterrs = Router()

// rotas que não precisam de autenticação
ruterrs.get(prestacao_servicoRoute.getALL, prestacaoControler.getAllPrestacoesServico)
ruterrs.get(prestacao_servicoRoute.getPrestacaocategoria, prestacaoControler.getAllPrestacaoServicoDetalhadaByCategoria)

// rotas que precisam de autenticação
ruterrs.post(prestacao_servicoRoute.create, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestacaoControler.createPrestacaoServico)

// rotas que precisam de autenticação
ruterrs.use(authMiddelware)
ruterrs.put(prestacao_servicoRoute.update, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestacaoControler.updatePrestacaoServico)
ruterrs.delete(prestacao_servicoRoute.delete, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestacaoControler.deletePrestacaoServico)
ruterrs.get(prestacao_servicoRoute.getAllDetalhada, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), prestacaoControler.getAllPrestacaoServicoDetalhada)

export { ruterrs }
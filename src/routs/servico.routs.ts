import { Router } from "express"
import { servicoController } from "../controler/servico.controlers.js"
import authMiddelware, { autorized } from "../security/auth.middelware.js"
import { Role } from "../util/types.js"



const serviceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getServicoDetalhado: "/get-servico-detalhado"
}

const router = Router()
// rotas que não precisam de autenticação
router.get(serviceRoute.getALL, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), servicoController.getAllServicos)
router.get(serviceRoute.getById, autorized([Role.ADMIN]), servicoController.getServicoById)
router.get(serviceRoute.getServicoDetalhado, servicoController.getAllServicoDetalhada)

// rotas que precisam de autenticação
router.use(authMiddelware)
router.post(serviceRoute.create, autorized([Role.ADMIN]), servicoController.createServico)
router.put(serviceRoute.update, autorized([Role.ADMIN]), servicoController.updateServico)
router.delete(serviceRoute.delete, autorized([Role.ADMIN]), servicoController.deleteService)




export { router }


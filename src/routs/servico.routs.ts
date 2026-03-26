import { Router } from "express"
import { servicoController } from "../controler/servico.controlers.js"


const serviceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

// rota para selecionar todos os servicos na base de dados
router.get(serviceRoute.getALL, servicoController.getAllServicos)

// rota para selecionar um servico por id
router.get(serviceRoute.getById, servicoController.getServicoById)

// rota para inserir um novo servico
router.post(serviceRoute.create, servicoController.createServico)

// rota para atualizar um servico
router.put(serviceRoute.update, servicoController.updateServico)

// rota para apagar um servico
router.delete(serviceRoute.delete, servicoController.deleteService)


export { router }


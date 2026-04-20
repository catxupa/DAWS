import { Router } from "express"
import { empresaControler } from "../controler/empresa.controler.js"


const empresaRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/get-all-empresa",
    update: "/update/:id",
    delete: "/delete/:id"
}

const rotaa = Router()

rotaa.post(empresaRoute.create, empresaControler.createEmpresa)
rotaa.get(empresaRoute.getById, empresaControler.getEmpresaById)
rotaa.get(empresaRoute.getAll, empresaControler.getAllEmpresas)
rotaa.put(empresaRoute.update, empresaControler.updateEmpresa)
rotaa.delete(empresaRoute.delete, empresaControler.deleteEmpresa)


export { rotaa }
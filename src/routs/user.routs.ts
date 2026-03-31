import { Router } from "express"
import { userControlers } from "../controler/user.controlers.js"
import authMiddelware from "../security/auth.middelware.js"



const userRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login"
}

const rOuter = Router()

// rota para selecionar todos os utilizadores na base de dados
rOuter.get(userRoute.getALL, authMiddelware, userControlers.getUser)

// rota para inserir um novo utilizador
rOuter.post(userRoute.create, userControlers.novoutilizador)

// rota para selecionar um utilizador por id
rOuter.get(userRoute.getById, userControlers.getUserById)

// rota para atualizar um utilizador
rOuter.put(userRoute.update, userControlers.updateduser)

// rota para apagar um utilizador
rOuter.delete(userRoute.delete, userControlers.deleteuser)

// rota para login
rOuter.post(userRoute.login, userControlers.Login)


export { rOuter }
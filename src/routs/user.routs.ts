import { Router } from "express"
import { userControlers } from "../controler/user.controlers.js"
import authMiddelware, { autorized } from "../security/auth.middelware.js"
import { Role } from "../util/types.js"



const userRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getALL: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login",
    updatePassword: "/update-password/:id",
    resetPassword: "/reset-password/:id"
}

const rOuter = Router()
// rotas que não precisam de autenticação
rOuter.post(userRoute.login, userControlers.Login)
rOuter.post(userRoute.create, userControlers.novoutilizador) 

// rotas que precisam de autenticação
rOuter.use(authMiddelware)
rOuter.get(userRoute.getALL, autorized([Role.ADMIN]), userControlers.getUser)
rOuter.get(userRoute.getById, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), userControlers.getUserById)
rOuter.put(userRoute.update, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), userControlers.updateduser)
rOuter.delete(userRoute.delete, autorized([Role.ADMIN]), userControlers.deleteuser)
rOuter.put(userRoute.updatePassword, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), userControlers.updatePassword)
rOuter.put(userRoute.resetPassword, autorized([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, Role.CLIENTE]), userControlers.resetPassword)


export { rOuter }
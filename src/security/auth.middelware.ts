import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                role: string
            }
        }
    }
}
//funcao para verificar se o utilizador esta autenticado e autorizado
export default function authMiddelware(req: Request, res: Response, next: NextFunction) {
    //obter o header de autorizacao
    const authHeader = req.headers.authorization;
    //verificar se o header de autorizacao existe
    if (!authHeader) {
        return res.status(401).json({
            message: "utilizador nao autenticado",
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string, email: string, role: string };

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: "utilizador nao autorizado",
        })
    }
}

//funcao para verificar se o utilizador tem a role correta
export function autorized(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                message: "utilizador nao autorizado",
            })
        }
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                message: "utilizador nao autorizado",
            })
        }
        next()
    }
}
//funcao para verificar se o utilizador é o dono da entidade
export function isOwner(model: any, field: string) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const userid = req.user?.id

        const { id } = req.params

        const entity = await model.get(id as string)

        if (!entity) return res.status(404).json({
            message: "entidade nao encontrada"
        })

        if (!entity) return res.status(401).json({
            message: "utilizador  nao encontrada"
        })

        if (entity[field] !== userid) return res.status(403).json({
            message: "permicao insuficiente"
        })

        next()

    }
}





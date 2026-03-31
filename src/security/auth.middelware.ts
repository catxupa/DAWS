import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string);
        next();
    } catch (error) {   
        return res.status(401).json({
            message: "utilizador nao autorizado",
        })
    }
}
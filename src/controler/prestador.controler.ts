import { prestadorModel } from "../models/prestador.models.js"
import type { NovoprestadorType } from "../util/types.js"
import type { Request, Response } from "express"

export const prestadorControler = {

   // criar prestador
   async createPrestador(req:Request,res:Response) {
    const novoPrestador:NovoprestadorType = req.body
    if(!novoPrestador){
        return res.status(400).json({
            status: "error",
            message: "dados invalidos",
            data: null
        })
    }
    const createPrestadorResponse = await prestadorModel.novoPrestador(novoPrestador)
    if(!createPrestadorResponse){
        return res.status(500).json({
            status: "error",
            message: "erro ao criar prestador",
            data: null
        })
    }
    return res.status(200).json({
        status: "success",
        message: "prestador criado com sucesso",
        data: createPrestadorResponse
    })
   },

   // buscar todos os prestadores
   async getAllPrestadores(req:Request,res:Response) {
    const prestadores = await prestadorModel.getAllPrestadores()
    if(!prestadores){
        return res.status(500).json({
            status: "error",
            message: "erro ao buscar prestadores",
            data: null
        })
    }
    return res.status(200).json({
        status: "success",
        message: "prestadores buscados com sucesso",
        data: prestadores
    })
   },

   // buscar prestador por id
   async getPrestadorById(req:Request,res:Response) {
    const id = req.params.id
    const prestador = await prestadorModel.getPrestadorById(id as string)
    if(!prestador){
        return res.status(500).json({
            status: "error",
            message: "erro ao buscar prestador",
            data: null
        })
    }
    return res.status(200).json({
        status: "success",
        message: "prestador buscado com sucesso",
        data: prestador
    })
   },

   // atualizar prestador
   async updatePrestador(req:Request,res:Response) {
    const id = req.params.id
    const prestadorAtualizado:NovoprestadorType = req.body
    if(!prestadorAtualizado){
        return res.status(400).json({
            status: "error",
            message: "dados invalidos",
            data: null
        })
    }
    const prestador = await prestadorModel.updatePrestador(id as string, prestadorAtualizado)
    if(!prestador){
        return res.status(500).json({
            status: "error",
            message: "erro ao atualizar prestador",
            data: null
        })
    }
    return res.status(200).json({
        status: "success",
        message: "prestador atualizado com sucesso",
        data: prestador
    })
   },

   // apagar prestador
   async deletePrestador(req:Request,res:Response) {
    const id = req.params.id
    const prestador = await prestadorModel.deletePrestador(id as string)
    if(!prestador){
        return res.status(500).json({
            status: "error",
            message: "erro ao apagar prestador",
            data: null
        })
    }
    return res.status(200).json({
        status: "success",
        message: "prestador apagado com sucesso",
        data: prestador
    })
   }

}
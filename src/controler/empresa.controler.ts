import type { Request, Response } from "express"
import { empresaModel } from "../models/empresa.models.js"
import type { NovaEmpresaType, ResponseType } from "../util/types.js"

//controler para criar empresa
export const empresaControler = {
    async createEmpresa(req: Request, res: Response) {
        try {
            const empresa = req.body
            const novaEmpresa = await empresaModel.createEmpresa(empresa)
            if (!novaEmpresa) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao criar empresa",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response: ResponseType<NovaEmpresaType> = {
                status: "success",
                message: "Empresa criada com sucesso",
                data: novaEmpresa
            }
            return res.status(201).json(response) 
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    //controler para obterempresa por id
    async getEmpresaById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const empresa = await empresaModel.getEmpresaById(id as string)
            if (!empresa) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Empresa nao encontrada",
                    data: null
                }
                return res.status(404).json(response)
            }
            const response: ResponseType<NovaEmpresaType> = {
                status: "success",
                message: "Empresa encontrada com sucesso",
                data: empresa
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao obter empresa",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    //controler para obter todas as empresas
    async getAllEmpresas(req: Request, res: Response) {
        try {
            const empresas = await empresaModel.getAllEmpresas()
            if (!empresas) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Empresas nao encontradas",
                    data: null
                }
                return res.status(404).json(response)
            }
            const response: ResponseType<NovaEmpresaType> = {
                status: "success",
                message: "Empresas encontradas com sucesso",
                data: empresas
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao obter empresas",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    //controler para atualizar empresa
    async updateEmpresa(req: Request, res: Response) {
        try {
            const { id } = req.params
            const empresa = req.body
            const updatedEmpresa = await empresaModel.updateEmpresa(id as string, empresa)
            if (!updatedEmpresa) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao atualizar empresa",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response: ResponseType<NovaEmpresaType> = {
                status: "success",
                message: "Empresa atualizada com sucesso",
                data: updatedEmpresa
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    //controler para apagar empresa
    async deleteEmpresa(req: Request, res: Response) {
        try {
            const { id } = req.params
            const deletedEmpresa = await empresaModel.deleteEmpresa(id as string)
            if (!deletedEmpresa) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao apagar empresa",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response: ResponseType<NovaEmpresaType> = {
                status: "success",
                message: "Empresa apagada com sucesso",
                data: deletedEmpresa
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
    },


}



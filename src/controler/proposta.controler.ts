import db from "../lib/db.js"
import { propostaModel } from "../models/proposta.models.js"
import type { NovapropostaType, ResponseType } from "../util/types.js"
import { response, type Request, type Response } from "express"


// controlador para criar proposta
export const propostaControler = {
    async createProposta(req: Request, res: Response) {

        const novaProposta: NovapropostaType = req.body

        if (!novaProposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null

            }
            return res.status(400).json(response)
        }

        const createPropostaResponse = await propostaModel.createProposta(novaProposta)

        if (!createPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao criar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovapropostaType> = {
            status: "success",
            message: "proposta criada com sucesso",
            data: createPropostaResponse
        }
        return res.status(200).json(response)
    },

    // controlador para atualizar proposta
    async updateProposta(req: Request, res: Response) {
        const id = req.params.id
        const updatedProposta: NovapropostaType = req.body
        if (!updatedProposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updatePropostaResponse = await propostaModel.updateProposta(id as string, updatedProposta)

        if (!updatePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao atualizar prestador",
                data: null

            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovapropostaType> = {
            status: "success",
            message: "proposta atualizada com sucesso",
            data: updatePropostaResponse

        }
        return res.status(200).json(response)
    },


    // controlador para apagar proposta
    async deleteProposta(req: Request, res: Response) {
        const id = req.params.id
        const deletePropostaResponse = await propostaModel.deleteProposta(id as string)

        if (!deletePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao apagar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<null> = {
            status: "success",
            message: "proposta apagada com sucesso",
            data: null
        }
        return res.status(200).json(response)
    },

    // controlador para buscar proposta por id
    async getPropostaById(req: Request, res: Response) {
        try {
            const id = req.params.id
            const getPropostaByIdResponse = await propostaModel.getPropostaById(id as string)
            if (!getPropostaByIdResponse) {

                const response: ResponseType<null> = {
                    status: "error",
                    message: "proposta nao encontrada",
                    data: null
                }
                return res.status(404).json(response)
            }
            const response: ResponseType<NovapropostaType> = {
                status: "success",
                message: "proposta buscada com sucesso",
                data: getPropostaByIdResponse
            }
            return res.status(200).json(response)
        }

        catch (error) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao buscar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    // controlador para buscar todas as propostas
    async getAllPropostas(req: Request, res: Response) {
        const getAllPropostasResponse = await propostaModel.getAllPropostas()
        if (!getAllPropostasResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao buscar proposta",
                data: null
            }
            return res.status(400).json(response)
        }
        const response: ResponseType<NovapropostaType> = {
            status: "success",
            message: "proposta buscada com sucesso",
            data: getAllPropostasResponse
        }
        return res.status(200).json(response)
    },


    // controlador para aceitar proposta
    async aceitarProposta(req: Request, res: Response) {
        const propostaId = Number(req.params.id); // ID da proposta escolhida
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            // 1. Descobrir a qual prestação essa proposta pertence
            const [resultado] = await connection.query(
                "SELECT id_prestacao FROM tabela_proposta WHERE id = ?",
                [propostaId]
            );

            if (!Array.isArray(resultado) || resultado.length === 0) {
                await connection.rollback();
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Proposta não encontrada",
                    data: null
                }
                return res.status(404).json(response)
            }

            const idPrestacao = await Number((resultado as any)[0].id_prestacao);

            // 2. Marcar a proposta escolhida como "Aceite"
            const updatePropostaResponse = await connection.execute(
                "UPDATE tabela_proposta SET estado = 'aceite' WHERE id = ?",
                [propostaId]
            );

            // 3. Rejeitar todas as outras propostas ligadas à mesma prestação
            const updatePropostaResponse2 = await connection.execute(
                "UPDATE tabela_proposta SET estado = 'recusado' WHERE id_prestacao = ? AND id != ?",
                [idPrestacao, propostaId]
            );

            await connection.commit();
            const response: ResponseType<NovapropostaType> = {
                status: "success",
                message: "Proposta aceita com sucesso",
                data: null
            }
            return res.json(200).json(response)
        }
        catch (error: any) {
            if (connection) await connection.rollback();
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao aceitar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
        finally {
            if (connection) connection.release();
        }
    }
}
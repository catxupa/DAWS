import { orcamentoModel } from "../models/orcamento.models.js"
import type { Request, Response } from "express"
import type { NovoOrcamentoType, ResponseType, NovaprestacaoType, NovapropostaType, NovoprestadorType } from "../util/types.js"
import db from "../lib/db.js"
import type { RowDataPacket } from "mysql2"



export const orcamentoControler = {
    //controlador para atualizar orcamento
    async updateOrcamento(req: Request, res: Response) {
        //recebe o id do orcamento e os dados do orcamento
        const { id } = req.params
        const updatedOrcamento: NovoOrcamentoType = req.body

        if (!updatedOrcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const updatedOrcamentoResponse: NovoOrcamentoType | null = await orcamentoModel.updateOrcamento(id as string, updatedOrcamento)

        if (!updatedOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovoOrcamentoType> = {
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updatedOrcamentoResponse
        }
        return res.status(200).json(response)
    },

    //controlador para criar orcamento
    async createOrcamento(req: Request, res: Response) {
        const orcamento: NovoOrcamentoType = req.body
        if (!orcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const createdOrcamentoResponse: NovoOrcamentoType | null = await orcamentoModel.createOrcamento(orcamento)

        if (!createdOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovoOrcamentoType> = {
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createdOrcamentoResponse
        }
        return res.status(200).json(response)
    },

    //controlador para apagar orcamento
    async deleteOrcamento(req: Request, res: Response) {
        const { id } = req.params

        const deleteOrcamentoResponse = await orcamentoModel.deleteOrcamento(id as string)
        if (!deleteOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovoOrcamentoType> = {
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        }
        return res.status(200).json(response)
    },

    //controlador para obter orcamento por id
    async getOrcamento(req: Request, res: Response) {
        const { id } = req.params
        const orcamentoResponse = await orcamentoModel.getOrcamento(id as string)
        if (!orcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            }
            return res.status(404).json(response)
        }
        const response: ResponseType<NovoOrcamentoType> = {
            status: "success",
            message: "Orcamento obtido com sucesso",
            data: orcamentoResponse
        }
        return res.status(200).json(response)
    },

    //controlador para obter todos os orcamentos
    async getAllOrcamentos(req: Request, res: Response) {
        const orcamentosResponse = await orcamentoModel.getAllOrcamentos()
        if (!orcamentosResponse) {
            const response: ResponseType<NovoOrcamentoType> = {
                status: "error",
                message: "Erro ao obter orcamentos",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovoOrcamentoType> = {
            status: "success",
            message: "Orcamentos obtidos com sucesso",
            data: orcamentosResponse
        }
        return res.status(200).json(response)
    },

    // Controlador para calcular orçamento final
    async calcularOrcamento(req: Request, res: Response) {
        try {
            const { id } = req.params

            // Buscar a prestação de serviço associada a este orçamento
            const [rows]: any = await db.query<RowDataPacket[]>(
                "SELECT * FROM tabela_prestacao_servicos WHERE id_orcamento = ?",
                [id]
            );

            if (Array.isArray(rows) && rows.length === 0) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Orçamento não encontrado ou sem prestação de serviço associado",
                    data: null
                }
                return res.status(404).json(response)
            }

            const tabela_prestacao_servicos = rows[0] as RowDataPacket;
            const prestacao_servicos = tabela_prestacao_servicos.id;
            const id_prestador = tabela_prestacao_servicos.id_prestador;

            //Buscar propostas dessa prestação
            const [propostas] = await db.query<RowDataPacket[]>(
                `SELECT * FROM tabela_proposta WHERE id_prestacao = ?`,
                [prestacao_servicos]
            );

            //Verificar proposta aceite
            const propostaAceite = propostas.find((proposta: any) =>
                proposta.estado === "aceite");

            if (!propostaAceite) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Nenhuma proposta aceite encontrada para esta prestação de serviço",
                    data: null
                }
                return res.status(404).json(response)
            }

            const preco_hora = propostaAceite.preco_hora;
            const hora_estimada = propostaAceite.hora_estimada;

            //Buscar dados do prestador
            const [prestadores] = await db.query<RowDataPacket[]>(
                `SELECT taxa_urgencia,      
                    minimo_desconto, 
                    percentagem_desconto 
                FROM tabela_prestadores 
                WHERE id = ?`,
                [id_prestador]
            );

            if (!Array.isArray(prestadores) || prestadores.length === 0) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Prestador não encontrado",
                    data: null
                }
                return res.status(404).json(response)
            }

            const prestador = prestadores[0] as RowDataPacket;
            const { taxa_urgencia,
                minimo_desconto,
                percentagem_desconto } = prestador;

            console.log(taxa_urgencia,
                minimo_desconto,
                percentagem_desconto,
                preco_hora,
                hora_estimada);

            // Calcular total
            let total: number = parseInt(preco_hora) * parseInt(hora_estimada);
            // Se tiver taxa de urgência associada (garantindo conversão se vier 20 em vez de 0.20)
            if (taxa_urgencia) {
                const multiplicadorUrgencia = taxa_urgencia > 1 ? taxa_urgencia / 100 : taxa_urgencia;
                total += (total * multiplicadorUrgencia);
            }

            // Se atingir o mínimo para desconto (garantindo conversão se vier 10 em vez de 0.10)
            if (total >= minimo_desconto) {
                const multiplicadorDesconto = percentagem_desconto > 1 ? percentagem_desconto / 100 : percentagem_desconto;
                total -= total * multiplicadorDesconto;
            }
            if (isNaN(total)) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro no calculo: valores invalidos",
                    data: null
                }
                return res.status(400).json(response)
            }

            //Atualizar orçamento
            await db.query(
                `UPDATE tabela_orcamento SET 
                total = ?, 
                updated_at = ? 
                WHERE id = ?`,
                [total,
                    new Date(),
                    id
                ]
            );
            const response: ResponseType<{ id: string; total: number }> = {
                status: "success",
                message: "Orçamento calculado com sucesso",
                data: { id: id as string, total }
            }
            return res.status(200).json(response)
        } catch (error) {
            console.error(error);
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao calcular orçamento",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    // controlador para obter orcamento por id
    async getOrcamentoPorId(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const [prestacoes] = await db.query<RowDataPacket[]>(
                `SELECT * FROM tabela_prestacao_servicos WHERE id_orcamento = ?`,
                [id]
            );
            const prestacao_s = prestacoes[0]
            const preco_hora_s = prestacao_s?.preco_hora
            const hora_estimada_s = prestacao_s?.hora_estimada

            //verificar se existe prestacao de servico
            if (!Array.isArray(prestacoes) || prestacoes.length === 0) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Prestação de serviço não encontrada para este orçamento",
                    data: null
                }
                return res.status(404).json(response)
            }

            const prestacao = prestacoes[0] as RowDataPacket;
            const idPrestacao = prestacao.id;
            const idPrestador = prestacao.id_prestador;

            //verificar se existe propostas
            const [propostas] = await db.query<RowDataPacket[]>(
                `SELECT * FROM tabela_proposta WHERE id_prestacao = ?`,
                [idPrestacao]
            );
            const propostaAceite = propostas.find(
                (p) => p.estado.toLowerCase() === "aceite"
            );

            const estado_p = propostaAceite?.estado


            if (!Array.isArray(propostas) || propostas.length === 0) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Proposta não encontrada para esta prestação de serviço",
                    data: null
                }
                return res.status(404).json(response)
            }

            let prestador = null;
            //verificar se existe prestador
            if (idPrestador) {
                const [prestadores] = await db.query<RowDataPacket[]>(
                    `SELECT * FROM tabela_prestadores WHERE id = ?`,
                    [idPrestador]
                );
                if (Array.isArray(prestadores) && prestadores.length > 0) {
                    prestador = prestadores[0];

                }
            }

            const taxaUrgencia = parseFloat(prestador?.taxa_urgencia) || 0;
            const minimoDesconto = parseFloat(prestador?.minimo_desconto) || 0;
            const percentagemDesconto = parseFloat(prestador?.percentagem_desconto) || 0;
            const precoHora = parseFloat(prestador?.preco_hora) || 0;

            const response: ResponseType<{
                prestacao_servico: NovaprestacaoType;
                propostas: NovapropostaType[];
                prestador: NovoprestadorType | null;
            }> = {
                status: "success",
                message: "Detalhes do orçamento encontrados com sucesso",
                data: {
                    prestacao_servico: prestacao as NovaprestacaoType,
                    propostas: propostas as NovapropostaType[],
                    prestador: (prestador as NovoprestadorType) || null

                }


            };
            return res.status(200).json(response)
        } catch (error) {
            console.error(error);
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao obter detalhes do orçamento",
                data: null
            };
            return res.status(500).json(response)
        }
    }
}
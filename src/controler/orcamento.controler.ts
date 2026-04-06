import { orcamentoModel } from "../models/orcamento.models.js"
import type { Request, Response } from "express"
import type { NovoOrcamentoType } from "../util/types.js"
import db from "../lib/db.js"
import type { RowDataPacket } from "mysql2"



export const orcamentoControler = {
    //controlador para atualizar orcamento
    async updateOrcamento(req: Request, res: Response) {
        //recebe o id do orcamento e os dados do orcamento
        const { id } = req.params
        const updatedOrcamento: NovoOrcamentoType = req.body

        if (!updatedOrcamento) {
            return res.status(400).json({
                success: false,
                message: "Dados invalidos",
                data: null
            })
        }
        const orcamento = await orcamentoModel.updateOrcamento(id as string, updatedOrcamento)

        if (!orcamento) {
            return res.status(500).json({
                success: false,
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamento atualizado com sucesso",
            data: updatedOrcamento
        })
    },

    //controlador para criar orcamento
    async createOrcamento(req: Request, res: Response) {
        const orcamento: NovoOrcamentoType = req.body
        if (!orcamento) {
            return res.status(400).json({
                success: false,
                message: "Dados invalidos",
                data: null
            })
        }
        const createOrcamento = await orcamentoModel.createOrcamento(orcamento)
        if (!createOrcamento) {
            return res.status(500).json({
                success: true,
                message: "tabela nao encontrada",
                data: createOrcamento
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamento criado com sucesso",
            data: createOrcamento
        })
    },

    //controlador para apagar orcamento
    async deleteOrcamento(req: Request, res: Response) {
        const { id } = req.params
        const orcamento = await orcamentoModel.deleteOrcamento(id as string)
        if (!orcamento) {
            return res.status(500).json({
                success: false,
                message: "Erro ao apagar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamento apagado com sucesso",
            data: orcamento
        })
    },

    //controlador para obter orcamento por id
    async getOrcamento(req: Request, res: Response) {
        const { id } = req.params
        const orcamento = await orcamentoModel.getOrcamento(id as string)
        if (!orcamento) {
            return res.status(404).json({
                success: true,
                message: "Orcamento nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamento obtido com sucesso",
            data: orcamento
        })
    },

    //controlador para obter todos os orcamentos
    async getAllOrcamentos(req: Request, res: Response) {
        const orcamentos = await orcamentoModel.getAllOrcamentos()
        if (!orcamentos) {
            return res.status(500).json({
                success: false,
                message: "Erro ao obter orcamentos",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamentos obtidos com sucesso",
            data: orcamentos
        })
    },

    // Controlador para calcular orçamento final
    async calcularOrcamento(req: Request, res: Response) {
        try {
            const idOrcamento = String(req.params.id);

            // Buscar a prestação de serviço associada a este orçamento
            const [rows]: any = await db.query<RowDataPacket[]>(
                "SELECT * FROM tabela_prestacao_servicos WHERE id_orcamento = ?",
                [idOrcamento]
            );

            if (Array.isArray(rows) && rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Orçamento não encontrado ou sem prestação de serviço associada",
                    data: null
                });
            }

            const tabela_prestacao_servicos = rows[0] as RowDataPacket;
            console.log("tabela_prestacao_servicos", tabela_prestacao_servicos)
            const prestacao_servicos = tabela_prestacao_servicos.id;
            const id_prestador = tabela_prestacao_servicos.id_prestador;

            //Buscar propostas dessa prestação
            const [propostas] = await db.query<RowDataPacket[]>(
                `SELECT * FROM tabela_proposta WHERE id_prestacao = ?`,
                [prestacao_servicos]
            );

            //Verificar proposta aceite
            const propostaAceite = propostas.find((proposta: any) => proposta.estado === "ACEITE" || proposta.estado === "Aceite" || proposta.estado === "aceite");

            if (!propostaAceite) {
                return res.status(400).json({
                    success: false,
                    message: "Nenhuma proposta aceite encontrada para esta prestação de serviço",
                    data: null
                });
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
                return res.status(404).json({
                    success: false,
                    message: "Prestador não encontrado",
                    data: null
                });
            }

            const prestador = prestadores[0] as RowDataPacket;
            const { taxa_urgencia, minimo_desconto, percentagem_desconto } = prestador;

            console.log(taxa_urgencia, minimo_desconto, percentagem_desconto, preco_hora, hora_estimada);
            // Calcular total
            let total: number = parseInt(preco_hora) * parseInt(hora_estimada);
            console.log("total", total)
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
                return res.status(400).json({
                    success: false,
                    message: "Erro no calculo: valores invalidos",
                    data: null
                });
            }

            //Atualizar orçamento
            console.log("total", total, idOrcamento)

            await db.execute(
                `UPDATE tabela_orcamento SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), idOrcamento]
            );
            console.log("total2113243254", total)
            return res.status(200).json({
                success: true,
                message: "Orçamento calculado com sucesso",
                data: { idOrcamento, total }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Erro ao calcular orçamento",
                data: null
            })
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

            console.log("preco_hora_s", preco_hora_s)
            console.log("hora_estimada_s", hora_estimada_s)
            //verificar se existe prestacao de servico
            if (!Array.isArray(prestacoes) || prestacoes.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Prestação de serviço não encontrada para este orçamento",
                    data: null
                });
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
            console.log("estado_p", estado_p)




            if (!Array.isArray(propostas) || propostas.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Proposta não encontrada para esta prestação de serviço",
                    data: null
                });
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
                console.log("taxaUrgencia", taxaUrgencia)
                console.log("minimoDesconto", minimoDesconto)
                console.log("percentagemDesconto", percentagemDesconto)
                console.log("precoHora", precoHora)
            
            









            return res.status(200).json({
                success: true,
                message: "Detalhes do orçamento encontrados com sucesso",
                data: {
                    prestacao_servico: prestacao,
                    propostas: propostas,
                    prestador: prestador
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Erro ao obter detalhes do orçamento",
                data: null
            });
        }
    },
}
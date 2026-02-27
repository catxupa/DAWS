import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js";
import { calcularOrcamento, SelecionarServicos } from "./orcamento.js";


const app = express(); // cria a aplicação
app.use(express.json()); // para interpretar o corpo das requisições como JSON

// rota inicial
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// rota para adicionar um serviço
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body;
    console.log(novoServico);
    const addServico = adicionarServico(novoServico);
    res.json(addServico);
});

// rota para listar todos os serviços
app.get("/listall", (req: Request, res: Response) => {
    const listenerServicoResponse = listarServicos();
    res.json({ listarServicosResponse: listarServicos() });
});

// rota para apagar um serviço 
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string);
        res.json({ apagarServicoResponse })
    } else
        message: "nome do servico não encontrado"
});

// rota para obter servico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const obterServicoResponse = obterServico(nome as string)
        res.json(obterServicoResponse)
    } else {
        { message: "nome do servico é obrigatório" }
    }
});

// rota para selecionar servico
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body;

    const selecionarServicoResponse = SelecionarServicos(nome as string);
    res.json({ selecionarServicoResponse })
});


// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body

    const calcularOrcamentoresponse = calcularOrcamento(pedido)

    res.json(calcularOrcamentoresponse)
});





// inicia o servidor na porta 3000
app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080");
});
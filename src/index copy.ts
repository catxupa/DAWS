import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, novoServico, obterServico } from "./servico.js";
import { apagarPrestadorDeServico, calcularOrcamento, criarPrestadorDeServicos, editarPrestadorDeServico, obterPrestadorDeServico, selecionarPrestadorDeServico, SelecionarServicos } from "./orcamento.js";
import { getAllPrestadores, getPrestadorById, novoPrestador, updatePrestador } from "./prestador.js";
import type { NovoprestadorType, NovoservicoType, prestadorType, utilizadorType } from "./util/types.js";
import { getservicoById, updateservico, } from "./servico.js";
import { start } from "node:repl";
import { deleteuser, getUser, getUserById, novoUtilizador, updateuser } from "./user.js";


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


// rota para selecionar prestadores
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.body

    const selecionarPrestadorDeServicoresponse = criarPrestadorDeServicos(nomeDoPrestador);

    res.json({
        status:
            selecionarPrestadorDeServicoresponse,
        message: "prestador de servico selecionado com sucesso"
    })
});


//rota para criar prestador 
app.post("/criar-prestador", (req: Request, res: Response) => {
    // pegar o corpo de requisicao com os dados do novo prestador
    const novoPrestador = req.body
    const criarPrestadorResponse = criarPrestadorDeServicos(novoPrestador)
    res.json(criarPrestadorResponse)
});


// rota para editar prestador de servico
app.get("/editar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador, novoDadosDoPrestador } = req.body
    const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novoDadosDoPrestador);
    res.json(editarPrestadorResponse)
})

//rota para apagar prestador de servico
app.delete("/apagar-prestador-servico", (req: Request, res: Response) => {
    const { nomePrestador } = req.query
    const apagarPrestadorResponse = apagarPrestadorDeServico(nomePrestador as string);
    res.json({ apagarPrestadorResponse })
}
);

// rota para obter prestador de servico
app.get("/obter-prestador-servico", (req: Request, res: Response) => {
    const { nome } = req.query
    if (nome) {
        const obterPrestadorDeServicoResonse = obterPrestadorDeServico(nome as string);
        res.json({ obterPrestadorDeServicoResonse })
    }
});


// selecionar todos os utilizadores na base de dados
app.get("//get-users", async (req: Request, res: Response) => {
    const getUserResponse = await getUser()
    res.json(getUserResponse)
});

// selecionar um utilizador por id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
    const { id } = req.query

    if (id) {
        const getUserByIdResponse = await getUserById(id as string)
        if (!getUserByIdResponse) {
            res.status(404).json({
                status: "error",
                message: "utilizador nao encontrado",
                data: null
            })
        }

        res.status(200).json({
            status: "success",
            message: "utilizador encontrado",
            data: getUserByIdResponse
        })
    }
});


// Inserir um novo utilizador
app.post("/novo-utilizador", async (req: Request, res: Response) => {
    const utilizador = req.body as utilizadorType

    console.log({ " utilizador index.ts": utilizador })
    const novoUtilizadorResponse = await novoUtilizador(utilizador)
    res.json(novoUtilizadorResponse)

});

// rota para inserir novo servico
app.post("/introduzir-servico", async (req: Request, res: Response) => {
    const NovoServico = req.body as NovoservicoType
    console.log({ "servico": NovoServico })

    const novoServicoResponse = await novoServico(NovoServico)
    res.json({
        status: novoServicoResponse,
        message: "servico adicionado com sucesso"
    })
});

// rota para inserir novo prestador
app.post("/novo-prestador", async (req: Request, res: Response) => {
    const Novoprestador = req.body as NovoprestadorType
    console.log({ "prestador adicionado com sucesso": Novoprestador })

    const novoprestadorResponse = await novoPrestador(Novoprestador)
    res.json(novoprestadorResponse)
});

//rota para selecionar servicos no bd
app.get("/list-service", async (req: Request, res: Response) => {
    const servico = await listarServicos()
    res.json({ listarservicosResponse: servico });
});


// rota para selecionar servicos por id no bd
app.get("/list-service-id", async (req: Request, res: Response) => {
    const { id } = req.body

    const selecionarservicoresponse = await getservicoById(id)
    res.json({
        status:
            selecionarservicoresponse,
        message: "servico selecionado com sucesso"
    })
});


//rota para fazer updated de servico
app.get("/updated-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedService: NovoservicoType = req.body

    if (!id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
    }

    if (!updatedService) {
        return res.status(500).json({
            status: "erro",
            message: "dados de servico invalido",
            data: null
        })
    }
    const updatedServiceResponse = await updateservico(id as string, updatedService)

    if (!updatedServiceResponse) {
        return res.status(400).json({
            status: "erro",
            message: "erro ao atualizar servico",
            data: null
        })
    }

    return res.status(200).json({
        status: "sucess",
        message: "servico atualizado com sucesso",
        data: null
    })
});


// rota para deletar servico
app.delete("delete-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
    }

    const apagarServicoResponse = await apagarServico(id as string)
    if (!apagarServicoResponse) {
        return res.status(500).json({
            status: "erro",
            message: "erro ao apagar este servico",
            data: null
        })
    }
    return res.status(200)
});


// rota par fazer update de users !*
app.get("/updated-user-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedUser: utilizadorType = req.body

    if (!id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
    }

    if (!updatedUser) {
        return res.status(400).json({
            status: "erro",
            message: "dados de user invalido",
            data: null
        })
    }
    const updatedUserResponse = await updateuser(id as string, updatedUser)

    if (!updatedUserResponse) {
        return res.status(400).json({
            status: "erro",
            message: "erro ao atualizar user",
            data: null
        })
    }

    return res.status(400).json({
        status: "sucess",
        message: "user atualizado com sucesso",
        data: null
    })
});

// rota para deletar user !*
app.delete("delete-user-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    if (id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
    }

    const apagarUserResponse = await deleteuser(id as string)
    if (!apagarUserResponse) {
        return res.status(500).json({
            status: "erro",
            message: "erro ao apagar este user",
            data: null
        })
    }
    return res.status(200)
});

// rota para adicionar prestador no bd
app.post("/novo-prestador", async (req: Request, res: Response) => {
    const Novoprestador = req.body as NovoprestadorType
    console.log({ "prestador adicionado com sucesso": Novoprestador })

    const novoprestadorResponse = await novoPrestador(Novoprestador)
    res.json(novoprestadorResponse)
});

























// inicia o servidor na porta 3000
app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080");
});
import express from "express";
import { router } from "./routs/servico.routs.js";
import { rOuter } from "./routs/user.routs.js";
import { ruter } from "./routs/prestador.routs.js";
import { ruters } from "./routs/orcamento.routs.js";
import { ruterss } from "./routs/proposta.routs.js";
import { ruterrs } from "./routs/prestacao_servico.routs.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import dotenv from "dotenv";
dotenv.config();



const app = express(); // cria a aplicação
app.use(express.json()); // para interpretar o corpo das requisições como JSON

// rota inicial
app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/servico", router)

app.use("/user", rOuter)

app.use("/prestador", ruter)

app.use("/orcamento", ruters)

app.use("/proposta", ruterss)

app.use("/prestacao_servico", ruterrs)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));







// inicia o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080");
});
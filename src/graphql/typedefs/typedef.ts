import { gql } from "graphql-tag"

export const typeDefs = gql`
  type utilizador {
      id: ID!,
      nome: String!,
      numero_identificacao: String!,
      data_nascimento: String!,
      email: String!,
      telefone: String!,
      pais: String!,
      localidade: String,
      password: String,
      role: Role,
      enabled: Boolean,
      created_at: String,
      updated_at: String
  }
  enum Role {
      CLIENTE
      ADMIN
      PRESTADOR
      EMPRESA
}

  input servicoInput {
     id: ID!,
     nome: String!,
     descricao: String!,
     categoria: String!,
     enabled: Boolean!,
     created_at: String,
     updated_at: String 
  }

  type orcamento {
    id: ID!,
    total: Float!,
    id_utilizador: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
  }

  type prestacao {
    id: ID!,
    id_utilizador: String!,
    disignacao: String!,
    subtotal: Float!,
    hora_estimada: Float!,
    id_prestador: String!,
    id_servico: String!,
    id_empresa: String!,
    tipo_prestacao: String!,
    preco_hora: Float!,
    estado: prestacaoEstado!,
    id_orcamento: String!,
    urgente: Boolean!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
  }

  enum prestacaoEstado {
    PENDENTE,
    ACEITE,
    RECUSADO
  }

  type proposta {
    id: ID!,
    id_prestacao: String!,
    preco_hora: Float!,
    hora_estimada: Float!,
    estado: propostaEstado!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
  }

  enum propostaEstado {
    PENDENTE,
    ACEITE,
    RECUSADO
  }

  type empresa {
    id: ID!,
    designacao: String!,
    descricao: String!,
    localizacao: String!,
    nif: Int!,
    icone: String!,
    id_utilizador: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
  }

  type categoria {
    id: ID!,
    designacao: String!,
    icone: String!,
    created_at: String,
    updated_at: String
  }

  type prestador {
    id: ID!,
    nome: String!,
    profissao: String!,
    taxa_urgencia: Float!,
    minimo_desconto: Float!,
    nif: Int!,
    percentagem_desconto: Float!,
    preco_hora: Float!,
    disponivel: prestadorEstado!,
    enable: Boolean!,
    created_at: String,
    update_at: String
  }

  enum prestadorEstado {
    DISPONIVEL,
    INDISPONIVEL
  }

  type Query {
    getAllUsers: [utilizador]
    getUserById(id: ID!): utilizador

    getAllPrestadores: [prestador]
    getPrestadorById(id: ID!): prestador

    getAllEmpresas: [empresa]
    getEmpresaById(id: ID!): empresa

    getAllCategorias: [categoria]
    getCategoriaById(id: ID!): categoria

    getAllOrcamentos: [orcamento]
    getOrcamentoById(id: ID!): orcamento

    getAllPrestacaoServico: [prestacao]
    getPrestacaoServicoById(id: ID!): prestacao

    getAllPropostas: [proposta]
    getPropostaById(id: ID!): proposta

    getAllServicos: [servico]
    getServicoById(id: ID!): servico
  }
type Mutation {
  createUser(
    nome: String!,
    numero_identificacao: String!,
    data_nascimento: String!,
    email: String!,
    telefone: String!,
    pais: String!,
    localidade: String,
    password: String,
    role: Role,
    enabled: Boolean
  ):utilizador
  
    updateUser(
        id: ID!,
        nome: String!,
        numero_identificacao: String!,
        data_nascimento: String!,
        email: String!,
        telefone: String!,
        pais: String!,
        localidade: String,
        password: String,
        role: Role,
        enabled: Boolean
    ):utilizador

   deleteUser(
    id: ID!
   ):utilizador

   createPrestador(
    nome: String!,
    profissao: String!,
    taxa_urgencia: Float!,
    minimo_desconto: Float!,
    nif: Int!,
    percentagem_desconto: Float!,
    preco_hora: Float!,
    disponivel: prestadorEstado!,
    enable: Boolean!,
    created_at: String,
    update_at: String
   ):prestador
   
   updatePrestador(
    id: ID!,
    nome: String!,
    profissao: String!,
    taxa_urgencia: Float!,
    minimo_desconto: Float!,
    nif: Int!,
    percentagem_desconto: Float!,
    preco_hora: Float!,
    disponivel: prestadorEstado!,
    enable: Boolean!,
    created_at: String,
    update_at: String
   ):prestador
   deletePrestador(
    id: ID!
   ):prestador

   createEmpresa(
    designacao: String!,
    descricao: String!,
    localizacao: String!,
    nif: Int!,
    icone: String!,
    id_utilizador: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):empresa

   updateEmpresa(
    id: ID!,
    designacao: String!,
    descricao: String!,
    localizacao: String!,
    nif: Int!,
    icone: String!,
    id_utilizador: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):empresa
   deleteEmpresa(
    id: ID!
   ):empresa

   createCategoria(
    designacao: String!,
    icone: String!,
    created_at: String,
    updated_at: String
   ):categoria

   updateCategoria(
    id: ID!,
    designacao: String!,
    icone: String!,
    created_at: String,
    updated_at: String
   ):categoria

   deleteCategoria(
    id: ID!
   ):categoria

   createOrcamento(
    total: Float!,
    id_utilizador: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):orcamento

   updateOrcamento(
    id: ID!,
    total: Float!,
    id_utilizador: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):orcamento

   deleteOrcamento(
    id: ID!
   ):orcamento

   createPrestacao(
    id_utilizador: String!,
    disignacao: String!,
    subtotal: Float!,
    hora_estimada: Float!,
    id_prestador: String!,
    id_servico: String!,
    id_empresa: String!,
    tipo_prestacao: String!,
    preco_hora: Float!,
    estado: prestacaoEstado!,
    id_orcamento: String!,
    urgente: Boolean!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):prestacao 

   updatePrestacao(
    id: ID!,
    id_utilizador: String!,
    disignacao: String!,
    subtotal: Float!,
    hora_estimada: Float!,
    id_prestador: String!,
    id_servico: String!,
    id_empresa: String!,
    tipo_prestacao: String!,
    preco_hora: Float!,
    estado: prestacaoEstado!,
    id_orcamento: String!,
    urgente: Boolean!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):prestacao

   deletePrestacao(
    id: ID!
   ):prestacao

   createProposta(
    id_prestacao: String!,
    preco_hora: Float!,
    hora_estimada: Float!,
    estado: propostaEstado!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):proposta
   
   updateProposta(
    id: ID!,
    id_prestacao: String!,
    preco_hora: Float!,
    hora_estimada: Float!,
    estado: propostaEstado!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):proposta
   deleteProposta(
    id: ID!
   ):proposta

   createServico(
    nome: String!,
    descricao: String!,
    categoria: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):servico
   updateServico(
    id: ID!,
    nome: String!,
    descricao: String!,
    categoria: String!,
    enabled: Boolean!,
    created_at: String,
    updated_at: String
   ):servico
   deleteServico(
    id: ID!
   ):servico
  }`
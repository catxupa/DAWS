export enum Role {
    CLIENTE = "cliente",
    ADMIN = "admin",
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
}

export enum prestacaoEstado {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    RECUSADO = "recusado"
}

export enum tipoPrestacao {
    SERVICO = "servico",
    PRODUTO = "produto"
}

export enum propostaEstado {
    PENDENTE = "pendente",
    ACEITE = "aceite",
    RECUSADO = "recusado"
}

export enum prestadorEstado {
    DISPONIVEL = "disponivel",
    INDISPONIVEL = "indisponivel"
}


export interface pedidoServico {
    cliente: string,
    descricao: string,
    horasEstimadas: number,
    urgente: boolean
}

export interface Servicotype {
    nome: string,
    precoHora: number,
    minimiDesconto: number,
    categoria: string,
    percentagemDesconto?: number
}

export interface prestadorType {
    nome: string,
    precoHora: number,
    profissao: string,
    minimoParaDesconto: number,
    percentagemDesconto: number,
    taxaUrgencia: number
}

export interface utilizadorType {
    id: string,
    nome: string,
    numero_identificacao: string,
    data_nascimento: string,
    email: string,
    telefone: string,
    pais: string,
    localidade: string,
    password: string,
    role: Role,
    enabled: boolean,
    created_at: string,
    updated_at: string
}


export interface NovoservicoType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface NovoprestadorType {
    id: string,
    nome: string,
    profissao: string,
    taxa_urgencia: number,
    minimo_desconto: number,
    nif: number,
    percentagem_desconto: number,
    preco_hora: number,
    disponivel: prestadorEstado,
    enable: boolean,
    created_at: string,
    update_at: string
}

export interface NovoOrcamentoType {
    id: string,
    total: number,
    id_utilizador: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface NovapropostaType {
    id: string,
    id_prestacao: number,
    preco_hora: number,
    hora_estimada: number,
    estado: propostaEstado,
    enabled: boolean,
    created_at: string,
    update_at: string
}

export interface NovaprestacaoType {
    id: string,
    id_utilizador: string,
    disignacao: string,
    subtotal: number,
    hora_estimada: number,
    id_prestador: string,
    id_servico: string,
    id_empresa: string,
    tipo_prestacao: string,
    preco_hora: number,
    estado: prestacaoEstado,
    id_orcamento: string,
    urgente: boolean,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface ResponseType<T> {
    status: "success" | "error",
    message: string,
    data: T | null
}

export interface PrestacaoDeServicoDetalhadaType {
    id: string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    urgente: boolean
}

export interface ServicoDetalhadoType {
    id: string,
    nome: string,
    descricao: string,
    id_categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface NovaEmpresaType {
    id: string,
    designacao: string,
    descricao: string,
    localizacao: string,
    nif: number,
    icone: string,
    id_utilizador: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface NovaCategoriaType {
    id: string,
    designacao: string,
    icone: string,
    created_at: string,
    updated_at: string
}


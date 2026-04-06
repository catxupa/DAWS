export interface pedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface Servicotype {
    nome: string;
    precoHora: number;
    minimiDesconto: number;
    categoria: string;
    percentagemDesconto?: number;
}

export interface responseType {
    success: boolean;
    message: string;
    data: Servicotype | string
}

export interface prestadorType {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number
}

export interface utilizadorType {
    id: string
    nome: string
    numero_identificacao: string
    data_nascimento: string
    email: string
    telefone: string
    pais: string
    localidade: string
    password: string
    enabled: boolean
    created_at: string
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
    disponivel: boolean,
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
    estado: string,
    enabled: boolean,
    created_at: string,
    update_at: string
}


export interface NovaprestacaoType {
    id: string,
    disignacao: string,
    subtotal: number,
    hora_estimada: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    estado: string,
    id_orcamento: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}


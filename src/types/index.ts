export type TipoEscola = 'Particular' | 'Pública';

export type StatusEscola = 'Ativa' | 'Inativa';

export interface Escola {
  id: string;
  nome: string;
  tipo: TipoEscola;
  status: StatusEscola;
  cidade: string;
  estado: string;
  diretor: string;
  telefone: string;
  email: string;
  totalTurmas: number;
  totalAlunos: number;
  createdAt: string;
}

export type Turno = 'Manhã' | 'Tarde' | 'Noite' | 'Integral';

export interface Turma {
  id: string;
  nome: string;
  serie: string;
  turno: Turno;
  anoLetivo: number;
  escolaId: string;
  escolaNome: string;
  professor: string;
  totalAlunos: number;
  createdAt: string;
}

export type StatusAluno = 'Ativo' | 'Inativo' | 'Transferido';

export interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  dataNascimento: string;
  turmaId: string;
  turmaNome: string;
  escolaId: string;
  escolaNome: string;
  responsavel: string;
  telefoneResponsavel: string;
  status: StatusAluno;
  createdAt: string;
}

export interface DashboardStats {
  totalEscolas: number;
  totalTurmas: number;
  totalAlunos: number;
  escolasParticulares: number;
  escolasPublicas: number;
  alunosAtivos: number;
}

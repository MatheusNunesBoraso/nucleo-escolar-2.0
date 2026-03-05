export type EscolaType = 'public' | 'private';
export type EscolaStatus = 'active' | 'inactive';
export type EducationStage = 'infantil' | 'fundamental1' | 'fundamental2' | 'medio' | 'eja';
export type Shift = 'manha' | 'tarde' | 'noite' | 'integral';
export type AcademicYearModel = 'year' | 'semester' | 'trimester' | 'bimester';

export interface Escola {
  id: string;
  // 1. Identificação
  name: string;
  type: EscolaType;
  status: EscolaStatus;
  // 2. Endereço
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement?: string;
  // 3. Contato
  phone?: string;
  email?: string;
  // 4. Dados Institucionais
  schoolCodeInep?: string;
  cnpj?: string;
  legalName?: string;
  operatingName?: string;
  // 5. Estrutura Educacional
  educationStages: EducationStage[];
  shiftModel: Shift[];
  academicYearModel: AcademicYearModel;
  maxStudentsPerClassDefault?: number;
  // Meta
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

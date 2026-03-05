'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  Grid,
  Heading,
  Input,
  NativeSelect,
  NumberInput,
  Separator,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { toaster } from '@/lib/toaster';
import { Escola, EscolaType, EscolaStatus, EducationStage, Shift, AcademicYearModel } from '@/types';

interface FormData {
  name: string;
  type: EscolaType;
  status: EscolaStatus;
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  phone: string;
  email: string;
  schoolCodeInep: string;
  cnpj: string;
  legalName: string;
  operatingName: string;
  educationStages: EducationStage[];
  shiftModel: Shift[];
  academicYearModel: AcademicYearModel;
  maxStudentsPerClassDefault: string;
}

const EMPTY: FormData = {
  name: '',
  type: 'public',
  status: 'active',
  cep: '',
  state: '',
  city: '',
  district: '',
  street: '',
  number: '',
  complement: '',
  phone: '',
  email: '',
  schoolCodeInep: '',
  cnpj: '',
  legalName: '',
  operatingName: '',
  educationStages: [],
  shiftModel: [],
  academicYearModel: 'year',
  maxStudentsPerClassDefault: '',
};

function escolaToForm(e: Escola): FormData {
  return {
    name: e.name,
    type: e.type,
    status: e.status,
    cep: e.cep,
    state: e.state,
    city: e.city,
    district: e.district,
    street: e.street,
    number: e.number,
    complement: e.complement ?? '',
    phone: e.phone ?? '',
    email: e.email ?? '',
    schoolCodeInep: e.schoolCodeInep ?? '',
    cnpj: e.cnpj ?? '',
    legalName: e.legalName ?? '',
    operatingName: e.operatingName ?? '',
    educationStages: e.educationStages,
    shiftModel: e.shiftModel,
    academicYearModel: e.academicYearModel,
    maxStudentsPerClassDefault: e.maxStudentsPerClassDefault?.toString() ?? '',
  };
}

interface Props {
  initialData?: Escola;
  onSave: (escola: Escola) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const STAGE_OPTIONS: { value: EducationStage; label: string }[] = [
  { value: 'infantil', label: 'Educação Infantil' },
  { value: 'fundamental1', label: 'Fundamental I (1º ao 5º ano)' },
  { value: 'fundamental2', label: 'Fundamental II (6º ao 9º ano)' },
  { value: 'medio', label: 'Ensino Médio' },
  { value: 'eja', label: 'EJA' },
];

const SHIFT_OPTIONS: { value: Shift; label: string }[] = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Noite' },
  { value: 'integral', label: 'Integral' },
];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box bg="white" borderRadius="xl" borderWidth={1} borderColor="gray.100" overflow="hidden">
      <Box px={6} py={4} borderBottomWidth={1} borderColor="gray.100">
        <Heading size="sm" color="gray.700" fontWeight="600">
          {title}
        </Heading>
      </Box>
      <Box px={6} py={5}>
        {children}
      </Box>
    </Box>
  );
}

export default function EscolaForm({ initialData, onSave, onCancel, isSubmitting }: Props) {
  const [form, setForm] = useState<FormData>(initialData ? escolaToForm(initialData) : EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function setField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function toggleStage(stage: EducationStage) {
    const next = form.educationStages.includes(stage)
      ? form.educationStages.filter((s) => s !== stage)
      : [...form.educationStages, stage];
    setField('educationStages', next);
    if (errors.educationStages) setErrors((prev) => ({ ...prev, educationStages: undefined }));
  }

  function toggleShift(shift: Shift) {
    const next = form.shiftModel.includes(shift)
      ? form.shiftModel.filter((s) => s !== shift)
      : [...form.shiftModel, shift];
    setField('shiftModel', next);
    if (errors.shiftModel) setErrors((prev) => ({ ...prev, shiftModel: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Nome é obrigatório';
    if (!form.cep.trim()) e.cep = 'CEP é obrigatório';
    if (!form.state.trim()) e.state = 'Estado é obrigatório';
    if (!form.city.trim()) e.city = 'Cidade é obrigatória';
    if (!form.district.trim()) e.district = 'Bairro é obrigatório';
    if (!form.street.trim()) e.street = 'Rua é obrigatória';
    if (!form.number.trim()) e.number = 'Número é obrigatório';
    if (form.educationStages.length === 0) e.educationStages = 'Selecione ao menos uma etapa';
    if (form.shiftModel.length === 0) e.shiftModel = 'Selecione ao menos um turno';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) {
      toaster.error({ title: 'Corrija os erros antes de salvar', duration: 3000 });
      return;
    }
    const saved: Escola = {
      id: initialData?.id ?? `esc-${Date.now()}`,
      name: form.name,
      type: form.type,
      status: form.status,
      cep: form.cep,
      state: form.state,
      city: form.city,
      district: form.district,
      street: form.street,
      number: form.number,
      complement: form.complement || undefined,
      phone: form.phone || undefined,
      email: form.email || undefined,
      schoolCodeInep: form.schoolCodeInep || undefined,
      cnpj: form.cnpj || undefined,
      legalName: form.legalName || undefined,
      operatingName: form.operatingName || undefined,
      educationStages: form.educationStages,
      shiftModel: form.shiftModel,
      academicYearModel: form.academicYearModel,
      maxStudentsPerClassDefault: form.maxStudentsPerClassDefault ? Number(form.maxStudentsPerClassDefault) : undefined,
      totalTurmas: initialData?.totalTurmas ?? 0,
      totalAlunos: initialData?.totalAlunos ?? 0,
      createdAt: initialData?.createdAt ?? new Date().toISOString().split('T')[0],
    };
    onSave(saved);
  }

  return (
    <VStack align="stretch" gap={5}>
      {/* 1. Identificação */}
      <SectionCard title="Identificação">
        <VStack align="stretch" gap={4}>
          <Field.Root invalid={!!errors.name} required>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">
              Nome da Escola
            </Field.Label>
            <Input
              placeholder="Ex: Colégio São Francisco de Assis"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              borderRadius="md"
            />
            <Field.ErrorText fontSize="xs">{errors.name}</Field.ErrorText>
          </Field.Root>

          <SimpleGrid columns={2} gap={4}>
            <Field.Root required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Tipo</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  value={form.type}
                  onChange={(e) => setField('type', e.target.value as EscolaType)}
                  borderRadius="md"
                >
                  <option value="public">Pública</option>
                  <option value="private">Particular</option>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Situação</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  value={form.status}
                  onChange={(e) => setField('status', e.target.value as EscolaStatus)}
                  borderRadius="md"
                >
                  <option value="active">Ativa</option>
                  <option value="inactive">Inativa</option>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Field.Root>
          </SimpleGrid>
        </VStack>
      </SectionCard>

      {/* 2. Endereço */}
      <SectionCard title="Endereço">
        <VStack align="stretch" gap={4}>
          <SimpleGrid columns={2} gap={4}>
            <Field.Root invalid={!!errors.cep} required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">CEP</Field.Label>
              <Input
                placeholder="00000-000"
                value={form.cep}
                onChange={(e) => setField('cep', e.target.value)}
                borderRadius="md"
              />
              <Field.ErrorText fontSize="xs">{errors.cep}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.state} required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Estado (UF)</Field.Label>
              <Input
                placeholder="SP"
                maxLength={2}
                value={form.state}
                onChange={(e) => setField('state', e.target.value.toUpperCase())}
                borderRadius="md"
              />
              <Field.ErrorText fontSize="xs">{errors.state}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <SimpleGrid columns={2} gap={4}>
            <Field.Root invalid={!!errors.city} required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Cidade</Field.Label>
              <Input
                placeholder="São Paulo"
                value={form.city}
                onChange={(e) => setField('city', e.target.value)}
                borderRadius="md"
              />
              <Field.ErrorText fontSize="xs">{errors.city}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.district} required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Bairro</Field.Label>
              <Input
                placeholder="Centro"
                value={form.district}
                onChange={(e) => setField('district', e.target.value)}
                borderRadius="md"
              />
              <Field.ErrorText fontSize="xs">{errors.district}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <Grid templateColumns="2fr 1fr" gap={4}>
            <Field.Root invalid={!!errors.street} required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Rua</Field.Label>
              <Input
                placeholder="Av. Paulista"
                value={form.street}
                onChange={(e) => setField('street', e.target.value)}
                borderRadius="md"
              />
              <Field.ErrorText fontSize="xs">{errors.street}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.number} required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Número</Field.Label>
              <Input
                placeholder="1000"
                value={form.number}
                onChange={(e) => setField('number', e.target.value)}
                borderRadius="md"
              />
              <Field.ErrorText fontSize="xs">{errors.number}</Field.ErrorText>
            </Field.Root>
          </Grid>

          <Field.Root>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Complemento</Field.Label>
            <Input
              placeholder="Bloco A, Sala 101"
              value={form.complement}
              onChange={(e) => setField('complement', e.target.value)}
              borderRadius="md"
            />
          </Field.Root>
        </VStack>
      </SectionCard>

      {/* 3. Contato */}
      <SectionCard title="Contato">
        <SimpleGrid columns={2} gap={4}>
          <Field.Root>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Telefone</Field.Label>
            <Input
              placeholder="(11) 3456-7890"
              value={form.phone}
              onChange={(e) => setField('phone', e.target.value)}
              borderRadius="md"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">E-mail Institucional</Field.Label>
            <Input
              type="email"
              placeholder="contato@escola.edu.br"
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              borderRadius="md"
            />
          </Field.Root>
        </SimpleGrid>
      </SectionCard>

      {/* 4. Dados Institucionais */}
      <SectionCard title="Dados Institucionais">
        <VStack align="stretch" gap={4}>
          <SimpleGrid columns={2} gap={4}>
            <Field.Root>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Código INEP</Field.Label>
              <Input
                placeholder="35000001"
                value={form.schoolCodeInep}
                onChange={(e) => setField('schoolCodeInep', e.target.value)}
                borderRadius="md"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">CNPJ</Field.Label>
              <Input
                placeholder="12.345.678/0001-90"
                value={form.cnpj}
                onChange={(e) => setField('cnpj', e.target.value)}
                borderRadius="md"
              />
            </Field.Root>
          </SimpleGrid>

          <Field.Root>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Razão Social</Field.Label>
            <Input
              placeholder="Associação Educacional..."
              value={form.legalName}
              onChange={(e) => setField('legalName', e.target.value)}
              borderRadius="md"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Nome Fantasia</Field.Label>
            <Input
              placeholder="Colégio São Francisco de Assis"
              value={form.operatingName}
              onChange={(e) => setField('operatingName', e.target.value)}
              borderRadius="md"
            />
          </Field.Root>
        </VStack>
      </SectionCard>

      {/* 5. Estrutura Educacional */}
      <SectionCard title="Estrutura Educacional">
        <VStack align="stretch" gap={5}>
          <Field.Root invalid={!!errors.educationStages} required>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Etapas de Ensino</Field.Label>
            <Stack gap={2} mt={1}>
              {STAGE_OPTIONS.map((opt) => (
                <Checkbox.Root
                  key={opt.value}
                  checked={form.educationStages.includes(opt.value)}
                  onCheckedChange={() => toggleStage(opt.value)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" color="gray.700">{opt.label}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </Stack>
            {errors.educationStages && (
              <Field.ErrorText fontSize="xs">{errors.educationStages}</Field.ErrorText>
            )}
          </Field.Root>

          <Separator />

          <Field.Root invalid={!!errors.shiftModel} required>
            <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Turnos Disponíveis</Field.Label>
            <Stack direction="row" gap={5} flexWrap="wrap" mt={1}>
              {SHIFT_OPTIONS.map((opt) => (
                <Checkbox.Root
                  key={opt.value}
                  checked={form.shiftModel.includes(opt.value)}
                  onCheckedChange={() => toggleShift(opt.value)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label fontSize="sm" color="gray.700">{opt.label}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </Stack>
            {errors.shiftModel && (
              <Field.ErrorText fontSize="xs">{errors.shiftModel}</Field.ErrorText>
            )}
          </Field.Root>

          <Separator />

          <SimpleGrid columns={2} gap={4}>
            <Field.Root required>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Modelo do Calendário</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  value={form.academicYearModel}
                  onChange={(e) => setField('academicYearModel', e.target.value as AcademicYearModel)}
                  borderRadius="md"
                >
                  <option value="year">Anual</option>
                  <option value="semester">Semestral</option>
                  <option value="trimester">Trimestral</option>
                  <option value="bimester">Bimestral</option>
                </NativeSelect.Field>
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label fontSize="sm" fontWeight="500" color="gray.700">Limite de Alunos por Turma</Field.Label>
              <NumberInput.Root
                value={form.maxStudentsPerClassDefault}
                onValueChange={(details) => setField('maxStudentsPerClassDefault', details.value)}
                min={1}
                max={100}
              >
                <NumberInput.Input placeholder="35" borderRadius="md" />
                <NumberInput.Control>
                  <NumberInput.IncrementTrigger />
                  <NumberInput.DecrementTrigger />
                </NumberInput.Control>
              </NumberInput.Root>
            </Field.Root>
          </SimpleGrid>
        </VStack>
      </SectionCard>

      {/* Ações */}
      <Flex justify="flex-end" gap={3} pt={2}>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button colorPalette="blue" onClick={handleSubmit} loading={isSubmitting}>
          {initialData ? 'Salvar Alterações' : 'Cadastrar Escola'}
        </Button>
      </Flex>
    </VStack>
  );
}

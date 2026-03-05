'use client';

import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Button,
  Separator,
  Collapsible,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSchool, MdGroup, MdPerson, MdExpandMore, MdChevronRight } from 'react-icons/md';
import { escolas, getTurmasByEscola, getAlunosByTurma } from '@/data/mock';
import { Escola, Turma } from '@/types';

function AlunoRow({ nome, matricula, status }: { nome: string; matricula: string; status: string }) {
  const colorPalette = status === 'Ativo' ? 'green' : status === 'Inativo' ? 'red' : 'orange';
  return (
    <HStack
      pl={8}
      py={1.5}
      px={3}
      gap={3}
      _hover={{ bg: 'gray.50' }}
      borderRadius="md"
    >
      <Icon boxSize={4} color="gray.400">
        <MdPerson />
      </Icon>
      <Text fontSize="sm" color="gray.700" flex={1}>
        {nome}
      </Text>
      <Text fontSize="xs" color="gray.400">
        {matricula}
      </Text>
      <Badge colorPalette={colorPalette} size="sm" variant="subtle">
        {status}
      </Badge>
    </HStack>
  );
}

function TurmaRow({ turma }: { turma: Turma }) {
  const [open, setOpen] = useState(false);
  const alunosList = getAlunosByTurma(turma.id);

  return (
    <Box>
      <HStack
        pl={5}
        py={1.5}
        px={3}
        gap={3}
        cursor="pointer"
        onClick={() => setOpen(!open)}
        _hover={{ bg: 'blue.50' }}
        borderRadius="md"
      >
        <Icon boxSize={4} color="blue.400">
          {open ? <MdExpandMore /> : <MdChevronRight />}
        </Icon>
        <Icon boxSize={4} color="blue.500">
          <MdGroup />
        </Icon>
        <Text fontSize="sm" color="gray.700" fontWeight="500" flex={1}>
          {turma.nome}
        </Text>
        <Badge colorPalette="blue" size="sm" variant="subtle">
          {turma.turno}
        </Badge>
        <Badge colorPalette="gray" size="sm">
          {turma.totalAlunos} alunos
        </Badge>
      </HStack>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <VStack align="stretch" gap={0} pl={4} mt={1} mb={1}>
            {alunosList.length > 0 ? (
              alunosList.map((aluno) => (
                <AlunoRow key={aluno.id} nome={aluno.nome} matricula={aluno.matricula} status={aluno.status} />
              ))
            ) : (
              <Text fontSize="xs" color="gray.400" pl={10} py={1}>
                Nenhum aluno cadastrado
              </Text>
            )}
          </VStack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

function EscolaRow({ escola }: { escola: Escola }) {
  const [open, setOpen] = useState(false);
  const turmasList = getTurmasByEscola(escola.id);
  const colorPalette = escola.type === 'private' ? 'purple' : 'teal';

  return (
    <Box border="1px solid" borderColor="gray.100" borderRadius="lg" overflow="hidden" mb={3}>
      <HStack
        py={3}
        px={4}
        gap={3}
        cursor="pointer"
        onClick={() => setOpen(!open)}
        bg={open ? 'blue.50' : 'white'}
        _hover={{ bg: 'blue.50' }}
        transition="background 0.15s"
      >
        <Icon boxSize={5} color="blue.500">
          {open ? <MdExpandMore /> : <MdChevronRight />}
        </Icon>
        <Icon boxSize={5} color="blue.600">
          <MdSchool />
        </Icon>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="600" color="gray.800">
            {escola.name}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {escola.city} – {escola.state}
          </Text>
        </Box>
        <Badge colorPalette={colorPalette} size="sm" variant="subtle">
          {escola.type === 'private' ? 'Particular' : 'Pública'}
        </Badge>
        <Badge colorPalette={escola.status === 'active' ? 'green' : 'red'} size="sm">
          {escola.status === 'active' ? 'Ativa' : 'Inativa'}
        </Badge>
        <Badge colorPalette="gray" size="sm">
          {turmasList.length} turmas
        </Badge>
      </HStack>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <Separator />
          <VStack align="stretch" gap={0} p={2}>
            {turmasList.map((turma) => (
              <TurmaRow key={turma.id} turma={turma} />
            ))}
          </VStack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

export default function SchoolTree() {
  return (
    <Box bg="white" borderRadius="xl" p={5} borderWidth={1} borderColor="gray.100">
      <HStack justify="space-between" mb={4}>
        <Box>
          <Text fontWeight="700" fontSize="md" color="gray.800">
            Hierarquia Escolar
          </Text>
          <Text fontSize="xs" color="gray.400">
            Escola → Turma → Aluno
          </Text>
        </Box>
        <Badge colorPalette="blue" variant="subtle" px={3} py={1} borderRadius="full">
          {escolas.length} escolas
        </Badge>
      </HStack>

      <VStack align="stretch" gap={0}>
        {escolas.map((escola) => (
          <EscolaRow key={escola.id} escola={escola} />
        ))}
      </VStack>
    </Box>
  );
}

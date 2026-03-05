'use client';

import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Collapse,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSchool, MdGroup, MdPerson, MdExpandMore, MdChevronRight } from 'react-icons/md';
import { escolas, getTurmasByEscola, getAlunosByTurma } from '@/data/mock';
import { Escola, Turma } from '@/types';

function AlunoRow({ nome, matricula, status }: { nome: string; matricula: string; status: string }) {
  const statusColor = status === 'Ativo' ? 'green' : status === 'Inativo' ? 'red' : 'orange';
  return (
    <HStack
      pl={8}
      py={1.5}
      spacing={3}
      _hover={{ bg: 'gray.50' }}
      borderRadius="md"
      px={3}
    >
      <Icon as={MdPerson} boxSize={4} color="gray.400" />
      <Text fontSize="sm" color="gray.700" flex={1}>
        {nome}
      </Text>
      <Text fontSize="xs" color="gray.400">
        {matricula}
      </Text>
      <Badge colorScheme={statusColor} fontSize="10px" variant="subtle">
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
        spacing={3}
        cursor="pointer"
        onClick={() => setOpen(!open)}
        _hover={{ bg: 'blue.50' }}
        borderRadius="md"
        px={3}
      >
        <Icon as={open ? MdExpandMore : MdChevronRight} boxSize={4} color="blue.400" />
        <Icon as={MdGroup} boxSize={4} color="blue.500" />
        <Text fontSize="sm" color="gray.700" fontWeight="medium" flex={1}>
          {turma.nome}
        </Text>
        <Badge colorScheme="blue" fontSize="10px" variant="subtle">
          {turma.turno}
        </Badge>
        <Badge colorScheme="gray" fontSize="10px">
          {turma.totalAlunos} alunos
        </Badge>
      </HStack>

      <Collapse in={open} animateOpacity>
        <VStack align="stretch" spacing={0} pl={4} mt={1} mb={1}>
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
      </Collapse>
    </Box>
  );
}

function EscolaRow({ escola }: { escola: Escola }) {
  const [open, setOpen] = useState(false);
  const turmasList = getTurmasByEscola(escola.id);
  const tipoColor = escola.tipo === 'Particular' ? 'purple' : 'teal';

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
      mb={3}
    >
      <HStack
        py={3}
        px={4}
        spacing={3}
        cursor="pointer"
        onClick={() => setOpen(!open)}
        bg={open ? 'brand.50' : 'white'}
        _hover={{ bg: 'brand.50' }}
        transition="background 0.15s"
      >
        <Icon as={open ? MdExpandMore : MdChevronRight} boxSize={5} color="brand.500" />
        <Icon as={MdSchool} boxSize={5} color="brand.600" />
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="semibold" color="gray.800">
            {escola.nome}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {escola.cidade} – {escola.estado}
          </Text>
        </Box>
        <Badge colorScheme={tipoColor} fontSize="10px" variant="subtle">
          {escola.tipo}
        </Badge>
        <Badge
          colorScheme={escola.status === 'Ativa' ? 'green' : 'red'}
          fontSize="10px"
        >
          {escola.status}
        </Badge>
        <Badge colorScheme="gray" fontSize="10px">
          {turmasList.length} turmas
        </Badge>
      </HStack>

      <Collapse in={open} animateOpacity>
        <Divider />
        <VStack align="stretch" spacing={0} p={2}>
          {turmasList.map((turma) => (
            <TurmaRow key={turma.id} turma={turma} />
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
}

export default function SchoolTree() {
  return (
    <Box bg="white" borderRadius="xl" p={5} boxShadow="sm" borderWidth={1} borderColor="gray.100">
      <HStack justify="space-between" mb={4}>
        <Box>
          <Text fontWeight="bold" fontSize="md" color="gray.800">
            Hierarquia Escolar
          </Text>
          <Text fontSize="xs" color="gray.500">
            Escola → Turma → Aluno
          </Text>
        </Box>
        <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
          {escolas.length} escolas
        </Badge>
      </HStack>

      <VStack align="stretch" spacing={0}>
        {escolas.map((escola) => (
          <EscolaRow key={escola.id} escola={escola} />
        ))}
      </VStack>
    </Box>
  );
}

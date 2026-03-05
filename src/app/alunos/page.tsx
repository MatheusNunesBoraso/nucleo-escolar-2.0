'use client';

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Select,
  Flex,
  Avatar,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch, MdAdd, MdPerson, MdEdit, MdVisibility } from 'react-icons/md';
import AppLayout from '@/components/layout/AppLayout';
import { alunos, escolas } from '@/data/mock';
import { StatusAluno } from '@/types';

export default function AlunosPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusAluno | ''>('');
  const [escolaFilter, setEscolaFilter] = useState('');

  const filtered = alunos.filter((a) => {
    const matchSearch =
      a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.matricula.includes(search) ||
      a.turmaNome.toLowerCase().includes(search.toLowerCase()) ||
      a.escolaNome.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || a.status === statusFilter;
    const matchEscola = !escolaFilter || a.escolaId === escolaFilter;
    return matchSearch && matchStatus && matchEscola;
  });

  const statusColor: Record<StatusAluno, string> = {
    Ativo: 'green',
    Inativo: 'red',
    Transferido: 'orange',
  };

  return (
    <AppLayout title="Alunos" subtitle="Gerenciar alunos cadastrados">
      <Box bg="white" borderRadius="xl" boxShadow="sm" borderWidth={1} borderColor="gray.100" overflow="hidden">
        <Flex px={5} py={4} borderBottomWidth={1} borderColor="gray.100" gap={3} wrap="wrap" align="center">
          <InputGroup maxW="280px">
            <InputLeftElement>
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar aluno, matrícula, turma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="lg"
              bg="gray.50"
              fontSize="sm"
            />
          </InputGroup>

          <Select
            maxW="200px"
            size="md"
            borderRadius="lg"
            bg="gray.50"
            fontSize="sm"
            value={escolaFilter}
            onChange={(e) => setEscolaFilter(e.target.value)}
          >
            <option value="">Todas as escolas</option>
            {escolas.map((e) => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </Select>

          <Select
            maxW="160px"
            size="md"
            borderRadius="lg"
            bg="gray.50"
            fontSize="sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusAluno | '')}
          >
            <option value="">Todos status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Transferido">Transferido</option>
          </Select>

          <Box flex={1} />

          <Button leftIcon={<MdAdd />} colorScheme="blue" size="md" borderRadius="lg">
            Novo Aluno
          </Button>
        </Flex>

        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th fontSize="xs" color="gray.500" py={3}>Aluno</Th>
                <Th fontSize="xs" color="gray.500">Matrícula</Th>
                <Th fontSize="xs" color="gray.500">Escola</Th>
                <Th fontSize="xs" color="gray.500">Turma</Th>
                <Th fontSize="xs" color="gray.500">Responsável</Th>
                <Th fontSize="xs" color="gray.500">Nascimento</Th>
                <Th fontSize="xs" color="gray.500">Status</Th>
                <Th fontSize="xs" color="gray.500">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((aluno) => (
                <Tr key={aluno.id} _hover={{ bg: 'gray.50' }}>
                  <Td py={4}>
                    <HStack spacing={3}>
                      <Avatar size="sm" name={aluno.nome} colorScheme="blue" />
                      <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                        {aluno.nome}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600" fontFamily="mono">
                      {aluno.matricula}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.700" maxW="180px" noOfLines={1}>
                      {aluno.escolaNome}
                    </Text>
                  </Td>
                  <Td>
                    <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                      {aluno.turmaNome}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" color="gray.700">{aluno.responsavel}</Text>
                      <Text fontSize="xs" color="gray.400">{aluno.telefoneResponsavel}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">
                      {new Date(aluno.dataNascimento).toLocaleDateString('pt-BR')}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={statusColor[aluno.status]}
                      fontSize="xs"
                    >
                      {aluno.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      <Tooltip label="Visualizar">
                        <Button size="xs" variant="ghost" colorScheme="blue">
                          <Icon as={MdVisibility} />
                        </Button>
                      </Tooltip>
                      <Tooltip label="Editar">
                        <Button size="xs" variant="ghost" colorScheme="gray">
                          <Icon as={MdEdit} />
                        </Button>
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {filtered.length === 0 && (
            <Box py={12} textAlign="center">
              <Icon as={MdPerson} boxSize={10} color="gray.300" />
              <Text color="gray.400" mt={2}>Nenhum aluno encontrado</Text>
            </Box>
          )}
        </Box>

        <Flex px={5} py={3} borderTopWidth={1} borderColor="gray.100" align="center" justify="space-between">
          <Text fontSize="xs" color="gray.500">
            Exibindo {filtered.length} de {alunos.length} alunos
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

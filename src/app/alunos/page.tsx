'use client';

import {
  Box,
  Table,
  Badge,
  Text,
  HStack,
  Button,
  Input,
  InputGroup,
  Icon,
  NativeSelect,
  Flex,
  Avatar,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch, MdAdd, MdPerson, MdEdit } from 'react-icons/md';
import AppLayout from '@/components/layout/AppLayout';
import { alunos, escolas } from '@/data/mock';
import { StatusAluno } from '@/types';

const statusPalette: Record<StatusAluno, string> = {
  Ativo: 'green',
  Inativo: 'red',
  Transferido: 'orange',
};

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content fontSize="xs">{label}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
}

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

  return (
    <AppLayout title="Alunos" subtitle="Gerenciar alunos cadastrados">
      <Box bg="white" borderRadius="xl" borderWidth={1} borderColor="gray.100" overflow="hidden">
        <Flex px={5} py={4} borderBottomWidth={1} borderColor="gray.100" gap={3} wrap="wrap" align="center">
          <InputGroup
            maxW="280px"
            startElement={
              <Icon color="gray.400" boxSize={4}>
                <MdSearch />
              </Icon>
            }
          >
            <Input
              placeholder="Buscar aluno, matrícula, turma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="lg"
              bg="gray.50"
              fontSize="sm"
            />
          </InputGroup>

          <NativeSelect.Root maxW="200px">
            <NativeSelect.Field
              value={escolaFilter}
              onChange={(e) => setEscolaFilter(e.target.value)}
              borderRadius="lg"
              bg="gray.50"
              fontSize="sm"
            >
              <option value="">Todas as escolas</option>
              {escolas.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </NativeSelect.Field>
          </NativeSelect.Root>

          <NativeSelect.Root maxW="160px">
            <NativeSelect.Field
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusAluno | '')}
              borderRadius="lg"
              bg="gray.50"
              fontSize="sm"
            >
              <option value="">Todos status</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Transferido">Transferido</option>
            </NativeSelect.Field>
          </NativeSelect.Root>

          <Box flex={1} />

          <Button colorPalette="blue" size="md" borderRadius="lg">
            <Icon boxSize={4}><MdAdd /></Icon>
            Novo Aluno
          </Button>
        </Flex>

        <Table.ScrollArea>
          <Table.Root size="sm" variant="line">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader fontSize="xs" color="gray.500" py={3} fontWeight="600">Aluno</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Matrícula</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Escola</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Turma</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Responsável</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Nascimento</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Status</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.map((aluno) => (
                <Table.Row key={aluno.id} _hover={{ bg: 'gray.50' }}>
                  <Table.Cell py={4}>
                    <HStack gap={3}>
                      <Avatar.Root size="sm" colorPalette="blue">
                        <Avatar.Fallback name={aluno.nome} />
                      </Avatar.Root>
                      <Text fontSize="sm" fontWeight="600" color="gray.800">{aluno.nome}</Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.500" fontFamily="mono">{aluno.matricula}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.700" lineClamp={1} maxW="180px">{aluno.escolaNome}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette="blue" variant="subtle" size="sm">{aluno.turmaNome}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <VStack align="start" gap={0}>
                      <Text fontSize="sm" color="gray.700">{aluno.responsavel}</Text>
                      <Text fontSize="xs" color="gray.400">{aluno.telefoneResponsavel}</Text>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600">
                      {new Date(aluno.dataNascimento).toLocaleDateString('pt-BR')}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={statusPalette[aluno.status]} size="sm">{aluno.status}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={1}>
                      <Tip label="Editar">
                        <Button size="xs" variant="ghost" colorPalette="blue">
                          <Icon><MdEdit /></Icon>
                        </Button>
                      </Tip>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {filtered.length === 0 && (
            <Box py={12} textAlign="center">
              <Icon boxSize={10} color="gray.300"><MdPerson /></Icon>
              <Text color="gray.400" mt={2}>Nenhum aluno encontrado</Text>
            </Box>
          )}
        </Table.ScrollArea>

        <Flex px={5} py={3} borderTopWidth={1} borderColor="gray.100" align="center">
          <Text fontSize="xs" color="gray.400">
            Exibindo {filtered.length} de {alunos.length} alunos
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

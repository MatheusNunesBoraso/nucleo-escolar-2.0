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
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch, MdAdd, MdGroup, MdEdit } from 'react-icons/md';
import AppLayout from '@/components/layout/AppLayout';
import { turmas } from '@/data/mock';

const turnoColor: Record<string, string> = {
  'Manhã': 'yellow',
  'Tarde': 'orange',
  'Noite': 'purple',
  'Integral': 'blue',
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

export default function TurmasPage() {
  const [search, setSearch] = useState('');
  const [turnoFilter, setTurnoFilter] = useState('');
  const [escolaFilter, setEscolaFilter] = useState('');

  const escolasUnicas = Array.from(new Set(turmas.map((t) => t.escolaId))).map(
    (id) => ({ id, nome: turmas.find((t) => t.escolaId === id)!.escolaNome })
  );

  const filtered = turmas.filter((t) => {
    const matchSearch =
      t.nome.toLowerCase().includes(search.toLowerCase()) ||
      t.escolaNome.toLowerCase().includes(search.toLowerCase()) ||
      t.professor.toLowerCase().includes(search.toLowerCase());
    const matchTurno = !turnoFilter || t.turno === turnoFilter;
    const matchEscola = !escolaFilter || t.escolaId === escolaFilter;
    return matchSearch && matchTurno && matchEscola;
  });

  return (
    <AppLayout title="Turmas" subtitle="Gerenciar turmas cadastradas">
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
              placeholder="Buscar turma, escola, professor..."
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
              {escolasUnicas.map((e) => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </NativeSelect.Field>
          </NativeSelect.Root>

          <NativeSelect.Root maxW="160px">
            <NativeSelect.Field
              value={turnoFilter}
              onChange={(e) => setTurnoFilter(e.target.value)}
              borderRadius="lg"
              bg="gray.50"
              fontSize="sm"
            >
              <option value="">Todos os turnos</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
              <option value="Integral">Integral</option>
            </NativeSelect.Field>
          </NativeSelect.Root>

          <Box flex={1} />

          <Button colorPalette="blue" size="md" borderRadius="lg">
            <Icon boxSize={4}><MdAdd /></Icon>
            Nova Turma
          </Button>
        </Flex>

        <Table.ScrollArea>
          <Table.Root size="sm" variant="line">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader fontSize="xs" color="gray.500" py={3} fontWeight="600">Turma</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Escola</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Turno</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Professor</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Ano Letivo</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600" textAlign="end">Alunos</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.map((turma) => (
                <Table.Row key={turma.id} _hover={{ bg: 'gray.50' }}>
                  <Table.Cell py={4}>
                    <HStack gap={3}>
                      <Box bg="blue.50" p={2} borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                        <Icon boxSize={4} color="blue.500"><MdGroup /></Icon>
                      </Box>
                      <VStack align="start" gap={0}>
                        <Text fontSize="sm" fontWeight="600" color="gray.800">{turma.nome}</Text>
                        <Text fontSize="xs" color="gray.400">{turma.serie}</Text>
                      </VStack>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.700" lineClamp={1} maxW="200px">{turma.escolaNome}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={turnoColor[turma.turno] || 'gray'} variant="subtle" size="sm">
                      {turma.turno}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.700">{turma.professor}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette="gray" size="sm">{turma.anoLetivo}</Badge>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <Text fontSize="sm" fontWeight="500">{turma.totalAlunos}</Text>
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
              <Icon boxSize={10} color="gray.300"><MdGroup /></Icon>
              <Text color="gray.400" mt={2}>Nenhuma turma encontrada</Text>
            </Box>
          )}
        </Table.ScrollArea>

        <Flex px={5} py={3} borderTopWidth={1} borderColor="gray.100" align="center">
          <Text fontSize="xs" color="gray.400">
            Exibindo {filtered.length} de {turmas.length} turmas
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

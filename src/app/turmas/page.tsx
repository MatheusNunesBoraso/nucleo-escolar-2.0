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
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch, MdAdd, MdGroup, MdEdit, MdVisibility } from 'react-icons/md';
import AppLayout from '@/components/layout/AppLayout';
import { turmas } from '@/data/mock';

const turnoColor: Record<string, string> = {
  'Manhã': 'yellow',
  'Tarde': 'orange',
  'Noite': 'purple',
  'Integral': 'blue',
};

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
      <Box bg="white" borderRadius="xl" boxShadow="sm" borderWidth={1} borderColor="gray.100" overflow="hidden">
        <Flex px={5} py={4} borderBottomWidth={1} borderColor="gray.100" gap={3} wrap="wrap" align="center">
          <InputGroup maxW="280px">
            <InputLeftElement>
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar turma, escola, professor..."
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
            {escolasUnicas.map((e) => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </Select>

          <Select
            maxW="160px"
            size="md"
            borderRadius="lg"
            bg="gray.50"
            fontSize="sm"
            value={turnoFilter}
            onChange={(e) => setTurnoFilter(e.target.value)}
          >
            <option value="">Todos os turnos</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
            <option value="Integral">Integral</option>
          </Select>

          <Box flex={1} />

          <Button leftIcon={<MdAdd />} colorScheme="blue" size="md" borderRadius="lg">
            Nova Turma
          </Button>
        </Flex>

        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th fontSize="xs" color="gray.500" py={3}>Turma</Th>
                <Th fontSize="xs" color="gray.500">Escola</Th>
                <Th fontSize="xs" color="gray.500">Turno</Th>
                <Th fontSize="xs" color="gray.500">Professor</Th>
                <Th fontSize="xs" color="gray.500">Ano Letivo</Th>
                <Th fontSize="xs" color="gray.500" isNumeric>Alunos</Th>
                <Th fontSize="xs" color="gray.500">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((turma) => (
                <Tr key={turma.id} _hover={{ bg: 'gray.50' }}>
                  <Td py={4}>
                    <HStack spacing={3}>
                      <Box
                        bg="blue.50"
                        p={2}
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={MdGroup} boxSize={4} color="blue.500" />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                          {turma.nome}
                        </Text>
                        <Text fontSize="xs" color="gray.500">{turma.serie}</Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.700" maxW="200px" noOfLines={1}>
                      {turma.escolaNome}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={turnoColor[turma.turno] || 'gray'}
                      variant="subtle"
                      fontSize="xs"
                    >
                      {turma.turno}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.700">{turma.professor}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme="gray" fontSize="xs">{turma.anoLetivo}</Badge>
                  </Td>
                  <Td isNumeric>
                    <Text fontSize="sm" fontWeight="medium">{turma.totalAlunos}</Text>
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
              <Icon as={MdGroup} boxSize={10} color="gray.300" />
              <Text color="gray.400" mt={2}>Nenhuma turma encontrada</Text>
            </Box>
          )}
        </Box>

        <Flex px={5} py={3} borderTopWidth={1} borderColor="gray.100" align="center" justify="space-between">
          <Text fontSize="xs" color="gray.500">
            Exibindo {filtered.length} de {turmas.length} turmas
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

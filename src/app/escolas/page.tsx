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
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch, MdAdd, MdSchool, MdEdit, MdVisibility } from 'react-icons/md';
import AppLayout from '@/components/layout/AppLayout';
import { escolas } from '@/data/mock';
import { TipoEscola, StatusEscola } from '@/types';

export default function EscolasPage() {
  const [search, setSearch] = useState('');
  const [tipoFilter, setTipoFilter] = useState<TipoEscola | ''>('');
  const [statusFilter, setStatusFilter] = useState<StatusEscola | ''>('');

  const filtered = escolas.filter((e) => {
    const matchSearch =
      e.nome.toLowerCase().includes(search.toLowerCase()) ||
      e.cidade.toLowerCase().includes(search.toLowerCase()) ||
      e.diretor.toLowerCase().includes(search.toLowerCase());
    const matchTipo = !tipoFilter || e.tipo === tipoFilter;
    const matchStatus = !statusFilter || e.status === statusFilter;
    return matchSearch && matchTipo && matchStatus;
  });

  return (
    <AppLayout title="Escolas" subtitle="Gerenciar escolas cadastradas">
      <Box bg="white" borderRadius="xl" boxShadow="sm" borderWidth={1} borderColor="gray.100" overflow="hidden">
        {/* Toolbar */}
        <Flex
          px={5}
          py={4}
          borderBottomWidth={1}
          borderColor="gray.100"
          gap={3}
          wrap="wrap"
          align="center"
        >
          <InputGroup maxW="300px">
            <InputLeftElement>
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar escola, cidade, diretor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="lg"
              bg="gray.50"
              borderColor="gray.200"
              fontSize="sm"
            />
          </InputGroup>

          <Select
            maxW="180px"
            size="md"
            borderRadius="lg"
            bg="gray.50"
            fontSize="sm"
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value as TipoEscola | '')}
          >
            <option value="">Todos os tipos</option>
            <option value="Particular">Particular</option>
            <option value="Pública">Pública</option>
          </Select>

          <Select
            maxW="160px"
            size="md"
            borderRadius="lg"
            bg="gray.50"
            fontSize="sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusEscola | '')}
          >
            <option value="">Todos status</option>
            <option value="Ativa">Ativa</option>
            <option value="Inativa">Inativa</option>
          </Select>

          <Box flex={1} />

          <Button leftIcon={<MdAdd />} colorScheme="blue" size="md" borderRadius="lg">
            Nova Escola
          </Button>
        </Flex>

        {/* Table */}
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th fontSize="xs" color="gray.500" py={3}>Escola</Th>
                <Th fontSize="xs" color="gray.500">Tipo</Th>
                <Th fontSize="xs" color="gray.500">Localização</Th>
                <Th fontSize="xs" color="gray.500">Diretor</Th>
                <Th fontSize="xs" color="gray.500" isNumeric>Turmas</Th>
                <Th fontSize="xs" color="gray.500" isNumeric>Alunos</Th>
                <Th fontSize="xs" color="gray.500">Status</Th>
                <Th fontSize="xs" color="gray.500">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((escola) => (
                <Tr key={escola.id} _hover={{ bg: 'gray.50' }}>
                  <Td py={4}>
                    <HStack spacing={3}>
                      <Avatar
                        size="sm"
                        name={escola.nome}
                        bg={escola.tipo === 'Particular' ? 'purple.100' : 'teal.100'}
                        color={escola.tipo === 'Particular' ? 'purple.600' : 'teal.600'}
                        icon={<Icon as={MdSchool} />}
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                          {escola.nome}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {escola.email}
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={escola.tipo === 'Particular' ? 'purple' : 'teal'}
                      variant="subtle"
                      fontSize="xs"
                    >
                      {escola.tipo}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.700">
                      {escola.cidade}, {escola.estado}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.700">{escola.diretor}</Text>
                  </Td>
                  <Td isNumeric>
                    <Text fontSize="sm" fontWeight="medium">{escola.totalTurmas}</Text>
                  </Td>
                  <Td isNumeric>
                    <Text fontSize="sm" fontWeight="medium">{escola.totalAlunos}</Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={escola.status === 'Ativa' ? 'green' : 'red'}
                      fontSize="xs"
                    >
                      {escola.status}
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
              <Icon as={MdSchool} boxSize={10} color="gray.300" />
              <Text color="gray.400" mt={2}>Nenhuma escola encontrada</Text>
            </Box>
          )}
        </Box>

        <Flex px={5} py={3} borderTopWidth={1} borderColor="gray.100" align="center" justify="space-between">
          <Text fontSize="xs" color="gray.500">
            Exibindo {filtered.length} de {escolas.length} escolas
          </Text>
        </Flex>
      </Box>
    </AppLayout>
  );
}

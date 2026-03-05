'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  Text,
  VStack,
  Badge,
  Avatar,
  Table,
  Tooltip,
  Dialog,
  CloseButton,
} from '@chakra-ui/react';
import { MdAdd, MdDelete, MdEdit, MdSchool, MdSearch } from 'react-icons/md';
import AppLayout from '@/components/layout/AppLayout';
import { escolaStore } from '@/data/escolaStore';
import { Escola, EscolaStatus, EscolaType } from '@/types';
import { toaster } from '@/lib/toaster';

const typeLabel = (t: EscolaType) => (t === 'public' ? 'Pública' : 'Particular');
const statusLabel = (s: EscolaStatus) => (s === 'active' ? 'Ativa' : 'Inativa');

const STAGE_LABELS: Record<string, string> = {
  infantil: 'Infantil',
  fundamental1: 'Fund. I',
  fundamental2: 'Fund. II',
  medio: 'Médio',
  eja: 'EJA',
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

export default function EscolasPage() {
  const [escolas, setEscolas] = useState<Escola[]>(() => escolaStore.getAll());
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<EscolaType | ''>('');
  const [statusFilter, setStatusFilter] = useState<EscolaStatus | ''>('');
  const [escolaToDelete, setEscolaToDelete] = useState<Escola | null>(null);

  const filtered = escolas.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()) ||
      (e.email ?? '').toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || e.type === typeFilter;
    const matchStatus = !statusFilter || e.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  function handleDelete() {
    if (!escolaToDelete) return;
    escolaStore.remove(escolaToDelete.id);
    setEscolas(escolaStore.getAll());
    toaster.success({ title: 'Escola excluída com sucesso', duration: 2500 });
    setEscolaToDelete(null);
  }

  return (
    <AppLayout title="Escolas" subtitle="Gerenciar escolas cadastradas">
      <Box bg="white" borderRadius="xl" borderWidth={1} borderColor="gray.100" overflow="hidden">
        {/* Toolbar */}
        <Flex px={5} py={4} borderBottomWidth={1} borderColor="gray.100" gap={3} wrap="wrap" align="center">
          <InputGroup
            maxW="300px"
            startElement={
              <Icon color="gray.400" boxSize={4}>
                <MdSearch />
              </Icon>
            }
          >
            <Input
              placeholder="Buscar escola ou cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="lg"
              bg="gray.50"
              borderColor="gray.200"
              fontSize="sm"
            />
          </InputGroup>

          <NativeSelect.Root maxW="180px">
            <NativeSelect.Field
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as EscolaType | '')}
              borderRadius="lg"
              bg="gray.50"
              fontSize="sm"
            >
              <option value="">Todos os tipos</option>
              <option value="public">Pública</option>
              <option value="private">Particular</option>
            </NativeSelect.Field>
          </NativeSelect.Root>

          <NativeSelect.Root maxW="160px">
            <NativeSelect.Field
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EscolaStatus | '')}
              borderRadius="lg"
              bg="gray.50"
              fontSize="sm"
            >
              <option value="">Todos status</option>
              <option value="active">Ativa</option>
              <option value="inactive">Inativa</option>
            </NativeSelect.Field>
          </NativeSelect.Root>

          <Box flex={1} />

          <Button colorPalette="blue" size="md" borderRadius="lg" asChild>
            <NextLink href="/escolas/nova">
              <Icon boxSize={4}><MdAdd /></Icon>
              Nova Escola
            </NextLink>
          </Button>
        </Flex>

        {/* Table */}
        <Table.ScrollArea>
          <Table.Root size="sm" variant="line">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader fontSize="xs" color="gray.500" py={3} fontWeight="600">Escola</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Tipo</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Localização</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Etapas</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600" textAlign="end">Turmas</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600" textAlign="end">Alunos</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Status</Table.ColumnHeader>
                <Table.ColumnHeader fontSize="xs" color="gray.500" fontWeight="600">Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.map((escola) => (
                <Table.Row key={escola.id} _hover={{ bg: 'gray.50' }}>
                  <Table.Cell py={4}>
                    <HStack gap={3}>
                      <Avatar.Root size="sm" colorPalette={escola.type === 'private' ? 'purple' : 'teal'}>
                        <Avatar.Fallback>
                          <Icon boxSize={4}><MdSchool /></Icon>
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <VStack align="start" gap={0}>
                        <Text fontSize="sm" fontWeight="600" color="gray.800">
                          {escola.name}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          {escola.email ?? '—'}
                        </Text>
                      </VStack>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={escola.type === 'private' ? 'purple' : 'teal'} variant="subtle" size="sm">
                      {typeLabel(escola.type)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.700">{escola.city}, {escola.state}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={1} flexWrap="wrap">
                      {escola.educationStages.slice(0, 2).map((s) => (
                        <Badge key={s} colorPalette="blue" variant="subtle" size="sm">
                          {STAGE_LABELS[s] ?? s}
                        </Badge>
                      ))}
                      {escola.educationStages.length > 2 && (
                        <Badge colorPalette="gray" variant="subtle" size="sm">
                          +{escola.educationStages.length - 2}
                        </Badge>
                      )}
                    </HStack>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <Text fontSize="sm" fontWeight="500">{escola.totalTurmas}</Text>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <Text fontSize="sm" fontWeight="500">{escola.totalAlunos}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={escola.status === 'active' ? 'green' : 'red'} size="sm">
                      {statusLabel(escola.status)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={1}>
                      <Tip label="Editar">
                        <Button size="xs" variant="ghost" colorPalette="blue" asChild>
                          <NextLink href={`/escolas/${escola.id}/editar`}>
                            <Icon><MdEdit /></Icon>
                          </NextLink>
                        </Button>
                      </Tip>
                      <Tip label="Excluir">
                        <Button size="xs" variant="ghost" colorPalette="red" onClick={() => setEscolaToDelete(escola)}>
                          <Icon><MdDelete /></Icon>
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
              <Icon boxSize={10} color="gray.300"><MdSchool /></Icon>
              <Text color="gray.400" mt={2}>Nenhuma escola encontrada</Text>
            </Box>
          )}
        </Table.ScrollArea>

        <Flex px={5} py={3} borderTopWidth={1} borderColor="gray.100" align="center">
          <Text fontSize="xs" color="gray.400">
            Exibindo {filtered.length} de {escolas.length} escolas
          </Text>
        </Flex>
      </Box>

      {/* Dialog de exclusão */}
      <Dialog.Root
        open={!!escolaToDelete}
        onOpenChange={({ open }) => { if (!open) setEscolaToDelete(null); }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Excluir Escola</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Tem certeza que deseja excluir{' '}
              <Text as="span" fontWeight="700">{escolaToDelete?.name}</Text>?
              {' '}Esta ação não pode ser desfeita.
            </Dialog.Body>
            <Dialog.Footer gap={3}>
              <Button variant="outline" onClick={() => setEscolaToDelete(null)}>
                Cancelar
              </Button>
              <Button colorPalette="red" onClick={handleDelete}>
                Excluir
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild position="absolute" top={3} right={3}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </AppLayout>
  );
}

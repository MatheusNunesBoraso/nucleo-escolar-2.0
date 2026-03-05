'use client';

import { SimpleGrid, Box, Text, HStack, Badge, VStack, Separator } from '@chakra-ui/react';
import AppLayout from '@/components/layout/AppLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import SchoolTree from '@/components/dashboard/SchoolTree';
import { MdSchool, MdGroup, MdPerson, MdVerified } from 'react-icons/md';
import { dashboardStats, alunos } from '@/data/mock';

export default function DashboardPage() {
  const recentAlunos = [...alunos].reverse().slice(0, 5);

  return (
    <AppLayout title="Dashboard" subtitle="Visão geral do Núcleo Escolar 2.0">
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap={4} mb={6}>
        <StatsCard
          title="Total de Escolas"
          value={dashboardStats.totalEscolas}
          helpText="escolas cadastradas"
          icon={MdSchool}
          colorPalette="blue"
          trend="up"
          trendValue="+2"
        />
        <StatsCard
          title="Total de Turmas"
          value={dashboardStats.totalTurmas}
          helpText="turmas ativas"
          icon={MdGroup}
          colorPalette="purple"
          trend="up"
          trendValue="+3"
        />
        <StatsCard
          title="Total de Alunos"
          value={dashboardStats.totalAlunos}
          helpText="alunos cadastrados"
          icon={MdPerson}
          colorPalette="green"
          trend="up"
          trendValue="+15"
        />
        <StatsCard
          title="Alunos Ativos"
          value={dashboardStats.alunosAtivos}
          helpText={`de ${dashboardStats.totalAlunos} cadastrados`}
          icon={MdVerified}
          colorPalette="teal"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4} mb={6}>
        <Box bg="white" borderRadius="xl" p={5} borderWidth={1} borderColor="gray.100">
          <Text fontWeight="700" fontSize="sm" color="gray.800" mb={4}>
            Tipo de Escola
          </Text>
          <VStack align="stretch" gap={4}>
            <Box>
              <HStack justify="space-between" mb={2}>
                <HStack gap={2}>
                  <Box w={2.5} h={2.5} borderRadius="full" bg="purple.400" />
                  <Text fontSize="sm" color="gray.600">Particulares</Text>
                </HStack>
                <HStack gap={1}>
                  <Text fontWeight="700" fontSize="sm" color="purple.600">
                    {dashboardStats.escolasParticulares}
                  </Text>
                  <Badge colorPalette="purple" variant="subtle" size="sm">
                    {Math.round((dashboardStats.escolasParticulares / dashboardStats.totalEscolas) * 100)}%
                  </Badge>
                </HStack>
              </HStack>
              <Box bg="purple.100" borderRadius="full" h={1.5} overflow="hidden">
                <Box
                  bg="purple.400"
                  h="100%"
                  w={`${(dashboardStats.escolasParticulares / dashboardStats.totalEscolas) * 100}%`}
                  borderRadius="full"
                />
              </Box>
            </Box>

            <Box>
              <HStack justify="space-between" mb={2}>
                <HStack gap={2}>
                  <Box w={2.5} h={2.5} borderRadius="full" bg="teal.400" />
                  <Text fontSize="sm" color="gray.600">Públicas</Text>
                </HStack>
                <HStack gap={1}>
                  <Text fontWeight="700" fontSize="sm" color="teal.600">
                    {dashboardStats.escolasPublicas}
                  </Text>
                  <Badge colorPalette="teal" variant="subtle" size="sm">
                    {Math.round((dashboardStats.escolasPublicas / dashboardStats.totalEscolas) * 100)}%
                  </Badge>
                </HStack>
              </HStack>
              <Box bg="teal.100" borderRadius="full" h={1.5} overflow="hidden">
                <Box
                  bg="teal.400"
                  h="100%"
                  w={`${(dashboardStats.escolasPublicas / dashboardStats.totalEscolas) * 100}%`}
                  borderRadius="full"
                />
              </Box>
            </Box>
          </VStack>
        </Box>

        <Box
          bg="white"
          borderRadius="xl"
          p={5}
          borderWidth={1}
          borderColor="gray.100"
          gridColumn={{ lg: 'span 2' }}
        >
          <Text fontWeight="700" fontSize="sm" color="gray.800" mb={4}>
            Últimos Alunos Cadastrados
          </Text>
          <VStack align="stretch" gap={0}>
            {recentAlunos.map((aluno, i) => (
              <Box key={aluno.id}>
                {i > 0 && <Separator />}
                <HStack py={2.5} justify="space-between">
                  <Box>
                    <Text fontSize="sm" fontWeight="500" color="gray.800">
                      {aluno.nome}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {aluno.escolaNome} · {aluno.turmaNome}
                    </Text>
                  </Box>
                  <Badge
                    colorPalette={aluno.status === 'Ativo' ? 'green' : aluno.status === 'Inativo' ? 'red' : 'orange'}
                    size="sm"
                  >
                    {aluno.status}
                  </Badge>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      <SchoolTree />
    </AppLayout>
  );
}

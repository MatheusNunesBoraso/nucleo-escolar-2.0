'use client';

import { SimpleGrid, Box, Text, HStack, Badge, VStack, Divider } from '@chakra-ui/react';
import AppLayout from '@/components/layout/AppLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import SchoolTree from '@/components/dashboard/SchoolTree';
import { MdSchool, MdGroup, MdPerson, MdVerified, MdPublic, MdLock } from 'react-icons/md';
import { dashboardStats, escolas, alunos } from '@/data/mock';

export default function DashboardPage() {
  const recentAlunos = [...alunos].reverse().slice(0, 5);

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Visão geral do Núcleo Escolar 2.0"
    >
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={4} mb={6}>
        <StatsCard
          title="Total de Escolas"
          value={dashboardStats.totalEscolas}
          helpText="escolas cadastradas"
          icon={MdSchool}
          colorScheme="blue"
          trend="increase"
          trendValue="+2"
        />
        <StatsCard
          title="Total de Turmas"
          value={dashboardStats.totalTurmas}
          helpText="turmas ativas"
          icon={MdGroup}
          colorScheme="purple"
          trend="increase"
          trendValue="+3"
        />
        <StatsCard
          title="Total de Alunos"
          value={dashboardStats.totalAlunos}
          helpText="alunos cadastrados"
          icon={MdPerson}
          colorScheme="green"
          trend="increase"
          trendValue="+15"
        />
        <StatsCard
          title="Alunos Ativos"
          value={dashboardStats.alunosAtivos}
          helpText={`de ${dashboardStats.totalAlunos} cadastrados`}
          icon={MdVerified}
          colorScheme="teal"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4} mb={6}>
        <Box
          bg="white"
          borderRadius="xl"
          p={5}
          boxShadow="sm"
          borderWidth={1}
          borderColor="gray.100"
        >
          <Text fontWeight="bold" fontSize="md" color="gray.800" mb={4}>
            Tipo de Escola
          </Text>
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <HStack>
                <Box w={3} h={3} borderRadius="full" bg="purple.400" />
                <Text fontSize="sm" color="gray.600">Particulares</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="purple.600">
                  {dashboardStats.escolasParticulares}
                </Text>
                <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                  {Math.round((dashboardStats.escolasParticulares / dashboardStats.totalEscolas) * 100)}%
                </Badge>
              </HStack>
            </HStack>
            <Box bg="purple.100" borderRadius="full" h={2} overflow="hidden">
              <Box
                bg="purple.400"
                h="100%"
                w={`${(dashboardStats.escolasParticulares / dashboardStats.totalEscolas) * 100}%`}
                borderRadius="full"
              />
            </Box>

            <HStack justify="space-between">
              <HStack>
                <Box w={3} h={3} borderRadius="full" bg="teal.400" />
                <Text fontSize="sm" color="gray.600">Públicas</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="teal.600">
                  {dashboardStats.escolasPublicas}
                </Text>
                <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                  {Math.round((dashboardStats.escolasPublicas / dashboardStats.totalEscolas) * 100)}%
                </Badge>
              </HStack>
            </HStack>
            <Box bg="teal.100" borderRadius="full" h={2} overflow="hidden">
              <Box
                bg="teal.400"
                h="100%"
                w={`${(dashboardStats.escolasPublicas / dashboardStats.totalEscolas) * 100}%`}
                borderRadius="full"
              />
            </Box>
          </VStack>
        </Box>

        <Box
          bg="white"
          borderRadius="xl"
          p={5}
          boxShadow="sm"
          borderWidth={1}
          borderColor="gray.100"
          gridColumn={{ lg: 'span 2' }}
        >
          <Text fontWeight="bold" fontSize="md" color="gray.800" mb={4}>
            Ultimos Alunos Cadastrados
          </Text>
          <VStack align="stretch" spacing={0} divider={<Divider />}>
            {recentAlunos.map((aluno) => (
              <HStack key={aluno.id} py={2.5} justify="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.800">
                    {aluno.nome}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {aluno.escolaNome} · {aluno.turmaNome}
                  </Text>
                </Box>
                <Badge
                  colorScheme={aluno.status === 'Ativo' ? 'green' : aluno.status === 'Inativo' ? 'red' : 'orange'}
                  fontSize="xs"
                >
                  {aluno.status}
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      <SchoolTree />
    </AppLayout>
  );
}

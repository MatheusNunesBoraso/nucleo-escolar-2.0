'use client';

import {
  Box,
  Flex,
  Text,
  VStack,
  Icon,
  Link,
  Divider,
  Badge,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdSchool, MdGroup, MdPerson, MdMenuBook } from 'react-icons/md';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: MdDashboard },
  { label: 'Escolas', href: '/escolas', icon: MdSchool },
  { label: 'Turmas', href: '/turmas', icon: MdGroup },
  { label: 'Alunos', href: '/alunos', icon: MdPerson },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      w="260px"
      minH="100vh"
      bg="brand.700"
      color="white"
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      py={6}
      px={4}
      position="fixed"
      left={0}
      top={0}
      zIndex={100}
      boxShadow="2xl"
    >
      {/* Logo */}
      <Flex align="center" gap={3} px={2} mb={8}>
        <Box
          bg="brand.400"
          borderRadius="lg"
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={MdMenuBook} boxSize={6} color="white" />
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="md" lineHeight={1.2}>
            Núcleo Escolar
          </Text>
          <Badge colorScheme="blue" fontSize="xs" variant="solid" bg="brand.400">
            v2.0
          </Badge>
        </Box>
      </Flex>

      <Divider borderColor="brand.600" mb={4} />

      <Text fontSize="xs" fontWeight="semibold" color="brand.300" px={2} mb={3} textTransform="uppercase" letterSpacing="wider">
        Menu Principal
      </Text>

      <VStack align="stretch" spacing={1} flex={1}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              as={NextLink}
              href={item.href}
              _hover={{ textDecoration: 'none' }}
            >
              <Flex
                align="center"
                gap={3}
                px={3}
                py={2.5}
                borderRadius="lg"
                bg={isActive ? 'brand.500' : 'transparent'}
                color={isActive ? 'white' : 'brand.200'}
                _hover={{ bg: 'brand.600', color: 'white' }}
                transition="all 0.15s"
                cursor="pointer"
              >
                <Icon as={item.icon} boxSize={5} />
                <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'medium'}>
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </VStack>

      <Divider borderColor="brand.600" mb={4} />

      <Box px={2}>
        <Text fontSize="xs" color="brand.300" textAlign="center">
          © 2026 Núcleo Escolar 2.0
        </Text>
      </Box>
    </Box>
  );
}

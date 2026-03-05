'use client';

import { Box, Flex, Text, VStack, Icon, Badge, Separator } from '@chakra-ui/react';
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
      w="256px"
      minH="100vh"
      bg="#111827"
      color="white"
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      position="fixed"
      left={0}
      top={0}
      zIndex={100}
    >
      {/* Logo */}
      <Flex align="center" gap={3} px={5} py={5} borderBottomWidth={1} borderColor="whiteAlpha.100">
        <Flex
          align="center"
          justify="center"
          w="36px"
          h="36px"
          bg="blue.600"
          borderRadius="lg"
          flexShrink={0}
        >
          <Icon color="white" boxSize={5}>
            <MdMenuBook />
          </Icon>
        </Flex>
        <Box>
          <Text fontWeight="700" fontSize="sm" letterSpacing="tight" lineHeight={1.2}>
            Núcleo Escolar
          </Text>
          <Badge colorPalette="blue" size="sm" variant="solid" mt="1px">
            v2.0
          </Badge>
        </Box>
      </Flex>

      {/* Nav */}
      <VStack align="stretch" gap={1} px={3} py={4} flex={1}>
        <Text
          fontSize="10px"
          fontWeight="600"
          color="whiteAlpha.400"
          textTransform="uppercase"
          letterSpacing="widest"
          px={3}
          mb={1}
        >
          Menu
        </Text>

        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <NextLink key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <Flex
                align="center"
                gap={3}
                px={3}
                py={2.5}
                borderRadius="lg"
                bg={isActive ? 'blue.600' : 'transparent'}
                color={isActive ? 'white' : 'whiteAlpha.600'}
                _hover={{
                  bg: isActive ? 'blue.600' : 'whiteAlpha.100',
                  color: 'white',
                }}
                transition="all 0.15s"
                cursor="pointer"
              >
                <Icon boxSize={4}>
                  <item.icon />
                </Icon>
                <Text fontSize="sm" fontWeight={isActive ? '600' : '400'}>
                  {item.label}
                </Text>
              </Flex>
            </NextLink>
          );
        })}
      </VStack>

      {/* Footer */}
      <Box px={5} py={4} borderTopWidth={1} borderColor="whiteAlpha.100">
        <Text fontSize="11px" color="whiteAlpha.300" textAlign="center">
          © 2026 Núcleo Escolar 2.0
        </Text>
      </Box>
    </Box>
  );
}

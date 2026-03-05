'use client';

import {
  Box,
  Flex,
  Text,
  Avatar,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
} from '@chakra-ui/react';
import { MdNotifications, MdSearch } from 'react-icons/md';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <Box
      bg="white"
      borderBottomWidth={1}
      borderColor="gray.200"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={50}
      boxShadow="sm"
    >
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="sm" color="gray.500">
              {subtitle}
            </Text>
          )}
        </Box>

        <HStack spacing={4}>
          <InputGroup maxW="240px" display={{ base: 'none', lg: 'flex' }}>
            <InputLeftElement>
              <Icon as={MdSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Buscar..."
              size="sm"
              borderRadius="lg"
              bg="gray.50"
              borderColor="gray.200"
              _focus={{ borderColor: 'brand.400', bg: 'white' }}
            />
          </InputGroup>

          <Box position="relative" cursor="pointer">
            <Icon as={MdNotifications} boxSize={6} color="gray.500" />
            <Badge
              position="absolute"
              top="-2px"
              right="-2px"
              colorScheme="red"
              borderRadius="full"
              fontSize="9px"
              minW="16px"
              h="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              3
            </Badge>
          </Box>

          <HStack spacing={2} cursor="pointer">
            <Avatar size="sm" name="Admin" bg="brand.500" color="white" />
            <Box display={{ base: 'none', lg: 'block' }}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                Administrador
              </Text>
              <Text fontSize="xs" color="gray.500">
                admin@nucleo.edu.br
              </Text>
            </Box>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}

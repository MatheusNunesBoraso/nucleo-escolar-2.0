'use client';

import { Box, Flex, Text, Avatar, HStack, Icon, Input, InputGroup, Badge } from '@chakra-ui/react';
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
      borderColor="gray.100"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={50}
    >
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="lg" fontWeight="700" color="gray.900" lineHeight={1.2}>
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="sm" color="gray.400" mt={0.5}>
              {subtitle}
            </Text>
          )}
        </Box>

        <HStack gap={4}>
          <InputGroup
            maxW="220px"
            display={{ base: 'none', lg: 'flex' }}
            startElement={
              <Icon color="gray.400" boxSize={4}>
                <MdSearch />
              </Icon>
            }
          >
            <Input
              placeholder="Buscar..."
              size="sm"
              borderRadius="lg"
              bg="gray.50"
              borderColor="gray.200"
              fontSize="sm"
              _focus={{ borderColor: 'blue.400', bg: 'white' }}
            />
          </InputGroup>

          <Box position="relative" cursor="pointer">
            <Icon boxSize={5} color="gray.400">
              <MdNotifications />
            </Icon>
            <Badge
              position="absolute"
              top="-6px"
              right="-6px"
              colorPalette="red"
              borderRadius="full"
              fontSize="9px"
              minW="16px"
              h="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              variant="solid"
            >
              3
            </Badge>
          </Box>

          <HStack gap={2} cursor="pointer">
            <Avatar.Root size="sm" colorPalette="blue">
              <Avatar.Fallback name="Admin" />
            </Avatar.Root>
            <Box display={{ base: 'none', lg: 'block' }}>
              <Text fontSize="sm" fontWeight="600" color="gray.800" lineHeight={1.2}>
                Administrador
              </Text>
              <Text fontSize="xs" color="gray.400">
                admin@nucleo.edu.br
              </Text>
            </Box>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}

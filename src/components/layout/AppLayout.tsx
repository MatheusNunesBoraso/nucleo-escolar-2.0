'use client';

import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar />
      <Box flex={1} ml={{ base: 0, md: '260px' }} display="flex" flexDirection="column">
        <Header title={title} subtitle={subtitle} />
        <Box flex={1} p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

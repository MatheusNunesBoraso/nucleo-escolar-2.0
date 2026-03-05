'use client';

import { Box, Flex, Text, Icon, Stat, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: number | string;
  helpText?: string;
  icon: IconType;
  colorScheme: string;
  trend?: 'increase' | 'decrease';
  trendValue?: string;
}

export default function StatsCard({
  title,
  value,
  helpText,
  icon,
  colorScheme,
  trend,
  trendValue,
}: StatsCardProps) {
  const bgMap: Record<string, string> = {
    blue: 'blue.50',
    green: 'green.50',
    purple: 'purple.50',
    orange: 'orange.50',
    red: 'red.50',
    teal: 'teal.50',
  };

  const colorMap: Record<string, string> = {
    blue: 'blue.500',
    green: 'green.500',
    purple: 'purple.500',
    orange: 'orange.500',
    red: 'red.500',
    teal: 'teal.500',
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      boxShadow="sm"
      borderWidth={1}
      borderColor="gray.100"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="flex-start">
        <Stat>
          <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={1}>
            {title}
          </Text>
          <StatNumber fontSize="3xl" fontWeight="bold" color="gray.800">
            {value}
          </StatNumber>
          {helpText && (
            <StatHelpText fontSize="xs" color="gray.400" mb={0}>
              {trend && <StatArrow type={trend} />}
              {trendValue && <>{trendValue} </>}
              {helpText}
            </StatHelpText>
          )}
        </Stat>
        <Box
          bg={bgMap[colorScheme] || 'blue.50'}
          p={3}
          borderRadius="lg"
        >
          <Icon as={icon} boxSize={6} color={colorMap[colorScheme] || 'blue.500'} />
        </Box>
      </Flex>
    </Box>
  );
}

'use client';

import { Box, Flex, Icon, Stat } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: number | string;
  helpText?: string;
  icon: IconType;
  colorPalette: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

export default function StatsCard({
  title,
  value,
  helpText,
  icon: IconComponent,
  colorPalette,
  trend,
  trendValue,
}: StatsCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={5}
      borderWidth={1}
      borderColor="gray.100"
      _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
      transition="all 0.15s"
    >
      <Flex justify="space-between" align="flex-start">
        <Stat.Root>
          <Stat.Label fontSize="xs" color="gray.500" fontWeight="500">
            {title}
          </Stat.Label>
          <Stat.ValueText fontSize="3xl" fontWeight="700" color="gray.900" mt={1}>
            {value}
          </Stat.ValueText>
          {helpText && (
            <Stat.HelpText fontSize="xs" color="gray.400" mt={1} mb={0}>
              {trend === 'up' && <Stat.UpIndicator />}
              {trend === 'down' && <Stat.DownIndicator />}
              {trendValue && <>{trendValue} </>}
              {helpText}
            </Stat.HelpText>
          )}
        </Stat.Root>

        <Box bg={`${colorPalette}.50`} p={3} borderRadius="lg" flexShrink={0}>
          <Icon boxSize={5} color={`${colorPalette}.500`}>
            <IconComponent />
          </Icon>
        </Box>
      </Flex>
    </Box>
  );
}

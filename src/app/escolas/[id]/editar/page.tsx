'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text } from '@chakra-ui/react';
import AppLayout from '@/components/layout/AppLayout';
import EscolaForm from '@/components/escolas/EscolaForm';
import { escolaStore } from '@/data/escolaStore';
import { toaster } from '@/lib/toaster';
import { Escola } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditarEscolaPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const escola = escolaStore.getById(id);

  if (!escola) {
    return (
      <AppLayout title="Escola não encontrada">
        <Box py={20} textAlign="center">
          <Text color="gray.400">A escola solicitada não foi encontrada.</Text>
        </Box>
      </AppLayout>
    );
  }

  function handleSave(updated: Escola) {
    escolaStore.update(updated);
    toaster.success({ title: 'Escola atualizada com sucesso!', duration: 2500 });
    router.push('/escolas');
  }

  return (
    <AppLayout title="Editar Escola" subtitle={escola.name}>
      <EscolaForm
        initialData={escola}
        onSave={handleSave}
        onCancel={() => router.push('/escolas')}
      />
    </AppLayout>
  );
}

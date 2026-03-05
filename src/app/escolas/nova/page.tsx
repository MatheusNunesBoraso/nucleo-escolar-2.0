'use client';

import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import EscolaForm from '@/components/escolas/EscolaForm';
import { escolaStore } from '@/data/escolaStore';
import { toaster } from '@/lib/toaster';
import { Escola } from '@/types';

export default function NovaEscolaPage() {
  const router = useRouter();

  function handleSave(escola: Escola) {
    escolaStore.add(escola);
    toaster.success({ title: 'Escola cadastrada com sucesso!', duration: 2500 });
    router.push('/escolas');
  }

  return (
    <AppLayout title="Nova Escola" subtitle="Preencha os dados para cadastrar uma nova escola">
      <EscolaForm onSave={handleSave} onCancel={() => router.push('/escolas')} />
    </AppLayout>
  );
}

'use client';

import {
  Toaster as ChakraToaster,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastIndicator,
  ToastCloseTrigger,
  Stack,
  Portal,
  createToaster,
} from '@chakra-ui/react';

export const toaster = createToaster({ placement: 'bottom-end', pauseOnPageIdle: true });

export function Toaster() {
  return (
    <Portal>
      <ChakraToaster toaster={toaster}>
        {(toast) => (
          <ToastRoot key={toast.id}>
            <ToastIndicator />
            <Stack gap="1" flex="1" maxW="sm">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </Stack>
            <ToastCloseTrigger />
          </ToastRoot>
        )}
      </ChakraToaster>
    </Portal>
  );
}

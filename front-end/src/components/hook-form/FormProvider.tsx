import { ReactNode } from 'react';
import { FormProvider as Provider, UseFormReturn } from 'react-hook-form';

interface IFormProvider<Type extends Record<string, any>> {
  methods: UseFormReturn<Type>;
  onSubmit: () => void;
  children: ReactNode;
}

export default function FormProvider<Type extends Record<string, any>>({
  methods,
  onSubmit,
  children,
}: IFormProvider<Type>) {
  return (
    <Provider {...methods}>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        {children}
      </form>
    </Provider>
  );
}

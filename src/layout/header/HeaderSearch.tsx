'use client';

//THIRD PARTY MODULES
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next-intl/client';
import { zodResolver } from '@hookform/resolvers/zod';
//LAYOUT, COMPONENTS
import BaseInput from '_@shared/components/input/BaseInput';
//SHARED
import SearchIcon from '_@shared/icons/SearchIcon';

const schema = z.object({ keyword: z.string().min(1) });
type FormValues = z.infer<typeof schema>;

export default function HeaderSearch({ className }: { className?: string }) {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    router.push(`/exploring-food?keyword=${data.keyword}`);
    reset();
  });

  return (
    <form onSubmit={onSubmit} className={className}>
      <BaseInput
        theme="dark"
        className="input-large"
        placeholder="What do you want to eat today?"
        {...register('keyword')}
        trailingComponent={
          <SearchIcon onClick={onSubmit} className="h-4.5 w-4.5 cursor-pointer text-white" />
        }
      />
    </form>
  );
}

'use client';

//THIRD PARTY MODULES
import { z } from 'zod';
import classcat from 'classcat';
import { SocialPlatform } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
//LAYOUT, COMPONENTS
import BaseInput from '_@shared/components/input/BaseInput';
//SHARED
import SearchIcon from '_@shared/icons/SearchIcon';
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString';
//RELATIVE MODULES
import SocialPlatformFilter from './SocialPlatformFilter';

const schema = z.object({
  keyword: z.string().optional(),
  platform: z.nativeEnum(SocialPlatform).optional(),
});
type FormValues = z.infer<typeof schema>;

const SocialPageFilter = () => {
  const filter = useFilterQueryString();
  const searchParams = useSearchParams();

  const { handleSubmit, register, control } = useForm<FormValues>({
    defaultValues: {
      keyword: searchParams.get('keyword') || '',
      platform: (searchParams.get('platform') as SocialPlatform | null) || undefined,
    },
  });

  const onSubmit = handleSubmit((data) => {
    filter({ size: undefined, ...data });
  });

  return (
    <form
      onSubmit={onSubmit}
      className={classcat([
        'grid gap-10',
        'lg:grid-cols-[theme(spacing.135)_1fr] lg:items-center lg:justify-between',
      ])}
    >
      <div className="max-w-[theme(spacing.135)]">
        <BaseInput
          placeholder="Search"
          className="input-large"
          {...register('keyword')}
          trailingComponent={
            <SearchIcon onClick={onSubmit} className="h-4.5 w-4.5 cursor-pointer" />
          }
        />
      </div>

      <Controller
        name="platform"
        control={control}
        render={({ field: { value, onChange } }) => (
          <SocialPlatformFilter value={value} onChange={onChange} onSubmit={onSubmit} />
        )}
      />
    </form>
  );
};

export default SocialPageFilter;

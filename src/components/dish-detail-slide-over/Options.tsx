'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { firstUpper } from '_@landing/utils/wordFormat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import Switch from '_@shared/components/conditions/Switch';
import BaseFormItem from '_@shared/components/BaseFormItem';
import FormRadioGroup from '_@shared/components/radio/FormRadioGroup';
import FormCheckboxGroup from '_@shared/components/checkbox/FormCheckboxGroup';
import FormCheckboxRadio from '_@shared/components/checkbox-radio/FormCheckboxRadio';
//RELATIVE MODULES
import { Addons } from '.';
//TYPES MODULES
import type { Assign } from '_@shared/utils/type';
import type { AddOnOptions } from '@prisma/client';

type OptionItem = Assign<
  AddOnOptions,
  {
    default?: boolean;
    order?: number;
    addOnId?: string;
  }
>;

type Props = Omit<Omit<Addons, 'options'>, 'deleted'> & {
  label?: string;
  options: OptionItem[];
};

const Options = (props: Props) => {
  if (props.options?.length === 0) return null;

  return (
    <div className={classcat(['grid gap-2', 'md:gap-4'])}>
      <div className="flex items-center justify-between border-b border-blu-100 pb-2">
        <span className="text-14 text-blu-500">{firstUpper(props.label || '')}</span>
        {props.required && (
          <span className="rounded-full border border-yel-200 bg-yel-50 px-3 py-0.5 text-12lig text-yel-900">
            Required
          </span>
        )}
      </div>
      <Switch.Root>
        <Switch.Case when={props.multiple}>
          <BaseFormItem name={props.name}>
            <FormCheckboxGroup
              options={
                props.options?.map((opt) => ({
                  defaultChecked: false,
                  value: opt.id,
                  label: <OptionLabel name={opt.name} price={opt.price} calories={opt.calories} />,
                })) || []
              }
              className="flex flex-col space-y-4"
              checkboxClassName={classcat(["ow:data-[state='checked']:hover-hover:bg-gre-500"])}
            />
          </BaseFormItem>
        </Switch.Case>
        <Switch.Case when={!props.multiple && !props.required}>
          <BaseFormItem name={props.name}>
            <FormCheckboxRadio
              options={props.options?.map((opt) => {
                return {
                  label: <OptionLabel name={opt.name} price={opt.price} calories={opt.calories} />,
                  value: opt.id,
                };
              })}
              className={classcat(['grid gap-2 md:gap-4'])}
            />
          </BaseFormItem>
        </Switch.Case>
        <Switch.Case when={true}>
          <BaseFormItem name={props.name}>
            <FormRadioGroup
              options={props.options?.map((opt) => {
                return {
                  label: <OptionLabel name={opt.name} price={opt.price} calories={opt.calories} />,
                  value: opt.id,
                };
              })}
              className="grid gap-2 md:gap-4"
              owClassName={{
                item: classcat([
                  'ow:hover:data-[state=checked]:border-gre-300 ow:[&>span]:hover:data-[state=checked]:bg-gre-300',
                  'hover-hover:data-[state=checked]:border-gre-500 [&>span]:hover-hover:data-[state=checked]:bg-gre-500',
                ]),
              }}
            />
          </BaseFormItem>
        </Switch.Case>
      </Switch.Root>
    </div>
  );
};

export default Options;

type LabelProps = Pick<AddOnOptions, 'name' | 'calories' | 'price'>;
const OptionLabel = (props: LabelProps) => (
  <div className="flex items-center justify-between">
    <p className="space-x-4">
      <span className="text-14lig text-blu-400">{props?.name}</span>
      <Show when={props?.calories != null && props?.calories >= 0}>
        <span className="text-12lig text-blu-300">+{props?.calories} kcal</span>
      </Show>
    </p>
    <Show when={props?.price != null && props?.price >= 0}>
      <span className="whitespace-nowrap text-14 font-normal text-gre-300">
        +{props?.price?.toFixed(2)} AED
      </span>
    </Show>
  </div>
);

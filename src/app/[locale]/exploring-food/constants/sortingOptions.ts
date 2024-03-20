//THIRD PARTY MODULES
import { EDirection } from '_@rpc/validators';

export const sortingOptions = {
  'best-seller': {
    field: 'quantitySold',
    direction: EDirection.DESC,
  },
  'price-desc': {
    field: 'price',
    direction: EDirection.DESC,
  },
  'price-asc': {
    field: 'price',
    direction: EDirection.ASC,
  },
  'calories-desc': {
    field: 'calories',
    direction: EDirection.DESC,
  },
  'calories-asc': {
    field: 'calories',
    direction: EDirection.ASC,
  },
  newest: {
    field: 'createdAt',
    direction: EDirection.DESC,
  },
} as const;
export type SortingOptions = keyof typeof sortingOptions;

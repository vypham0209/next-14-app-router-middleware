//THIRD PARTY MODULES
import { create } from 'zustand';
//SHARED
import { Optional } from '_@shared/utils/type';

type State = {
  open: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
  image: string;
  quantity: number;
};

type Action = {
  showToast: (props: Optional<State, 'open'>) => void;
  onOpenChange: (open: boolean) => void;
};

export const useAddCartToastStore = create<Action & State>((set) => ({
  open: false,
  title: '',
  description: '',
  image: '',
  quantity: 0,
  onOpenChange: (open) => set({ open: open }),
  showToast: ({ open, ...state }) => set({ open: open ?? true, ...state }),
}));

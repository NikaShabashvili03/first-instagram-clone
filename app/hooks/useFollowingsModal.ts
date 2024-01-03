import { create } from 'zustand';

interface FollowingsModalProps {
  isOpen: boolean;
  data: any;
  setData: (item: any) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFollowingsModal = create<FollowingsModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  setData: (item: any) => set({ data: item}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useFollowingsModal;

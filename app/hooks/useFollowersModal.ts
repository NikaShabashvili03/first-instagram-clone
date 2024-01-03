import { create } from 'zustand';

interface FollowersModalProps {
  isOpen: boolean;
  data: any;
  setData: (item: any) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFollowersModal = create<FollowersModalProps>((set) => ({
  isOpen: false,
  data: undefined,
  setData: (item: any) => set({ data: item}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useFollowersModal;

import { create } from 'zustand';

interface NewPostModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNewPostModal = create<NewPostModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useNewPostModal;

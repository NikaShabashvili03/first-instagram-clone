import { create } from 'zustand';

interface PostModalProps {
  isOpen: boolean;
  post: any;
  setPost: (item: any) => void;
  onOpen: () => void;
  onClose: () => void;
}

const usePostModal = create<PostModalProps>((set) => ({
  isOpen: false,
  post: undefined,
  setPost: (item: any) => set({ post: item}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePostModal;

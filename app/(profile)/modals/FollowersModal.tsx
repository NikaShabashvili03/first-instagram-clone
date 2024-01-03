'use client';


import { useEffect, useState } from "react";

import Modal from "./Modal";
import useFollowersModal from "@/app/hooks/useFollowersModal";
import { useRouter } from "next/navigation";

const FollowersModal = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    data,
    isOpen,
    onClose
  } = useFollowersModal();
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  },[isOpen])
  if(!data){
    return null;
  }

  let bodyContent = (
        <div>
            {data.map((item: any, i: any) => (
                <h2 key={i}>{item.other.fullname}</h2>
            ))}
        </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      title={'Followers'}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default FollowersModal;

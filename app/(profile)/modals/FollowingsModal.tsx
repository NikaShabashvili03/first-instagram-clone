'use client';


import { useEffect, useState } from "react";

import Modal from "./Modal";
import useFollowingsModal from "@/app/hooks/useFollowingsModal";
import { useRouter } from "next/navigation";

const FollowingsModal = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    data,
    isOpen,
    onClose
  } = useFollowingsModal();
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
      title={'Followings'}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default FollowingsModal;

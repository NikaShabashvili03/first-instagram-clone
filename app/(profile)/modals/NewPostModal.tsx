'use client';


import { useEffect, useMemo, useState } from "react";

import Modal from "./Modal";
import useNewPostModal from "@/app/hooks/useNewPostModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    TITLE = 0,
    IMAGES = 1,
}

const NewPostModal = () => {
  const [isLoading, setLoading] = useState(false);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const [step, setStep] = useState(STEPS.TITLE);
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      image: [],
      title: '',
    }
  });
  const router = useRouter();

  const image = watch('image');

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.TITLE) {
      return undefined
    }

    return 'Back'
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.IMAGES) {
      return onNext();
    }
    if(!image){
        toast.error('Please Upload Image');
    }
    
    setLoading(true);

    axios.post('/api/post/add', data)
    .then(() => {
      toast.success('Post created!');
      router.refresh();
      reset();
      setStep(STEPS.TITLE)
      onClose();

    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const {
    isOpen,
    onClose
  } = useNewPostModal();

  let bodyContent = (
        <div>
            <form className="flex flex-col w-full">
                    <label>Title</label>
                    <input type="text" className="w-full sm:rounded-b-none rounded-b-2xl focus:border-0 p-2" placeholder="Post Title..." {...register("title", {required: true})} />
            </form>
        </div>
    )

    if(step === STEPS.IMAGES){
        bodyContent = (
            <div>
                <ImageUpload
                    onChange={(value) => setCustomValue('image', [...image, value])}
                    value={image}
                />
            </div>
        )
    }

//   if(step === STEPS.TITLE){
//     bodyContent = (
        // <div onSubmit={handleSubmit(onSubmit)}>
        //     <input type="text" placeholder="Title For Your Post" {...register('title'), {required: true, maxLength: 88}}/>
        //     <button disabled={isLoading} onClick={handleSubmit(onSubmit)}>Next</button>
        // </div>
//       )
//   }

//   if (step === STEPS.IMAGES) {
//     bodyContent = (
//       <div className="flex flex-col gap-8">
//         <ImageUpload
//           onChange={(value) => setCustomValue('image', value)}
//           value={image}
//         />
//       </div>
//     )
//   }

  return (
    <Modal
      isOpen={isOpen}
      title={'NEW POST'}
      onClose={() => {
        router.refresh();
        reset();
        setStep(STEPS.TITLE)
        onClose();
      }}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.TITLE ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="NEXT"
      body={bodyContent}
    />
  );
}

export default NewPostModal;

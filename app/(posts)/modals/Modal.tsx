'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  customStyle?: boolean,
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  disabled,
  customStyle
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);


    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit && onSubmit();
        onClose()
        }, [onSubmit, disabled]);


  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          backdrop-blur      
        "
      >
        <button
            aria-pressed="false"
            className="
              p-1
              border-0 
              hover:opacity-70
              transition
              absolute
              right-5
              top-2
            "
            onClick={handleClose}
          >
            <IoMdClose color={'white'} size={25} />
          </button>
        <div className={`
    
          relative 
          mt-8
          w-full
          md:w-5/6
          lg:w-3/6 
          my-6
          mx-auto 
          p-2
          lg:p-0
          
          `}
        >
          
          {/*content*/}
          <div 
            style={{borderRadius:"20px"}}
            className={`
            translate
            duration-300
            
            h-full
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div 
              style={{borderRadius:"20px"}}
              className="
              translate
              h-min
              border-0 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-[100%]
              bg-white 
              outline-none 
              focus:outline-none
              rounded-lg

            "
            >
              {/*body*/}
              <div className="relative flex-auto h-full">
                {body}
              </div>
              {/*footer*/}
              {onSubmit && 
                <div className="flex flex-col gap-2 p-6">
                    <div 
                    className="
                        flex 
                        flex-row 
                        items-center 
                        gap-4 
                        w-full
                    "
                    >

                        
                            {actionLabel &&
                            <button
                                
                                disabled={disabled} 
                                onClick={handleSubmit}
                            >{actionLabel} </button>
                        }
                        
                    </div>
                </div>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;

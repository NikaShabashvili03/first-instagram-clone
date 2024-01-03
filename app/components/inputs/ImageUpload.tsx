'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


declare global {
  var cloudinary: any
}

const uploadPreset = "upusueif";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: Array<string>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 10
      }}
    >
      {({ open }) => {
        return (
          <div
            className="
              relative
              cursor-pointer
              transition
              border-dashed 
              border-2 
              p-20 
              h-[300px]
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
              onClick={() => open?.()}
              className="z-50 text-black absolute top-30"
            />
            <div className="font-semibold text-black z-50 top-44 absolute text-lg">
              Click to upload
            </div>
            {value && (
              <div className="
              absolute inset-0 w-full h-full">
                {/* <Image
                  fill 
                  style={{ objectFit: 'cover' }} 
                  src={value} 
                  alt="House" 
                /> */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper !h-full"
                  >
                    {value?.map((val: string, key: any) => (
                      <SwiperSlide key={key}>
                        <Image
                            fill 
                            style={{ objectFit: 'cover' }} 
                            src={val} 
                            alt="House" 
                          />
                      </SwiperSlide>
                    ))}
                  </Swiper>
              </div>
            )}
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
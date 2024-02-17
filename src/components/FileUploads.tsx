import { ImagePreview } from "@/modals";
import Image from "next/image";
import React, { useState } from "react";

export const FileUploads = ({
  files,
  setFiles,
}: {
  files: any;
  setFiles: any;
}) => {
  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };
  function getFileExtension(fileName) {
    return fileName.split(".").pop(); // Extract the file extension
  }

  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  function getFileTypeFromMIME(mimeType) {
    if (mimeType.startsWith("image/")) {
      return "Image";
    } else if (mimeType === "application/pdf") {
      return "PDF";
    } else if (
      mimeType === "application/msword" ||
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "Word Document";
    } // Add more MIME type checks as needed
    return "File";
  }

  return (
    <>
      {files?.map((each, index) => (
        <div key={index} className=" mb-[20px]">
          <label className="px-[15px] cursor-pointer py-[8px] border border-[#343A4026] flex justify-between items-center rounded-[5px]">
            <div className="flex items-center gap-[20px]">
              {getFileTypeFromMIME(each?.type) ? (
                <Image
                  width={55}
                  height={55}
                  alt={each?.name}
                  src={URL.createObjectURL(each)}
                />
              ) : (
                <div className="bg-[#E9F1FF] w-[55px] h-[55px] rounded-[5px] flex justify-center items-center">
                  <p className="text-[#343A40] uppercase text-[14px]">
                    {getFileExtension(each?.name)}
                  </p>
                </div>
              )}

              <div>
                <p className="text-[14px] text-[#343A40] mb-[5px] truncate w-[165px]">
                  {each?.name}
                </p>
                <p className="text-[12px] text-[#343A40B2]">
                  {Math.floor(each.size / 1024)} KB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[20px]">
              <Image
                onClick={() => {
                  setPreview(URL.createObjectURL(each));
                  setShowModal(true);
                }}
                width={24}
                height={24}
                alt="view"
                src="/icons/show.svg"
                className="cursor-pointer"
              />

              <Image
                onClick={() => removeFile(each?.name)}
                width={24}
                height={24}
                alt="view"
                src="/icons/delete.svg"
                className="cursor-pointer"
              />
            </div>
          </label>
        </div>
      ))}

      <ImagePreview
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        previewImage={preview}
      />
    </>
  );
};

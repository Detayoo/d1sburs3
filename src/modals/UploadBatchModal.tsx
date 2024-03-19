import { useEffect, useRef } from "react";
import Image from "next/image";
import { Form, Formik, FormikValues } from "formik";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  ModalContainer,
  PrimaryButton,
  TextField,
  UploadField,
} from "@/components";
import {
  extractAppServerError,
  fileSizeInMB,
  handleScrollToTop,
  importBatchSchema,
} from "@/utils";
import { uploadFileFn } from "@/services";
import { stateType } from "@/types";

export const UploadBatchModal = ({
  showModal,
  closeModal,
  updateState,
}: {
  showModal: boolean;
  closeModal: () => void;
  updateState: (state: stateType) => void;
}) => {
  const modalRef = useRef(null);
  const queryClient = useQueryClient();

  const initialValues: {
    file: any;
    batchName: string;
  } = {
    file: null,
    batchName: "",
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadFileFn,
    onSuccess: (data) => {
      closeModal();
      updateState({
        selected: data,
        showPreviewToast: true,
      });
      queryClient.invalidateQueries({ queryKey: ["all batch list"] });
    },
    onError: (error) =>
      toast.error(
        extractAppServerError(error, "Could not upload file, please try again")
      ),
  });

  const handleSubmit = async (
    values: FormikValues,
    {
      setFieldValue,
    }: {
      setFieldValue: any;
    }
  ) => {
    if (+fileSizeInMB(values?.file?.size) > 20) {
      return toast.error("File must not exceed 20MB");
    }
    const formData = new FormData();
    formData.append("transactions", values?.file);
    formData.append("batchName", values?.batchName);
    try {
      await mutateAsync({
        payload: formData,
      });
      setFieldValue("file", null);
    } catch (error) {}
  };

  useEffect(() => {
    handleScrollToTop(modalRef);
  }, [showModal]);

  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        ref={modalRef}
        className={`absolute z-[100] w-[30rem] h-screen top-0 bg-white flex ${
          showModal ? "right-0" : "right-[-30rem]"
        } animation overflow-y-auto`}
      >
        <div className="pt-[70px] pb-[30px] px-[25px] text-sm z-[100] w-full h-full">
          <div className="flex justify-between items-center pb-[32px] border-b">
            <p className="text-[20px] text-primary-wine">Upload Batch</p>
            <Image
              onClick={closeModal}
              src="/icons/close-modal-icon.svg"
              alt="close modal icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </div>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={importBatchSchema}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              resetForm,
              isValid,
              dirty,
            }) => {
              return (
                <Form autoComplete="off" className="mt-8 h-[70vh] flex-1 flex flex-col gap-y-6 justify-between">
                  <div>
                    <div className="flex flex-col gap-y-2">
                      <p className="text-[#471C2A] text-sm">Upload CSV</p>
                      <UploadField
                        name="file"
                        htmlFor="file"
                        value={values?.file}
                        onChange={(e) => {
                          if (e.target.value) {
                            setFieldValue("file", e.target.files[0]);
                          }
                          e.target.value = "";
                        }}
                        changeFile={() => {
                          setFieldValue("file", null);
                        }}
                        fileText={values?.file?.name}
                        fileSize={fileSizeInMB(values?.file?.size)}
                        accept=".xls, .xlsx"
                        hideContent
                        titleText={
                          <>
                            Drag and drop or{" "}
                            <span className="text-primary-wine font-InterTight-SemiBold">
                              Choose file{" "}
                            </span>
                            to upload <br />
                            CSV no more than 20MB
                          </>
                        }
                      />
                    </div>

                    <TextField
                      type="text"
                      name="batchName"
                      htmlFor="batchName"
                      label="Batch Name"
                      values={values.batchName}
                      error={errors.batchName && touched.batchName}
                      placeholder="Enter batch name"
                      divClass="text-[#471C2A] mt-6"
                    />
                  </div>

                  <div className="flex items-center gap-x-[14px]">
                    <PrimaryButton
                      onClick={() => {
                        resetForm();
                        closeModal();
                      }}
                      title="Cancel"
                      className="w-[30%] border border-primary-wine"
                      bgColor="bg-white"
                      textColor="text-primary-wine"
                    />
                    <PrimaryButton
                      loading={isPending}
                      title="Import"
                      className="flex-1"
                      disabled={!(isValid && dirty) || isPending}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalContainer>
  );
};

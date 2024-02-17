import Image from "next/image";
import { Form, Formik } from "formik";
import { object, string } from "yup";

import {
  ModalContainer,
  PrimaryButton,
  SelectField,
  TextField,
} from "@/components";

export const EditSettlementAccount = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) => {
  const initialValues = {
    bank_name: "",
    account_number: "",
  };

  const validationSchema = object().shape({
    bank_name: string().required("Select Bank Name"),
    account_number: string().required("Enter Bank's Name"),
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`absolute z-[100] w-[30rem] h-screen top-0 bg-white ${
          showModal ? "right-0" : "right-[-30rem]"
        } animation overflow-y-auto`}
      >
        <div className="pt-[70px] pb-[30px] px-[25px] bg-white text-sm z-[100]">
          <div className="flex justify-between items-center mb-[60px]">
            <p className="text-[20px]">Settlement Account Details</p>
            <Image
              onClick={closeModal}
              src="/icons/close-modal-icon.svg"
              alt="close modal icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </div>

          <div className="mt-[40px]">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                setFieldValue,
                touched,
                isSubmitting,
                isValid,
              }) => (
                <Form>
                  <div className="mt-[40px]">
                    <div className="mb-[30px]">
                      <SelectField
                        htmlFor="bank_name"
                        error={errors.bank_name}
                        value={values.bank_name}
                        label="Bank Name"
                        name="bank_name"
                        onChange={(e: any) => {
                          setFieldValue("bank_name", e.target.value);
                        }}
                      >
                        <>
                          <option value="category 1">Category 1</option>
                          <option value="category 2">Category 2</option>
                        </>
                      </SelectField>
                    </div>

                    <div className="mb-[30px]">
                      <TextField
                        type="text"
                        htmlFor="account_number"
                        error={errors.account_number}
                        placeholder="Enter Account Number"
                        label="Business Name"
                        name="account_number"
                        values={values.account_number}
                        onChange={(e: any) => {
                          setFieldValue("account_number", e.target.value);
                        }}
                      />
                    </div>

                    <div className="mt-[20px] flex gap-[10px] items-center">
                      <Image
                        width={24}
                        height={24}
                        alt="checked"
                        src="/icons/confrim.svg"
                      />

                      <p className="text-[14px]">Black Rock Bet</p>
                    </div>
                    <PrimaryButton title="Save" className="mt-[100px] w-full" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

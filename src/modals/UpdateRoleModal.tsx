import Image from "next/image";
import { Form, Formik } from "formik";

import { ModalContainer, PrimaryButton, SelectField } from "@/components";

export const UpdateRoleModal = ({ showModal, closeModal }) => {
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`absolute z-[100] min-w-[30rem]  max-h-[75%] rounded-[10px] bg-white ${
          showModal
            ? "opacity-100 visible mt-0"
            : "opacity-0 invisible mt-[5rem]"
        } animation overflow-y-auto`}
      >
        <div className="bg-white text-sm py-[60px] px-[20px]">
          <div className="flex items-center justify-between">
            <p />
            <p className="text-[20px]">Change Role</p>
            <Image
              onClick={closeModal}
              src="/icons/close-modal-icon.svg"
              alt="close modal icon"
              width={16}
              height={16}
            />
          </div>

          <Formik initialValues={{ role: "" }} onSubmit={() => {}}>
            {({ values, errors }) => (
              <Form className="mt-[32px]">
                <SelectField
                  name="role"
                  value={values.role}
                  label="Role"
                  htmlFor="role"
                  error={errors.role}
                >
                  <option value="">Select role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="APPROVER">Approver</option>
                  <option value="INITIATOR">Initiator</option>
                </SelectField>
                <PrimaryButton
                  title="Change Role"
                  className="mt-[60px] w-full"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ModalContainer>
  );
};

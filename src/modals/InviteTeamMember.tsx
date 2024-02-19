import Image from "next/image";
import { Form, Formik } from "formik";

import { ModalContainer, PrimaryButton, TextField } from "@/components";

export const InviteTeamMember = ({ showModal, closeModal }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
  };
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        className={`absolute z-[100] min-w-[28rem]  max-h-[85%] rounded-[10px] bg-white ${
          showModal
            ? "opacity-100 visible mt-0"
            : "opacity-0 invisible mt-[5rem]"
        } animation overflow-y-auto`}
      >
        <div className="bg-white text-sm py-[60px] px-[30px]">
          <div className="flex items-center justify-between">
            <p />
            <p className="text-[20px]">Invite Team Member</p>
            <Image
              onClick={closeModal}
              src="/icons/close-modal-icon.svg"
              alt="close modal icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </div>
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            {({ values, errors, touched }) => (
              <Form className="mt-[32px]">
                <TextField
                  type="text"
                  name="firstName"
                  htmlFor="firstName"
                  label="First name"
                  values={values.firstName}
                  error={errors.firstName && touched.email}
                  divClass="mt-6"
                  placeholder="Enter first name"
                />

                <div className="relative">
                  <TextField
                    type="text"
                    name="middleName"
                    htmlFor="middleName"
                    label="Middle name"
                    values={values.middleName}
                    error={errors.middleName && touched.middleName}
                    divClass="mt-6"
                    placeholder="Enter middle name"
                  />
                  <p className="text-[15px] absolute top-0 right-0">Optional</p>
                </div>

                <TextField
                  type="text"
                  name="lastName"
                  htmlFor="lastName"
                  label="Last name"
                  values={values.lastName}
                  error={errors.lastName && touched.lastName}
                  divClass="mt-6"
                  placeholder="Enter last name"
                />

                <TextField
                  type="email"
                  name="email"
                  htmlFor="email"
                  label="Email address"
                  values={values.email}
                  error={errors.email && touched.email}
                  divClass="mt-6"
                  placeholder="Enter email address"
                />

                <PrimaryButton
                  title="Invite Team Member"
                  className="mt-10 w-full"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ModalContainer>
  );
};

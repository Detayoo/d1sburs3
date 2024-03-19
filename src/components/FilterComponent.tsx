import Image from "next/image";
import { Form, Formik, FormikValues } from "formik";

import { ROLES, filterUsersSchema } from "@/utils";
import { ModalContainer, PrimaryButton, SelectField } from "@/components";

export const Filter = ({
  showModal,
  updateState,
}: {
  showModal: boolean;
  updateState: (state: any) => void;
}) => {
  const initialValues = {
    isActive: "",
    role: "",
  };

  const onSubmit = async (
    values: FormikValues,
    { resetForm }: { resetForm: any }
  ) => {
    updateState({
      filterObj: values,
      filterModal: false,
      userPage: 1,
    });
    resetForm();
  };

  return (
    <ModalContainer
      showModal={showModal}
      closeModal={() => {
        updateState({
          filterModal: false,
        });
      }}
    >
      <div
        className={`absolute z-[100] min-w-[30rem] max-h-[85%] rounded-[10px] bg-white ${
          showModal
            ? "opacity-100 visible mt-0"
            : "opacity-0 invisible mt-[5rem]"
        } animation overflow-y-auto`}
      >
        <div className="bg-white text-sm py-[60px] px-[30px]">
          <div className="flex items-center justify-between">
            <p />
            <p className="text-[20px]">Filter by:</p>
            <Image
              onClick={() => {
                updateState({
                  filterModal: false,
                });
              }}
              src="/icons/close-modal-icon.svg"
              alt="close modal icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={filterUsersSchema}
            enableReinitialize
          >
            {({ values, errors, touched, isValid, dirty, resetForm }) => (
              <Form className="mt-[32px]">
                {/* <SelectField
                  name="isActive"
                  value={values.isActive}
                  label="Is Active?"
                  htmlFor="isActive"
                  error={errors.isActive && touched.isActive}
                  divClass="mt-6"
                >
                  <option value="">Select</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </SelectField> */}
                <SelectField
                  name="role"
                  value={values.role}
                  label="Role"
                  htmlFor="role"
                  error={errors.role && touched.role}
                  divClass="mt-6"
                >
                  <option value="">Select role</option>
                  {ROLES.map((role: string) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </SelectField>
                <div className="w-full mt-12 flex justify-between items-center">
                  <PrimaryButton
                    bgColor="bg-white"
                    textColor="text-primary-wine"
                    type="reset"
                    onClick={() => {
                      resetForm();
                      updateState({
                        filterObj: values,
                        filterModal: false,
                      });
                    }}
                    title="Reset"
                    className="w-[45%] border border-primary-wine"
                  />
                  <PrimaryButton
                    disabled={!(isValid && dirty)}
                    title="Filter"
                    className="w-[45%]"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ModalContainer>
  );
};

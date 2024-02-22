import Image from "next/image";
import { Form, Formik } from "formik";

import { ROLES, filterUsersSchema } from "@/utils";
import {
  ModalContainer,
  PrimaryButton,
  SelectField,
  TextField,
} from "@/components";

export const FilterComponent = ({
  showModal,
  closeModal,
  selected,
  setSelected,
  setCurrentPage,
  className,
}: {
  showModal: boolean;
  closeModal: () => void;
  selected: string;
  setSelected: (state: string) => void;
  setCurrentPage?: (state: number) => void;
  className?: string;
}) => {
  const options = selected
    ? [
        {
          name: "Complete",
          option: "COMPLETE",
        },
        {
          name: "Pending",
          option: "PENDING",
        },
        { name: "Reset Filter", option: "" },
      ]
    : [
        {
          name: "Complete",
          option: "COMPLETE",
        },
        {
          name: "Pending",
          option: "PENDING",
        },
      ];
  return (
    <div
      className={`${className} absolute top-10 right-0 w-[170px] text-primary-black z-30 bg-white border divide-y flex flex-col justify-center items-center rounded-[10px] text-center text-sm animation ${
        showModal ? "opacity-100 visible mt-0" : "opacity-0 invisible mt-5"
      }`}
    >
      {ROLES.map((option: string) => (
        <button
          type="button"
          key={option}
          onClick={() => {
            // setCurrentPage(1);
            setSelected(option);
            closeModal();
          }}
          className="hover:bg-slate-100/50 w-full py-3 uppercase"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export const Filter = ({ showModal, updateState }) => {
  const initialValues = {
    isActive: "",
    role: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    updateState({
      filterObj: values,
      filterModal: false,
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
            {({ values, errors, touched, isValid, dirty }) => (
              <Form className="mt-[32px]">
                <SelectField
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
                </SelectField>
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

                <PrimaryButton
                  disabled={!(isValid && dirty)}
                  title="Filter"
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

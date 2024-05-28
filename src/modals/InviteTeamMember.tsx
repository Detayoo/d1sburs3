import { useEffect, useRef } from "react";
import Image from "next/image";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  ModalContainer,
  PrimaryButton,
  SelectField,
  TextField,
} from "@/components";
import { inviteTeamMemberFn } from "@/services";
import {
  extractAppServerError,
  handleScrollToTop,
  inviteTeamSchema,
} from "@/utils";
import { Invite } from "@/types";

export const InviteTeamMember = ({
  showModal,
  closeModal,
  selectedInvite,
  updateState,
}: {
  showModal: boolean;
  closeModal: () => void;
  selectedInvite: Invite;
  updateState: (state: any) => void;
}) => {
  const { firstName, lastName, email, middleName, role } =
    selectedInvite?.profile || {};

  const initialValues = {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    middleName: middleName ?? "",
    email: email ?? "",
    role: role ?? "",
  };

  const queryClient = useQueryClient();
  const modalRef = useRef(null);

  useEffect(() => {
    handleScrollToTop(modalRef);
  }, [showModal]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: inviteTeamMemberFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invites list"] });
      queryClient.invalidateQueries({ queryKey: ["users list"] });
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(
        extractAppServerError(error, "Could not invite user, please try again")
      );
    },
  });

  const onSubmit = async (
    values: FormikValues,
    { resetForm }: { resetForm: any }
  ) => {
    const { email, firstName, lastName, middleName, role } = values;
    try {
      await mutateAsync({
        payload: {
          email,
          firstName,
          lastName,
          middleName,
          role,
        },
      });

      updateState({
        selectedInvite: null,
      });

      resetForm();
      closeModal();
    } catch (error) {}
  };
  return (
    <ModalContainer showModal={showModal} closeModal={closeModal}>
      <div
        ref={modalRef}
        className={`absolute z-[100] min-w-[30rem] max-h-[85%] rounded-[10px] bg-white ${
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
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={inviteTeamSchema}
            enableReinitialize
          >
            {({ values, errors, touched, isValid }) => (
              <Form autoComplete="off" className="mt-[32px]">
                <TextField
                  type="text"
                  name="firstName"
                  htmlFor="firstName"
                  label="First name"
                  values={values.firstName}
                  error={errors.firstName && touched.firstName}
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
                <SelectField
                  name="role"
                  value={values.role}
                  label="Role"
                  htmlFor="role"
                  error={errors.role && touched.role}
                  divClass="mt-6"
                >
                  <option value="">Select role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="APPROVER">Approver</option>
                  <option value="INITIATOR">Initiator</option>
                </SelectField>

                <PrimaryButton
                  loading={isPending}
                  disabled={isPending || !isValid}
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

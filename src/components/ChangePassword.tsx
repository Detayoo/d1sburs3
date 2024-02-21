import React, { useState } from "react";
import { Form, Formik, FormikValues } from "formik";

import { PasswordField, PrimaryButton } from ".";
import { changePasswordSchema, extractAppServerError } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { changePasswordFn } from "@/services";
import { toast } from "react-toastify";

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: changePasswordFn,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(
        extractAppServerError(
          error,
          "Unable to change password, please try again"
        )
      );
    },
  });

  const handleSubmit = async (values: FormikValues, { resetForm }) => {
    try {
      await mutateAsync({
        payload: {
          oldPassword: values?.old_password,
          password: values?.confirm_password,
        },
      });
      resetForm();
    } catch (error) {}
  };

  return (
    <div className="mt-[20px] py-[30px] pb-[130px]">
      <div className="w-[510px]">
        <p className="text-[18px]">Change password</p>

        <div className="mt-[30px]">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={changePasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isValid, dirty }) => (
              <Form>
                <div className="mt-[40px]">
                  <div className="mb-[30px]">
                    <PasswordField
                      type={showPassword ? "text" : "password"}
                      htmlFor="old_password"
                      error={errors.old_password && touched.old_password}
                      placeholder="Enter Password"
                      toggleText={showPassword ? "Hide" : "Show"}
                      onClick={() => setShowPassword(!showPassword)}
                      label="Current Password"
                      name="old_password"
                      values={values.old_password}
                    />
                  </div>

                  <div className="mb-[30px]">
                    <PasswordField
                      type={showOldPassword ? "text" : "password"}
                      htmlFor="new_password"
                      error={errors.new_password && touched.new_password}
                      placeholder="Enter Password"
                      toggleText={showOldPassword ? "Hide" : "Show"}
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      label="New Password"
                      name="new_password"
                      values={values.new_password}
                    />
                  </div>

                  <div className="mb-[30px]">
                    <PasswordField
                      type={showConfirmPassword ? "text" : "password"}
                      htmlFor="confirm_password"
                      error={
                        errors.confirm_password && touched.confirm_password
                      }
                      placeholder="Enter Password"
                      toggleText={showConfirmPassword ? "Hide" : "Show"}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      label="Confirm New Password"
                      name="confirm_password"
                      values={values.confirm_password}
                    />
                  </div>

                  <PrimaryButton
                    loading={isPending}
                    disabled={
                      values?.new_password !== values?.confirm_password ||
                      isPending ||
                      !(isValid && dirty)
                    }
                    title="Save Changes"
                    className="mt-3 w-[200px]"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

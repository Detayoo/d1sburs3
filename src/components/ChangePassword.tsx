import React, { useState } from "react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { PasswordField } from ".";

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = object().shape({
    old_password: string().required("Old password is required"),
    new_password: string().required("New password is required"),
    confirm_password: string().required("Confirm your Password"),
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <div className="mt-[20px] py-[30px] pb-[130px]">
      <div className="w-[510px]">
        <p className="text-[18px]">Change password</p>

        <div className="mt-[30px]">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
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
                      label="Confrim New Password"
                      name="confirm_password"
                      values={values.confirm_password}
                    />
                  </div>

                  <button className="py-[13px] px-[25px] bg-primary-wine text-white text-[14px] rounded-[40px]">
                    Change Password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

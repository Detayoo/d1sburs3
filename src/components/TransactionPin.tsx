import React, { useState } from "react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { PasswordField } from ".";

export const TransactionPin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    current_pin: "",
    new_pin: "",
    confirm_pin: "",
  };

  const validationSchema = object().shape({
    current_pin: string().required("Enter Old Password"),
    new_pin: string().required("New Password"),
    confirm_pin: string().required("Confirm your Password"),
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
  };
  return (
    <div className="mt-[20px] px-[40px] bg-white rounded-[10px] gap-[90px] flex items-start py-[30px] pb-[130px]">
      <div className="w-[510px]">
        <p className="text-[18px]">Change Transaction PIN</p>
        <p className="text-[14px] mt-[12px]">
          Reset your transaction PIN at anytime
        </p>

        <div className="mt-[30px]">
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
                    <PasswordField
                      type={showPassword ? "text" : "password"}
                      htmlFor="current_pin"
                      error={errors.current_pin}
                      placeholder="Enter PIN"
                      toggleText={showPassword ? "Hide" : "Show"}
                      onClick={() => setShowPassword(!showPassword)}
                      label="Current PIN"
                      name="current_pin"
                      values={values.current_pin}
                      onChange={(e: any) => {
                        setFieldValue("current_pin", e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-[30px]">
                    <PasswordField
                      type={showOldPassword ? "text" : "password"}
                      htmlFor="new_pin"
                      error={errors.new_pin}
                      placeholder="Enter PIN"
                      toggleText={showOldPassword ? "Hide" : "Show"}
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      label="New Password"
                      name="new_pin"
                      values={values.new_pin}
                      onChange={(e: any) => {
                        setFieldValue("new_pin", e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-[30px]">
                    <PasswordField
                      type={showConfirmPassword ? "text" : "password"}
                      htmlFor="confirm_pin"
                      error={errors.confirm_pin}
                      placeholder="Enter PIN"
                      toggleText={showConfirmPassword ? "Hide" : "Show"}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      label="Confrim New Password"
                      name="confirm_pin"
                      values={values.confirm_pin}
                      onChange={(e: any) => {
                        setFieldValue("confirm_pin", e.target.value);
                      }}
                    />
                  </div>

                  <button className="py-[13px] px-[25px] bg-primary-wine text-white text-[14px] rounded-[40px]">
                    Change Pin
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

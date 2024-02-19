import { useState } from "react";
import { Formik, Form } from "formik";
import Router from "next/router";

import {
  AuthenticationLayout,
  PrimaryButton,
  PasswordField,
  TextField,
  Title,
} from "@/components";

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    Router.push("/personal-information");
  };
  return (
    <AuthenticationLayout>
      <Title name="Register" />
      <p className="text-[32px] font-Onest-Medium">
        Let&apos;s get you started
      </p>
      <p className="text-[16px] mt-[10px]">
        Scale your online betting enterprise
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form autoComplete="off" className="mt-5 flex flex-col">
            <PasswordField
              type={showPassword ? "text" : "password"}
              name="password"
              htmlFor="password"
              label="Password"
              values={values.password}
              toggleText={showPassword ? "Hide" : "Show"}
              onClick={() => setShowPassword(!showPassword)}
              imageClass="cursor-pointer"
              error={errors.password && touched.password}
              placeholder="Enter password"
              divClass="mt-6"
            />

            <PrimaryButton
              title="Continue"
              image="/icons/arrow-right.svg"
              className="w-full mt-8"
            />
            <div className="flex gap-x-2 mt-[20px] justify-center text-sm font-Onest-Medium">
              <p>Already have an account?</p>
              <p
                onClick={() => Router.push("/login")}
                className="text-primary-wine font-Onest-Medium cursor-pointer"
              >
                Login
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </AuthenticationLayout>
  );
};

export default RegistrationPage;

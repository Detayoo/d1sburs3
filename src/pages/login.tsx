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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthenticationLayout>
      <Title name="Login" />
      <p className="text-[28px] font-Onest-Medium text-primary-black">
        Welcome to KCMFB LIMITED
      </p>
      <p className="text-[16px] mt-[10px] text-[#343A40B2]">
        Please enter your correct login credentials to gain access to your
        dashboard. 🚀
      </p>

      <Formik initialValues={{ email: "", password: "" }} onSubmit={() => {}}>
        {({ values, errors, touched }) => (
          <Form autoComplete="off" className="mt-5 flex flex-col">
            <TextField
              type="text"
              name="email"
              htmlFor="email"
              label="Email address"
              values={values.email}
              error={errors.email && touched.email}
              divClass="mt-6"
              placeholder="Enter your email address"
            />
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
              title="Login"
              image="/icons/arrow-right.svg"
              className="w-full mt-12"
            />
          </Form>
        )}
      </Formik>
    </AuthenticationLayout>
  );
};

export default LoginPage;

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
      <p className="text-[32px] font-Onest-Medium">Welcome back</p>
      <p className="text-[16px] mt-[10px]">
        Log in to your stripestack account to proceed
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

            <p
              onClick={() => Router.push("/forgot-password")}
              className="text-primary-wine text-sm font-Onest-Medium mt-3 cursor-pointer"
            >
              Forgot your password?
            </p>

            <PrimaryButton
              title="Login"
              image="/icons/arrow-right.svg"
              className="w-full mt-8"
            />
            <div className="flex gap-x-2 mt-[20px] justify-center text-sm font-Onest-Medium">
              <p>Don&apos;t have an account?</p>
              <p
                onClick={() => Router.push("/register")}
                className="text-primary-wine font-Onest-Medium cursor-pointer"
              >
                Create account
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </AuthenticationLayout>
  );
};

export default LoginPage;

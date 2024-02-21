import { useEffect, useState } from "react";
import Router from "next/router";
import { Formik, Form, FormikValues } from "formik";
import { useMutation } from "@tanstack/react-query";

import {
  AuthenticationLayout,
  PrimaryButton,
  PasswordField,
  TextField,
  Title,
} from "@/components";
import { loginSchema } from "@/utils";
import { loginFn } from "@/services";
import { useAuth } from "@/contexts";

const LoginPage = () => {
  const { setToken, setAuthUser, user, token } = useAuth();
  console.log("token", token);

  console.log(user, "user is");
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log(data?.data, "TOKEEENN");
      if (data?.data?.token) {
        setToken(data?.data?.token);
        setAuthUser(data?.data?.user);
        Router.push("/bulk-transactions");
      }
    },
    onError: (error) => {},
  });

  const onSubmit = async (values: FormikValues, { resetForm }) => {
    const { email, password } = values;
    try {
      await mutateAsync({
        payload: {
          email,
          password,
        },
      });
      resetForm();
    } catch (error) {}
  };

  useEffect(() => {
    if (token) Router.push("/bulk-transactions");
  }, [token]);

  return (
    <AuthenticationLayout>
      <Title name="Login" />
      <p className="text-[28px] font-InterTight-Medium text-primary-black">
        Welcome to KCMFB LIMITED
      </p>
      <p className="text-[16px] mt-[10px] text-[#343A40B2]">
        Please enter your correct login credentials to gain access to your
        dashboard. 🚀
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ values, errors, touched, isValid, dirty }) => (
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
              error={errors.password && touched.password}
              placeholder="Enter password"
              divClass="mt-6"
            />

            <PrimaryButton
              loading={isPending}
              disabled={!(isValid && dirty) || isPending}
              type="submit"
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

import { Formik, Form } from "formik";

import { TextField } from ".";
import { useAuth } from "@/contexts";

export const Profile = () => {
  const { user } = useAuth();
  const initialValues = {
    firstName: user.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
  };

  const avatarName = user?.firstName?.charAt(0) + user?.lastName?.charAt(0);
  return (
    <div className="mt-10 flex gap-x-8">
      <div className="w-[80px] h-[80px] bg-light-wine rounded-[50%] flex justify-center items-center text-[24px] text-primary-wine">
        {avatarName}
      </div>

      <div className="w-[510px] mt-4">
        <p className="text-[18px] capitalize">
          {user?.firstName + " " + user?.lastName}
        </p>
        <p className="mt-[11px] text-[12px] bg-[#27AE60] inline-block px-6 py-[6px] rounded-[3px] text-white">
          Verified
        </p>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          {({ values, errors, touched }) => (
            <Form>
              <div className="flex justify-between mt-[30px]">
                <TextField
                  type="text"
                  name="firstName"
                  htmlFor="firstName"
                  label="First name"
                  values={values.firstName}
                  error={errors.firstName && touched.firstName}
                  placeholder="Enter first name"
                  divClass="w-[47%]"
                  disabled
                />
                <TextField
                  type="text"
                  name="lastName"
                  htmlFor="lastName"
                  label="Last name"
                  values={values.lastName}
                  error={errors.lastName && touched.lastName}
                  placeholder="Enter last name"
                  divClass="w-[47%]"
                  disabled
                />
              </div>
              <TextField
                type="email"
                name="email"
                htmlFor="email"
                label="Email Address"
                values={values.email}
                error={errors.email && touched.email}
                placeholder="Enter email"
                divClass="mt-6"
                disabled
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

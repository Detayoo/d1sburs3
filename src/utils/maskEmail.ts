export const maskEmail = (email: any) => {
  const domain = email?.substring(email?.lastIndexOf("@") + 1);
  const username = email?.substring(0, email?.indexOf("@"));
  const maskedUsername =
    username?.substring(0, 3) + "*"?.repeat(username?.length - 3);
  const maskedEmail = maskedUsername + "@" + domain;
  return maskedEmail;
};

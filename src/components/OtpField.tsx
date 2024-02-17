import OtpInput from "react-otp-input";

export const OTPField = ({
  code,
  length,
  type = "tel",
  onChange,
  ...rest
}: {
  code: string;
  onChange: (e: string) => void;
  length?: number;
  type?: any;
  [x: string]: any;
}) => (
  <OtpInput
    value={code}
    onChange={onChange}
    numInputs={length}
    inputType={type}
    containerStyle="otp__container"
    inputStyle="otp__input"
    shouldAutoFocus
    renderInput={(props) => <input {...props} />}
    {...rest}
  />
);

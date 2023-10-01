import InputCustom from "../../Components/Common/Input/InputCustom";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import { SET_PASSWORD, TITLE_PAGE } from "../../Assets/Constant/Common/constSetPassword";
import ApiCommon from "../../API/Common/ApiCommon";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import {
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.setPassword({
        newPassword,
        confirmPassword,
      });
      if (response.status === 200) {
        toast.success("success");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <PageNameStyle variant="h4" component={"h5"}>
        {SET_PASSWORD}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE}</TitlePageStyle>

      <FormSubmit onSubmit={handleSetPassword}>
        <InputCustom
          type="password"
          setValue={setNewPassword}
          label="New Password"
        />
        <InputCustom
          type="password"
          setValue={setConfirmPassword}
          label=" Re-enter Password"
        />
        <ButtonCustom content="Set Password" color="#F5BD19" />
      </FormSubmit>
    </>
  );
};

export default SetPassword;

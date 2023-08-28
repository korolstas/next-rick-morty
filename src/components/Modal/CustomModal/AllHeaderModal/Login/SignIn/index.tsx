import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { showModal } from "@store/heroes";
import { useAppDispatch } from "@hooks/redux-hooks";
import { Input, Button } from "@components";
import { SignInFuction } from "../loginFunctions";
import styles from "../login.module.less";
import { Props } from "../../types";

export const INITIAL_ERROR = "This field is requared";
export const INITIAL_ERROR_EMAIL = "This email isn't correct";

const validatioSchema = object().shape({
  singInEmail: string().email(INITIAL_ERROR_EMAIL).required(INITIAL_ERROR),
  singInPassword: string()
    .min(6, INITIAL_ERROR)
    .max(32, INITIAL_ERROR)
    .required(INITIAL_ERROR),
});

export const SignIn = ({ info }: Props) => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(showModal({ visible: info.typeModal }));
  };

  const methods = useForm({
    defaultValues: { singInEmail: "", singInPassword: "" },
    resolver: yupResolver(validatioSchema),
  });

  const onSubmit = async (data: any) => {
    SignInFuction(data, closeModal, dispatch);
  };

  return (
    <div className={styles.modal}>
      <header>
        {info.header}
        <Button onClick={closeModal} variant={"cancel"} text="x" />
      </header>
      <FormProvider {...methods}>
        <form
          className={styles.modal_form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            type={"text"}
            name={"singInEmail"}
            error={methods.formState.errors.singInEmail?.message}
            placeHolder={"Email*"}
          />
          <Input
            type={"password"}
            name={"singInPassword"}
            error={methods.formState.errors.singInPassword?.message}
            placeHolder={"Password*"}
          />
          <div className={styles.modal_form_submit}>
            <Button text={"Submit"} variant={"submit"} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

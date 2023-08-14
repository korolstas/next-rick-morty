import {
  loading,
  showModal,
} from "../../../../../store/appSlice/appSlice";
import { useAppDispatch } from "../../../../../hooks/redux-hooks";
import styles from "./login.module.less";
import { Form } from "../../../../Form/Form";
import { FormProvider, useForm } from "react-hook-form";
import { TForm } from "../../../../Form/InterfaceForm";
import { Button } from "../../../../Button/button";
import { SingIn, SingUp } from "./loginFunctions";

type TLogin = {
  info: {
    typeModal: string;
    header: string;
  };
};

export const Login = ({ info }: TLogin) => {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(showModal({ visible: info.typeModal }));
  };
  const methods = useForm<TForm>();

  const onSubmit = async (data: any) => {
    switch (info.typeModal) {
      case "singUpModal":
        SingUp(data, methods, closeModal, dispatch);
        break;
      case "singInModal":
        SingIn(data, methods, closeModal, dispatch);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <header>
          {info.header}
          <Button onClick={closeModal} className={"cancel"} spanText="x" />
        </header>
        <FormProvider {...methods}>
          <form
            className={styles.modal_form}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Form typeForm={info.typeModal} />
            <div className={styles.modal_form_submit}>
              <input
                className={styles.modal_form_submit_input}
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

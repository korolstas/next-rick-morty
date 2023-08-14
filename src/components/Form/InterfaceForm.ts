export interface IForm {
  type: string;
  name: string;
  className?: string;
  placeHolder?: string;
  label?: string;
  accept?: string;
}

export type BySingIn = {
  singInEmail: string;
  singInPassword: string;
};
export type BySingUp = {
  singUpName: string;
  singUpEmail: string;
  singUpPassword: string;
  singUpCheckbox: boolean;
};

export type TForm = BySingIn | BySingUp;

export interface IAllUser {

  id: string;

  name: string;
  // dni: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin?:boolean;
  status: boolean;
  montoDonado: number;
}
export type IUsers = IAllUser[];
export interface IUser {
  id?:number;
  name: string;
  // dni: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin?:boolean;
  estado: boolean;
  montoDonado: number;
}
export type IUsers = IUser[];
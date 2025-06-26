export interface IUsers {
  id?:number;
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
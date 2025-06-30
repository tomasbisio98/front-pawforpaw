export interface IUsers {
  id?: string;
  name: string;
  // dni: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin?: boolean;
  status?: boolean;
  montoDonado?: number;
  profileImgUrl?: string;
}

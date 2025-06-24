export interface IDogs {
  dogId: string; // UUID enviado por el backend
  name: string;
  sex: "M" | "H"; // mejor tipado si solo aceptás esos valores
  city: string;
  description: string;
  imgUrl: string;
  status: boolean;
  createdAt?: string; // opcional si lo llegás a usar
}
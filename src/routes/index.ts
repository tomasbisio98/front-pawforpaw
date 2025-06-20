export const routes = {
  inicio: "/",
  perritos: "/perritos",
  AuthPage: "/authpag",
  Historia: "/historia",
  Administrador: "/Administrador",
  Ediperritos: "/dashboard/ediPerritos",
  dog_detail: "/dog-detail",
  GestionProductos: (id: number | string) => `/dashboard/productos/  ${id}`,
  ProductModal: (id: string | number) =>
    `/dashboard/components/GestionPerritos/ProductModal/${id}`,
  donaciones: "/dashboard/donaciones",
};

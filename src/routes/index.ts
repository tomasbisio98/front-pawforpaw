export const routes = {
  inicio: "/",
  perritos: "/perritos",
  AuthPage: "/authpag",
  Historia: "/historia",
  dog_detail: "/dog-detail",
  DashboardUser: "/profile",
  Dashboard: "/dashboard",
  perritoAdmin: "/dashboard/perritos",
  editarPerrito: "/dashboard/perritos/editar",
  gestionProductos: (id: string | number) => `/dashboard/perritos/${id}`,

  // Modal de productos (si tienes ruta dinámica para modal o slug)
  productModal: (dogId: string | number) => `/dashboard/perritos/${dogId}/agregar-producto`,
  donaciones: "/dashboard/donaciones",
  usuarios: "/dashboard/usuarios",
  productsDogs: "/products-dog",

};

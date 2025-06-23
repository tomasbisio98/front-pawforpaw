

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
  productModal: (id: string | number) => `/dashboard/productos/${id}`,
  donaciones: "/dashboard/donaciones",
  usuarios: "/dashboard/usuarios",
};

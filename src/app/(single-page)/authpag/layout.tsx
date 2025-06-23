'use client';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { FC } from "react";

interface LayoutViewsProps {
  children: React.ReactNode;
}

const LayoutAuth:FC <LayoutViewsProps> =({ children }) =>{
  return (
    <>
   

      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        {children}
      </GoogleOAuthProvider>
   
    </>
  );
}
export default LayoutAuth;
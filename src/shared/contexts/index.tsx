"use client";

import { AuthProvider } from "./auth";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export { Providers };

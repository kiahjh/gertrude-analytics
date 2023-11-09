import React from "react";
import { cookies } from "next/headers";
import GlobalStateProvider from "@/lib/state/GlobalStateProvider";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const accessToken = cookies().get(`access-token`);
  if (!accessToken || accessToken.value !== process.env.ACCESS_TOKEN) {
    return (
      <html lang="en">
        <body>
          <div className="h-screen w-screen flex justify-center items-center">
            access denied
          </div>
        </body>
      </html>
    );
  }
  return (
    <GlobalStateProvider>
      <html lang="en">
        <body>
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-grow">{children}</main>
          </div>
        </body>
      </html>
    </GlobalStateProvider>
  );
};

export default RootLayout;

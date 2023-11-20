import crypto from "crypto";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import GlobalStateProvider from "@/lib/state/GlobalStateProvider";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const accessToken = cookies().get(`access-token`);
  if (!accessToken) return <AccessDenied />;
  const hashedToken = crypto
    .createHash(`sha256`)
    .update(accessToken.value, `utf8`)
    .digest(`hex`);
  if (hashedToken !== process.env.HASHED_ACCESS_TOKEN) return <AccessDenied />;

  return (
    <GlobalStateProvider>
      <html lang="en">
        <body>
          <div className="min-h-screen flex bg-violet-50">
            <Sidebar />
            <main className="flex-grow ml-52 my-4 h-[calc(100vh-32px)] rounded-l-xl shadow-md shadow-violet-900/5 bg-white overflow-scroll">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-full">
                    loading...
                  </div>
                }
              >
                {children}
              </Suspense>
            </main>
          </div>
        </body>
      </html>
    </GlobalStateProvider>
  );
};

export default RootLayout;

const AccessDenied: React.FC = () => (
  <html>
    <body>
      <div className="h-screen w-screen flex justify-center items-center font-mono">
        <h1>Access denied</h1>
      </div>
    </body>
  </html>
);

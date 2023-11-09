import { Suspense } from "react";
import GlobalStateProvider from "@/lib/state/GlobalStateProvider";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <GlobalStateProvider>
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-grow">
            <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
          </main>
        </div>
      </body>
    </html>
  </GlobalStateProvider>
);

export default RootLayout;

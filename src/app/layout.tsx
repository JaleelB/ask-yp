import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col overflow-hidden">
          <Header/>
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
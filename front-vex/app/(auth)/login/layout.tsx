import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "V-EX | Login",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div>
      {children}
    </div>
  );
}

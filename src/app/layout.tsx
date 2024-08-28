import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Your HR by Suryanshsinh",
    description:
        "Your HR Application that accepts applications of job seekers. Developed by Suryanshsinh Sisodiya",
    authors: [
        { name: "Suryanshsinh Sisodiya", url: "https://suryanshsinh.com" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <div className="fixed bottom-10 right-12 z-50">
                        <ModeToggle />
                    </div>
                    <Toaster richColors position="bottom-center" />
                </ThemeProvider>
            </body>
        </html>
    );
}

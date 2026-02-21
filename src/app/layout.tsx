import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata = {
    title: 'DEVNET',
}

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;

}>) {
    return (
        <ClerkProvider signUpForceRedirectUrl="/onboarding">
            <QueryProvider>
                <html lang="en">
                    <body>
                        {children}
                    </body>
                </html>
            </QueryProvider>
        </ClerkProvider>
    );
}

import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <div className="bg-orange-50 font-outfit text-amber-90">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

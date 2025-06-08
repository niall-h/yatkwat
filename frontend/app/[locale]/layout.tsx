import type { Metadata } from "next";
import "../globals.css";
import "@fontsource/noto-sans-myanmar";
import "@fontsource-variable/outfit";
import { Navbar } from "@/components/navbar";
import { ThemeProvider, Container } from "@mui/material";
import theme from "@/public/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { getDictionary } from "./dictionaries";
import { Locale } from "@/types/locale";

export const metadata: Metadata = {
  title: "Yatkwat",
  description: "Yatkwat is a resource platform for the Burmese community.",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className="bg-orange-50 font-[Outfit_Variable] text-amber-900">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
              <Navbar locale={locale} dict={t} />
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

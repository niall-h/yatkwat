import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { getDictionary } from "../../lib/dictionaries";
import { Locale } from "@/types/locale";
import { LocaleProvider } from "@/lib/locale-context";

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
  const dict = await getDictionary(locale);

  return (
    <LocaleProvider value={{ locale, dict }}>
      <div className="mx-auto w-full max-w-screen-2xl sm:px-2 lg:px-4 flex flex-col h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </LocaleProvider>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
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
    <div className="mx-auto w-full max-w-screen-2xl sm:px-2 lg:px-4">
      <Navbar locale={locale} dict={t} />
      {children}
    </div>
  );
}

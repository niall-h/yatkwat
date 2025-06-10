import { Locale } from "@/types/locale";
import { getDictionary } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  return <h1>hi</h1>;
}

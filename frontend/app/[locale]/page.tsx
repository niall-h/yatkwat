import { getDictionary } from "./dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "my" }>;
}) {
  return <h1>hi</h1>;
}

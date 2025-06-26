import { Locale } from "@/types/locale";
import { getDictionary } from "../../lib/dictionaries";
import { Button, Card, CardBody } from "@heroui/react";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  return (
    <div>
      <Card>
        <CardBody>
          <p>SLJSLFJLJF</p>
          <Button>Hi</Button>
        </CardBody>
      </Card>
    </div>
  );
}

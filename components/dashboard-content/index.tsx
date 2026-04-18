import Link from "next/link";

import { Button } from "@/components/ui/button";

export async function DashboardContent(userId: { userId: string | undefined }) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-around gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Seus Eventos
          </h1>
          <p className="text-sm text-muted-foreground">
            Track attendee responses and manage invite links.
          </p>
        </div>

        <Button asChild>
          <Link href={"/events/new"}>Criar evento</Link>
        </Button>
      </div>
    </div>
  );
}

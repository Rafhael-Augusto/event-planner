import Link from "next/link";

import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums";

export function countByStatus(rsvps: { status: PrismaRsvpStatus }[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const r of rsvps) {
    if (r.status === "going") goingCount += 1;
    else if (r.status === "maybe") maybeCount += 1;
    else if (r.status === "not_going") notGoingCount += 1;
  }

  return {
    goingCount,
    maybeCount,
    notGoingCount,
  };
}

export async function DashboardContent({ userId }: { userId: string }) {
  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      rsvps: { select: { status: true } },
    },
  });

  const events = rows.map((event) => ({
    id: event.id,
    title: event.title,
    eventDate: event.eventDate ? event.eventDate.toISOString() : null,
    location: event.location,
    ...countByStatus(event.rsvps),
  }));

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

      {events.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum evento criado</CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground">
            <p>Crie o seu primeiro evento pra comecar a coletar RSVPs.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grip-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Button asChild size={"sm"}>
                    <Link href={`/events/${event.id}`}>Abrir</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge>Esta indo: {event.goingCount}</Badge>
                  <Badge variant={"secondary"}>
                    Talvez va: {event.maybeCount}
                  </Badge>
                  <Badge variant={"outline"}>
                    Nao vai: {event.notGoingCount}
                  </Badge>
                </div>
                <p>
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleString()
                    : "Evento sem data marcada"}

                  {event.location ? ` - ${event.location}` : ""}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

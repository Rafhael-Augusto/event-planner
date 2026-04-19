import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "../dashboard-content";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

type Props = {
  userId: string;
  eventId: string;
};

export default async function EventDetailsContent({ userId, eventId }: Props) {
  const row = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });

  if (!row) {
    notFound();
  }

  const counts = countByStatus(row.rsvps);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    ...counts,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {event.title}
          </h1>
          <p>
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "Evento sem data marcada"}

            {event.location ? ` - ${event.location}` : ""}
          </p>

          {event.description ?? (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {event.description}
            </p>
          )}
        </div>

        <Button asChild variant={"outline"}>
          <Link href={"/dashboard"}>Voltar</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge>Esta indo: {event.goingCount}</Badge>
        <Badge variant={"secondary"}>Talvez va: {event.maybeCount}</Badge>
        <Badge variant={"outline"}>Nao vai: {event.notGoingCount}</Badge>
      </div>
    </div>
  );
}

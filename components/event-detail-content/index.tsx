import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "../dashboard-content";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { createInviteLinkAction } from "@/lib/actions/events";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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

  const rsvpRows = await prisma.eventRsvp.findMany({
    where: {
      eventId,
    },
    orderBy: { respondedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      respondedAt: true,
    },
  });

  const rsvps = rsvpRows.map((r) => ({
    ...r,
    respondedAt: r.respondedAt.toISOString(),
  }));

  const createInviteActionForEvent = createInviteLinkAction.bind(
    null,
    event.id,
  );

  const inviteUrl = event.inviteToken
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invite/${event.inviteToken}`
    : null;

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
              : "Evento sem data definida"}

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
        <Badge>Vai: {event.goingCount}</Badge>
        <Badge variant={"secondary"}>Talvez: {event.maybeCount}</Badge>
        <Badge variant={"outline"}>Não vai: {event.notGoingCount}</Badge>
      </div>

      <Card>
        <CardHeader>Link de convite</CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Compartilhe este link com convidados para confirmar presença sem
            precisar criar uma conta.
          </p>

          {inviteUrl ? (
            <div className="rounded-md border border-slate-700 bg-slate-900/90 p-3 text-sm">
              {inviteUrl}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum link de convite gerado.
            </p>
          )}

          <form action={createInviteActionForEvent}>
            <Button type="submit">Gerar link</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Participantes</CardTitle>
        </CardHeader>

        <CardContent>
          {rsvps.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sem respostas.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Atualizado</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rsvps.map((rsvp) => (
                  <TableRow key={rsvp.id}>
                    <TableCell>{rsvp.name}</TableCell>
                    <TableCell>{rsvp.email}</TableCell>
                    <TableCell>
                      <Badge variant={"secondary"}>
                        {rsvp.status === "not_going"
                          ? "Não vai"
                          : rsvp.status === "going"
                            ? "Vai"
                            : "Talvez"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(rsvp.respondedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

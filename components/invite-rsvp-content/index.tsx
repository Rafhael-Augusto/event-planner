import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { notFound } from "next/navigation";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";

type Props = {
  token: string;
  submitted: boolean;
};

export async function InviteRsvpContent({ token, submitted }: Props) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const e = row.event;

  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="space-y-3">
          <Badge variant={"secondary"}>RSVP</Badge>

          <CardTitle>{event.title}</CardTitle>

          <p>
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "Evento sem data marcada"}

            {event.location ? ` - ${event.location}` : ""}
          </p>

          {event.description ? (
            <p className="text-sm text-muted-foreground">{event.description}</p>
          ) : null}
        </CardHeader>

        <CardContent>
          {submitted ? (
            <p className="mb-4 rounded-md border border-slate-700 p-4">
              Obrigado. Seu RSVP foi salvo ( ou atualizado ).
            </p>
          ) : null}

          <form action={submitRsvpForToken}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input id="name" name="name" required placeholder="Seu nome" />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Seu email"
                />
              </Field>
              <FieldLabel htmlFor="status">Attendance</FieldLabel>

              <Field>
                <Select defaultValue="going" required name="status">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="going">Indo</SelectItem>
                      <SelectItem value="maybe">Talvez</SelectItem>
                      <SelectItem value="not_going">Nao irei</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field orientation={"horizontal"}>
                <Button type="submit">Enviar RSVP</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

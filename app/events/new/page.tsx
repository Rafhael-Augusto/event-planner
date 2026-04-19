import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { createEventAction } from "@/lib/actions/events";
import Link from "next/link";

export default async function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Criar Evento</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={createEventAction}>
            <FieldGroup>
              <FieldSet>
                <FieldLabel htmlFor="title">Título</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="Jantar da equipe..."
                />
              </FieldSet>

              <FieldSet>
                <FieldLabel htmlFor="description">Descrição</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Detalhes opcionais sobre o evento"
                />
              </FieldSet>

              <FieldSet>
                <FieldLabel htmlFor="location">Localização</FieldLabel>
                <Input
                  id="location"
                  name="location"
                  placeholder="Localização opcional"
                />
              </FieldSet>

              <FieldSet>
                <FieldLabel htmlFor="eventDate">Data e hora</FieldLabel>
                <Input id="eventDate" name="eventDate" type="datetime-local" />
                <FieldDescription>
                  Opcional, você pode adicionar depois.
                </FieldDescription>
              </FieldSet>

              <Field orientation={"horizontal"}>
                <Button type="submit">Criar evento</Button>
                <Button asChild type="button" variant={"outline"}>
                  <Link href={"/dashboard"}>Cancelar</Link>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

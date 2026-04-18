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
                <FieldLabel htmlFor="title">Titulo</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="Team dinner..."
                />
              </FieldSet>

              <FieldSet>
                <FieldLabel htmlFor="description">Descricao</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Detalhes opcionais sobre o evento"
                />
              </FieldSet>

              <FieldSet>
                <FieldLabel htmlFor="location">Localizacao</FieldLabel>
                <Input
                  id="location"
                  name="location"
                  placeholder="Localizacao opcional"
                />
              </FieldSet>

              <FieldSet>
                <FieldLabel htmlFor="eventDate">Dia e hora</FieldLabel>
                <Input id="eventDate" name="eventDate" type="datetime-local" />
                <FieldDescription>
                  Opcional, voce pode adicionar depois.
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

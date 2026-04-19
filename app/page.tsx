import Link from "next/link";

import { getSession } from "@/lib/auth/server";

import {
  ChartNoAxesColumnIncreasingIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await getSession();

  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          Planeje Seu Evento Perfeito
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Crie, gerencie e participe de eventos incríveis. De meetups a
          conferências, temos tudo que você precisa para fazer do seu evento um
          sucesso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {session.data?.user.id ? (
            <>
              <Button asChild>
                <Link href="/events/new" className="text-lg px-8 py-3">
                  Criar Evento
                </Link>
              </Button>

              <Button asChild variant={"secondary"}>
                <Link
                  href="/dashboard"
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Explorar Eventos
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/auth/sign-up" className="text-lg px-8 py-3">
                  Criar Conta
                </Link>
              </Button>

              <Button asChild variant={"secondary"}>
                <Link
                  href="/auth/sign-in"
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Fazer Login
                </Link>
              </Button>
            </>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <PlusIcon size={"100"} />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Criar Eventos
          </h3>
          <p className="text-muted-foreground">
            Crie e gerencie seus eventos facilmente com nossa interface
            intuitiva.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <UsersIcon />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Sistema de RSVP
          </h3>
          <p className="text-muted-foreground">
            Permita que participantes confirmem presença e acompanhe facilmente
            quem vai.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <ChartNoAxesColumnIncreasingIcon />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Análises
          </h3>
          <p className="text-muted-foreground">
            Acompanhe o desempenho do seu evento e o engajamento dos
            participantes.
          </p>
        </div>
      </section>
    </div>
  );
}

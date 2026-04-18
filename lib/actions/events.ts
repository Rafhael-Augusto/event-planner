"use server";

import { redirect } from "next/navigation";
import { getSession } from "../auth/server";
import prisma from "../prisma";

function parseCreateEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();

  if (title.length < 3 || title.length > 120) {
    throw new Error("Titulo deve ter entre 3 e 120 caracteres");
  }

  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const eventDate = String(formData.get("eventDate") ?? "").trim();

  return {
    title,
    description,
    location,
    eventDate,
  };
}

export async function createEventAction(formData: FormData) {
  const session = await getSession();

  if (!session.data?.user.id) {
    redirect("/");
  }

  const userId = session.data?.user.id;

  const input = parseCreateEvent(formData);

  try {
    const created = await prisma.event.create({
      data: {
        ownerUserId: userId,
        title: input.title,
        description: input.description,
        location: input.location,
        eventDate: input.eventDate ? new Date(input.eventDate) : null,
      },
    });

    redirect(`/events/${created.id}`);
  } catch (err) {
    console.error(err);
  }
}

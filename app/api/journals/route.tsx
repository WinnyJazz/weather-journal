import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET
export async function GET() {
  try {
    const journals = await prisma.journal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(journals);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch journals" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const journal = await prisma.journal.create({
      data: {
        city: body.city,
        temperature: Number(body.temperature),
        weather: body.weather,
        description: body.description,
        note: body.note,
      },
    });

    return NextResponse.json(journal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create journal" },
      { status: 500 }
    );
  }
}
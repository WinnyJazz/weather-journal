
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Mengambil semua Journal
export async function GET() {
  try {
    const journals = await prisma.journal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(journals);
  } catch (error) {
    console.error("FETCH JOURNAL ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch journals",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST: Menambahkan Journal baru
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.city ||
      body.temperature === undefined ||
      !body.weather ||
      !body.description ||
      !body.note
    ) {
      return NextResponse.json(
        { error: "All journal fields are required" },
        { status: 400 }
      );
    }

    const temperature = Number(body.temperature);

    if (!Number.isFinite(temperature)) {
      return NextResponse.json(
        { error: "Invalid temperature value" },
        { status: 400 }
      );
    }

    const journal = await prisma.journal.create({
      data: {
        city: String(body.city),
        temperature,
        weather: String(body.weather),
        description: String(body.description),
        note: String(body.note),
      },
    });

    return NextResponse.json(journal, { status: 201 });
  } catch (error) {
    console.error("CREATE JOURNAL ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create journal",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

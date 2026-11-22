import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const journal = await prisma.journal.update({
      where: {
        id: Number(id),
      },
      data: {
        city: body.city,
        temperature: Number(body.temperature),
        weather: body.weather,
        description: body.description,
        note: body.note,
      },
    });

    return NextResponse.json(journal);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update journal" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.journal.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Journal deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete journal" },
      { status: 500 }
    );
  }
}
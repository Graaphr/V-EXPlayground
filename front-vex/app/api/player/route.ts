import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "public",
  "data",
  "PlayerData.json"
);

/* ====================== */
/* READ */
/* ====================== */

function readPlayers() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        JSON.stringify([])
      );
    }

    const data =
      fs.readFileSync(
        filePath,
        "utf-8"
      );

    return JSON.parse(data);
  } catch {
    return [];
  }
}

/* ====================== */
/* WRITE */
/* ====================== */

function writePlayers(
  data: any
) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(
      data,
      null,
      2
    )
  );
}

/* ====================== */
/* CLEANUP */
/* ====================== */

function cleanupPlayers(
  players: any[]
) {
  const now = Date.now();

  return players.filter(
    (p: any) =>
      now - p.updatedAt < 5000
  );
}

/* ====================== */
/* GET */
/* ====================== */

export async function GET() {
  const players =
    cleanupPlayers(
      readPlayers()
    );

  writePlayers(players);

  return NextResponse.json(
    players
  );
}

/* ====================== */
/* POST */
/* ====================== */

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    let players =
      cleanupPlayers(
        readPlayers()
      );

    const index =
      players.findIndex(
        (p: any) =>
          p.id === body.id
      );

    const playerData = {
      id: body.id,
      name: body.name,

      x: body.x || 0,
      y: body.y || 0,
      z: body.z || 0,

      rotation:
        body.rotation || 0,

      updatedAt:
        Date.now(),
    };

    if (index >= 0) {
      players[index] =
        playerData;
    } else {
      players.push(
        playerData
      );
    }

    writePlayers(players);

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

/* ====================== */
/* DELETE */
/* ====================== */

export async function DELETE(
  req: Request
) {
  try {
    const {
      searchParams,
    } = new URL(req.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const players =
      readPlayers();

    const filtered =
      players.filter(
        (p: any) =>
          p.id !== id
      );

    writePlayers(
      filtered
    );

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
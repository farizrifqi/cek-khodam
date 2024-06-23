import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getRandomInt } from "@/lib/utils";
import { getLoveMeterStatus } from "@/lib/meterStatus";
import { Redis } from "@upstash/redis";

export async function GET(req: NextRequest): Promise<NextResponse> {
  let result = { p: 0, w: 0, match: 0 };

  const client = new MongoClient(process.env.MONGODB_URI!, {
    retryWrites: true,
    writeConcern: { w: "majority" },
  });
  try {
    await client.connect();
    const database = client.db("cek");
    const collection = database.collection("partner");
    result.p = (await collection.countDocuments({ gender: "cowok" })) ?? 0;
    result.w = (await collection.countDocuments({ gender: "cewek" })) ?? 0;
    const redis = Redis.fromEnv();
    result.match =
      ((await redis.mget<number[]>("matched-partner")) as any)[0] ?? 0;
  } catch (err) {}

  return new NextResponse(JSON.stringify(result), { status: 200 });
}

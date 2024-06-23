import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getRandomInt } from "@/lib/utils";
import { getLoveMeterStatus } from "@/lib/meterStatus";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
export async function POST(req: NextRequest): Promise<NextResponse> {
  let finder = "",
    match = "";
  try {
    const data = await req.json();
    finder = data.finder ?? "";
    match = data.match ?? "";
  } catch (err) {}
  let ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.ip;

  if (ip) {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`${ip}:${finder}:${match}`)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const key = `deduplicate:${hash}`;

    const isNew = await redis.set(key, true, {
      nx: true,
      ex: 24 * 60 * 60,
    });

    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }

  await redis.incr("matched-partner");
  return new NextResponse(null, { status: 202 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const cowok = searchParams.get("cowok") ?? null;
  const cewek = searchParams.get("cewek") ?? null;
  const cari = cewek ?? cowok ?? null;
  if (!cari) return new NextResponse(null, { status: 400 });

  let gacha1 = getRandomInt(1, 100);
  const client = new MongoClient(process.env.MONGODB_URI!, {
    retryWrites: true,
    writeConcern: { w: "majority" },
  });
  let result = {
    cewek: {
      username: cewek,
      photo: null,
    },
    cowok: {
      username: cowok,
      photo: null,
    },
    match: 0,
    status: getLoveMeterStatus(0),
  };
  result.match = gacha1 > 20 ? getRandomInt(1, 100) : 0;

  try {
    await client.connect();
    const database = client.db("cek"); // Choose a name for your database
    const collection = database.collection("partner"); // Choose a name for your collection
    let fotoFinder = await getPhoto(
      result.cowok.username ?? result.cewek.username ?? undefined
    );

    // Cari user-pencari
    if (!fotoFinder) {
      result.match = 0;
      result.status = getLoveMeterStatus(result.match);
      return new NextResponse(JSON.stringify(result), { status: 200 });
    }
    let cari1 = await collection.findOneAndUpdate(
      { username: cari.toLowerCase() },
      { $set: { gender: cewek ? "cewek" : "cowok" } }
    );
    if (!cari1) {
      await collection.insertOne({
        username: cari.toLowerCase(),
        gender: cewek ? "cewek" : "cowok",
      });
    }

    if (result.cewek.username == cari) {
      result.cewek.photo = fotoFinder;
    } else {
      result.cowok.photo = fotoFinder;
    }
    if (gacha1 >= 20) {
      if (result.cewek.username) {
        var dataDB = await collection
          .find({
            gender: "cowok",
            username: { $ne: cari.toLocaleLowerCase() },
          })
          .toArray();
        result.cowok.username =
          dataDB[Math.floor(Math.random() * dataDB.length)].username ??
          undefined;
      } else {
        var dataDB = await collection
          .find({
            gender: "cewek",
            username: { $ne: cari.toLocaleLowerCase() },
          })
          .toArray();
        result.cewek.username =
          dataDB[Math.floor(Math.random() * dataDB.length)].username ??
          undefined;
      }
    }

    if (!result.cewek.username || !result.cowok.username) {
      result.match = 0;
      result.status = getLoveMeterStatus(result.match);

      return new NextResponse(JSON.stringify(result), { status: 200 });
    }
    result.status = getLoveMeterStatus(result.match);
    if (result.cewek.photo) {
      result.cowok.photo = await getPhoto(result.cowok.username ?? undefined);
    } else {
      result.cewek.photo = await getPhoto(result.cewek.username ?? undefined);
    }
  } catch (err) {}
  return new NextResponse(JSON.stringify(result), { status: 200 });

  // return new NextResponse(
  //   JSON.stringify({ url: resTxt.userInfo.user.avatarLarger }),
  //   { status: 200 }
  // );
}

async function getPhoto2(username?: string) {
  if (!username) return null;
  try {
    const res = await fetch(
      "https://www.tiktok.com/api/user/detail/?aid=1988&app_language=en&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2016_6%20like%20Mac%20OS%20X%29%20AppleWebKit%2F605.1.15%20%28KHTML%2C%20like%20Gecko%29%20Version%2F16.6%20Mobile%2F15E148%20Safari%2F604.1&channel=tiktok_web&cookie_enabled=true&device_id=7283239219081250309&device_platform=web_mobile&focus_state=true&from_page=user&history_len=2&is_fullscreen=false&is_page_visible=true&language=en&os=ios&priority_region=ID&referer=&region=ID&screen_height=844&screen_width=450&secUid=MS4wLjABAAAABHHZJwm8V-ez_NzKjqQlly0DxfjmhVm3JDsKK1sokCTpd4jt20nO6dEgArrYrDtH&tz_name=Asia%2FMakassar&uniqueId=" +
        username +
        "&webcast_language=en&msToken=Gz-SNo6og-jCwQzO8pL-lwSN8Z4CQQ0YHuU-EfSZ-98cB61Xoz5Bl1Xu30rvpQRIjaq8h4EUwLwky7fqle4UnnmkYalaPDjHe6WbtkvLKlOFhOZPgqyrlr3j8Ul7wyArKrfxdn2qxFcUyummR2HMbCg7sdM=&X-Bogus=DFSzKIVO9pUANJ5ftWr/oHNrVVOm",
      {
        method: "GET",
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        },
      }
    );
    const resTxt = await res.json();
    if (!resTxt.userInfo.user.avatarLarger) return null;
    return resTxt.userInfo.user.avatarLarger;
  } catch (err) {}
  return null;
}
async function getPhoto(username?: string) {
  if (!username) return null;
  try {
    const res = await fetch(
      "https://tools.revesery.com/tiktokdp/revesery.php?username=" + username,
      {
        method: "GET",
      }
    );
    const resTxt = await res.json();
    if (!resTxt.data.photo) return null;
    return resTxt.data.photo;
  } catch (err) {}
  return null;
}

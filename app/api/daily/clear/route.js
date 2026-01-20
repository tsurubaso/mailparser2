import { pool } from "@/lib/db"; // adapte si ton pool est ailleurs

export const runtime = "nodejs";

export async function POST() {
  try {
    await pool.query("TRUNCATE TABLE mail_daily CASCADE;");

    return Response.json({
      status: "ok",
      message: "Daily table cleared",
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        category,
        price,
        availability,
        rating,
        product_url,
        image_url
      FROM books
      ORDER BY id
      LIMIT 100;
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Aishu@123",
  database: "booksdb",
  port: 5432,
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
        image_url
      FROM books
      ORDER BY id
      LIMIT 100
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}


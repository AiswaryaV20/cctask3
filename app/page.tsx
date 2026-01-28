"use client";

import { useEffect, useState } from "react";

type Book = {
  title: string;
  category: string;
  price: number;
  rating: number;
  image_url: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("API did not return array:", data);
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setBooks([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Loading books...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Books from PostgreSQL</h1>

      {books.length === 0 && (
        <p className="text-red-500">No books found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm"
          >
            <img
              src={book.image_url}
              alt={book.title}
              className="h-48 w-full object-contain mb-3"
            />

            <h2 className="font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.category}</p>
            <p className="mt-1">₹ {book.price}</p>
            <p>⭐ {book.rating} / 5</p>
          </div>
        ))}
      </div>
    </main>
  );
}

"use client";
import React, { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American dream and its disillusionment.",
    imageUrl: "/book1.jpeg",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A powerful exploration of racial injustice in the Deep South.",
    imageUrl: "/book2.jpeg",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel about totalitarianism and the loss of individual freedom.",
    imageUrl: "/book3.jpeg",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A classic romance novel with keen social commentary.",
    imageUrl: "/book4.jpeg",
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    description:
      "The epic tale of a man's obsessive quest to hunt the white whale.",
    imageUrl: "/book5.jpeg",
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A novel about teenage rebellion and the struggles of growing up.",
    imageUrl: "/book6.jpeg",
  },
];

export default function FixedBooks() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle inline editing of a field
  const handleEdit = (id: number, field: keyof Book, value: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, [field]: value } : book
      )
    );
  };

  // Handle deleting a book
  const handleDelete = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  // Toggle editing mode
  const toggleEditing = (id: number) => {
    setEditingId(editingId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Books Container */}
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length === 0 ? (
            <p className="text-white text-center">No books available.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105"
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />

                {/* Inline editable title */}
                <h3
                  className={`text-xl font-bold text-gray-800 ${
                    editingId === book.id ? "border-b border-gray-300" : ""
                  }`}
                  contentEditable={editingId === book.id}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    editingId === book.id &&
                    handleEdit(book.id, "title", e.target.textContent || "")
                  }
                >
                  {book.title}
                </h3>

                {/* Inline editable author */}
                <p
                  className={`text-sm text-gray-500 ${
                    editingId === book.id ? "border-b border-gray-300" : ""
                  }`}
                  contentEditable={editingId === book.id}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    editingId === book.id &&
                    handleEdit(book.id, "author", e.target.textContent || "")
                  }
                >
                  by {book.author}
                </p>

                {/* Inline editable description */}
                <p
                  className={`text-sm text-gray-700 mt-2 ${
                    editingId === book.id ? "border-b border-gray-300" : ""
                  }`}
                  contentEditable={editingId === book.id}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    editingId === book.id &&
                    handleEdit(
                      book.id,
                      "description",
                      e.target.textContent || ""
                    )
                  }
                >
                  {book.description}
                </p>

                Edit and Delete buttons
                <div className="mt-4 flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded text-white ${
                      editingId === book.id
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => toggleEditing(book.id)}
                  >
                    {editingId === book.id ? "Save" : "Edit"}
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

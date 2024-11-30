"use client";
import { useState } from "react";
import FixedBooks from "./fixBooks";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
}

export default function BookPages() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !description || !image) {
      setErrorMessage("All fields are required.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newBook: Book = {
        id: Date.now(),
        title,
        author,
        description,
        imageUrl: reader.result as string,
      };

      setBooks((prevBooks) => [...prevBooks, newBook]);
      setTitle("");
      setAuthor("");
      setDescription("");
      setImage(null);
      setErrorMessage("");
    };
    reader.readAsDataURL(image);
  };

  // Handle inline editing of a field
  const handleEdit = (id: number, field: keyof Book, value: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, [field]: value } : book
      )
    );
  };

  // Toggle editing mode
  const toggleEditing = (id: number) => {
    setEditingId(editingId === id ? null : id);
  };

  // Handle deleting a book
  const handleDelete = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8">📚 Book Library</h1>

      {/* Book Form */}
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl text-black font-bold mb-4 text-center">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
          <div className="mb-4">
            <label className="block font-bold text-gray-700">
              Upload Book Cover
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full p-2 text-gray-700 border rounded-lg"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Add Book
          </button>
        </form>
      </div>

      {/* Books Container */}
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl text-center font-bold text-white mb-8">
          📚 Books Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
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
                  handleEdit(book.id, "description", e.target.textContent || "")
                }
              >
                {book.description}
              </p>

              {/* Edit and Delete Buttons */}
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
          ))}
        </div>
      </div>
      <FixedBooks />
      <div className="flex justify-center mt-4 font-extrabold text-2xl">
        <p>Built By Afaq ul Islam</p>
      </div>
    </div>
  );
}

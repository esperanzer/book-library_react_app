
import React, { useState } from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import axios from 'axios';

const App = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    const fetchBooks = () => {
        axios.get('/api/books').then(response => {
            setBooks(response.data);
        });
    };

    const addBook = (book) => {
        setBooks([...books, book]);
    };

    const updateBook = (updatedBook) => {
        setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
        setEditingBook(null);
    };

    const deleteBook = (id) => {
        axios.delete(`/api/books/${id}`).then(() => {
            setBooks(books.filter(book => book.id !== id));
        });
    };

    return (
        <div>
            <h1>Book Library</h1>
            {editingBook ? (
                <EditBookForm book={editingBook} onUpdate={updateBook} onCancel={() => setEditingBook(null)} />
            ) : (
                <AddBookForm onAdd={addBook} />
            )}
            <BookList onEdit={setEditingBook} onDelete={deleteBook} />
        </div>
    );
};

export default App;


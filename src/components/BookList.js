import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = ({ onEdit, onDelete }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('/api/books').then(response => {
            setBooks(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author} (ISBN: {book.isbn})
                        <button onClick={() => onEdit(book)}>Edit</button>
                        <button onClick={() => onDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;


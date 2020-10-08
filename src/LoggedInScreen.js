import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseAppAuth, database } from "./firebase";

// Name of our "collection" in Firestore
const COLLECTION = "books";

// A function we can call to save data to the database
// The parameters and keys in the object (isbn, title) are just examples that you can replace
const addData = (title) => {
  const isbn = uuid();
  database
    .collection(COLLECTION)
    .add({
      isbn: isbn,
      title: title,
    })
    .then((newDocument) => {
      // This will run if adding data was successful
      console.log("New document created with ID: ", newDocument.id);
    })
    .catch((error) => {
      // If saving data failed, this will run and we will log an error to the console.
      // Here you should give a message to users as well!
      console.error(error.message);
    });
};

export const LoggedInScreen = () => {
  // We're using a useState hook to keep track of what the user has entered in the input field
  const [bookTitle, setBookTitle] = useState("");
  // We're using the same hook here as in App for getting info about our user
  const [user] = useAuthState(firebaseAppAuth);
  // We're using this hook to get collection-data from firestore
  const [books, loading, error] = useCollectionData(
    database.collection(COLLECTION)
  );

  // A few handler functions for dealing with inputs from user
  const handleBookTitleChange = (event) => setBookTitle(event.target.value);
  const handleAddBook = () => {
    // Calling the addData function that saves our new item to the database
    addData(bookTitle);
    // Resetting the book title field so we can create a new one
    setBookTitle("");
  };
  const handleSignOut = () => firebaseAppAuth.signOut();

  // When data is still loading, we will show nothing to the user
  // We could also show a spinner or a "loading" text instead
  if (loading) {
    return null;
  }

  // If the hook catches an error, we will see that here and log it
  if (error) {
    console.error(error.message);
    return <p>An error occurred!</p>;
  }

  return (
    <div>
      <p>Hello, {user.displayName}</p>
      <p>Here's your books:</p>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>{book.title}</li>
        ))}
      </ul>
      <input value={bookTitle} onChange={handleBookTitleChange} />
      <button onClick={handleAddBook}>Add book</button>
      <br />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

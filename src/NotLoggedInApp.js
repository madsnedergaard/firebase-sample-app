import React from "react";
import { firebaseAppAuth, provider } from "./firebase";

export const NotLoggedInApp = () => {
  const handleSignIn = () => firebaseAppAuth.signInWithPopup(provider);

  return (
    <div>
      <p>Please sign in.</p>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

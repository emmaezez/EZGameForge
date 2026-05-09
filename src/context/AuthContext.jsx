// Human and template Citation: I implemented Google Auth login while working with a
// template that demonstrates Working with firebase and firebase auth learning by
// correctly setting up GoogleAuth and the users log in and log out correctly

import { createContext, useContext, useEffect, useState } from "react"; // template import statement
//Human driven imports here
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Keeps user logged in on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", "[]");
      return undefined;
    }

    let isActive = true;

    // Wishlist logic from others: Other group members code and logics
    // that makes wishlist works on firebase's end
    const fetchWishlist = async () => {
      try {
        const wishlistDoc = doc(db, "wishlists", user.uid);
        const snapshot = await getDoc(wishlistDoc);
        if (!isActive) return;
        const items = snapshot.exists() ? snapshot.data().items ?? [] : [];
        localStorage.setItem("wishlist", JSON.stringify(items));
      } catch (error) {
        console.error("Failed to load wishlist from Firebase", error);
      }
    };

    fetchWishlist();

    return () => {
      isActive = false;
    };
  }, [user]);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
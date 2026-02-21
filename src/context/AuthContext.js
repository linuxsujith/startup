"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);

            // Routing Logic
            const publicRoutes = ["/login", "/signup", "/forgot-password"];
            const isPublicRoute = publicRoutes.includes(pathname);

            if (!firebaseUser && !isPublicRoute && pathname.startsWith("/dashboard")) {
                router.push("/login");
            }

            if (firebaseUser && isPublicRoute) {
                router.push("/dashboard");
            }
        });

        return () => unsubscribe && unsubscribe();
    }, [pathname, router]);

    const signup = async (email, password, name) => {
        if (!auth || !db) throw new Error("Authentication is currently disabled.");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        await updateProfile(newUser, { displayName: name });

        await setDoc(doc(db, "users", newUser.uid), {
            uid: newUser.uid,
            name,
            email,
            createdAt: new Date().toISOString(),
            streakCount: 0,
            dailyGenerationsUsed: 0,
            lastResetDate: new Date().toISOString()
        });

        return newUser;
    };

    const login = (email, password) => {
        if (!auth) throw new Error("Authentication is currently disabled.");
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        if (!auth) return;
        await signOut(auth);
        router.push("/login");
    };

    const resetPassword = (email) => {
        if (!auth) throw new Error("Authentication is currently disabled.");
        return sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

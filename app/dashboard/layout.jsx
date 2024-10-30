"use client"
import Sidebar from "@/components/sidebar/Sidebar";
import { app } from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductDetailLayout({ children }) {
    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (!user) {
                // Redirect to login if not authenticated
                router.push('/');
            }
        });
        return () => unsubscribe(); // Clean up subscription
    }, [router, auth]);

    return (
        <div className="flex gap-1">
            <Sidebar />
            <div className="flex-[6] p-2">
                <div className=" bg-white rounded-md shadow p-3 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
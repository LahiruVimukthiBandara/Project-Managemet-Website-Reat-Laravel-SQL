import NavBar from "@/Components/App/NavBar";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
            <NavBar />
            <ToastContainer position="top-right" autoClose={3000} />

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}

import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>
                </div>

                <div className="relative z-10 w-full max-w-3xl px-6 py-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Welcome to{" "}
                        <span className="text-primary">Task Metrix</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-black/60 dark:text-white/70">
                        Streamline your projects and tasks with our powerful and
                        easy-to-use platform.
                    </p>

                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="inline-block rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white shadow  transition"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href={route("register")}
                                className="inline-block rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white shadow  transition"
                            >
                                Register
                            </Link>
                            <Link
                                href={route("login")}
                                className="inline-block rounded-lg border border-primary px-6 py-3 text-lg font-semibold text-primary transition"
                            >
                                Log in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

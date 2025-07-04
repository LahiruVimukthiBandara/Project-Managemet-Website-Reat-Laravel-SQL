import ApplicationLogo from "@/Components/Core/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 dark:bg-gray-900 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current dark:text-gray-400" />
                </Link>
            </div>

            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md dark:bg-gray-800 dark:shadow-lg sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

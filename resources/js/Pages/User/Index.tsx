import UserTable from "@/Components/App/Users/UserTable";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({ users }: any) {
    const [search, setSearch] = useState("");
    const user = usePage().props.auth.user;

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("user.index"),
                { search },
                { preserveScroll: true, replace: true, preserveState: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);
    return (
        <AuthenticatedLayout>
            <Head title="Users" />
            <div className="flex flex-col gap-3">
                <div className="flex w-full justify-between gap-3 p-3 bg-gray-800 rounded-lg">
                    <div>
                        <Link
                            as="button"
                            href={route("user.create")}
                            className="btn btn-primary"
                        >
                            New User
                        </Link>
                    </div>
                    <div className="w-[300px]">
                        <TextInput
                            className="w-full"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search User by Name or email......"
                        />
                    </div>
                </div>
                <div>
                    <UserTable users={users} user={user} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

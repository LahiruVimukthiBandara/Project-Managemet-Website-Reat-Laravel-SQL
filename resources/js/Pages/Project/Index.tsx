import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import ProjectTable from "../../Components/App/Project/ProjectTable";
import TextInput from "@/Components/Core/TextInput";
import { useEffect, useState } from "react";

export default function Index({ projects }: any) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("");
    const admin = usePage().props.auth.user;

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("project.index"),
                { search, status, sort },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search, status, sort]);
    return (
        <AuthenticatedLayout>
            <Head title="Projects" />
            <div className="flex flex-col gap-3">
                <div className="flex justify-between gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="">
                        <Link
                            as="button"
                            href={route("project.create")}
                            className="btn btn-primary"
                        >
                            {" "}
                            New Project{" "}
                        </Link>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div>
                            <select
                                name="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="select w-[150px]"
                            >
                                <option value="">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                            </select>
                        </div>
                        <div className="w-[300px]">
                            <TextInput
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search Projects by Name, Description or ID......"
                            />
                        </div>
                    </div>
                </div>
                <ProjectTable projects={projects} admin={admin} />
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import TasksTable from "@/Components/App/Tasks/TasksTable";
import { useEffect, useState } from "react";
import TextInput from "@/Components/Core/TextInput";

export default function Index({ tasks }: any) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [sort, setSort] = useState("");
    const admin = usePage().props.auth.user;

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("task.index"),
                { search, status, priority, sort },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search, status, priority, sort]);
    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between gap-3 p-3 bg-gray-800 rounded-lg">
                        <div>
                            <Link
                                as="button"
                                className="btn btn-primary"
                                href={route("task.create")}
                            >
                                {" "}
                                New Task
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <div>
                                {" "}
                                <select
                                    name="priority"
                                    id="priority"
                                    value={priority}
                                    onChange={(e) =>
                                        setPriority(e.target.value)
                                    }
                                    className="select w-[150px]"
                                >
                                    <option value="">All Priorities</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
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
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                </select>
                            </div>
                            <div className="w-[300px]">
                                <TextInput
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Search Tasks by Name or ID..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                    <div className="overflow-x-auto">
                        <TasksTable tasks={tasks} admin={admin} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

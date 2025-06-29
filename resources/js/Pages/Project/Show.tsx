import TasksTable from "@/Components/App/Tasks/TasksTable";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Show({ project, tasks }: any) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    const pro = project.data.data || project.data;
    const tsk = tasks.data.data || tasks.data;
    const admin = usePage().props.auth.user;

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("project.show", pro.id),
                { search, status, priority, sort },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search, status, priority, sort]);

    console.log(tsk);

    return (
        <AuthenticatedLayout>
            <Head title={`Project: ${pro.name}`} />
            <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-end gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-full h-64 overflow-hidden rounded">
                        <img
                            src={
                                imageUrl + pro.image_path ||
                                "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            alt={pro.name}
                            className="object-cover object-center w-full h-full"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Project ID</h1>
                                <h1 className="font-light">{pro.id}</h1>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Project Name</h1>
                                <h1>{pro.name}</h1>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Project Status</h1>
                                <span
                                    className={
                                        "badge badge-soft " +
                                        (pro.status === "completed"
                                            ? "badge-success"
                                            : pro.status === "pending"
                                            ? "badge-warning"
                                            : pro.status === "in_progress"
                                            ? "badge-error"
                                            : "badge-secondary")
                                    }
                                >
                                    {pro.status}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Created By</h1>
                                <h1>{pro.createdBy.name}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Due Date</h1>
                                <h1 className="font-light">{pro.due_date}</h1>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Created Date</h1>
                                <h1 className="font-light badge badge-soft badge-success">
                                    {pro.created_at}
                                </h1>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Updated Date</h1>
                                <h1 className="font-light badge badge-soft badge-error">
                                    {pro.updated_at}
                                </h1>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Updated By</h1>
                                <h1 className="font-light">
                                    {pro.updatedBy.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <h1 className="font-bold">Project Description</h1>
                        <h1 className="font-light">{pro.description}</h1>
                    </div>
                </div>
                <h2 className="mt-5 text-lg font-bold text-white ">
                    Tasks for this Project {tasks.meta.total}
                    <div className="divider"></div>
                </h2>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-end gap-3 p-3 bg-gray-800 rounded-lg">
                        <select
                            name="priority"
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="select w-[150px]"
                        >
                            <option value="">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
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

                        <TextInput
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search Tasks by Name or ID..."
                        />
                    </div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                    <TasksTable tasks={tasks} admin={admin} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

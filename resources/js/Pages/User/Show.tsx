import ProjectTable from "@/Components/App/Project/ProjectTable";
import TasksTable from "@/Components/App/Tasks/TasksTable";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Show({
    user,
    tasks,
    projects,
    completed,
    pending,
    in_progress,
}: any) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    const usr = user.data.data || user.data;
    const tsk = tasks.data.data || tasks.data;
    const pro = projects.data.data || projects.data;
    const admin = usePage().props.auth.user;

    const [taskSearch, setTaskSearch] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const [projectSearch, setProjectSearch] = useState("");
    const [projectStatus, setprojectStatus] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("user.show", usr.id),
                { taskSearch, taskStatus, projectStatus, projectSearch },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [taskSearch, taskStatus, projectStatus, projectSearch]);

    return (
        <AuthenticatedLayout>
            <Head title="My Tasks" />
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <div className="flex w-full gap-3 p-10 bg-gray-800 rounded-lg">
                        <div className="grid w-full grid-cols-2 gap-5">
                            <div className="flex items-center justify-center w-full">
                                <div className="avatar">
                                    <div className="w-64 rounded-full">
                                        <img
                                            src={imageUrl + usr.avatar}
                                            alt={usr.avatar}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-bold"> ID</h1>
                                            <h1 className="font-light">
                                                {usr.id}
                                            </h1>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-bold"> Name</h1>
                                            <h1 className="font-light">
                                                {usr.name}
                                            </h1>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-bold">
                                                {" "}
                                                Email
                                            </h1>
                                            <h1 className="font-light">
                                                {usr.email}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-bold">
                                                Cpmpleted
                                            </h1>
                                            <h1 className="font-light badge badge-soft badge-success">
                                                {completed}
                                            </h1>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-bold">
                                                Pending
                                            </h1>
                                            <h1 className="font-light badge badge-soft badge-warning">
                                                {pending}
                                            </h1>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-bold">
                                                In Progress
                                            </h1>
                                            <h1 className="font-light badge badge-soft badge-info">
                                                {in_progress}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 py-5">
                    <div className="flex gap-3">
                        <h1>All projects Assigned </h1>
                        <h1 className="text-primary">{projects.meta.total} </h1>
                    </div>
                    <div className="flex gap-3">
                        <h1>All Tasks Assigned </h1>
                        <h1 className="text-primary">{tasks.meta.total} </h1>
                    </div>
                </div>
                <div className="flex w-full gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-full bg-gray-800 tabs tabs-box">
                        <input
                            type="radio"
                            name="my_tabs_6"
                            className="tab "
                            aria-label="All the Tasks "
                            defaultChecked
                        />
                        <div className="pt-6 tab-content">
                            <div className="flex justify-end w-full gap-3 pb-3 border-b border-gray-600">
                                <div>
                                    <select
                                        name="status"
                                        id="status"
                                        value={taskStatus}
                                        onChange={(e) =>
                                            setTaskStatus(e.target.value)
                                        }
                                        className="select w-[150px]"
                                    >
                                        <option value="">All Status</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                    </select>
                                </div>
                                <div className=" w-[300px]">
                                    <TextInput
                                        name="search"
                                        value={taskSearch}
                                        onChange={(e) =>
                                            setTaskSearch(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Search Task by Name or ID......"
                                    />
                                </div>
                            </div>

                            <TasksTable tasks={tasks} admin={admin} />
                        </div>

                        <input
                            type="radio"
                            name="my_tabs_6"
                            className="tab"
                            aria-label="All the Projects"
                        />
                        <div className="p-6 tab-content">
                            <div className="flex justify-end w-full gap-3 pb-3 border-b border-gray-600">
                                <div>
                                    <select
                                        name="status"
                                        id="status"
                                        value={projectStatus}
                                        onChange={(e) =>
                                            setprojectStatus(e.target.value)
                                        }
                                        className="select w-[150px]"
                                    >
                                        <option value="">All Status</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                    </select>
                                </div>
                                <div className=" w-[300px]">
                                    <TextInput
                                        name="search"
                                        value={projectSearch}
                                        onChange={(e) =>
                                            setProjectSearch(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Search Projects by Name, Description or ID......"
                                    />
                                </div>
                            </div>
                            <ProjectTable projects={projects} admin={admin} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

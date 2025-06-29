import TasksTable from "@/Components/App/Tasks/TasksTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function ({ task }: any) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    const tsk = task.data.data || task.data;
    const admin = usePage().props.auth.user;

    console.log(task);

    return (
        <AuthenticatedLayout>
            <Head title={`Project: ${tsk.name}`} />
            <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-end gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-full h-64 overflow-hidden rounded">
                        <img
                            src={
                                imageUrl + tsk.image_path ||
                                "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            alt={tsk.name}
                            className="object-cover object-center w-full h-full"
                        />
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-2 gap-5 p-3">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">tsk ID</h1>
                                    <h1 className="font-light">{tsk.id}</h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Task Name</h1>
                                    <h1>{tsk.name}</h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">tsk Status</h1>
                                    <span
                                        className={
                                            "badge badge-soft " +
                                            (tsk.status === "completed"
                                                ? "badge-success"
                                                : tsk.status === "pending"
                                                ? "badge-warning"
                                                : tsk.status === "in_progress"
                                                ? "badge-error"
                                                : "badge-secondary")
                                        }
                                    >
                                        {tsk.status}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Assign To</h1>
                                    <h1>{tsk.assignedUser.name}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Due Date</h1>
                                    <h1 className="font-light">
                                        {tsk.due_date}
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Created</h1>
                                    <h1 className="font-light badge badge-soft badge-success">
                                        {tsk.created_at}
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Last Update </h1>
                                    <h1 className="font-light badge badge-soft badge-error">
                                        {tsk.updated_at}
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold">Updated By</h1>
                                    <h1 className="font-light">
                                        {tsk.updatedBy.name}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="flex flex-col gap-2 mt-3">
                            <h1 className="font-bold">Project Description</h1>
                            <h1 className="font-light">{tsk.description}</h1>
                        </div>
                        <div className="flex w-full justify-end">
                            <Link
                                as="button"
                                href={route("task.edit", tsk.id)}
                                className="btn btn-primary"
                            >
                                {" "}
                                Update Status{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

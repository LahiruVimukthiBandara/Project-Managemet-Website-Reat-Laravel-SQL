import axios from "axios";
import InputError from "@/Components/Core/InputError";
import { useForm, usePage } from "@inertiajs/react";

import React, { FormEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TaskForm({ task }: any) {
    const user = usePage().props.auth.user;
    const [preview, setPreview] = useState("");
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            setData("image_path", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userRes = await axios.get(route("members"));
                const fetchedUsers = userRes.data.data || userRes.data;
                setUsers(fetchedUsers);

                const projectRes = await axios.get(route("projects"));
                const fetchedProjects = projectRes.data.data || projectRes.data;
                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        getUsers();
    }, []);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: task?.name || "",
        description: task?.description || "",
        image_path: null as File | null,
        status: task?.status || "",
        priority: task?.priority || "",
        due_date: task?.due_date || "",
        assigned_user_id: task?.assigned_user_id || "",
        project_id: task?.project_id || "",
        _method: task ? "PUT" : "POST",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (task) {
            post(route("task.update", task.id), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success("Task updated successfully");
                },
                onError: (err) => {
                    toast.error(
                        "Something went wrong while updating the Task.",
                        err
                    );
                },
            });
        } else {
            post(route("task.store"), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success("Task created successfully");
                    reset(
                        "name",
                        "description",
                        "image_path",
                        "priority",
                        "status",
                        "assigned_user_id",
                        "due_date",
                        "project_id"
                    );
                },
                onError: (err) => {
                    toast.error(
                        "Something went wrong while creating the Task.",
                        err
                    );
                },
            });
        }
    };
    return (
        <form onSubmit={submit} className="flex w-full flex-col gap-5">
            <div className="w-full mb-8">
                {(preview || task?.image_path) && (
                    <div className="relative mt-4">
                        <img
                            src={preview || `/storage/${task?.image_path}`}
                            alt="Preview"
                            className="max-w-full h-auto rounded-lg shadow"
                        />
                    </div>
                )}

                <input
                    className="w-full cursor-pointer"
                    type="file"
                    accept="image/*"
                    name="image_path"
                    tabIndex={1}
                    onChange={handleFileChange}
                />
            </div>

            <div className="w-full grid grid-cols-3 gap-5">
                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="name">Task Name</label>

                    <input
                        type="text"
                        className="input w-full"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        tabIndex={2}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="name">Task Status</label>

                    <select
                        className="select w-full"
                        value={data.status || ""}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option disabled value="">
                            Select status
                        </option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="name">Task Priority</label>

                    <select
                        className="select w-full"
                        value={data.priority || ""}
                        onChange={(e) => setData("priority", e.target.value)}
                    >
                        <option disabled value="">
                            Select priority
                        </option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <InputError message={errors.priority} className="mt-2" />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="name">Due Date</label>

                    <input
                        type="date"
                        className="input w-full"
                        name="name"
                        value={data.due_date}
                        onChange={(e) => setData("due_date", e.target.value)}
                        tabIndex={3}
                    />
                    <InputError message={errors.due_date} className="mt-2" />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="assigned_user_id">Assign User</label>

                    <select
                        className="select w-full"
                        value={data.assigned_user_id || ""}
                        onChange={(e) =>
                            setData("assigned_user_id", e.target.value)
                        }
                    >
                        <option disabled value="">
                            Select User
                        </option>

                        {Array.isArray(users) &&
                            users.map((user: any) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                    </select>

                    <InputError
                        message={errors.assigned_user_id}
                        className="mt-2"
                    />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="assigned_user_id">Select Project</label>

                    <select
                        className="select w-full"
                        value={data.project_id || ""}
                        onChange={(e) => setData("project_id", e.target.value)}
                    >
                        <option disabled value="">
                            Select Project
                        </option>

                        {Array.isArray(projects) &&
                            projects.map((pro: any) => (
                                <option key={pro.id} value={pro.id}>
                                    {pro.name}
                                </option>
                            ))}
                    </select>

                    <InputError message={errors.project_id} className="mt-2" />
                </div>
            </div>
            <div className="flex w-full flex-col gap-2">
                <label htmlFor="description">Task Description</label>

                <textarea
                    name="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="textarea w-full"
                ></textarea>
                <InputError message={errors.description} className="mt-2" />
            </div>
            <div className="flex w-full justify-end mt-5">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={processing}
                >
                    {task ? "Update Task" : "Create Task"}
                </button>
            </div>
        </form>
    );
}

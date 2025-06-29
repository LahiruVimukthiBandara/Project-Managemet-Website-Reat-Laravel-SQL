import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import InputError from "@/Components/Core/InputError";
import { toast } from "react-toastify";

export default function ProjectForm({ project = null }: any) {
    const user = usePage().props.auth.user;
    const [preview, setPreview] = useState("");

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            setData("image_path", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        name: project?.name || "",
        description: project?.description || "",
        due_date: project?.due_date || "",
        status: project?.status || "",
        image_path: null as File | null,
        _method: project ? "PUT" : "POST",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (project) {
            post(route("project.update", project.id), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success("Project updated successfully");
                },
                onError: (err) => {
                    toast.error(
                        "Something went wrong while updating the project.",
                        err
                    );
                },
            });
        } else {
            post(route("project.store"), {
                onSuccess: () => {
                    toast.success("Project created successfully");
                    reset("name", "image_path", "status", "due_date");
                },
                onError: (err) => {
                    toast.error(
                        "Something went wrong while creating the project.",
                        err
                    );
                },
            });
        }
    };
    console.log(data);
    return (
        <form onSubmit={submit} className="flex w-full flex-col gap-5">
            <div className="w-full mb-8">
                {(preview || project?.image_path) && (
                    <div className="relative mt-4">
                        <img
                            src={preview || `/storage/${project?.image_path}`}
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
                {/* col 01 */}
                <div className="flex w-full flex-col gap-3">
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="name">Project Name</label>

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
                </div>
                {/* col 02 */}
                <div className="flex w-full flex-col">
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="name">Due Date</label>

                        <input
                            type="date"
                            className="input w-full"
                            name="name"
                            value={data.due_date}
                            onChange={(e) =>
                                setData("due_date", e.target.value)
                            }
                            tabIndex={3}
                        />
                        <InputError
                            message={errors.due_date}
                            className="mt-2"
                        />
                    </div>
                </div>
                {/* col 03 */}
                <div className="flex w-full flex-col">
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="name">Project Status</label>

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
                </div>
            </div>
            <div className="flex flex-col w-full ">
                <div className="flex w-full flex-col">
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="description">Project Description</label>

                        <textarea
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="textarea w-full"
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end mt-5">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={processing}
                >
                    {project ? "Update Project" : "Create Project"}
                </button>
            </div>
        </form>
    );
}

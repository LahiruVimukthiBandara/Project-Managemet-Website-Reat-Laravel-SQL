import Pagination from "@/Components/App/Pagination";
import { Link, router } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

export default function ProjectTable({ projects, admin }: any) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    const user = admin.is_admin;

    return (
        <div className="flex justify-end gap-3 p-3 bg-gray-800 rounded-lg">
            <div className="overflow-x-auto">
                <table className="table table-sm">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Project Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Stattus</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Created By</th>
                            <th>Updated By</th>
                            <th>Create Date</th>
                            <th>Update Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((pr: any) => (
                            <tr key={pr.id}>
                                <td>{pr.id}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 mask mask-squircle">
                                                <img
                                                    src={
                                                        imageUrl + pr.image_path
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Link
                                        className="hover:underline"
                                        href={route("project.show", pr.id)}
                                    >
                                        {pr.name}
                                    </Link>
                                </td>
                                <td>
                                    <span
                                        className={
                                            "badge text-xs badge-soft " +
                                            (pr.status === "completed"
                                                ? "badge-success "
                                                : pr.status === "pending"
                                                ? "badge-warning"
                                                : pr.status === "in_progress"
                                                ? "badge-error"
                                                : "badge-secondary")
                                        }
                                    >
                                        {pr.status}
                                    </span>
                                </td>
                                <td>
                                    {pr.description.length > 60
                                        ? pr.description.slice(0, 60) + "..."
                                        : pr.description}
                                </td>

                                <td className="text-nowrap">{pr.due_date}</td>
                                <td className="capitalize">
                                    {pr.createdBy.name}
                                </td>
                                <td className="capitalize">
                                    {pr.updatedBy.name}
                                </td>
                                <td>{pr.created_at}</td>
                                <td>{pr.updated_at}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            as="button"
                                            href={route("project.edit", pr.id)}
                                        >
                                            <CiEdit className="text-xl text-info" />
                                        </Link>
                                        {user === 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "Are you sure you want to delete this project? this will delete all the tasks as well"
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                "project.destroy",
                                                                pr.id
                                                            ),
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        console.log(
                                                                            "Project deleted successfully"
                                                                        );
                                                                    },
                                                                onError: (
                                                                    err
                                                                ) => {
                                                                    console.error(
                                                                        "Delete failed:",
                                                                        err
                                                                    );
                                                                },
                                                            }
                                                        );
                                                    }
                                                }}
                                            >
                                                <GoTrash className="text-xl text-error" />
                                            </button>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={11}>
                                <div className="flex justify-center w-full py-5 ">
                                    <Pagination links={projects.meta.links} />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

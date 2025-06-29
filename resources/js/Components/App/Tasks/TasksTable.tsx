import { Link, router, usePage } from "@inertiajs/react";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import Pagination from "../Pagination";

export default function TasksTable({ tasks, admin }: any) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    const user = admin.is_admin;

    return (
        <div className="p-3 bg-gray-800 rounded-lg">
            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Project</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Assigned User</th>
                            <th>Last Update</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map((tsk: any) => (
                            <tr key={tsk.id}>
                                <td>{tsk.id}</td>
                                <td>{tsk.project.name}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="flex items-center justify-center w-12 h-12 font-bold text-white uppercase bg-gray-700 mask mask-squircle">
                                                {tsk.image_path ? (
                                                    <img
                                                        src={
                                                            imageUrl +
                                                            tsk.image_path
                                                        }
                                                        alt={tsk.name}
                                                    />
                                                ) : (
                                                    tsk.name
                                                        ?.slice(0, 2)
                                                        .toUpperCase() || "NA"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{tsk.name}</td>
                                <td>
                                    <span
                                        className={
                                            "badge text-xs badge-soft " +
                                            (tsk.status === "completed"
                                                ? "badge-success "
                                                : tsk.status === "pending"
                                                ? "badge-warning"
                                                : tsk.status === "in_progress"
                                                ? "badge-info"
                                                : "badge-secondary")
                                        }
                                    >
                                        {tsk.status}
                                    </span>
                                </td>
                                <td>
                                    {tsk.description.length > 60
                                        ? tsk.description.slice(0, 60) + "..."
                                        : tsk.description}
                                </td>
                                <td className="text-nowrap">{tsk.due_date}</td>
                                <td>
                                    <span
                                        className={
                                            "badge text-xs badge-soft" +
                                            (tsk.priority === "low"
                                                ? " badge-success"
                                                : tsk.priority === "medium"
                                                ? " badge-warning"
                                                : tsk.priority === "high"
                                                ? " badge-error"
                                                : " badge-neutral")
                                        }
                                    >
                                        {tsk.priority}
                                    </span>
                                </td>
                                <td className="capitalize">
                                    {tsk.assignedUser?.name || "N/A"}
                                </td>
                                <td>{tsk.updated_at}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            as="button"
                                            href={route("task.edit", tsk.id)}
                                        >
                                            <CiEdit className="text-xl text-info" />
                                        </Link>
                                        {user === 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "Are you sure you want to delete this Task? "
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                "task.destroy",
                                                                tsk.id
                                                            ),
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        console.log(
                                                                            "Task deleted successfully"
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
                                    <Pagination links={tasks.meta.links} />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

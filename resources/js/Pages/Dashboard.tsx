import Pagination from "@/Components/App/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    myInprogressTasks,
    myCompletedTasks,
    myPendingTasks,
    tasks,
}: any) {
    const tsk = tasks.data.data || tasks.data;
    console.log(tasks);
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-5 ">
                    <div className="card bg-gray-800 rounded-lg p-5">
                        <div className="card-content text-2xl font-bold flex flex-col gap-3 ">
                            <h1 className="text-success">My Cpmlpeted Tasks</h1>
                            <h1>
                                <span>{myCompletedTasks}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="card bg-gray-800 rounded-lg p-5">
                        <div className="card-content text-2xl font-bold flex flex-col gap-3 ">
                            <h1 className="text-info">My In Progress Tasks</h1>
                            <h1>
                                <span>{myInprogressTasks}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="card bg-gray-800 rounded-lg p-5">
                        <div className="card-content text-2xl font-bold flex flex-col gap-3 ">
                            <h1 className="text-warning">My Pending Tasks</h1>
                            <h1>
                                <span>{myPendingTasks}</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-gray-800 gap-3 p-3 rounded-lg">
                    <h1 className="text-2xl capitalize font-bold">
                        my active tasks
                    </h1>
                    <div className="overflow-x-auto">
                        <table className="table table-md">
                            <thead>
                                <tr className="bg-gray-700 ">
                                    <th>Id</th>
                                    <th>Project Name</th>
                                    <th>Task Name</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tsk.map((ts: any) => (
                                    <tr>
                                        <td>{ts.id}</td>
                                        <td>
                                            <Link
                                                className="hover:underline"
                                                href={route(
                                                    "project.show",
                                                    ts.project.id
                                                )}
                                            >
                                                {ts.project.name}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                className="hover:underline"
                                                href={route("task.show", ts.id)}
                                            >
                                                {ts.name}
                                            </Link>
                                        </td>
                                        <th>
                                            <span
                                                className={
                                                    "badge text-xs badge-soft " +
                                                    (ts.status === "completed"
                                                        ? "badge-success"
                                                        : ts.status ===
                                                          "pending"
                                                        ? "badge-warning"
                                                        : ts.status ===
                                                          "in_progress"
                                                        ? "badge-error"
                                                        : "badge-secondary")
                                                }
                                            >
                                                {ts.status}
                                            </span>
                                        </th>
                                        <th>{ts.due_date}</th>
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <div className="flex justify-center w-full py-5 ">
                                            <Pagination
                                                links={tasks.meta.links}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

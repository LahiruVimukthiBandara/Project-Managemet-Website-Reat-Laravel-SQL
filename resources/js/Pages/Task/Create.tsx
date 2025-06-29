import TaskForm from "@/Components/App/Tasks/TaskForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Create({ task }: any) {
    return (
        <AuthenticatedLayout>
            <Head title="Create New Task" />
            <div className="flex flex-col gap-3">
                <div className="flex justify-between gap-3 p-3 bg-gray-800 rounded-lg">
                    <TaskForm task={task} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

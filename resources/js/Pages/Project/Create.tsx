import ProjectForm from "@/Components/App/Project/ProjectForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Create({ project }: any) {
    return (
        <AuthenticatedLayout>
            <Head title="Create New Project" />
            <div className="flex flex-col gap-3">
                <div className="flex justify-between gap-3 p-3 bg-gray-800 rounded-lg">
                    <ProjectForm project={project} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

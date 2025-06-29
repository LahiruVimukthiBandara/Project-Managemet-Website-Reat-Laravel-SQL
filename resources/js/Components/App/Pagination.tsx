import { router } from "@inertiajs/react";

interface PageLink {
    active: boolean;
    label: string;
    url: string | null;
}

interface PaginationProps {
    links: PageLink[] | null | undefined;
    preserveParams?: Record<string, any>;
}

function cleanLabel(label: string) {
    return label
        .replace(/&laquo;/g, "<<")
        .replace(/&raquo;/g, ">>")
        .replace(/&nbsp;/g, " ")
        .trim();
}

export default function Pagination({
    links,
    preserveParams = {},
}: PaginationProps) {
    if (!Array.isArray(links) || links.length === 0) {
        return null;
    }

    function handleClick(url: string) {
        router.get(url, preserveParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }

    return (
        <div className="flex flex-wrap items-center gap-1">
            {links.map((li, index) => {
                const cleanedLabel = cleanLabel(li.label);

                return li.url ? (
                    <button
                        key={index}
                        type="button"
                        className={`inline-flex items-center px-3 py-1 text-sm border rounded ${
                            li.active
                                ? "bg-primary text-white border-primary"
                                : "bg-gray-300 text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => handleClick(li.url!)}
                    >
                        {cleanedLabel}
                    </button>
                ) : (
                    <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 text-sm text-gray-500"
                    >
                        {cleanedLabel}
                    </span>
                );
            })}
        </div>
    );
}

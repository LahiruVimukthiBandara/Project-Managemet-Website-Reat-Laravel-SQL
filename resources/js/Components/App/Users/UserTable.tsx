import { Link } from "@inertiajs/react";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import Pagination from "../Pagination";

export default function UserTable({ users, user }: any) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    const admin = user.is_admin;

    return (
        <div className="p-3 bg-gray-800 rounded-lg">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Avatar</th>
                            <th>User Name</th>
                            <th>Email</th>
                            {admin === 1 && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="flex items-center justify-center w-12 h-12 font-bold text-white uppercase bg-gray-700 mask mask-squircle">
                                                {user.avatar ? (
                                                    <img
                                                        src={
                                                            imageUrl +
                                                            user.avatar
                                                        }
                                                        alt={user.name}
                                                    />
                                                ) : (
                                                    user.name
                                                        ?.slice(0, 2)
                                                        .toUpperCase() || "NA"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="capitalize">{user.name}</td>

                                <td>{user.email}</td>
                                <td>
                                    {admin === 1 && (
                                        <div className="flex items-center gap-2">
                                            <Link
                                                as="button"
                                                href={route(
                                                    "user.edit",
                                                    user.id
                                                )}
                                            >
                                                <CiEdit className="text-xl text-info" />
                                            </Link>
                                            <Link
                                                as="button"
                                                href={route(
                                                    "user.destroy",
                                                    user.id
                                                )}
                                            >
                                                <GoTrash className="text-xl text-error" />
                                            </Link>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={11}>
                                <div className="flex justify-center w-full py-5 ">
                                    <Pagination links={users.meta.links} />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

import { useState, useCallback } from "react";
import type { IQueryParams } from "../../../interfaces/admin.interface";
import type { IUser } from "../../../interfaces/user.interface";
import DeleteModal from "../../../components/form/DeleteModal";
import type { IColumn } from "../../../components/table/Table";
import CustomTable from "../../../components/table/Table";
import {useGetAllSupervisorsQuery } from "../../../redux/features/admin/adminApi";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../../../components/ui/button";

const SupervisorsManagement = () => {
    const [queryParams, setQueryParams] = useState<IQueryParams[]>([]);
    const { data, isLoading, refetch } = useGetAllSupervisorsQuery(queryParams);

    const supervisors = (data?.data as unknown as IUser[]) || [];
    const meta = data?.meta as
        | { page: number; limit: number; total: number; totalPage: number }
        | undefined;

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSupervisors, setSelectedSupervisors] = useState<IUser | null>(null);

    const columns: IColumn[] = [
        {
            title: "Join At",
            key: "createdAt",
        },
        {
            title: "Full name",
            key: "name",
        },
        {
            title: "Email",
            key: "email",
        },
        {
            title: "Role",
            key: "role",
        },
        {
            title: "Status",
            key: "status",
            filterable: true,
            filterOptions: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "banned", label: "Banned" },
            ],
        },
        {
            title: "Verified",
            key: "isVerified",
            filterable: true,
            filterOptions: [
                { value: "true", label: "Verified" },
                { value: "false", label: "Not Verified" },
            ],
        },
    ];

    const handleSearch = useCallback((searchTerm: string) => {
        setQueryParams((prev) => {
            const filteredParams = prev.filter((param) => param.name !== "searchTerm");
            return searchTerm
                ? [...filteredParams, { name: "searchTerm", value: searchTerm }]
                : filteredParams;
        });
    }, []);

    const handleFilter = useCallback((filters: Record<string, string>) => {
        setQueryParams((prev) => {
            let newParams = prev.filter(
                (param) =>
                    !Object.keys(filters).includes(param.name) &&
                    param.name !== "searchTerm" &&
                    param.name !== "page" &&
                    param.name !== "limit" &&
                    param.name !== "sort"
            );

            ["searchTerm", "page", "limit", "sort"].forEach((name) => {
                const param = prev.find((p) => p.name === name);
                if (param) newParams.push(param);
            });

            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    newParams.push({ name: key, value });
                }
            });

            return newParams;
        });
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setQueryParams((prev) => {
            const filteredParams = prev.filter((param) => param.name !== "page");
            return [...filteredParams, { name: "page", value: page.toString() }];
        });
    }, []);

    const handleLimitChange = useCallback((limit: number) => {
        setQueryParams((prev) => {
            const filteredParams = prev.filter(
                (param) => param.name !== "limit" && param.name !== "page"
            );
            return [
                ...filteredParams,
                { name: "limit", value: limit.toString() },
                { name: "page", value: "1" },
            ];
        });
    }, []);

    const handleSort = useCallback((sortOrder: "asc" | "desc") => {
        setQueryParams((prev) => {
            const filteredParams = prev.filter((param) => param.name !== "sort");
            return [
                ...filteredParams,
                { name: "sort", value: sortOrder },
            ];
        });
    }, []);

    const handleDeleteClick = (Supervisors: IUser) => {
        setSelectedSupervisors(Supervisors);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("Deleted Supervisors:", selectedSupervisors);
        setDeleteModalOpen(false);
        refetch();
    };

    return (
        <section className="p-6">
            {/* <Breadcrumbs breadcrumbs={["dashboard", "Supervisorss"]} /> */}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                    Supervisors Management
                </h2>
            </div>

            <CustomTable
                columns={columns}
                data={supervisors}
                meta={meta}
                isLoading={isLoading}
                onSearch={handleSearch}
                onFilter={handleFilter}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onSort={handleSort} 
                actions={(Supervisors) => (
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                            <a href={`/dashboard/edit-Supervisors/${Supervisors.email}`}>
                                <Pencil1Icon className="w-4 h-4 mr-1" />
                                Edit
                            </a>
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(Supervisors as IUser)}
                        >
                            <TrashIcon className="w-4 h-4 mr-1" />
                            Delete
                        </Button>
                    </div>
                )}
            />

            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectedSupervisors?.name}
            />
        </section>
    );
};

export default SupervisorsManagement;
import { useState } from "react";
import { useGetAllAdminsQuery, useGetAllStudentsQuery, useGetAllSupervisorsQuery } from "../../../redux/features/admin/adminApi";
import type { IQueryParams } from "../../../interfaces/admin.interface";
import type { IUser } from "../../../interfaces/user.interface";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import DeleteModal from "../../../components/ui/DeleteModal";
import type { IColumn } from "../../../components/table/Table";
import { Button } from "@radix-ui/themes";
import CustomTable from "../../../components/table/Table";


const SupervisorManagement = () => {
    const [queryParams, setQueryParams] = useState<IQueryParams[]>([]);
    const { data, isLoading, refetch } = useGetAllSupervisorsQuery(queryParams);
    console.log(data)

    const students = (data?.data as unknown as IUser[]) || [];
    const meta = (data?.meta as { page: number; limit: number; total: number; totalPage: number } | undefined);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<IUser | null>(null);

    const columns: IColumn[] = [
        { title: "Full name", key: "name" },
        { title: "Email", key: "email" },
        { title: "Role", key: "role" },
        {
            title: "Status",
            key: "status",
            filterable: true,
            filterOptions: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "banned", label: "Banned" }
            ]
        },
        {
            title: "Verified",
            key: "isVerified",
            filterable: true,
            filterOptions: [
                { value: "true", label: "Verified" },
                { value: "false", label: "Not Verified" }
            ]
        },
    ];

    const handleSearch = (searchTerm: string) => {
        const newParams: IQueryParams[] = [];
        if (searchTerm) {
            newParams.push({ name: "searchTerm", value: searchTerm });
        }
        // Keep existing filters
        queryParams
            .filter(param => param.name !== "searchTerm")
            .forEach(param => newParams.push(param));

        setQueryParams(newParams);
    };

    const handleFilter = (filters: Record<string, string>) => {
        const newParams: IQueryParams[] = [];

        // Add search term if exists
        const searchParam = queryParams.find(param => param.name === "searchTerm");
        if (searchParam) {
            newParams.push(searchParam);
        }

        // Add filters (only non-empty values)
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                newParams.push({ name: key, value });
            }
        });

        setQueryParams(newParams);
    };

    const handlePageChange = (page: number) => {
        const newParams = queryParams.filter(param => param.name !== "page");
        newParams.push({ name: "page", value: page.toString() });
        setQueryParams(newParams);
    };

    const handleLimitChange = (limit: number) => {
        const newParams = queryParams.filter(param => param.name !== "limit");
        newParams.push({ name: "limit", value: limit.toString() });
        setQueryParams(newParams);
    };

    const handleDeleteClick = (admin: IUser) => {
        setSelectedAdmin(admin);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        // TODO: Add API call to delete student
        console.log("Deleted student:", selectedAdmin);
        setDeleteModalOpen(false);
        refetch(); // Refresh the data
    };

    return (
        <section className="p-6">
            <Breadcrumbs breadcrumbs={["dashboard", "supervisors"]} />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary-800">Supervisor Management</h2>
                <Button asChild>
                    <a href="/dashboard/new-student">New Supervisor</a>
                </Button>
            </div>

            <CustomTable
                columns={columns}
                data={students}
                meta={meta}
                isLoading={isLoading}
                onSearch={handleSearch}
                onFilter={handleFilter}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                actions={(student) => (
                    <div className="flex gap-2">
                        <Button size="2" asChild>
                            <a href={`/dashboard/edit-student/${student.email}`}>Edit</a>
                        </Button>
                        <Button
                            variant="classic"
                            size="2"
                            onClick={() => handleDeleteClick(student as IUser)}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            />

            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectedAdmin?.name}
            />
        </section>
    );
};

export default SupervisorManagement;
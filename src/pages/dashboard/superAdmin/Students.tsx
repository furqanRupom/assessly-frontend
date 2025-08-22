import { useState, useCallback } from "react";
import type { IQueryParams } from "../../../interfaces/admin.interface";
import type { IUser } from "../../../interfaces/user.interface";
import DeleteModal from "../../../components/form/DeleteModal";
import type { IColumn } from "../../../components/table/Table";
import CustomTable from "../../../components/table/Table";
import { useDeleteUserMutation, useGetAllStudentsQuery } from "../../../redux/features/admin/adminApi";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";

const StudentManagement = () => {
  const [queryParams, setQueryParams] = useState<IQueryParams[]>([]);
  const { data, isLoading, refetch } = useGetAllStudentsQuery(queryParams);

  const students = (data?.data as unknown as IUser[]) || [];
  const meta = data?.meta as
    | { page: number; limit: number; total: number; totalPage: number }
    | undefined;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IUser | null>(null);
  const [deleteUser,{isLoading:isDeleteLoading}] = useDeleteUserMutation() // we have to put id here

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
      // Remove existing filters
      let newParams = prev.filter(
        (param) =>
          !Object.keys(filters).includes(param.name) &&
          param.name !== "searchTerm" &&
          param.name !== "page" &&
          param.name !== "limit" &&
          param.name !== "sort"
      );

      // Add back non-filter params
      ["searchTerm", "page", "limit", "sort"].forEach((name) => {
        const param = prev.find((p) => p.name === name);
        if (param) newParams.push(param);
      });

      // Add new filters
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

  // Updated to only accept sortOrder parameter
  const handleSort = useCallback((sortOrder: "asc" | "desc") => {
    setQueryParams((prev) => {
      const filteredParams = prev.filter((param) => param.name !== "sort");
      return [
        ...filteredParams,
        { name: "sort", value: sortOrder },
      ];
    });
  }, []);

  const handleDeleteClick = (student: IUser) => {
    setSelectedStudent(student);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStudent?._id) return;

    try {
      await deleteUser(selectedStudent._id).unwrap();
      toast.success('Student successfully deleted.')
      setDeleteModalOpen(false);
      setSelectedStudent(null);
      refetch(); 
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  return (
    <section className="p-3">
      {/* <Breadcrumbs breadcrumbs={["dashboard", "students"]} /> */}

      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-semibold text-foreground">
          Student Management
        </h2>
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
        onSort={handleSort} // Now only passes sortOrder, not sortBy
        actions={(student) => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild className="cursor-pointer">
              <a href={`/dashboard/edit-student/${student.email}`}>
                <Pencil1Icon className="w-4 h-4 mr-1" />
                Edit
              </a>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDeleteClick(student as IUser)}
              className="cursor-pointer"
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
        itemName={selectedStudent?.name}
        loading={isDeleteLoading}
      />
    </section>
  );
};

export default StudentManagement;
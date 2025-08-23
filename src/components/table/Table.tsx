import * as React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface IColumn {
    title: string;
    key: string;
    filterable?: boolean;
    filterOptions?: { value: string; label: string }[];
}

interface ICustomTableProps<T> {
    columns: IColumn[];
    data: T[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    actions?: (row: T) => React.ReactNode;
    onSearch?: (searchTerm: string) => void;
    onFilter?: (filters: Record<string, string>) => void;
    onPageChange?: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    onSort?: (sortOrder: "asc" | "desc") => void;
    isLoading?: boolean;
}

const CustomTable = <T extends Record<string, any>>({
    columns,
    data,
    meta,
    actions,
    onSearch,
    onFilter,
    onPageChange,
    onLimitChange,
    onSort,
    isLoading = false,
}: ICustomTableProps<T>) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filters, setFilters] = React.useState<Record<string, string>>({});
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");

    // Handle search with debounce
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (onSearch) {
                onSearch(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch]);

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (onFilter) {
            onFilter(newFilters);
        }
    };

    const handleSort = () => {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);
        if (onSort) {
            onSort(newDirection);
        }
    };

    const currentPage = meta?.page || 1;

    return (
        <div className="space-y-6 p-4  rounded-lg ">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-50 border-primary-200 focus:border-primary-400"
                        />
                    </div>

                    {/* Filters and Sort */}
                    <div className="flex gap-3 flex-wrap items-center">
                        {/* Filters */}
                        {columns
                            .filter((col) => col.filterable && col.filterOptions)
                            .map((col) => (
                                <Select
                                    key={col.key}
                                    value={filters[col.key] || "all"}
                                    onValueChange={(value) =>
                                        handleFilterChange(col.key, value === "all" ? "" : value)
                                    }
                                >
                                    <SelectTrigger className="w-[180px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                                        <SelectValue placeholder={`Filter by ${col.title}`} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                                        <SelectItem value="all">All {col.title}</SelectItem>
                                        {col.filterOptions?.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ))}

                        {/* Sort Button */}
                        <Button
                            variant="outline"
                            onClick={handleSort}
                            className="ml-auto flex items-center gap-2 cursor-pointer"
                        >
                            <span>Sort: {sortDirection === "asc" ? "Oldest First" : "Newest First"}</span>
                            {sortDirection === "asc" ? "↑" : "↓"}
                        </Button>
                        
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-primary-600 to-primary-700 hover:bg-primary-700">
                            {columns.map((col) => (
                                <TableHead
                                    key={col.key}
                                    className="text-white font-semibold py-4 text-sm uppercase h-12"
                                >
                                    {col.title}
                                </TableHead>
                            ))}
                            {actions && (
                                <TableHead className="text-white font-semibold py-4 text-sm uppercase h-12">
                                    Actions
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            // Loading state
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="h-24 text-center"
                                >
                                    <div className="flex items-center justify-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data.length ===   0 ? (
                            // Empty state
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="h-24 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3 py-8">
                                        <div className="text-primary-400">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-16 w-16"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-lg font-medium text-gray-500">
                                            No data found
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Try adjusting your search or filter to find what you're
                                            looking for.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Data rows
                            data.map((row, idx) => (
                                <TableRow
                                    key={idx}
                                    className={`transition-colors ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-primary-50`}
                                >
                                    {columns.map((col) => (
                                        <TableCell key={col.key} className="py-3 text-gray-700">
                                            {typeof row[col.key] === "boolean" ? (
                                                row[col.key] ? (
                                                    <Badge variant="secondary">Yes</Badge>
                                                ) : (
                                                    <Badge variant="destructive">No</Badge>
                                                )
                                            ) : (
                                                row[col.key]
                                            )}
                                        </TableCell>
                                    ))}
                                    {actions && (
                                        <TableCell className="py-3">
                                            <div className="flex gap-2">{actions(row)}</div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {meta && meta.totalPage > 1 && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <p className="text-sm text-gray-600">
                                Showing{" "}
                                <span className="font-semibold text-primary-600">
                                    {((currentPage - 1) * meta.limit) + 1}
                                </span>{" "}
                                to{" "}
                                <span className="font-semibold text-primary-600">
                                    {Math.min(currentPage * meta.limit, meta.total)}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-primary-600">
                                    {meta.total}
                                </span>{" "}
                                results
                            </p>

                            <Select
                                value={meta.limit.toString()}
                                onValueChange={(value) =>
                                    onLimitChange && onLimitChange(Number(value))
                                }
                            >
                                <SelectTrigger className="w-[120px] bg-white border-gray-300">
                                    <SelectValue placeholder="Per page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10 per page</SelectItem>
                                    <SelectItem value="25">25 per page</SelectItem>
                                    <SelectItem value="50">50 per page</SelectItem>
                                    <SelectItem value="100">100 per page</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-1 items-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange && onPageChange(1)}
                                disabled={currentPage === 1}
                            >
                                <DoubleArrowLeftIcon />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    onPageChange && onPageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            >
                                <ChevronLeftIcon />
                            </Button>

                            <div className="flex gap-1 items-center">
                                {Array.from(
                                    { length: Math.min(5, meta.totalPage) },
                                    (_, i) => {
                                        const pageNum =
                                            Math.max(
                                                1,
                                                Math.min(currentPage - 2, meta.totalPage - 4)
                                            ) + i;
                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={currentPage === pageNum ? "default" : "outline"}
                                                size="sm"
                                                onClick={() =>
                                                    onPageChange && onPageChange(pageNum)
                                                }
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    }
                                )}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    onPageChange && onPageChange(currentPage + 1)
                                }
                                disabled={currentPage === meta.totalPage}
                            >
                                <ChevronRightIcon />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    onPageChange && onPageChange(meta.totalPage)
                                }
                                disabled={currentPage === meta.totalPage}
                            >
                                <DoubleArrowRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomTable;
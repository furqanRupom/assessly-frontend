import * as React from "react";
import { Button, Table, TextField, Select, Flex, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

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
    isLoading = false,
}: ICustomTableProps<T>) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filters, setFilters] = React.useState<Record<string, string>>({});
    const [localPage, setLocalPage] = React.useState(1);

    // Handle search with debounce
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (onSearch) {
                onSearch(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch]);

    // Handle filter changes
    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (onFilter) {
            onFilter(newFilters);
        }
    };

    // Handle page changes
    const handlePageChange = (page: number) => {
        setLocalPage(page);
        if (onPageChange) {
            onPageChange(page);
        }
    };

    // Handle limit changes
    const handleLimitChange = (value: string) => {
        const limit = Number(value);
        if (onLimitChange) {
            onLimitChange(limit);
        }
    };

    const currentPage = meta?.page || localPage;

    return (
        <div className="space-y-4">
            {/* Search and Filters */}
            <Flex gap="3" direction="column">
                {/* Search Input */}
                <TextField.Root
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="2"
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>

                {/* Filters */}
                <Flex gap="2" wrap="wrap">
                    {columns
                        .filter((col) => col.filterable && col.filterOptions)
                        .map((col) => (
                            <Select.Root
                                key={col.key}
                                value={filters[col.key] || "all"}
                                onValueChange={(value) => handleFilterChange(col.key, value === "all" ? "" : value)}
                                size="1"
                            >
                                <Select.Trigger placeholder={`Filter by ${col.title}`} />
                                <Select.Content>
                                    <Select.Item value="all">All {col.title}</Select.Item>
                                    {col.filterOptions?.map((option) => (
                                        <Select.Item key={option.value} value={option.value}>
                                            {option.label}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        ))}
                </Flex>
            </Flex>

            {/* Table */}
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        {columns.map((col) => (
                            <Table.ColumnHeaderCell key={col.key}>
                                {col.title}
                            </Table.ColumnHeaderCell>
                        ))}
                        {actions && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {isLoading ? (
                        // Loading state
                        <Table.Row>
                            <Table.Cell colSpan={columns.length + (actions ? 1 : 0)}>
                                <Flex align="center" justify="center" py="4">
                                    <Text>Loading...</Text>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ) : data.length === 0 ? (
                        // Empty state
                        <Table.Row>
                            <Table.Cell colSpan={columns.length + (actions ? 1 : 0)}>
                                <Flex align="center" justify="center" py="4">
                                    <Text color="gray">No data found</Text>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        // Data rows
                        data.map((row, idx) => (
                            <Table.Row key={idx}>
                                {columns.map((col) => (
                                    <Table.Cell key={col.key}>
                                        {typeof row[col.key] === "boolean"
                                            ? row[col.key] ? "Yes" : "No"
                                            : row[col.key]}
                                    </Table.Cell>
                                ))}
                                {actions && <Table.Cell>{actions(row)}</Table.Cell>}
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table.Root>

            {/* Pagination */}
            {meta && meta.totalPage > 1 && (
                <Flex align="center" justify="between" gap="3">
                    <Flex align="center" gap="2">
                        <Text size="1" color="gray">
                            Showing {((currentPage - 1) * meta.limit) + 1} to{" "}
                            {Math.min(currentPage * meta.limit, meta.total)} of {meta.total} results
                        </Text>

                        <Select.Root
                            value={meta.limit.toString()}
                            onValueChange={handleLimitChange}
                            size="1"
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Item value="10">10 per page</Select.Item>
                                <Select.Item value="25">25 per page</Select.Item>
                                <Select.Item value="50">50 per page</Select.Item>
                                <Select.Item value="100">100 per page</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </Flex>

                    <Flex gap="1">
                        <Button
                            variant="soft"
                            size="1"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        >
                            <DoubleArrowLeftIcon />
                        </Button>

                        <Button
                            variant="soft"
                            size="1"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        

                        <Flex gap="1" align="center">
                            {Array.from({ length: Math.min(5, meta.totalPage) }, (_, i) => {
                                const pageNum = Math.max(1, Math.min(currentPage - 2, meta.totalPage - 4)) + i;
                                return (
                                    <Button
                                        key={pageNum}
                                        variant={currentPage === pageNum ? "solid" : "soft"}
                                        size="1"
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </Flex>

                        <Button
                            variant="soft"
                            size="1"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === meta.totalPage}
                        >
                            <ChevronRightIcon />
                        </Button>

                        <Button
                            variant="soft"
                            size="1"
                            onClick={() => handlePageChange(meta.totalPage)}
                            disabled={currentPage === meta.totalPage}
                        >
                            <DoubleArrowRightIcon />
                        </Button>
                    </Flex>
                </Flex>
            )}
        </div>
    );
};

export default CustomTable;
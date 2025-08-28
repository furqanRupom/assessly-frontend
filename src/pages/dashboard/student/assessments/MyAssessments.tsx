import * as React from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useGetAssessmentHistoryQuery } from '@/redux/features/student/studentApi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  BarChart3,
  Calendar,
  Download,
  Loader2,
  Trophy,
  FileCheck
} from 'lucide-react';

interface AssessmentItem {
  _id: string;
  certifiedLevel: string;
  percentage: number;
  score: number;
  timeSpent: number;
  totalQuestions: number;
  correctAnswer: number;
  createdAt: string;
}

interface IMyAssessmentsProps { }

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
type Level = typeof LEVELS[number];

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Format time spent from seconds to human readable format
const formatTimeSpent = (seconds: number): string => {
  const safeSeconds = isNaN(seconds) || seconds < 0 ? 0 : Math.floor(seconds);

  if (safeSeconds < 60) {
    return `${safeSeconds}s`;
  }

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}m`
    : `${hours}h`;
};

// Get badge color based on percentage
const getPercentageColor = (percentage: number): string => {
  if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
  if (percentage >= 75) return 'bg-primary-100 text-primary-800 border-primary-200 hover:bg-primary-200';
  if (percentage >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
};

// Get badge color based on level
const getLevelColor = (level: string): string => {
  const levelColors: Record<string, string> = {
    A1: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
    A2: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
    B1: 'bg-primary-100 text-primary-800 border-primary-200 hover:bg-primary-200',
    B2: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    C1: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
    C2: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
  };
  return levelColors[level] || 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
};

const MyAssessments: React.FC<IMyAssessmentsProps> = () => {
  const { data: assessmentHistoryData, isLoading } = useGetAssessmentHistoryQuery({});
  const [search, setSearch] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<Level | ''>('');
  const [page, setPage] = useState<number>(1);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  const itemsPerPage = 8;

  // Debounced search value
  const debouncedSearch = useDebounce(search, 300);

  // Reset page when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterLevel]);

  const handleDownloadPdf = useCallback(async (assessmentId: string) => {
    try {
      setDownloadingIds(prev => new Set(prev).add(assessmentId));

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/student/generate-certificate/${assessmentId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${assessmentId.slice(-8)}.pdf`;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (err) {
      console.error('Failed to download PDF:', err);
      // You might want to show a toast notification here
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(assessmentId);
        return newSet;
      });
    }
  }, []);

  const filteredData = useMemo<AssessmentItem[]>(() => {
    if (!assessmentHistoryData?.data) return [];

    let data: AssessmentItem[] = [...assessmentHistoryData.data];

    // Apply search filter
    if (debouncedSearch.trim()) {
      const searchTerm = debouncedSearch.toLowerCase().trim();
      data = data.filter(item => {
        const id = item._id?.toLowerCase() || '';
        const level = item.certifiedLevel?.toLowerCase() || '';
        const shortId = id.slice(-8);

        return (
          id.includes(searchTerm) ||
          shortId.includes(searchTerm) ||
          level.includes(searchTerm)
        );
      });
    }

    // Apply level filter
    if (filterLevel) {
      data = data.filter(item => item.certifiedLevel === filterLevel);
    }

    // Sort by creation date (newest first)
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [assessmentHistoryData?.data, debouncedSearch, filterLevel]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    return filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [filteredData, page, itemsPerPage]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!filteredData.length) return null;

    const totalAssessments = filteredData.length;
    const averageScore = filteredData.reduce((sum, item) => sum + (item.score || item.percentage || 0), 0) / totalAssessments;
    const totalTimeSpent = filteredData.reduce((sum, item) => {
      const time = isNaN(item.timeSpent) ? 0 : item.timeSpent;
      return sum + time;
    }, 0);
    const levelsTaken = new Set(filteredData.map(item => item.certifiedLevel)).size;
    const passedAssessments = filteredData.filter(item => (item.score || item.percentage || 0) >= 75).length;

    return {
      totalAssessments,
      averageScore: Math.round(averageScore * 100) / 100,
      totalTimeSpent: formatTimeSpent(totalTimeSpent),
      levelsTaken,
      passedAssessments
    };
  }, [filteredData]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setFilterLevel('');
    setPage(1);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary-600" />
            My Assessments
          </h1>
          <p className="text-gray-600 mt-1">Track your learning progress and assessment history</p>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <AnimatePresence mode="wait">
        {stats && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                <BarChart3 className="h-4 w-4 text-primary-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-800">{stats.totalAssessments}</div>
                <p className="text-xs text-primary-600">All time assessments</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">{stats.averageScore}%</div>
                <p className="text-xs text-green-600">Overall performance</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
                <Clock className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-800">{stats.totalTimeSpent}</div>
                <p className="text-xs text-purple-600">Total learning time</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates Available</CardTitle>
                <FileCheck className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-800">{stats.passedAssessments}</div>
                <p className="text-xs text-orange-600">Passed assessments (≥75%)</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Assessments
            </CardTitle>
            <CardDescription>Find specific assessments by search or filter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ID or Level..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10 transition-all focus:ring-2 focus:ring-primary-500"
                />
                {debouncedSearch !== search && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>

              <Select
                value={filterLevel}
                onValueChange={value => setFilterLevel(value === 'all' ? '' : (value as Level))}
              >
                <SelectTrigger className="w-full sm:w-40 transition-all focus:ring-2 focus:ring-primary-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {LEVELS.map(level => (
                    <SelectItem key={level} value={level}>
                      Level {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="whitespace-nowrap hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Assessment History
            </CardTitle>
            <CardDescription>
              {filteredData.length} assessment{filteredData.length !== 1 ? 's' : ''} found
              {filterLevel && ` for level ${filterLevel}`}
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-50">
                    <TableHead className="whitespace-nowrap">Assessment ID</TableHead>
                    <TableHead className="whitespace-nowrap">Level</TableHead>
                    <TableHead className="whitespace-nowrap">Score</TableHead>
                    <TableHead className="whitespace-nowrap">Details</TableHead>
                    <TableHead className="whitespace-nowrap">Time Spent</TableHead>
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {paginatedData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-3"
                          >
                            <div className="p-4 bg-gray-100 rounded-full">
                              <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-medium text-gray-900">No assessments found</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Try adjusting your search terms or filters
                              </p>
                            </div>
                            {(debouncedSearch || filterLevel) && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="mt-2"
                              >
                                Clear all filters
                              </Button>
                            )}
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedData.map((item: AssessmentItem, index) => {
                        const score = item.score || item.percentage || 0;
                        const canDownload = score >= 75;
                        const isDownloading = downloadingIds.has(item._id);

                        return (
                          <motion.tr
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                          >
                            <TableCell className="font-mono text-sm text-gray-600">
                              #{item._id ? item._id.slice(-8) : 'unknown'}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${getLevelColor(item.certifiedLevel)} transition-colors`}
                              >
                                {item.certifiedLevel}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-16 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(score, 100)}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="bg-primary-600 h-2.5 rounded-full"
                                  />
                                </div>
                                <Badge className={`${getPercentageColor(score)} transition-colors font-medium`}>
                                  {score.toFixed(1)}%
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              <span className="inline-flex items-center gap-1">
                                <span className="font-medium">
                                  {Math.round(item.correctAnswer || 0)}
                                </span>
                                <span className="text-gray-400">/</span>
                                <span>{item.totalQuestions}</span>
                                <span className="text-gray-400">correct</span>
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="font-mono">
                                  {formatTimeSpent(isNaN(item.timeSpent) ? 0 : item.timeSpent)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>
                                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant={canDownload ? "default" : "outline"}
                                disabled={!canDownload || isDownloading}
                                onClick={() => handleDownloadPdf(item._id)}
                                className={`transition-all w-full ${canDownload
                                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
                                    : 'text-gray-400 cursor-not-allowed'
                                  }`}
                              >
                                {isDownloading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Download className="h-4 w-4" />
                                )}
                                <span className="ml-2 hidden sm:inline">
                                  {canDownload ? 'Certificate' : 'Not Available'}
                                </span>
                              </Button>
                            </TableCell>
                          </motion.tr>
                        );
                      })
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200 gap-4"
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span>
                    {filteredData.length} item{filteredData.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MyAssessments;
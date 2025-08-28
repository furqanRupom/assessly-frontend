import * as React from 'react';
import { useState, useMemo } from 'react';
import { useGetAssessmentHistoryQuery } from '@/redux/features/student/studentApi';
import { motion } from 'framer-motion';
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
import { Search, Filter, ChevronLeft, ChevronRight, Clock, BarChart3, Calendar } from 'lucide-react';

interface AssessmentItem {
  _id: string;
  certifiedLevel: string;
  percentage: number;
  score: number;
  timeSpent: number;
  totalQuestions: number;
  correctAnswer: number
  createdAt: string;
}

interface IMyAssessmentsProps { }

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
type Level = typeof LEVELS[number];

// Format time spent from seconds to human readable format
const formatTimeSpent = (seconds: number): string => {
  // Fix for NaN/undefined values - default to 0
  const safeSeconds = isNaN(seconds) ? 0 : seconds;

  if (safeSeconds < 60) {
    return `${safeSeconds}s`;
  }

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
};

// Get badge color based on percentage
const getPercentageColor = (percentage: number): string => {
  if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200';
  if (percentage >= 70) return 'bg-primary-100 text-primary-800 border-primary-200';
  if (percentage >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

// Get badge color based on level
const getLevelColor = (level: string): string => {
  const levelColors: Record<string, string> = {
    A1: 'bg-purple-100 text-purple-800 border-purple-200',
    A2: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    B1: 'bg-primary-100 text-primary-800 border-primary-200',
    B2: 'bg-green-100 text-green-800 border-green-200',
    C1: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    C2: 'bg-orange-100 text-orange-800 border-orange-200',
  };
  return levelColors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const MyAssessments: React.FC<IMyAssessmentsProps> = () => {
  const { data: assessmentHistoryData, isLoading } = useGetAssessmentHistoryQuery({});
  const [search, setSearch] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<Level | ''>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  const filteredData = useMemo<AssessmentItem[]>(() => {
    if (!assessmentHistoryData?.data) return [];
    let data: AssessmentItem[] = assessmentHistoryData.data;

    // Searching by _id or certifiedLevel
    if (search) {
      data = data.filter(
        item =>
          item._id.toLowerCase().includes(search.toLowerCase()) ||
          item.certifiedLevel.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by certifiedLevel
    if (filterLevel) {
      data = data.filter(item => item.certifiedLevel === filterLevel);
    }

    return data;
  }, [assessmentHistoryData?.data, search, filterLevel]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!filteredData.length) return null;

    const totalAssessments = filteredData.length;
    const averageScore = filteredData.reduce((sum, item) => sum + item.percentage, 0) / totalAssessments;

    // Fix for totalTimeSpent - ensure we're working with valid numbers
    const totalTimeSpent = filteredData.reduce((sum, item) => {
      const time = isNaN(item.timeSpent) ? 0 : item.timeSpent;
      return sum + time;
    }, 0);

    const levelsTaken = new Set(filteredData.map(item => item.certifiedLevel)).size;

    return {
      totalAssessments,
      averageScore: Math.round(averageScore * 100) / 100,
      totalTimeSpent: formatTimeSpent(totalTimeSpent),
      levelsTaken
    };
  }, [filteredData]);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Assessments</h1>
          <p className="text-gray-600 mt-1">Track your learning progress and assessment history</p>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-800">{stats.totalAssessments}</div>
              <p className="text-xs text-primary-600">All time assessments</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.averageScore}%</div>
              <p className="text-xs text-green-600">Overall performance</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.totalTimeSpent}</div>
              <p className="text-xs text-purple-600">Total learning time</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Levels Completed</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.levelsTaken}</div>
              <p className="text-xs text-orange-600">Different levels attempted</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Assessments</CardTitle>
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
                className="pl-10"
              />
            </div>

            <Select value={filterLevel} onValueChange={value => setFilterLevel(value === 'all' ? '' : (value as Level))}>
              <SelectTrigger className="w-40">
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
              onClick={() => {
                setSearch('');
                setFilterLevel('');
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
          <CardDescription>
            {filteredData.length} assessment{filteredData.length !== 1 ? 's' : ''} found
            {filterLevel && ` for level ${filterLevel}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment ID</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Time Spent</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-12 w-12 text-gray-300" />
                        <p>No assessments found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item: AssessmentItem) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      // whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.8)' }}
                      className="border-b border-gray-100"
                    >
                      <TableCell className="font-mono text-sm text-gray-600">
                        {/* Fix: Ensure we have a valid ID and show more characters */}
                        #{item._id ? item._id.slice(-8) : 'unknown'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getLevelColor(item.certifiedLevel)}>
                          {item.certifiedLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <Badge className={getPercentageColor(item.score)}>
                            {item.score.toFixed(1)}%
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {/* Fix: Round the score to whole number */}
                        {Math.round(item.correctAnswer)}/{item.totalQuestions} correct
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {/* Fix: Handle NaN/undefined timeSpent */}
                          {formatTimeSpent(isNaN(item.timeSpent) ? 0 : item.timeSpent)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Page {page} of {totalPages}</span>
                  <span className="text-gray-400">•</span>
                  <span>{filteredData.length} items</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAssessments;
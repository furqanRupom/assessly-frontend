import * as React from "react";
import { motion } from "framer-motion";
import {
  useGetCompetencyBreakdownQuery,
  useGetCompetencyPerformanceQuery,
  useGetDailyActivityQuery,
  useGetScoreProgressQuery,
  useGetStudyRecommendationsQuery,
} from "@/redux/features/student/studentApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  Target,
  Calendar,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";


// Custom tooltip for better data display
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}${entry.dataKey.includes('accuracy') || entry.dataKey.includes('Percentage') ? '%' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Performance indicator component
const PerformanceIndicator: React.FC<{
  value: number;
  label: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}> = ({ value, label, icon, trend, trendValue }) => (
  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}%</p>
      </div>
    </div>
    {trend && trendValue && (
      <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
        }`}>
        {trend === 'up' ? <TrendingUp className="h-4 w-4" /> :
          trend === 'down' ? <TrendingDown className="h-4 w-4" /> : null}
        <span className="text-sm font-medium">{trendValue}%</span>
      </div>
    )}
  </div>
);

const StudentDashboard: React.FC = () => {
  const { data: competencyBreakdownData, isLoading: loadingBreakdown } = useGetCompetencyBreakdownQuery({});
  const { data: scoreProgressData, isLoading: loadingProgress } = useGetScoreProgressQuery({});
  const { data: competencyPerformanceData, isLoading: loadingPerformance } = useGetCompetencyPerformanceQuery({});
  const { data: studyRecommendationsData, isLoading: loadingRecommendations } = useGetStudyRecommendationsQuery({});
  const { data: dailyActivityData, isLoading: loadingActivity } = useGetDailyActivityQuery({});
  const {data:profile} = useGetUserProfileQuery({})
  const profileData = profile?.data
  // Calculate overall metrics
  const overallAccuracy = React.useMemo(() => {
    if (!competencyBreakdownData?.data?.length) return 0;
    return Math.round(
      competencyBreakdownData.data.reduce((sum: number, item: any) => sum + item.accuracy, 0) /
      competencyBreakdownData.data.length
    );
  }, [competencyBreakdownData]);

  const totalQuestions = React.useMemo(() => {
    if (!dailyActivityData?.data?.length) return 0;
    return dailyActivityData.data.reduce((sum: number, item: any) => sum + (item.questionsAttempted || 0), 0);
  }, [dailyActivityData]);

  const studyStreak = React.useMemo(() => {
    if (!dailyActivityData?.data?.length) return 0;
    let streak = 0;
    const sortedData = [...(dailyActivityData.data || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    for (const day of sortedData) {
      if (day.questionsAttempted > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [dailyActivityData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome {profileData?.name}</h1>
          <p className="text-gray-600">Track your learning progress and performance insights</p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <PerformanceIndicator
            value={overallAccuracy}
            label="Overall Accuracy"
            icon={<Target className="h-5 w-5 text-blue-600" />}
            trend="up"
            trendValue={5}
          />
          <PerformanceIndicator
            value={totalQuestions}
            label="Questions Completed"
            icon={<CheckCircle className="h-5 w-5 text-green-600" />}
          />
          <PerformanceIndicator
            value={studyStreak}
            label="Study Streak (Days)"
            icon={<Calendar className="h-5 w-5 text-orange-600" />}
            trend="up"
            trendValue={2}
          />
          <PerformanceIndicator
            value={competencyBreakdownData?.data?.length || 0}
            label="Competencies"
            icon={<Brain className="h-5 w-5 text-purple-600" />}
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Competency Breakdown */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>Competency Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loadingBreakdown ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competencyBreakdownData?.data || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="competency"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={110}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="accuracy"
                      fill="url(#competencyGradient)"
                      radius={[4, 4, 0, 0]}
                      strokeWidth={2}
                      stroke="#6366F1"
                    />
                    <defs>
                      <linearGradient id="competencyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Score Progress */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Score Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loadingProgress ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreProgressData?.data || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Competency Distribution (Pie Chart) */}
          {/* Competency Distribution (Horizontal Bar Chart) */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span>Competency Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loadingPerformance ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={competencyPerformanceData?.data || []}
                    margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="competency"
                      tick={{ fontSize: 12 }}
                      width={120}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="accuracy"
                      fill="#8B5CF6"
                      radius={[4, 4, 4, 4]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>


          {/* Daily Activity */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>Daily Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {loadingActivity ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyActivityData?.data || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="averageAccuracy"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Study Recommendations */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span>Personalized Study Recommendations</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                AI Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingRecommendations ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {(studyRecommendationsData?.data || []).map((rec: any, idx: number) => (
                  <motion.div
                    key={idx}
                    className="p-6 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-r from-white to-gray-50"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg text-gray-900">{rec.competency}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Current Accuracy:</span>
                        <Badge
                          variant={rec.currentAccuracy >= 70 ? "default" : "destructive"}
                          className={rec.currentAccuracy >= 70 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {rec.currentAccuracy}%
                        </Badge>
                      </div>
                    </div>

                    <Progress value={rec.currentAccuracy} className="mb-4 h-2" />

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-800 flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>Recommended Practice Questions</span>
                      </h5>
                      {rec.recommendedQuestions?.map((q: any) => (
                        <div
                          key={q._id}
                          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <p className="font-medium text-gray-900 mb-3">{q.question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options?.map((opt: string, i: number) => (
                              <div
                                key={i}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                <span className="font-medium text-gray-600">
                                  {String.fromCharCode(65 + i)}.
                                </span>
                                <span className="ml-2 text-gray-800">{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {(!studyRecommendationsData?.data || studyRecommendationsData.data.length === 0) && (
                  <div className="text-center py-12">
                    <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Great job!</h3>
                    <p className="text-gray-600">You're performing well across all competencies. Keep up the excellent work!</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
import { useChangePasswordMutation, useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/redux/features/user/userApi';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Shield,
    Save,
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface IProfilePageProps {
}

interface ProfileFormData {
    name: string;
    email: string;
}

interface PasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
    const { data: profileData, refetch } = useGetUserProfileQuery({});
    const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

    const profile = profileData?.data || {};
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const profileForm = useForm<ProfileFormData>({
        defaultValues: {
            name: profile?.name || '',
            email: profile?.email || ''
        }
    });

    const passwordForm = useForm<PasswordFormData>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    // Update form values when profile data loads
    React.useEffect(() => {
        if (profile) {
            profileForm.reset({
                name: profile.name || '',
                email: profile.email || ''
            });
        }
    }, [profile, profileForm]);

    const onProfileSubmit = async (data: ProfileFormData) => {
        try {
            await updateProfile(data).unwrap();
            toast.success('Profile updated successfully!');
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update profile');
        }
    };

    const onPasswordSubmit = async (data: PasswordFormData) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        try {
            await changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }).unwrap();

            toast.success('Password changed successfully!');
            passwordForm.reset();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to change password');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100
            }
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </motion.div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User size={16} />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="password" className="flex items-center gap-2">
                        <Lock size={16} />
                        Password
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription>
                                    Update your personal details and contact information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="pl-10"
                                                    {...profileForm.register('name', { required: 'Name is required' })}
                                                />
                                            </div>
                                            {profileForm.formState.errors.name && (
                                                <p className="text-sm text-red-500">{profileForm.formState.errors.name.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="pl-10"
                                                    {...profileForm.register('email', {
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /^\S+@\S+$/i,
                                                            message: 'Invalid email address'
                                                        }
                                                    })}
                                                />
                                            </div>
                                            {profileForm.formState.errors.email && (
                                                <p className="text-sm text-red-500">{profileForm.formState.errors.email.message}</p>
                                            )}
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="space-y-4">
                                        <h3 className="font-medium text-gray-900">Account Status</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Verification Status</span>
                                                <Badge variant={profile?.isVerified ? "default" : "secondary"} className="gap-1">
                                                    {profile?.isVerified ? (
                                                        <>
                                                            <CheckCircle className="w-3 h-3" />
                                                            Verified
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="w-3 h-3" />
                                                            Not Verified
                                                        </>
                                                    )}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Account Status</span>
                                                <Badge variant={profile?.status === 'active' ? "default" : "destructive"}>
                                                    {profile?.status?.charAt(0).toUpperCase() + profile?.status?.slice(1)}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Role</span>
                                                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                                                    {profile?.role}
                                                </Badge>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="flex justify-end b">
                                        <Button
                                            type="submit"
                                            disabled={isUpdating}
                                            className="gap-2 bg-primary-700 cursor-pointer"
                                        >
                                            {isUpdating ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                                    />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                      <Save className="w-4 h-4" />
                                                    Save Changes
                                                </>
                                               
                                            )}
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="password">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Change Password
                                </CardTitle>
                                <CardDescription>
                                    Ensure your account is using a long, random password to stay secure
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                                    <motion.div variants={itemVariants} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="oldPassword">Current Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                                <Input
                                                    id="oldPassword"
                                                    type={showOldPassword ? "text" : "password"}
                                                    className="pl-10 pr-10"
                                                    {...passwordForm.register('oldPassword', { required: 'Current password is required' })}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                                >
                                                    {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            {passwordForm.formState.errors.oldPassword && (
                                                <p className="text-sm text-red-500">{passwordForm.formState.errors.oldPassword.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                                <Input
                                                    id="newPassword"
                                                    type={showNewPassword ? "text" : "password"}
                                                    className="pl-10 pr-10"
                                                    {...passwordForm.register('newPassword', {
                                                        required: 'New password is required',
                                                        minLength: {
                                                            value: 6,
                                                            message: 'Password must be at least 6 characters'
                                                        }
                                                    })}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            {passwordForm.formState.errors.newPassword && (
                                                <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="pl-10 pr-10"
                                                    {...passwordForm.register('confirmPassword', {
                                                        required: 'Please confirm your password'
                                                    })}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                            {passwordForm.formState.errors.confirmPassword && (
                                                <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                                            )}
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isChangingPassword}
                                            className="gap-2 bg-primary-700 cursor-pointer"
                                        >
                                            {isChangingPassword ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                                    />
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    Update Password
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProfilePage;
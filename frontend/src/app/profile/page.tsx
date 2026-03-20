"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { userApi, User } from "@/lib/api";
import { MainLayout } from "@/components/layout";
import { Button, Card, CardBody, Input, Textarea } from "@/components/ui";
import {
  User as UserIcon,
  Mail,
  Lock,
  Save,
  PenTool,
  BookOpen,
  FileText,
  TrendingUp,
  Edit,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "style" | "password">("profile");

  const [profileForm, setProfileForm] = useState({
    username: "",
    avatarUrl: "",
  });

  const [styleForm, setStyleForm] = useState({
    personalStyle: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [stats, setStats] = useState({
    novelCount: 0,
    chapterCount: 0,
    totalWords: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchUserData();
  }, [isAuthenticated, router]);

  const fetchUserData = async () => {
    try {
      const [userRes, statsRes] = await Promise.all([
        userApi.getMe(),
        userApi.getStats(),
      ]);
      const userData = userRes.data.data;
      setProfileForm({
        username: userData.username || "",
        avatarUrl: userData.avatarUrl || "",
      });
      setStyleForm({
        personalStyle: userData.personalStyle || "",
      });
      setStats(statsRes.data.data);
    } catch (error) {
      console.error("获取用户数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const res = await userApi.update(profileForm);
      updateUser(res.data.data);
      alert("保存成功！");
    } catch (error) {
      console.error("保存失败:", error);
      alert("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStyle = async () => {
    setSaving(true);
    try {
      await userApi.updatePersonalStyle(styleForm);
      alert("保存成功！");
    } catch (error) {
      console.error("保存失败:", error);
      alert("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError("");

    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      setPasswordError("请填写所有密码字段");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("两次输入的新密码不一致");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("新密码长度至少6位");
      return;
    }

    setSaving(true);
    try {
      await userApi.changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      alert("密码修改成功！");
    } catch (error: any) {
      setPasswordError(error.response?.data?.message || "修改失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm("确定要退出登录吗？")) {
      logout();
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">个人中心</h1>
          <p className="text-gray-500 mt-1">管理您的账号和创作偏好</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <CardBody className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.novelCount}</p>
              <p className="text-sm text-gray-500">作品数量</p>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <CardBody className="p-4 text-center">
              <FileText className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.chapterCount}</p>
              <p className="text-sm text-gray-500">章节总数</p>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100">
            <CardBody className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {(stats.totalWords / 10000).toFixed(1)}万
              </p>
              <p className="text-sm text-gray-500">总字数</p>
            </CardBody>
          </Card>
        </div>

        {/* 标签页 */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            {[
              { key: "profile", label: "个人资料", icon: UserIcon },
              { key: "style", label: "创作风格", icon: PenTool },
              { key: "password", label: "修改密码", icon: Lock },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 个人资料 */}
        {activeTab === "profile" && (
          <Card>
            <CardBody className="p-6">
              <h2 className="text-lg font-semibold mb-6">个人资料</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail className="w-5 h-5" />
                    <span>{user?.email}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">邮箱不可修改</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <Input
                    value={profileForm.username}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, username: e.target.value })
                    }
                    placeholder="请输入用户名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    头像URL
                  </label>
                  <Input
                    value={profileForm.avatarUrl}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, avatarUrl: e.target.value })
                    }
                    placeholder="https://example.com/avatar.png"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    保存
                  </Button>
                  <Button variant="secondary" onClick={handleLogout}>
                    退出登录
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* 创作风格 */}
        {activeTab === "style" && (
          <Card>
            <CardBody className="p-6">
              <h2 className="text-lg font-semibold mb-2">创作风格</h2>
              <p className="text-gray-500 mb-6">
                设定您的个人创作风格，AI生成时会参考此风格
              </p>
              <div className="space-y-4">
                <Textarea
                  value={styleForm.personalStyle}
                  onChange={(e) =>
                    setStyleForm({ ...styleForm, personalStyle: e.target.value })
                  }
                  placeholder="描述您的创作风格，例如：&#10;- 偏好简洁有力的句式&#10;- 喜欢使用比喻和意象&#10;- 注重人物心理描写&#10;- 擅长悬疑反转..."
                  rows={8}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveStyle}
                    disabled={saving}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    保存
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* 修改密码 */}
        {activeTab === "password" && (
          <Card>
            <CardBody className="p-6">
              <h2 className="text-lg font-semibold mb-6">修改密码</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    原密码
                  </label>
                  <div className="relative">
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
                      }
                      placeholder="请输入原密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showOldPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    新密码
                  </label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      placeholder="请输入新密码（至少6位）"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    确认新密码
                  </label>
                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="请再次输入新密码"
                  />
                </div>

                {passwordError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                    {passwordError}
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Lock className="w-4 h-4 mr-2" />
                    )}
                    修改密码
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

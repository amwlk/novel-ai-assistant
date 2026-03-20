"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { authApi } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { 
  PenTool, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Sparkles,
  BookOpen,
  Settings,
  Wand2
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { data } = await authApi.login({
          email: form.email,
          password: form.password,
        });
        setAuth(data.data.accessToken, data.data.user);
      } else {
        const { data } = await authApi.register({
          email: form.email,
          password: form.password,
          username: form.username,
        });
        setAuth(data.data.accessToken, data.data.user);
      }
      router.push("/novels");
    } catch (err: any) {
      setError(err.response?.data?.message || "操作失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "12大弹性要素",
      desc: "设定统一管理，修改自动同步"
    },
    {
      icon: Sparkles,
      title: "AI智能生成",
      desc: "多模型集成，一键生成章节"
    },
    {
      icon: Settings,
      title: "双层知识库",
      desc: "个人+小说专属，AI更懂你"
    },
    {
      icon: Wand2,
      title: "智能润色",
      desc: "去AI味，风格统一，合规校验"
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* 左侧 - 品牌介绍 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 flex-col justify-between relative overflow-hidden">
        {/* 装饰背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <PenTool className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AI小说助手</span>
          </div>
          
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              网文创作者专属的<br/>AI创作提效平台
            </h1>
            <p className="text-white/80 text-lg">
              解决长篇网文创作的四大核心痛点：设定管理混乱、长篇崩设定、
              创作效率低下、工具分散
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20"
              >
                <feature.icon className="w-8 h-8 text-white mb-3" />
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 text-white/60 text-sm">
          © 2026 长篇小说AI助手平台 · 让创作更高效
        </div>
      </div>

      {/* 右侧 - 登录表单 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* 移动端Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <PenTool className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AI小说助手</span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? "欢迎回来" : "创建账号"}
              </h2>
              <p className="text-gray-500">
                {isLogin ? "登录您的账号继续创作" : "注册开始您的创作之旅"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="请输入用户名"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="pl-12 h-12"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="请输入邮箱"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="pl-12 h-12"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pl-12 pr-12 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    处理中...
                  </span>
                ) : isLogin ? "登录" : "注册"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "没有账号？立即注册" : "已有账号？立即登录"}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  忘记密码？
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            登录即表示您同意我们的
            <a href="#" className="text-indigo-600 hover:underline"> 服务条款 </a>
            和
            <a href="#" className="text-indigo-600 hover:underline"> 隐私政策</a>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import {
  PenTool,
  BookOpen,
  Sparkles,
  Settings,
  Wand2,
  Users,
  Globe,
  GitBranch,
  Sword,
  Heart,
  MapPin,
  Package,
  Layers,
  Shield,
  Zap,
  Database,
  FileText,
  Check,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export default function FeaturesPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const coreFeatures = [
    {
      icon: BookOpen,
      title: "12大弹性要素设定系统",
      desc: "人物设定、世界观、情节主线、核心冲突、道具信物、场景地点、势力体系、人物关系等12大要素，统一管理，修改自动同步。",
      details: [
        "设定分类清晰，查找方便",
        "版本历史追溯，随时回滚",
        "标签系统，快速定位",
        "设定关联，智能提醒",
      ],
    },
    {
      icon: Sparkles,
      title: "AI智能生成",
      desc: "集成豆包、文心一言、通义千问、智谱清言四大模型，一键生成章节内容，创作效率提升10倍。",
      details: [
        "多模型切换，择优选用",
        "上下文理解，生成连贯",
        "风格可调，符合需求",
        "批量生成，效率倍增",
      ],
    },
    {
      icon: Database,
      title: "双层知识库",
      desc: "个人风格层 + 小说专属层，让AI真正理解您的创作风格和作品设定。",
      details: [
        "个人风格学习，AI越用越懂你",
        "小说专属知识，设定自动关联",
        "知识检索，一键调用",
        "持续积累，越用越智能",
      ],
    },
    {
      icon: Wand2,
      title: "智能润色系统",
      desc: "去AI味、风格统一、合规校验，一键优化您的文字。",
      details: [
        "去除AI生成痕迹",
        "统一文风，保持一致",
        "敏感词检测与替换",
        "语法错误修正",
      ],
    },
  ];

  const settingTypes = [
    { icon: Users, name: "人物设定", desc: "主角、配角、反派详细档案" },
    { icon: Globe, name: "世界观", desc: "世界背景、历史、规则" },
    { icon: GitBranch, name: "情节主线", desc: "故事脉络、关键节点" },
    { icon: Sword, name: "核心冲突", desc: "矛盾对立、冲突升级" },
    { icon: Package, name: "道具信物", desc: "法宝、神器、关键物品" },
    { icon: MapPin, name: "场景地点", desc: "地图、场景、地点描述" },
    { icon: Layers, name: "势力体系", desc: "宗门、势力、组织架构" },
    { icon: Heart, name: "人物关系", desc: "情感线、关系网络" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI小说助手</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-indigo-600 font-medium">
                功能介绍
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                价格方案
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                服务条款
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                隐私政策
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={() => router.push("/login")}>
                登录
              </Button>
              <Button
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                免费注册
              </Button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3">
            <Link href="/features" className="block py-2 text-indigo-600">功能介绍</Link>
            <Link href="/pricing" className="block py-2 text-gray-600">价格方案</Link>
            <Link href="/terms" className="block py-2 text-gray-600">服务条款</Link>
            <Link href="/privacy" className="block py-2 text-gray-600">隐私政策</Link>
            <div className="pt-3 border-t border-gray-100 flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => router.push("/login")}>
                登录
              </Button>
              <Button className="flex-1" onClick={() => router.push("/login")}>
                注册
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            强大的功能，为创作而生
          </h1>
          <p className="text-xl text-gray-600">
            专业解决长篇网文创作的四大核心痛点，让AI成为您的得力助手
          </p>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">{feature.desc}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-24 h-24 text-indigo-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12大设定要素 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              12大弹性要素设定
            </h2>
            <p className="text-xl text-gray-600">
              全面覆盖长篇网文创作的各类设定需求
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {settingTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <type.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            准备好体验这些功能了吗？
          </h2>
          <p className="text-xl text-white/80 mb-8">
            免费注册，立即开始使用
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100"
            onClick={() => router.push("/login")}
          >
            免费开始
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">AI小说助手</span>
              </div>
              <p className="text-sm">网文创作者专属的AI创作提效平台</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">产品</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white">功能介绍</Link></li>
                <li><Link href="/pricing" className="hover:text-white">价格方案</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">支持</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">帮助中心</Link></li>
                <li><Link href="#" className="hover:text-white">联系我们</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">法律</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white">服务条款</Link></li>
                <li><Link href="/privacy" className="hover:text-white">隐私政策</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 AI小说助手. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

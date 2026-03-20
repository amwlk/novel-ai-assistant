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
  Shield,
  Zap,
  Clock,
  Heart,
  Check,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "12大弹性要素",
      desc: "设定统一管理，修改自动同步，告别设定混乱",
    },
    {
      icon: Sparkles,
      title: "AI智能生成",
      desc: "多模型集成，一键生成章节，效率提升10倍",
    },
    {
      icon: Settings,
      title: "双层知识库",
      desc: "个人风格+小说专属，让AI真正懂你的作品",
    },
    {
      icon: Wand2,
      title: "智能润色",
      desc: "去AI味、风格统一、合规校验，一键优化",
    },
    {
      icon: Shield,
      title: "数据安全",
      desc: "数据完全私有，本地存储，无社交无泄露",
    },
    {
      icon: Zap,
      title: "极速响应",
      desc: "毫秒级响应，流畅体验，专注创作本身",
    },
  ];

  const pricingPlans = [
    {
      name: "免费版",
      price: "0",
      desc: "适合新手体验",
      features: [
        "1部小说作品",
        "基础设定管理",
        "每日50次AI生成",
        "Markdown导出",
      ],
      cta: "免费开始",
      popular: false,
    },
    {
      name: "专业版",
      price: "49",
      desc: "适合全职作者",
      features: [
        "无限小说作品",
        "完整设定系统",
        "每日500次AI生成",
        "多格式导出",
        "优先技术支持",
        "批量生成功能",
      ],
      cta: "立即订阅",
      popular: true,
    },
    {
      name: "团队版",
      price: "199",
      desc: "适合工作室",
      features: [
        "专业版全部功能",
        "5个团队账号",
        "无限AI生成",
        "API接口调用",
        "专属客服支持",
        "定制化需求",
      ],
      cta: "联系我们",
      popular: false,
    },
  ];

  const testimonials = [
    {
      avatar: "王",
      name: "王作家",
      title: "玄幻作者 · 日更万字",
      content: "用了这个平台后，我的创作效率提升了3倍！设定管理太方便了，再也不用翻文档找设定了。",
    },
    {
      avatar: "李",
      name: "李小姐",
      title: "言情作者 · 番茄签约",
      content: "AI续写功能太强了，给出的建议都很符合剧情走向，润色后的文字完全看不出AI痕迹。",
    },
    {
      avatar: "张",
      name: "张先生",
      title: "悬疑作者 · 起点签约",
      content: "双层知识库的设计太贴心了，AI真的能记住我所有的伏笔和设定，续写时自动关联。",
    },
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
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
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

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3">
            <Link href="/features" className="block py-2 text-gray-600">功能介绍</Link>
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

      {/* Hero区域 */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI驱动的专业创作平台
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            网文创作者专属的
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI创作提效平台
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            解决长篇网文创作的四大核心痛点：设定管理混乱、长篇崩设定、
            创作效率低下、工具分散。让AI真正懂你的作品，创作效率提升10倍。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-lg px-8"
            >
              免费开始创作
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/features")}
              className="text-lg px-8"
            >
              了解更多
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>免费试用</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>无需信用卡</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>数据安全</span>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特点 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              为网文创作而生
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              专业解决长篇创作痛点，让AI成为您的创作助手
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 价格方案 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              简单透明的价格
            </h2>
            <p className="text-xl text-gray-600">
              选择适合您的方案，随时升级
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-4 ring-indigo-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-sm font-medium rounded-full">
                    最受欢迎
                  </div>
                )}
                
                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-white/80" : "text-gray-500"}`}>
                  {plan.desc}
                </p>
                
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    ¥{plan.price}
                  </span>
                  <span className={plan.popular ? "text-white/80" : "text-gray-500"}>/月</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${plan.popular ? "text-white" : "text-green-500"}`} />
                      <span className={plan.popular ? "text-white/90" : "text-gray-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-white text-indigo-600 hover:bg-gray-100"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600"
                  }`}
                  onClick={() => router.push("/login")}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              作者们怎么说
            </h2>
            <p className="text-xl text-gray-600">
              已有超过1000位作者在使用
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.title}</div>
                  </div>
                </div>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            准备好提升您的创作效率了吗？
          </h2>
          <p className="text-xl text-white/80 mb-8">
            立即注册，开启您的AI创作之旅
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8"
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
              <p className="text-sm">
                网文创作者专属的AI创作提效平台
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">产品</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition-colors">功能介绍</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">价格方案</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">更新日志</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">支持</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">帮助中心</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">联系我们</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">反馈建议</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">法律</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">服务条款</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link></li>
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

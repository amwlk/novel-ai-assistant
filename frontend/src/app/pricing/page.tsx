"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import {
  PenTool,
  Check,
  X,
  HelpCircle,
  ArrowRight,
  Menu,
  Zap,
  Star,
  Users,
} from "lucide-react";

export default function PricingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "免费版",
      desc: "适合新手体验",
      price: { monthly: 0, yearly: 0 },
      features: [
        { text: "1部小说作品", included: true },
        { text: "基础设定管理", included: true },
        { text: "每日50次AI生成", included: true },
        { text: "Markdown导出", included: true },
        { text: "无限小说作品", included: false },
        { text: "批量生成功能", included: false },
        { text: "API接口调用", included: false },
        { text: "专属客服支持", included: false },
      ],
      cta: "免费开始",
      popular: false,
    },
    {
      name: "专业版",
      desc: "适合全职作者",
      price: { monthly: 49, yearly: 490 },
      features: [
        { text: "无限小说作品", included: true },
        { text: "完整设定系统", included: true },
        { text: "每日500次AI生成", included: true },
        { text: "多格式导出", included: true },
        { text: "优先技术支持", included: true },
        { text: "批量生成功能", included: true },
        { text: "API接口调用", included: false },
        { text: "专属客服支持", included: false },
      ],
      cta: "立即订阅",
      popular: true,
    },
    {
      name: "团队版",
      desc: "适合工作室",
      price: { monthly: 199, yearly: 1990 },
      features: [
        { text: "专业版全部功能", included: true },
        { text: "5个团队账号", included: true },
        { text: "无限AI生成", included: true },
        { text: "API接口调用", included: true },
        { text: "专属客服支持", included: true },
        { text: "定制化需求", included: true },
        { text: "数据备份服务", included: true },
        { text: "培训指导服务", included: true },
      ],
      cta: "联系我们",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "免费版有什么限制？",
      a: "免费版支持创建1部小说，每日50次AI生成，基础设定管理功能。足够新手体验和轻度使用。",
    },
    {
      q: "如何升级到专业版？",
      a: "登录后进入个人中心，选择升级套餐，支持支付宝、微信支付等多种支付方式。",
    },
    {
      q: "年付有什么优惠？",
      a: "选择年付可享受约17%的折扣，相当于买10个月送2个月。",
    },
    {
      q: "可以随时取消订阅吗？",
      a: "可以随时取消，取消后当前计费周期仍可使用，到期后自动降级为免费版。",
    },
    {
      q: "AI生成次数用完了怎么办？",
      a: "可以在个人中心购买额外次数包，或升级到更高级的套餐。",
    },
    {
      q: "数据安全有保障吗？",
      a: "您的数据完全私有，存储在安全的服务器上，我们不会访问或分享您的创作内容。",
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
              <Link href="/pricing" className="text-indigo-600 font-medium">
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
            <Link href="/features" className="block py-2 text-gray-600">功能介绍</Link>
            <Link href="/pricing" className="block py-2 text-indigo-600">价格方案</Link>
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
            简单透明的价格
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            选择适合您的方案，随时升级或降级
          </p>

          {/* 计费周期切换 */}
          <div className="inline-flex items-center gap-4 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              年付
              <span className="ml-2 text-green-600 text-xs">省17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* 价格卡片 */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-4 ring-indigo-200 scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    最受欢迎
                  </div>
                )}

                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-white/80" : "text-gray-500"}`}>
                  {plan.desc}
                </p>

                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    ¥{billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className={plan.popular ? "text-white/80" : "text-gray-500"}>
                    /{billingCycle === "monthly" ? "月" : "年"}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check className={`w-5 h-5 ${plan.popular ? "text-white" : "text-green-500"}`} />
                      ) : (
                        <X className={`w-5 h-5 ${plan.popular ? "text-white/40" : "text-gray-300"}`} />
                      )}
                      <span className={
                        feature.included
                          ? (plan.popular ? "text-white/90" : "text-gray-600")
                          : (plan.popular ? "text-white/40" : "text-gray-400")
                      }>
                        {feature.text}
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

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              常见问题
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            还有疑问？
          </h2>
          <p className="text-xl text-white/80 mb-8">
            联系我们的客服团队，获取一对一解答
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            联系客服
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { PenTool, Menu, X } from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Link href="/privacy" className="text-indigo-600 font-medium">
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
            <Link href="/pricing" className="block py-2 text-gray-600">价格方案</Link>
            <Link href="/terms" className="block py-2 text-gray-600">服务条款</Link>
            <Link href="/privacy" className="block py-2 text-indigo-600">隐私政策</Link>
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

      {/* 内容 */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">隐私政策</h1>
          <p className="text-gray-500 mb-8">最后更新日期：2026年1月1日</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. 引言</h2>
            <p className="text-gray-600 mb-4">
              AI小说助手（以下简称"我们"）非常重视您的隐私保护。本隐私政策说明我们如何收集、使用、存储和保护您的个人信息。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. 信息收集</h2>
            <p className="text-gray-600 mb-4">
              我们收集以下信息：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>账号信息：</strong>邮箱、用户名、密码（加密存储）</li>
              <li><strong>创作内容：</strong>您创建的小说、章节、设定等</li>
              <li><strong>使用数据：</strong>登录时间、操作日志、AI生成记录</li>
              <li><strong>设备信息：</strong>浏览器类型、操作系统、IP地址</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. 信息使用</h2>
            <p className="text-gray-600 mb-4">
              我们使用收集的信息用于：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>提供、维护和改进我们的服务</li>
              <li>处理您的请求和订单</li>
              <li>发送服务通知和更新信息</li>
              <li>分析使用情况，优化用户体验</li>
              <li>保障账号安全，防止欺诈行为</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. 信息存储</h2>
            <p className="text-gray-600 mb-4">
              4.1 您的数据存储在安全的服务器上，采用加密技术保护。
            </p>
            <p className="text-gray-600 mb-4">
              4.2 我们不会将您的创作内容用于训练AI模型或分享给第三方。
            </p>
            <p className="text-gray-600 mb-4">
              4.3 您可以随时导出或删除您的数据。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. 信息共享</h2>
            <p className="text-gray-600 mb-4">
              我们不会出售您的个人信息。以下情况下可能需要共享：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>服务提供商：</strong>AI模型服务商（仅传输必要的生成请求）</li>
              <li><strong>法律要求：</strong>根据法律法规或政府要求</li>
              <li><strong>业务转让：</strong>如发生合并、收购等</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. 您的权利</h2>
            <p className="text-gray-600 mb-4">
              您对个人信息享有以下权利：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>访问权：</strong>查看我们持有的您的个人信息</li>
              <li><strong>更正权：</strong>更新或修正不准确的信息</li>
              <li><strong>删除权：</strong>要求删除您的个人信息</li>
              <li><strong>导出权：</strong>导出您的创作内容</li>
              <li><strong>撤回同意：</strong>撤回之前给予的同意</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. 数据安全</h2>
            <p className="text-gray-600 mb-4">
              7.1 我们采用行业标准的安全措施保护您的数据，包括：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>SSL/TLS加密传输</li>
              <li>数据库加密存储</li>
              <li>访问控制和权限管理</li>
              <li>定期安全审计</li>
            </ul>
            <p className="text-gray-600 mb-4">
              7.2 如发生数据泄露，我们将及时通知您。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Cookie政策</h2>
            <p className="text-gray-600 mb-4">
              我们使用Cookie和类似技术来：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>保持您的登录状态</li>
              <li>记住您的偏好设置</li>
              <li>分析网站使用情况</li>
            </ul>
            <p className="text-gray-600 mb-4">
              您可以通过浏览器设置管理Cookie。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. 儿童隐私</h2>
            <p className="text-gray-600 mb-4">
              我们的服务面向成年人。如果您是18岁以下的未成年人，请在监护人指导下使用本服务。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. 政策更新</h2>
            <p className="text-gray-600 mb-4">
              我们可能会不时更新本隐私政策。重大变更将通过邮件或站内通知告知您。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. 联系我们</h2>
            <p className="text-gray-600 mb-4">
              如有隐私相关问题，请联系：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>邮箱：privacy@ainovel.com</li>
              <li>地址：北京市朝阳区xxx大厦</li>
            </ul>
          </div>
        </div>
      </main>

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

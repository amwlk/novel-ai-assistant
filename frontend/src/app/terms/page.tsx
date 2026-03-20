"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { PenTool, Menu, X } from "lucide-react";

export default function TermsPage() {
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
              <Link href="/terms" className="text-indigo-600 font-medium">
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
            <Link href="/pricing" className="block py-2 text-gray-600">价格方案</Link>
            <Link href="/terms" className="block py-2 text-indigo-600">服务条款</Link>
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

      {/* 内容 */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">服务条款</h1>
          <p className="text-gray-500 mb-8">最后更新日期：2026年1月1日</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. 服务说明</h2>
            <p className="text-gray-600 mb-4">
              AI小说助手是一个面向网文创作者的AI辅助创作平台。使用本服务即表示您同意遵守以下条款。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. 用户注册</h2>
            <p className="text-gray-600 mb-4">
              2.1 您需要注册账号才能使用本平台的服务。注册时请提供真实、准确的信息。
            </p>
            <p className="text-gray-600 mb-4">
              2.2 您对账号的安全负责，请妥善保管密码。如发现账号被盗用，请立即联系我们。
            </p>
            <p className="text-gray-600 mb-4">
              2.3 每位用户只能注册一个账号，禁止批量注册或转让账号。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. 使用规范</h2>
            <p className="text-gray-600 mb-4">
              3.1 您承诺使用本平台创作的内容不违反法律法规，不侵犯他人权益。
            </p>
            <p className="text-gray-600 mb-4">
              3.2 禁止利用本平台生成以下内容：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>违反法律法规的内容</li>
              <li>侵犯他人知识产权的内容</li>
              <li>涉及政治敏感、暴力、色情等内容</li>
              <li>其他违反公序良俗的内容</li>
            </ul>
            <p className="text-gray-600 mb-4">
              3.3 您对使用本平台创作的内容享有完整版权，本平台不主张任何权利。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. 服务费用</h2>
            <p className="text-gray-600 mb-4">
              4.1 本平台提供免费版和付费版服务，具体价格请查看价格页面。
            </p>
            <p className="text-gray-600 mb-4">
              4.2 付费服务一经开通，不支持退款（法律法规另有规定的除外）。
            </p>
            <p className="text-gray-600 mb-4">
              4.3 我们有权根据运营情况调整价格，调整前会提前通知。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. 知识产权</h2>
            <p className="text-gray-600 mb-4">
              5.1 本平台的软件、技术、界面设计等知识产权归平台所有。
            </p>
            <p className="text-gray-600 mb-4">
              5.2 您使用本平台创作的内容，版权归您所有。
            </p>
            <p className="text-gray-600 mb-4">
              5.3 您授权我们存储和处理您的创作内容，用于提供服务。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. 免责声明</h2>
            <p className="text-gray-600 mb-4">
              6.1 AI生成的内容仅供参考，您需要自行审核和修改。
            </p>
            <p className="text-gray-600 mb-4">
              6.2 因不可抗力导致的服务中断，我们不承担责任。
            </p>
            <p className="text-gray-600 mb-4">
              6.3 我们不对第三方服务（如AI模型提供商）的问题负责。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. 服务变更与终止</h2>
            <p className="text-gray-600 mb-4">
              7.1 我们有权随时修改或终止部分服务功能。
            </p>
            <p className="text-gray-600 mb-4">
              7.2 如您违反本条款，我们有权暂停或终止您的账号。
            </p>
            <p className="text-gray-600 mb-4">
              7.3 您可以随时注销账号，注销后数据将被删除。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. 争议解决</h2>
            <p className="text-gray-600 mb-4">
              8.1 本条款的解释和执行适用中华人民共和国法律。
            </p>
            <p className="text-gray-600 mb-4">
              8.2 如发生争议，双方应友好协商解决；协商不成的，可向平台所在地人民法院提起诉讼。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. 联系我们</h2>
            <p className="text-gray-600 mb-4">
              如有任何问题，请通过以下方式联系我们：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>邮箱：support@ainovel.com</li>
              <li>客服电话：400-888-8888</li>
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

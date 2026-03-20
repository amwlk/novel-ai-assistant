"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { novelApi, Novel } from "@/lib/api";
import { MainLayout } from "@/components/layout";
import { Button, Card, CardBody, Input } from "@/components/ui";
import {
  Plus,
  Search,
  BookOpen,
  MoreVertical,
  Trash2,
  Edit,
  FileText,
  Clock,
  TrendingUp,
  PenTool,
  Sparkles,
  X,
} from "lucide-react";

export default function NovelsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newNovel, setNewNovel] = useState({
    title: "",
    category: "玄幻",
    penName: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchNovels();
  }, [isAuthenticated, router]);

  const fetchNovels = async () => {
    try {
      const { data } = await novelApi.getAll();
      setNovels(data.data || []);
    } catch (error) {
      console.error("获取小说列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newNovel.title.trim()) return;
    setCreating(true);
    try {
      const { data } = await novelApi.create(newNovel);
      setNovels([data.data, ...novels]);
      setShowCreateModal(false);
      setNewNovel({ title: "", category: "玄幻", penName: "" });
    } catch (error) {
      console.error("创建小说失败:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这部小说吗？此操作不可恢复。")) return;
    try {
      await novelApi.delete(id);
      setNovels(novels.filter((n) => n.id !== id));
    } catch (error) {
      console.error("删除小说失败:", error);
    }
  };

  const filteredNovels = novels.filter(
    (novel) =>
      novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      novel.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryOptions = [
    { value: "玄幻", color: "bg-purple-100 text-purple-700" },
    { value: "仙侠", color: "bg-blue-100 text-blue-700" },
    { value: "都市", color: "bg-green-100 text-green-700" },
    { value: "言情", color: "bg-pink-100 text-pink-700" },
    { value: "悬疑", color: "bg-gray-100 text-gray-700" },
    { value: "科幻", color: "bg-cyan-100 text-cyan-700" },
    { value: "历史", color: "bg-amber-100 text-amber-700" },
    { value: "其他", color: "bg-slate-100 text-slate-700" },
  ];

  const getCategoryColor = (category: string) => {
    const found = categoryOptions.find((c) => c.value === category);
    return found?.color || "bg-gray-100 text-gray-700";
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: "bg-gray-100 text-gray-600",
      writing: "bg-emerald-100 text-emerald-700",
      completed: "bg-blue-100 text-blue-700",
    };
    const labels: Record<string, string> = {
      draft: "草稿",
      writing: "创作中",
      completed: "已完结",
    };
    return { style: styles[status] || styles.draft, label: labels[status] || "草稿" };
  };

  const stats = {
    total: novels.length,
    writing: novels.filter((n) => n.status === "writing").length,
    totalWords: novels.reduce((sum, n) => sum + n.totalWords, 0),
    totalChapters: novels.reduce((sum, n) => sum + n.totalChapters, 0),
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">加载中...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">我的作品</h1>
            <p className="text-gray-500 mt-1">管理您的所有小说作品</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            新建作品
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-500">作品总数</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.writing}</p>
                  <p className="text-sm text-gray-500">创作中</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalChapters}</p>
                  <p className="text-sm text-gray-500">章节总数</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {(stats.totalWords / 10000).toFixed(1)}万
                  </p>
                  <p className="text-sm text-gray-500">总字数</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索作品名称或题材..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white"
          />
        </div>

        {/* 小说列表 */}
        {filteredNovels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNovels.map((novel) => {
              const statusBadge = getStatusBadge(novel.status);
              return (
                <Card
                  key={novel.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => router.push(`/novels/${novel.id}`)}
                >
                  <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                          {novel.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(novel.category)}`}>
                            {novel.category}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${statusBadge.style}`}>
                            {statusBadge.label}
                          </span>
                        </div>
                      </div>
                      <div
                        className="relative opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                          <button
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            onClick={() => router.push(`/novels/${novel.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                            编辑
                          </button>
                          <button
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(novel.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            删除
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {novel.totalChapters} 章
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {novel.totalWords.toLocaleString()} 字
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(novel.updatedAt).toLocaleDateString()}
                      </span>
                      {novel.penName && (
                        <span className="text-gray-500">{novel.penName}</span>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardBody className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? "没有找到匹配的作品" : "还没有作品"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "尝试其他搜索关键词"
                  : "点击上方按钮创建您的第一部小说"}
              </p>
              {!searchQuery && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  新建作品
                </Button>
              )}
            </CardBody>
          </Card>
        )}
      </div>

      {/* 创建弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">新建作品</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    作品名称 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="请输入作品名称"
                    value={newNovel.title}
                    onChange={(e) => setNewNovel({ ...newNovel, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    题材类型
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {categoryOptions.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setNewNovel({ ...newNovel, category: cat.value })}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                          newNovel.category === cat.value
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {cat.value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    笔名（可选）
                  </label>
                  <Input
                    placeholder="请输入笔名"
                    value={newNovel.penName}
                    onChange={(e) => setNewNovel({ ...newNovel, penName: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  取消
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!newNovel.title.trim() || creating}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  {creating ? "创建中..." : "创建"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </MainLayout>
  );
}

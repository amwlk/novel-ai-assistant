"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { novelApi, settingApi, chapterApi, Novel, Setting, Chapter } from "@/lib/api";
import { MainLayout } from "@/components/layout";
import { Button, Card, CardBody, Input, Textarea } from "@/components/ui";
import {
  ArrowLeft,
  BookOpen,
  Settings,
  FileText,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  Users,
  Globe,
  Sword,
  Heart,
  MapPin,
  Package,
  GitBranch,
  Layers,
  MoreVertical,
  X,
  Save,
  Wand2,
} from "lucide-react";

export default function NovelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const novelId = params.id as string;
  const { isAuthenticated } = useAuthStore();

  const [novel, setNovel] = useState<Novel | null>(null);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "settings" | "chapters">("overview");
  
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [settingForm, setSettingForm] = useState({
    type: "CHARACTER",
    name: "",
    content: "",
    tags: "",
  });

  const settingTypes = [
    { value: "CHARACTER", label: "人物设定", icon: Users, color: "bg-blue-100 text-blue-600" },
    { value: "WORLDVIEW", label: "世界观", icon: Globe, color: "bg-green-100 text-green-600" },
    { value: "PLOT", label: "情节主线", icon: GitBranch, color: "bg-purple-100 text-purple-600" },
    { value: "CONFLICT", label: "核心冲突", icon: Sword, color: "bg-red-100 text-red-600" },
    { value: "ITEM", label: "道具/信物", icon: Package, color: "bg-amber-100 text-amber-600" },
    { value: "SCENE", label: "场景地点", icon: MapPin, color: "bg-cyan-100 text-cyan-600" },
    { value: "FACTION", label: "势力体系", icon: Layers, color: "bg-indigo-100 text-indigo-600" },
    { value: "RELATIONSHIP", label: "人物关系", icon: Heart, color: "bg-pink-100 text-pink-600" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, novelId, router]);

  const fetchData = async () => {
    try {
      const [novelRes, settingsRes, chaptersRes] = await Promise.all([
        novelApi.getById(novelId),
        settingApi.getAll({ novelId }),
        chapterApi.getAll({ novelId, pageSize: 50 }),
      ]);
      setNovel(novelRes.data.data);
      setSettings(settingsRes.data.data || []);
      setChapters(chaptersRes.data.data || []);
    } catch (error) {
      console.error("获取数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSetting = async () => {
    if (!settingForm.name.trim() || !settingForm.content.trim()) return;

    try {
      const data = {
        novelId,
        type: settingForm.type,
        name: settingForm.name,
        content: settingForm.content,
        tags: settingForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      if (editingSetting) {
        await settingApi.update(editingSetting.id, data);
        setSettings(settings.map((s) => (s.id === editingSetting.id ? { ...s, ...data } : s)));
      } else {
        const res = await settingApi.create(data);
        setSettings([res.data.data, ...settings]);
      }

      setShowSettingModal(false);
      setEditingSetting(null);
      setSettingForm({ type: "CHARACTER", name: "", content: "", tags: "" });
    } catch (error) {
      console.error("保存设定失败:", error);
    }
  };

  const handleDeleteSetting = async (id: string) => {
    if (!confirm("确定要删除这个设定吗？")) return;
    try {
      await settingApi.delete(id);
      setSettings(settings.filter((s) => s.id !== id));
    } catch (error) {
      console.error("删除设定失败:", error);
    }
  };

  const handleCreateChapter = async () => {
    const chapterNumber = chapters.length + 1;
    try {
      const res = await chapterApi.create({
        novelId,
        chapterNumber,
        title: `第${chapterNumber}章`,
        content: "",
      });
      setChapters([...chapters, res.data.data]);
    } catch (error) {
      console.error("创建章节失败:", error);
    }
  };

  const handleDeleteChapter = async (id: string) => {
    if (!confirm("确定要删除这个章节吗？")) return;
    try {
      await chapterApi.delete(id);
      setChapters(chapters.filter((c) => c.id !== id));
    } catch (error) {
      console.error("删除章节失败:", error);
    }
  };

  const getSettingTypeInfo = (type: string) => {
    return settingTypes.find((t) => t.value === type) || settingTypes[0];
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    const type = setting.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(setting);
    return acc;
  }, {} as Record<string, Setting[]>);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!novel) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">小说不存在</p>
          <Button className="mt-4" onClick={() => router.push("/novels")}>
            返回列表
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 返回按钮和标题 */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/novels")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{novel.title}</h1>
            <p className="text-gray-500">{novel.category} · {novel.penName || "匿名"}</p>
          </div>
          <Button
            onClick={() => router.push(`/novels/${novelId}/write`)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            开始创作
          </Button>
        </div>

        {/* 标签页 */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            {[
              { key: "overview", label: "概览", icon: BookOpen },
              { key: "settings", label: "设定管理", icon: Settings },
              { key: "chapters", label: "章节列表", icon: FileText },
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

        {/* 概览 */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardBody className="p-6">
                <h2 className="text-lg font-semibold mb-4">创作进度</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-indigo-50 rounded-xl">
                    <p className="text-3xl font-bold text-indigo-600">{chapters.length}</p>
                    <p className="text-sm text-gray-500 mt-1">章节总数</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-3xl font-bold text-purple-600">{settings.length}</p>
                    <p className="text-sm text-gray-500 mt-1">设定条目</p>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-xl">
                    <p className="text-3xl font-bold text-pink-600">{novel.totalWords.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">总字数</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h2 className="text-lg font-semibold mb-4">快速操作</h2>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    className="w-full justify-start"
                    onClick={() => {
                      setEditingSetting(null);
                      setSettingForm({ type: "CHARACTER", name: "", content: "", tags: "" });
                      setShowSettingModal(true);
                    }}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    添加设定
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-start"
                    onClick={handleCreateChapter}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    新建章节
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI生成大纲
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card className="md:col-span-3">
              <CardBody className="p-6">
                <h2 className="text-lg font-semibold mb-4">设定概览</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {settingTypes.map((type) => {
                    const count = groupedSettings[type.value]?.length || 0;
                    return (
                      <div
                        key={type.value}
                        className={`p-4 rounded-xl ${type.color} cursor-pointer hover:opacity-80 transition-opacity`}
                        onClick={() => setActiveTab("settings")}
                      >
                        <type.icon className="w-6 h-6 mb-2" />
                        <p className="font-medium">{type.label}</p>
                        <p className="text-sm opacity-70">{count} 条设定</p>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* 设定管理 */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">设定管理</h2>
              <Button
                onClick={() => {
                  setEditingSetting(null);
                  setSettingForm({ type: "CHARACTER", name: "", content: "", tags: "" });
                  setShowSettingModal(true);
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                添加设定
              </Button>
            </div>

            {settings.length > 0 ? (
              <div className="space-y-6">
                {settingTypes.map((type) => {
                  const typeSettings = groupedSettings[type.value] || [];
                  if (typeSettings.length === 0) return null;

                  return (
                    <div key={type.value}>
                      <div className="flex items-center gap-2 mb-3">
                        <type.icon className={`w-5 h-5 ${type.color.split(" ")[1]}`} />
                        <h3 className="font-medium text-gray-700">{type.label}</h3>
                        <span className="text-sm text-gray-400">({typeSettings.length})</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {typeSettings.map((setting) => (
                          <Card key={setting.id} className="group hover:shadow-md transition-shadow">
                            <CardBody className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{setting.name}</h4>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <button
                                    className="p-1 hover:bg-gray-100 rounded"
                                    onClick={() => {
                                      setEditingSetting(setting);
                                      setSettingForm({
                                        type: setting.type,
                                        name: setting.name,
                                        content: setting.content,
                                        tags: setting.tags.join(", "),
                                      });
                                      setShowSettingModal(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4 text-gray-400" />
                                  </button>
                                  <button
                                    className="p-1 hover:bg-red-50 rounded"
                                    onClick={() => handleDeleteSetting(setting.id)}
                                  >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-3">{setting.content}</p>
                              {setting.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {setting.tags.map((tag, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardBody className="py-12 text-center">
                  <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">还没有设定，点击上方按钮添加</p>
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {/* 章节列表 */}
        {activeTab === "chapters" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">章节列表</h2>
              <Button onClick={handleCreateChapter}>
                <Plus className="w-5 h-5 mr-2" />
                新建章节
              </Button>
            </div>

            {chapters.length > 0 ? (
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <Card
                    key={chapter.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/novels/${novelId}/chapters/${chapter.id}`)}
                  >
                    <CardBody className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {chapter.chapterNumber}
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                          <p className="text-sm text-gray-500">
                            {chapter.wordCount.toLocaleString()} 字 · {chapter.status === "draft" ? "草稿" : "已发布"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChapter(chapter.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardBody className="py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">还没有章节，点击上方按钮创建</p>
                </CardBody>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* 设定编辑弹窗 */}
      {showSettingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingSetting ? "编辑设定" : "添加设定"}
                </h2>
                <button
                  onClick={() => {
                    setShowSettingModal(false);
                    setEditingSetting(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    设定类型
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {settingTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setSettingForm({ ...settingForm, type: type.value })}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          settingForm.type === type.value
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    名称 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="如：主角、世界观名称等"
                    value={settingForm.name}
                    onChange={(e) => setSettingForm({ ...settingForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    内容 <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="详细描述设定内容..."
                    value={settingForm.content}
                    onChange={(e) => setSettingForm({ ...settingForm, content: e.target.value })}
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    标签（用逗号分隔）
                  </label>
                  <Input
                    placeholder="如：主角, 男性, 成长"
                    value={settingForm.tags}
                    onChange={(e) => setSettingForm({ ...settingForm, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setShowSettingModal(false)}>
                  取消
                </Button>
                <Button
                  onClick={handleSaveSetting}
                  disabled={!settingForm.name.trim() || !settingForm.content.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  <Save className="w-5 h-5 mr-2" />
                  保存
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </MainLayout>
  );
}

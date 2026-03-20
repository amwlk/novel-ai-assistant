"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { novelApi, chapterApi, settingApi, aiApi, Novel, Chapter, Setting } from "@/lib/api";
import { Button, Card, CardBody, Textarea } from "@/components/ui";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Settings,
  ChevronRight,
  Wand2,
  FileText,
  BookOpen,
  X,
  Loader2,
  ChevronDown,
  Send,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";

export default function ChapterEditorPage() {
  const router = useRouter();
  const params = useParams();
  const novelId = params.id as string;
  const { isAuthenticated } = useAuthStore();

  const [novel, setNovel] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, novelId, router]);

  useEffect(() => {
    setWordCount(content.length);
  }, [content]);

  const fetchData = async () => {
    try {
      const [novelRes, chaptersRes, settingsRes] = await Promise.all([
        novelApi.getById(novelId),
        chapterApi.getAll({ novelId, pageSize: 100 }),
        settingApi.getAll({ novelId }),
      ]);
      setNovel(novelRes.data.data);
      setChapters(chaptersRes.data.data || []);
      setSettings(settingsRes.data.data || []);

      if (chaptersRes.data.data?.length > 0) {
        selectChapter(chaptersRes.data.data[0]);
      }
    } catch (error) {
      console.error("获取数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectChapter = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    setTitle(chapter.title);
    setContent(chapter.content || "");
  };

  const handleSave = async () => {
    if (!currentChapter) return;
    setSaving(true);
    try {
      await chapterApi.update(currentChapter.id, {
        title,
        content,
      });
      setChapters(
        chapters.map((c) =>
          c.id === currentChapter.id
            ? { ...c, title, content, wordCount: content.length }
            : c
        )
      );
    } catch (error) {
      console.error("保存失败:", error);
    } finally {
      setSaving(false);
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
      const newChapter = res.data.data;
      setChapters([...chapters, newChapter]);
      selectChapter(newChapter);
    } catch (error) {
      console.error("创建章节失败:", error);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() || aiGenerating) return;
    setAiGenerating(true);
    setAiResult("");

    try {
      const res = await aiApi.generate({
        novelId,
        prompt: aiPrompt,
        temperature: 0.7,
        maxTokens: 3000,
      });
      setAiResult(res.data.data.content);
    } catch (error) {
      console.error("AI生成失败:", error);
      setAiResult("生成失败，请重试");
    } finally {
      setAiGenerating(false);
    }
  };

  const handlePolish = async () => {
    if (!content.trim() || aiGenerating) return;
    setAiGenerating(true);
    setAiResult("");

    try {
      const res = await aiApi.polish({
        text: content,
        removeAI: true,
        unifyStyle: true,
      });
      setAiResult(res.data.data.polished);
    } catch (error) {
      console.error("润色失败:", error);
      setAiResult("润色失败，请重试");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleContinue = async () => {
    if (!currentChapter || aiGenerating) return;
    setAiGenerating(true);
    setAiResult("");

    try {
      const res = await aiApi.continue({
        chapterId: currentChapter.id,
        prompt: "请续写接下来的情节",
        suggestions: 1,
      });
      if (res.data.data.suggestions?.[0]) {
        setAiResult(res.data.data.suggestions[0]);
      }
    } catch (error) {
      console.error("续写失败:", error);
      setAiResult("续写失败，请重试");
    } finally {
      setAiGenerating(false);
    }
  };

  const insertAIResult = () => {
    if (!aiResult) return;
    setContent((prev) => prev + "\n\n" + aiResult);
    setShowAIPanel(false);
    setAiResult("");
    setAiPrompt("");
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const settingGroups = settings.reduce((acc, s) => {
    if (!acc[s.type]) acc[s.type] = [];
    acc[s.type].push(s);
    return acc;
  }, {} as Record<string, Setting[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 左侧边栏 - 章节列表 */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/novels/${novelId}`)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="font-medium text-gray-900 truncate flex-1 mx-2">
              {novel?.title}
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-gray-100 rounded lg:hidden"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2">
          <div className="space-y-1">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => selectChapter(chapter)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentChapter?.id === chapter.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">#{chapter.chapterNumber}</span>
                  <span className="truncate">{chapter.title}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {chapter.wordCount.toLocaleString()} 字
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-gray-200">
          <Button
            variant="secondary"
            className="w-full"
            size="sm"
            onClick={handleCreateChapter}
          >
            <FileText className="w-4 h-4 mr-2" />
            新建章节
          </Button>
        </div>
      </div>

      {/* 主编辑区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部工具栏 */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <BookOpen className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium text-gray-900 bg-transparent border-none outline-none"
              placeholder="章节标题"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{wordCount.toLocaleString()} 字</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSettingsPanelOpen(!settingsPanelOpen)}
            >
              <Settings className="w-4 h-4 mr-2" />
              设定
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowAIPanel(true)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI助手
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
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

        {/* 编辑器 */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="开始创作..."
              className="w-full h-full resize-none border-none outline-none text-gray-700 leading-relaxed text-lg"
              style={{ fontFamily: "system-ui, sans-serif" }}
            />
          </div>

          {/* 设定面板 */}
          {settingsPanelOpen && (
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">设定参考</h3>
                <button
                  onClick={() => setSettingsPanelOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {Object.entries(settingGroups).map(([type, items]) => (
                  <div key={type}>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">{type}</h4>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-gray-50 rounded-lg text-sm"
                        >
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <p className="text-gray-600 mt-1 line-clamp-3">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {settings.length === 0 && (
                  <p className="text-center text-gray-400 py-8">暂无设定</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI助手面板 */}
      {showAIPanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardBody className="p-0">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-medium text-gray-900">AI创作助手</h3>
                </div>
                <button
                  onClick={() => {
                    setShowAIPanel(false);
                    setAiResult("");
                    setAiPrompt("");
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-4">
                {/* 快捷操作 */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleContinue}
                    disabled={aiGenerating}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    续写
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handlePolish}
                    disabled={aiGenerating || !content.trim()}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    润色
                  </Button>
                </div>

                {/* 自定义提示 */}
                <div className="mb-4">
                  <Textarea
                    placeholder="输入您的创作需求，如：描写主角与反派对峙的场景..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={handleAIGenerate}
                      disabled={aiGenerating || !aiPrompt.trim()}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      {aiGenerating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      生成
                    </Button>
                  </div>
                </div>

                {/* AI结果 */}
                {aiResult && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-80 overflow-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">生成结果</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(aiResult)}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{aiResult}</p>
                  </div>
                )}

                {aiGenerating && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    <span className="ml-3 text-gray-500">AI正在创作中...</span>
                  </div>
                )}

                {aiResult && (
                  <div className="flex justify-end mt-4">
                    <Button onClick={insertAIResult}>
                      <ChevronRight className="w-4 h-4 mr-2" />
                      插入到正文
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

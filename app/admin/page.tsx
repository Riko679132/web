"use client";

import { FormEvent, useEffect, useState } from "react";

export default function AdminPage() {
  const [inputValue, setInputValue] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // 页面加载时读取当前值
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/counter");
        const data = await res.json();
        setInputValue(String(data.value));
      } catch (err) {
        showToast("error", "读取失败");
      }
    };
    load();
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const num = Number(inputValue);
    if (Number.isNaN(num)) {
      showToast("error", "请输入有效数字");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/counter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: num }),
      });
      if (!res.ok) throw new Error("保存失败");
      showToast("success", "保存成功！");
    } catch (err) {
      showToast("error", "保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-10">
        <h1 className="text-2xl font-semibold text-slate-700 mb-2">
          后台管理
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          修改首页显示的数字
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              数字值
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="请输入数字"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "保存中..." : "保存"}
          </button>
        </form>

        <p className="mt-8 text-xs text-slate-400 text-center">
          <a href="/" className="text-indigo-500 hover:underline">
            ← 返回首页
          </a>
        </p>
      </div>

      {/* Toast 提示 */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
            toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}

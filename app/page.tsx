"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCounter = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/counter");
      const data = await res.json();
      setValue(data.value);
    } catch (err) {
      console.error("Failed to fetch counter:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-10 text-center">
        <h1 className="text-2xl font-semibold text-slate-700 mb-2">
          当前数字
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          数据从后端 API 动态读取
        </p>

        <div className="text-8xl font-bold text-indigo-600 mb-10 tabular-nums">
          {loading ? "…" : value}
        </div>

        <button
          onClick={fetchCounter}
          className="px-6 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition-colors"
        >
          刷新
        </button>

        <p className="mt-8 text-xs text-slate-400">
          前往{" "}
          <a href="/admin" className="text-indigo-500 hover:underline">
            /admin
          </a>{" "}
          修改数字
        </p>
      </div>
    </main>
  );
}

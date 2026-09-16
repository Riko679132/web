import fs from "fs";
import path from "path";

// 用本地 JSON 文件模拟数据库，便于本地零配置体验完整流程
// 生产环境建议替换为 Supabase / Vercel KV / MongoDB 等
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "counter.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ value: 1 }, null, 2));
  }
}

export async function getCounter(): Promise<number> {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const data = JSON.parse(raw);
  return data.value ?? 1;
}

export async function setCounter(value: number): Promise<number> {
  ensureDataFile();
  const safeValue = Math.floor(value); // 确保是整数
  fs.writeFileSync(DATA_FILE, JSON.stringify({ value: safeValue }, null, 2));
  return safeValue;
}

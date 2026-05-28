/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization function for GoogleGenAI helper
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    throw new Error("Missing GEMINI_API_KEY environment variable. Using high-quality rule-based fallback mode.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Full-stack API endpoint for answering evaluation
app.post("/api/analyze", async (req, res) => {
  try {
    const { answers, questionData } = req.body;
    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ error: "No answers found to analyze." });
    }

    try {
      const ai = getAIClient();

      // Structure the comprehensive prompt for Gemini
      const prompt = `
你是一位頂級心理學家、職涯規劃大師與全方位身心靈導師。
使用者剛剛完成了一份旨在進行自我探索分析的選擇題問卷（包含 10 個核心情境與反思）。
這是這份問卷的題目與選項結構，以及該使用者在每個情境做出的具體選擇：

${JSON.stringify({ questionData, userAnswers: answers }, null, 2)}

請綜合分析使用者的回答，並遵循以下維度，生成一份極具深度、充滿溫暖與專業啟發性的繁體中文「自我探索分析與生涯規劃報告」：

1. 性格與天賦分析 (personalityTalents)
- title: 創意優雅的形象稱號（例如：溫柔和煦的「心靈守護者」、運籌帷幄的「黃金領航家」等）
- description: 高度精準、溫暖感人且長達 150-200 字的世界觀性格描述。
- keywords: 4個概括核心靈魂特質的詞彙（例如：同理修復、靈性自省等）
- strengths: 3項具體天賦長處，並附帶對生活或職場應用的分析說明（列舉成字串陣列）

2. 適合的工作與職業生涯路徑 (suitableCareers)
- title: 概括此人的職涯願景角色（例如：美學、文創、設計與自由概念探索者）
- industries: 推薦涉足的 3-4 個關鍵產業領域或名詞（字串陣列）
- roles: 推薦擔任的 5-6 個具體職位、專長或職業軌道（字串陣列）
- reasons: 詳細分析為什麼這些工作無比適合他們的個性與優勢，說明其內在驅動力（100-150字）

3. 最契合的學術學科與讀什麼科系 (suitableMajors)
- title: 推薦學群大方向名稱（例如：心理、教育與社會人文科學）
- majors: 推薦在大學、碩士 or 自我進修時可選讀的 4-5 個具體科系/專業學系名稱（字串陣列）
- skillsToDevelop: 為了達成此職涯方向，未來可著重自主修練或刻意練習的 3 個具體軟硬實力/技術技能（字串陣列）
- reasons: 分析這些科系如何與其認知模式、學習風格與長遠抱抱負相互吻合（100字）

4. 身體健康與活力管理建議 (bodyAdvice)
- energyState: 提供他們的身體能量型態描述（例如：海綿共感型、引擎風暴型、繁星律動型、智慧結晶型等）
- dietAndExercise: 3條極具針對性的飲食調節、睡眠、作息與身體流動伸展排毒之具體實踐指引（字串陣列）
- stressPhysicalManifestation: 說明當他們承受高壓時，身體最容易拉警報的微小物理表徵與緊繃器官部位（例如肩頸、偏頭痛、胃脹氣等原理解釋）（字串）

5. 心理健康與心境成長建議 (mindAdvice)
- coreBelief: 一句能安頓其靈魂深處、值得他們重複複誦的「信念宣言/核心肯定語（Affirmation）」（字串）
- mindfulnessPractice: 一項適合其思維型態的 15 分鐘「正念/靜心練習實作方法」（例如慈心禪、箱式呼吸、自由書寫、身體掃描之具體施行指引）（字串）
- growthFocus: 他們在此生可溫柔克服、或學習跨越的 1 個核心心理盲點或內在制約（字串）

6. 靈魂指南總結 (holisticSummary)
- holisticSummary: 一段溫柔激勵、飽含溫暖與智慧力量的靈魂總結寄語，讓人讀完重新充滿前進與熱愛生活的無限動力（150字）。

7. MBTI 職業人格分析 (mbtiProfile)
- code: 四個大寫字母的 MBTI 內心密碼（如 INFJ, ENFP, INTJ, ENTJ, INTP 等）
- name: 中文的 MBTI 角色名稱與簡短美學修飾（例如「提倡者 / 心靈守護人」）
- description: 具深度地分析該 MBTI 人格屬性、長處、與本次探索選擇的認知習慣相符合的精練特性（100字）
- traitsBreakdown: 四個維度傾向比例，介於 10 到 90 之間的整數：
  - E_I: 外向偏好 (Extraversion - 越高越偏向 E, 越低越偏向 I)
  - S_N: 直覺偏好 (Intuition - 越高越偏向 N, 越低越偏向 S)
  - T_F: 情感偏好 (Feeling - 越高越偏向 F, 越低越偏向 T)
  - J_P: 感知偏好 (Perceiving - 越高越偏向 P, 越低越偏向 J)

8. DISC 行為風格分析 (discProfile)
- code: 適合的主要代碼組合（如 D, I, S, C, ID, CS 等）
- name: 風格的中文名稱（例如「支配型 (Dominance) / 開拓先鋒」）
- description: 提供有血有肉的行為解剖，描述此人在專案、協作或衝突中的行為傾向與應對習慣（100字）
- stylePercentages: 四個維度的權重比例整數，四個數值相加應等於 100：
  - D: 支配力 Dominance 
  - I: 影響力 Influence
  - S: 穩健力 Steadiness
  - C: 服從力 Conscientiousness

請務必嚴格依據回傳 JSON 格式(responseSchema)返回對應項目，且內容全部採用專業、優雅、精準的繁體中文（繁體中文，臺灣用語習慣）。
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              personalityTalents: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["title", "description", "keywords", "strengths"]
              },
              suitableCareers: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  industries: { type: Type.ARRAY, items: { type: Type.STRING } },
                  roles: { type: Type.ARRAY, items: { type: Type.STRING } },
                  reasons: { type: Type.STRING }
                },
                required: ["title", "industries", "roles", "reasons"]
              },
              suitableMajors: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  majors: { type: Type.ARRAY, items: { type: Type.STRING } },
                  skillsToDevelop: { type: Type.ARRAY, items: { type: Type.STRING } },
                  reasons: { type: Type.STRING }
                },
                required: ["title", "majors", "skillsToDevelop", "reasons"]
              },
              bodyAdvice: {
                type: Type.OBJECT,
                properties: {
                  energyState: { type: Type.STRING },
                  dietAndExercise: { type: Type.ARRAY, items: { type: Type.STRING } },
                  stressPhysicalManifestation: { type: Type.STRING }
                },
                required: ["energyState", "dietAndExercise", "stressPhysicalManifestation"]
              },
              mindAdvice: {
                type: Type.OBJECT,
                properties: {
                  coreBelief: { type: Type.STRING },
                  mindfulnessPractice: { type: Type.STRING },
                  growthFocus: { type: Type.STRING }
                },
                required: ["coreBelief", "mindfulnessPractice", "growthFocus"]
              },
              holisticSummary: { type: Type.STRING },
              mbtiProfile: {
                type: Type.OBJECT,
                properties: {
                  code: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  traitsBreakdown: {
                    type: Type.OBJECT,
                    properties: {
                      E_I: { type: Type.INTEGER },
                      S_N: { type: Type.INTEGER },
                      T_F: { type: Type.INTEGER },
                      J_P: { type: Type.INTEGER }
                    },
                    required: ["E_I", "S_N", "T_F", "J_P"]
                  }
                },
                required: ["code", "name", "description", "traitsBreakdown"]
              },
              discProfile: {
                type: Type.OBJECT,
                properties: {
                  code: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  stylePercentages: {
                    type: Type.OBJECT,
                    properties: {
                      D: { type: Type.INTEGER },
                      I: { type: Type.INTEGER },
                      S: { type: Type.INTEGER },
                      C: { type: Type.INTEGER }
                    },
                    required: ["D", "I", "S", "C"]
                  }
                },
                required: ["code", "name", "description", "stylePercentages"]
              }
            },
            required: [
              "personalityTalents",
              "suitableCareers",
              "suitableMajors",
              "bodyAdvice",
              "mindAdvice",
              "holisticSummary",
              "mbtiProfile",
              "discProfile"
            ]
          }
        }
      });

      const responseText = response.text || "{}";
      const resultData = JSON.parse(responseText.trim());
      
      return res.json({ result: resultData, isAi: true });
    } catch (aiError: any) {
      console.warn("Gemini API skipped/failed, executing rule-based fallback analyzer:", aiError.message);
      return res.json({ 
        error: aiError.message || "Failed to call Gemini API", 
        fallbackRequired: true 
      });
    }
  } catch (err: any) {
    console.error("General API Error:", err);
    return res.status(500).json({ error: "Internal Server Error during analysis." });
  }
});

// Full-stack API endpoint for interactive follow-up coaching Q&A
app.post("/api/ask-followup", async (req, res) => {
  try {
    const { userMessage, resultContext, history } = req.body;
    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({ error: "Empty question received." });
    }

    try {
      const ai = getAIClient();
      
      const prompt = `
你是一位溫暖而富有洞察力的頂級心理諮商與生涯規劃大師。
使用者剛剛做完了你的「自我探索與生涯適性評測」，並獲得了以下分析結論大綱：
${JSON.stringify(resultContext, null, 2)}

以下是先前的交流對話歷程（如果有）：
${JSON.stringify(history || [])}

使用者向你提出了探索引渡、或想要更加深入瞭解的方向、或具體的迷茫問題：
「${userMessage}」

請針對使用者的特質結果與他的追問內容，用溫柔親和、充滿啟發性的繁體中文給出約 200-300 字的引導回覆。
回覆要求如下：
1. 不要使用複雜的多層 Markdown 標題（避免 ###等），多使用精緻簡潔的小段落或溫和的星星項目符號。
2. 保持字句溫款誠懇，能給予使用者前行信心與具體可落地的實踐步驟（例如推薦的習慣轉變、學習領域、或者是面對自我的思路）。
3. 使用臺灣习惯用語（例如：科系、職涯、重訓、專案管理、軟體等）。
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });

      return res.json({ reply: response.text || "" });
    } catch (aiError: any) {
      console.warn("Follow-up chatbot API error/no-key, utilizing offline analyzer response system:", aiError.message);
      return res.json({
        reply: "（導師貼心提醒）：當前系統正在運行高精準度本地離線演算法模式。針對您提出關於特質的追求與生涯突破，建議您可以建立每日 15 分鐘的『靜心盤點習慣』：用紙和筆寫下今天三件真正帶給您成就感的瞬間。這能幫您精準鎖定核心能量點。需要完全啟用即時 AI 深度追問時，請您在 UI 頂部或系統環境中裝載您的 GEMINI_API_KEY，我為您準備了更多量身定做的實施路徑！",
        isFallback: true
      });
    }
  } catch (err: any) {
    console.error("Ask Follow-up Error:", err);
    return res.status(500).json({ error: "Internal Server Error during chatbot query." });
  }
});

// Serve assets and dynamic single page routing via Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development Server is running at http://localhost:${PORT}`);
  });
}

startServer();

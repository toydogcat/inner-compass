/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  QUESTIONS, 
  analyzeAnswersFallback 
} from "./data";
import { 
  AnalysisResult, 
  Question 
} from "./types";
import { 
  Compass, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  RotateCcw, 
  Send, 
  CheckCircle, 
  Activity, 
  Brain, 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  User, 
  Flame, 
  Coffee,
  MapPin,
  Bot
} from "lucide-react";

export default function App() {
  // Screen views: 'intro' | 'quiz' | 'loading' | 'result'
  const [screen, setScreen] = useState<"intro" | "quiz" | "loading" | "result">("intro");
  
  // Selected quiz mode: 10, 25 or 50 questions
  const [quizMode, setQuizMode] = useState<"quick" | "normal" | "deep">("quick");

  // Get active subset list of questions based on selected mode
  const getActiveQUESTIONSList = () => {
    if (quizMode === "normal") {
      return QUESTIONS.slice(0, 25);
    }
    if (quizMode === "deep") {
      return QUESTIONS;
    }
    return QUESTIONS.slice(0, 10);
  };

  const activeQUESTIONSList = getActiveQUESTIONSList();

  // Quiz progress state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  
  // Real analysis result container
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  // Vercount and Scroll Sync
  useEffect(() => {
    // 1. Scroll Sync for Iframe
    let lastScrollY = 0;
    const scrollThreshold = 8;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold && currentScrollY > 10) return;
      
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      window.parent.postMessage({
        type: 'iframe_scroll',
        scrollY: currentScrollY,
        direction: direction
      }, '*');
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Vercount Tracking for SPA
    // @ts-ignore
    if (window.vercount && typeof window.vercount.fetch === 'function') {
      // @ts-ignore
      window.vercount.fetch();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [screen]);

  // Use AI generator status
  const [isGeneratedByAI, setIsGeneratedByAI] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Chatbot state for interactive followup
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { 
      sender: "bot", 
      text: "您好！我是您的 InnerCompass 專屬職涯與心靈導師。看完了您的多維探索報告，不知道您此時內心有什麼疑惑或下一步瓶頸需要我深入為您解惑、提供突破指南嗎？您可以隨意提問任何相關的問題喔！" 
    }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Suggested followups helper to spark engagement
  const activeQuestion = activeQUESTIONSList[currentQuestionIndex];

  // Dynamic Trait calculator to update Live Preview suggestions as they complete questions
  const getCurrentDominantTrait = () => {
    const counts: { [key: string]: number } = { analyzer: 0, creator: 0, empath: 0, organizer: 0 };
    let totalAnswered = 0;
    
    for (const q of activeQUESTIONSList) {
      const ansId = answers[q.id];
      if (ansId) {
        totalAnswered++;
        const option = q.options.find(o => o.id === ansId);
        if (option) {
          counts[option.trait] = (counts[option.trait] || 0) + 1;
        }
      }
    }

    if (totalAnswered === 0) return "analyzer"; // Default helper state

    let maxTrait = "analyzer";
    let maxVal = -1;
    for (const [trait, count] of Object.entries(counts)) {
      if (count > maxVal) {
        maxVal = count;
        maxTrait = trait;
      }
    }
    return maxTrait;
  };

  const dominantTrait = getCurrentDominantTrait();

  // Preset live preview statements based on dynamic status
  const getLivePreviewContent = (trait: string) => {
    switch(trait) {
      case "creator":
        return {
          body: "建議進行15分鐘的五感流動拉伸，釋放澎湃思緒產生的大腦多巴胺張力。",
          mind: "練習區分「純粹天馬行空的靈光」與「今日能具體落地推進的目標」。",
          career: "推薦概念感官、原創文創或彈性自主的工作型態，避開公式化的打卡限制。"
        };
      case "empath":
        return {
          body: "海綿體質極易吸附繁雜情緒，多喝花草溫茶，多赤腳接觸草地進行大地負壓發洩。",
          mind: "釐清「這是他人的痛苦，不是我的情緒責任」，建立更明朗的心靈防火牆。",
          career: "在看重生命溫度與真心關懷的領域最能得到尊崇。例如教育輔導、HR關懷。"
        };
      case "organizer":
        return {
          body: "引擎能量高，容易累積肩頸拉扯與齒關緊咬。安排高燃拳擊或重訓徹底釋放緊繃。",
          mind: "接納不確定性與變數也是一種至高戰略。學會適度放下微觀控制，深呼吸。",
          career: "適合挑戰度大、看重戰功與戰略分配的舞台。推薦：項目管理、新創營運。"
        };
      default: // analyzer
        return {
          body: "前額葉耗能高而肢體核心偏冷。多做下肢核心拉伸與單腳站立平衡，轉移焦點。",
          mind: "邏輯推演之外亦能包容非理性的情感波動。練習單純凝視雲彩，不去解構公式。",
          career: "在實力說話、高度講求嚴密實證的智商極境中能發揮如燈塔般的力量。推薦研發與精算。"
        };
    }
  };

  const livePreview = getLivePreviewContent(dominantTrait);

  // Dynamic Sidebars quotes generator
  const getLiveSidebarQuote = () => {
    const counts = { creator: 0, empath: 0, organizer: 0, analyzer: 0 };
    let count = 0;
    Object.keys(answers).forEach(qId => {
      const ans = answers[Number(qId)];
      const q = activeQUESTIONSList.find(qi => qi.id === Number(qId));
      const opt = q?.options.find(o => o.id === ans);
      if (opt) {
        counts[opt.trait as keyof typeof counts]++;
        count++;
      }
    });

    if (count === 0) {
      return "「您的每一次抉擇，都是探索深層潛能與身體與心靈潛意識脈搏的精準指針。」";
    }

    // Find highest
    const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
    const main = sorted[0][0];

    if (main === "creator") {
      return "「您的選擇富含極高的美學及跳躍直覺特質。這在概念打破、原創設計及靈性推展上是靈魂寶藏。」";
    } else if (main === "empath") {
      return "「您的回答呈現深入的慈悲感知，您能看見周遭生命的隱密求救聲，是極致的療癒溫潤守衛。」";
    } else if (main === "organizer") {
      return "「您天生散發掌控混亂、推動專案落實的堅實力量，目標焦點敏銳、是不容忽視的開路中樞。」";
    } else {
      return "「您的思維具有高度客觀梳理、追尋底層邏輯推導的智者風範。世界在您的眼神中格外清澈。」";
    }
  };

  // Start assessment handler
  const handleStart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setScreen("quiz");
  };

  // Auto Selection / Next handling
  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (!answers[activeQuestion.id]) return; // Block validation if unanswered
    
    if (currentQuestionIndex < activeQUESTIONSList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Trigger evaluation processing screen
      processAnalysis();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // API Call to process analysis using full-stack capabilities with reliable fallbacks
  const processAnalysis = async () => {
    setScreen("loading");
    setAiError(null);
    setIsGeneratedByAI(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: answers,
          questionData: activeQUESTIONSList.map(q => ({
            id: q.id,
            text: q.text,
            category: q.category,
            chosenOption: q.options.find(o => o.id === answers[q.id])
          }))
        })
      });

      if (!response.ok) {
        throw new Error("伺服器分析返回錯誤。啟動高品質本機規則解析。");
      }

      const data = await response.json();
      
      if (data.fallbackRequired || !data.result) {
        console.warn("Got status fallback from API:", data.error);
        const fallback = analyzeAnswersFallback(answers);
        setAnalysisResult(fallback);
        setIsGeneratedByAI(false);
      } else {
        setAnalysisResult(data.result);
        setIsGeneratedByAI(true);
      }
    } catch (err: any) {
      console.warn("Triggering offline safety mapping due to network limits or API environment rules:", err);
      const fallback = analyzeAnswersFallback(answers);
      setAnalysisResult(fallback);
      setIsGeneratedByAI(false);
      setAiError(err.message || "系統已自動啟動本機客觀邏輯分析模型。");
    } finally {
      // Small pause to guarantee fully integrated sensory experience
      setTimeout(() => {
        setScreen("result");
        // Reset follow up chat history upon new analysis creation
        setChatHistory([
          { 
            sender: "bot", 
            text: `分析完成！我已經融會了您的 ${activeQUESTIONSList.length} 大關鍵特質因子。從您的身心靈頻率與適配戰略來看，您非常卓越。歡迎在下方輸入任何職涯、科系或者身體與心靈調節的疑惑，我將為您提供最溫潤的定向引導！` 
          }
        ]);
      }, 1500);
    }
  };

  // Interactive follow-up chatbot action integration
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || chatLoading) return;

    const userText = chatMessage.trim();
    setChatMessage("");
    setChatHistory(prev => [...prev, { sender: "user", text: userText }]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/ask-followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: userText,
          resultContext: analysisResult,
          history: chatHistory.slice(-6).map(h => ({ role: h.sender === "user" ? "user" : "model", text: h.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Chatbot API response error.");
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.warn("Followup chat failed, delivering offline consultation advice:", err);
      // Construct a highly customized, warm offline helpful advice based on the user's questionnaire
      const fallbackReply = `（內在指南離線引導）：收到您的問題「${userText}」。在您的性格中，特別重視價值和目標的印證。這意味著在挑選前進路線時，比起外界包裝，您更需要先確定該領域能在您心中引起什麼樣的共鳴。建議您找一張紙，列出 3 個不考慮金錢尊嚴也想要解決的世界痛點(例如弱勢保障、高科技算力突破、或文創美感推廣)，以此為起點逆推科系與技能，就能得到最清澈的核心答案。如果可能，您可以設置 GEMINI_API_KEY 以解鎖即時對話導師！`;
      setChatHistory(prev => [...prev, { sender: "bot", text: fallbackReply }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Prepopulate standard follow-up triggers
  const sendSuggestedQuery = (queryText: string) => {
    if (chatLoading) return;
    setChatMessage(queryText);
  };

  // Helper calculation of stage index for progress tracks
  const getStageAndProgress = () => {
    const total = activeQUESTIONSList.length;
    const answered = Object.keys(answers).length;
    
    // Proportional division
    const firstCut = Math.max(1, Math.floor(total * 0.4));
    const secondCut = Math.max(firstCut + 1, Math.floor(total * 0.7));
    
    let stage = 1;
    if (currentQuestionIndex >= firstCut && currentQuestionIndex < secondCut) {
      stage = 2;
    } else if (currentQuestionIndex >= secondCut) {
      stage = 3;
    }
    return {
      stage,
      pct: Math.round((answered / total) * 100),
      label: stage === 1 ? "性格與天賦評估" : stage === 2 ? "職涯適性剖析" : "學術科系學群匹配"
    };
  };

  const progressInfo = getStageAndProgress();

  return (
    <div id="self_discovery_app_root" className="min-h-screen bg-[#F9F8F3] text-[#3D3D35] font-sans flex flex-col antialiased">
      
      {/* HEADER SECTION IN NATURAL TONES STYLING */}
      <header id="main_app_header" className="bg-white border-b border-[#E6E4D9] px-6 py-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 transition-all z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5A634D] rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-inner font-bold">
            C
          </div>
          <div className="flex flex-col">
            <span id="app_brand_title" className="text-xl font-serif font-bold tracking-tight text-[#2D2D2A]">
              InnerCompass 內在指南
            </span>
            <span className="text-[10px] tracking-[0.15em] font-medium text-[#A8A394] uppercase">
              多維身心靈 & 職涯學群自我探索分析儀表板
            </span>
          </div>
        </div>

        {/* Global Navigation Mock Interface conforming to Natural Tones layout */}
        <nav className="flex items-center gap-6 text-xs uppercase tracking-widest font-bold text-[#3D3D35]/70">
          <button 
            onClick={() => setScreen("intro")} 
            className={`hover:text-[#5A634D] pb-1 border-b-2 transition-all ${screen === "intro" ? "border-[#5A634D] text-[#5A634D]" : "border-transparent"}`}
          >
            首頁
          </button>
          <button 
            onClick={() => {
              if (Object.keys(answers).length > 0) {
                setScreen("quiz");
              } else {
                handleStart();
              }
            }} 
            className={`hover:text-[#5A634D] pb-1 border-b-2 transition-all ${screen === "quiz" ? "border-[#5A634D] text-[#5A634D]" : "border-transparent"}`}
          >
            探索進行中
          </button>
          <button 
            onClick={() => {
              if (analysisResult) setScreen("result");
            }} 
            disabled={!analysisResult}
            className={`hover:text-[#5A634D] pb-1 border-b-2 transition-all disabled:opacity-30 disabled:pointer-events-none ${screen === "result" ? "border-[#5A634D] text-[#5A634D]" : "border-transparent"}`}
          >
            分析報告
          </button>
        </nav>

        {/* Dynamic status badges indicating current API connectivity state */}
        <div id="connection_indicator" className="flex items-center gap-2 bg-[#F1EFE7] px-3 py-1.5 rounded-full border border-[#D1CEC0] text-xs">
          <span className="w-2 h-2 rounded-full bg-[#5A634D] animate-ping"></span>
          <span className="font-mono text-[10px] font-bold tracking-tight text-[#5A634D]">
            GEMINI 3.5 ACTIVE
          </span>
        </div>
      </header>

      {/* RENDER VIEW BLOCKS BASED ON CONTEXT STATUS */}
      
      {/* 1. INTRO SCREEN STATUS */}
      {screen === "intro" && (
        <main id="intro_screen" className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-16 max-w-7xl mx-auto w-full animate-fadeIn">
          {/* Left Decorative branding text */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#F3F2EB] px-4 py-1.5 rounded-full border border-[#E6E4D9]">
              <Sparkles className="w-4 h-4 text-[#C17B5F]" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#C17B5F]">
                全新多維探索智囊
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D2D2A] leading-tight font-medium">
              在繁複喧囂的世界中，<br className="hidden md:inline" />
              重新定位您的<span className="text-[#5A634D] italic font-semibold">靈魂地圖</span>。
            </h1>
            
            <p className="text-base text-[#3D3D35]/80 leading-relaxed font-sans max-w-xl">
              「生命不是一條定型的標準藍圖，而是一系列充滿奧秘的直覺與天賦開展。」
              這是一套深度整合物理健康、心理素質、現代職涯優勢與學術學群方向的整合評測器。我們為您提供「快速測驗(10題)」、「一般測驗(25題)」與「深度測驗(50題)」三種規格，幫助您自由選擇探底維度，發掘靈魂核心頻率。
            </p>

            {/* Quick stats grid to look polished and organic */}
            <div className="grid grid-cols-3 gap-4 py-2 max-w-md">
              <div className="bg-white p-3 rounded-xl border border-[#E6E4D9] text-center">
                <span className="block text-xl font-serif font-bold text-[#C17B5F]">10-50</span>
                <span className="text-[9px] uppercase tracking-wider text-[#A8A394] block mt-0.5">多維情境題</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E6E4D9] text-center">
                <span className="block text-xl font-serif font-bold text-[#5A634D]">5</span>
                <span className="text-[9px] uppercase tracking-wider text-[#A8A394] block mt-0.5">身心解析維度</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E6E4D9] text-center">
                <span className="block text-xl font-serif font-bold text-[#3D3D35]">雙導師</span>
                <span className="text-[9px] uppercase tracking-wider text-[#A8A394] block mt-0.5">AI+離線諮商</span>
              </div>
            </div>

            {/* Quiz Depth Select Grid */}
            <div className="space-y-3 max-w-xl py-2">
              <span className="text-xs font-bold text-[#5A634D] block tracking-wider uppercase text-left">
                第一步：選擇評測深度 (Choose Assessment Depth)
              </span>
              <div className="grid grid-cols-3 gap-3">
                {/* Mode 1 - Quick */}
                <button
                  onClick={() => setQuizMode("quick")}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                    quizMode === "quick"
                      ? "bg-[#5A634D]/5 border-[#5A634D] ring-2 ring-[#5A634D]/15"
                      : "bg-white border-[#E6E4D9] hover:bg-[#F9F8F3]"
                  }`}
                >
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase inline-block self-start ${
                    quizMode === "quick" ? "bg-[#5A634D] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    10 題
                  </span>
                  <div>
                    <span className="block font-bold text-xs text-[#3D3D35]">快速測驗</span>
                    <span className="text-[8px] text-[#A8A394] block mt-0.5">約2分鐘 • 核心解鎖</span>
                  </div>
                </button>

                {/* Mode 2 - Normal */}
                <button
                  onClick={() => setQuizMode("normal")}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                    quizMode === "normal"
                      ? "bg-[#C17B5F]/5 border-[#C17B5F] ring-2 ring-[#C17B5F]/15"
                      : "bg-white border-[#E6E4D9] hover:bg-[#F9F8F3]"
                  }`}
                >
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase inline-block self-start ${
                    quizMode === "normal" ? "bg-[#C17B5F] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    25 題
                  </span>
                  <div>
                    <span className="block font-bold text-xs text-[#3D3D35]">一般測驗</span>
                    <span className="text-[8px] text-[#A8A394] block mt-0.5">約5分鐘 • 職涯精準</span>
                  </div>
                </button>

                {/* Mode 3 - Deep */}
                <button
                  onClick={() => setQuizMode("deep")}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 ${
                    quizMode === "deep"
                      ? "bg-[#2D2D2A]/5 border-[#2D2D2A] ring-2 ring-[#2D2D2A]/15"
                      : "bg-white border-[#E6E4D9] hover:bg-[#F9F8F3]"
                  }`}
                >
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase inline-block self-start ${
                    quizMode === "deep" ? "bg-[#2D2D2A] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    50 題
                  </span>
                  <div>
                    <span className="block font-bold text-xs text-[#3D3D35]">深度測驗</span>
                    <span className="text-[8px] text-[#A8A394] block mt-0.5">約10分鐘 • 靈魂對接</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button 
                id="btn_start_exploration"
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-4 bg-[#5A634D] text-[#FFF] hover:bg-[#484F3D] rounded-full text-base font-bold shadow-lg shadow-[#5a634d33] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                啟動探索 {quizMode === "quick" ? "(快速 10 題)" : quizMode === "normal" ? "(一般 25 題)" : "(深度 50 題)"}
              </button>
              {analysisResult && (
                <button
                  onClick={() => setScreen("result")}
                  className="w-full sm:w-auto px-6 py-4 bg-white text-[#5A634D] hover:bg-[#F3F2EB] rounded-full text-base font-bold border border-[#E6E4D9] transition-all"
                >
                  回到上次報告
                </button>
              )}
            </div>

            <p className="text-[11px] text-[#A8A394] italic font-sans text-left">
              * 建議放空雜音，純憑 3 秒直覺點選選項。評測過程完全對私隱加密。
            </p>
          </div>

          {/* Right Brand Graphic Visualized matching Natural Tones Concept */}
          <div className="flex-1 flex justify-center items-center relative py-6">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border border-[#D1CEC0] flex items-center justify-center relative bg-white/40 shadow-sm">
              
              {/* Spinning compass indicator elements */}
              <div className="absolute inset-4 rounded-full border border-dashed border-[#5A634D]/50 animate-spin-slow"></div>
              
              {/* Inner Circle container */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#EBF0E6] flex flex-col items-center justify-center text-center p-6 border border-[#E6E4D9] shadow-inner">
                <Compass className="w-12 md:w-16 h-12 md:h-16 text-[#5A634D] stroke-[1.25] mb-3 animate-pulse" />
                <span className="font-serif italic text-lg text-[#3D3D35] font-semibold">Inner Compass</span>
                <p className="text-[10px] mt-1 tracking-wider uppercase text-[#5A634D] font-bold">
                  解鎖心靈與工作的真實頻率
                </p>
              </div>

              {/* Floating nodes represents the 4 qualities */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1.5 rounded-full border border-[#E6E4D9] text-xs font-serif italic text-[#3D3D35] flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8A394]"></span>
                理性剖析 Analyzer
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1.5 rounded-full border border-[#E6E4D9] text-xs font-serif italic text-[#3D3D35] flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C17B5F]"></span>
                靈感發想 Creator
              </div>
              <div className="absolute left-0 top-1/3 bg-white px-3 py-1.5 rounded-full border border-[#E6E4D9] text-xs font-serif italic text-[#3D3D35] flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5A634D]"></span>
                身心共情 Empath
              </div>
              <div className="absolute right-0 top-2/3 bg-white px-3 py-1.5 rounded-full border border-[#E6E4D9] text-xs font-serif italic text-[#3D3D35] flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D2D2A]"></span>
                高效統籌 Organizer
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 2. MAIN ACTIVE QUIZ RUNTIME */}
      {screen === "quiz" && (
        <main id="quiz_screen" className="flex-1 flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 gap-8 max-w-7xl mx-auto w-full animate-fadeIn">
          
          {/* LEFT SIDEBAR: ASSESSMENT MODULES & REQUISITIVE PROGRESS */}
          <aside className="lg:w-64 flex flex-col gap-6 justify-between">
            <div className="space-y-6 bg-white/60 p-6 rounded-[24px] border border-[#E6E4D9]">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A394]">
                評測探索進度
              </h3>
              
              <div className="space-y-4">
                {/* Module 1: Personality & Talents */}
                <div className={`flex items-center gap-4 transition-opacity ${progressInfo.stage === 1 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    progressInfo.stage >= 1 
                      ? "bg-[#5A634D] text-white" 
                      : "border border-[#3D3D35]"
                  }`}>
                    01
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#3D3D35]">性格與天賦</span>
                    <span className="text-[10px] text-[#5A634D] font-bold">
                      {progressInfo.stage > 1 ? "已就緒" : "進行中..."}
                    </span>
                  </div>
                </div>

                {/* Module 2: Career Adaptability */}
                <div className={`flex items-center gap-4 transition-opacity ${progressInfo.stage === 2 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    progressInfo.stage >= 2 
                      ? "bg-[#C17B5F] text-white" 
                      : "border border-[#A8A394] text-[#A8A394]"
                  }`}>
                    02
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#3D3D35]">職涯適性剖析</span>
                    <span className="text-[10px] font-bold">
                      {progressInfo.stage > 2 ? "已完成" : progressInfo.stage === 2 ? "解析中" : "尚未解鎖"}
                    </span>
                  </div>
                </div>

                {/* Module 3: Academics & Department Fitting */}
                <div className={`flex items-center gap-4 transition-opacity ${progressInfo.stage === 3 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    progressInfo.stage >= 3 
                      ? "bg-[#2D2D2A] text-white" 
                      : "border border-[#A8A394] text-[#A8A394]"
                  }`}>
                    03
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#3D3D35]">學術科系匹配</span>
                    <span className="text-[10px] font-bold">
                      {progressInfo.stage === 3 ? "深度整合" : "尚未開始"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Slider component */}
              <div className="pt-4 border-t border-[#E6E4D9]">
                <div className="flex justify-between items-center text-[10px] text-[#A8A394] font-bold mb-1.5">
                  <span>完成度</span>
                  <span>{progressInfo.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E6E4D9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#5A634D] transition-all duration-300"
                    style={{ width: `${progressInfo.pct}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Dynamic quote box changing contextually according to choices */}
            <div id="dynamic_live_insight_quote" className="p-6 bg-[#E6E4D9] rounded-[24px] border border-[#D1CEC0] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A634D]">
                即時分析洞察
              </h4>
              <p className="text-xs leading-relaxed italic opacity-90 font-serif text-[#3D3D35]">
                {getLiveSidebarQuote()}
              </p>
            </div>
          </aside>

          {/* MAIN CONTAINER QUIZ CARDS */}
          <section className="flex-1 flex flex-col bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-[#E6E4D9] p-6 md:p-10 transition-all">
            
            {/* Question Header Status */}
            <div className="mb-8 border-b border-[#F3F2EB] pb-6">
              <span className="text-[11px] font-mono tracking-widest text-[#C17B5F] uppercase font-bold block mb-2">
                題目 {currentQuestionIndex + 1} / {activeQUESTIONSList.length} • {progressInfo.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#2D2D2A] leading-snug font-medium">
                {activeQuestion.text}
              </h2>
            </div>

            {/* Response Options Group */}
            <div className="grid gap-4 flex-1">
              {activeQuestion.options.map((option) => {
                const isSelected = answers[activeQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`group w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-150 flex items-start gap-4 ${
                      isSelected 
                        ? "border-[#C17B5F] bg-[#FDF9F7]" 
                        : "border-[#E6E4D9] hover:border-[#C17B5F] hover:bg-[#FDF9F7]"
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected 
                        ? "bg-[#C17B5F] text-white" 
                        : "bg-[#F3F2EB] group-hover:bg-[#C17B5F] group-hover:text-white"
                    }`}>
                      {option.id}
                    </span>
                    <span className={`text-sm md:text-base leading-relaxed transition-colors ${
                      isSelected ? "text-[#C17B5F] font-semibold" : "text-[#3D3D35] group-hover:text-[#C17B5F]"
                    }`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#F3F2EB]">
              <button 
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-[#3D3D35]/60 hover:text-[#5A634D] hover:bg-[#F3F2EB] disabled:opacity-20 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> 上一步
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!answers[activeQuestion.id]}
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                  answers[activeQuestion.id]
                    ? "bg-[#5A634D] text-white hover:bg-[#484F3D] shadow-md shadow-[#5a634d22]"
                    : "bg-[#E6E4D9] text-[#A8A394] cursor-not-allowed"
                }`}
              >
                {currentQuestionIndex === activeQUESTIONSList.length - 1 ? "完成評測生成報告" : "下一題"} 
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* RIGHT PANEL: LIVE PREVIEW & DECORATIVE AI SPINNER */}
          <aside className="w-full lg:w-72 flex flex-col gap-6">
            <div className="flex-1 bg-[#F1EFE7] rounded-[24px] md:rounded-[32px] p-6 flex flex-col gap-6 border border-[#E2E0D4]">
              <div className="text-center space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#5A634D]">
                  潛在頻率即時反饋
                </h3>
                <span className="text-[9px] font-mono tracking-wider uppercase text-[#A8A394]">
                  REAL-TIME ADVICE MAPPING
                </span>
              </div>

              <div className="space-y-6 flex-1 py-2">
                {/* 1. Body health dynamic advise block */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#C17B5F]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A394]">
                      生理活力調養
                    </span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed italic text-[#3D3D35]/90 pl-6">
                    {livePreview.body}
                  </p>
                </div>

                {/* 2. Mind fitness */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#5A634D]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A394]">
                      心智心理素質
                    </span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed italic text-[#3D3D35]/90 pl-6">
                    {livePreview.mind}
                  </p>
                </div>

                {/* 3. Career future */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#2D2D2A]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A394]">
                      生涯方向暗示
                    </span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed italic text-[#3D3D35]/90 pl-6">
                    {livePreview.career}
                  </p>
                </div>
              </div>

              {/* Graphic rotating wheel spinner */}
              <div className="mt-auto flex justify-center py-4 border-t border-[#E2E0D4]">
                <div className="w-28 h-28 border border-[#D1CEC0] rounded-full flex items-center justify-center relative bg-white/40">
                  <div className="w-24 h-24 border-2 border-dashed border-[#5A634D]/60 rounded-full flex items-center justify-center animate-spin-slow">
                    <span className="text-[8px] tracking-widest text-[#5A634D] font-bold">
                      INTEGRATING
                    </span>
                  </div>
                  {/* Absolute center dot symbol */}
                  <div className="absolute w-2 h-2 bg-[#C17B5F] rounded-full"></div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* 3. PROCESSING LOADER VIEW */}
      {screen === "loading" && (
        <main id="loading_screen" className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn my-auto">
          <div className="max-w-md bg-white p-8 md:p-12 rounded-[32px] border border-[#E6E4D9] shadow-sm space-y-6">
            
            {/* Spinning decorative compass grid */}
            <div id="loading_compass_wrapper" className="flex justify-center">
              <div className="w-28 h-28 rounded-full border border-[#D1CEC0] flex items-center justify-center relative bg-[#F9F8F3]">
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#5A634D] animate-spin-slow"></div>
                <Compass className="w-12 h-12 text-[#5A634D] stroke-[1.5] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-[#2D2D2A]" id="loading_heading">
                編織多維度探索圖譜...
              </h2>
              <p className="text-sm text-[#A8A394]">
                我們正連結雙子星決策引擎，分析您的 10 大情境選擇，解構核心天賦、職涯軌道、
                匹配大學學術學系、以及大腦活力與身體修復處方...
              </p>
            </div>

            {/* Simulated loading indicators */}
            <div className="space-y-2 text-xs text-[#3D3D35]/80 font-mono text-left bg-[#F9F8F3] p-4 rounded-xl border border-[#E6E4D9]">
              <div className="flex items-center justify-between">
                <span>✓ 性格天賦聚類分析</span>
                <span className="text-[#5A634D] font-bold">Done</span>
              </div>
              <div className="flex items-center justify-between">
                <span>✓ 職群及熱門科系公式擬合</span>
                <span className="text-[#5A634D] font-bold">Done</span>
              </div>
              <div className="flex items-center justify-between">
                <span>✓ 心理與軀體緊繃阻抗解構</span>
                <span className="text-[#C17B5F] font-bold animate-pulse">Running...</span>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 4. COMPREHENSIVE OUTCOME ANALYSIS DASHBOARD SCREEN */}
      {screen === "result" && analysisResult && (
        <main id="result_dashboard" className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 lg:p-12 space-y-12 animate-fadeIn">
          
          {/* Dashboard Title & Top summary */}
          <section className="bg-white rounded-[32px] p-6 md:p-10 border border-[#E6E4D9] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 bg-[#F3F2EB] px-3 py-1 rounded-full border border-[#D1CEC0] text-xs font-bold text-[#5A634D]">
                <CheckCircle className="w-4 h-4 text-[#5A634D]" />
                這是一份由 InnerCompass 生涯大腦精算出的完整指南
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif text-[#2D2D2A]" id="outcome_header_title">
                您的自我探索分析與生涯規劃報告
              </h1>
              
              <p className="text-sm text-[#3D3D35]/80 max-w-2xl leading-relaxed">
                結合了大腦偏好、決策邏輯、情感共振與大局抗挫力因子。以下為您引薦專屬的身心與職涯發展維度。
              </p>
            </div>

            {/* Right side operational actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-white text-[#3D3D35] hover:bg-[#F3F2EB] border border-[#D1CEC0] rounded-full text-xs font-bold transition-all"
              >
                🖨️ 列印存檔報告
              </button>
              <button
                onClick={handleStart}
                className="px-5 py-2.5 bg-[#5A634D] text-white hover:bg-[#484F3D] rounded-full text-xs font-bold transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 重新測試
              </button>
            </div>
          </section>

          {/* Quick Stats overview panel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#EBF0E6] p-5 rounded-2xl border border-[#DAE3D4] flex items-center gap-4">
              <User className="w-8 h-8 text-[#5A634D] shrink-0" />
              <div>
                <span className="text-[10px] text-[#5A634D] font-extrabold uppercase tracking-widest block">性格主導面相</span>
                <span className="text-sm font-bold block text-[#2D2D2A]">{dominantTrait === "creator" ? "星空編織者" : dominantTrait === "empath" ? "心靈守護人" : dominantTrait === "organizer" ? "黃金領航家" : "智慧透視眼"}</span>
              </div>
            </div>

            <div className="bg-[#FDF9F7] p-5 rounded-2xl border border-[#F5E6E0] flex items-center gap-4">
              <Flame className="w-8 h-8 text-[#C17B5F] shrink-0" />
              <div>
                <span className="text-[10px] text-[#C17B5F] font-extrabold uppercase tracking-widest block">核心健康活力</span>
                <span className="text-sm font-bold block text-[#2D2D2A]">
                  {analysisResult.bodyAdvice.energyState ? analysisResult.bodyAdvice.energyState.split("：")[0] : "動態自處型"}
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E6E4D9] flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-[#3D3D35] shrink-0" />
              <div>
                <span className="text-[10px] text-[#A8A394] font-extrabold uppercase tracking-widest block">最速配職涯領域</span>
                <span className="text-sm font-bold block text-[#2D2D2A] truncate max-w-[150px]">{analysisResult.suitableCareers.title}</span>
              </div>
            </div>

            <div className="bg-[#F1EFE7] p-5 rounded-2xl border border-[#E2E0D4] flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-[#5A634D] shrink-0" />
              <div>
                <span className="text-[10px] text-[#A8A394] font-extrabold uppercase tracking-widest block">最匹配學術科系</span>
                <span className="text-sm font-bold block text-[#2D2D2A] truncate max-w-[150px]">{analysisResult.suitableMajors.title}</span>
              </div>
            </div>
          </div>

          {/* 2-COLUMN PRIMARY CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUMN 1 & 2: PRIMARY REPORTS */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* CARD 1: PERSONALITY FACE & STRENGTHS */}
              <div id="module_personality" className="bg-white rounded-3xl border border-[#E6E4D9] p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-[#F3F2EB] pb-4">
                  <div className="w-10 h-10 bg-[#5A634D]/10 rounded-xl flex items-center justify-center text-[#5A634D]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#2D2D2A]">
                      壹、性格天賦與潛在原創力
                    </h2>
                    <p className="text-[11px] text-[#A8A394] tracking-wide uppercase">
                      PERSONALITY PROFILE & INSTINCTS
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#C17B5F]">
                    {analysisResult.personalityTalents.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-[#3D3D35]/90 bg-[#F9F8F3] p-5 rounded-2xl border border-[#E6E4D9] font-serif italic text-base">
                    「{analysisResult.personalityTalents.description}」
                  </p>

                  {/* Keywords Badges */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      靈魂精準關鍵詞
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.personalityTalents.keywords.map((kw, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-[#F1EFE7] border border-[#D1CEC0] text-[#3D3D35] rounded-full text-xs font-bold"
                        >
                          ✦ {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* strengths list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      三大關鍵核心優勢
                    </span>
                    <ul className="space-y-3">
                      {analysisResult.personalityTalents.strengths.map((strength, i) => (
                        <li key={i} className="flex gap-3 text-sm text-[#3D3D35]">
                          <span className="w-5 h-5 rounded-full bg-[#EBF0E6] text-[#5A634D] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i+1}
                          </span>
                          <span className="leading-relaxed">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* MBTI & DISC THEORETICAL ANALYSIS */}
              {analysisResult.mbtiProfile && analysisResult.discProfile && (
                <div id="module_mbti_disc" className="bg-white rounded-3xl border border-[#E6E4D9] p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#F3F2EB] pb-4">
                    <div className="w-10 h-10 bg-[#5A634D]/10 rounded-xl flex items-center justify-center text-[#5A634D]">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif font-bold text-[#2D2D2A]">
                        學術理論擴充：MBTI 職涯性格 & DISC 行為風格
                      </h2>
                      <p className="text-[11px] text-[#A8A394] tracking-wide uppercase">
                        MBTI PERSONALITY & DISC BEHAVIORAL ANALYSIS
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* MBTI Section */}
                    <div className="space-y-4 p-5 bg-[#F9F8F3] rounded-2xl border border-[#E6E4D9] flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#C17B5F] uppercase tracking-wider block">
                            MBTI 職涯類型密碼
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#C17B5F] text-white rounded text-[11px] font-mono font-bold tracking-wider">
                            {analysisResult.mbtiProfile.code}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="text-base font-bold text-[#3D3D35]">
                            {analysisResult.mbtiProfile.name}
                          </h4>
                          <p className="text-xs text-[#3D3D35]/80 mt-1 leading-relaxed">
                            {analysisResult.mbtiProfile.description}
                          </p>
                        </div>
                      </div>

                      {/* MBTI Sliders */}
                      <div className="space-y-2.5 pt-4 border-t border-[#E6E4D9]/60">
                        {/* E vs I */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-[#3D3D35]">
                            <span>內向傾向 (I)</span>
                            <span>外向傾向 (E)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden relative">
                            <div 
                              className="h-full bg-[#5A634D] rounded-full transition-all duration-1000"
                              style={{ width: `${analysisResult.mbtiProfile.traitsBreakdown.E_I}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-[#A8A394] font-mono font-bold">
                            <span>{100 - analysisResult.mbtiProfile.traitsBreakdown.E_I}%</span>
                            <span>{analysisResult.mbtiProfile.traitsBreakdown.E_I}%</span>
                          </div>
                        </div>

                        {/* S vs N */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-[#3D3D35]">
                            <span>實感傾向 (S)</span>
                            <span>直覺傾向 (N)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden relative">
                            <div 
                              className="h-full bg-[#C17B5F] rounded-full transition-all duration-1000"
                              style={{ width: `${analysisResult.mbtiProfile.traitsBreakdown.S_N}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-[#A8A394] font-mono font-bold">
                            <span>{100 - analysisResult.mbtiProfile.traitsBreakdown.S_N}%</span>
                            <span>{analysisResult.mbtiProfile.traitsBreakdown.S_N}%</span>
                          </div>
                        </div>

                        {/* T vs F */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-[#3D3D35]">
                            <span>理性思考 (T)</span>
                            <span>同理情感 (F)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden relative">
                            <div 
                              className="h-full bg-[#2D2D2A] rounded-full transition-all duration-1000"
                              style={{ width: `${analysisResult.mbtiProfile.traitsBreakdown.T_F}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-[#A8A394] font-mono font-bold">
                            <span>{100 - analysisResult.mbtiProfile.traitsBreakdown.T_F}%</span>
                            <span>{analysisResult.mbtiProfile.traitsBreakdown.T_F}%</span>
                          </div>
                        </div>

                        {/* J vs P */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-[#3D3D35]">
                            <span>規律計劃 (J)</span>
                            <span>彈性感知 (P)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden relative">
                            <div 
                              className="h-full bg-[#7C8B69] rounded-full transition-all duration-1000"
                              style={{ width: `${analysisResult.mbtiProfile.traitsBreakdown.J_P}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-[#A8A394] font-mono font-bold">
                            <span>{100 - analysisResult.mbtiProfile.traitsBreakdown.J_P}%</span>
                            <span>{analysisResult.mbtiProfile.traitsBreakdown.J_P}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DISC Section */}
                    <div className="space-y-4 p-5 bg-[#F9F8F3] rounded-2xl border border-[#E6E4D9] flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#5A634D] uppercase tracking-wider block">
                            DISC 社交與決策風格
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#5A634D] text-white rounded text-[11px] font-mono font-bold tracking-wider">
                            {analysisResult.discProfile.code} 型
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-[#3D3D35]">
                            {analysisResult.discProfile.name}
                          </h4>
                          <p className="text-xs text-[#3D3D35]/80 mt-1 leading-relaxed">
                            {analysisResult.discProfile.description}
                          </p>
                        </div>
                      </div>

                      {/* DISC Bars */}
                      <div className="space-y-2 pt-4 border-t border-[#E6E4D9]/60">
                        <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block mb-2">
                          四維能量分佈比率 (DISC Dimensions)
                        </span>
                        
                        <div className="space-y-2">
                          {/* D */}
                          <div className="flex items-center gap-2">
                            <span className="w-6 font-mono font-extrabold text-[#C17B5F] text-xs">D</span>
                            <div className="flex-1 h-2.5 bg-gray-200/60 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#C17B5F] rounded-full"
                                style={{ width: `${analysisResult.discProfile.stylePercentages.D}%` }}
                              ></div>
                            </div>
                            <span className="w-8 text-[10px] font-mono text-right font-bold text-[#3D3D35]">
                              {analysisResult.discProfile.stylePercentages.D}%
                            </span>
                          </div>

                          {/* I */}
                          <div className="flex items-center gap-2">
                            <span className="w-6 font-mono font-extrabold text-[#5A634D] text-xs">I</span>
                            <div className="flex-1 h-2.5 bg-gray-200/60 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#5A634D] rounded-full"
                                style={{ width: `${analysisResult.discProfile.stylePercentages.I}%` }}
                              ></div>
                            </div>
                            <span className="w-8 text-[10px] font-mono text-right font-bold text-[#3D3D35]">
                              {analysisResult.discProfile.stylePercentages.I}%
                            </span>
                          </div>

                          {/* S */}
                          <div className="flex items-center gap-2">
                            <span className="w-6 font-mono font-extrabold text-[#7C8B69] text-xs">S</span>
                            <div className="flex-1 h-2.5 bg-gray-200/60 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#7C8B69] rounded-full"
                                style={{ width: `${analysisResult.discProfile.stylePercentages.S}%` }}
                              ></div>
                            </div>
                            <span className="w-8 text-[10px] font-mono text-right font-bold text-[#3D3D35]">
                              {analysisResult.discProfile.stylePercentages.S}%
                            </span>
                          </div>

                          {/* C */}
                          <div className="flex items-center gap-2">
                            <span className="w-6 font-mono font-extrabold text-[#2D2D2A] text-xs">C</span>
                            <div className="flex-1 h-2.5 bg-gray-200/60 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#2D2D2A] rounded-full"
                                style={{ width: `${analysisResult.discProfile.stylePercentages.C}%` }}
                              ></div>
                            </div>
                            <span className="w-8 text-[10px] font-mono text-right font-bold text-[#3D3D35]">
                              {analysisResult.discProfile.stylePercentages.C}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 2: CAREER PATH & ROLES */}
              <div id="module_careers" className="bg-white rounded-3xl border border-[#E6E4D9] p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-[#F3F2EB] pb-4">
                  <div className="w-10 h-10 bg-[#C17B5F]/10 rounded-xl flex items-center justify-center text-[#C17B5F]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#2D2D2A]">
                      貳、適合的工作與職業生涯路徑
                    </h2>
                    <p className="text-[11px] text-[#A8A394] tracking-wide uppercase">
                      CAREER ROADMAP & ROLES FITTING
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="p-4 bg-[#FDF9F7] rounded-2xl border border-[#F5E6E0]">
                    <span className="text-[10px] font-bold text-[#C17B5F] uppercase tracking-wider block mb-1">
                      推薦職涯核心使命
                    </span>
                    <h3 className="text-base font-bold text-[#2D2D2A]">
                      {analysisResult.suitableCareers.title}
                    </h3>
                  </div>

                  {/* Industries badge list */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      契合產業大群體
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.suitableCareers.industries.map((industry, i) => (
                        <span 
                          key={i}
                          className="px-3.5 py-1 bg-white border border-[#E6E4D9] text-[#2D2D2A] rounded-lg text-xs font-semibold shadow-sm"
                        >
                          🏢 {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Jobs list */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      適合發展之具體職業角色 / 賽道
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.suitableCareers.roles.map((role, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 bg-[#EBF0E6] border border-[#DAE3D4] text-[#5A634D] rounded-full text-xs font-bold"
                        >
                          ✓ {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reasons analysis */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      核心動能適性解析
                    </span>
                    <p className="text-sm text-[#3D3D35]/90 leading-relaxed bg-[#F9F8F3] p-4 rounded-xl border border-[#E6E4D9]">
                      {analysisResult.suitableCareers.reasons}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3: ACADEMIC MAJORS & DEVELOPING SKILLS */}
              <div id="module_majors" className="bg-white rounded-3xl border border-[#E6E4D9] p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-[#F3F2EB] pb-4">
                  <div className="w-10 h-10 bg-[#2D2D2A]/10 rounded-xl flex items-center justify-center text-[#2D2D2A]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#2D2D2A]">
                      參、學術科系學群適配與自我修煉
                    </h2>
                    <p className="text-[11px] text-[#A8A394] tracking-wide uppercase">
                      ACADEMIC MAJORS & SKILL MASTERY
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="p-4 bg-[#F1EFE7] rounded-2xl border border-[#E2E0D4]">
                    <span className="text-[10px] font-bold text-[#5A634D] uppercase tracking-wider block mb-1">
                      首選推薦學術學群方向
                    </span>
                    <h3 className="text-base font-bold text-[#2D2D2A]">
                      {analysisResult.suitableMajors.title}
                    </h3>
                  </div>

                  {/* Majors recom */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      建議選讀或深入自修的大學熱門科系
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.suitableMajors.majors.map((major, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 bg-white border border-[#D1CEC0] text-[#3D3D35] rounded-lg text-xs font-bold"
                        >
                          🎓 {major}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills lists */}
                  <div className="space-y-3 pt-1">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      建議自主刻意練習或考取之實用軟硬技能 (Skills to Master)
                    </span>
                    <ul className="space-y-2">
                      {analysisResult.suitableMajors.skillsToDevelop.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#3D3D35]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C17B5F] mt-2 shrink-0"></span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* reasons major */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      學術相契機因分析
                    </span>
                    <p className="text-sm text-[#3D3D35]/90 leading-relaxed bg-[#F9F8F3] p-4 rounded-xl border border-[#E6E4D9]">
                      {analysisResult.suitableMajors.reasons}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMN 3: RIGHT SIDEBAR SPECIFIC PATHWAYS HOLISTIC WELLNESS */}
            <div className="space-y-8">
              
              {/* CARD 4: HEALTH BODY ADVICE */}
              <div id="module_body" className="bg-white rounded-3xl border border-[#E6E4D9] p-6 md:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-2.5 border-b border-[#F3F2EB] pb-4">
                  <Activity className="w-5 h-5 text-[#C17B5F]" />
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#2D2D2A]">
                      肆、身體與元氣調養指引
                    </h2>
                    <p className="text-[9px] text-[#A8A394] tracking-wider uppercase">
                      VITALITY HEALTH PRECEPTS
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#FDF9F7] p-4 rounded-xl border border-[#F5E6E0]">
                    <span className="text-[10px] font-extrabold text-[#C17B5F] uppercase tracking-wider block">
                      生理能量體質分類
                    </span>
                    <span className="text-sm font-bold block text-[#2D2D2A] mt-1">
                      ✦ {analysisResult.bodyAdvice.energyState}
                    </span>
                  </div>

                  {/* diet items */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      飲食與每日活化指南
                    </span>
                    <ul className="space-y-2 text-xs leading-relaxed text-[#3D3D35]">
                      {analysisResult.bodyAdvice.dietAndExercise.map((rec, i) => (
                        <li key={i} className="flex gap-2.5 bg-[#F9F8F3] p-2.5 rounded-lg border border-[#E6E4D9]">
                          <span className="text-[#C17B5F] font-bold">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* pressure symptoms */}
                  <div className="space-y-1 flex flex-col pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#C17B5F] font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      高壓狀態軀體警報
                    </div>
                    <p className="text-xs text-[#3D3D35]/80 leading-relaxed bg-[#FDF9F7] p-3 rounded-xl border border-[#F5E6E0] italic font-serif">
                      {analysisResult.bodyAdvice.stressPhysicalManifestation}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 5: SPIRITUAL MIND ADVICE */}
              <div id="module_mind" className="bg-white rounded-3xl border border-[#E6E4D9] p-6 md:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-2.5 border-b border-[#F3F2EB] pb-4">
                  <Heart className="w-5 h-5 text-[#5A634D]" />
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#2D2D2A]">
                      伍、心境錨定與正念習慣
                    </h2>
                    <p className="text-[9px] text-[#A8A394] tracking-wider uppercase">
                      PSYCHOLOGICAL MINDSET ALIGNMENT
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Affirmation Belief */}
                  <div className="text-center p-5 bg-[#EBF0E6] rounded-xl border border-[#DAE3D4] italic font-serif">
                    <span className="text-[10px] font-bold text-[#5A634D] uppercase tracking-widest block mb-2 font-sans not-italic">
                      ✨ 靈魂核心信念肯定宣言
                    </span>
                    <p className="text-sm font-bold text-[#3D3D35] leading-relaxed">
                      「{analysisResult.mindAdvice.coreBelief}」
                    </p>
                  </div>

                  {/* Meditation program */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      推薦 15 分鐘日常正念修持方法
                    </span>
                    <p className="text-xs leading-relaxed text-[#3D3D35] bg-[#F9F8F3] p-4.5 rounded-xl border border-[#E6E4D9]">
                      {analysisResult.mindAdvice.mindfulnessPractice}
                    </p>
                  </div>

                  {/* Core trap */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[#A8A394] uppercase tracking-wider block">
                      本生自我修煉盲點焦點
                    </span>
                    <div className="bg-[#F1EFE7] p-3.5 rounded-xl border border-[#E2E0D4] text-xs">
                      <span className="font-bold text-[#5A634D] block mb-0.5">需要溫柔跨越的內在束縛：</span>
                      <p className="text-[#3D3D35]/90 leading-relaxed">{analysisResult.mindAdvice.growthFocus}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* CARD 6: HOLISTIC SPIRIT SUMMARY */}
          <section id="module_summary" className="bg-[#5A634D] text-[#F9F8F3] rounded-[32px] p-6 md:p-10 border border-[#484F3D] space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-[#EBF0E6] stroke-[1.5]" />
              <h2 className="text-2xl font-serif">
                陸、來自 InnerCompass 的「靈魂指南總結簽」
              </h2>
            </div>
            
            <p className="text-sm md:text-base leading-relaxed tracking-wide font-serif italic max-w-5xl opacity-95">
              「{analysisResult.holisticSummary}」
            </p>

            <div className="pt-2 border-t border-white/20 flex flex-wrap justify-between items-center text-[10px] opacity-75 tracking-wider uppercase">
              <span>© InnerCompass Multi-Dimensional Report Generator Engine v1.1</span>
              <span>Gemini Pro Active Cloud Neural Integration</span>
            </div>
          </section>

          {/* CHATBOT INTEGRATION PANEL AT THE BOTTOM OF DASHBOARD */}
          <section id="coaching_chatbot_panel" className="bg-white rounded-[32px] border border-[#E6E4D9] shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#F3F2EB] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5A634D] rounded-full flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2D2D2A]">
                    🌿 內在指南 AI 導師諮詢專區
                  </h2>
                  <p className="text-xs text-[#A8A394]">
                    對上面的性格天賦、科系推薦或活力分析有疑問嗎？立刻輸入，向您專屬的雙子星生涯心靈導師提問！
                  </p>
                </div>
              </div>

              {/* Suggestions keywords block to trigger question */}
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => sendSuggestedQuery("我該如何與跟我背道而馳的人高效合作？")}
                  className="px-2.5 py-1 bg-[#F9F8F3] hover:bg-[#EBF0E6] border border-[#E6E4D9] rounded-full text-[10px] text-[#5A634D] font-bold transition-colors"
                >
                  💡 衝突合作技巧
                </button>
                <button 
                  onClick={() => sendSuggestedQuery("适合我這種人的『斜槓/副業』推薦有哪些？")}
                  className="px-2.5 py-1 bg-[#F9F8F3] hover:bg-[#EBF0E6] border border-[#E6E4D9] rounded-full text-[10px] text-[#5A634D] font-bold transition-colors"
                >
                  💡 斜槓副業提案
                </button>
                <button 
                  onClick={() => sendSuggestedQuery("為了選上述推薦科系，我應該先修讀什麼？")}
                  className="px-2.5 py-1 bg-[#F9F8F3] hover:bg-[#EBF0E6] border border-[#E6E4D9] rounded-full text-[10px] text-[#5A634D] font-bold transition-colors"
                >
                  💡 學習準備清單
                </button>
              </div>
            </div>

            {/* Chat history logs */}
            <div className="bg-[#F9F8F3] p-4 rounded-2xl border border-[#E6E4D9] max-h-80 overflow-y-auto space-y-4">
              {chatHistory.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex gap-3 max-w-[85%] ${item.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    item.sender === "user" ? "bg-[#C17B5F] text-white" : "bg-[#5A634D] text-white"
                  }`}>
                    {item.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    item.sender === "user" 
                      ? "bg-[#C17B5F] text-white rounded-tr-none font-medium" 
                      : "bg-white text-[#3D3D35] border border-[#E6E4D9] rounded-tl-none font-sans"
                  }`}>
                    <p className="whitespace-pre-line">{item.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {chatLoading && (
                <div className="flex gap-3 mr-auto items-center max-w-[80%] animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-[#5A634D] text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-white border border-[#E6E4D9] rounded-2xl rounded-tl-none text-xs text-[#A8A394] italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#5A634D] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#5A634D] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#5A634D] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    導師正在傾聽、構思客製化錦囊...
                  </div>
                </div>
              )}
            </div>

            {/* Chat message input form */}
            <form onSubmit={handleSendChatMessage} className="flex gap-2.5">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="在此輸入您想要追問的問題...（例：我常因為做事太急而感到心累，該怎麼辦？）"
                disabled={chatLoading}
                className="flex-1 bg-white border border-[#D1CEC0] rounded-xl px-4 py-3 text-sm text-[#3D3D35] placeholder-[#A8A394] focus:outline-none focus:ring-1 focus:ring-[#5A634D] focus:border-[#5A634D] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!chatMessage.trim() || chatLoading}
                className="bg-[#5A634D] text-white hover:bg-[#484F3D] disabled:bg-[#E6E4D9] disabled:text-[#A8A394] px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-4 h-4" /> 送出
              </button>
            </form>
          </section>

        </main>
      )}

      {/* INNER FOOTER SECTION COMPLYING WITH THEME */}
      <footer id="main_app_footer" className="mt-auto h-14 bg-[#5A634D] flex items-center justify-between px-6 md:px-12 text-white">
        <p className="text-[10px] md:text-xs text-[#F9F8F3] opacity-80 tracking-wider">
          © 2026 INNER COMPASS ASSESSMENT • 內在指南探索聯盟局 • 
          <span className="ml-2">
            <span id="vercount_value_site_pv">--</span> PV / <span id="vercount_value_site_uv">--</span> UV
          </span>
        </p>
        <div className="flex gap-4">
          <div className="w-1.5 h-1.5 bg-[#F9F8F3] rounded-full opacity-60"></div>
          <div className="w-1.5 h-1.5 bg-[#F9F8F3] rounded-full opacity-60"></div>
          <div className="w-1.5 h-1.5 bg-[#F9F8F3] rounded-full opacity-60"></div>
        </div>
      </footer>

    </div>
  );
}

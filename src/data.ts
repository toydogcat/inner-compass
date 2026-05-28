/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, AnalysisResult } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "當工作或生活突然遇到重大難題或瓶頸時，你通常會如何跨出第一步？",
    category: "problem-solving",
    options: [
      { id: "A", text: "冷靜收集數據與前人經驗，梳理出問題的根本因果，制定結構化的解決計畫", trait: "analyzer" },
      { id: "B", text: "打破常規框架，嘗試用直覺或未曾有人用過的全新創意點子來突破重圍", trait: "creator" },
      { id: "C", text: "先傾聽並尋求周圍夥伴的感受與建議，確保大家在有共識且安心的狀態下前進", trait: "empath" },
      { id: "D", text: "迅速召集人手，明確分配任務與追蹤時程，以最高效、雷厲風行的執行力解決它", trait: "organizer" }
    ]
  },
  {
    id: 2,
    text: "在一個團隊合作的任務中，你最容易自然而然扮演或渴望擔任哪種角色？",
    category: "team-role",
    options: [
      { id: "A", text: "「智囊智庫」：負責把關邏輯細節，優化流程，確保方案萬無一失", trait: "analyzer" },
      { id: "B", text: "「點子製造機」：源源不絕提出獨特視覺、包裝或創意概念，點亮整個專案", trait: "creator" },
      { id: "C", text: "「傾聽黏著劑」：調解人際摩擦，激勵團隊士氣，讓每個人都覺得被重視", trait: "empath" },
      { id: "D", text: "「核心領航員」：帶領討論方向，果斷按步就班下決策，整合混亂局面", trait: "organizer" }
    ]
  },
  {
    id: 3,
    text: "你最嚮往或最能讓自己恢復飽滿活力的週末充電方式是？",
    category: "ideal-weekend",
    options: [
      { id: "A", text: "獨自研究有趣的冷知識、打策略遊戲、寫程式或動腦拆解某些機械原理", trait: "analyzer" },
      { id: "B", text: "逛藝術展覽、看小眾電影、聽獨立音樂，甚至自己隨筆塗鴉、創作、聽靈感低語", trait: "creator" },
      { id: "C", text: "與兩三位知心好友深入暢談人生，或到大自然裡深呼吸，感受與人、萬物的心靈對話", trait: "empath" },
      { id: "D", text: "精心規劃一趟行程完美的奢華露營，或去健身房高效重訓、打理環境，過著自律生活", trait: "organizer" }
    ]
  },
  {
    id: 4,
    text: "當面臨人生的關鍵抉擇（如選科系、換職涯、重要投資）時，你的決策核心通常是？",
    category: "decision-making",
    options: [
      { id: "A", text: "做客觀交叉對比、研究趨勢數據，列出優缺點得失矩陣，用純理性數據說服自己", trait: "analyzer" },
      { id: "B", text: "聆聽靈魂的低語。就算違背現實常理，只要這條路能讓我探索未知、保持獨特，我就想試", trait: "creator" },
      { id: "C", text: "考量這項決定對家庭、朋友或社會的正面價值，是否溫柔契合內心真正的真善美", trait: "empath" },
      { id: "D", text: "評估這能帶來多少實質聲望、競爭優勢與報酬，它是否有助於我攻克更高的人生里程碑", trait: "organizer" }
    ]
  },
  {
    id: 5,
    text: "當你身處意見分歧、甚至帶有火藥味的摩擦群體中，你最直覺的反應是？",
    category: "conflict-handling",
    options: [
      { id: "A", text: "跳脫情緒框架，客觀分析誰的論點有邏輯漏洞，用事實有條理地釐清是非曲直", trait: "analyzer" },
      { id: "B", text: "覺得有些窒悶或荒謬，索性幽默化解，或以旁觀者視角將其轉化成有趣的創作成熟養分", trait: "creator" },
      { id: "C", text: "深感焦慮與不捨，嘗試私下分別關心雙方的情緒卡關，搭起相互理解與和解的溫暖橋樑", trait: "empath" },
      { id: "D", text: "強勢重申大局目標，要求大家暫時擱置情懷、就事論事，快速定出折衷可行的行動方案", trait: "organizer" }
    ]
  },
  {
    id: 6,
    text: "學習一門完全陌生的新學科或技能時，哪種方式能讓你的學習效果拉到最滿？",
    category: "learning-preference",
    options: [
      { id: "A", text: "先讀厚實的原理教科書，徹底弄懂最底層的邏輯推導公式，再自己動手解題", trait: "analyzer" },
      { id: "B", text: "沒有固定步驟。先憑直覺動手摸索、玩耍，遇到有興趣的部分再天馬行空地深入延伸", trait: "creator" },
      { id: "C", text: "老師上課風趣溫款、充滿鼓勵，或者與讀書小組互相切磋分享心路歷程，共同成長", trait: "empath" },
      { id: "D", text: "報名帶有實力檢定、有明確等級晉升機制或成果考核的精準衝刺班，快速見證進步", trait: "organizer" }
    ]
  },
  {
    id: 7,
    text: "如果今天你被賦予一筆充足資金且不需要回報，你最渴望啟動哪一項自由專案？",
    category: "focus-area",
    options: [
      { id: "A", text: "研究環保節能演算法或建置微型實驗室，用精密數據推進某些科學新知", trait: "analyzer" },
      { id: "B", text: "籌備原創互動多媒體藝術特展，或撰寫並出版一部風格強烈的奇幻世界觀小說", trait: "creator" },
      { id: "C", text: "創辦一個關懷身心靈復原、或是流浪動物庇護的志工平台，用愛與溫柔接引受挫的生命", trait: "empath" },
      { id: "D", text: "創立一家極具市場潛力、管理高效並能解決生活痛點的新創商業科技公司", trait: "organizer" }
    ]
  },
  {
    id: 8,
    text: "在日常生活中，最容易讓你深感精疲力竭、整個人正能量與動力被榨乾的狀況是？",
    category: "daily-motivation",
    options: [
      { id: "A", text: "被迫處理邏輯不通的繁雜琐事，或是周圍的人不斷做出極度感性幼稚、不講理的決定", trait: "analyzer" },
      { id: "B", text: "被死板的規章制度窒息綑綁，每天重複同樣公式，創意完全無處安放", trait: "creator" },
      { id: "C", text: "周遭充滿對立叫罵、缺乏同情、不和諧的人際衝突，或是自己無法幫助那些痛苦的人", trait: "empath" },
      { id: "D", text: "團隊進度停滯拖宕、大家各自推託沒責任感，或是苦心設定的目標最後無疾而終", trait: "organizer" }
    ]
  },
  {
    id: 9,
    text: "當你完成一件深感自豪、非常不容易的挑戰時，你內心深處最渴望得到什麼樣的掌聲？",
    category: "energy-source",
    options: [
      { id: "A", text: "專家對你精準技術與深度邏輯實力的讚許：「這做法極致優雅、邏輯無懈可擊」", trait: "analyzer" },
      { id: "B", text: "大眾對你別具一格、極致原創性的驚嘆：「這點子和美感簡真太神了，從未見過！」", trait: "creator" },
      { id: "C", text: "你所關心的人眼神中流露出的感動與撫慰：「謝謝你，這真的溫柔治癒了我們」", trait: "empath" },
      { id: "D", text: "權威或市場榜單給予的具體封號與實質回饋：「恭喜獲得第一名/帶來了驚人的產值！」", trait: "organizer" }
    ]
  },
  {
    id: 10,
    text: "展望生命未來的 10 年，你內心深處最期盼他人給予你的關鍵評價是？",
    category: "work-style",
    options: [
      { id: "A", text: "睿智理性的「洞察大師」：擁有無可取代的專業實力與看透萬物本質的敏銳大腦", trait: "analyzer" },
      { id: "B", text: "靈性充沛的「先鋒行者」：靈魂自由不拘泥凡俗、時刻編織出驚豔時代的靈感", trait: "creator" },
      { id: "C", text: "溫潤平和的「心靈守護者」：給周圍帶來安全感、被無數人信賴與傾注深切情感", trait: "empath" },
      { id: "D", text: "卓越非凡的「卓越領袖」：戰功豐碩、言行充滿決斷魅力並帶領宏偉志向成真", trait: "organizer" }
    ]
  },
  {
    id: 11,
    text: "當你需要在一週內快速上手一套難度頗高的分析軟體或系統時，你傾向如何進行？",
    category: "learning-preference",
    options: [
      { id: "A", text: "不漏掉任何細節，通讀官方系統架構與技術手冊，先建立完整的邏輯脈絡圖", trait: "analyzer" },
      { id: "B", text: "直接在系統裡東踩踩、西點點，靠直覺和交互嘗試找出驚喜的新捷徑與視覺驚艷處", trait: "creator" },
      { id: "C", text: "尋求論壇上各個用戶的經驗故事，或是詢問學長姐的操作盲區，在友善互助中上手", trait: "empath" },
      { id: "D", text: "尋找最高效的 15 分鐘精華必殺攻略，一邊實戰產出結果一邊對照考核指標，拿到實效", trait: "organizer" }
    ]
  },
  {
    id: 12,
    text: "在大型會議或眾人矚目的發表场合，最能讓你感到舒適且發揮實力的姿態是？",
    category: "work-style",
    options: [
      { id: "A", text: "安靜站在後台，提供精準完美的技術報告、圖表數據投影，為專案邏輯層層把關", trait: "analyzer" },
      { id: "B", text: "擔任主講人，用極具審美煽動性的語調、大膽的故事簡報包裝點燃全場觀眾熱情", trait: "creator" },
      { id: "C", text: "負責主持與引薦角色，暖和全場氣氛，親切照顧每一位來賓與同儕的現場感官", trait: "empath" },
      { id: "D", text: "作為總負責人，掌控全場活動的完美時程流向，果斷引導會議往具體戰略方向定案", trait: "organizer" }
    ]
  },
  {
    id: 13,
    text: "當工作流程中出現模糊不清、權責沒劃分完美的灰色地帶時，你第一下的反應是？",
    category: "conflict-handling",
    options: [
      { id: "A", text: "自主著手撰寫邏輯嚴密的系統化分工框架，提出邊界清晰的權限劃分藍圖送件評審", trait: "analyzer" },
      { id: "B", text: "視為創意的好契機，跳脫舊有職責做些跨界的新穎嘗試，用好玩的玩法來做做看", trait: "creator" },
      { id: "C", text: "私下溫和詢問大家的顧慮和希望，充當橋樑主動多承擔一些工作好維持團隊和諧", trait: "empath" },
      { id: "D", text: "召開緊急協作會議，當場迅速果斷指派任務清單給每個人，排除爭議快速推進", trait: "organizer" }
    ]
  },
  {
    id: 14,
    text: "若有一整個悠閒無事的下午，走進一棟美麗的圖書館，哪一個專區最令你流連忘返？",
    category: "ideal-weekend",
    options: [
      { id: "A", text: "前沿科學實驗、程式演算法、歷史考據文獻或量化經濟模型等深度研究區", trait: "analyzer" },
      { id: "B", text: "世界美學圖鑑、現代奇幻文學、前衛哲學思想、詩集與原創多媒體展示區", trait: "creator" },
      { id: "C", text: "身心靈療癒冥想、大眾心理學、動物生態日記與跨文化人類學暖意圖書區", trait: "empath" },
      { id: "D", text: "頂尖商業談判戰略、組織領導學、高效時間管理精著以及卓越成功人物傳記區", trait: "organizer" }
    ]
  },
  {
    id: 15,
    text: "在日常與人共事中，最容易讓你心生疲憊或理智斷線的溝通障礙是？",
    category: "daily-motivation",
    options: [
      { id: "A", text: "對方毫無邏輯事實根據，一味用極其混亂不成熟的私人情緒和主觀偏執指責你", trait: "analyzer" },
      { id: "B", text: "被要求重複做機械、一成不變的手工表格，並且處處被死板僵硬的教條規定限制想像", trait: "creator" },
      { id: "C", text: "面對冷血不通人情的指責，或是一直處於高抗爭、拉幫結派毫無同理心的緊繃叢林", trait: "empath" },
      { id: "D", text: "推進極慢的拖沓作風、每個人都毫無擔當與承諾，且眼睜睜看著目標被白白蹉跎", trait: "organizer" }
    ]
  },
  {
    id: 16,
    text: "當好友突然陷入人生重大悲傷，哭得歇斯底里向你訴苦時，你最直覺的陪伴模式是？",
    category: "energy-source",
    options: [
      { id: "A", text: "先引導對方平復情緒，抽絲剝繭幫忙剖析事情前因後果，理出一條止損解決的對策", trait: "analyzer" },
      { id: "B", text: "帶對方去大哭一場，看一場能宣洩心境的另類藝術展，用隱喻故事或者藝術帶其轉化", trait: "creator" },
      { id: "C", text: "不做任何理性指點，緊緊抱住他，感同身受地默默流淚傾聽，完全做他的防空洞", trait: "empath" },
      { id: "D", text: "幫他打理好當下的餐食和日常雜務，冷靜地為他撐腰做主，甚至幫忙出面討回公道", trait: "organizer" }
    ]
  },
  {
    id: 17,
    text: "擬定個人年度計畫（如跨年新展望、工作或學習計畫）時，你最習慣以何種地圖出發？",
    category: "work-style",
    options: [
      { id: "A", text: "繪製精密的分支指標、多項變數權重回顧，製作客觀定量的習慣追蹤數值曲線表", trait: "analyzer" },
      { id: "B", text: "沒有僵化的行事年曆，而是剪貼一系列啟發靈魂的美麗遠景視覺板 (Vision Board)", trait: "creator" },
      { id: "C", text: "不偏重指標，而是承諾今年在哪些家人、友誼深度及自身心靈厚度上維持圓融成長", trait: "empath" },
      { id: "D", text: "設定好清晰必達的里程碑目標 (KPI/OKR)，列出每週倒計時極限行動漏斗來衝刺", trait: "organizer" }
    ]
  },
  {
    id: 18,
    text: "逛創意手工市集挑選一項能裝飾書桌的藝術品時，你拍板下單的核心原因是？",
    category: "decision-making",
    options: [
      { id: "A", text: "評估其製作工藝精密性、材質折舊率、功能性多用度，確認性價比非常卓越", trait: "analyzer" },
      { id: "B", text: "被其空前絕後、富涵強烈寓意與奇幻色調的獨特美感深深擊中，覺得極具原創性", trait: "creator" },
      { id: "C", text: "聽創作者講述其背後溫款感人生平故事，或覺得它散發的和煦氣氛能療癒疲憊身心", trait: "empath" },
      { id: "D", text: "看重它能夠彰顯個人的專業品味、獨特地位或成功身家，在視覺上具備卓越氣場", trait: "organizer" }
    ]
  },
  {
    id: 19,
    text: "如果能瞬間擁有一種世界罕見的傳奇超能力，你靈魂最深處極度嚮往的是？",
    category: "focus-area",
    options: [
      { id: "A", text: "【洞察真實眼】：一眼看穿世間所有謊言、數據規律、漏洞以及宇宙物理運作算式", trait: "analyzer" },
      { id: "B", text: "【創世筆】：將大腦中任何神奇的宏偉幻象、美麗光影一秒在現實中百分百實物重現", trait: "creator" },
      { id: "C", text: "【萬物共鳴感】：感知所有動物、植物、人類當下的幸福與委屈痛苦，並能瞬間安撫他們", trait: "empath" },
      { id: "D", text: "【命運編織盤】：精準預言所有事物演進路徑，並能在瞬息萬變的事態中完美調控棋局", trait: "organizer" }
    ]
  },
  {
    id: 20,
    text: "當你在一場跨部門協作中，被賦予最重要的「安全把關人（守護者）」角色時，你認為最關鍵的是？",
    category: "team-role",
    options: [
      { id: "A", text: "落實層層算法與數據驗證，絕不放過任何一個會導致災防死角的極端 bug", trait: "analyzer" },
      { id: "B", text: "保持足夠的敏感度和替代創意，用出其不意的點子繞過可能出現的公關盲區", trait: "creator" },
      { id: "C", text: "時常關切不同夥伴在高負荷工作下的心理防線、避免任何人遭受不公平待遇、累垮", trait: "empath" },
      { id: "D", text: "強力主導進度和合規規範，在突發黑天鵝事件中迅速啟動備案、一秒決斷掌控局面", trait: "organizer" }
    ]
  },
  {
    id: 21,
    text: "當規劃一趟跨國深度自由行時，你的行李與行程安排風格通常會是？",
    category: "ideal-weekend",
    options: [
      { id: "A", text: "行李物件根據重量、功能分類整齊放入真空袋；行程表備妥離線地圖與各方案應急資訊", trait: "analyzer" },
      { id: "B", text: "帶上最符合美學調性的相機和衣物；不設死板景點，隨直覺在幽靜巷弄中挖掘驚喜", trait: "creator" },
      { id: "C", text: "帶上舒緩精油、安睡噴霧；旅行以深度調養身心、溫和感受當地居民生活頻率為主", trait: "empath" },
      { id: "D", text: "用高級 Excel 表和完美時程表精算交通、打卡效率，並為每天的行程目標做好百分百複盤", trait: "organizer" }
    ]
  },
  {
    id: 22,
    text: "當進展到一半的項目突然遇到政策突變，必須全部推倒重來時，你內心的第一張盾牌是？",
    category: "problem-solving",
    options: [
      { id: "A", text: "立馬分析新政策的合規條文、比對現存數據，理出一份全新的可行性邏輯評估文檔", trait: "analyzer" },
      { id: "B", text: "深呼吸後興奮起來——「太棒了，舊的垃圾架構終於碎掉，我可以用全新的概念重構了」", trait: "creator" },
      { id: "C", text: "先關心一旁同樣深受打擊、臉色慘白的團隊同儕，主動送上溫暖咖啡和肩膀抱抱排解焦慮", trait: "empath" },
      { id: "D", text: "迅速止損，重組手頭資源，在重整後在一小時內下達全新推進的強力行軍令與時程表", trait: "organizer" }
    ]
  },
  {
    id: 23,
    text: "你覺得自己在群體中之能獲得深切的信任與依賴，最關鍵的美德是？",
    category: "team-role",
    options: [
      { id: "A", text: "提供絕對客觀真實的理性評估、不欺騙、不做沒有數據邏輯基礎的空洞承諾", trait: "analyzer" },
      { id: "B", text: "總能打破僵局、帶來不可思議的美學活力和新鮮視角，大家在你身旁不易僵化", trait: "creator" },
      { id: "C", text: "無私、溫柔且不帶批判的深度傾聽，能承載每個人內在最沉重的情緒，不洩露秘密", trait: "empath" },
      { id: "D", text: "永遠具有強大靠山般的堅毅能量，在關鍵時刻能果敢決斷、保護團隊利益並頂住壓力", trait: "organizer" }
    ]
  },
  {
    id: 24,
    text: "在關注社會重大的身心靈健康或弱勢保障議題時，你內心深處被喚起的最高使命是？",
    category: "focus-area",
    options: [
      { id: "A", text: "深入研究其政策缺失，建立定量人口流向數據分析，用理性科技手段重塑社福結構", trait: "analyzer" },
      { id: "B", text: "用強烈藝術張力的短片、攝影、文字，讓原本被忽視的悲傷群體在美麗或震撼中被世界聽見", trait: "creator" },
      { id: "C", text: "親身投入第一線志工、建立極度溫潤的人道關懷互助會，面對面療癒傷痕累累的心靈", trait: "empath" },
      { id: "D", text: "整合多方企業資源(ESG)、建立有實質造血自給自足能力的專業社會企業，高效推動改善", trait: "organizer" }
    ]
  },
  {
    id: 25,
    text: "在處理令人頭大的瑣碎行政工作（例如報帳、填寫繁難的合約條款）時，你的作風是？",
    category: "work-style",
    options: [
      { id: "A", text: "編寫一鍵自動套用或宏命令演算法，或全神貫注一個格子不差地核對公式與代碼細節", trait: "analyzer" },
      { id: "B", text: "放一首極致好聽的爵士樂，一邊塗鴉敷衍一下，或尋找有沒有新奇、好玩的視覺解套方式", trait: "creator" },
      { id: "C", text: "溫和地尋求行政同仁教導指針，大家一邊喝下午茶一邊彼此打氣協助通關", trait: "empath" },
      { id: "D", text: "設置專注計時器，心無旁騖高效處理完，快速在完成清單打個清脆的大勾，絕不拖延", trait: "organizer" }
    ]
  },
  {
    id: 26,
    text: "受邀參加一個有多位不熟跨界人士的品酒或主題沙龍時，你通常的社交姿態是？",
    category: "energy-source",
    options: [
      { id: "A", text: "習慣待在安靜角落聆聽别人發言，遇到專業探討時才會客觀論證發表、注重深度大於廣度", trait: "analyzer" },
      { id: "B", text: "身著充滿個人設計美感的手工服飾，分享驚奇冷門的獨立音樂或創意靈感，做快樂奇葩", trait: "creator" },
      { id: "C", text: "溫潤有禮地關注是否有人感到落單局促，主動上前給予真摯溫馨的主動傾聽與能量共振", trait: "empath" },
      { id: "D", text: "自信自如地與核心主辦人、業界大咖交換名片，圍繞著實物商機和高效跨界展開爽朗探討", trait: "organizer" }
    ]
  },
  {
    id: 27,
    text: "如果今天被指定要為一間主打心靈健康放鬆的環保概念店構思視覺陳列，你會？",
    category: "work-style",
    options: [
      { id: "A", text: "研究環保節能照度最科學的流明數據與永續降溫公式，算好精密的自然採光光能射角", trait: "analyzer" },
      { id: "B", text: "以「幻夜深林」或「水光呼吸」為概念，用原創多媒體、光影低頻及前衛手作打造浸入式感官", trait: "creator" },
      { id: "C", text: "親自前往挑選踩上去最軟綿溫暖的手織地毯，擺滿讓心靈徹底融解的原型植物、無壓坐墊", trait: "empath" },
      { id: "D", text: "做好高坪效、極簡化且動線規劃極致流暢的視覺指引，確保客戶一秒找到商品、提高客單", trait: "organizer" }
    ]
  },
  {
    id: 28,
    text: "當下屬或合作夥伴無心犯下一個導致流程延誤的失誤時，你脱口而出的第一反應通常是？",
    category: "conflict-handling",
    options: [
      { id: "A", text: "「我們對一下到底在哪個步驟發生了偏離？系統缺陷是什麼？以便立刻在流程上堵漏」", trait: "analyzer" },
      { id: "B", text: "「沒關係，這反倒給了我們重新換個新奇思路的角度，要不直接把這失誤改造成新亮點？」", trait: "creator" },
      { id: "C", text: "「累壞了吧？我知道你最近压力很大不是故意的。別太自責，有我陪著你一起承擔修補」", trait: "empath" },
      { id: "D", text: "「先別解釋。立刻啟動備案 A，你負責重聯供應商，我來協調客戶，半小時後看成果」", trait: "organizer" }
    ]
  },
  {
    id: 29,
    text: "如果在學校或公司舉辦一場跨界黑客松（黑客松大賽），你覺得哪一塊的工作會激起你最高的熱情？",
    category: "team-role",
    options: [
      { id: "A", text: "撰寫高難度演算法代碼、構建精密的大數據流模型、或進行防灌水安全防護代碼編碼", trait: "analyzer" },
      { id: "B", text: "設計無與倫比、極富美感、令人驚嘆的前端 UI/UX 頁面、動態交互與主概念說故事", trait: "creator" },
      { id: "C", text: "擔任團隊凝聚者、做好內部心理建設、多方位協調摩擦，讓整個熬夜團隊洋溢溫馨歡笑", trait: "empath" },
      { id: "D", text: "擔任項目組長、主導簡報路演答辯、分配開發模組，並在上台前強力剔除非核心功能", trait: "organizer" }
    ]
  },
  {
    id: 30,
    text: "你對生活中的「物質或空間享受」，最極致、最能打動你心坎的奢華定義通常是？",
    category: "ideal-weekend",
    options: [
      { id: "A", text: "擁有一間一絲不苟、裝配頂級靜音降噪系統、有多聯屏並散落各種前沿硬卡的高科技書房", trait: "analyzer" },
      { id: "B", text: "擁有一座風格乖張獨特、充滿世界各地手工蒐羅藝術品、散發獨立設計靈光的手作工作室", trait: "creator" },
      { id: "C", text: "擁有一栋落地窗外是大樹暖陽、到處貓狗嬉戲、充滿和煦香氛與心靈冥想區的溫馨庇護所", trait: "empath" },
      { id: "D", text: "擁有一座能俯瞰整座繁華城市天際線、配有極致流暢高效的智能主管套房與高級私人會所", trait: "organizer" }
    ]
  },
  {
    id: 31,
    text: "面對出乎意料的「突發意外」（例如飛機暴雨延誤取消、或者是面試面談被無故改期）時，你的第一反應？",
    category: "decision-making",
    options: [
      { id: "A", text: "立馬拿出電腦，對焦兩家航空公司的退改理賠條款，算好最佳退換交通替代路線之期望值", trait: "analyzer" },
      { id: "B", text: "覺得挺有荒誕趣味的，索性買上一杯咖啡、在雨中漫步，順著意外邂逅這座城市的未知風景", trait: "creator" },
      { id: "C", text: "稍微一震，接著閉上雙眼微調呼吸，告訴自己：『這一定是宇宙最溫柔的安排幫我避開壞事』", trait: "empath" },
      { id: "D", text: "迅速給相關等候方打電話告知變動，啟動高鐵/自駕備份行程，全力追回失去的高效時程", trait: "organizer" }
    ]
  },
  {
    id: 32,
    text: "每當你覺得連續高強度工作導致大腦和注意力瀕臨過載，此時你對自身的關照習慣是？",
    category: "daily-motivation",
    options: [
      { id: "A", text: "主動斷網 20 分鐘，在腦中默數斐波那契數列或進行微量的邏輯拼圖，讓運算大腦乾淨重載", trait: "analyzer" },
      { id: "B", text: "走下樓在空氣中深切嗅吻泥土、看一片富有奇異色彩的晚霞，隨手在平板上進行色彩塗鴉", trait: "creator" },
      { id: "C", text: "喝一杯暖洋洋的養生紅棗乾果茶，閉上雙眼做一次自我接納的慈心冥想，排走吸進的焦慮", trait: "empath" },
      { id: "D", text: "換上重訓服裝奔往健身房，進行 30 分鐘高抗阻推舉、高燃深蹲，用肌肉的酸痛大汗痛快重載", trait: "organizer" }
    ]
  },
  {
    id: 33,
    text: "在尋找能伴隨自己十年長青、真正深入心靈的「忘年之師、良師益友」時，你最看重的靈魂特質？",
    category: "team-role",
    options: [
      { id: "A", text: "【睿智的博學智叟】：其才學涉獵淵博、凡事只用絕對客觀求實的思維給予其最深刻點撥", trait: "analyzer" },
      { id: "B", text: "【狂野不羈的先鋒設計人】：其生命軌跡自由獨立，能不斷衝擊自己原有盲區、指引靈感天光", trait: "creator" },
      { id: "C", text: "【慈悲長樂的智者居士】：內心散發純淨無瑕的無條件溫柔光暈，能包容其全部不堪與脆弱", trait: "empath" },
      { id: "D", text: "【身經百戰的豪橫領航長】：戰功卓著、言傳身教如何果敢殺伐、調動籌碼、攀登頂流社會巔峰", trait: "organizer" }
    ]
  },
  {
    id: 34,
    text: "當前沿的 AI 自動化與腦機接口科技引發激烈的人文與科技大討論時，你下意識最容易投射目光到？",
    category: "focus-area",
    options: [
      { id: "A", text: "自動化生成機器的權重算力限制底層逻辑，以及其如何被嚴密數學推導來限制代碼偏置", trait: "analyzer" },
      { id: "B", text: "AI 是否能夠真正理解人類心靈背後那種不可被量化的孤僻美感、神祕藝術與原創靈魂火花", trait: "creator" },
      { id: "C", text: "大批下崗失業群體在其浪潮下的集體心靈焦慮、精神創傷撫慰以及尊嚴如何被溫和保障", trait: "empath" },
      { id: "D", text: "這項突破將如何重構全球產業的商業化版圖、帶來多少實質新創市場估值，誰能分到核心蛋糕", trait: "organizer" }
    ]
  },
  {
    id: 35,
    text: "當你在閱讀一部高人氣、極致細膩並發人深思的經典自傳文學時，最能帶給你持久回聲的是？",
    category: "learning-preference",
    options: [
      { id: "A", text: "作者如何嚴密剖析時代演進跟個人起落的客觀因果軌跡，那種大時代與命運的邏輯公式", trait: "analyzer" },
      { id: "B", text: "書中對微小感官、美麗悲傷、寂靜林野那種富含詩意美感和空前寓意的無與倫比文字修飾", trait: "creator" },
      { id: "C", text: "那種超越時空界限、人在黑夜裡對自我靈魂的誠實和解，給予人無比慈悲的眼淚和療癒", trait: "empath" },
      { id: "D", text: "主角如何在一片困局泥潭中，咬緊牙關、制定戰略、調動兵力，最終披荊斬棘打下江山的實績", trait: "organizer" }
    ]
  },
  {
    id: 36,
    text: "如果要在自己的社交媒體（例如 LinkedIn 或 Instagram）上發布一條日常動態，你直覺上最在乎？",
    category: "daily-motivation",
    options: [
      { id: "A", text: "內容的客觀準確與技術事實，字句嚴謹，哪怕只有同行知音看懂其中門道，也絕不嘩眾取寵", trait: "analyzer" },
      { id: "B", text: "配圖的獨特調色與美學意境、貼文蘊含的獨樹一格幽默，不與任何庸俗的模板宣傳同流合污", trait: "creator" },
      { id: "C", text: "這文字是否溫款和煦、能不經意間撫慰到某位深夜落寞的友人，傳遞無條件的同理能量", trait: "empath" },
      { id: "D", text: "這項里程碑事件對建立個人專業領袖影響力、展現高效進度與團隊卓越戰果所能帶來的回響", trait: "organizer" }
    ]
  },
  {
    id: 37,
    text: "關於「高度完美主義（High Perfectionism）」這一特徵，你的最高個人詮釋為？",
    category: "work-style",
    options: [
      { id: "A", text: "是在邏輯、算法公式和架構實證中，推導到百分百一絲不苟、完全禁得起極端條件壓力考驗", trait: "analyzer" },
      { id: "B", text: "是完美對位心中那道無與倫比、富含極奧妙美感靈魂的獨特視角，美感上沒有一絲折衷妥協", trait: "creator" },
      { id: "C", text: "是讓每個身在其中的夥伴、甚至小動物都合乎尊嚴、在完全放鬆無批判的溫柔愛意中維持平衡", trait: "empath" },
      { id: "D", text: "是高能量掌控目標，將資源和效率提煉至極點，精確無誤且強大堅毅地贏取第一名寶座", trait: "organizer" }
    ]
  },
  {
    id: 38,
    text: "當你在一項關鍵事項上面對一位意志極為頑固的質疑反對者時，你通常喜歡拿出的核武級武器是？",
    category: "decision-making",
    options: [
      { id: "A", text: "直接亮出客觀無懈可擊的代碼事實、權對比矩陣與前沿學術文獻，用純理性逻辑與實證說服", trait: "analyzer" },
      { id: "B", text: "以充滿美學色彩與驚奇隱喻的故事簡報展示全新未來世界觀，使對方在大腦短路中感到震撼", trait: "creator" },
      { id: "C", text: "先退一步，主動請對方吃一頓午餐傾聽其真正的心理焦慮點，用同理心與真心溫款融化防護罩", trait: "empath" },
      { id: "D", text: "整合核心決策大咖的背書、指出落後大局將蒙受的具體機會成本與利益損失，降維施壓速決", trait: "organizer" }
    ]
  },
  {
    id: 39,
    text: "如果你被邀請在一場旨在倡導「關注當代青年心理盲區」的公益大會上開場，你設計的氛圍會是？",
    category: "conflict-handling",
    options: [
      { id: "A", text: "用大數據思維，將青年焦慮人群的地域分布、生理病因數據做極度客觀簡短的實證揭示", trait: "analyzer" },
      { id: "B", text: "播放一首極具沉浸式、前衛光影的氛圍旋律，配合極度驚豔的原創手繪投影震撼人的眼球", trait: "creator" },
      { id: "C", text: "用極溫柔的低沉耳語，配合全場微弱和煦如點點螢火的暖燈，讓台下所有人深切感到「被愛」", trait: "empath" },
      { id: "D", text: "用極具感召力、充滿力量感的勵志演說，給予大家明確落地的高效戰勝焦慮行動三大錦囊", trait: "organizer" }
    ]
  },
  {
    id: 40,
    text: "對你而言，一個大型專案、一次重要的人生決定，是否算作「真正成功」的最核心邊界在哪裡？",
    category: "decision-making",
    options: [
      { id: "A", text: "是其在理論高度和科學客觀實證上推導出了優雅美妙的長青公式，極致乾淨無雜質", trait: "analyzer" },
      { id: "B", text: "是創造了以前從未有過的事實概念、在人類感知長河中投下了獨一無二且極美的原創漣漪", trait: "creator" },
      { id: "C", text: "是它溫柔且實質拯救或撫平了那些在困頓中瑟瑟發抖的生命，讓人間多了一分慈愛和煦", trait: "empath" },
      { id: "D", text: "是它的產值、競爭優勢、與市場品牌排位拿下了無可辯駁的頂峰實績、實質名列前茅", trait: "organizer" }
    ]
  },
  {
    id: 41,
    text: "在學習一門涵蓋人文與工科的全新課程（如多媒體智能架構學）中，哪一個篇章最讓你沉迷？",
    category: "learning-preference",
    options: [
      { id: "A", text: "深入底層了解其硬件數據存儲、安全協議、以及信息邏輯流在編解碼時的零誤差機制", trait: "analyzer" },
      { id: "B", text: "感官渲染渲染底層、新潮的藝術表現格式和前端炫酷UI動態設計等美感碰撞點", trait: "creator" },
      { id: "C", text: "旨在保護人身心無障礙、如何讓視障聽障群體在浸入式交互中感到最溫馨貼心的篇章", trait: "empath" },
      { id: "D", text: "如何快速商業落地產品、優化多節點供應鏈成本以及如何將點子打包成超級新創融資書", trait: "organizer" }
    ]
  },
  {
    id: 42,
    text: "當你看到某些文創團隊以「不計市場代價、只想完美呈現對靈魂與美感的自我朝聖」獲得讚美時，你第一個浮現的思考？",
    category: "focus-area",
    options: [
      { id: "A", text: "「想法極佳，但若沒有健康的收支平衡算式與量化核算，這終究極難維持永續的良性循環」", trait: "analyzer" },
      { id: "B", text: "「無比崇高！這才是生命不甘於淪為黑白機器的神聖證明。向這種純粹的自由星光致敬」", trait: "creator" },
      { id: "C", text: "「無數溫熱的心聲之所以能在此匯聚，是因為他們講出了人們脆弱時不敢言明的心靈共鳴」", trait: "empath" },
      { id: "D", text: "「美感極佳，但其實可以引入品牌運作與高效眾籌。讓我來帶領運作，它本可以做大十倍」", trait: "organizer" }
    ]
  },
  {
    id: 43,
    text: "如果今天給你一台可以完全自由設定的「時光飛船」，你最渴望前往與融入的情境會是？",
    category: "ideal-weekend",
    options: [
      { id: "A", text: "前往文藝復興時期達文西的手作實驗台，親眼一探其精密機械手稿跟解剖學的最底層邏輯", trait: "analyzer" },
      { id: "B", text: "前往一個萬物精靈、散發著奇異螢光和虛擬多媒體並存的 22 世紀超現實空中藝術都市", trait: "creator" },
      { id: "C", text: "前往一條依山傍水、民風極度溫潤無爭的古代山林居所，與知交在和煦月色下煮茶論心", trait: "empath" },
      { id: "D", text: "前往古羅馬帝國元老院或大航海時期的黃金甲板，在驚濤駭浪中大膽帶領大師船隊開拓新航線", trait: "organizer" }
    ]
  },
  {
    id: 44,
    text: "每當看到自己的工作日程、或者是學習代辦清單密密麻麻，心臟微微抽緊感到被壓迫時，你的絕活是？",
    category: "daily-motivation",
    options: [
      { id: "A", text: "用結構化矩陣(四象限)將事情分級，刪掉所有不合邏輯的干擾，只留最純粹客觀的任務阻擊", trait: "analyzer" },
      { id: "B", text: "大膽扔下一切代辦！去陽台畫一副意料之外的水彩，或者是把書架重新打亂按顏色美感排列", trait: "creator" },
      { id: "C", text: "給好友發信：「今天太累了需要你的一句加油」，或者給自己抱抱，把今天的目標無負擔減半", trait: "empath" },
      { id: "D", text: "把任務大卸八塊拆解成高效的 10 分鐘番茄鐘阻擊，以排山倒海的氣魄一口氣消滅阻礙，凱旋", trait: "organizer" }
    ]
  },
  {
    id: 45,
    text: "三十年後回看人生，你最期盼自己在家祭或後輩學生口中，被形容為一位怎樣的存在？",
    category: "team-role",
    options: [
      { id: "A", text: "「他一世求真，大腦運算如鑽石般純淨耀眼。其留下的客觀著述與推導公式，至今仍在造福後人」", trait: "analyzer" },
      { id: "B", text: "「他是一位將平凡人間染上奇妙星光的織夢師。生命自由絢麗、其點燃的靈感至今仍讓人驚嘆」", trait: "creator" },
      { id: "C", text: "「他溫款和煦如春風，一生挽救、療癒過無數迷惘在夜雨中的弱小靈魂，他是我們心靈的港灣」", trait: "empath" },
      { id: "D", text: "「他是一位運籌帷幄、心懷乾坤的宏偉將軍。他帶領大家攻克重重雄關，言行具有非凡領袖風骨」", trait: "organizer" }
    ]
  },
  {
    id: 46,
    text: "面對一項你從不曾接觸、完全缺乏底氣和信心去攻克的巨型生疏挑戰（如代表團隊高難度談判）時，你心底的最強盾牌是？",
    category: "problem-solving",
    options: [
      { id: "A", text: "分析談判對手的歷年公開發言、算好對方的估值漏洞與法規約束，以精準事實做好無懈防線", trait: "analyzer" },
      { id: "B", text: "不拘泥談判常规套路，隨機準備一個反常規、充滿視覺包裝與戲劇效果的非主流概念，打破框", trait: "creator" },
      { id: "C", text: "以赤誠的同理心，在開談時真誠體恤對方的顧慮點，把劍拔弩張轉化為共同尋求雙贏溫暖的協商", trait: "empath" },
      { id: "D", text: "做好最壞打算，亮出己方無可撼動的籌碼實力，在談話中牢牢掌控進展語氣，強力主導節奏", trait: "organizer" }
    ]
  },
  {
    id: 47,
    text: "若要在一個全新的公共網絡系統設計中均衡「完美無暇的數據審計安全（C）」與「極致蓬勃的自由與用戶體驗（P）」，你內心天然的指南針更偏向？",
    category: "focus-area",
    options: [
      { id: "A", text: "完美無暇的實證審計，寧可速度有所限制，也絕對不允許數據在流轉中發生萬分之一差錯", trait: "analyzer" },
      { id: "B", text: "自由靈動，允許系統具有探索野蠻成長、甚至是某些視覺bug，這才是孕育原創創意的豐饒沃土", trait: "creator" },
      { id: "C", text: "用戶的體貼感受，系統在報錯時必須給出極溫馨溫軟的調停撫慰文字、徹底消除用戶受挫感", trait: "empath" },
      { id: "D", text: "極致高效的控制，保障整個戰略運營的暢通無阻與可監控性、隨時能果斷防禦或指派修復", trait: "organizer" }
    ]
  },
  {
    id: 48,
    text: "在白髮蒼蒼、規劃功成身退的晚年黃金時期時，你靈魂深處最想聽到的夕陽餘暉低語是？",
    category: "energy-source",
    options: [
      { id: "A", text: "我這一生都在看透萬物运行本質，直到最後一刻我都維持著冷靜而剔透的高智商思維", trait: "analyzer" },
      { id: "B", text: "我一生都不曾為了任何名利枷鎖出賣自己的靈魂和好奇心，我的星空畫布至今仍絢爛奪目", trait: "creator" },
      { id: "C", text: "我用盡我的柔情溫和擁抱了這個苦難的人世，看著那些被我攙扶的人幸福安康，我毫無遺憾", trait: "empath" },
      { id: "D", text: "我立過汗馬功勞、攀登過巍巍王座、且在多個複雜風暴中挽狂瀾於既倒，功名赫赫、無愧領袖", trait: "organizer" }
    ]
  },
  {
    id: 49,
    text: "當你在一間科技文創主管職位上、必須在多個不同美學流派與預算分配的辦公陳設中做出二選一決定，你傾向？",
    category: "decision-making",
    options: [
      { id: "A", text: "對照兩組方案的坪效比、隔音客觀參數以及健康人體工學數值，用定量評分直接算出最優解", trait: "analyzer" },
      { id: "B", text: "毫不遲疑挑選那個設計理念大膽奇特、光影令人震撼、具有極致原創性的新派多媒體藝術風", trait: "creator" },
      { id: "C", text: "挑選那個綠意盎然、充滿原木棉麻溫润質感、設有大片可隨意坐下的小聚喝茶聊天角落之方案", trait: "empath" },
      { id: "D", text: "挑選能完美顯現公司強大商業實力、主管套房氣派尊貴且利於進行核心商務融資談判之現代輕奢風", trait: "organizer" }
    ]
  },
  {
    id: 50,
    text: "最後，你覺得這趟「自我探索與職涯身心靈評測」在您今日人生長河中的核心寄望與意義是？",
    category: "focus-area",
    options: [
      { id: "A", text: "獲得一份嚴密乾淨、禁得起心理測驗理論體系考驗的精準特質對照，在客觀層面深度瞭解自身", trait: "analyzer" },
      { id: "B", text: "在美麗意境的交互和多維畫卷中撞出驚訝的靈魂火花、重拾對未來人生的原創想像與美學好奇", trait: "creator" },
      { id: "C", text: "在導師溫款、無批判的文字中，讓靈魂感到被深深同理和溫柔療癒，找到能安放脆弱的家", trait: "empath" },
      { id: "D", text: "獲得極具落地指針的職涯戰略戰術大禮包，快速解鎖我的弱點、用最強作風攻略未來的職場頂峰", trait: "organizer" }
    ]
  }
];

/**
 * Universal rule-based fallback analyzer supporting dynamic answer lengths (e.g., 10, 25, 50)
 * accurately mapping and scaling the scores.
 */
export function analyzeAnswersFallback(answers: { [questionId: number]: string }): AnalysisResult {
  const counts: { [key: string]: number } = { analyzer: 0, creator: 0, empath: 0, organizer: 0 };
  let totalAnswered = 0;

  for (const [qIdStr, optId] of Object.entries(answers)) {
    const qId = Number(qIdStr);
    const q = QUESTIONS.find(qi => qi.id === qId);
    if (q) {
      const selectedOption = q.options.find(o => o.id === optId);
      if (selectedOption) {
        counts[selectedOption.trait] = (counts[selectedOption.trait] || 0) + 1;
        totalAnswered++;
      }
    }
  }

  // Fallback count safeguards
  if (totalAnswered === 0) {
    totalAnswered = 1;
    counts.analyzer = 1;
  }

  // Find dominant and secondary traits
  const sortedTraits = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxTrait = sortedTraits[0][0];
  const secondTrait = sortedTraits[1][0];
  const maxCount = sortedTraits[0][1];
  const secondCount = sortedTraits[1][1];
  
  // Define if there's a strong secondary trait (within 15% of the total or just the next highest)
  const isHybrid = (maxCount - secondCount) / (totalAnswered || 1) <= 0.15;

  // Scale and refine DISC percentages (approx summing up to 100)
  const D_raw = Math.round((counts.organizer / totalAnswered) * 100);
  const I_raw = Math.round((counts.creator / totalAnswered) * 100);
  const S_raw = Math.round((counts.empath / totalAnswered) * 100);
  const C_raw = Math.round((counts.analyzer / totalAnswered) * 100);

  const sum_raw = D_raw + I_raw + S_raw + C_raw || 1;
  const D = Math.round((D_raw / sum_raw) * 100);
  const I = Math.round((I_raw / sum_raw) * 100);
  const S = Math.round((S_raw / sum_raw) * 100);
  const C = 100 - (D + I + S);

  // MBTI percentages
  const E_I_val = Math.round(((counts.organizer + counts.creator) / totalAnswered) * 100);
  const S_N_val = Math.round(((counts.creator + counts.empath) / totalAnswered) * 100);
  const T_F_val = Math.round(((counts.empath + counts.creator) / totalAnswered) * 100);
  const J_P_val = Math.round(((counts.creator * 1.5 + counts.empath * 0.5) / (totalAnswered * 1.5)) * 100);

  const clamp = (val: number) => Math.max(15, Math.min(85, isNaN(val) ? 50 : val));

  if (maxTrait === "creator") {
    return {
      personalityTalents: {
        title: "無拘無束的「星空編織者」 (Creator & Innovator)",
        description: "你體內流淌著追逐靈感與探索未知的自由血液。你不甘於一成不變，能從微小的日常缝隙中發現不可思議的詩意與創意。對美、色彩、文字、聲音或概念有極高敏銳度，直覺奇強，是天生的靈感發明家。",
        keywords: ["靈性美感", "思維跳躍", "非凡直覺", "多元原創性"],
        strengths: [
          "直覺洞察力：常能在渾沌中看見意想不到的關聯與跨界創意。",
          "不懈原創熱情：富有美感底蘊，能用極具感染力的視角呈現觀點。",
          "高度彈性心靈：不迷信權威，對世界充滿好奇，隨時準備打破框架。"
        ]
      },
      suitableCareers: {
        title: "美學、文創、設計與自由概念探索者",
        industries: ["文創設計、廣告傳媒、影視藝術、遊戲企劃、品牌創意推廣、多元自由創作者"],
        roles: ["視覺設計師、創意總監、文案企劃、原創作家/編劇、遊戲關卡策劃、新媒體自媒體創作者"],
        reasons: "你需要一個能最大程度發揮靈魂厚度與獨立性的環境。流水線、機械化及充斥死板KPI的微觀管理會扼殺你的生機。在擁有足夠自主空間且高度講求美感、概念破局的舞台，你才能大放異彩。"
      },
      suitableMajors: {
        title: "創意藝術、人文傳播與多媒體設計科系",
        majors: ["視覺傳達設計、多媒體動畫、大眾傳播學系、中文/外文創作組、戲劇與電影學系、心理與人文探索"],
        skillsToDevelop: ["基礎美學工具與技能(UI/UX、影音編輯)", "將天馬行空想法落地為具體可行商業企劃的結構化能力", "在壓力中維持創作節奏的自律力"],
        reasons: "這些科系能給予你豐沛的人文滋養、靈感碰撞以及多元媒材的實作機會，同時幫助你在學術探討中找到用美感詮釋世界真理的理論支持。"
      },
      bodyAdvice: {
        energyState: "繁星律動型：靈感迸發時能量極高，但也極易因沉浸創作而忘卻生理界限。",
        dietAndExercise: [
          "定時定量進食，避免因熱情投入而忘記吃飯導致血糖劇烈波動。",
          "多嘗試舞蹈、現代瑜伽或戶外跑步等能把思想拉回身體連結的感官舒展運動。",
          "補充富含 Omega-3 的堅果與莓果，維持大腦細胞的敏銳修補。"
        ],
        stressPhysicalManifestation: "壓力大時常伴隨睡眠障礙、偏頭痛或胃食道逆流；這是大腦多巴胺過度活躍而身體抗議的緊繃信號。"
      },
      mindAdvice: {
        coreBelief: "「生命是一場神聖的畫作，我不必成為任何人眼中的標準藍圖。」",
        mindfulnessPractice: "在畫布或日記本上進行不帶批判的「自由書寫」或「直覺繪畫」，每天15分鐘，傾瀉內心澎湃的情感，歸於寂靜。",
        growthFocus: "學習擁抱規律與結構。規律不是束縛，而是能幫助你承接驚艷靈感的鋼骨結構。"
      },
      holisticSummary: "親愛的創作者，你的存在為黑白的理性世界注入了斑斕的靈魂光芒。你的身心靈指南在於：學會用自律的健康作息搭建溫柔的渠道，讓你的星光創意能流淌到塵世，照亮更寬廣的天空。",
      mbtiProfile: {
        code: E_I_val > 50 ? "ENFP" : "INFP",
        name: E_I_val > 50 ? "ENFP 啟發者 / 靈感展現家" : "INFP 調停者 / 星空編織家",
        description: E_I_val > 50
          ? "你熱情洋溢、活力四射。善於激勵夥伴、編織天馬行空的跨界思維，是個不折不扣的情感與創意發揮者。"
          : "你溫柔、理想化且富有創造力。具有極其深沈的美學直覺與核心探索渴望。不甘於常規框架，常用直覺突破重圍。",
        traitsBreakdown: { E_I: clamp(E_I_val), S_N: clamp(S_N_val), T_F: clamp(T_F_val), J_P: clamp(J_P_val) }
      },
      discProfile: {
        code: I > D && I > S && I > C ? "I" : "ID",
        name: "影響型 / 創意熱情家 (Influence Style)",
        description: "高 I 特質賦予你獨一無二的感召力與想像力。你熱愛啟發他人，將枯燥的事物用新奇的視角重新詮釋，能自然地將情緒溫度與美感價值播撒在周遭環境中。",
        stylePercentages: { D, I, S, C }
      }
    };
  } else if (maxTrait === "empath") {
    return {
      personalityTalents: {
        title: "溫柔和煦的「心靈守護人」 (Empath & Facilitator)",
        description: "你的心靈就像一片平靜溫潤的湖泊，能精準折射並包容世間萬物的感受。你天生擁有極致的同理心與傾聽天賦，善於看見隱藏於言語背後的孤單與需要。人們在你的身邊會不由自主解開防備，尋得安寧。",
        keywords: ["同理修復", "人際調解", "靈性自省", "深層療癒"],
        strengths: [
          "極致傾聽與修補：能建立高安全性的人際場域，用溫柔化解暴戾。",
          "敏銳的人文直覺：對個體內在動機與社會情感趨勢有先知般的敏銳度。",
          "共情凝聚力：在團隊中默默滋養夥伴，是不可多得的隱性領袖。"
        ]
      },
      suitableCareers: {
        title: "教育、心理諮商、身心靈健康與人際溝通橋樑",
        industries: ["心理諮商、學校與成人教育、社會服務、非營利組織與NGO、醫療照護、企業永續(ESG/HR)"],
        roles: ["心理諮商師、職涯引導師、特殊教育老師、企業人資招募/員工關懷、靈性身心靈療癒師、非營利專案總監"],
        reasons: "你的內在驅動力源自於「這件事能深切幫助到生命」。冰冷的純金錢博弈和充斥辦公室鬥爭的惡性對立會讓你痛苦萬分。在能真切傳遞善良價值、提供生命溫度的事業中，你可以綻放無比光彩。"
      },
      suitableMajors: {
        title: "心理學、人文教育與社會人文科學",
        majors: ["臨床與諮商心理學系、社會工作學系、幼兒與特殊教育學系、外國語文學與人類學、護理與身心靈療癒學系"],
        skillsToDevelop: ["健康的情緒界線設立：分辨『他人的痛苦』與『自己的感受』", "心理諮商的實證技術與溝通科學學術背景", "結構化輔導 or 教育方案設計能力"],
        reasons: "這些科系提供你科學化的理論框架，讓你的浩瀚同理心能透過專業諮商與教育技術，精準且安全、有效地傳遞給受創的心願，而不至於燒盡自我。"
      },
      bodyAdvice: {
        energyState: "海綿共感型：極易像海綿一樣吸飽周圍環境與他人的負能量，導致生理沉重。",
        dietAndExercise: [
          "強烈建議定期『大地連結（Grounding）』：赤腳踩在草地上或擁抱樹木、在森林散步，排空雜亂能量。",
          "飲食上多攝取天然溫熱的原型食物，減少冰冷刺激，溫和呵護敏感的脾胃。",
          "練習每天睡前以溫水熱水泡腳，並配合深長的腹式呼吸，將積累在身體的共情負擔排空。"
        ],
        stressPhysicalManifestation: "當吸附過多焦慮時，常莫名出現胸悶、心悸、全身肌肉酸痛不適 or 容易過敏的現象。"
      },
      mindAdvice: {
        coreBelief: "「我用溫柔抱著世界，我也配得被自己用最深情的力量寵愛。」",
        mindfulnessPractice: "每天清晨進行「慈心禪（Metta Meditation）」或能量「金鐘罩防護罩」冥想：想像溫和的金色柔光籠罩自己，篩濾外界過度繁雜的情绪雜訊。",
        growthFocus: "修煉「富有同理心的果斷拒絕」。界線並非冷血隔絕，而是為了讓愛的燈火能燃燒得更穩更長久。"
      },
      holisticSummary: "親愛的心靈守護者，這個喧囂狂熱的世界因你的溫柔而能保有一處清泉。你的身心靈調養重在「排毒與界線」。唯有將自己的聖杯先斟滿了，你流瀉而出的慈愛與關懷才能永不枯竭。",
      mbtiProfile: {
        code: E_I_val > 50 ? "ENFJ" : "INFJ",
        name: E_I_val > 50 ? "ENFJ 導師 / 溫暖導引師" : "INFJ 提倡者 / 心靈守護人",
        description: E_I_val > 50
          ? "你熱情、富有同理心，天生擅長激發他人潛能。你具有深刻的洞察力與精神信仰，渴望引導夥伴與人道工作協調前行。"
          : "你富有同理心，具有深刻的洞察力與溫柔的修復特質。你渴望理解他人背後的動機，默默用靈魂之水滋養身旁的世界。",
        traitsBreakdown: { E_I: clamp(E_I_val), S_N: clamp(S_N_val), T_F: clamp(T_F_val), J_P: clamp(J_P_val) }
      },
      discProfile: {
        code: "S",
        name: "穩健型 / 心靈和平使者 (Steadiness Style)",
        description: "高 S 特質使你成為團隊中最具包容力、同理心與傾聽底蘊的黏著劑。你散發沉靜的力量，能默默調解矛盾，給周圍的人帶來滿滿的安全感和信任。",
        stylePercentages: { D, I, S, C }
      }
    };
  } else if (maxTrait === "organizer") {
    return {
      personalityTalents: {
        title: "運籌帷幄的「黃金領航家」 (Organizer & Leader)",
        description: "你體內燃燒著征服高峰、開拓疆土的熊熊烈火。你思維縝密、重視效能、抗壓能力極強，面對混亂失序的困境時，能立刻找出關鍵樞紐並帶兵列陣、一鼓作氣贏下勝利。天生自帶領袖氣場，目標指引實踐。",
        keywords: ["高執行力", "宏觀布局", "高抗壓抗挫", "果斷堅韌"],
        strengths: [
          "使命必達執行力：能把虛無計畫拆解成精密執行漏斗，精準把握時機。",
          "宏觀策略本能：不因小細節迷航，時刻保持大局觀與堅定的意志力。",
          "開拓之姿：具備感召他人、分配籌碼與勇敢推進複雜談判的決斷魄力。"
        ]
      },
      suitableCareers: {
        title: "商業管理、企業營運、專案管理與商業創新實踐",
        industries: ["商業顧問與新創、科技專案與產品管理、金融創投、行銷公關、法務營運與組織領導"],
        roles: ["新創共同創辦人/高階總管、高級專案經理(PM)、商業策略分析師、市場行銷總監、法務合規領導者"],
        reasons: "你需要一個和商業管理營運最看重的巨大舞台，並具備實質掌控決定權。重複庸常的工作會讓你意志消沉。在挑戰巨大、注重商業效益的激烈戰局中，你的領航本領最受敬重。"
      },
      suitableMajors: {
        title: "工商管理、法律與財經決策科學科系",
        majors: ["企業管理與國際商學、財務金融、法律與政治哲學、專案營運工程、巨量資訊商業分析學系"],
        skillsToDevelop: ["深度的數位商業科技與底層邏輯洞察力", "正念引導力：在高壓風暴中如何穩定自己與下屬心境的軟實力", "對異質意見的接納眼界與包容涵養"],
        reasons: "這些科系能全面培植你的商戰思維、合規風控意識、以及管理決策技巧，為你的領袖熱誠配備最實用的鋼盾與利刃。"
      },
      bodyAdvice: {
        energyState: "引擎風暴型：像一台24小時不熄火的超跑，慣性能量滿載，但容易一瞬間過熱死機（Burnout）。",
        dietAndExercise: [
          "嚴防精緻糖與過度咖啡因帶來的短暫虛假振奮，多吃粗糙原型醣類與高蛋白質維持長效續航。",
          "多安排具挑戰性且需要百分百聚焦的反饋運動，如拳擊、馬拉松、壁球 or 攀岩，徹底燃燒腎上腺素。",
          "嚴格規定關掉手機的高品質無干擾深度睡眠習慣，維持褪黑激素健康分泌。"
        ],
        stressPhysicalManifestation: "緊繃、肩頸或下顎關節緊咬僵硬、夜間磨牙，或是高血壓與偶發性心律急促不適。"
      },
      mindAdvice: {
        coreBelief: "「我能征服無數雄關，但我也有權力在月光下卸下鎧甲，示弱休憩。」",
        mindfulnessPractice: "在每日行程中強行穿插10分鐘的「吐納（Box Breathing）箱式呼吸」練習，專心凝視呼與吸的過程，主動調降心律，平復緊繃思維。",
        growthFocus: "學習擁抱變數與失控。最頂級的控制並非消滅所有不確定性，而是帶著幽默和從容與不確定性共舞。"
      },
      holisticSummary: "親愛的領航家，你的果敢是世界前行的強大推土機。然而要建立千秋偉業，必須先呵護好自己的鋼鐵心臟。調養密鑰在於「動靜開關切換」：能在衝刺時全神貫注，亦能在歇息時一秒沈潛，才能行穩致遠。",
      mbtiProfile: {
        code: E_I_val > 50 ? "ENTJ" : "INTJ",
        name: E_I_val > 50 ? "ENTJ 指揮官 / 戰略實踐家" : "INTJ 戰略家 / 系統布局師",
        description: E_I_val > 50
          ? "你天生富於遠見、果斷堅韌，擅長在複雜大局中進行資源統籌。思維縝密，天生自帶領袖風骨與極強的執行魄力。"
          : "你擁有超凡的遠見與定力，將人生視為精密布局的沙盤。你追求極致，能默默策劃宏觀架構並堅定推進其實踐。",
        traitsBreakdown: { E_I: clamp(E_I_val), S_N: clamp(S_N_val), T_F: clamp(T_F_val), J_P: clamp(J_P_val) }
      },
      discProfile: {
        code: "D",
        name: "支配型 / 指揮開拓領袖 (Dominance Style)",
        description: "高 D 特質讓你追求實際戰功與時效。你不畏畏難、對目標有極高敏感度，意志堅定，在混亂失序面前能快速帶領所有人破局而出。",
        stylePercentages: { D, I, S, C }
      }
    };
  } else {
    // Current Trait: analyzer (also default)
    return {
      personalityTalents: {
        title: "洞燭先機的「智慧透視眼」 (Analyzer & Strategist)",
        description: "你的大腦是一部精確而優雅的邏輯處理器。你本能地反對混亂與空洞，追求在繁複的雜音中找出事物最底層的運行公式。你擁有極高的定力與敏銳觀察力，是天生的科學發現者、數據大師、系統解構者編織人。",
        keywords: ["嚴謹因果", "架構之王", "敏學深思", "高度專注力"],
        strengths: [
          "底層邏輯推導：拒絕跟風，只相信經得起反覆辯證扣連的邏輯與事實。",
          "宏偉系統構建：善於將零散無序的繁雜資訊重組，理出優雅清晰的脈絡。",
          "卓越定力深度：可以連續多年孤獨探索某個高度艱深的專業技術盲區。"
        ]
      },
      suitableCareers: {
        title: "科學研究、軟體系統工程與深度數據邏輯剖析",
        industries: ["軟體資訊科技、科學與醫學實驗研發、數據分析與精算、系統安全防護、複雜流程與精密運籌學"],
        roles: ["後端研發工程師、AI演算法科學家、數據建模架構師、金融精算師、醫學分子研究員、高精準度品質審計官"],
        reasons: "你需要一個能讓智商得到強烈挑戰、並且講求客觀實證、技術說話的純淨環境。充滿感性誇張噱頭、或只講求靠舌頭關係周旋的職務會耗盡你的心力。在技術與實力掛帥的園地，你就是令人敬仰的邏輯燈塔。"
      },
      suitableMajors: {
        title: "資訊工程、基礎科學與量化分析學科",
        majors: ["資訊工程與資料科學學系、純數學與物理學系、分子生物醫療研發、電子與半導體材料工程、計量經濟與統計精算學系"],
        skillsToDevelop: ["跨領域商業與人文痛點的轉譯能力：如何把複雜技術解釋給麻瓜聽", "團體敏捷協調、人際社交暖度的彈性發揮", "在數據之外聆聽直覺的美感觸覺"],
        reasons: "這些科系是人類智慧邏輯的最前線，能給予你源源不斷的高智商刺激與嚴密學理訓練，讓你可以架構工具去改變世界本質規律。"
      },
      bodyAdvice: {
        energyState: "智慧結晶型：長期在大腦前額葉高度耗能，導致身體核心體溫偏冷、氣血大多凝滯於頭部。",
        dietAndExercise: [
          "每工作50分鐘務必強迫自己站立，凝視遠方或走動喝水，釋放眼部與大腦皮層緊繃。",
          "多吃有助於活血抗發炎的食物，如深綠色蔬菜、亞麻仁油、薑黃與黑豆。",
          "推薦結合高度專注平衡與緩慢呼吸的運動，例如太極、內觀緩步冥想，或者拉筋伸展，把浮在腦袋的血氣導回雙腳。"
        ],
        stressPhysicalManifestation: "壓力大時容易導致肩頸極僵硬、頭皮緊繃發麻、消化不良腹脹或嚴重的乾眼症。"
      },
      mindAdvice: {
        coreBelief: "「世界是有軌跡可循的，而當它不完美時，它亦有其殘缺的自然之美。」",
        mindfulnessPractice: "在空無一物的明亮房間裡練習進行「正念掃描身體（Body Scan）」：不對身體器官做邏輯診斷，僅溫和客觀體察此時此刻每一吋肌膚的冷熱痛癢，學會單純存在。",
        growthFocus: "學習寬容地接受「非邏輯的感性美華」。人類的情感並非都是代數公式，殘缺、不合理亦是生活的斑斕部分。"
      },
      holisticSummary: "親愛的智者，你清澈睿智的目光是人類破解未知迷霧的明燈。然而，記住你不是冰冷的計算機，而是一具擁有血肉氣息的珍貴載體。照顧好脊椎與脾胃，學會用呼吸溫柔擁抱情感，你的智慧之樹必將開出動人的花朵。",
      mbtiProfile: {
        code: E_I_val > 50 ? "INTP" : "INTJ",
        name: E_I_val > 50 ? "INTP 學者 / 智慧分析眼" : "INTJ 建築師 / 精密計畫者",
        description: E_I_val > 50
          ? "你熱愛邏輯、具有無窮的探索欲，崇尚客觀事實與因果推論。在大腦裡建構精細的世界模型，專門克服複雜邏輯死角。"
          : "你冷靜嚴密、凡事求精準卓越，重視底層邏輯推導。你把工作與生活整理成高效高回報的完整拓撲圖，用實力照亮一切。",
        traitsBreakdown: { E_I: clamp(E_I_val), S_N: clamp(S_N_val), T_F: clamp(T_F_val), J_P: clamp(J_P_val) }
      },
      discProfile: {
        code: "C",
        name: "服從分析型 / 邏輯品質大師 (Conscientiousness Style)",
        description: "高 C 特質使你拒絕跟風、堅持獨立論證與客觀數據。你在系統架構、因果推導和精細數據流程上散發如燈塔般指引方向。世界因你的求證精神而免於滑入混亂失序。",
        stylePercentages: { D, I, S, C }
      }
    };
  }
}

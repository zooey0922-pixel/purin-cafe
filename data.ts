import { Project, JournalEntry, ConceptItem, GalleryItem } from './types';

export const ABOUT_STORY = {
  name: '千媃 Zooey',
  title: 'Fan Experience Planner | 粉絲體驗企劃師',
  intro: '經營布丁狗主題同好社群，持續透過創意企劃與視覺設計探索「粉絲文化」與「角色 IP」之間的情感連結。',
  storyMarkdown: `我的旅程源自於參與各式各樣的 K-pop 應援咖啡廳活動。

在那裡，我第一次親身體會到：一個精緻的紙杯套、一個用心規畫的拍照打卡點、或是一份富有巧思的限量限定特典，是如何點亮粉絲的雙眼，並在陌生的同好之間激發出無與倫比的情感凝聚力。

隨著在粉絲文化中持續探索，以及親自經營一個布丁狗（Pompompurin）同好主題社群，我深深著迷於人們如何因為共同的熱好與喜愛的經典角色聚集。

今天，我希望能將**粉絲文化的狂熱**與**經典角色 IP 的感染力**結合。結合社群互動、精緻設計與創意企劃，為每一位支持者打造帶有手感溫度、值得被一輩子珍藏的專屬回憶。`,
  githubUrl: '#',
  threadsUrl: 'https://www.threads.net/@qianrouxia',
  email: 'zooey0922@gmail.com',
};

export const PROJECTS: Project[] = [
  {
    id: 'kpop-support-cafe',
    title: 'K-pop Support Café Experience',
    subtitle: 'K-pop 應援咖啡廳企劃',
    category: 'fandom',
    categoryLabel: 'Event Planning & Design',
    coverUrl: 'https://i.ibb.co/Tx0DG4fG/IMG-6678.jpg',
    description: '一場充滿儀式感與感官驚喜的韓團應援咖啡廳。從多款手繪應援周邊（卡套、壓克力吊飾、面紙包、貼紙等），到精心策劃的拍照打卡區，將粉絲滿滿的心意融入舒適、溫馨的咖啡廳，為粉絲們創造深度交流的夢幻空間。',
    keyAchievements: [
      '週末二日及加開一日活動共吸引 300+ 位同好現場排隊熱烈參與',
      '限量應援特典（精裝設計小卡、手繪貼紙套組）首日發放率於 3 小時內全數售罄',
      '社群提及度極高，活動專屬 Hashtag 於 Instagram 累計破 3,000+ 次貼文與限動推廣'
    ],
    gallery: [
      { url: 'https://i.ibb.co/1tYKGG0T/IMG-6611.jpg', caption: '應援店鋪吧台與主視覺展示' },
      { url: 'https://i.ibb.co/XrFsyk4m/IMG-6586.avif', caption: '同好現場交流與寄語拍照牆' },
      { url: 'https://i.ibb.co/xKGnnFSr/IMG-6613.jpg', caption: '活動副視覺：溫馨插畫風設計明信片' }
    ],
    details: '本活動從活動前期的社群預熱、實體特典的代工發想與印刷監製、線下咖啡廳場地的洽談，到當日的動線引導、視覺擺設陳列，皆全手把手包辦。',
    date: '2025 年 ７ 月',
    tags: ['活動企劃', '特典設計', '空間佈置', '線下策展', 'K-pop 應援']
  },
  {
    id: 'pompompurin-community',
    title: 'Pompompurin Fandom Community',
    subtitle: '布丁狗主題同好社群經營',
    category: 'community',
    categoryLabel: 'Community Management',
    coverUrl: 'https://i.ibb.co/Ld7Qfcrk/IMG-7983.jpg',
    description: '經營高度活躍的 Pompompurin（布丁狗）粉絲社群。以精心排版的原創治癒系角色圖文、日常暖心互動單元、與粉絲共創的小遊戲，串聯喜愛經典療癒 IP 的同好，在資訊喧囂的社群中經營一塊純淨且充滿歸屬感的溫馨一角。',
    keyAchievements: [
      '社群粉絲數量於半年內達成高達 150% 的自然有機增長（Organic Growth）',
      '成功創辦線上「布丁日誌與生日應援」聯合推廣，吸引上百位同好投稿手繪與收藏展示',
      '粉絲互動率（Engagement Rate）穩定維持在 18% 以上，遠超同類型帳號之平均值'
    ],
    gallery: [
      { url: 'https://i.ibb.co/xSRtYNfY/IMG-7984.jpg', caption: '主題自製療癒插畫精選' },
      { url: 'https://i.ibb.co/8nsGp3LN/IMG-4618.avif', caption: '布丁狗收藏同好共創挑戰企劃' }
    ],
    details: '以「治癒與同理心」為核心內容策略。透過研究角色粉群的心理特徵，開發「今日幸運布丁卡」、「布丁辦公室碎碎念」等專屬日常主題，以清新溫暖的手繪排版風格，使社群不僅僅是單向的資訊發布，而是一個能讓粉絲們天天來聊天加油的互動港灣。',
    date: '2026 年 04 月',
    tags: ['社群經營', '內容企劃', '品牌說故事', '角色行銷', '粉絲共創']
  },
  {
    id: 'fandom-merchandise-design',
    title: 'Fan Merchandise & Creative Gifts',
    subtitle: '專屬周邊特典與品牌設計',
    category: 'design',
    categoryLabel: 'Visual Design & Merch',
    coverUrl: 'https://i.ibb.co/xKGnnFSr/IMG-6613.jpg',
    description: '專為粉絲聚會與應援活動開發的高質感收藏級周邊。涵蓋異形雷射貼紙組、手繪面紙包、特厚透明亞克力吊飾、手繪明信片，以及偶像大頭髮夾。將經典設計轉化為具有手感溫度的珍藏回憶。',
    keyAchievements: [
      '主導設計並印製超過 30+ 種原創及同人應援周邊商品，品質深受同好信賴',
      '對接 5+ 家專業包裝與特種印刷廠，熟知各種特殊工藝與印刷防踩雷秘訣，保持成品完美呈現'
    ],
    gallery: [
      { url: 'https://i.ibb.co/VYQMTp9M/IMG-1752134869865.jpg', caption: '異形貼紙與磨砂珠光相卡套組' },
      { url: 'https://i.ibb.co/F1xS88J/IMG-6668.jpg', caption: '大頭髮夾' }
    ],
    details: '不論是印刷工藝的挑選，還是特殊紙材的手感拿捏，我都秉持著細密嚴苛的講究。我的目標是讓拿到周邊的粉絲在拿到應援禮那一刻，能得到像中樂透一樣快樂。',
    date: '2026 年 02 月',
    tags: ['周邊設計', '印刷特種工藝', '視覺傳達', '包裝美學', '平面裝幀']
  },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'journal-1',
    title: 'Fan Culture：應援咖啡廳的精緻愛意與創意展現',
    summary: '應援咖啡廳早已超越了單純的偶像支持，進化成一種將社交、慶祝與豐富創意相結合的社群體驗，體現了粉絲與店家雙贏的絕佳契機。',
    content: `應援咖啡廳（Cup Sleeve Event 或 Fan Cafe Support）是 K-Pop 粉絲文化中極具代表性的一環。它早已超越了單純的偶像支持，進化成一種將社交、慶祝與豐富創意相結合的社群體驗，體現了粉絲從單純的「消費者」轉變為「內容共同創造者」的強大自主性。

這類活動通常由粉絲組織自發舉辦，旨在慶祝偶像的特定紀念日。正如這場精心策劃的活動，便是為了慶祝 NewJeans 出道三週年的心意之作。為了這些特別的日子，粉絲會租用咖啡廳並將其佈置成專屬主題空間。只要參與活動或點購特定餐點，就能獲得精心設計的限量紀念品——像是實用的卡套、印有 NJ、MH、HN、DN、HR 縮寫的彩色動物貼紙、精緻的壓克力吊飾，以及可愛的大頭髮夾。這不僅是領取週邊的地方，更是粉絲們交流同好、分享愛意，並為店家帶來商業雙贏的絕佳機會。`,
    date: '2026 年 05 月 20 日',
    category: 'Fan Culture',
    readTime: '5 mins',
    coverUrl: 'https://i.ibb.co/Tx0DG4fG/IMG-6678.jpg'
  },
  {
    id: 'journal-2',
    title: '如何把點子落實成完美的預約制線下體驗？',
    summary: '一場動人的應援活動，最考驗策劃人的莫過於「精準執行力」。分享如何把滿腦子的點子，成功在實體店家完美施展出來的三大關鍵。',
    content: `一場動人的應援活動，除了有滿腔的心意與漂亮的視覺外，最考驗策劃人的莫過於「精準執行力」。如何把滿腦子的點子，成功在實體店家完美施展出來？以下是將熱情化為現實的三大執行關鍵：

### 一、 店家合作與時程敲定 (The Partner Shop)
應援首重雙贏。必須至少在活動前 2-3 個月聯繫店家，提案簡報中要清晰標明：

- **預約數據佐證：** 說明預計開放的總名額與各時段預約人數，讓店家對備料有底。
- **消費與客製化：** 對於店家基本消費的要求，以及是否需提供活動專屬菜單（如呼應偶像特色的拉花）。
- **職責劃分：** 明確雙方當日的任務（例如：店家專心備餐，我方專職負責報到核銷、特典發放與現場氣氛維護）。

### 二、 特典印刷與特殊工藝的工期掌控 (The Merch Pipeline)
那些讓人愛不釋手的卡套、壓克力吊飾與特殊貼紙，千萬不能把希望寄託在最後一週！特種印刷（如鐳射、局部UV、壓克力開模）良率起伏大，時程建議如下：

- **活動前 5 週：** 設計定稿。
- **活動前 4 週：** 發包打樣，確認材質厚度、是否有偏色問題。
- **活動前 2.5 週：** 大貨正式印刷與製作，並務必預留至少 1 週的時間，進行後續的瑕疵檢查、組裝與手工分裝。

### 三、 預約制場次管控與流暢體驗 (Reservation & Experience Management)
既然採取了預約制，就能優雅地免除傳統排隊造成的混亂與周邊抗議，將心力專注於提升每一位粉絲的參與體驗。執行重點在於：

- **1.報到與核銷機制：** 建立順暢的入場流程，提前準備好線上預約名單（如掃描 QR Code 或核對資訊），讓粉絲能快速領取特典入座。
- **2.換場時段控管：** 明確規範每個預約梯次的用餐或停留時間。在換場前 10-15 分鐘進行溫馨提醒，確保場地能順利整理，讓下一批粉絲準時且舒服地入場。`,
    date: '2026 年 04 月 15 日',
    category: 'Event Insights',
    readTime: '8 mins',
    coverUrl: 'https://i.ibb.co/j9x8Hvhh/IMG-6584.avif'
  },
  {
    id: 'journal-3',
    title: '經典角色 IP 如何在 Z 世代社群持續發光？布丁狗 29 年療癒密碼',
    summary: '布丁狗（Pompompurin）自 1996 誕生至今依然穩居人氣榜前茅。分析它如何在新興社群時代，以不變的療癒內核與持續創新的趣味行銷圈粉無數。',
    content: `自 1996 年誕生以來，那隻圓滾滾、戴著深褐色扁帽的黃色黃金獵犬——布丁狗（Pompompurin），至今已邁入第 29 個年頭。在無數新興 3D、暗黑系、怪誕可愛 IP 夾擊的社群時代，它憑什麼依然常駐三麗鷗人氣大賞的前三名？

這其中，有著三個非常值得體驗設計師與社群經營者學習的療癒密碼：

### 密碼一：高容錯率的「不完美與慵懶感」
Z 世代生活在高效、內卷、緊繃的升學與求職巨浪中。布丁狗的座右銘「出門最討厭的是鞋子，最常做的事是睡覺和布丁體操」，這種完全軟融融、拒絕精緻、甚至有點小調皮的小犬設定，成了年輕人最溫柔的心理防衛機制。

### 密碼二：高度生活化的「表情包與模因 (Memes)」
經典的角色如果只躺在靜態插畫裡，便很容易流於陳舊。三麗鷗透過布丁狗官方社群推廣了大量「日常生活崩潰但保持微笑」的表情包。布丁狗被夾在電車門、想減肥卻吃掉巨大布丁、在體重計前掩面痛哭的搞笑插畫，拉近了虛擬與當代上班族學生的距離。

### 密碼三：可觸碰的實體生活伴侶
從主題布丁狗咖啡廳、主題客房，到讓粉絲可以帶著去旅行的「娃片打卡（ぬい撮り）」，布丁狗不再只是一個商標，它融入了粉絲的生命歷程，默默陪伴著每一步喜怒哀樂。

經營社群時，我們要向經典長青 IP 學習的是：別塑造遙不可及的神祇，而是去當一名能陪伴在側、遞上一碗焦糖布丁的暖心夥伴。`,
    date: '2026 年 03 月 10 日',
    category: 'Character IP Trends',
    readTime: '6 mins',
    coverUrl: 'https://i.ibb.co/7t2Ktjm6/IMG-7731.avif'
  },
  {
    id: 'journal-4',
    title: '用情感連結說故事：我的布丁體驗實驗室品牌初衷',
    summary: '分享千媃創立「Purin Experience Lab」的心路歷程，並自我期許將對於粉絲文化的熱愛化為專業，為人們搭起溫暖的交流橋樑。',
    content: `很多人問我：為什麼要把這個網站和我的工作叫做「體驗實驗室」？是因為我喜歡和試管、顯微鏡打交道嗎？

其實，對我而言，**「喜愛某件事物的熱狂」就是這世上最神祕、也最美麗的化學反應。**

當我們把百位粉絲對同樣一首歌、一個角色的愛，注入一間經過設計的實體空間時，那一瞬間釋放出的情感溫度、陌生人相視一笑的感動，比世界上任何一個科學實驗都還要絢美、也更加地真實。

「布丁體驗實驗室 (Purin Experience Lab)」便是我搭建起來，用來觀察、策劃並記錄這項美好化學效應的溫暖基地。

在這裡，我是一個研究員，也是一個造夢者：
- 嘗試將一閃而逝的感動，裝進行裝小卡、紙袋特典裡。
- 嘗試把原本只是商品的布丁狗，策劃成一場可以攜手漫步的主題咖啡廳草稿。
- 嘗試透過一字一句溫度的經營，讓來到這的人都帶著暖洋洋的滿足離開。

謝謝一路上支持我、與我一起交流的每一位。未來，讓我們繼續調配更多有溫度的奇蹟。`,
    date: '2026 年 01 月 05 日',
    category: 'Creative Ideas',
    readTime: '4 mins',
    coverUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600'
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', url: 'https://i.ibb.co/1tYKGG0T/IMG-6611.jpg', caption: '', category: 'events', categoryLabel: '' },
  { id: 'g2', url: 'https://i.ibb.co/XrFsyk4m/IMG-6586.avif', caption: '', category: 'events', categoryLabel: '' },
  { id: 'g3', url: 'https://i.ibb.co/xKGnnFSr/IMG-6613.jpg', caption: '', category: 'events', categoryLabel: '' },
  { id: 'g4', url: 'https://i.ibb.co/Tx0DG4fG/IMG-6678.jpg', caption: '', category: 'events', categoryLabel: '' },
  { id: 'g5', url: 'https://i.ibb.co/j9x8Hvhh/IMG-6584.avif', caption: '', category: 'events', categoryLabel: '' },
];

export const CONCEPT_PROJECT: ConceptItem[] = [
  {
    id: 'c1',
    badge: '空間設計 Concept Board',
    title: 'Warm & Cozy Inside',
    subtitle: '空間與格調規劃',
    description: '整體選用布丁狗靈魂代表色——溫柔奶油黃（#F8E7A1）與焦糖松露棕（#A86A3D）進行室內配色。點綴高質感黃銅餐件與暖融柔烘托，搭配手感橡木書櫃，提供大量可供拍照展示與交流同好的實體桌位，打造既可愛療癒又兼具極致優雅感的暖光空間。',
    imageUrl: 'https://i.ibb.co/cKn0HDRc/Gemini-Generated-Image-5bnrux5bnrux5bnr.png',
  },
  {
    id: 'c2',
    badge: '餐飲開發 Menu Mockup',
    title: 'Purin Gourmet Treats',
    subtitle: '主題原創菜單',
    description: '將角色 IP 與特色美食深度綁定。如「布丁蓋扁帽焦糖瑪奇朵」，咖啡上層蓋有焦糖巧克力製作的可愛貝雷帽；以及「治癒系抖抖生乳焦糖布丁」，焦糖汁完美封裝黃金色澤。每一款餐點既是味蕾饗宴，也是精美的相機快門焦點。',
    imageUrl: 'https://i.ibb.co/SDHsFfYb/Gemini-Generated-Image-5cfmvl5cfmvl5cfm.png',
  },
  {
    id: 'c3',
    badge: '限定周邊 Concept Merch',
    title: 'Exclusive Studio Goods',
    subtitle: '店鋪限定紀念品',
    description: '專為本概念店鋪企劃的極少量手工紀念周邊。例如手提帆布袋（布丁狗與主人外出探險手稿風格）、手工陶藝焦糖小馬克杯，以及厚質印花磨砂玻璃杯。每件周邊均刻印限量的 Purin Experience Lab 特有燙金徽飾標籤。',
    imageUrl: 'https://i.ibb.co/pj4WN3G8/Gemini-Generated-Image-aw733yaw733yaw73.png',
  },
  {
    id: 'c4',
    badge: '情感營運 Event Planner',
    title: 'Fandom Mini Galleria',
    subtitle: '同好交流聚會企劃',
    description: '預計於每月的布丁日、角色生日或特定團體紀念日，舉辦主題聚會。現場設計「布丁寫真展覽牆（娃片寫真聚落）」與「寄語信箱交換企劃」，讓粉絲們在享用咖啡的溫馨閒適之餘，也能把自己的感動透過寄信的方式與其他同好交換、保存。',
    imageUrl: 'https://i.ibb.co/SDspQPtV/Gemini-Generated-Image-m36obzm36obzm36o.png',
  },
];

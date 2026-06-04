import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Smile, Heart, Sparkles, MessageCircle, Pin } from 'lucide-react';

interface StickyNote {
  id: string;
  name: string;
  role: string;
  message: string;
  emoji: string;
  color: 'yellow' | 'pink' | 'orange' | 'green';
  timestamp: string;
}

const DEFAULT_NOTES: StickyNote[] = [
  {
    id: 'd1',
    name: '小妍 Min',
    role: 'K-pop 咖啡廳主辦',
    message: '去年和千媃合作的杯套應援真的太完美了！從印刷到打卡，粉絲都讚不絕口！😭',
    emoji: '☕',
    color: 'yellow',
    timestamp: '2026.05.28',
  },
  {
    id: 'd2',
    name: '布丁狗鐵粉',
    role: '社群同好',
    message: '身為布丁狗狂熱粉，天天看千媃的貼文都被狠狠治癒，希望能真的開概念咖啡店！🐶💛',
    emoji: '🍮',
    color: 'pink',
    timestamp: '2026.06.01',
  },
  {
    id: 'd3',
    name: '咖啡廳老闆 Alan',
    role: '異業合作夥伴',
    message: '很佩服千媃現場規劃和控制人流的細心，有條不紊，把我們店裡擺得超漂亮！🌻',
    emoji: '✨',
    color: 'green',
    timestamp: '2026.05.15',
  },
  {
    id: 'd4',
    name: '季衡',
    role: '平面設計師',
    message: '那套鐳射防偽小卡的印刷工藝好精美！設計美學與手感都拿捏得恰到好處！🎨',
    emoji: '🍰',
    color: 'orange',
    timestamp: '2026.05.30',
  },
];

const STICKY_COLORS = {
  yellow: 'bg-amber-100 border-amber-200 text-amber-900 shadow-amber-200/50',
  pink: 'bg-rose-100 border-rose-200 text-rose-900 shadow-rose-200/50',
  orange: 'bg-orange-100 border-orange-200 text-orange-900 shadow-orange-200/50',
  green: 'bg-emerald-100 border-emerald-200 text-emerald-900 shadow-emerald-200/50',
};

const EMOJIS = ['🍮', '☕', '💛', '🎨', '✨', '🐶', '🍰', '🌸', '🐾', '🎀'];

export default function InteractiveBoard() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('布丁同好');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🍮');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'pink' | 'orange' | 'green'>('yellow');
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize and load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('purin_lab_sticky_notes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        setNotes(DEFAULT_NOTES);
      }
    } else {
      setNotes(DEFAULT_NOTES);
    }
  }, []);

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newNote: StickyNote = {
      id: 'n_' + Date.now(),
      name: name.trim(),
      role: role.trim() || '布丁同好',
      message: message.trim(),
      emoji: selectedEmoji,
      color: selectedColor,
      timestamp: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('purin_lab_sticky_notes', JSON.stringify(updated));

    // Reset Form
    setName('');
    setMessage('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleClearNotes = () => {
    if (window.confirm('確定要回復為預設的溫馨留言嗎？')) {
      setNotes(DEFAULT_NOTES);
      localStorage.setItem('purin_lab_sticky_notes', JSON.stringify(DEFAULT_NOTES));
    }
  };

  return (
    <div className="bg-brand-white rounded-3xl p-6 md:p-10 border border-brand-caramel/10 shadow-warm-md grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden">
      
      {/* Decorative Warm Backing Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-cream/20 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Write Sticker Form (Lft side, 5cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream-light text-brand-caramel text-xs font-bold rounded-full border border-brand-caramel/10 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Wall
          </span>
          <h3 className="text-2xl font-bold text-brand-dark font-sans flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-brand-caramel" />
            留下你的布丁應援留言
          </h3>
          <p className="text-xs md:text-sm text-brand-dark/70 mt-1 leading-relaxed">
            就像在線下應援咖啡廳寫下拍立得留言一樣，給千媃貼上一張充滿愛意的溫暖紙條吧！
          </p>
        </div>

        <form onSubmit={handlePostNote} className="space-y-4 bg-brand-beige/35 p-5 rounded-2xl border border-brand-caramel/10">
          {/* Nickname / Target identity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-brand-caramel uppercase tracking-wider mb-1">
                暱稱 / Name *
              </label>
              <input
                type="text"
                required
                placeholder="例如：布丁星人"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs md:text-sm px-3 py-2 bg-white rounded-xl border border-brand-caramel/25 text-brand-dark placeholder:text-brand-dark/30 focus:ring-2 focus:ring-brand-cream focus:border-brand-caramel outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-caramel uppercase tracking-wider mb-1">
                你的身份 / Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-xs md:text-sm px-3 py-2 bg-white rounded-xl border border-brand-caramel/25 text-brand-dark focus:ring-2 focus:ring-brand-cream focus:border-brand-caramel outline-none transition-all"
              >
                <option value="粉絲同好">🙋 粉絲同好</option>
                <option value="社群小粉絲">🍮 布丁擁護者</option>
                <option value="品牌策劃夥伴">☕ 咖啡廳店主</option>
                <option value="行銷策展代表">💼 合作企劃商</option>
                <option value="設計同行">🎨 設計同行</option>
              </select>
            </div>
          </div>

          {/* Emoji and note color */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-brand-caramel uppercase tracking-wider">
              挑選代表心情圖案 / Favorite Emoji
            </label>
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-white rounded-xl border border-brand-caramel/20">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setSelectedEmoji(e)}
                  className={`text-sm w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    selectedEmoji === e ? 'bg-brand-cream/80 scale-110 shadow-sm' : 'hover:bg-brand-beige/50'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-brand-caramel uppercase tracking-wider">
              紙條底色 / Paste Color
            </label>
            <div className="flex gap-2">
              {(['yellow', 'pink', 'orange', 'green'] as const).map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border flex items-center gap-1.5 capitalize transition-all ${
                    selectedColor === color
                      ? 'border-brand-caramel bg-brand-cream/20 shadow-sm ring-1 ring-brand-caramel/50'
                      : 'border-brand-caramel/10 bg-brand-white/50 text-brand-dark/60'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${color === 'yellow' ? 'bg-amber-200' : color === 'pink' ? 'bg-rose-200' : color === 'orange' ? 'bg-orange-200' : 'bg-emerald-200'}`} />
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Message input */}
          <div>
            <label className="block text-[11px] font-bold text-brand-caramel uppercase tracking-wider mb-1">
              留言內容 / Sweet Words *
            </label>
            <textarea
              required
              rows={3}
              maxLength={150}
              placeholder="寫下一句溫馨簡短的鼓勵吧（一鍵支持治癒！）..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs md:text-sm p-3 bg-white rounded-xl border border-brand-caramel/25 text-brand-dark placeholder:text-brand-dark/30 focus:ring-2 focus:ring-brand-cream focus:border-brand-caramel outline-none transition-all resize-none"
            />
            <div className="text-right text-[10px] text-brand-caramel/50 font-semibold mt-1">
              {message.length}/150 字
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-brand-caramel hover:bg-brand-caramel/90 text-brand-beige font-bold text-sm rounded-xl border border-brand-caramel shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            貼上應援牆！
          </button>

          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 py-1.5 rounded-lg border border-emerald-100"
              >
                🎉 留言貼上成功！感謝你的溫婉愛意！
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Grid Wall Display (Rgt side, 7cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
        {/* Memo board header */}
        <div className="flex items-center justify-between border-b border-brand-beige pb-2">
          <span className="text-xs uppercase font-mono tracking-widest text-brand-caramel/80 font-bold flex items-center gap-1.5">
            <Pin className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            Pureen Support Wall ({notes.length} notes)
          </span>
          {notes.length !== DEFAULT_NOTES.length && (
            <button
              onClick={handleClearNotes}
              className="text-[10px] bg-brand-caramel-light hover:bg-brand-caramel/20 text-brand-caramel px-2 py-1 rounded font-bold transition-colors border border-brand-caramel/10"
            >
              一鍵重置
            </button>
          )}
        </div>

        {/* Board content scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-1.5 bg-brand-beige/20 rounded-2xl border border-dotted border-brand-caramel/20 shadow-inner">
          <AnimatePresence initial={false}>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -15 }}
                className={`p-4.5 rounded-2xl border flex flex-col justify-between text-xs transition-shadow shadow-sm hover:shadow-md relative group ${STICKY_COLORS[note.color]}`}
              >
                {/* Simulated Pin Decor */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-500 shadow-inner opacity-80 group-hover:opacity-100 transition-opacity" />
                
                <div className="space-y-2 mt-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold border-b border-brand-caramel/10 pb-0.5 max-w-[70%] truncate">
                      {note.name}
                    </span>
                    <span className="text-base select-none">{note.emoji || '🍮'}</span>
                  </div>
                  
                  <p className="italic text-[11px] leading-relaxed font-normal whitespace-pre-wrap">
                    「{note.message}」
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-brand-dark/50 font-semibold pt-3 border-t border-brand-caramel/5 mt-3">
                  <span>{note.role}</span>
                  <span>{note.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center text-[11px] text-brand-caramel/50 font-bold self-center">
          💡 所有便利貼均直接儲存於你的瀏覽器，歡迎隨時在本地刷新測試！🍮
        </div>
      </div>
    </div>
  );
}

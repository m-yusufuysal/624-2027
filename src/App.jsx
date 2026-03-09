import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, BookOpen, Activity, Moon, Shield,
  Target, Zap, Coffee, Footprints,
  Eye, PenTool, Crosshair, Menu, X, Cpu, ChevronRight, Hexagon, Users, Dumbbell,
  Globe, Swords, Infinity, Radio, Shirt, Wind, Pill
} from 'lucide-react';
import { START_DATE, TOTAL_DAYS, SIDEBAR_DB, PHASE_CONFIG, DETAILED_SCHEDULE } from './data';

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [currentDate, setCurrentDate] = useState(START_DATE);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    const date = new Date(START_DATE.getTime());
    date.setDate(date.getDate() + (currentDay - 1));
    setCurrentDate(date);
  }, [currentDay]);

  const currentPhaseConfig = PHASE_CONFIG.find(p => currentDay >= p.start && currentDay <= p.end) || PHASE_CONFIG[PHASE_CONFIG.length - 1];
  const currentBookConfig = DETAILED_SCHEDULE.find(p => currentDay >= p.start && currentDay <= p.end) || DETAILED_SCHEDULE[DETAILED_SCHEDULE.length - 1];

  const bookTotalDays = (currentBookConfig.end - currentBookConfig.start) + 1;
  const bookCurrentDay = (currentDay - currentBookConfig.start) + 1;

  const dayOfWeek = currentDate.getDay();
  const isSunday = dayOfWeek === 0;
  const isFastingDay = dayOfWeek === 1 || dayOfWeek === 4;
  const isHalvet = currentDay >= 547;

  const getThemeVars = (theme) => {
    const map = {
      cyan: { bg: "bg-cyan-950/20", border: "border-cyan-800", text: "text-cyan-400", glow: "bg-cyan-500", icon: "text-cyan-500" },
      red: { bg: "bg-red-950/20", border: "border-red-800", text: "text-red-400", glow: "bg-red-500", icon: "text-red-500" },
      orange: { bg: "bg-orange-950/20", border: "border-orange-800", text: "text-orange-400", glow: "bg-orange-500", icon: "text-orange-500" },
      purple: { bg: "bg-purple-950/20", border: "border-purple-800", text: "text-purple-400", glow: "bg-purple-500", icon: "text-purple-500" },
      indigo: { bg: "bg-indigo-950/20", border: "border-indigo-800", text: "text-indigo-400", glow: "bg-indigo-500", icon: "text-indigo-500" },
      emerald: { bg: "bg-emerald-950/20", border: "border-emerald-800", text: "text-emerald-400", glow: "bg-emerald-500", icon: "text-emerald-500" },
      amber: { bg: "bg-amber-950/20", border: "border-amber-600", text: "text-amber-400", glow: "bg-amber-500", icon: "text-amber-500" }
    };
    return map[theme] || map.indigo;
  };
  const themeVars = getThemeVars(currentPhaseConfig.theme);

  let dietPlan = {};
  if (isHalvet) {
    dietPlan = { title: "MUTLAK RİYAZET & VEGAN OMAD", desc: "HAYVANSAL GIDA SIFIR! Akşam tek öğün. Su, 3 adet Acve hurması, 1 kaşık EVOO. Beden zayıflayacak, 3. Göz parlayacak.", icon: <Moon className="w-5 h-5 text-amber-500" />, border: "border-amber-600/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]" };
  } else if (isFastingDay) {
    dietPlan = { title: "NEFİS TERBİYESİ (ORUÇ)", desc: "Sünnet orucu. İftarda et yok. İlikli kemik suyu, kefir, sebze. İradeyi otofaji ile çelikleştirme.", icon: <Shield className="w-5 h-5 text-emerald-500" />, border: "border-emerald-600/50" };
  } else {
    dietPlan = { title: "BİYOLOJİK YÜKSEK PERFORMANS", desc: "Sabah: 3 Yumurta, avokado. Öğle: Yok. Akşam: Somon/Kırmızı Et. Bağırsak astarı için kemik suyu.", icon: <Activity className="w-5 h-5 text-blue-500" />, border: "border-blue-600/50" };
  }

  const getTimeline = () => {
    if (isHalvet) {
      return [
        { time: "04:30", title: "Wim Hof & Teheccüd", desc: "Soğuk duş, Tummo Nefesi. Sükut Yemini.", icon: "Moon" },
        { time: "06:00", title: "Mistik Ateşleme", desc: "tDCS (F3/Fp2). Lion's Mane, Akgünlük.", icon: "Zap" },
        { time: "06:20", title: \`Mükaşefe: \${currentBookConfig.book}\`, desc: \`Eser: \${currentBookConfig.author}. Zihni kapat, satırları kalbine indir.\`, icon: "Target" },
        { time: "18:00", title: "Vegan İftar (OMAD)", desc: "Acve hurması ve su. Et sıfır.", icon: "Coffee" },
        { time: "20:30", title: "Derin Muhasebe", desc: "Magnezyum & NAC. Gazali usulü nefis muhasebesi.", icon: "Moon" }
      ];
    }
    return [
      { time: "04:30", title: "Uyanış, Wim Hof & Teheccüd", desc: "3 Set Tummo Nefesi, Soğuk duş.", icon: "Moon" },
      { time: "05:30", title: "Longevity & İksir", desc: "NMN, Spermidine, Shilajit, Akgünlük.", icon: "Zap" },
      { time: "06:00", title: \`DEEP WORK 1: \${currentBookConfig.book}\`, desc: \`\${currentBookConfig.author}. Taktik: \${currentBookConfig.tactic}\`, icon: "Target" },
      { time: "08:30", title: "Fiziksel Çarpışma", desc: currentPhaseConfig.activity, icon: "Swords" },
      { time: "17:30", title: "Sosyal Simülasyon", desc: "Masada ve iletişimde taktiklerin saha testi.", icon: "Users" },
      { time: "20:30", title: "Yatsı & NAC Temizliği", desc: "Mavi Işık Gözlüğü. NAC, Magnezyum, uyku.", icon: "Moon" }
    ];
  };

  const timeline = getTimeline();
  const IconMap = { Target, Swords, Users, Hexagon, Globe, Footprints, Moon, Activity, Coffee, Zap, BookOpen };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-300 font-sans relative overflow-x-hidden selection:bg-cyan-900/50">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <motion.div 
        animate={{ filter: ['blur(120px)', 'blur(160px)', 'blur(120px)'], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className={\`fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] z-0 pointer-events-none transition-colors duration-1000 \${themeVars.glow} rounded-full\`}
      />
      <motion.div 
        animate={{ filter: ['blur(100px)', 'blur(140px)', 'blur(100px)'], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className={\`fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] z-0 pointer-events-none transition-colors duration-1000 \${themeVars.glow} rounded-full\`}
      />

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90]" 
            />
            <motion.div 
              initial={{ x: '-100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
              className={\`fixed inset-y-0 left-0 w-full sm:w-[420px] bg-[#05070c]/90 backdrop-blur-3xl border-r border-slate-800 z-[100] flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)]\`}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800/60 bg-gradient-to-r from-transparent to-slate-900/20">
                <h2 className="text-sm font-black text-white tracking-[0.2em] flex items-center gap-3">
                  <BookOpen className={\`w-5 h-5 \${themeVars.text}\`} /> VERİTABANI
                </h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-slate-800/30 rounded-full hover:bg-slate-700/50 text-white transition-all hover:rotate-90">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex p-2 bg-[#020408] border-b border-slate-800/60 overflow-x-auto custom-scrollbar gap-1">
                {[ { id: 'books', icon: BookOpen, label: 'Eserler' }, { id: 'supps', icon: Pill, label: 'Kimya' }, { id: 'devices', icon: Cpu, label: 'Donanım' }, { id: 'activities', icon: Swords, label: 'Aura' } ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)} 
                    className={\`flex-1 py-3 px-2 flex items-center justify-center gap-2 text-[10px] font-bold rounded-lg uppercase transition-all whitespace-nowrap \${activeTab === tab.id ? \`bg-slate-800/80 \${themeVars.text} shadow-sm\` : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}\`}
                  >
                    <tab.icon className="w-3.5 h-3.5"/> {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {activeTab === 'books' && SIDEBAR_DB.books.map((phase, idx) => (
                  <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }} className="bg-[#090b14]/50 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700/80 transition-all group">
                    <h3 className={\`text-[10px] font-black \${themeVars.text} mb-3 uppercase tracking-widest border-b border-slate-800/50 pb-2\`}>{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.list.map((b, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start gap-2 group-hover:text-slate-300 transition-colors">
                          <ChevronRight className={\`w-3.5 h-3.5 mt-0.5 shrink-0 \${themeVars.text} opacity-50\`} /> 
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
                
                {activeTab === 'supps' && SIDEBAR_DB.supplements.map((sup, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#090b14]/50 p-4 rounded-xl border border-slate-800/50">
                    <h4 className="font-bold text-white text-xs flex items-center gap-2 mb-2"><Zap className="w-3.5 h-3.5 text-pink-500"/> {sup.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{sup.note}</p>
                  </motion.div>
                ))}

                {activeTab === 'devices' && SIDEBAR_DB.devices.map((dev, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#090b14]/50 p-4 rounded-xl border border-slate-800/50">
                    <h4 className="font-bold text-white text-xs flex items-center gap-2 mb-2"><Radio className="w-3.5 h-3.5 text-blue-400"/> {dev.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{dev.desc}</p>
                  </motion.div>
                ))}

                {activeTab === 'activities' && SIDEBAR_DB.activities.map((act, idx) => {
                  const ActIcon = IconMap[act.icon] || Dumbbell;
                  return (
                    <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx*0.05 }} className="bg-[#0c0f1a] p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                      <h3 className={\`text-xs font-black \${themeVars.text} mb-4 uppercase tracking-wider flex items-center gap-2\`}><ActIcon className="w-4 h-4" /> {act.phase}</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Beden Senkronu</span>
                          <p className="text-xs text-slate-300">{act.physical}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Sosyal Strateji</span>
                          <p className="text-xs text-slate-400">{act.social}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-800">
                          <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1"><Shirt className="w-3 h-3"/> Giyim</span>
                          <p className="text-xs text-slate-400">{act.wardrobe}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1"><Wind className="w-3 h-3"/> Koku</span>
                          <p className="text-xs text-slate-400">{act.fragrance}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#020408]/70 backdrop-blur-xl border-b border-slate-800/50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-all text-white group">
              <Menu className={\`w-5 h-5 group-hover:\${themeVars.text} transition-colors\`} />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-black text-white tracking-[0.2em] uppercase flex items-center gap-2">
                <Infinity className={\`w-6 h-6 \${themeVars.text}\`} /> SİMÜLASYON 624
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-1 w-[200px]">
            <div className="flex justify-between w-full text-[9px] font-black tracking-widest uppercase text-slate-400">
              <span>İlerleme</span>
              <span className={themeVars.text}>{((currentDay / TOTAL_DAYS) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                className={\`h-full \${themeVars.glow} shadow-[0_0_10px_currentColor]\`} 
                initial={{ width: 0 }}
                animate={{ width: \`\${(currentDay / TOTAL_DAYS) * 100}%\` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={\`glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-[#05070c]/90 to-[#0c0f1a]/80 \${themeVars.border} shadow-[0_0_30px_rgba(0,0,0,0.8)]\`}>
            <div className={\`absolute top-0 left-0 w-full h-1.5 opacity-80 \${themeVars.glow}\`}></div>
            <div className={\`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-10 \${themeVars.glow} pointer-events-none\`}></div>
            <h2 className="text-[11px] font-black text-slate-300 mb-6 flex items-center gap-2 uppercase tracking-widest"><Clock className="w-4 h-4" /> Zaman Motoru</h2>
            <input 
              type="range" min="1" max={TOTAL_DAYS} value={currentDay} 
              onChange={(e) => setCurrentDay(parseInt(e.target.value))}
              className={\`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer mb-8 active:scale-[0.98] transition-all \${themeVars.text} shadow-inner\`}
            />
            <div className="flex justify-between items-center bg-[#020408]/80 p-3 rounded-2xl border border-slate-700/50 shadow-inner backdrop-blur-md relative z-10">
              <button onClick={() => setCurrentDay(Math.max(1, currentDay - 1))} className="px-5 py-2 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors">-1 GÜN</button>
              <motion.div key={currentDay} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={\`text-6xl font-black tracking-tighter \${themeVars.text} drop-shadow-[0_0_25px_currentColor]\`}>{currentDay}</motion.div>
              <button onClick={() => setCurrentDay(Math.min(TOTAL_DAYS, currentDay + 1))} className="px-5 py-2 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors">+1 GÜN</button>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className={\`glass-panel rounded-3xl p-6 transition-colors duration-500 \${themeVars.border}\`}>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Target className={\`w-4 h-4 \${themeVars.text}\`}/> Mevcut Katman</h3>
            <div className={\`text-xs font-bold uppercase tracking-wider mb-2 \${themeVars.text}\`}>{currentPhaseConfig.title}</div>
            <p className="text-xs text-slate-400 font-medium mb-6">Faz Odakları: {currentPhaseConfig.author}</p>
            
            <div className="space-y-4 text-xs">
              <div className="bg-[#05070c] p-3 rounded-lg border border-slate-800"><span className="text-slate-500 font-bold mr-2 uppercase">Aksiyon:</span><span className="text-slate-200">{currentPhaseConfig.activity}</span></div>
              <div className="bg-[#05070c] p-3 rounded-lg border border-slate-800"><span className="text-slate-500 font-bold mr-2 uppercase">Giyim:</span><span className="text-slate-300">{currentPhaseConfig.wardrobe}</span></div>
              <div className="bg-[#05070c] p-3 rounded-lg border border-slate-800"><span className="text-slate-500 font-bold mr-2 uppercase">Sosyal:</span><span className="text-slate-400">{currentPhaseConfig.social}</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className={\`glass-panel rounded-3xl p-6 \${dietPlan.border}\`}>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity className="w-4 h-4" /> Biyolojik Yakıt</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#05070c] border border-slate-800">{dietPlan.icon}</div>
              <h4 className="font-bold text-white text-xs tracking-wider uppercase">{dietPlan.title}</h4>
            </div>
            <p className="text-xs text-slate-400 bg-[#05070c]/50 p-4 rounded-xl border border-slate-800/50">{dietPlan.desc}</p>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div 
            key={\`book-\${currentBookConfig.book}\`}
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className={\`glass-panel rounded-3xl p-8 relative overflow-hidden transition-colors duration-700 \${themeVars.border}\`}
          >
            <div className={\`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-20 \${themeVars.glow} pointer-events-none\`}></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 border-b border-slate-800/60 pb-8">
                <div>
                  <div className="flex gap-2 mb-4">
                    <span className={\`inline-flex px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest bg-slate-900 border \${themeVars.border} \${themeVars.text}\`}>
                      GÜNCEL ESER
                    </span>
                    {isHalvet && <span className="inline-flex px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest bg-amber-900/40 border border-amber-700/50 text-amber-400"><Moon className="w-3 h-3 mr-1 inline"/> Halvet Fazı</span>}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3 drop-shadow-md">{currentBookConfig.book}</h3>
                  <p className="text-slate-400 text-sm font-bold flex items-center gap-2 uppercase tracking-wider"><PenTool className="w-4 h-4" /> {currentBookConfig.author}</p>
                </div>
                <div className="bg-[#05070c] p-5 rounded-2xl border border-slate-800 md:min-w-[140px] flex flex-col items-center justify-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Kitap İlerlemesi</span>
                  <div className={\`text-3xl font-black tracking-tighter \${themeVars.text}\`}>
                    {bookCurrentDay} <span className="text-base text-slate-600">/ {bookTotalDays}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#05070c]/50 rounded-xl p-5 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Eye className={\`w-4 h-4 \${themeVars.text}\`}/>
                    <h4 className="font-bold text-white text-[10px] uppercase tracking-widest">Okuma Lensi</h4>
                  </div>
                  <p className="text-slate-300 text-xs">{currentBookConfig.tactic}</p>
                </div>
                <div className="bg-[#05070c]/50 rounded-xl p-5 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Crosshair className={\`w-4 h-4 \${themeVars.text}\`}/>
                    <h4 className="font-bold text-white text-[10px] uppercase tracking-widest">Derin Aksiyon</h4>
                  </div>
                  <p className="text-slate-300 text-xs">{currentBookConfig.action}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-panel rounded-3xl p-8">
            <h2 className="text-xs font-black text-white uppercase tracking-widest mb-8 border-b border-slate-800 pb-4 flex items-center gap-3">
              <Globe className={\`w-5 h-5 \${themeVars.text}\`}/> 24 Saatlik Simülasyon Ağı
            </h2>
            
            <div className="relative border-l border-slate-800 ml-4 space-y-8">
              {timeline.map((item, index) => {
                const ActIcon = IconMap[item.icon] || BookOpen;
                return (
                  <motion.div 
                    key={index} 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 + (index * 0.1) }}
                    className="relative pl-8 group"
                  >
                    <div className={\`absolute -left-4 top-1 w-8 h-8 rounded-lg border border-slate-700 bg-[#05070c] flex items-center justify-center transition-transform group-hover:scale-110 \${themeVars.text}\`}>
                      <ActIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-[#05070c]/60 p-5 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        <span className={\`text-[9px] font-mono font-black border px-2 py-0.5 rounded bg-slate-900 \${themeVars.text} \${themeVars.border}\`}>{item.time}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

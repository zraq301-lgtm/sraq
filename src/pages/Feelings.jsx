import React, { useState, useEffect } from 'react';
import { 
  Heart, Sparkles, Send, User, Calendar, 
  Baby, Shield, Moon, Sun, Ghost, 
  Leaf, Smile, Briefcase, ChevronDown, X 
} from 'lucide-react';

// --- القوائم العشر الموسوعية للمشاعر ---
const EMOTIONS_DATA = [
  { id: 'spiritual', title: 'المسار الروحي والإيماني', icon: <Sparkles className="text-yellow-500" />, items: ['لذة المناجاة 🤲', 'خشوع الصلاة ✨', 'طمأنينة الذكر 📿', 'حلاوة الإيمان 🍯', 'الشوق للحج 🕋', 'الرضا بالقضاء ✅', 'حسن الظن بالله 🌈', 'هيبة الوقوف بين يدي الله 🕊️', 'التقصير المؤلم 💧', 'الرجاء في رحمة الله 🌤️', 'اليقين بالاستجابة 🎯'] },
  { id: 'biological', title: 'الإيقاع الحيوي والجسدي', icon: <Sun className="text-orange-400" />, items: ['تقلبات المزاج 🎢', 'وهن جسدي 💤', 'حساسية مفرطة 🌸', 'تعب العبادة في الحيض 🥀', 'طاقة الصيام 🌙', 'نشاط الفجر ☀️', 'صمت الجسد 🧘‍♀️', 'نهم عاطفي 🍫', 'ألم المخاض/النفاس 🤱', 'وهن كبر السن 🕰️'] },
  { id: 'relationships', title: 'القلب الرحيم والعلاقات', icon: <Heart className="text-red-400" />, items: ['بر الوالدين 🌳', 'مودة الزوج ❤️', 'رحمة الأبناء 🐣', 'صلة الرحم 🔗', 'الحب في الله 🫂', 'خيبة أمل عاطفية ⛈️', 'وحشة الفقد 🌑', 'احتياج للاهتمام 🍯', 'عفو وصفح 🏳️', 'غيرة منضبطة 🏹'] },
  { id: 'identity', title: 'الذات والنمو والروح', icon: <Leaf className="text-green-500" />, items: ['فخر بالحجاب 🧕', 'استحقاق الذات 👑', 'جهاد النفس ⚔️', 'متلازمة المحتال 🎭', 'رغبة في الأثر 🍃', 'طموح ينفع الأمة 🚀', 'شك مؤقت ❓', 'توبة نصوح ✨', 'وعي ناضج 🧠'] },
  { id: 'patience', title: 'الضغوط والابتلاءات', icon: <Shield className="text-blue-500" />, items: ['صبر جميل 💎', 'اختناق من التوقعات 🌪️', 'ضغط مجتمعي 👁️', 'شعور بالظلم ⚖️', 'ثقل الأمانة 🎒', 'تعب الرعاية 🔋', 'رغبة في التحرر 🕊️', 'خوف من الرياء ❄️'] },
  { id: 'wisdom', title: 'النضج والوقار', icon: <Moon className="text-indigo-400" />, items: ['قبول الشيب 🕰️', 'وقار الحكمة 💎', 'زهد في الدنيا 🍃', 'حنين للشباب 🕯️', 'فرحة الهداية المتأخرة 🌟', 'طمأنينة الختام 🌅', 'تجربة السنين 📚'] },
  { id: 'shadows', title: 'المخاوف والظلال', icon: <Ghost className="text-gray-500" />, items: ['خوف من سوء الخاتمة ⌛', 'قلق على دين الأبناء 🧒', 'رهبة القبر 🌑', 'خوف من الفقد 💧', 'قلق الرزق 🌾', 'خوف من الرياء 🌪️', 'وساوس النفس 💭'] },
  { id: 'healing', title: 'التعافي والترميم', icon: <Sparkles className="text-teal-400" />, items: ['جبر القلوب المتكسرة 🩹', 'مداواة الندبات 🧩', 'انشراح الصدر 🌬️', 'تجديد العهد مع الله ⚡', 'مسامحة الماضي ✨', 'الاستشفاء بالقرآن 📖'] },
  { id: 'fitra', title: 'الطفلة الداخلية والفطرة', icon: <Smile className="text-pink-400" />, items: ['براءة الفطرة 🍭', 'فضول المعرفة 🎈', 'دهشة خلق الله 🌟', 'حاجة للأمان 🧸', 'ضحك عفوي 🎉', 'لعب مباح 🦄', 'خيال واسع 🌌'] },
  { id: 'work', title: 'الإنجاز والعمل المثمر', icon: <Briefcase className="text-amber-600" />, items: ['بركة الوقت ⏳', 'إتقان العمل 🎯', 'فرحة الإنجاز 🏆', 'طلب العلم 📚', 'دعوة إلى الله 📢', 'نفع الناس 🤝', 'توازن الدور ⚖️'] }
];

const RaqqaEmotionsApp = () => {
  const [profile, setProfile] = useState({ age: '', marriage: 'single', children: '0', note: '' });
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  // --- دالة الحفظ والتحليل المدمجة ---
  const handleAnalyze = async () => {
    if (!profile.age || selectedEmotions.length === 0) {
      alert("رقيقتي، يرجى تحديد السن واختيار مشاعركِ أولاً.");
      return;
    }
    
    setLoading(true);
    setAiAdvice("رقة تتأمل في مكنونات صدركِ لتوافيكِ بالبصيرة...");

    try {
      const summary = `العمر: ${profile.age}، الحالة: ${profile.marriage}، الأبناء: ${profile.children}. المشاعر المختارة: ${selectedEmotions.join('، ')}.`;

      // 1. الحفظ في Neon DB
      await fetch('/api/save-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: "user_raqqa_1",
          category: "تحليل مشاعر",
          value: profile.age,
          note: summary + " الملاحظات: " + profile.note
        })
      });

      // 2. التحليل عبر الذكاء الاصطناعي (Groq)
      const aiRes = await fetch('/api/raqqa-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `أنا طبيب نفسي ومرشد إيماني. حلل حالة هذه المرأة: ${summary}. الملاحظات الإضافية: ${profile.note}. 
          قدم رداً مطولاً، دافئاً، ومفصلاً يتناسب مع فئتها العمرية وظروفها. 
          يجب أن يتضمن الرد نصيحة نفسية، توجيه إيماني، وآية أو حديث أو قول مأثور يناسب حالتها.`
        })
      });
      const aiData = await aiRes.json();
      setAiAdvice(aiData.reply);
    } catch (err) {
      setAiAdvice("عذراً يا رفيقتي، حدث خطأ في الاتصال. حاولي مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const toggleEmotion = (item) => {
    setSelectedEmotions(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-right font-['Tajawal']" dir="rtl">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px]" />
      </div>

      <main className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-black text-gray-800 mb-4 font-['Amiri'] leading-tight">
            محلل مشاعر <span className="text-pink-500 underline decoration-pink-100 underline-offset-8">المرأة المسلمة</span> الشامل
          </h1>
          <p className="text-xl text-gray-500 font-medium italic">بصيرة نفسية، وروحانية إيمانية، لكل مراحل عمركِ</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Profile Data Cards */}
            <section className="bg-white/40 backdrop-blur-xl p-8 rounded-[45px] border border-white shadow-2xl space-y-6">
              <div className="flex items-center gap-3 text-pink-600 mb-4">
                <User size={28} />
                <h2 className="text-2xl font-bold">هويتكِ الرقيقة</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 mr-2">العمر</label>
                  <input type="number" placeholder="مثلاً: 25" className="w-full p-4 rounded-3xl bg-white border-none shadow-inner outline-none focus:ring-2 ring-pink-200"
                    onChange={(e) => setProfile({...profile, age: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 mr-2">الحالة الاجتماعية</label>
                  <select className="w-full p-4 rounded-3xl bg-white border-none shadow-inner outline-none" 
                    onChange={(e) => setProfile({...profile, marriage: e.target.value})}>
                    <option value="single">آنسة</option>
                    <option value="married">متزوجة</option>
                    <option value="divorced">منفصلة</option>
                    <option value="widow">أرملة</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 mr-2">عدد الأبناء</label>
                  <input type="number" placeholder="0" className="w-full p-4 rounded-3xl bg-white border-none shadow-inner outline-none"
                    onChange={(e) => setProfile({...profile, children: e.target.value})} />
                </div>
              </div>
            </section>

            {/* 2. Emotions Selection (Accordion Style) */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-pink-600 mb-6 px-4">
                <Heart size={28} />
                <h2 className="text-2xl font-bold">بمَ تشعرين الآن؟</h2>
              </div>
              {EMOTIONS_DATA.map((cat) => (
                <div key={cat.id} className="bg-white/60 backdrop-blur-md rounded-[35px] border border-white overflow-hidden shadow-sm transition-all hover:shadow-md">
                  <button onClick={() => setActiveTab(activeTab === cat.id ? null : cat.id)}
                    className="w-full p-6 flex justify-between items-center hover:bg-white/40 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm">{cat.icon}</div>
                      <span className="text-xl font-bold text-gray-700">{cat.title}</span>
                    </div>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform ${activeTab === cat.id ? 'rotate-180' : ''}`} />
                  </button>
                  {activeTab === cat.id && (
                    <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-3 bg-white/20 animate-fade-in">
                      {cat.items.map(item => (
                        <button key={item} onClick={() => toggleEmotion(item)}
                          className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                            selectedEmotions.includes(item) ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-pink-50'
                          }`}>
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* 3. Personal Note */}
            <textarea 
              className="w-full p-8 rounded-[40px] bg-white/40 backdrop-blur-md border border-white shadow-xl outline-none focus:bg-white/80 transition-all text-lg"
              placeholder="اكتبي هنا ما يفيض به قلبكِ من تفاصيل أخرى تودين أن تحللها رقة..."
              rows="4"
              onChange={(e) => setProfile({...profile, note: e.target.value})}
            />

            <button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-6 rounded-[35px] text-2xl font-black shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-4 disabled:opacity-50"
            >
              {loading ? <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" /> : <><Send size={28} /> ابدأي التحليل العميق الآن</>}
            </button>
          </div>

          {/* AI Result Side */}
          <div className="lg:col-span-5">
            <div className="bg-white/90 backdrop-blur-2xl rounded-[50px] p-10 border border-white shadow-2xl sticky top-12 h-[calc(100vh-6rem)] flex flex-col overflow-hidden">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-tr from-pink-400 to-indigo-500 rounded-2xl shadow-lg flex items-center justify-center text-white animate-pulse">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-800 font-['Amiri']">رؤية رقة الذكية</h3>
                  <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">Psychological & Spiritual Insight</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 text-gray-700 leading-relaxed text-lg">
                {aiAdvice ? (
                  <div className="space-y-6 animate-fade-in font-['Tajawal']">
                    <p className="whitespace-pre-wrap">{aiAdvice}</p>
                    <div className="mt-8 pt-6 border-t border-pink-50 flex items-center gap-3 text-pink-600 font-['Amiri'] italic">
                      <Heart size={20} fill="currentColor" />
                      <span>دمتِ بودّ وطمأنينة يا رفيقتي..</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-30">
                    <div className="p-8 bg-gray-50 rounded-full"><Sparkles size={100} className="text-gray-300" /></div>
                    <p className="text-2xl font-bold font-['Amiri']">بانتظار أن تفتحي لنا قلبكِ لنضيئه بالوعي..</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RaqqaEmotionsApp;

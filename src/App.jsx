import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Wind, 
  CloudRain, 
  Waves, 
  Mountain, 
  Moon, 
  Award, 
  Lock, 
  Unlock, 
  Smartphone, 
  Download, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Flower2,
  Brain,
  Hourglass,
  Sparkles,
  VolumeX,
  ArrowRight,
  Circle
} from 'lucide-react';

// 简单的音频播放器组件
const AudioPlayer = ({ title, location, icon: Icon }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 p-4 rounded-xl flex items-center justify-between hover:bg-stone-800 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-stone-700 rounded-full text-amber-200 group-hover:bg-amber-900/30 transition-colors">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="text-stone-200 font-medium">{title}</h4>
          <p className="text-xs text-stone-400">{location}</p>
        </div>
      </div>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-2 text-stone-300 hover:text-amber-400 transition-colors"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
};

// 呼吸引导动画组件 (吸气 - 扩张)
const BreathingGuide = () => {
  const [text, setText] = useState('吸气');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setText(prev => prev === '吸气' ? '屏息' : '吸气');
    }, 4000); // 4秒呼吸周期
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-[240px] py-4">
      {/* 动画光环 - 扩张 */}
      <div className={`absolute w-40 h-40 rounded-full border-2 border-amber-500/30 transition-all duration-[4000ms] ease-in-out ${text === '吸气' ? 'scale-150 opacity-20' : 'scale-100 opacity-50'}`}></div>
      <div className={`absolute w-40 h-40 rounded-full bg-amber-600/10 transition-all duration-[4000ms] ease-in-out ${text === '吸气' ? 'scale-125' : 'scale-90'}`}></div>
      
      {/* 核心圆 */}
      <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-stone-800 to-stone-900 rounded-full border border-amber-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(217,119,6,0.2)]">
        <div className="text-center">
          <span className={`block text-xl font-serif text-amber-100 transition-all duration-[4000ms] ${text === '吸气' ? 'tracking-[0.2em]' : 'tracking-normal'}`}>{text}</span>
          <span className="text-[9px] text-stone-500 uppercase tracking-widest mt-1">Inhale</span>
        </div>
      </div>
    </div>
  );
};

// 吐气视觉引导组件 (吐气 - 收缩)
const ExhaleGuide = () => {
  // 使用 CSS 动画模拟持续的收缩循环
  return (
    <div className="relative flex items-center justify-center w-full h-full py-2">
       {/* 外部收缩圆环 - 模拟气体排出 */}
       <div className="absolute w-24 h-24 border border-stone-500/30 rounded-full animate-[ping_3s_reverse_infinite] opacity-50"></div>
       
       {/* 内部核心 - 缓慢脉动 */}
       <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center shadow-inner mb-2 animate-pulse">
             <Wind size={24} className="text-stone-400" />
          </div>
          <div className="text-center">
             <h4 className="text-stone-200 font-bold text-sm">缓缓吐气</h4>
             <p className="text-[10px] text-stone-500">让呼吸回归中心</p>
          </div>
       </div>
       
       {/* 装饰粒子 */}
       <div className="absolute w-32 h-32 border border-stone-700/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
    </div>
  );
};

// 冥想小人动画组件
const MeditatingFigure = () => {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
       {/* 光环 Aura - 缓慢呼吸 */}
       <div className="absolute w-20 h-20 bg-amber-500/20 rounded-full blur-xl animate-[pulse_4s_ease-in-out_infinite]"></div>
       
       {/* 悬浮容器 - 上下浮动 */}
       <div className="relative z-10 animate-[bounce_3s_infinite]" style={{ animationTimingFunction: 'ease-in-out', animationDuration: '4s' }}>
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 头部 */}
            <circle cx="50" cy="35" r="12" className="fill-stone-300" />
            {/* 身体 (盘腿坐姿抽象) */}
            <path d="M50 50 C 25 50, 20 80, 20 90 L 80 90 C 80 80, 75 50, 50 50 Z" className="fill-stone-400" />
            {/* 腿部阴影细节 */}
            <path d="M20 90 Q 50 80 80 90" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none"/>
          </svg>
       </div>
       
       {/* 底部阴影 - 随悬浮缩放 */}
       <div className="absolute bottom-2 w-12 h-2 bg-black/40 rounded-full blur-sm animate-[pulse_4s_ease-in-out_infinite]"></div>
    </div>
  );
};

// 主要组件
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-stone-950 min-h-screen font-sans text-stone-100 selection:bg-amber-900 selection:text-amber-100">
      
      {/* 导航栏 */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-950/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-amber-600/80 rounded-lg flex items-center justify-center transform rotate-45">
              <span className="transform -rotate-45 text-white font-bold text-sm">禅</span>
            </div>
            <span className="text-xl font-bold tracking-wider text-stone-100">禅音 <span className="text-stone-500 text-sm font-normal">ZEN SOUND</span></span>
          </div>

          {/* 桌面菜单 */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <button onClick={() => scrollToSection('meditation')} className="hover:text-amber-400 transition-colors flex items-center gap-1"><Flower2 size={14}/> 禅修冥想</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-amber-400 transition-colors">功能特色</button>
            <button onClick={() => scrollToSection('locations')} className="hover:text-amber-400 transition-colors">音源之旅</button>
            <button onClick={() => scrollToSection('system')} className="hover:text-amber-400 transition-colors">成长体系</button>
            <button className="bg-stone-100 text-stone-900 px-5 py-2 rounded-full font-bold hover:bg-amber-400 transition-all flex items-center gap-2">
              <Download size={16} /> 下载 App
            </button>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-stone-100">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-stone-900 border-t border-stone-800 p-6 flex flex-col gap-4 shadow-2xl">
            <button onClick={() => scrollToSection('meditation')} className="text-left py-2 text-stone-300 flex items-center gap-2"><Flower2 size={16}/> 禅修冥想</button>
            <button onClick={() => scrollToSection('features')} className="text-left py-2 text-stone-300">功能特色</button>
            <button onClick={() => scrollToSection('locations')} className="text-left py-2 text-stone-300">音源之旅</button>
            <button onClick={() => scrollToSection('system')} className="text-left py-2 text-stone-300">成长体系</button>
            <button className="bg-amber-500 text-stone-900 py-3 rounded-lg font-bold text-center mt-2">
              下载 App
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - 首页 */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景图占位 - 实际开发会替换为神之子池或那智瀑布的高清视频/图片 */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop" 
            alt="Zen Nature Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-stone-950/50 to-stone-950"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <div className="inline-block mb-6 px-4 py-1 border border-stone-500/50 rounded-full bg-stone-900/30 backdrop-blur-sm text-amber-300 text-sm tracking-widest uppercase">
            Part 01: 研究主题
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            寻回内心的<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">宁静与秩序</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            融合日本传统「禅」文化与全境采集的真实「白噪音」。<br/>
            专为现代都市高压人群设计的冥想与助眠伴侣。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto bg-stone-100 hover:bg-amber-400 text-stone-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20">
              <span className="text-xl"></span> App Store 下载
            </button>
            <button onClick={() => scrollToSection('concept')} className="w-full sm:w-auto bg-stone-800/50 hover:bg-stone-800 text-white border border-stone-600 px-8 py-4 rounded-full font-medium text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2">
              <Play size={18} className="fill-current" /> 观看介绍
            </button>
          </div>

          <div className="mt-16 flex justify-center gap-12 text-stone-500">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-stone-300">90%</span>
              <span className="text-xs uppercase tracking-wider">日本全境采集</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-stone-300">50h+</span>
              <span className="text-xs uppercase tracking-wider">高保真音源</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-stone-300">4.9</span>
              <span className="text-xs uppercase tracking-wider">用户评分</span>
            </div>
          </div>
        </div>
      </header>

      {/* 概念介绍 Section */}
      <section id="concept" className="py-24 bg-stone-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2 pointer-events-none opacity-10">
          <div className="absolute w-[500px] h-[500px] rounded-full border border-stone-500 top-20 left-20 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[700px] h-[700px] rounded-full border border-stone-500 top-0 left-0 animate-[spin_80s_linear_infinite_reverse]"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-amber-500 font-medium">
                <div className="w-8 h-[1px] bg-amber-500"></div>
                <span>Part 02: 研究目的</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-snug">
                这不仅是声音，<br/>而是<span className="text-amber-400">自然的呼吸</span>。
              </h2>
              <p className="text-stone-400 leading-relaxed">
                现有的白噪音App大多使用人工合成音源，缺乏生命的律动。
                为了解决这个问题，开发团队亲赴日本各地，采集了90%以上的真实自然环境音。
              </p>
              <p className="text-stone-400 leading-relaxed">
                从北海道神之子池的潺潺流水，到和歌山那智瀑布的雷鸣轰响，我们用专业设备记录下大自然最纯粹的频率，只为带给你身临其境的「禅」体验。
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-stone-800 pl-4">
                  <h3 className="text-white font-bold mb-1">真实采集</h3>
                  <p className="text-sm text-stone-500">摒弃人工合成，还原自然本真</p>
                </div>
                <div className="border-l-2 border-stone-800 pl-4">
                  <h3 className="text-white font-bold mb-1">禅意融合</h3>
                  <p className="text-sm text-stone-500">结合冥想技法，寻找内心的家</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
                 <img 
                  src="https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?q=80&w=2070&auto=format&fit=crop" 
                  alt="Kyoto Zen Garden" 
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* 装饰元素 */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-900/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 新增：禅修与冥想 Section (优化布局) */}
      <section id="meditation" className="py-24 bg-stone-900 relative overflow-hidden border-y border-stone-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* 左侧：功能介绍文字 */}
            <div className="flex-1 space-y-8 order-2 lg:order-1">
               <div className="inline-flex items-center gap-2 text-amber-500 font-medium">
                <Flower2 size={20} />
                <span>Part 03: 禅与冥想</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-snug text-white">
                在“放空模式”中，<br />
                找回失落的<span className="text-amber-400">专注力</span>。
              </h2>
              <p className="text-stone-400 leading-relaxed">
                现代生活充斥着数字噪音。禅音App特有的“放空模式（Zen Focus）”，通过极简的界面和沉浸式声场，帮助您切断外界干扰，快速进入心流状态。
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg h-fit text-amber-400 shadow-lg">
                    <VolumeX size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-200 mb-2">数字排毒 (Digital Detox)</h4>
                    <p className="text-sm text-stone-500">
                      开启此模式后，App将隐藏所有复杂UI与通知，屏幕只显示极简的“圆相”动画。让手机回归纯粹的播放器，助您彻底放下信息焦虑。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg h-fit text-amber-400 shadow-lg">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-200 mb-2">内观禅修引导</h4>
                    <p className="text-sm text-stone-500">
                      融合传统坐禅（Zazen）技法，提供5-30分钟不等的引导语。从“数息”到“随息”，在自然白噪音的包裹下，观察念头的生灭。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg h-fit text-amber-400 shadow-lg">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-200 mb-2">正念呼吸法</h4>
                    <p className="text-sm text-stone-500">
                      视觉与听觉双重引导。跟随屏幕上的光圈律动调整呼吸频率，有效降低皮质醇水平，缓解急性压力。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：交互卡片网格 (平衡布局) */}
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full min-h-[400px]">
                
                {/* 卡片 1: 试着深呼吸 (占据左列，跨两行) */}
                <div className="bg-stone-800/30 rounded-3xl p-6 border border-stone-700/50 shadow-2xl relative overflow-hidden sm:row-span-2 flex flex-col items-center justify-center group hover:bg-stone-800/50 transition-colors">
                    <div className="absolute top-4 right-4 text-stone-600 font-mono text-[10px] opacity-50 uppercase tracking-wider">Interactive</div>
                    <h3 className="text-xl font-serif text-amber-200 mb-1 z-10">试着深呼吸</h3>
                    <p className="text-stone-500 text-xs mb-4 z-10">跟随光圈，吸纳能量</p>
                    <BreathingGuide />
                </div>

                {/* 卡片 2: 试着吐气 (右上) */}
                <div className="bg-stone-800/30 rounded-3xl p-4 border border-stone-700/50 shadow-xl flex flex-col justify-center hover:bg-stone-800/50 transition-colors group relative overflow-hidden">
                   <ExhaleGuide />
                </div>

                {/* 卡片 3: 开始放空冥想 (右下) */}
                <div className="bg-gradient-to-br from-amber-900/20 to-stone-800/30 rounded-3xl p-6 border border-amber-500/20 shadow-xl flex items-center justify-between hover:border-amber-500/40 transition-all cursor-pointer group relative overflow-hidden">
                   <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-lg font-bold text-stone-100 mb-1 flex items-center gap-2">
                          开始放空 <ArrowRight size={16} className="text-amber-500 -ml-1 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all"/>
                        </h3>
                        <p className="text-xs text-stone-500">进入禅定模式</p>
                      </div>
                   </div>
                   
                   {/* 冥想小人动效 */}
                   <MeditatingFigure />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 音源地图展示 Section */}
      <section id="locations" className="py-24 bg-stone-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-2 block">Part 05: 音源采集</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">聆听日本的声音</h2>
            <p className="text-stone-400 max-w-xl mx-auto">
              我们走遍了日本列岛，将各地的独特声景封存进 App 中。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 卡片 1 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1518535458308-247d03009358?q=80&w=2069&auto=format&fit=crop" 
                alt="Hokkaido Pond" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
                  <Mountain size={16} />
                  <span>北海道 · 斜里郡</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">神之子池</h3>
                <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  澄澈池水的静谧流淌，带来心灵的净化与清凉。
                </p>
              </div>
            </div>

            {/* 卡片 2 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <img 
                src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=2070&auto=format&fit=crop" 
                alt="Nachi Falls" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-stone-900 text-xs font-bold px-2 py-1 rounded">
                今日推荐
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
                  <CloudRain size={16} />
                  <span>和歌山 · 那智胜浦</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">那智瀑布</h3>
                <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  落差133米的神圣轰鸣，洗涤杂念，注入力量。
                </p>
              </div>
            </div>

            {/* 卡片 3 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1596423736461-1769d4849445?q=80&w=1974&auto=format&fit=crop" 
                alt="Okinawa Beach" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
                  <Wind size={16} />
                  <span>冲绳 · 万座毛</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">海风与波涛</h3>
                <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  辽阔草地上的风声与远海的低吟，自然的和谐乐章。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AudioPlayer title="鬼之洗衣板的潮汐" location="宫崎县 · 青岛" icon={Waves} />
            <AudioPlayer title="佐渡岛的寂静" location="新泻县 · 佐渡" icon={Moon} />
            <AudioPlayer title="古寺钟声" location="京都 · 岚山" icon={Award} />
          </div>
        </div>
      </section>

      {/* 成长体系与Gamification Section */}
      <section id="system" className="py-24 bg-stone-950 border-t border-stone-900">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <span className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-2 block">Part 06: 持续体验</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">不仅仅是聆听，<br/>更是一场<span className="text-amber-400">修行的旅程</span></h2>
                <p className="text-stone-400 mb-8 leading-relaxed">
                  禅音引入了独特的「探索与解锁」机制。通过持续的冥想与睡眠记录，您将逐步解锁日本更多秘境的声音。这不仅增加了使用的乐趣，更是一种坚持自律的仪式感。
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-stone-800 p-3 rounded-lg text-amber-400">
                      <Unlock size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-stone-200">区域解锁机制</h4>
                      <p className="text-stone-500 text-sm mt-1">
                        初次使用解锁基础音源。累计使用5小时，解锁新地区特色白噪音。累计50小时，解锁VR沉浸式音效与自定义混音功能。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-stone-800 p-3 rounded-lg text-amber-400">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-stone-200">成就勋章系统</h4>
                      <p className="text-stone-500 text-sm mt-1">
                        获得「守夜人」(夜间累计10小时)、「探索者」(解锁3个地区) 等精美徽章，记录你的每一次平静时刻。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-900 rounded-2xl p-8 border border-stone-800 relative">
                 <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Award size={120} className="text-amber-500" />
                 </div>
                 <h3 className="text-2xl font-bold mb-6 text-center">你的修行之路</h3>
                 
                 <div className="space-y-4">
                   {/* 进度条示例 */}
                   <div className="bg-stone-800 rounded-xl p-4 flex items-center justify-between border border-stone-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center text-stone-400">1</div>
                        <div>
                          <div className="text-sm font-bold">初级修行者</div>
                          <div className="text-xs text-stone-500">解锁基础自然音</div>
                        </div>
                      </div>
                      <span className="text-amber-500 text-sm font-bold">已完成</span>
                   </div>

                   <div className="bg-stone-800 rounded-xl p-4 flex items-center justify-between border border-amber-500/30 shadow-lg shadow-amber-900/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-bold">2</div>
                        <div>
                          <div className="text-sm font-bold text-amber-100">中级探索者</div>
                          <div className="text-xs text-stone-400">当前阶段: 累计 3.5 / 5 小时</div>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-stone-700 border-t-amber-500 animate-spin flex items-center justify-center"></div>
                   </div>

                   <div className="bg-stone-800/50 rounded-xl p-4 flex items-center justify-between border border-stone-800 opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-600"><Lock size={16}/></div>
                        <div>
                          <div className="text-sm font-bold text-stone-500">高级禅师</div>
                          <div className="text-xs text-stone-600">需累计 50 小时</div>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 数据与用户反馈 Section */}
      <section id="testimonials" className="py-24 bg-stone-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6">真实数据的<br/>有力证明</h2>
               <p className="text-stone-400">
                 在针对 431 名早期用户的问卷调查中，禅音展现出了显著的效果。这不是魔法，而是科学与自然的共鸣。
               </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-stone-800 p-6 rounded-2xl text-center">
                 <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">94%</div>
                 <div className="text-stone-300 text-sm">感受到睡眠质量改善</div>
               </div>
               <div className="bg-stone-800 p-6 rounded-2xl text-center">
                 <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">63%</div>
                 <div className="text-stone-300 text-sm">感到身心显著放松</div>
               </div>
            </div>
          </div>

          {/* 用户评价卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-xl">
              <div className="flex gap-1 text-amber-500 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="text-stone-300 mb-6 text-sm leading-relaxed">"人工合成的白噪音总让我觉得刺耳，但禅音里那智瀑布的声音让我感觉真的站在瀑布前，那种震撼和随后的平静难以言喻。"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-700 rounded-full"></div>
                <div>
                  <div className="text-sm font-bold text-stone-200">Simon</div>
                  <div className="text-xs text-stone-500">20代 · 公司职员</div>
                </div>
              </div>
            </div>
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-xl">
              <div className="flex gap-1 text-amber-500 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="text-stone-300 mb-6 text-sm leading-relaxed">"作为一个失眠严重的自由职业者，这个App的解锁机制居然让我期待每天睡觉的时间。收集完北海道的音源很有成就感。"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-700 rounded-full"></div>
                <div>
                  <div className="text-sm font-bold text-stone-200">Akiko</div>
                  <div className="text-xs text-stone-500">30代 · 设计师</div>
                </div>
              </div>
            </div>
             <div className="bg-stone-950 border border-stone-800 p-6 rounded-xl">
              <div className="flex gap-1 text-amber-500 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} /></div>
              <p className="text-stone-300 mb-6 text-sm leading-relaxed">"UI设计非常克制，没有多余的干扰。打开App本身就是一个进入禅定状态的过程。"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-700 rounded-full"></div>
                <div>
                  <div className="text-sm font-bold text-stone-200">Kenji</div>
                  <div className="text-xs text-stone-500">20代 · 研究生</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 订阅与CTA Section */}
      <section className="py-24 bg-gradient-to-b from-stone-950 to-stone-900 text-center">
         <div className="container mx-auto px-6 max-w-3xl">
           <div className="w-16 h-16 bg-amber-600/20 rounded-2xl mx-auto flex items-center justify-center mb-8 transform rotate-12">
              <Smartphone size={32} className="text-amber-500 transform -rotate-12" />
           </div>
           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">开始您的静心之旅</h2>
           <p className="text-lg text-stone-400 mb-10">
             现在下载，即可免费体验基础自然音源。<br/>
             开启订阅，解锁全日本秘境与深度冥想指导。
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
             <button className="bg-amber-500 hover:bg-amber-400 text-stone-900 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
               免费下载 App
             </button>
             <div className="flex items-center gap-2 text-stone-400 px-6 py-4 bg-stone-800/50 rounded-full border border-stone-700">
                <span className="text-sm">订阅仅需 ¥600/月 起</span>
             </div>
           </div>
           
           <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl inline-block text-left">
             <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">即将推出 / Roadmap</div>
             <ul className="space-y-2 text-sm text-stone-300">
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> iOS 正式版发布</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-600 rounded-full"></div> 冥想引导模式更新</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-600 rounded-full"></div> 英语/中文多语言支持</li>
             </ul>
           </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 py-12 text-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 bg-stone-800 rounded flex items-center justify-center">
                 <span className="text-stone-400 font-bold text-xs">禅</span>
               </div>
               <span className="font-bold text-stone-300">禅音 Zen Sound</span>
            </div>
            
            <div className="flex gap-8 text-stone-500">
              <a href="#" className="hover:text-amber-500 transition-colors">关于我们</a>
              <a href="#" className="hover:text-amber-500 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-amber-500 transition-colors">使用条款</a>
              <a href="#" className="hover:text-amber-500 transition-colors">联系支持</a>
            </div>

            <div className="text-stone-600">
              © 2025 Zen Sound Project. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
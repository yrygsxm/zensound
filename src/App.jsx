import React, { useState, useEffect, useRef } from 'react';
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
  Circle,
  UserRound
} from 'lucide-react';
import phoneImg from '../image/phone.png';
import takiAudio from '../audio/taki.mp3';
import teraAudio from '../audio/tera.mp3';
import shimaAudio from '../audio/shima.mp3';

const translations = {
  ja: {
    'nav.meditation': '禅修瞑想',
    'nav.features': '機能',
    'nav.locations': '音の旅',
    'nav.system': '成長システム',
    'nav.download': 'Appをダウンロード',
    'nav.lang.ja': '日本語',
    'nav.lang.zh': '中文',
    'nav.lang.en': 'English',
    'hero.part1': 'Part 01: 研究テーマ',
    'hero.title1': '心の奥にある',
    'hero.title2': '静けさと秩序を取り戻す',
    'hero.subtitle1': '日本の伝統「禅」文化と、全国で収録した本物の「ホワイトノイズ」を融合。',
    'hero.subtitle2': '現代の都市生活者のための瞑想・睡眠サポート。',
    'hero.ctaStore': 'App Storeで入手',
    'hero.ctaWatch': '紹介を見る',
    'hero.statCollect': '日本各地で収録',
    'hero.statHiFi': '高音質サウンド',
    'hero.statRating': 'ユーザー評価',
    'concept.part2': 'Part 02: 研究目的',
    'concept.head1': 'これはただの音ではない、',
    'concept.head2': '自然の呼吸。',
    'concept.p1': '既存のホワイトノイズアプリの多くは人工合成音で、生命感ある揺らぎに欠けます。そこで私たちは日本各地へ赴き、90%以上を実録の自然環境音として収集しました。',
    'concept.p2': '北海道・神の子池のせせらぎから、和歌山・那智の滝の轟きまで。自然が持つ純粋な周波数を高品質に記録し、臨場感ある「禅」体験を届けます。',
    'concept.real.title': '実地収録',
    'concept.real.desc': '合成音を排し、自然そのものへ',
    'concept.zen.title': '禅との融合',
    'concept.zen.desc': '瞑想の技法で、心の居場所へ',
    'meditation.part3': 'Part 03: 禅と瞑想',
    'meditation.head1': '「空（くう）モード」で、',
    'meditation.head2': '集中力',
    'meditation.line2Prefix': '失われた',
    'meditation.p1': '現代生活はデジタルノイズで溢れています。禅音アプリ独自の「Zen Focus」モードは、極限まで削ぎ落としたUIと没入型サウンドで外界の干渉を遮断し、すぐにフローへ導きます。',
    'meditation.detox.title': 'デジタルデトックス',
    'meditation.detox.desc': 'このモードでは通知や複雑なUIを隠し、円相のアニメーションだけを表示。スマホを純粋なプレイヤーに戻し、情報不安から解放します。',
    'meditation.guided.title': '内観・坐禅ガイド',
    'meditation.guided.desc': '伝統的な坐禅（Zazen）を取り入れ、5〜30分のガイドを用意。「数息」から「随息」へ、自然音に包まれながら思考の移ろいを観察します。',
    'meditation.breath.title': 'マインドフル呼吸',
    'meditation.breath.desc': '視覚と聴覚の二重ガイドで呼吸を整え、コルチゾールを下げて急性ストレスを和らげます。',
    'meditation.interactive1.title': '深く吸ってみよう',
    'meditation.interactive1.desc': '光の輪に合わせて吸い込む',
    'meditation.interactive3.title': '空になる',
    'meditation.interactive3.desc': '禅定モードへ',
    'breath.inhale': '吸う',
    'breath.hold': '止める',
    'exhale.title': 'ゆっくり吐く',
    'exhale.desc': '呼吸を中心へ戻す',
    'locations.part5': 'Part 04: 音源収録',
    'locations.title': '日本の音を聴く',
    'locations.subtitle': '私たちは日本列島を巡り、各地の声景をアプリに封じ込めました。',
    'locations.hokkaido.place': '北海道・斜里郡',
    'locations.hokkaido.title': '神の子池',
    'locations.hokkaido.desc': '澄んだ水の静かな流れが心を清めます。',
    'locations.nachi.badge': '本日のおすすめ',
    'locations.nachi.place': '和歌山・那智勝浦',
    'locations.nachi.title': '那智の滝',
    'locations.nachi.desc': '落差133mの神聖な轟きが雑念を洗い流し、力を与えます。',
    'locations.okinawa.place': '沖縄・万座毛',
    'locations.okinawa.title': '海風と波音',
    'locations.okinawa.desc': '草原を渡る風と遠い海の低いうねり。自然の調和。',
    'audio.taki.title': '鬼の洗濯板の潮騒',
    'audio.taki.loc': '宮崎県・青島',
    'audio.sado.title': '佐渡島の静けさ',
    'audio.sado.loc': '新潟県・佐渡',
    'audio.temple.title': '古寺の鐘',
    'audio.temple.loc': '京都・嵐山',
    'system.part6': 'Part 05: 継続体験',
    'system.title1': '聴くだけではない、',
    'system.title2': '修行の旅',
    'system.p1': '禅音は「探索と解放」メカニズムを導入。瞑想と睡眠の記録を重ねるほど、日本の秘境の音が次々と解放されます。楽しさと習慣化を両立する儀式です。',
    'system.unlock.title': 'エリア解放',
    'system.unlock.desc': '初回で基礎音源を解放。累計5時間で新エリア、50時間でVR没入音やミックス機能を解放。',
    'system.badge.title': '実績バッジ',
    'system.badge.desc': '「夜守り（夜間10時間）」「探索者（3エリア解放）」などのバッジで、平穏の積み重ねを記録。',
    'system.road.title': 'あなたの修行の道',
    'system.stage1.title': '初級修行者',
    'system.stage1.desc': '基礎の自然音を解放',
    'system.done': '完了',
    'system.stage2.title': '中級探索者',
    'system.stage2.desc': '進行状況：3.5 / 5 時間',
    'system.stage2.unlocked': '中級探索者を解放',
    'system.stage3.title': '上級禅師',
    'system.stage3.desc': '累計50時間が必要',
    'system.current': '現在のステージ',
    'testimonials.title': 'データが示す効果',
    'testimonials.p1': '初期ユーザー431名の調査で、禅音は明確な効果を示しました。魔法ではなく、科学と自然の共鳴です。',
    'testimonials.stat1': '睡眠の質が改善',
    'testimonials.stat2': '心身が大きく緩む',
    'testimonials.openData': '実データを見る',
    'statsModal.title': '実データ（統計）',
    'statsModal.subtitle': '可視化はサンプルデータでの表現です。',
    'statsModal.chart.title': '主要指標の推移',
    'statsModal.chart.subtitle': '実験期間中の群間比較（介入開始：Day 8）',
    'statsModal.chart.tab.sleep': '睡眠スコア',
    'statsModal.chart.tab.stress': 'ストレス',
    'statsModal.chart.tab.hrv': 'HRV（心拍変動）',
    'statsModal.chart.legend.zen': 'Zen Sound 群',
    'statsModal.chart.legend.control': '対照群',
    'statsModal.chart.intervention': '介入開始（Day 8）',
    'statsModal.axis.sleep': '睡眠スコア（0–100）',
    'statsModal.axis.stress': 'ストレス（0–100）',
    'statsModal.axis.hrv': 'HRV（ms）',
    'statsModal.table.title': '指標別サマリー',
    'statsModal.table.col.metric': '指標',
    'statsModal.table.col.day1': 'Day 1',
    'statsModal.table.col.day8': 'Day 8',
    'statsModal.table.col.day21': 'Day 21',
    'statsModal.table.col.delta': '変化（Day 8→21）',
    'statsModal.table.col.trend': '推移',
    'statsModal.metric.sleep': '睡眠スコア',
    'statsModal.metric.stress': 'ストレス',
    'statsModal.metric.hrv': 'HRV',
    'statsModal.close': '閉じる',
    'quote1': '「合成ホワイトノイズは耳に刺さるけれど、禅音の那智の滝は本当にその場にいるようで、圧倒された後に静けさが訪れた。」',
    'quote2': '「重度の不眠ですが、このアプリの解放システムで毎晩が楽しみに。北海道の音を集め切ったときの達成感が最高です。」',
    'quote3': '「UIがとてもミニマルで、開くだけで禅の状態に入っていく感じがする。」',
    'age20.office': '20代・会社員',
    'age30.designer': '30代・デザイナー',
    'age20.student': '20代・大学院生',
    'cta.title': '静けさの旅を始めよう',
    'cta.p1': '今すぐダウンロードして、基礎の自然音を無料体験。',
    'cta.p2': 'サブスクで日本の秘境音と深い瞑想ガイドを解放。',
    'cta.free': '無料でダウンロード',
    'cta.price': 'サブスク ¥600/月〜',
    'cta.roadmap.title': '近日公開 / Roadmap',
    'cta.roadmap.ios': 'iOS正式版リリース',
    'cta.roadmap.meditation': '瞑想ガイドのアップデート',
    'cta.roadmap.i18n': '英語/中国語対応',
    'footer.about': '私たちについて',
    'footer.privacy': 'プライバシー',
    'footer.terms': '利用規約',
    'footer.support': 'サポート',
  },
  zh: {},
  en: {},
};

translations.zh = {
  'nav.meditation': '禅修冥想',
  'nav.features': '功能特色',
  'nav.locations': '音源之旅',
  'nav.system': '成长体系',
  'nav.download': '下载 App',
  'nav.lang.ja': '日本語',
  'nav.lang.zh': '中文',
  'nav.lang.en': 'English',
  'hero.part1': 'Part 01: 研究主题',
  'hero.title1': '寻回内心的',
  'hero.title2': '宁静与秩序',
  'hero.subtitle1': '融合日本传统「禅」文化与全境采集的真实「白噪音」。',
  'hero.subtitle2': '专为现代都市高压人群设计的冥想与助眠伴侣。',
  'hero.ctaStore': 'App Store 下载',
  'hero.ctaWatch': '观看介绍',
  'hero.statCollect': '日本全境采集',
  'hero.statHiFi': '高保真音源',
  'hero.statRating': '用户评分',
  'concept.part2': 'Part 02: 研究目的',
  'concept.head1': '这不仅是声音，',
  'concept.head2': '而是自然的呼吸。',
  'concept.p1': '现有的白噪音App大多使用人工合成音源，缺乏生命的律动。为了解决这个问题，开发团队亲赴日本各地，采集了90%以上的真实自然环境音。',
  'concept.p2': '从北海道神之子池的潺潺流水，到和歌山那智瀑布的雷鸣轰响，我们用专业设备记录下大自然最纯粹的频率，只为带给你身临其境的「禅」体验。',
  'concept.real.title': '真实采集',
  'concept.real.desc': '摒弃人工合成，还原自然本真',
  'concept.zen.title': '禅意融合',
  'concept.zen.desc': '结合冥想技法，寻找内心的家',
  'meditation.part3': 'Part 03: 禅与冥想',
  'meditation.head1': '在“放空模式”中，',
  'meditation.head2': '专注力',
  'meditation.line2Prefix': '找回失落的',
  'meditation.p1': '现代生活充斥着数字噪音。禅音App特有的“放空模式（Zen Focus）”，通过极简的界面和沉浸式声场，帮助您切断外界干扰，快速进入心流状态。',
  'meditation.detox.title': '数字排毒 (Digital Detox)',
  'meditation.detox.desc': '开启此模式后，App将隐藏所有复杂UI与通知，屏幕只显示极简的“圆相”动画。让手机回归纯粹的播放器，助您彻底放下信息焦虑。',
  'meditation.guided.title': '内观禅修引导',
  'meditation.guided.desc': '融合传统坐禅（Zazen）技法，提供5-30分钟不等的引导语。从“数息”到“随息”，在自然白噪音的包裹下，观察念头的生灭。',
  'meditation.breath.title': '正念呼吸法',
  'meditation.breath.desc': '视觉与听觉双重引导。跟随屏幕上的光圈律动调整呼吸频率，有效降低皮质醇水平，缓解急性压力。',
  'meditation.interactive1.title': '试着深呼吸',
  'meditation.interactive1.desc': '跟随光圈，吸纳能量',
  'meditation.interactive3.title': '开始放空',
  'meditation.interactive3.desc': '进入禅定模式',
  'breath.inhale': '吸气',
  'breath.hold': '屏息',
  'exhale.title': '缓缓吐气',
  'exhale.desc': '让呼吸回归中心',
  'locations.part5': 'Part 04: 音源采集',
  'locations.title': '聆听日本的声音',
  'locations.subtitle': '我们走遍了日本列岛，将各地的独特声景封存进 App 中。',
  'locations.hokkaido.place': '北海道 · 斜里郡',
  'locations.hokkaido.title': '神之子池',
  'locations.hokkaido.desc': '澄澈池水的静谧流淌，带来心灵的净化与清凉。',
  'locations.nachi.badge': '今日推荐',
  'locations.nachi.place': '和歌山 · 那智胜浦',
  'locations.nachi.title': '那智瀑布',
  'locations.nachi.desc': '落差133米的神圣轰鸣，洗涤杂念，注入力量。',
  'locations.okinawa.place': '冲绳 · 万座毛',
  'locations.okinawa.title': '海风与波涛',
  'locations.okinawa.desc': '辽阔草地上的风声与远海的低吟，自然的和谐乐章。',
  'audio.taki.title': '鬼之洗衣板的潮汐',
  'audio.taki.loc': '宫崎县 · 青岛',
  'audio.sado.title': '佐渡岛的寂静',
  'audio.sado.loc': '新泻县 · 佐渡',
  'audio.temple.title': '古寺钟声',
  'audio.temple.loc': '京都 · 岚山',
  'system.part6': 'Part 05: 持续体验',
  'system.title1': '不仅仅是聆听，',
  'system.title2': '修行的旅程',
  'system.p1': '禅音引入了独特的「探索与解锁」机制。通过持续的冥想与睡眠记录，您将逐步解锁日本更多秘境的声音。这不仅增加了使用的乐趣，更是一种坚持自律的仪式感。',
  'system.unlock.title': '区域解锁机制',
  'system.unlock.desc': '初次使用解锁基础音源。累计使用5小时，解锁新地区特色白噪音。累计50小时，解锁VR沉浸式音效与自定义混音功能。',
  'system.badge.title': '成就勋章系统',
  'system.badge.desc': '获得「守夜人」(夜间累计10小时)、「探索者」(解锁3个地区) 等精美徽章，记录你的每一次平静时刻。',
  'system.road.title': '你的修行之路',
  'system.stage1.title': '初级修行者',
  'system.stage1.desc': '解锁基础自然音',
  'system.done': '已完成',
  'system.stage2.title': '中级探索者',
  'system.stage2.desc': '当前阶段: 累计 3.5 / 5 小时',
  'system.stage2.unlocked': '解锁中级探索者',
  'system.stage3.title': '高级禅师',
  'system.stage3.desc': '需累计 50 小时',
  'system.current': '当前阶段',
  'testimonials.title': '真实数据的有力证明',
  'testimonials.p1': '在针对 431 名早期用户的问卷调查中，禅音展现出了显著的效果。这不是魔法，而是科学与自然的共鸣。',
  'testimonials.stat1': '感受到睡眠质量改善',
  'testimonials.stat2': '感到身心显著放松',
  'testimonials.openData': '查看真实数据',
  'statsModal.title': '真实统计数据',
  'statsModal.subtitle': '可视化为演示用样例数据呈现。',
  'statsModal.chart.title': '主要指标趋势',
  'statsModal.chart.subtitle': '实验期间群组对比（介入开始：Day 8）',
  'statsModal.chart.tab.sleep': '睡眠评分',
  'statsModal.chart.tab.stress': '压力',
  'statsModal.chart.tab.hrv': 'HRV（心率变异）',
  'statsModal.chart.legend.zen': 'Zen Sound 组',
  'statsModal.chart.legend.control': '对照组',
  'statsModal.chart.intervention': '介入开始（Day 8）',
  'statsModal.axis.sleep': '睡眠评分（0–100）',
  'statsModal.axis.stress': '压力（0–100）',
  'statsModal.axis.hrv': 'HRV（ms）',
  'statsModal.table.title': '指标汇总',
  'statsModal.table.col.metric': '指标',
  'statsModal.table.col.day1': 'Day 1',
  'statsModal.table.col.day8': 'Day 8',
  'statsModal.table.col.day21': 'Day 21',
  'statsModal.table.col.delta': '变化（Day 8→21）',
  'statsModal.table.col.trend': '趋势',
  'statsModal.metric.sleep': '睡眠评分',
  'statsModal.metric.stress': '压力',
  'statsModal.metric.hrv': 'HRV',
  'statsModal.close': '关闭',
  'quote1': '"人工合成的白噪音总让我觉得刺耳，但禅音里那智瀑布的声音让我感觉真的站在瀑布前，那种震撼和随后的平静难以言喻。"',
  'quote2': '"作为一个失眠严重的自由职业者，这个App的解锁机制居然让我期待每天睡觉的时间。收集完北海道的音源很有成就感。"',
  'quote3': '"UI设计非常克制，没有多余的干扰。打开App本身就是一个进入禅定状态的过程。"',
  'age20.office': '20代 · 公司职员',
  'age30.designer': '30代 · 设计师',
  'age20.student': '20代 · 研究生',
  'cta.title': '开始您的静心之旅',
  'cta.p1': '现在下载，即可免费体验基础自然音源。',
  'cta.p2': '开启订阅，解锁全日本秘境与深度冥想指导。',
  'cta.free': '免费下载 App',
  'cta.price': '订阅仅需 ¥600/月 起',
  'cta.roadmap.title': '即将推出 / Roadmap',
  'cta.roadmap.ios': 'iOS 正式版发布',
  'cta.roadmap.meditation': '冥想引导模式更新',
  'cta.roadmap.i18n': '英语/中文多语言支持',
  'footer.about': '关于我们',
  'footer.privacy': '隐私政策',
  'footer.terms': '使用条款',
  'footer.support': '联系支持',
};

translations.en = {
  'nav.meditation': 'Meditation',
  'nav.features': 'Features',
  'nav.locations': 'Sound Journey',
  'nav.system': 'Growth System',
  'nav.download': 'Download App',
  'nav.lang.ja': '日本語',
  'nav.lang.zh': '中文',
  'nav.lang.en': 'English',
  'hero.part1': 'Part 01: Research Theme',
  'hero.title1': 'Return to',
  'hero.title2': 'Calm & Order',
  'hero.subtitle1': 'A fusion of Japanese Zen culture and authentic natural white noise recorded across Japan.',
  'hero.subtitle2': 'A meditation and sleep companion for modern urban life.',
  'hero.ctaStore': 'Download on App Store',
  'hero.ctaWatch': 'Watch intro',
  'hero.statCollect': 'Recorded across Japan',
  'hero.statHiFi': 'Hi‑Fi sources',
  'hero.statRating': 'User rating',
  'concept.part2': 'Part 02: Research Goal',
  'concept.head1': 'Not just sound,',
  'concept.head2': 'but nature breathing.',
  'concept.p1': 'Most white‑noise apps use synthetic audio and lack the living texture of nature. We traveled across Japan and captured over 90% real environmental sounds.',
  'concept.p2': 'From Hokkaido’s sacred ponds to the thunder of Nachi Falls, we record nature’s pure frequencies to bring an immersive Zen experience.',
  'concept.real.title': 'Real recordings',
  'concept.real.desc': 'No synthesis, true nature',
  'concept.zen.title': 'Zen fusion',
  'concept.zen.desc': 'Meditation techniques for focus',
  'meditation.part3': 'Part 03: Zen & Meditation',
  'meditation.head1': 'In Zen Focus,',
  'meditation.head2': 'find focus',
  'meditation.line2Prefix': 'regain your',
  'meditation.p1': 'Modern life is full of digital noise. Zen Sound’s Zen Focus mode uses a minimal UI and immersive soundscape to cut distractions and enter flow fast.',
  'meditation.detox.title': 'Digital Detox',
  'meditation.detox.desc': 'Hide complex UI and notifications, leaving only a minimal ensō animation. Turn your phone into a pure player and drop information anxiety.',
  'meditation.guided.title': 'Guided Zazen',
  'meditation.guided.desc': 'Traditional Zazen‑based guidance from 5–30 minutes. From counting breath to following breath, observe thoughts within natural sound.',
  'meditation.breath.title': 'Mindful Breathing',
  'meditation.breath.desc': 'Visual + audio guidance to pace breathing, reduce cortisol, and ease acute stress.',
  'meditation.interactive1.title': 'Breathe in',
  'meditation.interactive1.desc': 'Follow the halo',
  'meditation.interactive3.title': 'Start Zen',
  'meditation.interactive3.desc': 'Enter calm mode',
  'breath.inhale': 'Inhale',
  'breath.hold': 'Hold',
  'exhale.title': 'Exhale slowly',
  'exhale.desc': 'Return to center',
  'locations.part5': 'Part 04: Field Recording',
  'locations.title': 'Listen to Japan',
  'locations.subtitle': 'We traveled the archipelago and preserved local soundscapes in the app.',
  'locations.hokkaido.place': 'Hokkaido · Shari',
  'locations.hokkaido.title': 'Kaminoko Pond',
  'locations.hokkaido.desc': 'Crystal water flows in silence, cleansing the mind.',
  'locations.nachi.badge': 'Today’s pick',
  'locations.nachi.place': 'Wakayama · Nachikatsuura',
  'locations.nachi.title': 'Nachi Falls',
  'locations.nachi.desc': 'A sacred roar that washes away noise and brings strength.',
  'locations.okinawa.place': 'Okinawa · Manzamō',
  'locations.okinawa.title': 'Sea wind & waves',
  'locations.okinawa.desc': 'Wind over grasslands and distant swells — harmony of nature.',
  'audio.taki.title': 'Oni no Sentakuita Tide',
  'audio.taki.loc': 'Miyazaki · Aoshima',
  'audio.sado.title': 'Silence of Sado',
  'audio.sado.loc': 'Niigata · Sado',
  'audio.temple.title': 'Temple Bells',
  'audio.temple.loc': 'Kyoto · Arashiyama',
  'system.part6': 'Part 05: Long‑term Journey',
  'system.title1': 'More than listening,',
  'system.title2': 'a path of practice',
  'system.p1': 'Zen Sound adds an explore‑and‑unlock loop. As you meditate and sleep with the app, more hidden soundscapes unlock, turning calm into a habit.',
  'system.unlock.title': 'Region unlocks',
  'system.unlock.desc': 'Start with basic sounds. After 5 hours unlock new regions; after 50 hours unlock VR immersion and custom mixes.',
  'system.badge.title': 'Achievements',
  'system.badge.desc': 'Earn badges like Night Watcher (10h at night) and Explorer (3 regions) to mark your progress.',
  'system.road.title': 'Your journey',
  'system.stage1.title': 'Beginner',
  'system.stage1.desc': 'Basic nature sounds',
  'system.done': 'Done',
  'system.stage2.title': 'Explorer',
  'system.stage2.desc': 'Progress: 3.5 / 5 hours',
  'system.stage2.unlocked': 'Explorer unlocked',
  'system.stage3.title': 'Zen Master',
  'system.stage3.desc': 'Requires 50 hours',
  'system.current': 'Current',
  'testimonials.title': 'Proven by data',
  'testimonials.p1': 'In a survey of 431 early users, Zen Sound showed clear benefits — not magic, but science meeting nature.',
  'testimonials.stat1': 'Better sleep quality',
  'testimonials.stat2': 'Noticeable relaxation',
  'testimonials.openData': 'View raw stats',
  'statsModal.title': 'Raw statistics',
  'statsModal.subtitle': 'Visualizations are presented with sample data.',
  'statsModal.chart.title': 'Key metrics over time',
  'statsModal.chart.subtitle': 'Between‑group comparison (intervention starts: Day 8)',
  'statsModal.chart.tab.sleep': 'Sleep score',
  'statsModal.chart.tab.stress': 'Stress',
  'statsModal.chart.tab.hrv': 'HRV',
  'statsModal.chart.legend.zen': 'Zen Sound',
  'statsModal.chart.legend.control': 'Control',
  'statsModal.chart.intervention': 'Intervention starts (Day 8)',
  'statsModal.axis.sleep': 'Sleep score (0–100)',
  'statsModal.axis.stress': 'Stress (0–100)',
  'statsModal.axis.hrv': 'HRV (ms)',
  'statsModal.table.title': 'Metric summary',
  'statsModal.table.col.metric': 'Metric',
  'statsModal.table.col.day1': 'Day 1',
  'statsModal.table.col.day8': 'Day 8',
  'statsModal.table.col.day21': 'Day 21',
  'statsModal.table.col.delta': 'Change (Day 8→21)',
  'statsModal.table.col.trend': 'Trend',
  'statsModal.metric.sleep': 'Sleep score',
  'statsModal.metric.stress': 'Stress',
  'statsModal.metric.hrv': 'HRV',
  'statsModal.close': 'Close',
  'quote1': '"Synthetic white noise always felt harsh, but Nachi Falls here sounds like I’m really there — powerful, then deeply calming."',
  'quote2': '"With serious insomnia, the unlock system makes me look forward to bedtime. Finishing Hokkaido sounds felt rewarding."',
  'quote3': '"The UI is restrained with zero distraction. Opening the app itself feels like entering meditation."',
  'age20.office': '20s · Office worker',
  'age30.designer': '30s · Designer',
  'age20.student': '20s · Graduate student',
  'cta.title': 'Begin your calm journey',
  'cta.p1': 'Download now to try basic natural sounds for free.',
  'cta.p2': 'Subscribe to unlock all regions and deep guided sessions.',
  'cta.free': 'Free download',
  'cta.price': 'Subscription from ¥600/mo',
  'cta.roadmap.title': 'Coming soon / Roadmap',
  'cta.roadmap.ios': 'iOS full release',
  'cta.roadmap.meditation': 'Guided mode update',
  'cta.roadmap.i18n': 'English/Chinese support',
  'footer.about': 'About',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.support': 'Support',
};

const getT = (lang) => (key) =>
  translations[lang]?.[key] ?? translations.ja[key] ?? key;

const METRIC_SERIES = {
  sleep: {
    labelKey: 'statsModal.metric.sleep',
    axisKey: 'statsModal.axis.sleep',
    zen: [61, 62, 63, 61, 62, 64, 63, 66, 68, 70, 72, 74, 75, 77, 78, 79, 80, 81, 82, 83, 84],
    control: [62, 63, 61, 64, 62, 63, 62, 63, 62, 64, 63, 62, 63, 64, 63, 62, 64, 63, 62, 63, 64],
    betterIsUp: true,
    yMin: 20,
    yMax: 100,
    unit: '',
    interventionDay: 8,
  },
  stress: {
    labelKey: 'statsModal.metric.stress',
    axisKey: 'statsModal.axis.stress',
    zen: [64, 63, 64, 62, 61, 60, 59, 58, 56, 55, 54, 53, 52, 51, 50, 49, 49, 48, 47, 47, 46],
    control: [64, 64, 63, 63, 63, 62, 62, 62, 62, 62, 61, 61, 61, 61, 60, 60, 60, 60, 60, 60, 59],
    betterIsUp: false,
    yMin: 20,
    yMax: 100,
    unit: '',
    interventionDay: 8,
  },
  hrv: {
    labelKey: 'statsModal.metric.hrv',
    axisKey: 'statsModal.axis.hrv',
    zen: [42, 43, 44, 43, 44, 45, 45, 46, 48, 49, 51, 53, 54, 56, 57, 58, 60, 61, 62, 63, 64],
    control: [42, 42, 42, 43, 42, 43, 42, 42, 42, 42, 41, 41, 41, 41, 41, 40, 40, 40, 40, 40, 40],
    betterIsUp: true,
    yMin: 30,
    yMax: 70,
    unit: 'ms',
    interventionDay: 8,
  },
};

const catmullRomPath = (points) => {
  if (points.length < 2) return '';
  const d = [`M ${points[0][0]} ${points[0][1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`);
  }
  return d.join(' ');
};

const StatsModal = ({ open, onClose, t }) => {
  const [metric, setMetric] = useState('sleep');
  const rows = [
    { key: 'sleep', ...METRIC_SERIES.sleep },
    { key: 'stress', ...METRIC_SERIES.stress },
    { key: 'hrv', ...METRIC_SERIES.hrv },
  ];

  const spark = ({ zen, control, id }) => {
    const width = 220;
    const height = 44;
    const pad = 5;
    const min = Math.min(...zen, ...control);
    const max = Math.max(...zen, ...control);
    const x = (i) => pad + ((width - pad * 2) * i) / (zen.length - 1);
    const y = (v) => {
      const denom = max - min || 1;
      return pad + ((max - v) / denom) * (height - pad * 2);
    };
    const zenPts = zen.map((v, i) => [x(i), y(v)]);
    const ctlPts = control.map((v, i) => [x(i), y(v)]);
    const zenD = catmullRomPath(zenPts);
    const ctlD = catmullRomPath(ctlPts);
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-[220px] h-[44px]">
        <defs>
          <mask id={`sparkMask-${id}`}>
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="white"
              style={{
                transform: 'scaleX(0)',
                transformOrigin: '0 0',
                transformBox: 'fill-box',
                animation: 'reveal-x 1.0s ease-out forwards',
              }}
            />
          </mask>
        </defs>
        <path d={ctlD} fill="none" stroke="rgba(148,163,184,0.95)" strokeWidth="2" strokeDasharray="5 5" mask={`url(#sparkMask-${id})`} />
        <path d={zenD} fill="none" stroke="rgb(245,158,11)" strokeWidth="2.6" mask={`url(#sparkMask-${id})`} />
      </svg>
    );
  };

  const delta = (values) => {
    const from = values[7]; // Day 8 (index 7)
    const to = values[20]; // Day 21 (index 20)
    return to - from;
  };

  const current = METRIC_SERIES[metric];
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const width = 980;
  const height = 360;
  const margin = { top: 28, right: 40, bottom: 44, left: 64 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const xForDay = (day) => margin.left + (innerW * (day - 1)) / (days.length - 1);
  const yForValue = (v) => {
    const clamped = Math.max(current.yMin, Math.min(current.yMax, v));
    return margin.top + ((current.yMax - clamped) / (current.yMax - current.yMin)) * innerH;
  };
  const zenPoints = current.zen.map((v, idx) => [xForDay(idx + 1), yForValue(v)]);
  const controlPoints = current.control.map((v, idx) => [xForDay(idx + 1), yForValue(v)]);
  const zenPath = catmullRomPath(zenPoints);
  const controlPath = catmullRomPath(controlPoints);
  const zenAreaPath = [
    zenPath,
    `L ${xForDay(days[days.length - 1])} ${margin.top + innerH}`,
    `L ${xForDay(1)} ${margin.top + innerH}`,
    'Z',
  ].join(' ');
  const interventionX = xForDay(current.interventionDay);
  const yTicks = metric === 'hrv' ? [30, 40, 50, 60, 70] : [20, 30, 40, 50, 60, 70, 80, 90, 100];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm overflow-y-auto scrollbar-hide-y"
      onClick={onClose}
    >
      <div className="min-h-full flex items-start justify-center p-4 md:p-8">
        <div
          className="relative w-full max-w-4xl bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl max-h-[75vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-6 p-5 md:p-6 border-b border-stone-800">
          <div>
            <h3 className="text-2xl font-bold text-stone-100">{t('statsModal.title')}</h3>
            <p className="text-sm text-stone-500 mt-1">{t('statsModal.subtitle')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900/80 text-stone-200 hover:text-amber-400 hover:bg-stone-900 transition-colors"
            aria-label={t('statsModal.close')}
          >
            <X size={18} />
          </button>
          </div>

          <div className="p-5 md:p-6 overflow-y-auto scrollbar-hide-y">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="text-xl font-bold text-stone-100">{t('statsModal.chart.title')}</div>
              <div className="text-sm text-stone-400 mt-1">{t('statsModal.chart.subtitle')}</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-1 flex w-fit">
              {[
                { key: 'sleep', label: t('statsModal.chart.tab.sleep') },
                { key: 'stress', label: t('statsModal.chart.tab.stress') },
                { key: 'hrv', label: t('statsModal.chart.tab.hrv') },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setMetric(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${metric === tab.key ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' : 'text-stone-400 hover:text-stone-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto scrollbar-zen">
            <div className="min-w-[980px]">
              <div className="flex items-center justify-end gap-6 text-sm text-stone-300 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-12 h-0.5 bg-amber-400"></span>
                  <span>{t('statsModal.chart.legend.zen')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-12 h-0.5 border-t-2 border-dashed border-slate-400"></span>
                  <span>{t('statsModal.chart.legend.control')}</span>
                </div>
              </div>

              <svg key={metric} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label={t(current.axisKey)}>
                <defs>
                  <linearGradient id={`zenFill-${metric}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(245,158,11)" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="rgb(245,158,11)" stopOpacity="0.02" />
                  </linearGradient>
                  <mask id={`revealMask-${metric}`}>
                    <rect
                      x="0"
                      y="0"
                      width={width}
                      height={height}
                      fill="white"
                      style={{
                        transform: 'scaleX(0)',
                        transformOrigin: '0 0',
                        transformBox: 'fill-box',
                        animation: 'reveal-x 1.2s ease-out forwards',
                      }}
                    />
                  </mask>
                </defs>

                {yTicks.map(v => (
                  <g key={`y-${v}`}>
                    <line x1={margin.left} x2={margin.left + innerW} y1={yForValue(v)} y2={yForValue(v)} stroke="rgba(148,163,184,0.16)" />
                    <text x={margin.left - 10} y={yForValue(v) + 4} textAnchor="end" fill="rgba(148,163,184,0.85)" fontSize="12">
                      {v}
                    </text>
                  </g>
                ))}

                <text
                  x="18"
                  y={margin.top + innerH / 2}
                  fill="rgba(148,163,184,0.9)"
                  fontSize="12"
                  transform={`rotate(-90 18 ${margin.top + innerH / 2})`}
                  textAnchor="middle"
                >
                  {t(current.axisKey)}
                </text>

                {days.map(day => (
                  <text key={`x-${day}`} x={xForDay(day)} y={height - 14} textAnchor="middle" fill="rgba(148,163,184,0.85)" fontSize="12">
                    {`Day ${day}`}
                  </text>
                ))}

                <line x1={interventionX} x2={interventionX} y1={margin.top} y2={margin.top + innerH} stroke="rgba(148,163,184,0.9)" strokeDasharray="6 6" />
                <text x={interventionX + 8} y={margin.top + 18} fill="rgba(148,163,184,0.95)" fontSize="12">
                  {t('statsModal.chart.intervention')}
                </text>

                <path d={zenAreaPath} fill={`url(#zenFill-${metric})`} mask={`url(#revealMask-${metric})`} />

                <path d={controlPath} fill="none" stroke="rgba(148,163,184,0.85)" strokeWidth="2.5" strokeDasharray="6 6" mask={`url(#revealMask-${metric})`} />
                {controlPoints.map(([x, y], idx) => (
                  <circle key={`c-${idx}`} cx={x} cy={y} r="3.2" fill="rgba(148,163,184,0.9)" mask={`url(#revealMask-${metric})`} />
                ))}

                <path d={zenPath} fill="none" stroke="rgb(245,158,11)" strokeWidth="3.5" mask={`url(#revealMask-${metric})`} />
                {zenPoints.map(([x, y], idx) => (
                  <circle key={`z-${idx}`} cx={x} cy={y} r="4.2" fill="rgb(245,158,11)" mask={`url(#revealMask-${metric})`} />
                ))}
              </svg>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-sm font-bold text-stone-200 mb-3">{t('statsModal.table.title')}</div>
            <div className="overflow-x-auto border border-stone-800 rounded-2xl scrollbar-zen">
              <table className="min-w-[980px] w-full text-sm">
                <thead className="bg-stone-900/70">
                  <tr className="text-stone-400">
                    <th className="text-left font-bold px-4 py-3">{t('statsModal.table.col.metric')}</th>
                    <th className="text-left font-bold px-4 py-3">{t('statsModal.table.col.day1')}</th>
                    <th className="text-left font-bold px-4 py-3">{t('statsModal.table.col.day8')}</th>
                    <th className="text-left font-bold px-4 py-3">{t('statsModal.table.col.day21')}</th>
                    <th className="text-left font-bold px-4 py-3">{t('statsModal.table.col.delta')}</th>
                    <th className="text-left font-bold px-4 py-3">{t('statsModal.table.col.trend')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const dz = delta(r.zen);
                    const good = r.betterIsUp ? dz >= 0 : dz <= 0;
                    const sign = dz >= 0 ? '+' : '';
                    const unit = r.unit ? ` ${r.unit}` : '';
                    return (
                      <tr key={r.key} className="border-t border-stone-800">
                        <td className="px-4 py-4">
                          <div className="font-bold text-stone-100">{t(r.labelKey)}</div>
                          <div className="text-xs text-stone-500 mt-1">{t(r.axisKey)}</div>
                        </td>
                        {[0, 7, 20].map((idx) => (
                          <td key={`${r.key}-${idx}`} className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="text-amber-300 font-bold">{r.zen[idx]}{unit}</div>
                              <div className="text-stone-500">/</div>
                              <div className="text-stone-300">{r.control[idx]}{unit}</div>
                            </div>
                          </td>
                        ))}
                        <td className="px-4 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${good ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' : 'border-stone-700 bg-stone-900/40 text-stone-300'}`}>
                            <span className="font-bold">{sign}{dz.toFixed(1)}{unit}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {spark({ zen: r.zen, control: r.control, id: r.key })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 简单的音频播放器组件
const AudioPlayer = ({ title, location, icon, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const Icon = icon;

  const togglePlay = async () => {
    if (!audioSrc || !audioRef.current) {
      setIsPlaying(prev => !prev);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

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
        onClick={togglePlay}
        className="p-2 text-stone-300 hover:text-amber-400 transition-colors"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload="none" />}
    </div>
  );
};

// 呼吸引导动画组件 (吸气 - 扩张)
const BreathingGuide = ({ t }) => {
  const [phase, setPhase] = useState('breath.inhale');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => prev === 'breath.inhale' ? 'breath.hold' : 'breath.inhale');
    }, 4000); // 4秒呼吸周期
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-[240px] py-4">
      {/* 动画光环 - 扩张 */}
      <div className={`absolute w-40 h-40 rounded-full border-2 border-amber-500/30 transition-all duration-[4000ms] ease-in-out ${phase === 'breath.inhale' ? 'scale-150 opacity-20' : 'scale-100 opacity-50'}`}></div>
      <div className={`absolute w-40 h-40 rounded-full bg-amber-600/10 transition-all duration-[4000ms] ease-in-out ${phase === 'breath.inhale' ? 'scale-125' : 'scale-90'}`}></div>
      
      {/* 核心圆 */}
      <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-stone-800 to-stone-900 rounded-full border border-amber-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(217,119,6,0.2)]">
        <div className="text-center">
          <span className={`block text-xl font-serif text-amber-100 transition-all duration-[4000ms] ${phase === 'breath.inhale' ? 'tracking-[0.2em]' : 'tracking-normal'}`}>{t(phase)}</span>
          <span className="text-[9px] text-stone-500 uppercase tracking-widest mt-1">Inhale</span>
        </div>
      </div>
    </div>
  );
};

// 吐气视觉引导组件 (吐气 - 收缩)
const ExhaleGuide = ({ t }) => {
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
             <h4 className="text-stone-200 font-bold text-sm">{t('exhale.title')}</h4>
             <p className="text-[10px] text-stone-500">{t('exhale.desc')}</p>
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
  const [lang, setLang] = useState('ja');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [systemStep, setSystemStep] = useState(2);
  const t = getT(lang);

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

  useEffect(() => {
    if (videoOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [videoOpen]);

  useEffect(() => {
    if (statsOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [statsOpen]);

  return (
    <div className="bg-stone-950 min-h-screen font-sans text-stone-100 selection:bg-amber-900 selection:text-amber-100">
      <StatsModal open={statsOpen} onClose={() => setStatsOpen(false)} t={t} />
      {videoOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-stone-900/80 text-stone-200 hover:text-amber-400 hover:bg-stone-900 transition-colors"
              aria-label="Close video"
            >
              <X size={18} />
            </button>
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/1145883444?badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="zensound"
              />
            </div>
          </div>
        </div>
      )}
      
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
            <button onClick={() => scrollToSection('meditation')} className="hover:text-amber-400 transition-colors flex items-center gap-1"><Flower2 size={14}/> {t('nav.meditation')}</button>
            <button onClick={() => setVideoOpen(true)} className="hover:text-amber-400 transition-colors">{t('nav.features')}</button>
            <button onClick={() => scrollToSection('locations')} className="hover:text-amber-400 transition-colors">{t('nav.locations')}</button>
            <button onClick={() => scrollToSection('system')} className="hover:text-amber-400 transition-colors">{t('nav.system')}</button>
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(v => !v)}
                className="px-3 py-1 rounded-full border border-stone-700 text-xs text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                {t(`nav.lang.${lang}`)}
                <ChevronRight size={12} className={`transition-transform ${langMenuOpen ? 'rotate-90' : ''}`} />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 bg-stone-900 border border-stone-800 rounded-lg shadow-xl overflow-hidden min-w-[110px] text-xs">
                  {['ja', 'zh', 'en'].map(code => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 hover:bg-stone-800 transition-colors ${lang === code ? 'text-amber-400' : 'text-stone-200'}`}
                    >
                      {t(`nav.lang.${code}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="bg-stone-100 text-stone-900 px-5 py-2 rounded-full font-bold hover:bg-amber-400 transition-all flex items-center gap-2">
              <Download size={16} /> {t('nav.download')}
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
            <button onClick={() => scrollToSection('meditation')} className="text-left py-2 text-stone-300 flex items-center gap-2"><Flower2 size={16}/> {t('nav.meditation')}</button>
            <button onClick={() => { setVideoOpen(true); setMobileMenuOpen(false); }} className="text-left py-2 text-stone-300">{t('nav.features')}</button>
            <button onClick={() => scrollToSection('locations')} className="text-left py-2 text-stone-300">{t('nav.locations')}</button>
            <button onClick={() => scrollToSection('system')} className="text-left py-2 text-stone-300">{t('nav.system')}</button>
            <div className="relative pt-2">
              <button
                onClick={() => setLangMenuOpen(v => !v)}
                className="w-full py-2 rounded border border-stone-700 text-xs text-stone-300 flex items-center justify-center gap-1"
              >
                {t(`nav.lang.${lang}`)}
                <ChevronRight size={12} className={`transition-transform ${langMenuOpen ? 'rotate-90' : ''}`} />
              </button>
              {langMenuOpen && (
                <div className="mt-2 bg-stone-950 border border-stone-800 rounded-lg overflow-hidden text-xs">
                  {['ja', 'zh', 'en'].map(code => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 hover:bg-stone-800 transition-colors ${lang === code ? 'text-amber-400' : 'text-stone-200'}`}
                    >
                      {t(`nav.lang.${code}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="bg-amber-500 text-stone-900 py-3 rounded-lg font-bold text-center mt-2">
              {t('nav.download')}
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

        <div className="relative z-10 container mx-auto px-6 pt-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8">
            <div className="w-full lg:w-[55%] text-left lg:translate-x-20 -translate-y-[5px]">
              <div className="inline-block mb-6 px-4 py-1 border border-stone-500/50 rounded-full bg-stone-900/30 backdrop-blur-sm text-amber-300 text-sm tracking-widest uppercase">
                {t('hero.part1')}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                {t('hero.title1')}<br/>
                {lang === 'ja' ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                    {t('hero.title2').split('取り戻す')[0]}<br/>取り戻す
                  </span>
                ) : (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">{t('hero.title2')}</span>
                )}
              </h1>
              <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-2xl leading-relaxed">
                {t('hero.subtitle1')}<br/>
                {t('hero.subtitle2')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start sm:justify-start">
                <button className="w-full sm:w-auto bg-stone-100 hover:bg-amber-400 text-stone-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20">
                  <span className="text-xl"></span> {t('hero.ctaStore')}
                </button>
                <button onClick={() => setVideoOpen(true)} className="w-full sm:w-auto bg-stone-800/50 hover:bg-stone-800 text-white border border-stone-600 px-8 py-4 rounded-full font-medium text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2">
                  <Play size={18} className="fill-current" /> {t('hero.ctaWatch')}
                </button>
              </div>

              <div className="mt-16 flex gap-12 text-stone-500">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-stone-300">90%</span>
                  <span className="text-xs uppercase tracking-wider">{t('hero.statCollect')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-stone-300">50h+</span>
                  <span className="text-xs uppercase tracking-wider">{t('hero.statHiFi')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-stone-300">4.9</span>
                  <span className="text-xs uppercase tracking-wider">{t('hero.statRating')}</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[85%] flex justify-center lg:justify-end lg:self-stretch lg:items-center lg:-translate-x-6">
              <div className="relative max-w-[660px] lg:max-w-[820px] w-full"> 
                <div className="relative rounded-[28px] overflow-hidden animate-[float_6s_ease-in-out_infinite]">
                  <img 
                    src={phoneImg} 
                    alt="禅音 App 预览" 
                    className="w-full h-auto max-h-[1960px] object-contain"
                  />
                </div>
              </div>
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
	                <span>{t('concept.part2')}</span>
	              </div>
		              <h2 className="text-3xl md:text-4xl font-bold leading-snug">
		                {t('concept.head1')}<br/>
                    <span className="text-amber-400">{t('concept.head2')}</span>
		              </h2>
	              <p className="text-stone-400 leading-relaxed">
	                {t('concept.p1')}
	              </p>
	              <p className="text-stone-400 leading-relaxed">
	                {t('concept.p2')}
	              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
	                <div className="border-l-2 border-stone-800 pl-4">
	                  <h3 className="text-white font-bold mb-1">{t('concept.real.title')}</h3>
	                  <p className="text-sm text-stone-500">{t('concept.real.desc')}</p>
	                </div>
	                <div className="border-l-2 border-stone-800 pl-4">
	                  <h3 className="text-white font-bold mb-1">{t('concept.zen.title')}</h3>
	                  <p className="text-sm text-stone-500">{t('concept.zen.desc')}</p>
	                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
                 <img 
                  src="https://images.unsplash.com/photo-1528164344705-47542687000d"
                  alt="FUJI MO" 
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
	                <span>{t('meditation.part3')}</span>
	              </div>
	              <h2 className="text-3xl md:text-4xl font-bold leading-snug text-white">
	                {t('meditation.head1')}<br />
	                {t('meditation.line2Prefix')}<span className="text-amber-400">{t('meditation.head2')}</span>。
	              </h2>
	              <p className="text-stone-400 leading-relaxed">
	                {t('meditation.p1')}
	              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg h-fit text-amber-400 shadow-lg">
                    <VolumeX size={24} />
                  </div>
                  <div>
	                    <h4 className="text-lg font-bold text-stone-200 mb-2">{t('meditation.detox.title')}</h4>
	                    <p className="text-sm text-stone-500">
	                      {t('meditation.detox.desc')}
	                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg h-fit text-amber-400 shadow-lg">
                    <Brain size={24} />
                  </div>
                  <div>
	                    <h4 className="text-lg font-bold text-stone-200 mb-2">{t('meditation.guided.title')}</h4>
	                    <p className="text-sm text-stone-500">
	                      {t('meditation.guided.desc')}
	                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg h-fit text-amber-400 shadow-lg">
                    <Sparkles size={24} />
                  </div>
                  <div>
	                    <h4 className="text-lg font-bold text-stone-200 mb-2">{t('meditation.breath.title')}</h4>
	                    <p className="text-sm text-stone-500">
	                      {t('meditation.breath.desc')}
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
                    <h3 className="text-xl font-serif text-amber-200 mb-1 z-10">{t('meditation.interactive1.title')}</h3>
                    <p className="text-stone-500 text-xs mb-4 z-10">{t('meditation.interactive1.desc')}</p>
                    <BreathingGuide t={t} />
                </div>

                {/* 卡片 2: 试着吐气 (右上) */}
                <div className="bg-stone-800/30 rounded-3xl p-4 border border-stone-700/50 shadow-xl flex flex-col justify-center hover:bg-stone-800/50 transition-colors group relative overflow-hidden">
                   <ExhaleGuide t={t} />
                </div>

                {/* 卡片 3: 开始放空冥想 (右下) */}
                <div className="bg-gradient-to-br from-amber-900/20 to-stone-800/30 rounded-3xl p-6 border border-amber-500/20 shadow-xl flex items-center justify-between hover:border-amber-500/40 transition-all cursor-pointer group relative overflow-hidden">
                   <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-lg font-bold text-stone-100 mb-1 flex items-center gap-2">
                          {t('meditation.interactive3.title')} <ArrowRight size={16} className="text-amber-500 -ml-1 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all"/>
                        </h3>
                        <p className="text-xs text-stone-500">{t('meditation.interactive3.desc')}</p>
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
            <span className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-2 block">{t('locations.part5')}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('locations.title')}</h2>
            <p className="text-stone-400 max-w-xl mx-auto">
              {t('locations.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 卡片 1 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <img 
                src="https://res-3.cloudinary.com/jnto/image/upload/w_2064,h_1300,c_fill,f_auto,fl_lossy,q_auto/v1516440420/hokkaido/Hokkaido1499_1" 
                alt="Hokkaido Pond" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
                  <Mountain size={16} />
                  <span>{t('locations.hokkaido.place')}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{t('locations.hokkaido.title')}</h3>
                <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {t('locations.hokkaido.desc')}
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
                {t('locations.nachi.badge')}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
                  <CloudRain size={16} />
                  <span>{t('locations.nachi.place')}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{t('locations.nachi.title')}</h3>
                <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {t('locations.nachi.desc')}
                </p>
              </div>
            </div>

            {/* 卡片 3 */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <img 
                src="https://images.unsplash.com/photo-1506918357967-b358ad447c56" 
                alt="Okinawa Beach" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
                  <Wind size={16} />
                  <span>{t('locations.okinawa.place')}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{t('locations.okinawa.title')}</h3>
                <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {t('locations.okinawa.desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AudioPlayer title={t('audio.taki.title')} location={t('audio.taki.loc')} icon={Waves} audioSrc={takiAudio} />
            <AudioPlayer title={t('audio.sado.title')} location={t('audio.sado.loc')} icon={Moon} audioSrc={shimaAudio} />
            <AudioPlayer title={t('audio.temple.title')} location={t('audio.temple.loc')} icon={Award} audioSrc={teraAudio} />
          </div>
        </div>
      </section>

      {/* 成长体系与Gamification Section */}
      <section id="system" className="py-24 bg-stone-950 border-t border-stone-900">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <span className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-2 block">{t('system.part6')}</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('system.title1')}<br/><span className="text-amber-400">{t('system.title2')}</span></h2>
                <p className="text-stone-400 mb-8 leading-relaxed">
                  {t('system.p1')}
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-stone-800 p-3 rounded-lg text-amber-400">
                      <Unlock size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-stone-200">{t('system.unlock.title')}</h4>
                      <p className="text-stone-500 text-sm mt-1">
                        {t('system.unlock.desc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="bg-stone-800 p-3 rounded-lg text-amber-400">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-stone-200">{t('system.badge.title')}</h4>
                      <p className="text-stone-500 text-sm mt-1">
                        {t('system.badge.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-900 rounded-2xl p-8 border border-stone-800 relative">
                 <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Award size={120} className="text-amber-500" />
                 </div>
                 <h3 className="text-2xl font-bold mb-6 text-center">{t('system.road.title')}</h3>
                 
	                 <div className="space-y-4">
	                   {/* 进度条示例 */}
	                   <div className="bg-stone-800 rounded-xl p-4 flex items-center justify-between border border-stone-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center text-stone-400">1</div>
                        <div>
                          <div className="text-sm font-bold">{t('system.stage1.title')}</div>
                          <div className="text-xs text-stone-500">{t('system.stage1.desc')}</div>
                        </div>
                      </div>
	                      <span className="text-amber-500 text-sm font-bold">{t('system.done')}</span>
	                   </div>
	
	                   <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSystemStep(3)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSystemStep(3); }}
                        className={`bg-stone-800 rounded-xl p-4 flex items-center justify-between transition-colors cursor-pointer ${systemStep >= 3 ? 'border border-stone-700 hover:bg-stone-800/90' : 'border border-amber-500/30 shadow-lg shadow-amber-900/10 hover:bg-stone-800/90'}`}
                      >
	                      <div className="flex items-center gap-3">
	                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${systemStep >= 3 ? 'bg-stone-700 text-stone-300' : 'bg-amber-500 text-stone-900'}`}>2</div>
	                        <div>
	                          <div className="text-sm font-bold text-amber-100">{t('system.stage2.title')}</div>
	                          <div className="text-xs text-stone-400">{systemStep >= 3 ? t('system.stage2.unlocked') : t('system.stage2.desc')}</div>
	                        </div>
	                      </div>
                        {systemStep >= 3 ? (
                          <span className="text-amber-500 text-sm font-bold">{t('system.done')}</span>
                        ) : (
	                       <div className="w-12 h-12 rounded-full border-4 border-stone-700 border-t-amber-500 animate-spin flex items-center justify-center"></div>
                        )}
	                   </div>
	
	                   <div className={`rounded-xl p-4 flex items-center justify-between border transition-colors ${systemStep >= 3 ? 'bg-stone-800 border-amber-500/30 shadow-lg shadow-amber-900/10' : 'bg-stone-800/50 border-stone-800 opacity-60'}`}>
	                      <div className="flex items-center gap-3 min-w-0">
                          {systemStep >= 3 ? (
	                          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-bold">3</div>
                          ) : (
	                          <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-600"><Lock size={16}/></div>
                          )}
	                        <div className="min-w-0">
	                          <div className={`text-sm font-bold ${systemStep >= 3 ? 'text-amber-100' : 'text-stone-500'}`}>{t('system.stage3.title')}</div>
	                          <div className={`text-xs ${systemStep >= 3 ? 'text-stone-300' : 'text-stone-600'}`}>{systemStep >= 3 ? `${t('system.current')}: ${t('system.stage3.desc')}` : t('system.stage3.desc')}</div>
	                        </div>
	                      </div>
                        {systemStep >= 3 && (
                          <div className="w-12 h-12 rounded-full border-4 border-stone-700 border-t-amber-500 animate-spin flex items-center justify-center"></div>
                        )}
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
               <div className="flex items-center justify-between gap-4">
                 <h2 className="text-3xl md:text-4xl font-bold">{t('testimonials.title')}</h2>
                 <button
                   onClick={() => setStatsOpen(true)}
                   className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors"
                 >
                   {t('testimonials.openData')}
                   <ChevronRight size={16} />
                 </button>
               </div>
               <p className="text-stone-400 mt-6">
                 {t('testimonials.p1')}
               </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-stone-800 p-6 rounded-2xl text-center">
                 <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">94%</div>
                 <div className="text-stone-300 text-sm">{t('testimonials.stat1')}</div>
               </div>
               <div className="bg-stone-800 p-6 rounded-2xl text-center">
                 <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">63%</div>
                 <div className="text-stone-300 text-sm">{t('testimonials.stat2')}</div>
               </div>
            </div>
          </div>

          {/* 用户评价卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-xl">
              <div className="flex gap-1 text-amber-500 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="text-stone-300 mb-6 text-sm leading-relaxed">{t('quote1')}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 border border-stone-700 rounded-full flex items-center justify-center text-stone-300">
                  <UserRound size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-200">Simon</div>
                  <div className="text-xs text-stone-500">{t('age20.office')}</div>
                </div>
              </div>
            </div>
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-xl">
              <div className="flex gap-1 text-amber-500 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
              <p className="text-stone-300 mb-6 text-sm leading-relaxed">{t('quote2')}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 border border-stone-700 rounded-full flex items-center justify-center text-stone-300">
                  <UserRound size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-200">Akiko</div>
                  <div className="text-xs text-stone-500">{t('age30.designer')}</div>
                </div>
              </div>
            </div>
             <div className="bg-stone-950 border border-stone-800 p-6 rounded-xl">
              <div className="flex gap-1 text-amber-500 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} /></div>
              <p className="text-stone-300 mb-6 text-sm leading-relaxed">{t('quote3')}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 border border-stone-700 rounded-full flex items-center justify-center text-stone-300">
                  <UserRound size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-200">Kenji</div>
                  <div className="text-xs text-stone-500">{t('age20.student')}</div>
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
           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t('cta.title')}</h2>
           <p className="text-lg text-stone-400 mb-10">
             {t('cta.p1')}<br/>
             {t('cta.p2')}
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
             <button className="bg-amber-500 hover:bg-amber-400 text-stone-900 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
               {t('cta.free')}
             </button>
             <div className="flex items-center gap-2 text-stone-400 px-6 py-4 bg-stone-800/50 rounded-full border border-stone-700">
                <span className="text-sm">{t('cta.price')}</span>
             </div>
           </div>
           
           <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl inline-block text-left">
             <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">{t('cta.roadmap.title')}</div>
             <ul className="space-y-2 text-sm text-stone-300">
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> {t('cta.roadmap.ios')}</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-600 rounded-full"></div> {t('cta.roadmap.meditation')}</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-stone-600 rounded-full"></div> {t('cta.roadmap.i18n')}</li>
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
              <a href="#" className="hover:text-amber-500 transition-colors">{t('footer.about')}</a>
              <a href="#" className="hover:text-amber-500 transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-amber-500 transition-colors">{t('footer.terms')}</a>
              <a href="#" className="hover:text-amber-500 transition-colors">{t('footer.support')}</a>
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

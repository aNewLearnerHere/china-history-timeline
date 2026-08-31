import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { dynastiesLite } from '../data/dynasties-lite';
import type { Dynasty } from '../data/types';
import RulerTimeline from '../components/DynastyDetail/RulerTimeline';

// 动态导入每个朝代的完整数据
const dynastyModules = {
  yuangu: () => import('../data/dynasties/yuangu'),
  xia: () => import('../data/dynasties/xia'),
  shang: () => import('../data/dynasties/shang'),
  zhou: () => import('../data/dynasties/zhou'),
  qin: () => import('../data/dynasties/qin'),
  han: () => import('../data/dynasties/han'),
  sanguo: () => import('../data/dynasties/sanguo'),
  jin: () => import('../data/dynasties/jin'),
  nanchao: () => import('../data/dynasties/nanchao'),
  sui: () => import('../data/dynasties/sui'),
  tang: () => import('../data/dynasties/tang'),
  song: () => import('../data/dynasties/song'),
  yuan: () => import('../data/dynasties/yuan'),
  ming: () => import('../data/dynasties/ming'),
  qing: () => import('../data/dynasties/qing'),
  jindai: () => import('../data/dynasties/jindai'),
};

export default function DynastyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dynasty, setDynasty] = useState<Dynasty | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('rulers');
  const [selectedFigure, setSelectedFigure] = useState<any>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  // 从轻量数据获取朝代基本信息
  const dynastyLite = dynastiesLite.find(d => d.id === id);

  useEffect(() => {
    if (!id || !dynastyModules[id as keyof typeof dynastyModules]) {
      setLoading(false);
      return;
    }

    setLoading(true);
// 每个朝代文件的导出名
const exportNames: Record<string, string> = {
  yuangu: 'yuangu', xia: 'xia', shang: 'shang', zhou: 'zhou',
  qin: 'qin', han: 'han', sanguo: 'sanguo', jin: 'jin',
  nanchao: 'nanchao', sui: 'sui', tang: 'tang', song: 'song',
  yuan: 'yuan', ming: 'ming', qing: 'qing', jindai: 'jindai',
};

    dynastyModules[id as keyof typeof dynastyModules]()
      .then((module) => {
        const exportKey = exportNames[id!];
        if (exportKey && module[exportKey]) {
          setDynasty(module[exportKey] as Dynasty);
        }
      })
      .catch((err) => {
        console.error('Failed to load dynasty data:', err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (!dynastyLite) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">朝代未找到</p>
          <button onClick={() => navigate('/')} className="mt-4 text-yellow-500 hover:underline">
            ← 返回首页
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-gray-700 rounded-full mx-auto mb-4"
            style={{ borderTopColor: dynastyLite.color }}
          />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!dynasty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">数据加载失败</p>
          <button onClick={() => navigate('/')} className="mt-4 text-yellow-500 hover:underline">
            ← 返回首页
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'rulers', label: '👑 帝王', data: dynasty.rulers },
    { key: 'generals', label: '🗡 名将', data: dynasty.generals },
    { key: 'ministers', label: '📜 名臣', data: dynasty.ministers },
    { key: 'thinkers', label: '🎓 思想家', data: dynasty.thinkers },
    { key: 'writers', label: '✍️ 文人', data: dynasty.writers },
  ];

  const renderFigureGrid = (figures: any[]) => {
    if (figures.length === 0) {
      return <p className="text-gray-500 text-center py-8">暂无数据</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {figures.map((figure, i) => (
          <motion.div
            key={figure.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedFigure(figure)}
            className="bg-gray-800/50 rounded-lg p-4 cursor-pointer border border-gray-700/50 hover:border-opacity-100"
            style={{ borderColor: `${dynasty.color}40` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                style={{ backgroundColor: dynasty.color }}
              >
                {figure.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-white">{figure.name}</h4>
                <p className="text-xs text-gray-400">{figure.title}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">{figure.bio}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-12">
      {/* 顶部区域 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-12 px-4 text-center"
        style={{
          background: `linear-gradient(180deg, ${dynasty.color}20 0%, #0F172A 100%)`,
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 top-4 text-gray-400 hover:text-white text-sm"
        >
          ← 返回
        </button>
        <h1 className="text-5xl font-bold mb-2" style={{ color: dynasty.color }}>
          {dynasty.name}
        </h1>
        <p className="text-gray-400">{dynasty.period}</p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-300">
          <span>🏛 都城：{dynasty.capital}</span>
          <span>👑 开国：{dynasty.founder}</span>
        </div>
        <p className="max-w-xl mx-auto mt-4 text-gray-400 text-sm leading-relaxed">
          {dynasty.summary}
        </p>
      </motion.div>

      {/* Tab 切换 */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-t-lg text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'text-white font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              style={activeTab === tab.key ? { backgroundColor: `${dynasty.color}30`, color: dynasty.color } : {}}
            >
              {tab.label}
              {tab.data.length > 0 && (
                <span className="ml-1 text-xs opacity-60">({tab.data.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* 人物列表 */}
        <div key="rulers" className={activeTab === 'rulers' ? '' : 'hidden'}>
          <RulerTimeline rulers={dynasty.rulers} color={dynasty.color} onSelect={setSelectedFigure} />
        </div>
        {tabs.filter(t => t.key !== 'rulers').map(tab => (
          <div key={tab.key} className={activeTab === tab.key ? '' : 'hidden'}>
            {renderFigureGrid(tab.data)}
          </div>
        ))}

        {/* 经典故事 */}
        <h2 className="text-xl font-bold mt-10 mb-4" style={{ color: dynasty.color }}>
          📖 经典故事
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dynasty.stories.map((story, i) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedStory(story)}
              className="bg-gray-800/50 rounded-lg p-4 cursor-pointer border border-gray-700/50 hover:border-opacity-100"
              style={{ borderColor: `${dynasty.color}40` }}
            >
              <h4 className="font-bold text-white mb-1">{story.title}</h4>
              <p className="text-xs text-gray-500 mb-2">{story.period}</p>
              <p className="text-sm text-gray-300 line-clamp-3">{story.summary}</p>
            </motion.div>
          ))}
        </div>

        {/* 文化科技 */}
        <h2 className="text-xl font-bold mt-10 mb-4" style={{ color: dynasty.color }}>
          🔬 文化科技
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {dynasty.culture.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/30"
            >
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${dynasty.color}30`, color: dynasty.color }}>
                {item.category}
              </span>
              <h4 className="font-bold text-white mt-2 text-sm">{item.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 人物详情弹窗 */}
      {selectedFigure && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFigure(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full border"
            style={{ borderColor: dynasty.color }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: dynasty.color }}
              >
                {selectedFigure.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedFigure.name}</h3>
                <p className="text-sm" style={{ color: dynasty.color }}>{selectedFigure.title}</p>
                <p className="text-xs text-gray-400">{selectedFigure.period}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">{selectedFigure.bio}</p>
            {selectedFigure.achievements && selectedFigure.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-200 mb-2">主要成就</h4>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  {selectedFigure.achievements.map((a: string, i: number) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedFigure.story && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-200 mb-2">经典故事</h4>
                <p className="text-sm text-gray-400">{selectedFigure.story}</p>
              </div>
            )}
            {selectedFigure.legacy && (
              <div className="border-t border-gray-700 pt-3">
                <h4 className="text-sm font-bold text-gray-200 mb-1">后人评价</h4>
                <p className="text-sm text-gray-400 italic">{selectedFigure.legacy}</p>
              </div>
            )}
            <button
              onClick={() => setSelectedFigure(null)}
              className="mt-4 w-full py-2 rounded-lg text-sm text-white"
              style={{ backgroundColor: dynasty.color }}
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* 故事详情弹窗 */}
      {selectedStory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStory(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full border"
            style={{ borderColor: dynasty.color }}
          >
            <h3 className="text-xl font-bold text-white mb-1">{selectedStory.title}</h3>
            <p className="text-xs mb-4" style={{ color: dynasty.color }}>{selectedStory.period}</p>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">{selectedStory.summary}</p>
            <div className="mb-3">
              <span className="text-xs text-gray-500">相关人物：</span>
              <span className="text-xs text-gray-300 ml-1">{selectedStory.characters.join('、')}</span>
            </div>
            {selectedStory.moral && (
              <div className="mb-3">
                <span className="text-xs text-gray-500">寓意：</span>
                <span className="text-xs text-gray-300 ml-1">{selectedStory.moral}</span>
              </div>
            )}
            {selectedStory.source && (
              <p className="text-xs text-gray-500">出处：{selectedStory.source}</p>
            )}
            <button
              onClick={() => setSelectedStory(null)}
              className="mt-4 w-full py-2 rounded-lg text-sm text-white"
              style={{ backgroundColor: dynasty.color }}
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

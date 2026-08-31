import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Figure } from '../../data/types';

interface Props {
  rulers: Figure[];
  color: string;
  onSelect: (figure: Figure) => void;
}

// 判断是否经典帝王（根据成就数量和是否有 story/legacy 字段）
function isClassicRuler(ruler: Figure): boolean {
  return (
    (ruler.achievements.length >= 3 || ruler.story || ruler.legacy) === true
  );
}

export default function RulerTimeline({ rulers, color, onSelect }: Props) {
  const [expandedRuler, setExpandedRuler] = useState<string | null>(null);

  if (rulers.length === 0) {
    return <p className="text-gray-500 text-center py-8">暂无数据</p>;
  }

  return (
    <div className="relative mt-6">
      {/* 时间轴线 */}
      <div
        className="absolute left-8 top-0 bottom-0 w-0.5 opacity-40"
        style={{ background: `linear-gradient(180deg, ${color}, ${color}60, transparent)` }}
      />

      <div className="space-y-0">
        {rulers.map((ruler, i) => {
          const classic = isClassicRuler(ruler);
          const isExpanded = expandedRuler === ruler.name;

          return (
            <motion.div
              key={ruler.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-4 py-3"
            >
              {/* 时间轴节点 */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg transition-all duration-300 ${
                    classic ? 'ring-2 ring-offset-2 ring-offset-gray-900' : ''
                  }`}
                  style={{
                    backgroundColor: classic ? color : '#374151',
                    boxShadow: classic ? `0 0 20px ${color}40` : 'none',
                    ...(classic ? { outlineColor: color } : {}),
                  }}
                >
                  {ruler.name[0]}
                </div>
                {classic && (
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: color }}
                  >
                    ⭐
                  </div>
                )}
              </div>

              {/* 内容区 */}
              <div
                className={`flex-1 rounded-xl p-4 cursor-pointer transition-all duration-300 border ${
                  classic
                    ? 'bg-gray-800/70 hover:bg-gray-800/90'
                    : 'bg-gray-800/30 hover:bg-gray-800/50'
                }`}
                style={{ borderColor: classic ? `${color}60` : '#37415140' }}
                onClick={() => {
                  if (classic) {
                    setExpandedRuler(isExpanded ? null : ruler.name);
                  } else {
                    onSelect(ruler);
                  }
                }}
              >
                {/* 头部 */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-bold ${classic ? 'text-lg' : 'text-base'}`} style={{ color: classic ? color : '#E2E8F0' }}>
                      {ruler.name}
                    </h4>
                    {classic && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-normal"
                        style={{ backgroundColor: `${color}20`, color: color }}
                      >
                        经典
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{ruler.period}</span>
                </div>

                <p className="text-xs text-gray-500 mb-2">{ruler.title}</p>

                {/* 经典帝王展开详情 */}
                {classic && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-300 mb-3">{ruler.bio}</p>

                    {ruler.achievements.length > 0 && (
                      <div className="mb-3">
                        <h5 className="text-xs font-bold text-gray-400 mb-1">主要成就</h5>
                        <ul className="space-y-1">
                          {ruler.achievements.map((a, j) => (
                            <li key={j} className="text-xs text-gray-300 flex items-start gap-1">
                              <span style={{ color }}>•</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {ruler.story && (
                      <div className="mb-3">
                        <h5 className="text-xs font-bold text-gray-400 mb-1">经典故事</h5>
                        <p className="text-xs text-gray-300 leading-relaxed">{ruler.story}</p>
                      </div>
                    )}

                    {ruler.legacy && (
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <h5 className="text-xs font-bold text-gray-400 mb-1">后人评价</h5>
                        <p className="text-xs text-gray-400 italic">{ruler.legacy}</p>
                      </div>
                    )}

                    <button
                      className="text-xs mt-2 hover:underline"
                      style={{ color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(ruler);
                      }}
                    >
                      查看完整详情 →
                    </button>
                  </motion.div>
                )}

                {/* 普通帝王显示简要信息 */}
                {!classic && (
                  <p className="text-xs text-gray-400 line-clamp-1">{ruler.bio}</p>
                )}

                {/* 经典帝王未展开时的提示 */}
                {classic && !isExpanded && (
                  <p className="text-xs mt-1" style={{ color: `${color}90` }}>
                    点击展开详情 ↓
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

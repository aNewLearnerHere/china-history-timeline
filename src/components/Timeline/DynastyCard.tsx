import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Dynasty } from '../../data/types';

interface Props {
  dynasty: Dynasty;
  index: number;
}

export default function DynastyCard({ dynasty, index }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${dynasty.color}40` }}
      onClick={() => navigate(`/dynasty/${dynasty.id}`)}
      className="relative cursor-pointer rounded-xl p-6 border-l-4 transition-shadow duration-300"
      style={{
        borderColor: dynasty.color,
        backgroundColor: '#1E293B',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold" style={{ color: dynasty.color }}>
          {dynasty.name}
        </h3>
        <span className="text-sm text-gray-400">{dynasty.period}</span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
        {dynasty.summary}
      </p>
      <div className="mt-3 flex gap-2 text-xs text-gray-500">
        <span>🏛 {dynasty.capital.split('（')[0]}</span>
        <span>·</span>
        <span>👑 {dynasty.rulers.length}位帝王</span>
        <span>·</span>
        <span>📖 {dynasty.stories.length}个故事</span>
      </div>
    </motion.div>
  );
}

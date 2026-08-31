import { motion } from 'framer-motion';
import { dynasties } from '../../data/dynasties';
import DynastyCard from './DynastyCard';

export default function Timeline() {
  return (
    <div className="min-h-screen py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-4"
        style={{ color: '#F59E0B' }}
      >
        中国历史长河
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-gray-400 mb-12"
      >
        从远古到现代，纵览五千年文明
      </motion.p>

      <div className="max-w-2xl mx-auto relative">
        {/* 时间轴线 */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-600 via-red-600 to-blue-600 opacity-30" />

        <div className="space-y-6">
          {dynasties.map((dynasty, index) => (
            <div key={dynasty.id} className="relative pl-14">
              {/* 时间节点圆点 */}
              <div
                className="absolute left-4 top-6 w-5 h-5 rounded-full border-2 border-gray-700 z-10"
                style={{ backgroundColor: dynasty.color }}
              />
              <DynastyCard dynasty={dynasty} index={index} />
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-sm mt-8 pb-8"
        >
          更多朝代持续补充中...
        </motion.div>
      </div>
    </div>
  );
}

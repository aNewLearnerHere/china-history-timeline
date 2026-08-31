// 数据类型定义

export interface Figure {
  name: string;
  title: string;           // 如"兵仙"、"诗仙"
  period: string;          // 生卒年或朝代
  portrait?: string;       // 头像（后续AI生成）
  bio: string;             // 简介
  achievements?: string[];  // 主要成就
  story?: string;          // 经典故事（帝王详写）
  legacy?: string;         // 后人评价
  isClassic?: boolean;     // 是否为经典君主
}

export interface Story {
  title: string;
  period: string;          // 故事发生时间
  cover?: string;
  summary: string;         // 故事梗概
  characters: string[];    // 涉及人物
  moral?: string;          // 寓意
  source?: string;         // 出处
}

export interface CultureItem {
  name: string;
  category: '科技' | '文学' | '思想' | '艺术' | '建筑' | '制度';
  description: string;
  figures?: string[];      // 相关人物
}

export interface Dynasty {
  id: string;
  name: string;
  period: string;          // 朝代起止时间
  capital: string;         // 都城
  founder: string;         // 开国者
  color: string;           // 主题色
  summary: string;         // 朝代概要
  rulers: Figure[];        // 帝王
  generals: Figure[];      // 名将
  ministers: Figure[];     // 名臣
  thinkers: Figure[];      // 思想家
  writers: Figure[];       // 文人
  stories: Story[];        // 经典故事
  culture: CultureItem[];  // 文化科技
}

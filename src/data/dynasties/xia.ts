import type { Dynasty } from '../types';
export const xia: Dynasty = {
  id: 'xia',
  name: '夏',
  period: '约前2070年 - 约前1600年',
  color: '#6B8E23',
  summary: '中国历史上第一个世袭制王朝，标志着从部落联盟向国家形态的转变。大禹治水划定九州，其子启继位开创"家天下"，建立了王位世袭制度。',
  capital: '阳城（今河南登封）',
  founder: '禹',
  
  rulers: [
    {
      name: '禹',
      title: '夏禹',
      period: '约前2070-前2026年在位',
      bio: '姒姓，名文命，字密，号禹。黄帝之孙，颛顼之曾孙。受舜禅让继位，后因治水有功被尊为"大禹"。',
      achievements: ['治理洪水十三年，三过家门而不入', '划定九州，奠定中国行政区划基础', '铸造九鼎，象征天下统一'],
      story: '大禹治水，疏通河道，改堵为疏，历时十三年终于平息水患。',
      legacy: '被尊为"大禹"，后世治水者的精神偶像，儒家推崇的圣王典范。'
    },
    {
      name: '启',
      title: '夏启',
      period: '约前2026-前2005年在位',
      bio: '禹之子，打破禅让制，开创王位世袭制。',
      achievements: ['建立夏朝世袭制度', '巩固国家政权，平定有扈氏叛乱'],
      story: '启继位后，有扈氏不服，启率军在甘誓师，最终击败有扈氏，确立世袭制。',
      legacy: '"家天下"的开创者，中国王位世袭制度的奠基人。'
    },
    { name: '太康', title: '夏太康', period: '约前2005-前1997年在位', bio: '启之子，荒于田猎，被后羿夺取政权，史称"太康失国"。', achievements: [] },
    { name: '仲康', title: '夏仲康', period: '约前1997-前1903年在位', bio: '太康之弟，后羿立以为王，在位时发生日食。', achievements: [] },
    { name: '相', title: '夏相', period: '约前1903-前1875年在位', bio: '仲康之子，被后羿之臣寒浞所杀。', achievements: [] },
    {
      name: '少康',
      title: '夏少康',
      period: '约前1875-前1853年在位',
      bio: '相之子，流亡后复兴夏朝，史称"少康中兴"。',
      achievements: ['消灭寒浞，复兴夏朝', '恢复夏朝统治，发展农业'],
      story: '少康为遗腹子，母亲逃至有仍氏生下他。少康长大后，联合夏朝旧部，消灭寒浞，重建夏朝。',
      legacy: '"少康中兴"成为中国历史上中兴之主的第一典范。'
    },
    { name: '杼', title: '夏杼', period: '约前1853-前1840年在位', bio: '少康之子，继续征伐东夷，夏朝走向强盛。', achievements: [] },
    { name: '槐', title: '夏槐', period: '约前1840-前1820年在位', bio: '杼之子，夏朝继续稳定发展。', achievements: [] },
    { name: '芒', title: '夏芒', period: '约前1820-前1800年在位', bio: '槐之子，在位时东夷来朝。', achievements: [] },
    { name: '泄', title: '夏泄', period: '约前1800-前1780年在位', bio: '芒之子，在位时国势平稳。', achievements: [] },
    { name: '不降', title: '夏不降', period: '约前1780-前1720年在位', bio: '泄之子，在位时间较长，国势安定。', achievements: [] },
    { name: '扃', title: '夏扃', period: '约前1720-前1705年在位', bio: '不降之弟，继位为王。', achievements: [] },
    { name: '廑', title: '夏廑', period: '约前1705-前1695年在位', bio: '扃之子，在位时夏朝渐衰。', achievements: [] },
    {
      name: '孔甲',
      title: '夏孔甲',
      period: '约前1695-前1675年在位',
      bio: '不降之子，好鬼神，荒淫无度，夏朝从此衰落。',
      achievements: ['传说饲养天降之龙'],
      story: '孔甲喜好鬼神，荒淫失德。天帝赐其雌雄二龙，孔甲不会饲养，最终龙死。诸侯闻之，对夏朝愈发离心。',
      legacy: '孔甲之后"诸侯叛之"，夏朝开始走向衰落。'
    },
    { name: '皋', title: '夏皋', period: '约前1675-前1660年在位', bio: '孔甲之子，夏朝继续衰落。', achievements: [] },
    { name: '发', title: '夏发', period: '约前1660-前1640年在位', bio: '皋之子，在位时各方国逐渐不来朝见。', achievements: [] },
    { name: '履癸', title: '夏桀', period: '约前1640-前1600年在位', bio: '夏朝末代君主，暴虐荒淫，被商汤所灭。', achievements: [] }
  ],
  
  generals: [
    {
      name: '后羿',
      title: '有穷氏首领',
      period: '夏朝中期',
      bio: '东夷族有穷氏首领，善射。',
      achievements: ['趁太康荒政，夺取夏朝政权', '善射箭术，传说能射九日']
    }
  ],
  
  ministers: [
    {
      name: '伯益',
      title: '大禹助手',
      period: '夏初',
      bio: '嬴姓，助禹治水有功。',
      achievements: ['协助大禹治水', '教导百姓耕作']
    }
  ],
  
  thinkers: [],
  
  writers: [],
  
  stories: [
    {
      title: '大禹治水',
      period: '夏朝建立前',
      summary: '上古时期洪水泛滥，鲧治水九年不成被杀。其子禹继任，改堵为疏，历时十三年，三过家门而不入，终于平息水患。',
      characters: ['禹', '舜'],
      moral: '坚持不懈、公而忘私的精神',
      source: '《史记·夏本纪》'
    },
    {
      title: '启继天下',
      period: '约前2026年',
      summary: '禹死后，伯益按照禅让传统让位于启。启得到诸侯拥戴，但有扈氏不服。启率军讨伐，在甘之战中击败有扈氏，正式确立世袭制。',
      characters: ['启', '伯益', '有扈氏'],
      moral: '从禅让到世袭的历史转折',
      source: '《史记·夏本纪》'
    }
  ],
  
  culture: [
    {
      name: '二里头文化',
      category: '科技',
      description: '夏朝中晚期文化遗存，发现宫殿遗址、青铜器、玉器等，证明已具备国家形态。',
    },
    {
      name: '夏历',
      category: '科技',
      description: '中国最早的历法之一，以正月为岁首，对后世农历影响深远。',
    },
    {
      name: '九鼎',
      category: '艺术',
      description: '大禹铸九鼎，象征九州，成为王权象征。',
    }
  ]
};

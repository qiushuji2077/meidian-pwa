const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => `¥${(+n).toFixed(1).replace(/\.0$/, '')}`;
const pick = a => a[Math.floor(Math.random() * a.length)];
const vibrate = ms => navigator.vibrate?.(ms);
const img = id => `./images/${id}.webp`;
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const DRIVERS = [
  { name: '刘师傅', plate: '沪A·**291', avatar: './images/riders/rider-01.webp',
    msgs: ['店里还在装袋，我在门口等', '前面红灯有点久', '已经到小区门口了'] },
  { name: '阿杰', plate: '粤B·**620', avatar: './images/riders/rider-02.webp',
    msgs: ['取到了，先绕开施工路段', '你这栋楼电梯有点慢', '放门口了，袋子我压了一下'] },
  { name: '周姐', plate: '京C·**183', avatar: './images/riders/rider-03.webp',
    msgs: ['出餐了，我骑过去', '小区门禁刷不上，稍等', '放到门口了，注意拿'] },
  { name: '老陈', plate: '浙A·**447', avatar: './images/riders/rider-04.webp',
    msgs: ['商家说还差两分钟', '这条路今晚车多', '到了，我按了门铃没人应'] },
  { name: '小南', plate: '苏A·**902', avatar: './images/riders/rider-05.webp',
    msgs: ['拿到了，汤没洒', '雨有点大，我开慢点', '到了，放在地毯边上'] },
  { name: '阿凯', plate: '川A·**118', avatar: './images/riders/rider-06.webp',
    msgs: ['刚出锅，有点烫手', '导航绕了一圈', '到门口了，我先不敲门'] },
  { name: '林哥', plate: '湘A·**773', avatar: './images/riders/rider-07.webp',
    msgs: ['接单了，他们还在炒', '过高架了', '到了，放门口右侧'] },
  { name: '阿敏', plate: '闽D·**556', avatar: './images/riders/rider-08.webp',
    msgs: ['我到店了，还在等', '前面堵了一下', '送到了，你看下'] },
  { name: '小何', plate: '鄂A·**330', avatar: './images/riders/rider-09.webp',
    msgs: ['好了，我出发', '风有点大', '到了哈'] },
  { name: '张叔', plate: '鲁B·**841', avatar: './images/riders/rider-10.webp',
    msgs: ['出餐慢了一点', '已经进小区了', '放门口了'] },
];

const items = [
  { id: 'mala', name: '招牌麻辣烫 · 自由选', shop: '椒麻事务所', desc: '红油底料 · 芝麻酱 · 脆豆皮 · 宽粉加量', price: 42, orig: 58, cat: 'spicy', focal: '50% 48%', rating: 4.8, monthly: 428, minutes: 25, dist: '1.1km', promo: false },
  { id: 'bbq', name: '炭烤羊肉串 ×12', shop: '夜航烧烤', desc: '现烤 · 孜然辣椒 · 送烤茄子', price: 36, orig: 48, cat: 'grill', focal: '50% 62%', rating: 4.9, monthly: 1204, minutes: 28, dist: '0.8km', promo: true, deal: '夜宵榜' },
  { id: 'lobster', name: '蒜蓉小龙虾 中份', shop: '红壳夜市', desc: '约 4 斤 · 蒜蓉 / 麻辣可选', price: 88, orig: 128, cat: 'seafood', focal: '50% 52%', rating: 4.7, monthly: 356, minutes: 35, dist: '1.6km', promo: true, deal: '直降 40' },
  { id: 'luosifen', name: '柳州螺蛳粉加大', shop: '酸笋巷', desc: '酸笋 · 花生 · 腐竹 · 爆辣可选', price: 26, orig: 35, cat: 'noodles', focal: '48% 50%', rating: 4.7, monthly: 890, minutes: 22, dist: '1.0km', promo: false },
  { id: 'fried', name: '脆皮炸鸡双拼桶', shop: '十二点半炸鸡', desc: '现炸脆皮 · 蜂蜜芥末 · 送冰可乐', price: 49.9, orig: 69, cat: 'fried', focal: '50% 44%', rating: 4.8, monthly: 892, minutes: 20, dist: '1.2km', promo: true, deal: '夜宵特惠' },
  { id: 'kchicken', name: '韩式芝士炸鸡', shop: '双层脆皮', desc: '双层脆皮 · 芝士酱 · 甜辣酱', price: 52, orig: 72, cat: 'fried', focal: '50% 46%', rating: 4.8, monthly: 560, minutes: 24, dist: '1.3km', promo: false },
  { id: 'burger', name: '双层芝士牛肉堡套餐', shop: '北巷堡', desc: '两层牛肉 · 融化芝士 · 薯条可乐', price: 38, orig: 52, cat: 'western', focal: '50% 42%', rating: 4.6, monthly: 412, minutes: 22, dist: '1.2km', promo: false },
  { id: 'burger2', name: '培根芝士厚牛堡', shop: '灯塔美式', desc: '厚切培根 · 双层芝士 · 秘制酱', price: 35, orig: 48, cat: 'western', focal: '50% 40%', rating: 4.5, monthly: 312, minutes: 23, dist: '1.4km', promo: false },
  { id: 'pizza', name: '榴莲芝士披萨 9寸', shop: '薄边窑', desc: '金枕榴莲 · 马苏里拉 · 薄脆边', price: 58, orig: 78, cat: 'western', focal: '50% 50%', rating: 4.6, monthly: 278, minutes: 30, dist: '1.8km', promo: true, deal: '立减 20' },
  { id: 'pizza2', name: '意式番茄肉肠披萨', shop: '夜炉', desc: '萨拉米 · 罗勒 · 莫扎里拉', price: 48, orig: 68, cat: 'western', focal: '50% 48%', rating: 4.7, monthly: 241, minutes: 28, dist: '1.5km', promo: false },
  { id: 'ramen', name: '浓汤豚骨拉面加蛋', shop: '骨汤铺', desc: '12 小时熬汤 · 叉烧 · 溏心蛋', price: 45, orig: 56, cat: 'noodles', focal: '50% 55%', rating: 4.8, monthly: 633, minutes: 25, dist: '0.9km', promo: false },
  { id: 'xiaomian', name: '重庆小面 · 红油豌杂', shop: '山城廿四', desc: '豌杂 · 花生碎 · 葱花 · 可调辣', price: 18, orig: 25, cat: 'noodles', focal: '50% 50%', rating: 4.9, monthly: 2104, minutes: 18, dist: '0.7km', promo: false },
  { id: 'pho', name: '越南牛肉粉', shop: '南风粉店', desc: '清汤牛腱 · 香菜柠檬 · 河粉', price: 32, orig: 42, cat: 'noodles', focal: '50% 48%', rating: 4.6, monthly: 198, minutes: 26, dist: '1.4km', promo: false },
  { id: 'noodles', name: '红油抄手宽面', shop: '红油栈', desc: '红油 · 抄手 · 宽面 · 花生碎', price: 28, orig: 38, cat: 'spicy', focal: '50% 50%', rating: 4.7, monthly: 670, minutes: 21, dist: '1.1km', promo: false },
  { id: 'sushi', name: '三文鱼握寿司拼盘', shop: '潮汐握', desc: '冰鲜三文鱼 · 醋饭 · 芥末酱油', price: 68, orig: 88, cat: 'seafood', focal: '50% 46%', rating: 4.8, monthly: 154, minutes: 32, dist: '2.0km', promo: false },
  { id: 'hotpot', name: '一人食牛油火锅', shop: '一锅夜', desc: '毛肚 · 鸭血 · 宽粉 · 配菜随心', price: 69, orig: 99, cat: 'spicy', focal: '50% 52%', rating: 4.7, monthly: 288, minutes: 34, dist: '1.7km', promo: true, deal: '限时 7 折' },
  { id: 'maocai', name: '冒菜豪华双人份', shop: '冒沿', desc: '午餐肉 · 宽粉 · 海鲜菇 · 毛肚', price: 55, orig: 78, cat: 'spicy', focal: '50% 50%', rating: 4.7, monthly: 421, minutes: 30, dist: '1.3km', promo: false },
  { id: 'bobo', name: '钵钵鸡冷吃套餐', shop: '冷锅巷', desc: '红油香料 · 鸡肉豆皮宽粉', price: 32, orig: 45, cat: 'spicy', focal: '50% 48%', rating: 4.6, monthly: 390, minutes: 20, dist: '1.0km', promo: false },
  { id: 'grilledfish', name: '香辣烤鱼 中份', shop: '江边烤', desc: '草鱼 · 豆芽宽粉 · 可选微辣特辣', price: 98, orig: 138, cat: 'grill', focal: '50% 54%', rating: 4.8, monthly: 176, minutes: 40, dist: '2.2km', promo: true, deal: '直降 40' },
  { id: 'grilled', name: '炭烤鸡翅拼盘', shop: '夜航烧烤', desc: '蜜汁 / 香辣 · 现烤出炉', price: 39, orig: 52, cat: 'grill', focal: '50% 58%', rating: 4.8, monthly: 744, minutes: 26, dist: '0.8km', promo: false },
  { id: 'claypot', name: '腊肠煲仔饭', shop: '焦饭档', desc: '腊肠 · 蛋 · 酱油焦饭', price: 34, orig: 45, cat: 'rice', focal: '50% 50%', rating: 4.7, monthly: 512, minutes: 24, dist: '1.1km', promo: false },
  { id: 'huangmenji', name: '黄焖鸡米饭加大', shop: '砂锅巷', desc: '鸡肉土豆 · 青椒 · 香菇 · 米饭', price: 28, orig: 36, cat: 'rice', focal: '50% 50%', rating: 4.6, monthly: 980, minutes: 22, dist: '0.9km', promo: false },
  { id: 'friedrice', name: '扬州炒饭加大', shop: '老灶炒饭', desc: '粒粒分明 · 虾仁火腿', price: 24, orig: 32, cat: 'rice', focal: '50% 48%', rating: 4.5, monthly: 640, minutes: 18, dist: '0.8km', promo: false },
  { id: 'xiaolongbao', name: '鲜肉小笼包 12 个', shop: '汤皮铺', desc: '皮薄汤多 · 醋姜同送', price: 26, orig: 35, cat: 'dimsum', focal: '50% 46%', rating: 4.8, monthly: 733, minutes: 20, dist: '1.2km', promo: false },
  { id: 'buns', name: '流沙奶黄包 6 个', shop: '早茶夜档', desc: '现蒸 · 流心奶黄', price: 28, orig: 36, cat: 'dimsum', focal: '50% 48%', rating: 4.6, monthly: 210, minutes: 22, dist: '1.5km', promo: false },
  { id: 'roujiamo', name: '腊汁肉夹馍 ×2', shop: '白吉馍', desc: '酥脆白吉馍 · 腊汁猪肉', price: 22, orig: 30, cat: 'snack', focal: '50% 50%', rating: 4.7, monthly: 458, minutes: 19, dist: '1.0km', promo: false },
  { id: 'jianbing', name: '鸡蛋煎饼果子', shop: '街口摊', desc: '薄脆 · 香菜 · 甜面酱 · 辣椒', price: 12, orig: 16, cat: 'snack', focal: '50% 50%', rating: 4.6, monthly: 1102, minutes: 16, dist: '0.6km', promo: false },
  { id: 'colawings', name: '可乐鸡翅 8 只', shop: '家常夜厨', desc: '可乐卤香 · 软烂入味', price: 29, orig: 39, cat: 'rice', focal: '50% 48%', rating: 4.5, monthly: 367, minutes: 24, dist: '1.3km', promo: true, deal: '今晚减 10' },
  { id: 'ducknack', name: '麻辣鸭脖礼盒', shop: '卤口', desc: '真空锁鲜 · 微辣 / 特辣', price: 35, orig: 48, cat: 'snack', focal: '50% 50%', rating: 4.6, monthly: 529, minutes: 18, dist: '0.9km', promo: false },
  { id: 'stinkytofu', name: '油炸臭豆腐', shop: '南门口夜摊', desc: '外酥内嫩 · 特制浇汁', price: 15, orig: 20, cat: 'snack', focal: '50% 50%', rating: 4.4, monthly: 808, minutes: 17, dist: '0.7km', promo: false },
  { id: 'chicken', name: '香辣鸡腿堡套餐', shop: '十二点半炸鸡', desc: '鸡腿堡 · 薯条 · 可乐', price: 29.9, orig: 42, cat: 'fried', focal: '50% 44%', rating: 4.5, monthly: 1208, minutes: 18, dist: '1.1km', promo: true, deal: '超值套餐' },
  { id: 'ribs', name: '蜜汁烤肋排', shop: '烟熏室', desc: '慢烤 4 小时 · 蜂蜜焦糖', price: 78, orig: 108, cat: 'grill', focal: '50% 52%', rating: 4.7, monthly: 143, minutes: 36, dist: '2.1km', promo: true, deal: '立减 30' },
  { id: 'steak', name: '黑椒菲力牛排', shop: '夜厨西餐', desc: '五分熟 · 黑椒汁 · 配时蔬', price: 68, orig: 98, cat: 'western', focal: '50% 46%', rating: 4.6, monthly: 167, minutes: 32, dist: '1.9km', promo: false },
  { id: 'shrimp', name: '黄油蒜蓉虾', shop: '海风档', desc: '鲜虾 · 黄油蒜蓉 · 法棍', price: 58, orig: 78, cat: 'seafood', focal: '50% 50%', rating: 4.7, monthly: 201, minutes: 28, dist: '1.6km', promo: false },
  { id: 'pasta', name: '奶油培根意面', shop: '灯塔美式', desc: '厚切培根 · 帕玛森 · 黑胡椒', price: 42, orig: 56, cat: 'western', focal: '50% 48%', rating: 4.6, monthly: 255, minutes: 24, dist: '1.4km', promo: false },
  { id: 'curry', name: '日式咖喱猪排饭', shop: '一番夜食', desc: '炸猪排 · 浓郁咖喱 · 福神渍', price: 36, orig: 48, cat: 'rice', focal: '50% 50%', rating: 4.6, monthly: 344, minutes: 23, dist: '1.2km', promo: false },
  { id: 'tacos', name: '炸鸡芝士塔可', shop: '北巷堡', desc: '脆壳 · 鸡柳 · 芝士酱', price: 29, orig: 39, cat: 'western', focal: '50% 48%', rating: 4.4, monthly: 188, minutes: 21, dist: '1.3km', promo: false },
  { id: 'fries', name: '芝士炸薯条大份', shop: '灯塔美式', desc: '拉丝芝士 · 番茄酱蜂蜜芥末', price: 18, orig: 25, cat: 'fried', focal: '50% 50%', rating: 4.5, monthly: 701, minutes: 16, dist: '1.2km', promo: false },
  { id: 'oden', name: '关东煮暖心套餐', shop: '二十四小时柜', desc: '萝卜 · 福袋 · 魔芋 · 鱼丸', price: 22, orig: 28, cat: 'snack', focal: '50% 52%', rating: 4.6, monthly: 456, minutes: 15, dist: '0.5km', promo: false },
  { id: 'onigiri', name: '金枪鱼饭团 ×2', shop: '二十四小时柜', desc: '微波 30 秒 · 海苔香', price: 14, orig: 18, cat: 'snack', focal: '50% 48%', rating: 4.4, monthly: 812, minutes: 14, dist: '0.5km', promo: false },
  { id: 'tea', name: '黑糖波波鲜奶 大杯', shop: '糖水铺', desc: '少冰 · 七分甜 · 双份波波', price: 16, orig: 23, cat: 'drink', focal: '50% 40%', rating: 4.8, monthly: 1502, minutes: 15, dist: '0.6km', promo: true, deal: '第二杯半价' },
  { id: 'boba', name: '黑糖珍珠鲜奶', shop: '炒糖', desc: '手炒黑糖 · Q 弹珍珠', price: 18, orig: 25, cat: 'drink', focal: '50% 42%', rating: 4.7, monthly: 966, minutes: 16, dist: '0.7km', promo: false },
  { id: 'matcha', name: '抹茶生椰拿铁', shop: '绿雾', desc: '宇治抹茶 · 厚椰乳 · 奶盖', price: 22, orig: 29, cat: 'drink', focal: '50% 40%', rating: 4.6, monthly: 388, minutes: 17, dist: '0.8km', promo: false },
  { id: 'lemon', name: '手打柠檬茶', shop: '酸柠', desc: '鲜柠 · 香水柠檬 · 微糖', price: 15, orig: 22, cat: 'drink', focal: '50% 42%', rating: 4.6, monthly: 720, minutes: 14, dist: '0.6km', promo: false },
  { id: 'coffee', name: '冰美式大杯', shop: '夜班咖啡', desc: '深度烘焙 · 少冰 · 可加糖', price: 9.9, orig: 18, cat: 'drink', focal: '50% 42%', rating: 4.5, monthly: 2301, minutes: 12, dist: '0.4km', promo: true, deal: '咖啡补贴' },
  { id: 'cake', name: '海盐巧克力蛋糕', shop: '午夜烘焙', desc: '浓巧 · 海盐焦糖 · 冷藏更佳', price: 28, orig: 39, cat: 'sweet', focal: '50% 48%', rating: 4.8, monthly: 214, minutes: 20, dist: '1.1km', promo: false },
  { id: 'cookie', name: '纽约软曲奇 ×3', shop: '烤箱刚出', desc: '巧克力流心 · 温热更好吃', price: 22, orig: 30, cat: 'sweet', focal: '50% 50%', rating: 4.7, monthly: 301, minutes: 18, dist: '1.0km', promo: false },
  { id: 'ice', name: '香草脆筒冰淇淋', shop: '冰柜', desc: '香草软冰 · 脆筒 · 巧克力酱', price: 15, orig: 22, cat: 'sweet', focal: '50% 50%', rating: 4.5, monthly: 544, minutes: 14, dist: '0.6km', promo: false },
  { id: 'dessert', name: '提拉米苏杯', shop: '甜品研究所', desc: '马斯卡彭 · 咖啡酒渍手指饼', price: 26, orig: 36, cat: 'sweet', focal: '50% 48%', rating: 4.6, monthly: 177, minutes: 22, dist: '1.3km', promo: false },
  { id: 'chips', name: '蜂蜜黄油薯片大罐', shop: '二十四小时柜', desc: '进口 · 咔嚓停不下来', price: 12.9, orig: 18, cat: 'snack', focal: '50% 50%', rating: 4.4, monthly: 1904, minutes: 13, dist: '0.5km', promo: false },
  { id: 'beer', name: '精酿 IPA 330ml ×2', shop: '酒花纪', desc: '果香型 · 冰镇更佳', price: 36, orig: 48, cat: 'drink', focal: '50% 48%', rating: 4.5, monthly: 266, minutes: 16, dist: '0.7km', promo: false },
  { id: 'salad', name: '牛油果鸡胸沙拉', shop: '轻食计划', desc: '油醋汁 · 牛油果 · 鸡胸', price: 32, orig: 42, cat: 'western', focal: '50% 48%', rating: 4.3, monthly: 149, minutes: 20, dist: '1.2km', promo: false },
  { id: 'brunch', name: '全套美式早午餐', shop: '夜厨西餐', desc: '炒蛋 · 培根 · 松饼 · 薯饼', price: 48, orig: 68, cat: 'western', focal: '50% 46%', rating: 4.5, monthly: 132, minutes: 28, dist: '1.8km', promo: true, deal: '套餐立减' },
  { id: 'feast', name: '深夜大盘分享餐', shop: '派对外卖', desc: '炸物拼盘 · 蘸酱齐全', price: 128, orig: 168, cat: 'fried', focal: '50% 48%', rating: 4.6, monthly: 98, minutes: 38, dist: '2.0km', promo: true, deal: '直降 40' },
];
items.forEach(x => { x.img = img(x.id); });

const WINDOW = 9;
const HALF = 4;

const state = {
  page: 'feed',
  cart: JSON.parse(localStorage.getItem('meidian-cart') || '[]'),
  orders: JSON.parse(localStorage.getItem('meidian-orders') || '[]'),
  activeOrder: JSON.parse(localStorage.getItem('meidian-active') || 'null'),
  moods: JSON.parse(localStorage.getItem('meidian-moods') || '[]'),
  hasRevealed: localStorage.getItem('meidian-revealed') === '1',
  playlist: [],
  seenRound: new Set(),
  round: 0,
  logical: 0,
  dwellCount: 0,
  stay: {},
  stayStart: 0,
  stayCat: null,
  shownCta: new Set(),
  dwellTimers: {},
  deliveryTimers: [],
  mapRaf: 0,
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function byId(id) { return items.find(x => x.id === id); }

function nextItemId() {
  let pool = items.filter(x => !state.seenRound.has(x.id));
  if (!pool.length) {
    state.seenRound.clear();
    state.round++;
    pool = [...items];
  }
  if (state.round > 0) {
    const weights = pool.map(x => 1 + (state.stay[x.cat] || 0) / 8000);
    const sum = weights.reduce((s, n) => s + n, 0);
    let r = Math.random() * sum;
    for (let i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        state.seenRound.add(pool[i].id);
        return pool[i].id;
      }
    }
  }
  const id = pick(pool).id;
  state.seenRound.add(id);
  return id;
}

function ensureAhead() {
  while (state.playlist.length < state.logical + HALF + 2) {
    state.playlist.push(nextItemId());
  }
}

function save() {
  localStorage.setItem('meidian-orders', JSON.stringify(state.orders));
  localStorage.setItem('meidian-active', JSON.stringify(state.activeOrder));
  localStorage.setItem('meidian-cart', JSON.stringify(state.cart.map(x => ({
    id: x.id, name: x.name, price: x.price, orig: x.orig, qty: x.qty, img: x.img, shop: x.shop,
  }))));
  localStorage.setItem('meidian-moods', JSON.stringify(state.moods));
  if (state.hasRevealed) localStorage.setItem('meidian-revealed', '1');
}

function cartCount() { return state.cart.reduce((s, x) => s + x.qty, 0); }
function cartTotal() { return state.cart.reduce((s, x) => s + x.price * x.qty, 0); }

function orderAmount(o) { return o.orderAmount ?? o.total ?? 0; }
function totalKept() {
  return state.orders.filter(o => o.done).reduce((s, o) => s + orderAmount(o), 0);
}

function showToast(text) {
  const host = $('#toast-host');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  host.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

function etaLeft(o) {
  if (!o || o.done) return 0;
  const total = o.etaMs || o.eta * 60 * 1000;
  return Math.max(0, total - (Date.now() - (o.startedAt || 0)));
}

function islandHTML() {
  const o = state.activeOrder;
  if (!o || o.revealed) return '';
  const done = o.done || etaLeft(o) <= 0;
  const mins = Math.max(1, Math.ceil(etaLeft(o) / 60000));
  return `<button class="island ${done ? 'done' : ''}" id="islandBtn" type="button">
    <img src="${o.driver.avatar}" alt="">
    <span>${done ? '已送达' : `${o.driver.name}还有 <b class="eta" id="islandEta">${mins}</b> 分钟`}</span>
  </button>`;
}

function topbar() {
  return `<div class="topbar">
    <div class="brand">美<em>点</em></div>
    ${state.page === 'feed' ? islandHTML() : ''}
    <div class="tabs">
      <button data-page="feed" class="${state.page === 'feed' ? 'on' : ''}">推荐</button>
      <button data-page="orders" class="${state.page === 'orders' ? 'on' : ''}">订单</button>
    </div>
  </div>`;
}

function itemMeta(item) {
  return `★ ${item.rating} · 月售 ${item.monthly} · ${item.minutes}分钟 · ${item.dist} · 配送¥0`;
}

function slideHTML(item, idx) {
  return `<section class="slide" data-id="${item.id}" data-idx="${idx}">
    <div class="pic-ph"></div>
    <img class="bg" src="${item.img}" alt="" style="object-position:${item.focal || '50% 50%'}"
      loading="${idx < 2 ? 'eager' : 'lazy'}" decoding="async"
      onload="this.classList.add('ready')" onerror="this.classList.add('err')">
    <div class="veil"></div>
    ${idx === 0 ? '<div class="hint-swipe" id="swipeHint">上滑看更多</div>' : ''}
    <div class="slide-body ${state.cart.length ? 'lift' : ''}">
      <div class="shop"><span class="live"></span>${item.shop} · ${item.minutes}分钟</div>
      <h2 class="name">${item.name}</h2>
      <p class="desc">${item.desc}</p>
      <div class="cta" id="cta-${idx}">
        <div class="price-row">
          <span class="price-now"><small>¥</small>${item.price % 1 ? item.price.toFixed(1) : item.price}</span>
          ${item.orig > item.price ? `<span class="price-old">${money(item.orig)}</span>` : ''}
          ${item.promo && item.deal ? `<span class="deal">${item.deal}</span>` : ''}
        </div>
        <div class="meta-line">${itemMeta(item)}</div>
        <div class="cta-btns">
          <button class="btn-cart" data-cart="${item.id}">加入购物车</button>
          <button class="btn-buy" data-buy="${item.id}">立即购买</button>
        </div>
      </div>
    </div>
  </section>`;
}

function cartBarHTML() {
  if (!state.cart.length || state.page !== 'feed') return '';
  const last = state.cart[state.cart.length - 1];
  const n = cartCount();
  return `<div class="cartbar" id="cartbar">
    <img src="${last.img}" alt="">
    <div class="sum">${money(cartTotal())}<small>${n} 件 · 去结算</small></div>
    <button type="button" id="openCart">去结算</button>
  </div>`;
}

function dwellMs() {
  if (reduce()) return 0;
  if (state.dwellCount === 0) return 1200;
  return Math.max(500, 1050 - state.dwellCount * 90);
}

function observeFeed() {
  const feed = $('#feed');
  if (!feed) return;
  state._feedIO?.disconnect();
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const slide = entry.target;
      const idx = slide.dataset.idx;
      const id = slide.dataset.id;
      if (!id) return;
      if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
        if (state.shownCta.has(idx)) {
          $(`#cta-${idx}`)?.classList.add('show');
          return;
        }
        clearTimeout(state.dwellTimers[idx]);
        state.dwellTimers[idx] = setTimeout(() => {
          const cta = $(`#cta-${idx}`);
          if (cta) {
            cta.classList.add('show');
            state.shownCta.add(idx);
            state.dwellCount++;
            vibrate(8);
          }
          $('#swipeHint')?.classList.add('hide');
        }, dwellMs());
        const item = byId(id);
        if (state.stayCat && state.stayStart) {
          const dt = Date.now() - state.stayStart;
          state.stay[state.stayCat] = (state.stay[state.stayCat] || 0) + dt;
        }
        state.stayCat = item?.cat;
        state.stayStart = Date.now();
      } else {
        clearTimeout(state.dwellTimers[idx]);
      }
    });
  }, { root: feed, threshold: [0.65, 0.85] });

  $$('.slide').forEach(s => io.observe(s));
  state._feedIO = io;

  let t = 0;
  feed.onscroll = () => {
    clearTimeout(t);
    t = setTimeout(onFeedSnap, 80);
  };
}

function onFeedSnap() {
  const feed = $('#feed');
  if (!feed || state._snapping) return;
  const h = feed.clientHeight || 1;
  const vis = Math.round(feed.scrollTop / h);
  const start = Math.max(0, state.logical - HALF);
  const next = start + vis;
  if (next !== state.logical) {
    state.logical = Math.max(0, next);
    paintFeedWindow();
  }
}

function paintFeedWindow() {
  ensureAhead();
  const feed = $('#feed');
  if (!feed) return;
  const start = Math.max(0, state.logical - HALF);
  const slice = [];
  for (let i = start; i < start + WINDOW; i++) {
    ensureAhead();
    const id = state.playlist[i];
    if (!id) continue;
    slice.push({ item: byId(id), idx: i });
  }
  const h = feed.clientHeight;
  state._snapping = true;
  feed.innerHTML = slice.map(s => slideHTML(s.item, s.idx)).join('');
  bindFeedBtns();
  observeFeed();
  feed.scrollTop = (state.logical - start) * h;
  requestAnimationFrame(() => { state._snapping = false; });
}

function feedPage() {
  ensureAhead();
  const start = Math.max(0, state.logical - HALF);
  const slice = [];
  for (let i = start; i < start + WINDOW; i++) {
    ensureAhead();
    const id = state.playlist[i];
    if (id) slice.push({ item: byId(id), idx: i });
  }
  return `${topbar()}<div class="feed" id="feed">${slice.map(s => slideHTML(s.item, s.idx)).join('')}</div>${cartBarHTML()}`;
}

function ordersPage() {
  const kept = totalKept();
  const n = state.orders.filter(o => o.done).length;
  return `${topbar()}<div class="page">
    <div class="kept-banner">
      <div class="label">${state.hasRevealed ? '留下' : '累计订单'}</div>
      <div class="num">${money(kept)}</div>
      <div class="tri-mini">
        <div><span>模拟订单</span><b>${money(kept)}</b></div>
        <div><span>实际支付</span><b>¥0</b></div>
        <div><span>完成</span><b>${n} 笔</b></div>
      </div>
    </div>
    <div class="orders">${state.orders.length ? state.orders.map(o => {
      const amt = orderAmount(o);
      const revealed = state.hasRevealed || o.revealed;
      return `<div class="order-card">
        <div class="topline">
          <b>${o.items[0]?.name || '订单'}${o.items.length > 1 ? ` 等${o.items.length}件` : ''}</b>
          <b>${revealed ? money(amt) : money(amt)}</b>
        </div>
        <div class="tiny" style="margin-top:7px">
          ${new Date(o.time).toLocaleString('zh-CN')} · ${o.done ? (o.revealed ? '已送达' : '已送达') : '配送中'}
          ${revealed ? ` · 模拟 ${money(amt)} · 实际支付 ¥0` : ''}
        </div>
      </div>`;
    }).join('') : `<div class="empty"><b>暂无订单</b>上滑挑点好吃的吧</div>`}
    </div>
  </div>`;
}

function addToCart(id) {
  const x = byId(id);
  if (!x) return;
  const c = state.cart.find(i => i.id === id);
  if (c) c.qty++; else state.cart.push({ ...x, qty: 1 });
  save();
  vibrate(15);
  showToast(`已加入购物车 · ${x.name}`);
  refreshCartBar();
}

function bindSheet(overlay) {
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  const sheet = overlay.querySelector('.sheet');
  if (!sheet) return;
  const ac = new AbortController();
  const sig = { signal: ac.signal };
  let startY = 0, lastT = 0, dy = 0, dragging = false;
  const handle = sheet.querySelector('.handle') || sheet;
  const onDown = e => {
    dragging = true;
    startY = (e.touches ? e.touches[0].clientY : e.clientY);
    lastT = Date.now(); dy = 0;
    sheet.style.transition = 'none';
  };
  const onMove = e => {
    if (!dragging) return;
    const y = (e.touches ? e.touches[0].clientY : e.clientY);
    dy = Math.max(0, y - startY);
    lastT = Date.now();
    sheet.style.transform = `translateY(${dy}px)`;
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    const vel = dy / Math.max(1, Date.now() - lastT + 16);
    sheet.style.transition = 'transform .28s cubic-bezier(.2,.9,.2,1)';
    if (dy > 110 || vel > 0.55) {
      sheet.style.transform = 'translateY(110%)';
      setTimeout(() => overlay.remove(), 260);
    } else {
      sheet.style.transform = 'translateY(0)';
    }
  };
  handle.addEventListener('touchstart', onDown, { passive: true, ...sig });
  handle.addEventListener('mousedown', onDown, sig);
  window.addEventListener('touchmove', onMove, { passive: true, ...sig });
  window.addEventListener('mousemove', onMove, sig);
  window.addEventListener('touchend', onUp, sig);
  window.addEventListener('mouseup', onUp, sig);
  const mo = new MutationObserver(() => {
    if (!document.body.contains(overlay)) { ac.abort(); mo.disconnect(); }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

function openCart() {
  if (!state.cart.length) { showToast('购物车还是空的'); return; }
  $('#overlay')?.remove();
  const total = cartTotal();
  const orig = state.cart.reduce((s, x) => s + x.orig * x.qty, 0);
  const promo = +(orig - total).toFixed(1);
  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay">
      <section class="sheet">
        <div class="handle"></div>
        <h3>购物车</h3>
        <div class="sub">共 ${cartCount()} 件${promo ? ` · 已优惠 ${money(promo)}` : ''}</div>
        ${state.cart.map(x => `
          <div class="cart-row">
            <img src="${x.img}" alt="" loading="lazy">
            <div class="meta"><b>${x.name}</b><span>${money(x.price)}</span></div>
            <div class="cart-qty">
              <button type="button" data-dec="${x.id}">−</button>
              <b>${x.qty}</b>
              <button type="button" data-inc="${x.id}">＋</button>
            </div>
          </div>`).join('')}
        <div class="lineitem" style="border:0;margin-top:6px"><b>合计</b><b style="color:var(--accent);font-size:18px">${money(total)}</b></div>
        <button class="primary" id="cartCheckout">去结算 · ${money(total)}</button>
        <button class="ghost" id="clearCart">清空购物车</button>
        <button class="ghost" id="close">继续逛逛</button>
      </section>
    </div>`);
  bindSheet($('#overlay'));
  $$('[data-inc]').forEach(b => b.onclick = () => {
    const c = state.cart.find(i => i.id === b.dataset.inc);
    if (c) { c.qty++; save(); openCart(); refreshCartBar(); }
  });
  $$('[data-dec]').forEach(b => b.onclick = () => {
    const c = state.cart.find(i => i.id === b.dataset.dec);
    if (!c) return;
    c.qty--;
    if (c.qty <= 0) state.cart = state.cart.filter(i => i.id !== c.id);
    save();
    if (!state.cart.length) { $('#overlay')?.remove(); refreshCartBar(); return; }
    openCart(); refreshCartBar();
  });
  $('#close').onclick = () => $('#overlay').remove();
  $('#clearCart').onclick = () => {
    state.cart = []; save(); $('#overlay').remove(); refreshCartBar();
  };
  $('#cartCheckout').onclick = () => { $('#overlay').remove(); openCheckout(); };
}

function openCheckout(presetId) {
  let list = [...state.cart];
  if (presetId) {
    const x = byId(presetId);
    if (x) list = [{ ...x, qty: 1 }];
  }
  if (!list.length) return;
  const total = list.reduce((s, x) => s + x.price * x.qty, 0);
  const orig = list.reduce((s, x) => s + x.orig * x.qty, 0);
  const promo = +(orig - total).toFixed(1);
  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay">
      <section class="sheet">
        <div class="handle"></div>
        <h3>确认订单</h3>
        <div class="sub">请核对商品与配送信息</div>
        <div class="address"><b>送到 · 家门口</b><span class="tiny">备注：放门口，勿敲门</span></div>
        ${list.map(x => `<div class="lineitem"><span>${x.name} × ${x.qty}</span><b>${money(x.price * x.qty)}</b></div>`).join('')}
        <div class="lineitem"><span>配送费</span><span style="color:var(--good)">已减免</span></div>
        ${promo ? `<div class="lineitem"><span>优惠</span><span style="color:var(--accent)">−${money(promo)}</span></div>` : ''}
        <div class="lineitem"><b>实付</b><b style="color:var(--accent);font-size:18px">${money(total)}</b></div>
        <button class="primary" id="pay">微信支付 · ${money(total)}</button>
        <button class="ghost" id="close">取消</button>
      </section>
    </div>`);
  bindSheet($('#overlay'));
  $('#close').onclick = () => $('#overlay').remove();
  $('#pay').onclick = () => {
    $('#overlay').remove();
    showPaySuccess(list, total, promo, !presetId);
  };
}

function showPaySuccess(list, total, promo, clearCart = true) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay">
      <section class="sheet">
        <div class="pay-success">
          <div class="ok">✓</div>
          <h3>支付成功</h3>
          <p>实付 ${money(total)}${promo ? ` · 优惠 ${money(promo)}` : ''}</p>
          <p class="tiny">商家已接单，正在准备中</p>
        </div>
        <button class="primary" id="track">查看配送</button>
        <button class="ghost" id="keepBrowse">继续逛逛</button>
      </section>
    </div>`);
  vibrate(24);
  const jitter = (Math.random() * 4 - 1);
  const etaMin = Math.round(14 + Math.random() * 6 + jitter);
  const order = {
    id: Date.now(),
    time: new Date().toISOString(),
    items: list.map(x => ({ id: x.id, name: x.name, price: x.price, qty: x.qty, orig: x.orig, cat: x.cat })),
    orderAmount: total,
    promoSaved: promo,
    actualPaid: 0,
    kept: total,
    total,
    saved: promo,
    driver: pick(DRIVERS),
    eta: etaMin,
    etaMs: etaMin * 60 * 1000,
    startedAt: Date.now(),
    done: false,
    revealed: false,
    status: -1,
    delayEvent: false,
  };
  const goTrack = () => {
    if (clearCart) state.cart = [];
    state.orders.unshift(order);
    state.activeOrder = order;
    save();
    $('#overlay').remove();
    renderOrder(order);
  };
  $('#track').onclick = goTrack;
  $('#keepBrowse').onclick = () => {
    if (clearCart) state.cart = [];
    state.orders.unshift(order);
    state.activeOrder = order;
    save();
    $('#overlay').remove();
    state.page = 'feed';
    render();
  };
}

function mapSVG() {
  return `<svg viewBox="0 0 520 360" aria-hidden="true">
    <rect width="520" height="360" fill="#121614"/>
    <g fill="#1a221c">
      <rect x="24" y="20" width="88" height="70" rx="4"/>
      <rect x="128" y="16" width="110" height="86" rx="4"/>
      <rect x="260" y="24" width="96" height="64" rx="4"/>
      <rect x="372" y="18" width="120" height="92" rx="4"/>
      <rect x="18" y="130" width="100" height="80" rx="4"/>
      <rect x="150" y="148" width="78" height="58" rx="4"/>
      <rect x="250" y="132" width="120" height="72" rx="4"/>
      <rect x="390" y="140" width="108" height="88" rx="4"/>
      <rect x="30" y="248" width="92" height="86" rx="4"/>
      <rect x="140" y="256" width="130" height="78" rx="4"/>
      <rect x="290" y="250" width="86" height="84" rx="4"/>
      <rect x="400" y="262" width="96" height="70" rx="4"/>
    </g>
    <g stroke="#2c3830" stroke-width="14" fill="none">
      <path d="M0 110 H520"/>
      <path d="M0 230 H520"/>
      <path d="M118 0 V360"/>
      <path d="M246 0 V360"/>
      <path d="M378 0 V360"/>
      <path d="M0 300 H200"/>
      <path d="M70 0 V360"/>
    </g>
    <g fill="#6f7c72" font-size="9" font-family="sans-serif">
      <text x="132" y="106">夜航路</text>
      <text x="260" y="226">山城街</text>
      <text x="20" y="124">廿四巷</text>
      <text x="390" y="124">江边路</text>
      <text x="152" y="294">门口里</text>
    </g>
    <path id="route" d="M 86 78 C 140 96, 168 150, 220 168 S 300 188, 348 210 S 400 250, 428 292"
      fill="none" stroke="#FF5538" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>
    <g id="storePin" transform="translate(86,78)">
      <circle r="10" fill="#1c1916" stroke="#FF5538" stroke-width="1.5"/>
      <text x="-6" y="4" fill="#fff" font-size="9">店</text>
    </g>
    <g id="homePin" transform="translate(428,292)">
      <circle r="10" fill="#1c1916" stroke="#fff" stroke-width="1.2"/>
      <text x="-6" y="4" fill="#fff" font-size="9">家</text>
    </g>
    <g id="riderDot" class="rider-dot" transform="translate(86,78)">
      <circle r="7" fill="#FF5538"/>
      <circle r="12" fill="#FF5538" opacity=".22"/>
    </g>
  </svg>`;
}

function renderOrder(o) {
  clearDeliveryTimers();
  cancelAnimationFrame(state.mapRaf);
  state.page = 'delivery';
  state.activeOrder = o;
  if ((o.done || etaLeft(o) <= 0) && !o.revealed) {
    startReveal(o);
    return;
  }
  $('#app').innerHTML = `${topbar()}<div class="page">
    <div class="order-head">
      <h2 id="headTitle">${o.done ? '订单已送达' : '骑手配送中'}</h2>
      <p id="statusText">商家正在出餐</p>
      <div class="eta-pill" id="etaBox">${o.done ? '已送达' : `预计 <b id="etaMin">${Math.max(1, Math.ceil(etaLeft(o) / 60000))}</b> 分钟送达`}</div>
    </div>
    <div class="driver-row">
      <img src="${o.driver.avatar}" alt="">
      <div class="driver-info">
        <b>${o.driver.name}</b>
        <span>${o.driver.plate}</span>
        <div id="chat"></div>
      </div>
    </div>
    <div class="map" id="mapView"><div class="map-stage" id="mapStage">${mapSVG()}</div></div>
    <div class="timeline" id="timeline"></div>
  </div>`;
  bindTop();
  if (o.done) {
    paintSteps(o, 4);
    setMapProgress(1);
  } else {
    progress(o);
  }
}

function addChat(text) {
  const chat = $('#chat');
  if (!chat) return;
  chat.insertAdjacentHTML('beforeend', `<div class="bubble">${text}</div>`);
}

function paintSteps(o, idx) {
  const steps = ['商家已接单', '餐品制作中', '骑手已取餐', '距离你约 800 米', '已送达'];
  const tl = $('#timeline');
  if (tl) {
    tl.innerHTML = steps.map((s, i) =>
      `<div class="step ${i <= idx ? 'on' : ''}"><span class="dot"></span><span>${s}</span></div>`).join('');
  }
  const st = $('#statusText');
  if (st) st.textContent = steps[idx];
  o.status = idx;
  save();
}

function setMapProgress(p) {
  const path = $('#route');
  const rider = $('#riderDot');
  const stage = $('#mapStage');
  if (!path || !rider) return;
  const len = path.getTotalLength();
  const pt = path.getPointAtLength(Math.max(0, Math.min(1, p)) * len);
  rider.setAttribute('transform', `translate(${pt.x},${pt.y})`);
  if (stage && !reduce()) {
    const x = 160 - pt.x * 0.55;
    const y = 90 - pt.y * 0.4;
    stage.style.transform = `translate(${x}px, ${y}px)`;
  }
}

function progress(o) {
  const start = o.startedAt || Date.now();
  const stageAt = () => [0, 0.18, 0.4, 0.72, 1].map(p => p * (o.etaMs || o.eta * 60000));

  const tickEta = () => {
    const left = etaLeft(o);
    const mins = Math.max(1, Math.ceil(left / 60000));
    const el = $('#etaMin');
    if (el) el.textContent = mins;
    const island = $('#islandEta');
    if (island) island.textContent = mins;
    if (left > 0 && !o.done) schedule(tickEta, 15000);
  };

  const enter = idx => {
    if (o.done && idx < 4) return;
    const prev = o.status ?? -1;
    paintSteps(o, idx);
    vibrate(12);
    if (idx === 0 && prev < 0) addChat(`我是${o.driver.name}，这单我送`);
    if (idx === 1 && prev < 1) addChat(o.driver.msgs[0]);
    if (idx === 2 && prev < 2 && o.delayEvent) addChat('商家出餐稍慢，我再等一下');
    if (idx === 3 && prev < 3) addChat(o.driver.msgs[1]);
    if (idx >= 4) {
      if (prev < 4) addChat(o.driver.msgs[2]);
      markDelivered(o);
    }
  };

  const loop = () => {
    if (state.page !== 'delivery' || !state.activeOrder || state.activeOrder.id !== o.id) return;
    const elapsed = Date.now() - start;
    const total = o.etaMs || o.eta * 60000;
    const p = Math.min(1, elapsed / total);
    setMapProgress(p);
    if (!o.delayTried && elapsed > total * 0.2) {
      o.delayTried = true;
      if (Math.random() < 0.4) {
        o.delayEvent = true;
        o.etaMs = total + (60 + Math.random() * 90) * 1000;
        save();
        addChat('商家说还要一会儿，出餐稍慢');
      }
    }
    if (p < 1) state.mapRaf = requestAnimationFrame(loop);
  };
  state.mapRaf = requestAnimationFrame(loop);

  let current = 0;
  const marks = stageAt();
  const elapsed = Math.max(0, Date.now() - start);
  for (let i = 0; i < marks.length; i++) if (elapsed >= marks[i]) current = i;
  enter(current);
  for (let i = current + 1; i < 5; i++) {
    const delay = Math.max(0, marks[i] - elapsed);
    schedule(() => enter(i), delay);
  }
  tickEta();
}

function markDelivered(o) {
  o.done = true;
  o.status = 4;
  save();
  if (state.page === 'delivery') startReveal(o);
}

function startReveal(o) {
  clearDeliveryTimers();
  cancelAnimationFrame(state.mapRaf);
  state.page = 'reveal';
  const amt = orderAmount(o);
  const slow = reduce();
  $('#app').innerHTML = `<div class="reveal-screen" id="revealScreen">
    <p class="reveal-line" id="r1">已送达。</p>
    <p class="reveal-line" id="r2">门口什么也没有。</p>
    <p class="reveal-line money" id="r3">${money(amt)} 也没有离开你。</p>
    <div class="brand-flip" id="rBrand"><span class="word word-a">美点</span><span class="word word-b">没点</span></div>
    <div class="tri" id="rTri">
      <div><span>模拟订单</span><b>${money(amt)}</b></div>
      <div><span>实际支付</span><b>¥0</b></div>
      <div><span>留下</span><b>${money(amt)}</b></div>
    </div>
    <div class="mood" id="rMood">
      <label>现在还想吃吗？</label>
      <div class="mood-btns">
        <button data-mood="still">还是很想吃</button>
        <button data-mood="passed">好像过去了</button>
        <button data-mood="unsure">说不清</button>
      </div>
    </div>
    <div class="reveal-nav" id="rNav">
      <button class="primary" id="backFeed">继续逛逛</button>
      <button class="ghost" id="toOrders">查看订单</button>
    </div>
  </div>`;

  const show = (sel, cls = 'on') => $(sel)?.classList.add(cls === 'on' ? 'on' : cls);
  const t = (fn, ms) => setTimeout(fn, slow ? 0 : ms);
  t(() => show('#r1'), slow ? 0 : 800);
  t(() => show('#r2'), slow ? 0 : 1700);
  t(() => show('#r3'), slow ? 0 : 2600);
  t(() => show('#rBrand'), slow ? 0 : 3400);
  t(() => $('#rBrand')?.classList.add('gone'), slow ? 0 : 4200);
  t(() => show('#rTri'), slow ? 0 : 4800);
  t(() => show('#rMood'), slow ? 0 : 5200);
  t(() => show('#rNav'), slow ? 0 : 5600);

  $$('[data-mood]').forEach(b => b.onclick = () => {
    $$('[data-mood]').forEach(x => x.classList.remove('sel'));
    b.classList.add('sel');
    const mins = Math.round((Date.now() - new Date(o.time).getTime()) / 60000);
    state.moods.push({
      mood: b.dataset.mood,
      hour: new Date().getHours(),
      cats: (o.items || []).map(x => x.cat),
      minutes: mins,
      amount: amt,
      at: new Date().toISOString(),
    });
    o.mood = b.dataset.mood;
    o.revealed = true;
    state.hasRevealed = true;
    save();
  });
  $('#backFeed').onclick = () => {
    o.revealed = true; state.hasRevealed = true; save();
    state.page = 'feed'; render();
  };
  $('#toOrders').onclick = () => {
    o.revealed = true; state.hasRevealed = true; save();
    state.page = 'orders'; render();
  };
}

function clearDeliveryTimers() {
  state.deliveryTimers.forEach(clearTimeout);
  state.deliveryTimers = [];
}
function schedule(fn, ms) {
  const t = setTimeout(fn, ms);
  state.deliveryTimers.push(t);
  return t;
}

function clearDwell() {
  Object.values(state.dwellTimers).forEach(clearTimeout);
  state.dwellTimers = {};
}

function refreshCartBar() {
  const old = $('#cartbar');
  if (old) old.remove();
  $$('.slide-body').forEach(el => el.classList.toggle('lift', !!state.cart.length));
  if (state.page !== 'feed' || !state.cart.length) return;
  $('#app')?.insertAdjacentHTML('beforeend', cartBarHTML());
  $('#openCart') && ($('#openCart').onclick = openCart);
  $('#cartbar') && ($('#cartbar').onclick = e => {
    if (e.target.id === 'openCart') return;
    openCart();
  });
}

function bindFeedBtns() {
  $$('[data-cart]').forEach(b => {
    b.onclick = e => { e.stopPropagation(); addToCart(b.dataset.cart); };
  });
  $$('[data-buy]').forEach(b => {
    b.onclick = e => { e.stopPropagation(); openCheckout(b.dataset.buy); };
  });
}

function bindTop() {
  $$('[data-page]').forEach(b => {
    b.onclick = () => { state.page = b.dataset.page; render(); };
  });
  $('#islandBtn')?.addEventListener('click', () => {
    if (!state.activeOrder) return;
    if (state.activeOrder.done && !state.activeOrder.revealed) startReveal(state.activeOrder);
    else { state.page = 'delivery'; render(); }
  });
}

function maybeInstallHint() {
  let visits = +localStorage.getItem('meidian-visits') || 0;
  if (!sessionStorage.getItem('meidian-visit-tick')) {
    visits++;
    localStorage.setItem('meidian-visits', String(visits));
    sessionStorage.setItem('meidian-visit-tick', '1');
  }
  if (visits !== 3 || localStorage.getItem('meidian-install-dismiss')) return;
  if ($('#installHint')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="install-hint" id="installHint">
      <span>添加到主屏幕，半夜打开更快</span>
      <button type="button" id="dismissInstall">好</button>
    </div>`);
  $('#dismissInstall').onclick = () => {
    localStorage.setItem('meidian-install-dismiss', '1');
    $('#installHint')?.remove();
  };
}

function render() {
  clearDwell();
  clearDeliveryTimers();
  cancelAnimationFrame(state.mapRaf);
  const o = state.activeOrder;
  if (o && !o.done && etaLeft(o) <= 0) {
    o.done = true; o.status = 4; save();
  }
  const app = $('#app');
  if (state.page === 'orders') {
    app.innerHTML = ordersPage();
    bindTop();
    return;
  }
  if (state.page === 'reveal' && o) {
    startReveal(o);
    return;
  }
  if (state.page === 'delivery' && o) {
    renderOrder(o);
    return;
  }
  state.page = 'feed';
  app.innerHTML = feedPage();
  bindTop();
  bindFeedBtns();
  observeFeed();
  refreshCartBar();
  maybeInstallHint();
  tickIsland();
}

function tickIsland() {
  const o = state.activeOrder;
  if (state.page !== 'feed' || !o || o.revealed) return;
  schedule(() => {
    if (state.page !== 'feed' || !state.activeOrder) return;
    if (etaLeft(state.activeOrder) <= 0 && !state.activeOrder.done) {
      state.activeOrder.done = true;
      state.activeOrder.status = 4;
      save();
      const island = $('#islandBtn span');
      if (island) {
        island.textContent = '已送达';
        $('#islandBtn')?.classList.add('done');
      }
      return;
    }
    const el = $('#islandEta');
    if (el) el.textContent = Math.max(1, Math.ceil(etaLeft(state.activeOrder) / 60000));
    tickIsland();
  }, 15000);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      if (reg.waiting) showToast('已更新，刷新即可');
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        w?.addEventListener('statechange', () => {
          if (w.state === 'installed' && navigator.serviceWorker.controller) {
            showToast('已更新，下一次打开生效');
          }
        });
      });
    } catch (_) { /* ignore */ }
  });
}

if (state.activeOrder && !state.activeOrder.done && etaLeft(state.activeOrder) <= 0) {
  state.activeOrder.done = true;
  state.activeOrder.status = 4;
  save();
}

render();

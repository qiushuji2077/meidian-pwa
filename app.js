const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => `¥${(+n).toFixed(1).replace(/\.0$/, '')}`;
const pick = a => a[Math.floor(Math.random() * a.length)];
const vibrate = ms => navigator.vibrate?.(ms);
const img = id => `./images/${id}.webp`;

const DRIVERS = [
  { name: '刘师傅', plate: '沪A·D8291', emoji: '🛵', msgs: ['商家出餐了，我马上到', '前方稍堵，预计再等几分钟', '已到门口，放门口了哦'] },
  { name: '阿杰', plate: '粤B·K6620', emoji: '🏍️', msgs: ['取餐完毕，正在配送', '快到了，麻烦留意一下', '已送达，祝用餐愉快'] },
  { name: '周姐', plate: '京C·F1183', emoji: '🚴', msgs: ['您的餐正在路上', '电梯里，马上到', '已放在门口，请查收'] },
];

/** 本地 WebP，竖屏 Feed 用 */
const items = [
  { id: 'mala', name: '招牌麻辣烫 · 自由选', shop: '蜀香麻辣烫', desc: '红油底料 · 芝麻酱 · 脆豆皮 · 宽粉加量', price: 42, orig: 58, img: img('mala'), sold: '月售 3241', deal: '满减后' },
  { id: 'bbq', name: '炭烤羊肉串 ×12', shop: '夜市烧烤', desc: '现烤 · 孜然辣椒 · 送烤茄子', price: 36, orig: 48, img: img('bbq'), sold: '排行榜 TOP3', deal: '夜宵价' },
  { id: 'lobster', name: '蒜蓉小龙虾 中份', shop: '麻小外卖', desc: '约 4 斤 · 蒜蓉 / 麻辣可选', price: 88, orig: 128, img: img('lobster'), sold: '今日爆单', deal: '直降 40' },
  { id: 'luosifen', name: '柳州螺蛳粉加大', shop: '螺霸王', desc: '酸笋 · 花生 · 腐竹 · 爆辣可选', price: 26, orig: 35, img: img('luosifen'), sold: '复购榜', deal: '加料免费' },
  { id: 'fried', name: '脆皮炸鸡双拼桶', shop: '炸翻天', desc: '现炸脆皮 · 蜂蜜芥末 · 送冰可乐', price: 49.9, orig: 69, img: img('fried'), sold: '已抢 892', deal: '夜宵特惠' },
  { id: 'kchicken', name: '韩式芝士炸鸡', shop: '鸡不可失', desc: '双层脆皮 · 芝士酱 · 甜辣酱', price: 52, orig: 72, img: img('kchicken'), sold: '好评 99%', deal: '套餐价' },
  { id: 'burger', name: '双层芝士牛肉堡套餐', shop: 'Burger Lab', desc: '两层牛肉 · 融化芝士 · 薯条可乐', price: 38, orig: 52, img: img('burger'), sold: '距你 1.2km', deal: '套餐价' },
  { id: 'burger2', name: '培根芝士巨无霸', shop: '美式夜食堂', desc: '厚切培根 · 双层芝士 · 秘制酱', price: 35, orig: 48, img: img('burger2'), sold: '热销中', deal: '立减 13' },
  { id: 'pizza', name: '榴莲芝士披萨 9寸', shop: '拉丝披萨', desc: '金枕榴莲 · 马苏里拉 · 薄脆边', price: 58, orig: 78, img: img('pizza'), sold: '库存紧张', deal: '立减 20' },
  { id: 'pizza2', name: '意式番茄肉肠披萨', shop: 'Midnight Oven', desc: '萨拉米 · 罗勒 · 莫扎里拉', price: 48, orig: 68, img: img('pizza2'), sold: '现烤 20 分', deal: '满减价' },
  { id: 'ramen', name: '浓汤豚骨拉面加蛋', shop: '一风堂深夜档', desc: '12 小时熬汤 · 叉烧 · 溏心蛋', price: 45, orig: 56, img: img('ramen'), sold: '现做约 25 分', deal: '加蛋免费' },
  { id: 'xiaomian', name: '重庆小面 · 红油豌杂', shop: '山城小面', desc: '豌杂 · 花生碎 · 葱花 · 可调辣', price: 18, orig: 25, img: img('xiaomian'), sold: '本地人推荐', deal: '早餐夜宵通吃' },
  { id: 'pho', name: '越南牛肉粉', shop: '南洋粉面', desc: '清汤牛腱 · 香菜柠檬 · 河粉', price: 32, orig: 42, img: img('pho'), sold: '清爽不腻', deal: '套餐价' },
  { id: 'noodles', name: '红油抄手宽面', shop: '成都味道', desc: '红油 · 抄手 · 宽面 · 花生碎', price: 28, orig: 38, img: img('noodles'), sold: '麻辣控', deal: '双拼价' },
  { id: 'sushi', name: '三文鱼握寿司拼盘', shop: '鲜一番', desc: '冰鲜三文鱼 · 醋饭 · 芥末酱油', price: 68, orig: 88, img: img('sushi'), sold: '好评 98%', deal: '拼盘优惠' },
  { id: 'hotpot', name: '一人食牛油火锅', shop: '小龙坎外卖', desc: '毛肚 · 鸭血 · 宽粉 · 配菜随心', price: 69, orig: 99, img: img('hotpot'), sold: '复购率高', deal: '限时 7 折' },
  { id: 'maocai', name: '冒菜豪华双人份', shop: '冒椒火辣', desc: '午餐肉 · 宽粉 · 海鲜菇 · 毛肚', price: 55, orig: 78, img: img('maocai'), sold: '分量足', deal: '双人价' },
  { id: 'bobo', name: '钵钵鸡冷吃套餐', shop: '成都钵钵鸡', desc: '红油香料 · 鸡肉豆皮宽粉', price: 32, orig: 45, img: img('bobo'), sold: '麻辣控必点', deal: '套餐立减' },
  { id: 'grilledfish', name: '香辣烤鱼 中份', shop: '探鱼外卖', desc: '草鱼 · 豆芽宽粉 · 可选微辣特辣', price: 98, orig: 138, img: img('grilledfish'), sold: '聚餐首选', deal: '直降 40' },
  { id: 'grilled', name: '炭烤鸡翅拼盘', shop: '烧烤研究所', desc: '蜜汁 / 香辣 · 现烤出炉', price: 39, orig: 52, img: img('grilled'), sold: '夜宵神器', deal: '拼盘价' },
  { id: 'claypot', name: '腊肠煲仔饭', shop: '煲仔皇', desc: '腊肠 · 蛋 · 酱油焦饭', price: 34, orig: 45, img: img('claypot'), sold: '锅巴香', deal: '锅底免费' },
  { id: 'huangmenji', name: '黄焖鸡米饭加大', shop: '杨铭宇', desc: '鸡肉土豆 · 青椒 · 香菇 · 米饭', price: 28, orig: 36, img: img('huangmenji'), sold: '国民外卖', deal: '加大不加价' },
  { id: 'friedrice', name: '扬州炒饭加大', shop: '老味道', desc: '粒粒分明 · 虾仁火腿', price: 24, orig: 32, img: img('friedrice'), sold: '15 分钟达', deal: '加大不加价' },
  { id: 'xiaolongbao', name: '鲜肉小笼包 12 个', shop: '南翔小笼', desc: '皮薄汤多 · 醋姜同送', price: 26, orig: 35, img: img('xiaolongbao'), sold: '老字号', deal: '夜宵减 9' },
  { id: 'buns', name: '流沙奶黄包 6 个', shop: '陶陶居', desc: '现蒸 · 流心奶黄', price: 28, orig: 36, img: img('buns'), sold: '广式点心', deal: '早茶价' },
  { id: 'roujiamo', name: '腊汁肉夹馍 ×2', shop: '秦味轩', desc: '酥脆白吉馍 · 腊汁猪肉', price: 22, orig: 30, img: img('roujiamo'), sold: '西北味', deal: '两件价' },
  { id: 'jianbing', name: '鸡蛋煎饼果子', shop: '天津早点车', desc: '薄脆 · 香菜 · 甜面酱 · 辣椒', price: 12, orig: 16, img: img('jianbing'), sold: '街头经典', deal: '加蛋免费' },
  { id: 'colawings', name: '可乐鸡翅 8 只', shop: '家常菜馆', desc: '可乐卤香 · 软烂入味', price: 29, orig: 39, img: img('colawings'), sold: '下饭神器', deal: '今晚特惠' },
  { id: 'ducknack', name: '麻辣鸭脖礼盒', shop: '绝味鸭脖', desc: '真空锁鲜 · 微辣 / 特辣', price: 35, orig: 48, img: img('ducknack'), sold: '追剧必备', deal: '礼盒价' },
  { id: 'stinkytofu', name: '油炸臭豆腐', shop: '长沙夜市', desc: '外酥内嫩 · 特制浇汁', price: 15, orig: 20, img: img('stinkytofu'), sold: '爱憎分明', deal: '夜宵价' },
  { id: 'chicken', name: '香辣鸡腿堡套餐', shop: '华莱士夜送', desc: '鸡腿堡 · 薯条 · 可乐', price: 29.9, orig: 42, img: img('chicken'), sold: '性价比之王', deal: '超值套餐' },
  { id: 'ribs', name: '蜜汁烤肋排', shop: '美式烟熏', desc: '慢烤 4 小时 · 蜂蜜焦糖', price: 78, orig: 108, img: img('ribs'), sold: '分量扎实', deal: '立减 30' },
  { id: 'steak', name: '黑椒菲力牛排', shop: '夜厨西餐', desc: '五分熟 · 黑椒汁 · 配时蔬', price: 68, orig: 98, img: img('steak'), sold: '约会款', deal: '限时立减' },
  { id: 'shrimp', name: '黄油蒜蓉虾', shop: '海鲜工坊', desc: '鲜虾 · 黄油蒜蓉 · 法棍', price: 58, orig: 78, img: img('shrimp'), sold: '鲜香爆汁', deal: '满减后' },
  { id: 'pasta', name: '奶油培根意面', shop: 'Pasta Night', desc: '厚切培根 · 帕玛森 · 黑胡椒', price: 42, orig: 56, img: img('pasta'), sold: '意式经典', deal: '套餐价' },
  { id: 'curry', name: '日式咖喱猪排饭', shop: '一番食堂', desc: '炸猪排 · 浓郁咖喱 · 福神渍', price: 36, orig: 48, img: img('curry'), sold: '暖胃首选', deal: '加大酱' },
  { id: 'tacos', name: '炸鸡芝士塔可', shop: 'Taco Night', desc: '脆壳 · 鸡柳 · 芝士酱', price: 29, orig: 39, img: img('tacos'), sold: '网红打卡', deal: '新品尝鲜' },
  { id: 'fries', name: '芝士炸薯条大份', shop: '美式夜食堂', desc: '拉丝芝士 · 番茄酱蜂蜜芥末', price: 18, orig: 25, img: img('fries'), sold: '配炸鸡', deal: '大份价' },
  { id: 'oden', name: '关东煮暖心套餐', shop: '全家便利店', desc: '萝卜 · 福袋 · 魔芋 · 鱼丸', price: 22, orig: 28, img: img('oden'), sold: '好评 TOP1', deal: '套餐价' },
  { id: 'onigiri', name: '金枪鱼饭团 ×2', shop: '罗森', desc: '微波 30 秒 · 海苔香', price: 14, orig: 18, img: img('onigiri'), sold: '24h 配送', deal: '两件价' },
  { id: 'tea', name: '黑糖波波鲜奶 大杯', shop: '一点点', desc: '少冰 · 七分甜 · 双份波波', price: 16, orig: 23, img: img('tea'), sold: '猜你喜欢', deal: '第二杯半价' },
  { id: 'boba', name: '黑糖珍珠鲜奶', shop: '老虎堂', desc: '手炒黑糖 · Q 弹珍珠', price: 18, orig: 25, img: img('boba'), sold: '本周热销', deal: '会员价' },
  { id: 'matcha', name: '抹茶生椰拿铁', shop: '喜茶', desc: '宇治抹茶 · 厚椰乳 · 奶盖', price: 22, orig: 29, img: img('matcha'), sold: '本周新品', deal: '会员价' },
  { id: 'lemon', name: '手打柠檬茶', shop: '奈雪の茶', desc: '鲜柠 · 香水柠檬 · 微糖', price: 15, orig: 22, img: img('lemon'), sold: '解腻首选', deal: '优惠价' },
  { id: 'coffee', name: '冰美式大杯', shop: '瑞幸', desc: '深度烘焙 · 少冰 · 可加糖', price: 9.9, orig: 18, img: img('coffee'), sold: '提神续命', deal: '咖啡补贴' },
  { id: 'cake', name: '海盐巧克力蛋糕', shop: '午夜烘焙', desc: '浓巧 · 海盐焦糖 · 冷藏更佳', price: 28, orig: 39, img: img('cake'), sold: '今晚限定', deal: '切块价' },
  { id: 'cookie', name: '纽约软曲奇 ×3', shop: 'Cookie Time', desc: '巧克力流心 · 温热更好吃', price: 22, orig: 30, img: img('cookie'), sold: '刚出炉', deal: '三件套' },
  { id: 'ice', name: '香草脆筒冰淇淋', shop: 'DQ', desc: '香草软冰 · 脆筒 · 巧克力酱', price: 15, orig: 22, img: img('ice'), sold: '冰柜必拿', deal: '单支特惠' },
  { id: 'dessert', name: '提拉米苏杯', shop: '甜品研究所', desc: '马斯卡彭 · 咖啡酒渍手指饼', price: 26, orig: 36, img: img('dessert'), sold: '治愈甜品', deal: '杯装价' },
  { id: 'chips', name: '蜂蜜黄油薯片大罐', shop: '便利蜂', desc: '进口 · 咔嚓停不下来', price: 12.9, orig: 18, img: img('chips'), sold: '回购榜', deal: '便利店价' },
  { id: 'beer', name: '精酿 IPA 330ml ×2', shop: '酒花纪', desc: '果香型 · 冰镇更佳', price: 36, orig: 48, img: img('beer'), sold: '满 18 可购', deal: '两瓶装' },
  { id: 'salad', name: '牛油果鸡胸沙拉', shop: '轻食计划', desc: '假装很健康 · 油醋汁', price: 32, orig: 42, img: img('salad'), sold: '罪恶对冲', deal: '轻食价' },
  { id: 'brunch', name: '全套美式早午餐', shop: 'Night Brunch', desc: '炒蛋 · 培根 · 松饼 · 薯饼', price: 48, orig: 68, img: img('brunch'), sold: '深夜也能点', deal: '套餐立减' },
  { id: 'feast', name: '深夜大盘分享餐', shop: '派对外卖', desc: '炸物拼盘 · 蘸酱齐全', price: 128, orig: 168, img: img('feast'), sold: '聚会首选', deal: '直降 40' },
];

const state = {
  page: 'feed',
  cart: JSON.parse(localStorage.getItem('meidian-cart') || '[]'),
  orders: JSON.parse(localStorage.getItem('meidian-orders') || '[]'),
  activeOrder: JSON.parse(localStorage.getItem('meidian-active') || 'null'),
  feedOrder: shuffle([...items]),
  dwellTimers: {},
  shownCta: new Set(),
  deliveryTimers: [],
};

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function save() {
  localStorage.setItem('meidian-orders', JSON.stringify(state.orders));
  localStorage.setItem('meidian-active', JSON.stringify(state.activeOrder));
  localStorage.setItem('meidian-cart', JSON.stringify(state.cart.map(x => ({
    id: x.id, name: x.name, price: x.price, orig: x.orig, qty: x.qty, img: x.img, shop: x.shop,
  }))));
}

function cartCount() {
  return state.cart.reduce((s, x) => s + x.qty, 0);
}

function cartTotal() {
  return state.cart.reduce((s, x) => s + x.price * x.qty, 0);
}

function cartBarHTML() {
  if (!state.cart.length || state.page !== 'feed') return '';
  const n = cartCount();
  return `<div class="cartbar" id="cartbar">
    <div class="badge">${n > 99 ? '99+' : n}</div>
    <div class="sum">${money(cartTotal())}<small>${n} 件商品 · 点此查看</small></div>
    <button type="button" id="openCart">去结算</button>
  </div>`;
}

function refreshCartBar() {
  const old = $('#cartbar');
  if (old) old.remove();
  if (state.page !== 'feed' || !state.cart.length) return;
  $('#app')?.insertAdjacentHTML('beforeend', cartBarHTML());
  $('#openCart') && ($('#openCart').onclick = openCart);
  $('#cartbar') && ($('#cartbar').onclick = e => {
    if (e.target.id === 'openCart') return;
    openCart();
  });
}

function totalSaved() {
  return state.orders.reduce((s, o) => s + (o.saved || 0), 0);
}

function totalSpent() {
  return state.orders.reduce((s, o) => s + o.total, 0);
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

function confetti() {
  const box = document.createElement('div');
  box.className = 'confetti';
  const colors = ['#ff5538', '#ff8a3d', '#ffc857', '#3ecf8e', '#fff'];
  for (let i = 0; i < 36; i++) {
    const p = document.createElement('i');
    p.style.cssText = `left:${Math.random() * 100}%;background:${pick(colors)};animation-delay:${Math.random() * .35}s;width:${5 + Math.random() * 7}px;height:${5 + Math.random() * 7}px`;
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 1800);
}

function topbar() {
  const delivering = state.activeOrder && !state.activeOrder.done;
  return `<div class="topbar">
    <div class="brand">美<span>点</span></div>
    <div class="tabs">
      <button data-page="feed" class="${state.page === 'feed' ? 'on' : ''}">推荐</button>
      ${delivering ? `<button data-page="delivery" class="${state.page === 'delivery' ? 'on' : ''}">配送</button>` : ''}
      <button data-page="orders" class="${state.page === 'orders' ? 'on' : ''}">订单</button>
    </div>
  </div>`;
}

function slideHTML(item, idx) {
  const discount = Math.round((1 - item.price / item.orig) * 100);
  return `<section class="slide" data-id="${item.id}" data-idx="${idx}">
    <div class="pic-ph"></div>
    <img class="bg" src="${item.img}" alt="" loading="${idx < 2 ? 'eager' : 'lazy'}" decoding="async"
      onload="this.classList.add('ready')" onerror="this.classList.add('err')">
    <div class="veil"></div>
    ${idx === 0 ? '<div class="hint-swipe" id="swipeHint">上滑看更多</div>' : ''}
    <div class="slide-body">
      <div class="shop"><span class="live"></span>${item.shop} · ${item.sold}</div>
      <h2 class="name">${item.name}</h2>
      <p class="desc">${item.desc}</p>
      <div class="cta" id="cta-${item.id}-${idx}">
        <div class="price-row">
          <span class="price-now"><small>¥</small>${item.price % 1 ? item.price.toFixed(1) : item.price}</span>
          <span class="price-old">${money(item.orig)}</span>
          <span class="deal">${item.deal} · 省 ${discount}%</span>
        </div>
        <div class="cta-btns">
          <button class="btn-cart" data-cart="${item.id}">加入购物车</button>
          <button class="btn-buy" data-buy="${item.id}">立即购买</button>
        </div>
      </div>
    </div>
  </section>`;
}

function feedPage() {
  return `${topbar()}<div class="feed" id="feed">${state.feedOrder.map((x, i) => slideHTML(x, i)).join('')}</div>${cartBarHTML()}`;
}

function ordersPage() {
  const saved = totalSaved();
  return `${topbar()}<div class="page">
    <div class="saved-banner">
      <div class="label">累计已省</div>
      <div class="num">${money(saved)}</div>
      <div class="tiny" style="margin-top:6px">共 ${state.orders.length} 笔订单 · 实付 ${money(totalSpent())}</div>
    </div>
    <div class="orders">${state.orders.length ? state.orders.map(o => `
      <div class="order-card">
        <div class="topline">
          <b>${o.items[0]?.name || '订单'}${o.items.length > 1 ? ` 等${o.items.length}件` : ''}</b>
          <b>${money(o.total)}</b>
        </div>
        <div class="tiny" style="margin-top:7px">
          ${new Date(o.time).toLocaleString('zh-CN')} · ${o.done ? '已送达' : '配送中'}
          ${o.saved ? ` · 已省 ${money(o.saved)}` : ''}
        </div>
      </div>`).join('') : `<div class="empty"><b>暂无订单</b>上滑挑点好吃的吧</div>`}
    </div>
  </div>`;
}

function addToCart(id) {
  const x = items.find(i => i.id === id);
  if (!x) return;
  const c = state.cart.find(i => i.id === id);
  if (c) c.qty++; else state.cart.push({ ...x, qty: 1 });
  save();
  vibrate(15);
  showToast(`已加入购物车 · ${x.name}`);
  refreshCartBar();
}

function openCart() {
  if (!state.cart.length) {
    showToast('购物车还是空的');
    return;
  }
  $('#overlay')?.remove();
  const total = cartTotal();
  const orig = state.cart.reduce((s, x) => s + x.orig * x.qty, 0);
  const saved = +(orig - total).toFixed(1);
  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay">
      <section class="sheet">
        <div class="handle"></div>
        <h3>购物车</h3>
        <div class="sub">共 ${cartCount()} 件 · 已优惠 ${money(saved)}</div>
        <div id="cartList">${state.cart.map(x => `
          <div class="cart-row" data-cid="${x.id}">
            <img src="${x.img}" alt="" loading="lazy">
            <div class="meta"><b>${x.name}</b><span>${money(x.price)}</span></div>
            <div class="cart-qty">
              <button type="button" data-dec="${x.id}">−</button>
              <b>${x.qty}</b>
              <button type="button" data-inc="${x.id}">＋</button>
            </div>
          </div>`).join('')}
        </div>
        <div class="lineitem" style="border:0;margin-top:6px"><b>合计</b><b style="color:var(--accent2);font-size:18px" id="cartSheetTotal">${money(total)}</b></div>
        <button class="primary" id="cartCheckout">去结算 · ${money(total)}</button>
        <button class="ghost" id="clearCart">清空购物车</button>
        <button class="ghost" id="close">继续逛逛</button>
      </section>
    </div>`);

  const rebind = () => {
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
      if (!state.cart.length) { $('#overlay')?.remove(); refreshCartBar(); showToast('购物车已清空'); return; }
      openCart();
      refreshCartBar();
    });
  };
  rebind();
  $('#close').onclick = () => $('#overlay').remove();
  $('#clearCart').onclick = () => {
    state.cart = [];
    save();
    $('#overlay').remove();
    refreshCartBar();
    showToast('购物车已清空');
  };
  $('#cartCheckout').onclick = () => {
    $('#overlay').remove();
    openCheckout();
  };
}

function openCheckout(presetId) {
  let list = [...state.cart];
  if (presetId) {
    const x = items.find(i => i.id === presetId);
    if (x) list = [{ ...x, qty: 1 }];
  }
  if (!list.length) return;

  const total = list.reduce((s, x) => s + x.price * x.qty, 0);
  const orig = list.reduce((s, x) => s + x.orig * x.qty, 0);
  const saved = +(orig - total).toFixed(1);

  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay">
      <section class="sheet">
        <div class="handle"></div>
        <h3>确认订单</h3>
        <div class="sub">请核对商品与配送信息</div>
        <div class="address">
          <b>送到 · 家门口</b>
          <span class="tiny">备注：放门口，勿敲门</span>
        </div>
        ${list.map(x => `<div class="lineitem"><span>${x.name} × ${x.qty}</span><b>${money(x.price * x.qty)}</b></div>`).join('')}
        <div class="lineitem"><span>配送费</span><span style="color:var(--good)">已减免</span></div>
        <div class="lineitem"><span>优惠</span><span style="color:var(--accent2)">−${money(saved)}</span></div>
        <div class="lineitem"><b>实付</b><b style="color:var(--accent2);font-size:18px">${money(total)}</b></div>
        <button class="primary" id="pay">微信支付 · ${money(total)}</button>
        <button class="ghost" id="close">取消</button>
      </section>
    </div>`);

  $('#close').onclick = () => $('#overlay').remove();
  $('#pay').onclick = () => {
    $('#overlay').remove();
    showPaySuccess(list, total, saved, !presetId);
  };
}

function showPaySuccess(list, total, saved, clearCart = true) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay">
      <section class="sheet">
        <div class="pay-success">
          <div class="ok">✓</div>
          <h3>支付成功</h3>
          <p>实付 ${money(total)} · 已省 ${money(saved)}</p>
          <p class="tiny">商家已接单，正在准备中</p>
        </div>
        <button class="primary" id="track">查看配送</button>
      </section>
    </div>`);
  confetti();
  vibrate([20, 30, 20]);

  const etaMin = 12 + Math.floor(Math.random() * 9); // 12–20 分钟
  const order = {
    id: Date.now(),
    time: new Date().toISOString(),
    items: list.map(x => ({ id: x.id, name: x.name, price: x.price, qty: x.qty, orig: x.orig })),
    total,
    saved,
    driver: pick(DRIVERS),
    eta: etaMin,
    etaMs: etaMin * 60 * 1000,
    startedAt: Date.now(),
    done: false,
    status: 0,
  };

  $('#track').onclick = () => {
    if (clearCart) state.cart = [];
    state.orders.unshift(order);
    state.activeOrder = order;
    save();
    $('#overlay').remove();
    renderOrder(order);
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

function renderOrder(o) {
  clearDeliveryTimers();
  state.page = 'delivery';
  state.activeOrder = o;
  $('#app').innerHTML = `${topbar()}<div class="page">
    <div class="order-head">
      <h2 id="headTitle">${o.done ? '订单已送达' : '骑手配送中'}</h2>
      <p id="statusText">商家正在出餐</p>
      <div class="eta" id="etaBox">${o.done ? '已送达' : `预计 <b id="etaMin">${o.eta}</b> 分钟送达`}</div>
    </div>
    <div class="driver-card">
      <div class="driver-avatar">${o.driver.emoji}</div>
      <div class="driver-info">
        <b>${o.driver.name}</b>
        <span>${o.driver.plate} · 美点专送</span>
        <div id="chat"></div>
      </div>
    </div>
    <div class="map">
      <div class="map-grid"></div>
      <div class="road a"></div><div class="road b"></div>
      <div class="store">店</div>
      <div class="home">家</div>
      <div class="rider" id="rider">骑</div>
    </div>
    <div class="timeline" id="timeline"></div>
    <div id="reveal"></div>
  </div>`;
  bindTop();
  if (o.done) {
    paintSteps(o, 4);
    finish(o, true);
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
  const pos = [[22, 34], [37, 40], [50, 49], [66, 58], [77, 66]];
  const tl = $('#timeline');
  if (tl) {
    tl.innerHTML = steps.map((s, i) =>
      `<div class="step ${i <= idx ? 'on' : ''}"><span class="dot"></span><span>${s}</span></div>`).join('');
  }
  const st = $('#statusText');
  if (st) st.textContent = steps[idx];
  const r = $('#rider');
  if (r) { r.style.left = pos[idx][0] + '%'; r.style.top = pos[idx][1] + '%'; }
  o.status = idx;
  save();
}

/**
 * 配送按预计分钟真实推进：
 * 阶段 0 立即 → 1 约 18% → 2 约 40% → 3 约 72% → 4 100%
 * ETA 每分钟倒数一次
 */
function progress(o) {
  const total = o.etaMs || o.eta * 60 * 1000;
  const start = o.startedAt || Date.now();
  const elapsed = Math.max(0, Date.now() - start);
  const stageAt = [0, 0.18, 0.4, 0.72, 1].map(p => p * total);

  // resume from correct stage
  let current = 0;
  for (let i = 0; i < stageAt.length; i++) {
    if (elapsed >= stageAt[i]) current = i;
  }

  const tickEta = () => {
    const left = Math.max(0, total - (Date.now() - start));
    const mins = Math.max(1, Math.ceil(left / 60000));
    const el = $('#etaMin');
    if (el) el.textContent = mins;
    if (left > 0 && !o.done) schedule(tickEta, 60000);
  };

  const enter = idx => {
    if (o.done) return;
    const prev = o.status ?? -1;
    paintSteps(o, idx);
    vibrate(12);
    if (idx === 0 && prev < 0) addChat(`您好，我是${o.driver.name}，正在为您配送`);
    if (idx === 1 && prev < 1) addChat(o.driver.msgs[0]);
    if (idx === 3 && prev < 3) addChat(o.driver.msgs[1]);
    if (idx >= 4) {
      if (prev < 4) addChat(o.driver.msgs[2]);
      finish(o);
    }
  };

  // paint current, schedule future
  enter(current);
  for (let i = current + 1; i < stageAt.length; i++) {
    const delay = Math.max(0, stageAt[i] - elapsed);
    schedule(() => enter(i), delay);
  }
  tickEta();
}

function finish(o, skipSave) {
  o.done = true;
  o.status = 4;
  if (!skipSave) save();
  const box = $('#etaBox');
  if (box) box.textContent = '已送达';
  const title = $('#headTitle');
  if (title) title.textContent = '订单已送达';
  const el = $('#reveal');
  if (!el || el.dataset.done) return;
  el.dataset.done = '1';
  el.innerHTML = `
    <div class="reveal">
      <div class="tiny">订单已完成</div>
      <div class="big">已省 ${money(o.saved)}</div>
      <p>本单实付 ${money(o.total)}，优惠 ${money(o.saved)}</p>
      <div class="stats">
        <div class="stat"><b>${money(totalSaved())}</b><span>累计已省</span></div>
        <div class="stat"><b>${state.orders.length}</b><span>笔订单</span></div>
      </div>
      <button class="primary" id="backFeed">继续逛逛</button>
      <button class="ghost" id="toOrders">查看订单</button>
    </div>`;
  $('#backFeed').onclick = () => { state.page = 'feed'; state.activeOrder = o; save(); render(); };
  $('#toOrders').onclick = () => { state.page = 'orders'; render(); };
}

function clearDwell() {
  Object.values(state.dwellTimers).forEach(clearTimeout);
  state.dwellTimers = {};
}

function observeFeed() {
  const feed = $('#feed');
  if (!feed) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const slide = entry.target;
      const id = slide.dataset.id;
      const idx = slide.dataset.idx;
      const key = `${id}-${idx}`;
      if (!id) return;
      if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
        if (state.shownCta.has(key)) {
          $(`#cta-${key}`)?.classList.add('show');
          return;
        }
        clearTimeout(state.dwellTimers[key]);
        state.dwellTimers[key] = setTimeout(() => {
          const cta = $(`#cta-${key}`);
          if (cta) {
            cta.classList.add('show');
            state.shownCta.add(key);
            vibrate(8);
          }
          $('#swipeHint')?.classList.add('hide');
        }, 900);
      } else {
        clearTimeout(state.dwellTimers[key]);
      }
    });
  }, { root: feed, threshold: [0.65, 0.85] });

  $$('.slide').forEach(s => io.observe(s));

  let appending = false;
  feed.onscroll = () => {
    if (appending) return;
    if (feed.scrollTop + feed.clientHeight > feed.scrollHeight - feed.clientHeight * 2) {
      appending = true;
      const more = shuffle([...items]);
      const start = state.feedOrder.length;
      state.feedOrder.push(...more);
      feed.insertAdjacentHTML('beforeend', more.map((x, i) => slideHTML(x, start + i)).join(''));
      $$('.slide').slice(start).forEach(s => io.observe(s));
      bindFeedBtns();
      setTimeout(() => { appending = false; }, 400);
    }
  };
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
    b.onclick = () => {
      state.page = b.dataset.page;
      render();
    };
  });
}

function render() {
  clearDwell();
  clearDeliveryTimers();
  const app = $('#app');
  if (state.page === 'orders') {
    app.innerHTML = ordersPage();
    bindTop();
    return;
  }
  if (state.page === 'delivery' && state.activeOrder) {
    renderOrder(state.activeOrder);
    return;
  }
  state.page = 'feed';
  app.innerHTML = feedPage();
  bindTop();
  bindFeedBtns();
  observeFeed();
  refreshCartBar();
  $('#openCart') && ($('#openCart').onclick = openCart);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }));
}

// resume in-progress delivery
if (state.activeOrder && !state.activeOrder.done) {
  const total = state.activeOrder.etaMs || state.activeOrder.eta * 60 * 1000;
  if (Date.now() - (state.activeOrder.startedAt || 0) >= total) {
    state.activeOrder.done = true;
    state.activeOrder.status = 4;
    save();
  }
}

render();

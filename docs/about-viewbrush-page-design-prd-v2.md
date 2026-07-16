# ViewBrush About Us Page Design PRD V2

> 文档状态：设计评审稿  
> 页面语言：English  
> 文档语言：中文  
> 页面类型：Brand Story / Trust Building / Conversion Assist  
> 适用端：Desktop / Tablet / Mobile

## 1. 结论

这份文案适合设计成一个完整的 About Us 页面，品牌定位也足够清晰。

它最有价值的差异点不是“AI 生成艺术”，而是：

`Technology reduces uncertainty before purchase. Human artists create the final value.`

页面不应被做成普通的公司介绍，也不应做成大段文字加几张装饰图。最合适的方向是一个有真实创作证据的、画廊编辑感的品牌故事页。

当前文案的主要设计风险：

- 正文较长，若按原顺序连续排版，阅读压力会偏大。
- `preview / technology / artist / hand-painted` 的意思有重复，需要依靠版式分层，而不是把每段都做成同等重要。
- `Made With Real Artists` 是信任核心，如果只使用室内效果图或材料静物图，会缺少足够证据。
- `15 years` 与 `average 10+ years` 同时出现时可能让用户疑惑，需要通过信息层级说明前者指合作体系，后者指艺术家平均经验，或在上线前进一步核实文案。

建议：文案主体保留，通过 6 个内容区重组；视觉必须补充真人艺术家创作素材。

## 2. 页面目标

### 2.1 商业目标

- 解释 ViewBrush 为什么不同于快速 AI 图片或普通照片打印。
- 降低用户对定制油画“结果不可控”的担忧。
- 建立“最终作品由真人手绘”的信任。
- 把已经被品牌故事说服的用户自然引导至创建流程。

### 2.2 用户看完后应形成的认知

1. 我可以在开始绘制前看清风格和创作方向。
2. 技术只负责帮助沟通和确认，不替代艺术家。
3. 最终作品使用真实画笔、油画颜料和画布，由有经验的艺术家完成。
4. ViewBrush 提供的是可以进入真实生活的定制艺术，而不是一张快速生成的文件。

### 2.3 页面核心指标

- About 页面到 `Create` 页的点击率。
- 页面 50% / 75% / 90% 滚动深度。
- `Made With Real Artists` 区域的到达率。
- 从 About 页面进入创建流程后的开始上传率。

## 3. 设计总纲

### 3.1 Visual Thesis

一个温暖、克制、有真实材料感的当代画廊页面：以完成后的油画和艺术家创作过程为主角，用编辑式排版表现“科技带来确定性，手工赋予作品生命”。

### 3.2 Content Plan

`Hero → Why ViewBrush → From Photo to Canvas → Brand Manifesto → Real Artists → Mission + CTA`

### 3.3 Interaction Thesis

- Hero 进入时仅做轻微的文字上移和主图显现，营造安静的开场。
- 三步体验区采用桌面端 sticky 叙事，用户滚动时依次看到 Photo、Preview、Hand-painted Canvas。
- 艺术家区使用轻微的图像裁切位移或细节放大，强调笔触和材料，不使用炫技型视差。
- 全部动效支持 `prefers-reduced-motion`；移动端取消 sticky，改为自然纵向阅读。

## 4. 用户阅读路径

```text
这是一个有意义的品牌
        ↓
它解决了定制艺术的两个旧问题
        ↓
我能先看清方向，再由艺术家完成
        ↓
技术和人各自扮演什么角色
        ↓
真人艺术家与真实材料提供可信证据
        ↓
我愿意开始自己的作品
```

## 5. 页面结构概览

| 区块 | 主要任务 | 核心内容 | 主视觉 |
| --- | --- | --- | --- |
| 01 Hero | 建立品牌立场 | About ViewBrush / A Clear Vision. A Human Touch. | 完成作品在真实家居中的全宽场景 |
| 02 Why ViewBrush | 解释品牌为何存在 | 数字图像与传统定制的两种不完整体验 | 一张回忆照片 + 一张完成作品，编辑式对照 |
| 03 From Photo to Canvas | 讲清体验流程 | Photo → Creative Direction → Hand-painted Canvas | 三段连续视觉叙事 |
| 04 Manifesto | 强化一句记忆点 | Technology gives you clarity. Human hands give it soul. | 满版作品细节或留白排版 |
| 05 Made With Real Artists | 提供信任证据 | 艺术家经验、判断、材料、手工完成 | 真人艺术家工作照 + 笔触特写 |
| 06 Our Goal | 收束使命并转化 | Our goal... + CTA | 作品进入家庭生活的场景 |

## 6. 分区设计说明

### 6.1 Section 01 - Hero / Brand Thesis

**目的**

在第一屏同时完成三件事：看见 ViewBrush、理解品牌主张、看见一件真正属于家居空间的作品。

**内容层级**

1. Eyebrow：`About ViewBrush`
2. H1：`A Clear Vision. A Human Touch.`
3. Lead paragraph：
   `The moments that matter most deserve more than a filter, or a file...`
4. 可选向下浏览提示，仅使用箭头图标，不增加说明文字。

**Desktop 布局**

- Hero 高度建议为 `calc(100svh - header)`，但底部必须露出下一节约 48-80px，提示页面可继续滚动。
- 全宽、非卡片式主图。文字位于图像的稳定留白区域，宽度约 500-580px。
- ViewBrush 品牌标识在导航中保持明确可见，H1 不超过 2 行。
- 主图应展示“完成油画已经进入真实生活”，而不是单独一张文件或 AI 工具界面。

**Mobile 布局**

- 首屏采用上方文字、下方 4:5 作品场景，不在复杂图像上强行叠字。
- H1 保持 2-3 行；Lead paragraph 控制在首屏可读范围。
- 不把完整 Opening Story 都塞入 Hero。

**现有素材建议**

- 首选候选：`room_gallery_clean_interior_20260611.png`
- 次选候选：`hero_painting_gallery_1780095998664.png`
- 设计阶段需检查裁切后是否仍能清楚看到画作本体。

### 6.2 Section 02 - Why ViewBrush Exists

**目的**

解释用户过去面对的两种不完整选择，并自然引出 ViewBrush。

**内容**

- `For years, custom art asked people to choose between two imperfect options...`
- `ViewBrush was created to bring the best of both together.`

**布局**

- 采用不对称两栏编辑排版，不使用两张“优缺点卡片”。
- 左侧放较大的问题陈述，右侧用两幅纵向图像形成对照：屏幕中的方向预览、墙上的完成油画。
- `ViewBrush was created to bring the best of both together.` 单独放大，作为该区结论。
- 可用一条细分隔线或编号 `01` 建立章节感，但不新增解释型小标题。

**阅读重点**

视觉上只强调以下短语：

- `stopped at the screen`
- `left too much to imagination`
- `bring the best of both together`

强调方式使用字重或颜色，不做胶囊标签。

### 6.3 Section 03 - From Photo to Canvas

**目的**

把长文案转化为容易理解的体验过程，同时明确技术与艺术家的边界。

**步骤拆分**

| Step | 用户理解 | 对应文案 | 视觉 |
| --- | --- | --- | --- |
| 01 Meaningful Photo | 从一张有意义的照片开始 | `You begin with a photo that means something to you...` | 原始照片 |
| 02 Clear Direction | 先确认风格、构图、颜色和细节 | `Our technology helps you explore the creative direction first...` | 预览方向或风格探索界面 |
| 03 Painted by Hand | 确认后由艺术家在画布上完成 | `Once you approve the direction, the real art begins...` + 后续段落 | 真人绘制过程与完成作品 |

**Desktop 交互**

- 左侧为 sticky 大图，右侧为 3 个自然滚动的文字步骤。
- 每进入一步，大图以 250-400ms 的淡入或裁切过渡切换。
- Step 03 应占最大视觉权重，因为它是购买价值的真正落点。

**Mobile 交互**

- 每一步按“编号 → 图像 → 文案”纵向排列。
- 不使用横向轮播，避免用户漏读关键步骤。

**转化注意**

这里的目标是建立理解，不建议插入 CTA。让用户完整看到真人艺术家证据后再转化更自然。

### 6.4 Section 04 - Brand Manifesto

**目的**

给页面一个短暂停顿，并留下唯一需要记住的品牌句。

**核心文案**

`Technology gives you clarity. Human hands give it soul.`

**辅助文案**

- `We are not here to turn your photo into a quick print...`
- `At ViewBrush, technology helps you see what is possible...`

**布局**

- 使用满宽深色或高对比背景区，不放在卡片内。
- 核心句最大，辅助文案保持窄栏，并与核心句拉开足够距离。
- 可用一张油画笔触微距作为全宽背景，但必须保留安静区域保证可读性。
- 不额外加入按钮、图标或统计数字。

### 6.5 Section 05 - Made With Real Artists

**目的**

这是整页最重要的信任区，必须证明最终作品来自真人艺术家的判断与手工。

**内容层级**

1. Section title：`Made With Real Artists`
2. 经验事实：合作体系 15 年手绘经验；艺术家平均 10+ 年油画经验。
3. Craft paragraph：光线、色彩分层、毛发质感和笔触都依赖人的观察与耐心。
4. Preview process paragraph：预览帮助客户表达方向，也帮助艺术家理解方向。
5. Closing fact：`Every final portrait is painted by hand.`

**布局**

- 使用 60/40 的图文布局：真人艺术家工作照占主要视觉，文案为窄栏。
- `15 years`、`10+ years`、`painted by hand` 可以作为大号排版事实呈现，但不要做成三张统计卡片。
- 下方加入 2-3 张横向细节图：调色、落笔、画布纹理。图片之间用留白区分。
- 艺术家形象应自然、专注、真实，不看镜头摆拍，不使用实验室或科技感背景。

**必须新增的素材**

- 真人艺术家正在绘制客户肖像的横向工作照。
- 手握画笔接触真实画布的近景。
- 完成作品的真实笔触微距。

仅使用当前的油画颜料静物图不足以支撑 `Made With Real Artists` 的可信度。此项建议作为上线前必备条件。

### 6.6 Section 06 - Our Goal / Final CTA

**目的**

以使命收束情绪，并为已经建立信任的用户提供下一步。

**内容**

- `Our goal is to make custom art feel more certain for every customer while creating more opportunities for skilled artists to bring meaningful stories into real homes.`
- Primary CTA：`Create Your Painting`
- Secondary CTA：`See How It Works`

**布局**

- 使命文案采用大字号但不超过 4-5 行，放在一张真实家居作品图的稳定区域。
- CTA 位于文案下方，主按钮为实色，次按钮为文字链接加箭头。
- Footer 紧接该区，不再新增一层重复口号。

## 7. 文案使用规则

### 7.1 原则

- 用户提供的英文文案是唯一正文来源。
- 允许拆段、调整到对应章节、通过字号突出短语。
- 不允许把 `technology` 擅自改回 `AI`。
- 不新增 “Why choose us”、功能卖点、承诺或未经证实的数据。
- CTA、章节编号和辅助导航属于系统性文字，可以新增。

### 7.2 建议上线前确认的英文细节

以下不是强制改写，而是建议由品牌方确认：

1. `more than a filter, or a file` 中的逗号可删除，使句子更自然：`more than a filter or a file`。
2. `partner studios and independent artists with 15 years of hand-painting experience` 容易被理解为所有独立艺术家都有 15 年经验。若事实是工作室成立 15 年，建议明确主语。
3. `15 years` 与 `average of 10+ years` 应在事实口径上区分清楚，避免用户认为数据冲突。
4. 正文里已使用 `Every final portrait is painted by hand.`，它是非常有力的事实句，建议在视觉上独立突出。

## 8. 视觉规范建议

### 8.1 色彩

- Base：暖白、纸张白、少量炭黑。
- Accent：保留现有品牌的深褐或低饱和酒红之一。
- Material color：允许油画颜料本身带来蓝、绿、红等自然色，避免整个页面只剩米色和棕色。
- 不使用紫蓝渐变、发光光球或科技霓虹。

### 8.2 字体

- 最多使用两套字体。
- Display：可使用有编辑感的 Serif，服务品牌宣言与章节结论。
- Body / UI：使用清晰的 Sans Serif，正文桌面建议 18-20px，移动端 16-18px。
- 不使用负字距；大标题通过字号、行距和留白建立力量。

### 8.3 图像

- 优先级：真人创作过程 > 完成作品真实场景 > 笔触细节 > 材料静物 > 预览界面。
- 不使用拼贴式大杂烩；每个画面只承担一个叙事任务。
- 图片不能带生成式乱码、品牌冲突、虚假笔触或不合理手部细节。
- 所有图片需要提供有意义的英文 alt text。

### 8.4 布局

- Desktop 内容最大宽度建议 `1280-1440px`，正文段落最大宽度 `58-68ch`。
- 章节垂直间距建议 `120-160px`；移动端 `72-96px`。
- Card radius 不超过 8px。大部分区块保持无卡片、无阴影。
- 使用全宽色带、图片与留白划分章节，不做卡片嵌套。

## 9. 响应式要求

### Desktop ≥ 1200px

- Hero 为全宽视觉。
- Section 03 可采用 sticky 叙事。
- Section 05 为主图与文案并列。

### Tablet 768-1199px

- 两栏可保留，但文本比例增大。
- sticky 仅在可用高度充足时启用。
- 统计事实换成一行或两行排版，避免拥挤。

### Mobile < 768px

- 全部内容回到单列自然文档流。
- Hero 不强制 `100vh`，避免地址栏造成裁切。
- 图片比例固定，避免加载后布局跳动。
- CTA 按钮最小高度 48px，主按钮可全宽。
- 长句不覆盖图片，不在狭窄区域使用超大字体。

## 10. 无障碍与性能

- 正文与背景对比度至少满足 WCAG AA。
- 动效不承载唯一信息，支持减少动态效果。
- 键盘焦点清晰可见。
- Hero 使用响应式图片和合理预加载；其余图片延迟加载。
- 移动端优先提供 AVIF/WebP，控制首屏图片体积。
- 页面无声自动播放视频不是必需项；若后续增加，必须提供暂停机制和静态降级图。

## 11. 低保真线框

```text
┌──────────────────────────────────────────────────────────────┐
│ NAV: VIEWBRUSH                                    CREATE     │
├──────────────────────────────────────────────────────────────┤
│ ABOUT VIEWBRUSH                                             │
│ A Clear Vision.      [ finished painting in a real home ]   │
│ A Human Touch.                                             │
│ Opening paragraph                                          │
├──────────────────────────────────────────────────────────────┤
│ WHY THE BRAND EXISTS        [ photo ]      [ final canvas ] │
│ Long-form story                                             │
│ ViewBrush was created to bring the best of both together.   │
├──────────────────────────────────────────────────────────────┤
│ [ sticky visual ]           01 Meaningful Photo             │
│                             02 Clear Direction              │
│                             03 Painted by Hand              │
├──────────────────────────────────────────────────────────────┤
│        Technology gives you clarity.                        │
│        Human hands give it soul.                            │
├──────────────────────────────────────────────────────────────┤
│ [ real artist at work ]     MADE WITH REAL ARTISTS          │
│                             experience + craft copy          │
│ [ palette ] [ brush detail ] [ canvas texture ]             │
├──────────────────────────────────────────────────────────────┤
│ OUR GOAL / MISSION                       [ home artwork ]    │
│ [ Create Your Painting ]  See How It Works →                │
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

## 12. 设计验收标准

### 12.1 10 秒测试

用户在 10 秒内应能回答：

- ViewBrush 做什么？
- 技术和真人艺术家分别负责什么？
- 最终成品是不是手绘？

### 12.2 内容验收

- 用户提供的正文内容完整保留，没有擅自改回 AI 口径。
- 同一段内容不会在不同章节重复出现。
- 页面主记忆点只有一个：`Technology gives you clarity. Human hands give it soul.`
- 艺术家经验数据经过品牌方确认。

### 12.3 视觉验收

- 第一屏能明确识别 ViewBrush，并看到完成作品的真实使用场景。
- 页面不是卡片列表，也没有装饰性渐变或无意义图标。
- `Made With Real Artists` 区域包含真人创作证据。
- 手机端无文字覆盖、按钮溢出、图片跳动或标题截断。
- 去掉阴影后，页面仍能依靠排版、图像与留白成立。

## 13. 设计交付物

1. Desktop low-fi wireframe：1440px。
2. Mobile low-fi wireframe：390px。
3. Desktop high-fi：1440px，含首屏和完整长页。
4. Mobile high-fi：390px。
5. Hero、流程切换、滚动 reveal 的动效说明。
6. 图片清单与裁切规格。
7. 文案映射表，确保所有原文都有明确归属。

## 14. 推荐实施顺序

1. 先确认英文事实口径，尤其是艺术家经验数据。
2. 补拍或获取真人艺术家工作素材。
3. 完成 desktop / mobile 低保真线框并评审信息节奏。
4. 确认后进入高保真视觉。
5. 最后才开发动效和响应式页面。

当前阶段建议先评审 Section 03 和 Section 05。前者决定用户能否理解服务，后者决定用户是否相信服务。

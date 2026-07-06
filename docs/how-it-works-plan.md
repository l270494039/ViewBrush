# How It Works 页面规划

本文件用于把现有 `How It Works` 文案整理成一份可执行的页面规划文档。

目标：

1. 不改写原文案，不额外增加新的营销话术。
2. 先确定信息层级、阅读顺序、页面结构和交互节奏。
3. 后续视觉设计、页面实现，都以这份规划为准。

## 1. 页面目标

这个页面要完成的不是“卖点罗列”，而是把用户从上传照片到手工完成的整个过程讲清楚。

用户看完后应该明确理解三件事：

1. 前半段先确认创作方向，不是直接下单盲做。
2. 后半段是真实的手工绘制过程，不是 AI 一键成品。
3. AI 的角色是帮助确认方向，最终作品由真人画师完成。

## 2. 原文案内容拆解

### 2.1 页面总标题

- `How It Works`
- `From a photo you love to a painting made by hand.`
- `See the direction before the painting begins. Then watch it come to life, layer by layer.`

作用：

- 第一时间说明“从照片到手绘成品”的完整路径。
- 定义页面基调：前半是确认方向，后半是逐层创作。

### 2.2 第一阶段：Your Vision

- `Your Vision`
- `01. Upload Your Photo`
- `02. Shape Your Vision`
- `03. See It in Your Space`
- `04. Choose Your Size, Frame, and Approve`

这一段的核心逻辑：

1. 从“有意义的照片”开始。
2. 再选绘画方向。
3. 再看它在家里的效果。
4. 最后确认尺寸、画框和创作方向。

结论：

- 这四步应该被设计成一个连续的“预览与确认流程”。
- 重点不是功能操作感，而是“决策逐步变清晰”。

### 2.3 第二阶段：Crafted From the Canvas Up

- `Crafted From the Canvas Up`
- `05. Prepare the Canvas`
- `06. Map the Composition by Hand`
- `07. Build Color and Depth in Layers`
- `08. Bring the Details to Life`
- `09. Finish for Your Home`

这一段的核心逻辑：

1. 先准备画布。
2. 再手工构图。
3. 再逐层上色和建立深度。
4. 再处理决定作品性格的细节。
5. 最后完成适合家居展示的成品。

结论：

- 这五步应该被设计成“手工创作过程展示”。
- 节奏要比上半段更慢、更有工艺感。

### 2.4 页面结尾说明

- `Our previews use AI-assisted tools to help you explore and confirm the creative direction. Every final portrait is hand-painted by a real artist.`
- `AI gives you clarity. Human hands give it soul.`

作用：

- 回答用户最关心的问题：AI 到底做了什么，人做了什么。
- 这是全页的最终结论，应该作为收尾出现，而不是提前讲。

## 3. 页面信息架构

建议页面按 4 个区块组织：

1. Hero / 页面引入
2. Vision / 01-04
3. Craft / 05-09
4. Closing Statement / AI 与手工说明

页面结构如下：

```text
How It Works
|- Hero
|  |- 标题
|  |- 副标题
|  |- 配图：原图 -> 预览结果
|
|- Section A: Your Vision
|  |- Step 01
|  |- Step 02
|  |- Step 03
|  |- Step 04
|
|- Section B: Crafted From the Canvas Up
|  |- Step 05
|  |- Step 06
|  |- Step 07
|  |- Step 08
|  |- Step 09
|
|- Section C: Closing Statement
   |- AI-assisted explanation
   |- Final statement
```

## 4. 页面阅读节奏

### 4.1 Hero

阅读目标：

- 用户在第一屏就知道这页讲的是“从照片到手绘画作”的完整流程。

内容规则：

- 只放标题、副标题和 1 组视觉引导。
- 不加额外说明文字。
- 不建议在这里放太多按钮或额外解释。

视觉建议：

- 使用“原图 + 空间预览图”作为第一屏主视觉。
- 强调“方向先确认”，而不是强调下单动作。

### 4.2 Your Vision

阅读目标：

- 让用户觉得自己是在逐步做决定，而不是被迫一次性确认所有内容。

结构建议：

- 4 个步骤顺序展开。
- 每一步都保留编号、标题、正文。
- 版式可以是纵向时间线，也可以是双栏步骤流。

交互建议：

- 轻微滚动 reveal 即可。
- 不建议做复杂切换、轮播或隐藏式交互。

原因：

- 这部分重点是“清楚”，不是“好玩”。

### 4.3 Crafted From the Canvas Up

阅读目标：

- 让用户理解后半段是真实的、分阶段完成的手工过程。

结构建议：

- 5 个步骤连续展开。
- 每一步都应有更强的材质感或工艺感配图。
- 这一段可以比上半段更长、更沉稳。

交互建议：

- 保持线性滚动阅读。
- 可以配合图片 sticky，但不能打断文本连续性。

原因：

- 文案本身已经很强，不需要再依赖复杂交互制造理解。

### 4.4 Closing Statement

阅读目标：

- 清晰收束“AI 辅助预览 + 真人手绘完成”的关系。

结构建议：

- 先放解释句。
- 再放最后一句总结。

视觉建议：

- 这一段要有明显的收尾感。
- 保持简洁，不要再引入新的卖点或新模块。

## 5. 低保真交互原型

### 5.1 原型结构

```text
[ Section 1: Hero ]
左侧:
- How It Works
- From a photo you love to a painting made by hand.
- See the direction before the painting begins. Then watch it come to life, layer by layer.

右侧:
- 原始照片小图
- 预览效果大图

[ Section 2: Your Vision ]
标题:
- Your Vision

内容:
- 01 Upload Your Photo
- 02 Shape Your Vision
- 03 See It in Your Space
- 04 Choose Your Size, Frame, and Approve

[ Section 3: Crafted From the Canvas Up ]
标题:
- Crafted From the Canvas Up

内容:
- 05 Prepare the Canvas
- 06 Map the Composition by Hand
- 07 Build Color and Depth in Layers
- 08 Bring the Details to Life
- 09 Finish for Your Home

右侧或穿插配图:
- canvas
- paint
- frame / finished artwork context

[ Section 4: Closing ]
- Our previews use AI-assisted tools to help you explore and confirm the creative direction. Every final portrait is hand-painted by a real artist.
- AI gives you clarity. Human hands give it soul.
```

### 5.2 桌面端建议

- Hero 使用左右双栏。
- `Your Vision` 采用窄标题列 + 宽内容列。
- `Crafted From the Canvas Up` 采用宽内容列 + 辅助图像列。
- 全页保持单线叙事，不插入无关模块。

### 5.3 移动端建议

- 所有内容改为单列。
- Hero 先标题，再图像。
- 01-09 按顺序直接展开。
- 不要让图片压过文字，也不要让步骤折叠起来。

## 6. 文案使用规则

这是本页最重要的执行规则：

1. 页面正文只使用你提供的文案。
2. 可以拆段、换行、分组，但不新增意思。
3. 不新增营销标题。
4. 不新增补充说明。
5. 不新增 FAQ 式解释。
6. CTA 作为功能文案可以存在，但不应侵入正文叙事。

允许做的事：

- 调整段落断行。
- 调整步骤分组。
- 用版式强化“前半确认方向、后半手工完成”的结构。

不建议做的事：

- 额外写“为什么选择我们”。
- 加入评论、数据、卖点卡片。
- 在正文中混入设计师自己的解释语。

## 7. 配图规划

建议配图只承担辅助理解，不承担新增叙事。

推荐对应关系：

1. Hero：原始照片 + 空间预览图
2. Vision：空间展示图或预览图
3. Craft：
   - canvas 对应 05
   - paint/material 对应 07
   - frame / finished context 对应 09

规则：

- 图像是辅助，不替代文本。
- 图像数量不宜过多。
- 不做花哨拼贴。
- 不做与文案无关的展示模块。

## 8. CTA 规划

虽然正文应严格以现有文案为主，但这个页面仍然需要 CTA。

原因：

1. `How It Works` 是解释页，不是终点页。
2. 用户在看完流程后，需要一个明确的下一步入口。
3. 如果完全没有 CTA，页面会停在“理解了流程，但不知道下一步做什么”。

### 8.1 CTA 目标

这个页面的 CTA 目标应当非常单一：

- 引导用户进入创作/预览流程。

不建议在本页同时推动多个目标，例如：

- 联系客服
- 查看退款政策
- 阅读更多品牌故事
- 浏览大量附加页面

原因：

- 这会削弱本页最核心的转化逻辑。
- 用户在这个页面完成的关键心理动作是“建立信任并准备开始”。

### 8.2 CTA 数量建议

建议采用 `1 个主 CTA + 1 个弱辅助 CTA` 的结构。

主 CTA：

- 引导进入 `Create` 或预览流程。

辅助 CTA：

- 只承担轻量补充作用，例如查看 FAQ 或价格信息。

不建议：

- 每个区块都放按钮。
- 01-09 每一步后都插 CTA。
- 同一屏出现多个同级主按钮。

### 8.3 CTA 布局建议

建议放置 3 个 CTA 节点，但只保留 1 个真正强主按钮：

#### 节点 A：Hero 区

作用：

- 服务于已经有意愿、看完标题就准备开始的人。

建议：

- 放 1 个主 CTA。
- 如果需要第二个按钮，也必须是弱辅助按钮。

推荐文案：

- 主 CTA：`Start Your Painting`
- 备选：`Start With Your Photo`
- 备选：`Begin Your Preview`

辅助 CTA 可选文案：

- `View FAQ`
- `See Pricing`

判断：

- 如果希望页面更克制，Hero 可以只放 1 个主按钮。
- 这是我更推荐的方案。

#### 节点 B：Vision 段结束后

作用：

- 用户读完 01-04 后，已经完成“预览与确认方向”的理解。
- 这是第一次自然出现转化意愿的时点。

建议：

- 这里不一定要放完整按钮。
- 可以只放一条轻量文字链接式 CTA。

推荐文案：

- `Start Your Preview`
- `Begin With Your Photo`

判断：

- 如果页面想更纯粹，这个节点可以省略。
- 如果希望提高从中段直接转化的概率，可以保留。

#### 节点 C：页面结尾

作用：

- 这是最重要的 CTA 节点。
- 用户在这里已经理解完 AI 和手工的关系，也完成了整条流程认知。

建议：

- 放最终主 CTA。
- 这一处应当是全页最明确、最自然的转化出口。

推荐文案：

- 主 CTA：`Start Your Painting`
- 备选：`Begin Your Preview`
- 备选：`Create Your Portrait`

辅助 CTA 可选文案：

- `Read FAQ`
- `See Pricing`

结论：

- 如果只保留 1 个最关键 CTA，应该保留在这里。

### 8.4 CTA 文案策略

CTA 文案应当和页面主题一致，即：

- calm
- guided
- confident
- not pushy

因此建议使用这类动词：

- `Start`
- `Begin`
- `Create`

不建议使用这类偏强销售型文案：

- `Buy Now`
- `Get Yours Today`
- `Claim Your Portrait`
- `Order Instantly`

原因：

- 这些表达会破坏页面已有的画廊式、策展式语气。
- `How It Works` 的职责是建立信任，不是制造促销压力。

### 8.5 CTA 优先级定义

本页的 CTA 层级建议如下：

1. Primary CTA
   - 去 `Create`
   - 视觉上使用深色实心按钮
2. Secondary CTA
   - 去 FAQ 或价格信息
   - 视觉上使用描边或纯文字形式

规则：

- 任意一个区块内只能有 1 个主 CTA。
- 辅助 CTA 只能补充，不得抢主按钮。
- 不要在流程正文中间反复插入主按钮。

### 8.6 推荐执行方案

如果按当前页面定位，我建议采用最克制、最稳定的一版：

1. Hero 放 1 个主 CTA：`Start Your Painting`
2. `Your Vision` 和 `Crafted From the Canvas Up` 中间不插主按钮
3. 页面结尾再放 1 个主 CTA：`Start Your Painting`
4. 页面结尾可选 1 个辅助 CTA：`Read FAQ`

这个方案的优点：

1. 不打断阅读。
2. CTA 足够明确。
3. 能兼顾“先了解流程”和“看完马上开始”两种用户。

## 9. 设计前确认项

在进入正式设计前，建议先确认这 4 件事：

1. 页面正文是否严格只保留现有文案。
2. CTA 是否允许作为功能文案单独存在。
3. 01-04 是否做成完整纵向步骤，而不是卡片式平铺。
4. 05-09 是否接受“文字为主、材质图辅助”的结构，而不是大面积视觉主导。

## 10. 下一步执行建议

下一步设计时，按这个顺序推进：

1. 先画低保真线框图。
2. 确认区块顺序、图文比例、滚动节奏。
3. 确认 CTA 节点数量与位置。
4. 再做高保真视觉设计。
5. 最后再落地成代码页面。

如果你确认这份规划，我下一步就直接把它翻成低保真页面结构，再开始正式设计。

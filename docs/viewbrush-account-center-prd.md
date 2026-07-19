# ViewBrush Personal Center PRD

本文件用于规划 ViewBrush 个人中心。

个人中心不是普通会员页，也不是电商后台。它的核心任务是让用户清楚知道：

1. 我的作品现在在哪里。
2. 我还需要做什么决定。
3. ViewBrush 接下来会做什么。
4. 如果需要修改、取消、售后，我应该从哪里开始。

## 1. 产品定位

ViewBrush 的产品承诺是：

`AI Preview. Artist Finished.`

因此个人中心要承接的不是“账号资料管理”，而是“从照片到手绘作品交付”的完整过程管理。

个人中心的产品定位：

- Custom Artwork Workspace
- Order Progress Center
- Review & Approval Hub
- Support Entry Point

不是：

- 普通电商会员中心
- 社区主页
- 内容收藏夹
- 积分/优惠券中心
- SaaS dashboard

## 2. 个人中心目标

个人中心第一阶段要解决 5 个问题：

1. 降低用户对定制流程的不确定感。
2. 帮用户找回未完成的作品草稿。
3. 让订单状态比邮件更清楚。
4. 把“最终作品确认”和“修改申请”放到明确入口。
5. 把退款、损坏、缺陷等售后请求绑定到具体订单。

用户进入个人中心后应该形成的感受：

- 我知道我的作品进行到哪一步了。
- 我知道现在是否需要我操作。
- 我知道哪些内容还能改，哪些已经锁定。
- 我知道 ViewBrush 不是下单后消失，而是在持续交付作品。

## 3. 用户身份策略

### 3.1 推荐第一版

第一版不建议做复杂注册系统。

推荐方式：

1. 用户通过邮箱进入个人中心。
2. 支付成功后，系统自动把订单绑定到该邮箱。
3. 用户可通过邮箱 magic link 或 `email + order number` 查看订单。

原因：

- 定制画用户不一定愿意先注册。
- 支付和订单查询才是强身份场景。
- 邮箱已经在 Payment Details 和 Checkout 中出现，顺接自然。
- 降低创建流程阻力。

### 3.2 后续增强

第二阶段可以增加：

- Google 登录
- Apple 登录
- 保存默认收货地址
- 通知偏好
- 历史作品归档

但不建议在 MVP 里先做。

## 4. MVP 范围

个人中心第一版只做 3 个核心页面。

### 4.1 Overview

个人中心首页。

职责：

- 展示当前进行中的作品。
- 展示待用户处理事项。
- 展示最近草稿和最近订单。
- 提供继续创建、查看订单、联系支持入口。

核心模块：

- Current Studio Work
- Needs Your Review
- Recent Portraits
- Recent Orders
- Support Shortcuts

### 4.2 My Portraits

作品资产页。

职责：

- 管理用户上传、生成、确认、完成的作品。
- 帮用户继续未完成流程。
- 让用户复购时能从历史作品或草稿继续。

作品状态：

- Draft
- Preview Generated
- Direction Approved
- Ordered
- Completed

每个作品卡片显示：

- 源照片
- 生成预览
- 风格
- 尺寸
- 画框
- 房间场景
- 用户备注
- 当前状态
- 下一步按钮

### 4.3 Order Details

订单详情页。

职责：

- 展示订单状态时间线。
- 展示已锁定的创作方向。
- 展示支付、配送、材料、售后相关信息。
- 承接最终作品确认、修改申请、发货确认、售后请求。

核心模块：

- Order Header
- Artwork Summary
- Studio Timeline
- Locked Details
- Payment & Delivery
- Review Actions
- Support Actions

## 5. 后续页面

以下页面不进入第一版主开发范围，但需要在信息架构中预留。

### 5.1 Support Center

按订单发起支持请求。

请求类型：

- Request a revision
- Change shipping address
- Cancel order
- Report damage
- Report production defect
- Ask a question

### 5.2 Account Settings

基础账号管理。

内容：

- Email
- Default shipping country
- Notification preference
- Privacy permission
- Portfolio sharing consent

### 5.3 Final Artwork Review

最终作品确认页。

职责：

- 展示最终作品照片。
- 让用户选择批准发货或申请合理修改。
- 明确批准后订单将进入最终发货阶段。

这个页面可以作为 Order Details 的重要子状态，也可以后续独立出来。

## 6. 信息架构

推荐导航结构：

```text
Account
|- Overview
|- My Portraits
|- Orders
|- Support
|- Settings
```

移动端推荐底部或抽屉式导航：

```text
Overview
Portraits
Orders
Support
```

`Settings` 在移动端可以放进右上角菜单，不占主导航。

## 7. Overview 页面结构

### 7.1 页面目标

Overview 不是信息总表，而是“下一步行动页”。

用户进入后优先看到：

1. 是否有待处理事项。
2. 当前作品进度。
3. 最近订单状态。

### 7.2 推荐结构

```text
Account Overview

[Hero / Status Header]
- Welcome back
- One sentence summary
- Primary action: Continue Your Portrait

[Needs Your Review]
- Final artwork ready
- Studio question
- Address confirmation
- Revision response

[Current Studio Work]
- Large artwork card
- Current order status
- Timeline preview
- Next action

[Recent Portraits]
- Drafts and generated previews

[Recent Orders]
- Order number
- Status
- Date
- Total

[Support]
- Policy-aware support shortcuts
```

### 7.3 空状态

新用户没有订单时：

- 不要显示空 dashboard。
- 显示一个强作品入口。
- 引导到创建流程。

空状态文案方向：

`Start with a photo you love. ViewBrush will help you see the direction before the painting begins.`

## 8. My Portraits 页面结构

### 8.1 页面目标

My Portraits 是用户作品资产库。

它要帮助用户：

- 找回草稿。
- 比较生成过的方向。
- 继续未完成订单。
- 回看已完成作品。
- 开始同一宠物或同一风格的新作品。

### 8.2 过滤器

推荐过滤：

- All
- Drafts
- Previews
- Ordered
- Completed

### 8.3 作品卡片字段

```text
Portrait Card
- sourceImage
- previewImage
- conceptTitle
- conceptTone
- size
- frameLabel
- roomLabel
- note
- status
- updatedAt
- primaryAction
```

### 8.4 操作

不同状态对应不同操作：

- Draft: Continue
- Preview Generated: Review Details
- Direction Approved: Checkout
- Ordered: View Order
- Completed: Create Another

## 9. Order Details 页面结构

### 9.1 页面目标

Order Details 是个人中心最重要页面。

它要清楚回答：

- 这幅作品是什么。
- 当前由谁处理。
- 下一步是什么。
- 哪些内容已经锁定。
- 是否还能取消、修改、退款。

### 9.2 推荐结构

```text
Order Details

[Order Header]
- Order number
- Current status
- Next expected update
- Primary action

[Artwork Summary]
- Approved preview
- Source photo
- Style
- Size
- Frame
- Room mockup
- Customer note

[Studio Timeline]
- Payment confirmed
- Studio review
- Artist started
- Final artwork ready
- Approved to ship
- Shipped
- Delivered

[Review Actions]
- Approve final artwork
- Request revision
- View revision history

[Payment & Delivery]
- Total paid
- Payment method
- Delivery option
- Shipping country/address
- Tracking number

[Support]
- Request cancellation
- Report damage or defect
- Contact ViewBrush
```

## 10. 订单状态模型

个人中心建议使用下面状态。

```text
Draft
Preview Generated
Direction Approved
Payment Confirmed
Studio Review
Artist Started
Final Artwork Ready
Revision Requested
Revision In Progress
Approved To Ship
Shipped
Delivered
Completed
Issue Reported
Refund Processing
Replacement Processing
Canceled
```

## 11. 状态解释

### Draft

用户上传过照片，但还没有生成或确认预览。

允许操作：

- Continue creating
- Delete draft

### Preview Generated

用户已经生成 AI-assisted preview。

允许操作：

- Change style
- Change size
- Change frame
- Add note
- Continue to details

### Direction Approved

用户确认了创作方向，但还没有完成支付。

允许操作：

- Checkout
- Go back to edit details

### Payment Confirmed

订单已付款。

允许操作：

- View order
- Contact support
- Cancel if artist has not started

### Studio Review

ViewBrush 团队正在确认照片、备注、尺寸、画框与创作方向。

允许操作：

- Contact support
- Limited changes

### Artist Started

艺术家已经开始创作。

产品含义：

- 全额取消不再默认可用。
- 用户仍可联系支持。
- 修改能力取决于当前进度。

### Final Artwork Ready

最终作品可供用户发货前确认。

允许操作：

- Approve to ship
- Request reasonable revision

### Revision Requested

用户提交了修改请求。

允许操作：

- View request
- Wait for studio response

### Approved To Ship

用户批准最终作品进入发货阶段。

产品含义：

- 一般偏好原因不再支持修改、取消或退款。
- 仍保留损坏、缺陷、物流问题入口。

### Shipped

订单已发货。

允许操作：

- Track package
- Contact support

### Delivered

订单已送达。

允许操作：

- Report damage or defect within 30 days
- Create another portrait

### Completed

售后保护窗口结束或订单自然完成。

允许操作：

- View artwork
- Create another portrait

## 12. 数据模型草案

### 12.1 User

```ts
type User = {
  id: string;
  email: string;
  name?: string;
  defaultCountry?: string;
  createdAt: string;
};
```

### 12.2 Portrait

```ts
type Portrait = {
  id: string;
  userId: string;
  sourceImageUrl: string;
  previewImageUrl?: string;
  conceptTitle: string;
  conceptTone: string;
  size: string;
  frameLabel: string;
  roomLabel: string;
  note?: string;
  status: 'draft' | 'preview-generated' | 'direction-approved' | 'ordered' | 'completed';
  createdAt: string;
  updatedAt: string;
};
```

### 12.3 Order

```ts
type Order = {
  id: string;
  orderNumber: string;
  userId: string;
  portraitId: string;
  status:
    | 'payment-confirmed'
    | 'studio-review'
    | 'artist-started'
    | 'final-artwork-ready'
    | 'revision-requested'
    | 'revision-in-progress'
    | 'approved-to-ship'
    | 'shipped'
    | 'delivered'
    | 'completed'
    | 'issue-reported'
    | 'refund-processing'
    | 'replacement-processing'
    | 'canceled';
  total: number;
  paymentMethod: string;
  deliveryOption: 'standard' | 'express';
  shippingCountry: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
};
```

### 12.4 RevisionRequest

```ts
type RevisionRequest = {
  id: string;
  orderId: string;
  message: string;
  status: 'submitted' | 'studio-review' | 'in-progress' | 'resolved' | 'declined';
  createdAt: string;
  updatedAt: string;
};
```

### 12.5 SupportRequest

```ts
type SupportRequest = {
  id: string;
  orderId: string;
  type:
    | 'revision'
    | 'cancellation'
    | 'address-change'
    | 'damage'
    | 'production-defect'
    | 'general-question';
  message: string;
  imageUrls?: string[];
  status: 'submitted' | 'in-review' | 'waiting-for-customer' | 'resolved';
  createdAt: string;
  updatedAt: string;
};
```

## 13. 与现有页面的衔接

### 13.1 Create

现有创建页已经具备个人中心需要的核心数据：

- sourceImage
- generatedImages
- selectedConcept
- selectedRoom
- selectedFrame
- selectedSize
- note

后续应在这些节点保存草稿：

1. 用户上传图片后。
2. 生成 preview 后。
3. 修改 style / size / frame / room / note 后。
4. 点击 Continue to Details 前。

### 13.2 Payment Details

Payment Details 是 `Direction Approved` 的前置确认页。

后续应在进入该页时创建或更新 Portrait：

- status: `direction-approved`
- lockedPreview: current generated preview
- lockedDetails: size / frame / room / note

### 13.3 Checkout

Checkout 完成后应创建 Order。

订单初始状态：

- `payment-confirmed`

并跳转到：

- Order Success
- 或 Account / Order Details

### 13.4 Order Success

Order Success 现在是订单后的确认页。

后续建议增加：

- View Order
- Go to Account

`Return Home` 可以保留，但不应该是唯一主路径。

## 14. 视觉与交互原则

个人中心要延续 ViewBrush 的画廊式服务感。

视觉关键词：

- Warm editorial workspace
- Studio progress
- Artwork-first
- Calm status clarity
- Human support

避免：

- 冷色 SaaS 后台
- 过度密集数据表
- 电商会员中心促销感
- 大面积图标堆叠
- 优惠券、积分、等级体系抢主线

UI 规则：

1. 作品图永远优先于数据字段。
2. 状态文案用用户能理解的工作室语言。
3. 下一步行动必须明确。
4. 售后入口必须绑定订单。
5. 修改、取消、退款要根据订单阶段给出不同提示。

## 15. 推荐文案方向

### 状态类

- In the studio queue
- Studio review in progress
- Your artist has started
- Final artwork ready for review
- Approved for shipping
- Delivered to your home

### 行动类

- Continue Your Portrait
- Review Final Artwork
- Approve To Ship
- Request A Revision
- View Order Details
- Contact ViewBrush
- Start Another Portrait

### 提示类

- `Your approved direction is now locked for the artist team.`
- `You can request reasonable refinements before the artwork ships.`
- `Once approved for shipping, this order moves into the final delivery stage.`
- `Damage or verified production defects can be reported within 30 days of delivery.`

## 16. 第一版开发建议

第一版可以不接真实后端，先做静态数据 + 当前流程状态打通。

推荐开发顺序：

1. 新增 Account route。
2. Navbar Account icon 跳转 Account。
3. 新增 Account page layout。
4. 用 mock data 做 Overview、Portraits、Order Details。
5. Order Success 增加 View Order / Go to Account。
6. 将当前 checkoutOrder 和 paymentDetails 映射为一个临时 order。
7. 后续再接真实持久化和登录。

## 17. MVP 验收标准

第一版完成后，用户应该能：

1. 从导航进入个人中心。
2. 看到至少一个进行中的作品或订单。
3. 看懂订单当前状态。
4. 查看作品预览、尺寸、画框、房间场景、备注。
5. 从订单详情进入支持或修改入口。
6. 支付成功后有清晰路径查看订单。
7. 新用户没有订单时能被自然引导去创建第一幅作品。

## 18. 暂不做内容

第一版不做：

- 积分
- 优惠券
- 会员等级
- 社区分享流
- 收藏夹
- 复杂地址簿
- 多人协作
- 艺术家聊天
- 站内消息系统

原因：

这些功能会稀释 ViewBrush 的核心体验。个人中心第一阶段应该先让“作品交付确定性”成立。


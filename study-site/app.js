const domains = [
  ["机器学习和 AI 核心知识", 30, "#286fb7", "LLM 基础、Transformer、Embedding、RAG、Prompt、模型选择。"],
  ["软件开发", 24, "#257b5d", "Python/NLP 库、向量数据库、部署、性能、NVIDIA 工具栈。"],
  ["实验", 22, "#b86b12", "A/B 测试、baseline、prompt 评估、模型比较、RLHF。"],
  ["数据分析", 14, "#287c8e", "EDA、清洗、可视化、分类/回归/NLP/RAG 指标。"],
  ["可信 AI", 10, "#b95048", "隐私、同意、偏见、公平、幻觉、解释性、安全、监控。"]
];

const conceptLessons = {
  ml: {
    label: "机器学习基础",
    domain: "机器学习和 AI 核心知识",
    definition: "机器学习是让模型从数据中学习输入和输出之间的规律。认证考试不会要求大量推导，但会要求你判断任务类型、评估方式和常见风险。",
    learn: [
      "监督学习使用带标签数据，常见任务是分类和回归。故障类型识别是分类，零件寿命预测是回归。",
      "无监督学习使用无标签数据，常见任务是聚类、降维和异常检测。传感器异常模式发现就常用无监督思路。",
      "训练集用于学习参数，验证集用于调参，测试集用于最终评估。测试信息进入训练或调参就是数据泄漏。",
      "过拟合是训练集好、测试集差；欠拟合是模型太简单，训练和测试都差。"
    ],
    exam: ["给业务场景判断分类/回归/聚类", "识别过拟合、欠拟合、数据泄漏", "根据类别不平衡选择指标"],
    traps: ["不要只看 accuracy", "验证集不是最终测试集", "高训练分数不代表能上线"],
    practice: "把你做过的一个汽车预测模型写成：任务类型、输入数据、标签、训练/验证/测试划分、主指标、上线风险。"
  },
  transformer: {
    label: "Transformer 与 Attention",
    domain: "机器学习和 AI 核心知识",
    definition: "Transformer 是现代 LLM 的核心架构。它用 self-attention 让每个 token 动态关注上下文中的其他 token。",
    learn: [
      "文本先被 tokenizer 切成 token，再转成 embedding 向量。",
      "Self-attention 为每个 token 生成 Query、Key、Value。Query 与 Key 计算匹配程度，再用权重汇总 Value。",
      "Multi-head attention 并行学习不同关系，例如术语关系、指代关系、因果关系。",
      "Positional encoding 补充顺序信息，因为 attention 本身不天然知道 token 的先后。"
    ],
    exam: ["问 self-attention 的价值", "问 Q/K/V 分别做什么", "问为什么需要 positional encoding"],
    traps: ["Transformer 不等于所有 LLM", "attention 不是只能看相邻 token", "perplexity 低不代表事实一定正确"],
    practice: "用一句维修手册文本，标出每个部件名、故障现象和代词需要关注的上下文词。"
  },
  embedding: {
    label: "Embedding 与向量检索",
    domain: "机器学习和 AI 核心知识",
    definition: "Embedding 把文本、token 或文档片段映射成向量，使语义相似度可以被计算。RAG 和语义搜索都依赖 embedding。",
    learn: [
      "语义相近的文本在向量空间中距离更近，常用 cosine similarity 衡量方向相似度。",
      "文档检索不是关键词完全匹配，而是把问题和文档都转成向量后比较语义接近程度。",
      "向量数据库负责存储 embedding、元数据和相似度索引，不负责生成最终答案。",
      "检索质量取决于文档切分、embedding 模型、top-k、重排和过滤策略。"
    ],
    exam: ["问向量数据库作用", "问 cosine similarity 用在哪里", "问 embedding 在 RAG 中的位置"],
    traps: ["embedding 不是模型理解本身", "向量库不负责生成答案", "top-k 越大不一定越好"],
    practice: "选 5 条汽车故障描述，想象它们在向量空间中哪些应该更接近，并说明理由。"
  },
  rag: {
    label: "RAG 检索增强生成",
    domain: "机器学习和 AI 核心知识",
    definition: "RAG 是 Retrieval-Augmented Generation。它不改模型参数，而是在回答前检索外部知识，把相关内容放进 prompt 中辅助生成。",
    learn: [
      "离线阶段：清洗文档、切分 chunk、生成 embedding、写入向量数据库，并保留来源元数据。",
      "在线阶段：用户问题转向量，检索 top-k 相关片段，可用 reranker 重排。",
      "生成阶段：把检索内容、任务说明、约束和引用格式放进 prompt。",
      "评估阶段：同时看检索 recall@k、回答忠实度、引用质量、延迟和用户反馈。"
    ],
    exam: ["企业知识库、私有资料、最新信息通常选 RAG", "问 RAG 如何降低幻觉", "问 RAG 与 fine-tuning 的区别"],
    traps: ["RAG 不改模型参数", "RAG 不能完全消除幻觉", "检索质量差会拖累生成质量"],
    practice: "为一份维修手册设计 RAG：chunk 大小、元数据字段、top-k、引用格式、幻觉防护。"
  },
  prompt: {
    label: "Prompt Engineering",
    domain: "机器学习和 AI 核心知识",
    definition: "Prompt engineering 是把任务、上下文、约束、示例和输出格式清楚地写给模型，让模型更稳定地完成目标。",
    learn: [
      "Zero-shot 不给示例，适合简单通用任务；few-shot 给示例，适合格式或判断标准需要模仿的任务。",
      "结构化输出要求 JSON、表格或固定字段，适合系统集成。",
      "约束提示可以要求引用来源、禁止编造、无法判断时说明不知道。",
      "高风险任务不能只靠 prompt，还需要 RAG、权限、规则、日志和人工审核。"
    ],
    exam: ["问 zero-shot/few-shot", "问如何提高输出稳定性", "问 prompt 的边界"],
    traps: ["prompt 不是越长越好", "示例质量比数量重要", "prompt 不能替代安全治理"],
    practice: "把“分析汽车故障原因”写成 zero-shot、few-shot、JSON 输出三种 prompt。"
  },
  finetune: {
    label: "Fine-tuning / LoRA / RLHF",
    domain: "机器学习和 AI 核心知识",
    definition: "Fine-tuning、LoRA 和 RLHF 都让模型更适合目标任务，但用途不同：改参数、低成本适配、偏好对齐。",
    learn: [
      "Fine-tuning 用领域或任务数据继续训练模型，适合稳定任务和固定输出风格。",
      "LoRA 冻结大部分模型参数，只训练低秩适配矩阵，成本低、易管理。",
      "RLHF 通过人类偏好训练 reward model，再优化模型输出，使其更符合人类期望。",
      "知识频繁变化优先 RAG；固定格式和风格可考虑 LoRA；安全偏好可考虑 RLHF。"
    ],
    exam: ["问低成本微调选 LoRA", "问人类偏好对齐选 RLHF", "问知识库更新不要误选 fine-tuning"],
    traps: ["LoRA 不是检索", "RLHF 不是事实数据库", "fine-tuning 不适合频繁变化知识"],
    practice: "为维修问答、报告格式生成、客服安全回答分别选择 RAG、LoRA 或 RLHF。"
  },
  metrics: {
    label: "实验指标与评估",
    domain: "实验",
    definition: "指标选择是考试高频。关键是根据任务类型选择指标，并知道每个指标不能说明什么。",
    learn: [
      "分类：precision 看预测为正的有多少真阳性；recall 看真实正例找回多少；F1 平衡二者。",
      "回归：MAE 直观，RMSE 对大误差敏感，R2 表示解释方差比例。",
      "NLP：BLEU 常用于翻译，ROUGE 常用于摘要，perplexity 衡量语言模型预测不确定性。",
      "RAG：retrieval recall@k 看正确资料是否被检索到，faithfulness 看回答是否忠实于上下文。"
    ],
    exam: ["根据任务选择指标", "识别 accuracy 在类别不平衡中的问题", "判断 BLEU/ROUGE/perplexity 的边界"],
    traps: ["BLEU/ROUGE 高不代表事实正确", "perplexity 低不代表无幻觉", "RAG 要同时评估检索和生成"],
    practice: "列出 5 个汽车 AI 任务，为每个任务选择两个主指标和一个风险指标。"
  },
  experiment: {
    label: "实验设计",
    domain: "实验",
    definition: "实验设计是用公平、可重复的方式比较模型、prompt 或系统版本。考试常考 baseline、控制变量和 A/B test。",
    learn: [
      "Baseline 是参照物，没有 baseline 就无法判断新方法是否真的改进。",
      "A/B test 要控制变量，只改变一个关键因素，并使用同一评价指标和样本分布。",
      "Prompt 评估要固定测试集、评分标准、模型版本和随机性参数。",
      "统计结果要关注样本量、方差、置信区间和显著性，不只看一次输出。"
    ],
    exam: ["问两个 prompt 怎么公平比较", "问 baseline 的作用", "问实验泄漏和不公平比较"],
    traps: ["不要每次换问题又换模型", "一次输出不能代表稳定表现", "测试集不能参与调参"],
    practice: "设计一个 A/B test：比较两个维修问答 prompt，写出样本、指标、控制变量和通过标准。"
  },
  software: {
    label: "LLM 应用开发",
    domain: "软件开发",
    definition: "软件开发领域考你是否理解 LLM 应用从数据、检索、模型服务到监控的基本架构。",
    learn: [
      "典型 LLM 应用包括前端、API、模型服务、向量数据库、日志、权限和监控。",
      "延迟 latency 是单次响应时间；吞吐 throughput 是单位时间处理量；batch 和 streaming 会影响体验。",
      "NumPy/pandas 用于数据处理，spaCy 用于基础 NLP，PyTorch/scikit-learn 用于建模。",
      "生产系统需要版本管理、实验记录、错误处理、可观测性和安全策略。"
    ],
    exam: ["问系统组件怎么选", "问延迟和吞吐", "问 Python/NLP 库用途"],
    traps: ["demo 能跑不等于可上线", "日志和监控不是可选项", "向量库不是权限系统"],
    practice: "画出你的 AI 学习平台架构，标出模型服务、数据源、权限、日志和监控。"
  },
  nvidia: {
    label: "NVIDIA 工具栈",
    domain: "软件开发",
    definition: "NVIDIA 工具题通常是场景匹配。你要知道训练、微调、服务、推理优化、数据分析、多 GPU 通信分别选什么。",
    learn: [
      "NeMo：构建、训练、微调和定制生成式 AI/LLM。",
      "NIM：把优化模型封装成推理微服务，适合快速部署 API。",
      "Triton Inference Server：统一服务 PyTorch、TensorFlow、ONNX 等多框架模型。",
      "TensorRT/TensorRT-LLM：优化推理性能，降低延迟、提高吞吐。",
      "RAPIDS：GPU 加速数据科学；CUDA 是 GPU 编程基础；NCCL 做多 GPU 通信；MIG 做 GPU 分区。"
    ],
    exam: ["训练/微调选 NeMo", "推理微服务选 NIM", "服务多框架模型选 Triton", "推理优化选 TensorRT", "GPU 数据科学选 RAPIDS"],
    traps: ["TensorRT 不是训练框架", "Triton 不是数据分析库", "NIM 和 NeMo 定位不同"],
    practice: "看到题目先圈关键词：训练、部署、服务、优化、数据分析、多 GPU，再选工具。"
  },
  data: {
    label: "数据分析",
    domain: "数据分析",
    definition: "数据分析领域考你是否能检查、清洗、理解和可视化数据，并把结果用于模型和实验判断。",
    learn: [
      "EDA 包括查看分布、缺失值、异常值、类别平衡、相关性和数据漂移。",
      "数据清洗包括去重、填补缺失、处理异常、标准化和去除泄漏特征。",
      "可视化用于发现趋势、离群点和变量关系，也用于向业务解释模型结果。",
      "RAPIDS 可把部分 pandas/scikit-learn 风格的数据科学流程迁移到 GPU 加速。"
    ],
    exam: ["问 EDA 应检查什么", "问异常值和缺失值处理", "问 RAPIDS 用途"],
    traps: ["不要在不了解分布时直接训练", "清洗不能泄漏测试信息", "可视化不是装饰，是发现问题的方法"],
    practice: "用一个汽车数据集列出 EDA 检查清单：缺失、异常、分布、类别平衡、相关性。"
  },
  trust: {
    label: "可信 AI",
    domain: "可信 AI",
    definition: "可信 AI 关注模型是否可靠、公平、合规、安全、可解释。考试常给业务场景，让你识别风险和缓解措施。",
    learn: [
      "隐私与同意：数据最小化、授权使用、匿名化、访问控制和审计日志。",
      "偏见与公平：检查数据代表性、类别平衡、分群表现和反馈循环。",
      "幻觉治理：RAG、引用来源、事实校验、拒答策略和人工审核。",
      "安全治理：防 prompt injection、权限隔离、敏感信息过滤、监控和异常告警。"
    ],
    exam: ["问隐私和授权", "问偏见来源", "问如何降低幻觉", "问上线后监控"],
    traps: ["RAG 不能保证无幻觉", "更大模型不自动更公平", "不能忽略数据授权和权限"],
    practice: "为企业内部 AI 助手写 5 条风险和 5 条缓解措施。"
  }
};

const weeks = [
  ["考试范围与 ML 基础", ["ml", "ml", "ml", "metrics", "ml", "metrics", "ml"]],
  ["Transformer 与 Embedding", ["transformer", "transformer", "transformer", "transformer", "embedding", "transformer", "transformer"]],
  ["Prompt Engineering 与 RAG", ["prompt", "prompt", "rag", "rag", "rag", "rag", "prompt"]],
  ["实验设计与评估", ["experiment", "experiment", "metrics", "metrics", "experiment", "metrics", "experiment"]],
  ["软件开发与部署", ["software", "software", "software", "software", "embedding", "software", "software"]],
  ["NVIDIA 工具栈", ["nvidia", "nvidia", "nvidia", "nvidia", "nvidia", "nvidia", "nvidia"]],
  ["可信 AI 与治理", ["trust", "trust", "trust", "trust", "trust", "trust", "trust"]],
  ["模拟考试与错题冲刺", ["metrics", "rag", "nvidia", "transformer", "experiment", "trust", "nvidia"]]
];

const dayTitles = [
  ["读懂考试蓝图", "监督/无监督学习", "数据划分与泄漏", "基础指标", "个人项目转考试语言", "ML 基础练习", "周复盘"],
  ["Token 与 Embedding", "Q/K/V", "Multi-head Attention", "Foundation Model", "语义相似度", "Transformer 流程图", "口述复盘"],
  ["Prompt 结构", "Zero-shot/Few-shot", "RAG 流程", "Chunk 与检索", "无 RAG vs 有 RAG", "RAG vs Fine-tuning", "Prompt/RAG 练习"],
  ["Baseline", "A/B Test", "指标总表", "BLEU/ROUGE/Perplexity", "Prompt 实验", "RAG 评价 Rubric", "实验题训练"],
  ["LLM 应用架构", "Python/NLP 生态", "延迟与吞吐", "版本与监控", "检索脚本思路", "平台治理分析", "开发场景题"],
  ["NeMo", "NIM", "Triton", "TensorRT", "RAPIDS", "CUDA/NCCL/MIG", "工具题训练"],
  ["可信 AI 总览", "幻觉治理", "偏见与公平", "隐私与同意", "风险矩阵", "Guardrails", "可信 AI 题"],
  ["限时模拟 1", "补 RAG 错题", "默写工具栈", "复述核心概念", "限时模拟 2", "错题与闪卡", "考前准备"]
];

const lessonDetails = {
  "w1-d1": {
    focus: "先建立考试地图：知道五大领域、权重、题型和最该优先拿分的部分。",
    lecture: [
      "NCA-GENL 是 Associate 级别认证，重点不是复杂公式，而是能理解生成式 AI/LLM 应用的基本概念、工具选择和实验判断。",
      "五大领域中，机器学习和 AI 核心知识 30%、软件开发 24%、实验 22%，合计 76%，这是前六周学习的重心。",
      "数据分析 14% 和可信 AI 10% 分值较低，但题目多为概念和场景判断，适合用清单式复习稳定拿分。",
      "答题时要从题干中圈关键词：私有知识、最新资料、推理延迟、模型服务、类别不平衡、隐私、幻觉、偏见。"
    ],
    example: "如果题目说“企业内部维修手册经常更新，希望 LLM 回答时引用来源”，关键词是内部资料、更新、引用，优先想到 RAG，而不是 fine-tuning。",
    examDrill: "默写五大领域及权重，并为每个领域写 2 个可能的考题关键词。",
    selfCheck: ["我能说出前三大领域为什么最重要吗？", "我能解释 RAG、TensorRT、F1、隐私这类关键词分别属于哪个领域吗？"]
  },
  "w1-d2": {
    focus: "区分监督学习、无监督学习、分类、回归和聚类。",
    lecture: [
      "监督学习使用带标签数据。输入是特征，输出是已知标签或数值，模型学习二者关系。",
      "分类任务预测离散类别，例如故障类型、是否合格、风险等级；回归任务预测连续数值，例如寿命、温度、扭矩、磨损量。",
      "无监督学习没有标签，常用于发现数据结构，例如聚类、降维、异常检测。",
      "考试常给业务场景让你判断任务类型，而不是要求你推导算法。"
    ],
    example: "预测某零件还能运行多少小时是回归；判断是否会在 7 天内故障是分类；把未知振动模式自动分组是聚类。",
    examDrill: "写出 3 个你工作中可能遇到的汽车数据任务，并标注分类/回归/聚类。",
    selfCheck: ["连续值预测为什么通常是回归？", "没有标签但想发现模式时为什么考虑无监督学习？"]
  },
  "w1-d3": {
    focus: "理解 train/validation/test 的角色，以及数据泄漏为什么危险。",
    lecture: [
      "训练集用于学习模型参数；验证集用于调参和选择模型；测试集只用于最终评估。",
      "数据泄漏是指未来信息、测试信息或标签相关信息进入训练过程，导致离线分数虚高。",
      "时间序列或设备生命周期数据要特别小心，不能把未来数据随机打散进训练集。",
      "认证考试常问：为什么模型线下很好、上线很差？常见答案是过拟合、数据泄漏或数据分布变化。"
    ],
    example: "预测零件故障时，如果训练特征包含“维修后确认的故障代码”，就是把答案提前告诉模型，属于泄漏。",
    examDrill: "为一个零件寿命预测任务设计 train/validation/test 划分方式，说明如何避免同一设备数据跨集合泄漏。",
    selfCheck: ["验证集和测试集区别是什么？", "为什么时间序列数据不适合随意随机切分？"]
  },
  "w1-d4": {
    focus: "掌握分类和回归基础指标，尤其是类别不平衡下的 precision/recall/F1。",
    lecture: [
      "Accuracy 是总体预测正确比例，但在类别不平衡时容易误导。",
      "Precision 回答：模型预测为正的样本里有多少是真的正；适合关注误报成本。",
      "Recall 回答：真实正例中有多少被找出来；适合关注漏报成本。",
      "回归常用 MAE、RMSE、R2。RMSE 对大误差更敏感，MAE 更直观。"
    ],
    example: "故障预警里漏报可能导致停线或安全风险，通常要重点看 recall；如果误报会导致大量无效检修，也要看 precision。",
    examDrill: "给一个故障预警场景，写出为什么不能只看 accuracy，并选择 precision/recall/F1 中最重要的指标。",
    selfCheck: ["漏报高时看哪个指标？", "RMSE 为什么比 MAE 更惩罚大误差？"]
  },
  "w1-d5": {
    focus: "把你已有项目经验转成考试语言：数据、模型、指标、部署、风险。",
    lecture: [
      "考试不是问你是否做过项目，而是问你是否能把项目拆成标准 AI 生命周期。",
      "一个完整项目描述应包含：业务目标、数据来源、标签、特征、模型、评估指标、部署方式、监控和风险。",
      "汽车机械行业经验是优势，因为你能理解数据质量、工况差异、设备差异和安全风险。",
      "把 vibe coding 项目补上工程语言：实验记录、版本、日志、权限、评估集、错误分析。"
    ],
    example: "AI 学习平台可以拆成：用户问题、课程资料库、RAG 检索、LLM 生成、日志监控、权限控制、用户反馈闭环。",
    examDrill: "用 8 句话描述你做过的一个 ML 或 AI 平台项目，每句话对应一个 AI 生命周期环节。",
    selfCheck: ["我的项目主指标是什么？", "如果上线后效果下降，我会监控哪些信号？"]
  },
  "w1-d6": {
    focus: "用题目训练 ML 基础判断，而不是停留在概念记忆。",
    lecture: [
      "基础题常通过业务场景考察你是否能选对任务类型、指标和风险。",
      "做题时先判断任务：分类、回归、聚类、检索、生成、部署、治理。",
      "再判断题目问的是方法、指标、工具还是风险。",
      "最后排除绝对化选项，例如“完全消除幻觉”“一定更公平”“只要模型更大”。"
    ],
    example: "题目说“准确率 99%，但少数故障全部漏报”，不能被 99% 吸引，正确方向是类别不平衡和 recall。",
    examDrill: "完成练习中心中“机器学习和 AI 核心知识”和“数据分析”题目，记录所有错题关键词。",
    selfCheck: ["我做题时是否先圈关键词？", "我能解释每个错误选项为什么错吗？"]
  },
  "w1-d7": {
    focus: "完成第一周复盘，形成自己的错题和弱点列表。",
    lecture: [
      "复盘比继续刷新内容更重要，因为认证考试考的是概念稳定性和场景判断。",
      "把错题按领域归类：ML 基础、指标、数据划分、可信 AI、工具栈。",
      "每个错题都要写出错因：概念不清、关键词没圈、指标混淆、工具定位不清。",
      "第一周结束时，你应该能把自己的汽车项目讲成一个标准 AI 案例。"
    ],
    example: "错因不要写“粗心”，要写“把 recall 和 precision 方向弄反”或“把验证集当成测试集”。",
    examDrill: "建立错题表：题目关键词、你选了什么、正确答案、错因、对应知识点。",
    selfCheck: ["我能复述第一周所有核心术语吗？", "我是否已经有一份个人项目考试化描述？"]
  },
  "w2-d1": {
    focus: "理解 tokenization 和 embedding 是 LLM 处理文本的入口。",
    lecture: [
      "LLM 不直接处理完整汉字或句子，而是先通过 tokenizer 切成 token。",
      "Token 可以是词、子词、字符或符号片段，不同模型 tokenizer 不同。",
      "Embedding 把 token 转成高维向量，向量承载模型可计算的语义和上下文信息。",
      "上下文窗口限制模型一次能处理的 token 数，长文档需要切分或检索。"
    ],
    example: "维修手册里“发动机冷却液温度过高”会被切成若干 token，再转为向量，模型才能计算它与“水温异常”的语义关系。",
    examDrill: "解释 token、embedding、context window 三者关系，并写一个长维修文档为什么需要 chunking 的理由。",
    selfCheck: ["token 和词完全一样吗？", "embedding 为什么能用于语义检索？"]
  },
  "w2-d2": {
    focus: "掌握 Query、Key、Value 的直觉和考试答法。",
    lecture: [
      "在 self-attention 中，每个 token 会生成 Query、Key、Value 三组向量。",
      "Query 表示当前 token 想找什么信息；Key 表示其他 token 提供什么匹配信号；Value 是最终被汇总的信息内容。",
      "Query 与 Key 的相似度决定注意力权重，权重再作用到 Value 上。",
      "考试通常不会要求矩阵计算，但会问 Q/K/V 的作用和 attention 为什么能捕捉上下文。"
    ],
    example: "句子“它导致冷却效率下降”里的“它”需要通过 attention 找到前文可能的“水泵故障”或“散热器堵塞”。",
    examDrill: "用自己的话写出 Q、K、V 三个角色，每个不超过 20 字。",
    selfCheck: ["Query 和 Key 是用来算匹配还是直接生成答案？", "Value 在 attention 中扮演什么角色？"]
  },
  "w2-d3": {
    focus: "理解 multi-head attention 为什么比单头更强。",
    lecture: [
      "单个 attention 头只能从一个表示子空间学习关系，多头可以并行学习多种关系。",
      "不同头可能关注语法关系、指代关系、距离关系、领域术语关系。",
      "多头结果会拼接或合并，再进入后续前馈网络。",
      "考试常把 multi-head attention 的价值表述为“从多个角度捕捉 token 间关系”。"
    ],
    example: "分析一段故障描述时，一个头可能关注部件名，一个头关注症状，一个头关注时间顺序，一个头关注因果词。",
    examDrill: "为一句包含部件、症状、原因的句子，写出 3 个 attention head 可能关注的关系。",
    selfCheck: ["multi-head 是为了并行学习不同关系吗？", "它是否等于多个模型投票？"]
  },
  "w2-d4": {
    focus: "理解 foundation model、pretraining、fine-tuning、instruction tuning。",
    lecture: [
      "Foundation model 是在大规模数据上预训练、可迁移到多种任务的大模型。",
      "Pretraining 学习通用语言、知识和模式，成本高、数据量大。",
      "Fine-tuning 在特定任务或领域数据上继续训练，让模型适配特定输出。",
      "Instruction tuning 让模型更会遵循自然语言指令，是聊天模型可用性的关键步骤之一。"
    ],
    example: "通用 LLM 像受过通识教育的工程师；微调相当于让它学习公司内部报告格式和术语。",
    examDrill: "比较 pretraining、fine-tuning、instruction tuning 的目标和数据规模。",
    selfCheck: ["为什么企业通常不会自己从零预训练 LLM？", "instruction tuning 解决什么问题？"]
  },
  "w2-d5": {
    focus: "理解语义相似度、cosine similarity 和向量检索。",
    lecture: [
      "Embedding 让文本变成向量后，可以通过距离或夹角衡量相似性。",
      "Cosine similarity 衡量两个向量方向是否接近，常用于语义搜索和 RAG 检索。",
      "语义相似不等于关键词相同。'水温过高' 和 '冷却系统异常' 可能很相近。",
      "向量检索结果需要评估，因为语义相近不一定任务相关。"
    ],
    example: "用户问“发动机水温异常怎么办”，向量检索可能找回“冷却液不足”“散热器堵塞”“水泵故障”等相关片段。",
    examDrill: "写出 5 组汽车维修问题，判断哪些语义相似但关键词不同。",
    selfCheck: ["cosine similarity 常用于什么？", "语义相似一定代表答案正确吗？"]
  },
  "w2-d6": {
    focus: "把 Transformer 流程画出来，建立完整心智模型。",
    lecture: [
      "完整流程可简化为：文本 -> token -> embedding + position -> attention -> feed-forward -> 输出概率。",
      "Attention 负责上下文关系建模，feed-forward 负责非线性变换和特征组合。",
      "多层堆叠让模型从低级模式逐步形成高级语义表示。",
      "生成时模型通常逐 token 预测下一个 token，直到满足停止条件。"
    ],
    example: "故障问答不是一次性吐出整段文字，而是模型根据上下文一步步预测后续 token。",
    examDrill: "手动画一个 Transformer 简化流程图，并标出 tokenization、embedding、attention、output。",
    selfCheck: ["位置编码在流程中在哪里？", "生成模型是如何逐 token 输出的？"]
  },
  "w2-d7": {
    focus: "用 3 分钟口述 Transformer，训练考试表达能力。",
    lecture: [
      "口述时先说定义，再说流程，最后说考试易错点。",
      "推荐结构：Transformer 用 attention 处理上下文；文本先 token 化和 embedding；Q/K/V 计算权重；多头学习不同关系；位置编码补顺序。",
      "不要陷入公式，Associate 级别更重视概念和应用判断。",
      "能讲清楚，选择题就不容易被干扰项带走。"
    ],
    example: "把 Transformer 类比成工程诊断会议：每个症状都会参考其他传感器和维修记录，多位专家从不同角度关注不同关系。",
    examDrill: "录音 3 分钟解释 Transformer，然后检查是否覆盖 token、embedding、attention、Q/K/V、position。",
    selfCheck: ["我能不用公式解释 attention 吗？", "我能说出两个常见误区吗？"]
  },
  "w3-d1": {
    focus: "掌握 prompt 的基本结构：角色、任务、上下文、约束、输出格式。",
    lecture: [
      "一个可控 prompt 通常包含 role、task、context、constraints、output format。",
      "角色让模型采用合适视角；任务定义要完成什么；上下文提供事实；约束降低风险；格式方便解析。",
      "越是生产场景，越要明确禁止编造、要求引用来源、规定不知道时怎么回答。",
      "Prompt 是控制层，不是知识库，也不是权限系统。"
    ],
    example: "“你是汽车质量工程师。基于以下维修记录，输出故障现象、可能原因、验证步骤、风险等级。不要编造未给出的事实。”",
    examDrill: "把一个随意提问改写为结构化 prompt，包含 5 个组成部分。",
    selfCheck: ["prompt 的上下文和约束有什么区别？", "为什么要规定输出格式？"]
  },
  "w3-d2": {
    focus: "区分 zero-shot、few-shot 和结构化输出。",
    lecture: [
      "Zero-shot 直接给任务不给示例，适合模型已熟悉的通用任务。",
      "Few-shot 给少量示例，帮助模型模仿格式、风格或判断标准。",
      "结构化输出要求模型按 JSON、表格或固定字段输出，便于系统自动处理。",
      "Few-shot 示例要高质量、覆盖边界情况，不是越多越好。"
    ],
    example: "让模型判断故障等级时，可以给 2-3 个已标注案例，帮助它学习公司内部等级标准。",
    examDrill: "为“质量问题分类”写一个 zero-shot prompt 和一个 few-shot prompt。",
    selfCheck: ["few-shot 的示例作用是什么？", "什么时候更适合结构化输出？"]
  },
  "w3-d3": {
    focus: "掌握 RAG 从文档到回答的完整链路。",
    lecture: [
      "RAG 的核心是检索外部资料再生成答案，适合企业知识库、最新资料和可追溯问答。",
      "离线处理包括文档清洗、切分、embedding、索引和元数据管理。",
      "在线回答包括 query embedding、top-k 检索、重排、prompt 组装和生成。",
      "RAG 的价值是降低重训成本、引入外部知识、改善事实依据。"
    ],
    example: "维修手册、质量 8D 报告、试验规范都可以作为 RAG 知识源，但需要去敏和版本管理。",
    examDrill: "画出 RAG 8 步流程，并标出每一步可能出错的地方。",
    selfCheck: ["RAG 是否更新模型参数？", "向量数据库在 RAG 中做什么？"]
  },
  "w3-d4": {
    focus: "理解 chunk、top-k、rerank 和检索质量。",
    lecture: [
      "Chunk 太小可能丢上下文，太大可能引入噪声并挤占上下文窗口。",
      "Top-k 决定取回多少片段，太少可能漏资料，太多可能让模型混乱。",
      "Reranker 可在初步检索后重新排序，提高片段相关性。",
      "保留元数据可支持来源引用、权限过滤和版本追踪。"
    ],
    example: "维修手册可按章节、故障码、部件或步骤切分；不能把整本手册塞进一个 chunk。",
    examDrill: "为“发动机过热”知识库设计 chunk 策略和 top-k 初始值，并说明理由。",
    selfCheck: ["chunk 大小会影响哪些方面？", "rerank 的目的是什么？"]
  },
  "w3-d5": {
    focus: "比较无 RAG 与有 RAG 的回答质量。",
    lecture: [
      "无 RAG 时，模型主要依赖训练时学到的通用知识，容易缺少企业内部事实。",
      "有 RAG 时，模型可以基于检索片段回答，并引用来源。",
      "RAG 能降低幻觉，但如果检索片段错误或无关，生成仍可能错误。",
      "评价 RAG 要看回答是否忠实于资料，而不只是语言是否流畅。"
    ],
    example: "问“某车型 P0128 故障处理步骤”，无 RAG 可能给通用建议，有 RAG 可以引用公司维修规范。",
    examDrill: "写一组同样问题下无 RAG 和有 RAG 的预期差异。",
    selfCheck: ["RAG 为什么能降低幻觉？", "RAG 为什么不能保证完全正确？"]
  },
  "w3-d6": {
    focus: "准确区分 RAG、fine-tuning、LoRA 和 RLHF。",
    lecture: [
      "RAG 改输入上下文，不改模型参数；适合知识经常变化。",
      "Fine-tuning 改模型参数；适合固定任务、固定格式和领域表达。",
      "LoRA 是低成本 fine-tuning，训练少量适配参数。",
      "RLHF 通过人类偏好做对齐，主要改善输出偏好和安全性。"
    ],
    example: "维修资料每天更新用 RAG；报告格式固定可用 LoRA；客服回答要更安全可用 RLHF 思路。",
    examDrill: "看到 6 个业务场景，分别选择 RAG、LoRA、fine-tuning 或 RLHF，并写理由。",
    selfCheck: ["哪种方法不改模型参数？", "LoRA 和 RLHF 解决的是同一个问题吗？"]
  },
  "w3-d7": {
    focus: "用 Prompt/RAG 题巩固应用判断。",
    lecture: [
      "Prompt 题通常问如何让输出更稳定、更符合格式或更少编造。",
      "RAG 题通常问企业知识、引用、最新资料和减少幻觉。",
      "干扰项常是“增大模型”“提高 temperature”“重新训练所有模型”。",
      "答题时先判断问题是知识缺失、格式控制、部署性能还是安全治理。"
    ],
    example: "“回答必须来自公司手册并给出处”是 RAG；“输出必须是 JSON”是 prompt；“延迟太高”是推理优化。",
    examDrill: "练习中心筛选机器学习和 AI 核心知识题，错题回到 Prompt/RAG 概念课本。",
    selfCheck: ["我能区分知识问题和格式问题吗？", "我能识别 temperature 干扰项吗？"]
  },
  "w4-d1": {
    focus: "理解 baseline 是所有实验比较的参照物。",
    lecture: [
      "Baseline 是当前方法、简单方法或上一版本系统，用来判断新模型、新 prompt 或新检索策略是否真的改进。",
      "没有 baseline 的实验只能说明某个方案看起来不错，不能说明它比原方案更好。",
      "LLM 应用中 baseline 可以是无 RAG 回答、旧 prompt、旧 embedding 模型、人工规则或现有客服流程。",
      "考试常问“如何比较模型表现”，正确思路是先设 baseline、固定测试集、选指标。"
    ],
    example: "评估维修问答助手时，可把“旧 prompt + 无引用”作为 baseline，再比较“RAG + 引用”的准确性和幻觉率。",
    examDrill: "为一个内部知识库问答系统设计 2 个 baseline，并说明每个 baseline 能回答什么问题。",
    selfCheck: ["没有 baseline 为什么无法证明改进？", "baseline 一定要是复杂模型吗？"]
  },
  "w4-d2": {
    focus: "掌握 A/B test 的控制变量和评价原则。",
    lecture: [
      "A/B test 是把用户或样本分成两组，只改变一个关键因素，对比同一指标。",
      "比较两个 prompt 时，应保持模型、测试集、temperature、检索配置和评分标准一致。",
      "线上 A/B 要注意样本量、用户分层、时间窗口和业务指标；离线 A/B 要注意题集代表性。",
      "一次随机输出不能作为结论，需要多样本、多轮次和稳定评分。"
    ],
    example: "比较两个故障分析 prompt 时，不应同时更换模型和知识库，否则无法判断提升来自哪里。",
    examDrill: "写一份 prompt A/B test 方案：样本、变量、指标、通过标准、风险。",
    selfCheck: ["A/B test 为什么要控制变量？", "比较 prompt 时哪些参数要固定？"]
  },
  "w4-d3": {
    focus: "建立任务类型到指标的总表。",
    lecture: [
      "分类任务看 accuracy、precision、recall、F1；类别不平衡时重点看 precision/recall/F1。",
      "回归任务看 MAE、RMSE、R2，选择时要考虑是否更惩罚大误差。",
      "NLP 任务中，BLEU 常用于翻译，ROUGE 常用于摘要，perplexity 衡量语言模型预测不确定性。",
      "检索和 RAG 要同时评价 retrieval 与 generation，不能只看最终文字是否流畅。"
    ],
    example: "零件寿命预测用 MAE/RMSE；故障预警用 recall/F1；维修摘要用 ROUGE；维修问答 RAG 用 recall@k 和 faithfulness。",
    examDrill: "制作一张“任务 -> 指标 -> 不足”的表，至少覆盖 8 个任务。",
    selfCheck: ["BLEU 与 ROUGE 分别适合什么？", "RAG 为什么不能只看生成答案？"]
  },
  "w4-d4": {
    focus: "深入理解 BLEU、ROUGE、perplexity 的含义和边界。",
    lecture: [
      "BLEU 基于 n-gram 重合，常用于机器翻译，能衡量与参考译文的表面相似度。",
      "ROUGE 常用于摘要，关注生成摘要与参考摘要的重合，特别是召回相关的重合。",
      "Perplexity 衡量语言模型预测下一个 token 的不确定性，越低通常表示越确定。",
      "这些自动指标不能充分证明事实正确、逻辑正确或业务可用。"
    ],
    example: "一个维修摘要 ROUGE 高，可能只是用了相同词汇，但仍可能遗漏关键安全步骤。",
    examDrill: "为翻译、摘要、语言模型、RAG 问答分别选指标，并写一个指标局限。",
    selfCheck: ["perplexity 低是否等于无幻觉？", "BLEU 高是否等于语义完全正确？"]
  },
  "w4-d5": {
    focus: "设计 prompt 实验，而不是凭感觉改 prompt。",
    lecture: [
      "Prompt 实验应有固定测试集，覆盖普通问题、边界问题、误导问题和无法回答问题。",
      "评分标准可以包括准确性、完整性、引用质量、格式稳定性、安全性和延迟。",
      "要记录 prompt 版本、模型版本、检索配置和生成参数，便于复现。",
      "人工评分最好使用 rubric，减少主观波动。"
    ],
    example: "维修问答 prompt 可评分：是否引用手册、是否列验证步骤、是否避免臆测、是否输出风险等级。",
    examDrill: "为两个 prompt 设计 10 条测试问题和 5 个评分维度。",
    selfCheck: ["prompt 实验为什么需要固定测试集？", "rubric 有什么作用？"]
  },
  "w4-d6": {
    focus: "为 RAG 系统设计评价 rubric。",
    lecture: [
      "RAG 评价要拆成检索和生成两个阶段：先看有没有找对资料，再看回答是否忠实使用资料。",
      "检索指标包括 recall@k、precision@k、MRR、nDCG；生成指标包括 faithfulness、answer relevance、citation correctness。",
      "业务指标也重要，例如平均响应时间、用户满意度、人工升级率、错误答案率。",
      "高质量 rubric 能帮助你发现是检索问题、prompt 问题还是模型生成问题。"
    ],
    example: "如果正确维修步骤没被检索到，是 retrieval 问题；如果检索到了但回答编造，是 generation/faithfulness 问题。",
    examDrill: "写一个 RAG 评价表：检索 3 项、生成 3 项、业务 2 项。",
    selfCheck: ["faithfulness 衡量什么？", "recall@k 解决什么问题？"]
  },
  "w4-d7": {
    focus: "用实验题训练模型比较和指标选择。",
    lecture: [
      "实验题常以“哪个模型更好”“哪个 prompt 更稳定”“哪个指标更合适”出现。",
      "先判断任务类型，再判断指标是否能反映目标，最后检查实验是否公平。",
      "如果题目中测试集、参数、样本分布都不同，结论通常不可靠。",
      "如果题目说“只看一次输出”，通常不是严谨评估。"
    ],
    example: "两个模型在不同数据集上 BLEU 不同，不能直接说明一个模型更好。",
    examDrill: "练习中心筛选“实验”题，错题回到 Baseline、A/B test、指标课程。",
    selfCheck: ["我能识别不公平实验吗？", "我能为每类任务选主指标吗？"]
  },
  "w5-d1": {
    focus: "理解 LLM 应用的生产架构。",
    lecture: [
      "典型 LLM 应用包括前端、后端 API、模型服务、向量数据库、业务数据库、日志、监控和权限系统。",
      "RAG 应用还需要文档处理管道，包括解析、清洗、chunk、embedding、索引和版本更新。",
      "生产系统要处理错误、超时、重试、限流、缓存和审计。",
      "考试常问你根据需求选择系统组件，而不是写代码细节。"
    ],
    example: "AI 学习平台可以拆成用户界面、课程资料库、检索服务、LLM API、用户行为日志和权限控制。",
    examDrill: "画一张 LLM 应用架构图，标出数据流和安全边界。",
    selfCheck: ["向量库和业务数据库分别存什么？", "为什么生产系统需要日志和监控？"]
  },
  "w5-d2": {
    focus: "认识 Python/NLP 常见库在考试中的定位。",
    lecture: [
      "NumPy 负责数值计算，pandas 负责表格数据处理和清洗。",
      "spaCy 常用于传统 NLP 处理，例如 tokenization、词性、命名实体识别。",
      "scikit-learn 常用于传统机器学习建模和评估；PyTorch 常用于深度学习模型。",
      "考试通常考库的用途和适用场景，不要求写完整代码。"
    ],
    example: "处理质量数据用 pandas，做故障分类基线用 scikit-learn，做深度学习实验用 PyTorch，抽取文本实体可用 spaCy。",
    examDrill: "为 6 个任务选择合适 Python 库，并说明原因。",
    selfCheck: ["pandas 和 RAPIDS cuDF 的关系是什么？", "spaCy 主要用于什么？"]
  },
  "w5-d3": {
    focus: "区分 latency、throughput、batch inference 和 streaming。",
    lecture: [
      "Latency 是单个请求从发出到得到响应的时间，影响用户等待体验。",
      "Throughput 是单位时间处理的请求数或 token 数，影响系统承载能力。",
      "Batch inference 把多个请求合并处理，可提高吞吐，但可能增加单个请求等待。",
      "Streaming 逐步返回 token，不能一定缩短总生成时间，但能改善感知响应速度。"
    ],
    example: "维修问答助手希望用户尽快看到开头内容，可用 streaming；夜间批量总结报告可用 batch。",
    examDrill: "给 4 个场景分别判断更关注 latency、throughput、batch 还是 streaming。",
    selfCheck: ["吞吐和延迟是否是一回事？", "streaming 解决的是总时间还是感知体验？"]
  },
  "w5-d4": {
    focus: "理解版本、监控和可观测性。",
    lecture: [
      "模型、prompt、embedding 模型、知识库和检索参数都需要版本管理。",
      "监控包括系统指标、模型质量指标、用户反馈、异常输出和数据漂移。",
      "日志用于复盘问题，但要避免记录敏感信息或违反隐私要求。",
      "上线后的模型会遇到数据变化、用户行为变化和知识过期。"
    ],
    example: "如果某天回答质量下降，需要知道是否换了 prompt、更新了手册、换了 embedding 模型或检索配置。",
    examDrill: "列出 LLM 应用上线后需要监控的 10 个信号。",
    selfCheck: ["为什么 prompt 也要版本管理？", "日志和隐私如何平衡？"]
  },
  "w5-d5": {
    focus: "把文档切分、embedding、相似度检索串成脚本思路。",
    lecture: [
      "最小 RAG 管道可分为：读取文档、切分文本、生成 embedding、保存向量、查询检索。",
      "切分要保留标题、章节、来源、日期等元数据，便于引用和权限控制。",
      "查询时先把用户问题转 embedding，再取 top-k 片段组装 prompt。",
      "脚本只是 demo，生产还需要增量更新、异常处理和安全控制。"
    ],
    example: "维修手册每个故障码一个 chunk，并记录车型、年份、章节、页码，回答时引用这些元数据。",
    examDrill: "写伪代码描述 RAG 文档处理管道，不要求真实运行。",
    selfCheck: ["为什么元数据重要？", "demo 管道和生产管道差在哪里？"]
  },
  "w5-d6": {
    focus: "分析 AI 学习平台的权限、日志和监控。",
    lecture: [
      "学习平台可能包含员工信息、学习记录、内部资料和模型对话日志，需要权限控制。",
      "不同角色应看到不同资料，例如普通员工、讲师、管理员、外部供应商权限不同。",
      "日志应帮助改进课程和排查错误，但要避免泄露个人信息。",
      "监控不仅看系统是否可用，还看回答质量、搜索失败率和用户反馈。"
    ],
    example: "供应商不应访问内部质量事故复盘；普通员工不应看到他人的学习记录。",
    examDrill: "为 AI 学习平台设计 4 类角色和对应权限。",
    selfCheck: ["权限控制属于软件开发还是可信 AI？", "哪些日志字段可能敏感？"]
  },
  "w5-d7": {
    focus: "用开发场景题巩固架构和部署判断。",
    lecture: [
      "软件开发题常问：选哪个组件、如何部署、如何优化性能、如何监控。",
      "看到“多框架模型服务”想到 Triton；看到“推理优化”想到 TensorRT；看到“微服务部署”想到 NIM。",
      "看到“数据处理加速”想到 RAPIDS；看到“多 GPU 通信”想到 NCCL。",
      "架构题不要只看模型，也要考虑数据、权限、监控和评估。"
    ],
    example: "“公司有 PyTorch 和 ONNX 模型，希望统一服务”对应 Triton，而不是 NeMo。",
    examDrill: "练习中心筛选软件开发题，错题按工具/架构/性能归类。",
    selfCheck: ["我能根据场景选工具吗？", "我能区分服务和优化吗？"]
  },
  "w6-d1": {
    focus: "掌握 NeMo 的定位：构建和定制生成式 AI 模型。",
    lecture: [
      "NeMo 是 NVIDIA 面向生成式 AI 和 LLM 的训练、微调、定制框架。",
      "它适合模型构建、领域适配、微调、LoRA 等训练侧任务。",
      "考试中看到“训练、微调、定制模型”通常优先考虑 NeMo。",
      "NeMo 不是模型服务工具，也不是单纯推理优化引擎。"
    ],
    example: "想让模型学习公司内部报告风格并做 LoRA 适配，NeMo 比 Triton 更贴近题意。",
    examDrill: "写出 3 个适合 NeMo 的场景和 2 个不适合 NeMo 的场景。",
    selfCheck: ["NeMo 是训练侧还是服务侧？", "NeMo 和 NIM 的区别是什么？"]
  },
  "w6-d2": {
    focus: "掌握 NIM 的定位：推理微服务和快速部署。",
    lecture: [
      "NIM 是 NVIDIA Inference Microservices，用于把优化后的模型以微服务形式部署。",
      "它强调快速上线、标准 API、容器化部署和生产推理。",
      "考试中看到“部署推理 API”“模型微服务”“快速上线”通常考虑 NIM。",
      "NIM 不是训练框架，不能替代 NeMo 做模型微调。"
    ],
    example: "把一个已选好的 LLM 部署成企业内部问答 API，更接近 NIM 场景。",
    examDrill: "比较 NIM、Triton、TensorRT：分别写一句用途。",
    selfCheck: ["NIM 解决训练还是部署？", "NIM 和 Triton 是否完全一样？"]
  },
  "w6-d3": {
    focus: "掌握 Triton Inference Server 的定位：统一模型服务。",
    lecture: [
      "Triton 支持多框架模型服务，例如 PyTorch、TensorFlow、ONNX、TensorRT。",
      "它适合生产推理、动态批处理、并发请求和统一 serving。",
      "考试中看到“多框架模型”“统一服务”“生产推理服务器”通常考虑 Triton。",
      "Triton 负责服务模型，不负责数据分析，也不是专门的训练框架。"
    ],
    example: "公司同时有传统视觉模型和文本模型，希望统一部署管理，Triton 是合理选择。",
    examDrill: "写出 Triton 与 TensorRT 的差别：一个服务，一个优化。",
    selfCheck: ["Triton 支持多框架吗？", "Triton 是否主要用于 EDA？"]
  },
  "w6-d4": {
    focus: "掌握 TensorRT/TensorRT-LLM 的定位：推理优化。",
    lecture: [
      "TensorRT 用于优化神经网络推理，提高吞吐、降低延迟。",
      "TensorRT-LLM 面向大语言模型推理优化，涉及 kernel、量化、并行和缓存等优化方向。",
      "考试中看到“降低延迟”“提高吞吐”“推理优化”通常考虑 TensorRT。",
      "TensorRT 不负责训练模型，也不负责知识库检索。"
    ],
    example: "维修问答响应太慢，且瓶颈在 LLM 推理，可以考虑 TensorRT-LLM 方向。",
    examDrill: "列出 3 个推理优化目标：延迟、吞吐、成本，并说明业务意义。",
    selfCheck: ["TensorRT 是训练工具吗？", "推理优化和模型服务有什么区别？"]
  },
  "w6-d5": {
    focus: "掌握 RAPIDS 的定位：GPU 加速数据科学。",
    lecture: [
      "RAPIDS 是 GPU 加速数据科学库集合，cuDF 类似 pandas，cuML 类似 scikit-learn。",
      "它适合大规模数据处理、EDA、特征工程和传统机器学习加速。",
      "考试中看到“GPU 加速数据分析”“加速 pandas/scikit-learn 工作流”通常考虑 RAPIDS。",
      "RAPIDS 不负责 LLM 推理微服务，也不是 prompt 工程工具。"
    ],
    example: "处理大量车辆传感器数据并做特征工程，可考虑 RAPIDS 加速。",
    examDrill: "把 pandas、scikit-learn、cuDF、cuML 的关系写成对照表。",
    selfCheck: ["RAPIDS 适合推理服务吗？", "cuDF 和 pandas 定位有什么相似？"]
  },
  "w6-d6": {
    focus: "掌握 CUDA、NCCL、MIG 的基础定位。",
    lecture: [
      "CUDA 是 NVIDIA GPU 通用计算平台和编程模型，是许多 GPU 加速库的基础。",
      "NCCL 是多 GPU/多节点通信库，常用于分布式训练中的 AllReduce 等通信。",
      "MIG 可把一块 GPU 切分成多个隔离实例，提高资源利用和隔离性。",
      "考试通常考定位，不要求写 CUDA 代码。"
    ],
    example: "多 GPU 训练通信瓶颈可能涉及 NCCL；多个团队共享 A100/H100 资源可能涉及 MIG。",
    examDrill: "为 CUDA、NCCL、MIG 各写一个关键词和一个应用场景。",
    selfCheck: ["NCCL 是做通信还是做推理优化？", "MIG 的核心价值是什么？"]
  },
  "w6-d7": {
    focus: "用工具题训练 NVIDIA 生态快速匹配。",
    lecture: [
      "工具题先圈场景关键词：训练、微调、部署、服务、优化、数据分析、多 GPU。",
      "训练/微调选 NeMo；推理微服务选 NIM；统一模型服务选 Triton；推理优化选 TensorRT；数据科学选 RAPIDS；多 GPU 通信选 NCCL；GPU 分区选 MIG。",
      "不要被 NVIDIA 名词迷惑，先判断任务发生在 AI 生命周期的哪个阶段。",
      "考试中工具题通常不需要安装经验，而需要定位清晰。"
    ],
    example: "“部署多个框架模型”不是 TensorRT，而是 Triton；“降低 LLM 延迟”才是 TensorRT-LLM。",
    examDrill: "默写工具速查表，并做练习中心软件开发题。",
    selfCheck: ["我能 10 秒内区分 NeMo/NIM/Triton/TensorRT 吗？", "我能解释 RAPIDS 和 NCCL 的区别吗？"]
  },
  "w7-d1": {
    focus: "建立可信 AI 总览：可靠、公平、合规、安全、可解释。",
    lecture: [
      "可信 AI 不是单一技术，而是一组治理目标：隐私、同意、公平、透明、解释、安全和监控。",
      "LLM 风险包括幻觉、偏见、敏感信息泄露、prompt injection、错误建议和不可追溯。",
      "考试通常给场景让你选择风险缓解措施，而不是讨论抽象伦理。",
      "可信 AI 贯穿数据、训练、部署、监控和用户反馈全过程。"
    ],
    example: "企业内部 AI 助手如果能访问质量事故资料和员工信息，就必须同时考虑权限、隐私、审计和回答安全。",
    examDrill: "列出一个 AI 助手的 8 个风险，并按隐私、偏见、幻觉、安全分类。",
    selfCheck: ["可信 AI 只是在模型训练阶段考虑吗？", "LLM 幻觉为什么是可信 AI 风险？"]
  },
  "w7-d2": {
    focus: "掌握幻觉治理：RAG、引用、校验、拒答和人工审核。",
    lecture: [
      "幻觉是模型生成看似合理但没有事实依据或事实错误的内容。",
      "RAG 通过提供外部证据降低幻觉，但不能保证完全消除。",
      "引用来源、事实校验、限制回答范围、拒答策略和人工审核都能降低风险。",
      "高风险场景中，模型应说明不确定性，而不是编造维修建议。"
    ],
    example: "如果资料中没有某车型维修步骤，助手应回答无法根据资料确认，而不是套用其他车型经验。",
    examDrill: "为维修问答系统写 5 条防幻觉规则。",
    selfCheck: ["RAG 是否能完全消除幻觉？", "为什么引用来源有助于可信度？"]
  },
  "w7-d3": {
    focus: "理解偏见、公平和数据代表性。",
    lecture: [
      "偏见可能来自训练数据、标签、采样方式、特征选择和反馈循环。",
      "公平性要求模型在不同群体、工况、车型或供应商上表现不能系统性失衡。",
      "数据代表性不足会导致模型在少数场景表现差，例如少见故障、极端工况或小批量车型。",
      "评估时应分群查看指标，而不是只看总体平均分。"
    ],
    example: "如果训练数据主要来自一种车型，模型可能无法可靠处理另一种车型的故障模式。",
    examDrill: "为一个故障预测模型设计 4 个分群评估维度。",
    selfCheck: ["总体准确率高是否代表每个群体都公平？", "数据代表性为什么重要？"]
  },
  "w7-d4": {
    focus: "掌握隐私、同意、匿名化、最小化收集和访问控制。",
    lecture: [
      "隐私治理包括明确数据用途、获得授权、最小化收集、去标识化和访问控制。",
      "LLM 应用中，用户输入、对话日志、检索资料和输出都可能包含敏感信息。",
      "日志要服务于监控和改进，但不应无限制保留敏感内容。",
      "权限控制应确保用户只能检索和生成自己有权访问的资料。"
    ],
    example: "员工学习记录、供应商质量问题、未公开车型资料都可能是敏感数据。",
    examDrill: "为 AI 学习平台写一个隐私检查清单。",
    selfCheck: ["数据最小化是什么意思？", "为什么 RAG 也需要权限过滤？"]
  },
  "w7-d5": {
    focus: "为企业 AI 助手建立风险矩阵。",
    lecture: [
      "风险矩阵通常按可能性和影响程度评估风险优先级。",
      "LLM 风险可以分为数据风险、模型风险、输出风险、系统风险和合规风险。",
      "每个风险都应有缓解措施、负责人和监控信号。",
      "考试中选择缓解措施时，要匹配具体风险：隐私用权限和匿名化，幻觉用 RAG 和校验，偏见用分群评估。"
    ],
    example: "错误维修建议影响高、可能性中等，应设置人工审核或明确免责声明与升级流程。",
    examDrill: "写一个 5 行风险矩阵：风险、影响、可能性、缓解、监控。",
    selfCheck: ["缓解措施是否要匹配风险类型？", "为什么只写原则不够？"]
  },
  "w7-d6": {
    focus: "设计 guardrails：输入、检索、生成和输出后处理。",
    lecture: [
      "Guardrails 是系统约束，不只是 prompt，包括输入过滤、权限校验、检索过滤、输出检查和人工升级。",
      "输入层防止 prompt injection、敏感信息提交和越权请求。",
      "检索层确保只取用户有权访问的资料，生成层限制引用和回答范围。",
      "输出层检查敏感信息、危险建议、未引用事实和不确定性表达。"
    ],
    example: "维修助手不应输出可能导致安全事故的未经验证操作，应要求参考官方手册或升级给专家。",
    examDrill: "为企业维修问答助手设计 8 条 guardrails。",
    selfCheck: ["guardrails 只是 prompt 吗？", "为什么检索层也要做权限过滤？"]
  },
  "w7-d7": {
    focus: "用可信 AI 场景题训练风险识别。",
    lecture: [
      "可信 AI 题常以“以下做法哪项最合适/最不合适”出现。",
      "优先选择数据最小化、授权同意、访问控制、审计、引用来源、监控和人工审核。",
      "警惕绝对化选项，例如“完全消除偏见”“开放所有数据”“只靠更大模型”。",
      "把风险类型和措施匹配，是做题关键。"
    ],
    example: "处理员工信息时，正确方向是授权、最小化、匿名化、访问控制，而不是提高 temperature。",
    examDrill: "练习中心筛选可信 AI 题，并为每道题写风险类型。",
    selfCheck: ["我能把风险归类到隐私/偏见/幻觉/安全吗？", "我能识别明显不合规做法吗？"]
  },
  "w8-d1": {
    focus: "完成第一次限时模拟，建立考试节奏。",
    lecture: [
      "60 分钟 50-60 题意味着每题约 1 分钟，不能在单题上停留太久。",
      "第一遍先拿稳概念题和工具题，难题标记后回看。",
      "模拟后不要只看分数，要按领域统计错题。",
      "错题优先级：高权重领域错题 > 高频工具题 > 可信 AI 概念题。"
    ],
    example: "如果软件开发工具题错得多，Week 6 工具速查表要立刻复习。",
    examDrill: "用练习中心完成一轮全领域题，并把错题按五大领域分类。",
    selfCheck: ["我是否能控制每题时间？", "我是否知道哪个领域最弱？"]
  },
  "w8-d2": {
    focus: "补 RAG 错题，确保高频应用题稳定拿分。",
    lecture: [
      "RAG 高频考点包括：不改参数、外部知识、向量检索、chunk、top-k、引用、降低幻觉。",
      "错题常来自把 RAG 和 fine-tuning 混淆，或误以为 RAG 能完全消除幻觉。",
      "复习时按流程记忆：文档 -> chunk -> embedding -> vector DB -> retrieval -> prompt -> generation -> evaluation。",
      "RAG 应用题要同时考虑检索质量和生成质量。"
    ],
    example: "企业知识库更新频繁，不应优先从头训练模型；应考虑 RAG 或更新索引。",
    examDrill: "默写 RAG 流程，并做所有 RAG 相关题。",
    selfCheck: ["RAG 与 fine-tuning 的区别能秒答吗？", "我能解释 top-k 和 chunk 风险吗？"]
  },
  "w8-d3": {
    focus: "默写 NVIDIA 工具栈，形成快速匹配反射。",
    lecture: [
      "最后阶段工具题必须做到关键词反射：训练 NeMo、微服务 NIM、模型服务 Triton、推理优化 TensorRT、数据科学 RAPIDS。",
      "CUDA 是底层 GPU 计算基础，NCCL 是多 GPU 通信，MIG 是 GPU 分区。",
      "工具题的干扰项通常都是真工具，但生命周期阶段不对。",
      "答题时先判断场景发生在训练、部署、优化、数据分析还是资源管理阶段。"
    ],
    example: "“提高 LLM 推理吞吐”不是 NeMo；“定制 LLM”不是 TensorRT。",
    examDrill: "闭眼默写 8 个工具及一句用途，再核对。",
    selfCheck: ["NeMo/NIM/Triton/TensorRT 我能区分吗？", "RAPIDS/NCCL/MIG 各自关键词是什么？"]
  },
  "w8-d4": {
    focus: "复述核心概念，训练口头解释能力。",
    lecture: [
      "能讲清楚概念，选择题就不容易被相似选项迷惑。",
      "复述顺序建议：Transformer -> Embedding -> RAG -> Prompt -> LoRA/RLHF -> 指标 -> 工具 -> 可信 AI。",
      "每个概念用三句话：是什么、解决什么、易错点是什么。",
      "不要背长定义，要背考试判断规则。"
    ],
    example: "RAG：检索增强生成；解决企业知识和最新知识；不改参数且不能完全消除幻觉。",
    examDrill: "录音 10 分钟讲 8 个核心概念，每个概念不超过 1 分钟。",
    selfCheck: ["我能不用资料解释每个概念吗？", "我能说出每个概念的易错点吗？"]
  },
  "w8-d5": {
    focus: "完成第二次限时模拟，验证补弱效果。",
    lecture: [
      "第二次模拟要接近真实考试节奏：不开资料、计时、一次完成。",
      "先做自己最稳的题，标记不确定题，最后集中回看。",
      "如果同一领域仍然连续出错，考前两天只补这个领域，不再泛泛学习。",
      "目标不是满分，而是把高权重和高频题稳定拿下。"
    ],
    example: "如果工具题仍混淆，最后 48 小时反复看工具速查，不再扩展新论文或新框架。",
    examDrill: "完成第二轮全领域题，比较第一次和第二次错题分布。",
    selfCheck: ["我的弱项是否减少？", "我是否能按 60 分钟节奏完成？"]
  },
  "w8-d6": {
    focus: "只看错题和闪卡，停止扩展新知识。",
    lecture: [
      "考前最后两天不适合打开新主题，容易增加焦虑和混淆。",
      "复习错题时只问三件事：题干关键词、正确判断规则、干扰项为什么错。",
      "闪卡用于保持术语反射，尤其是工具、指标、RAG 和可信 AI。",
      "对仍不稳定的概念，用一句话口诀固定下来。"
    ],
    example: "“BLEU 翻译、ROUGE 摘要、perplexity 语言模型不确定性”就是考前口诀。",
    examDrill: "重做所有错题，只保留仍错的题作为最后清单。",
    selfCheck: ["我是否停止学习新内容？", "每道错题是否都有明确错因？"]
  },
  "w8-d7": {
    focus: "完成考前准备和最终心态校准。",
    lecture: [
      "确认考试时间、地点、证件、交通和报名信息，避免非知识因素影响发挥。",
      "轻量复习官方领域权重、工具速查、指标表、RAG 流程和可信 AI 清单。",
      "考试中遇到不确定题先排除明显错误选项，不要被绝对化表述带走。",
      "保持节奏：先做会的，标记犹豫题，最后回看。"
    ],
    example: "看到“完全消除幻觉”“开放所有数据”“只需增大模型”这类选项，通常要高度警惕。",
    examDrill: "最后默写：五大领域权重、8 个 NVIDIA 工具、6 个指标、RAG 流程。",
    selfCheck: ["考试物品和路线确认了吗？", "我是否知道遇到难题怎么处理？"]
  }
};

const lessons = weeks.flatMap(([weekTitle, conceptIds], weekIndex) =>
  conceptIds.map((conceptId, dayIndex) => {
    const concept = conceptLessons[conceptId];
    return {
      id: `w${weekIndex + 1}-d${dayIndex + 1}`,
      week: weekIndex + 1,
      day: dayIndex + 1,
      weekTitle,
      title: dayTitles[weekIndex][dayIndex],
      conceptId,
      domain: concept.domain,
      detail: lessonDetails[`w${weekIndex + 1}-d${dayIndex + 1}`],
      objective: lessonDetails[`w${weekIndex + 1}-d${dayIndex + 1}`]?.focus || `掌握 ${concept.label} 在 NCA-GENL 考试中的核心判断方式，并能结合汽车行业场景解释。`,
      concept
    };
  })
);

const knowledge = [
  ["ML/AI 基础", "ml", "30%", ["监督/无监督", "过拟合", "数据泄漏", "模型选择"]],
  ["Transformer", "transformer", "高频", ["Token", "Embedding", "Q/K/V", "Attention"]],
  ["RAG", "rag", "高频", ["Chunk", "Vector DB", "Top-k", "引用"]],
  ["Prompt", "prompt", "高频", ["Zero-shot", "Few-shot", "结构化输出", "约束"]],
  ["实验与指标", "metrics", "22%", ["A/B Test", "Baseline", "BLEU", "ROUGE"]],
  ["软件开发", "software", "24%", ["API", "Latency", "Throughput", "Monitoring"]],
  ["NVIDIA 工具", "nvidia", "必背", ["NeMo", "NIM", "Triton", "TensorRT", "RAPIDS"]],
  ["可信 AI", "trust", "10%", ["隐私", "偏见", "幻觉", "安全"]]
];

const flashcards = [
  ["RAG 和 fine-tuning 的根本区别？", "RAG 不改模型参数，靠检索补充上下文；fine-tuning 会更新模型参数。"],
  ["TensorRT 主要解决什么？", "优化推理性能，提高吞吐、降低延迟。"],
  ["NeMo 和 NIM 怎么区分？", "NeMo 偏模型构建、训练、微调；NIM 偏推理微服务部署。"],
  ["BLEU 和 ROUGE 分别常用于什么？", "BLEU 常用于翻译，ROUGE 常用于摘要。"],
  ["类别不平衡为什么不能只看 accuracy？", "多数类预测会掩盖少数类失败，应看 precision、recall、F1。"],
  ["RLHF 的目的？", "通过人类偏好反馈让模型输出更符合人类期望和安全要求。"],
  ["LoRA 的优势？", "参数高效、训练成本低、适合快速适配大模型。"],
  ["RAPIDS 用于什么？", "GPU 加速数据科学和传统机器学习工作流。"]
];

const questions = [
  ["single", "企业要让 LLM 回答内部维修手册中的最新内容，且不想重新训练模型，最合适的方案是？", ["RAG", "只提高 temperature", "只使用 BLEU", "删除向量数据库"], [0], "机器学习和 AI 核心知识", "私有知识、最新知识、低成本接入，优先判断为 RAG。"],
  ["single", "模型在训练集表现很好、测试集表现明显下降，最可能的问题是？", ["过拟合", "欠拟合", "BLEU 太低", "GPU 分区不足"], [0], "机器学习和 AI 核心知识", "训练好、泛化差，是典型过拟合。"],
  ["single", "需要优化 LLM 推理延迟和吞吐时，最相关的 NVIDIA 工具是？", ["TensorRT-LLM", "RAPIDS cuDF", "ROUGE", "spaCy NER"], [0], "软件开发", "TensorRT/TensorRT-LLM 面向推理优化。"],
  ["multiple", "以下哪些属于 RAG 流程中的关键环节？", ["文档切分", "生成 embedding", "向量相似检索", "随机删除所有上下文"], [0, 1, 2], "机器学习和 AI 核心知识", "RAG 需要把外部知识处理成可检索内容，再注入 prompt。"],
  ["single", "在严重类别不平衡的故障预警任务中，最不应该单独依赖哪个指标？", ["Accuracy", "Recall", "F1", "Precision"], [0], "数据分析", "Accuracy 可能被多数类掩盖，少数故障类表现很差也看不出来。"],
  ["single", "想用少量领域数据低成本适配大模型，应优先想到？", ["LoRA", "MIG", "BLEU", "Top-k 检索"], [0], "机器学习和 AI 核心知识", "LoRA 是参数高效微调方法。"],
  ["single", "用于训练、微调和定制生成式 AI 模型的 NVIDIA 框架是？", ["NeMo", "Triton", "TensorRT", "RAPIDS"], [0], "软件开发", "NeMo 偏模型构建和定制。"],
  ["single", "用于快速部署优化模型推理 API 的 NVIDIA 推理微服务是？", ["NIM", "NCCL", "CUDA", "ROUGE"], [0], "软件开发", "NIM 是 NVIDIA Inference Microservices。"],
  ["single", "机器翻译任务中常见的自动评价指标是？", ["BLEU", "R2", "MIG", "MAE"], [0], "数据分析", "BLEU 基于 n-gram 重合，常用于翻译。"],
  ["multiple", "可信 AI 中，处理员工个人信息时应优先考虑哪些措施？", ["数据最小化", "授权同意", "访问控制和审计", "开放所有数据给所有模型"], [0, 1, 2], "可信 AI", "隐私场景关注授权、最小化、权限、审计和去标识化。"],
  ["single", "Triton Inference Server 最适合哪种需求？", ["统一服务多框架模型", "评价摘要质量", "进行人类偏好标注", "计算 explained variance"], [0], "软件开发", "Triton 是生产推理服务工具，支持多框架模型 serving。"],
  ["single", "RAPIDS cuDF 的定位最接近？", ["GPU 加速的数据表处理库", "LLM 对齐算法", "模型推理微服务", "摘要评价指标"], [0], "软件开发", "cuDF 可理解为 GPU 加速的数据框生态。"],
  ["single", "NCCL 在 NVIDIA 生态中主要用于？", ["多 GPU 通信", "文档切分", "翻译评价", "Prompt 模板管理"], [0], "软件开发", "NCCL 常用于多 GPU/分布式训练通信。"],
  ["single", "MIG 的主要作用是？", ["将一块 GPU 切分成多个隔离实例", "提升 BLEU 分数", "自动去除训练偏见", "替代 RAG 检索"], [0], "软件开发", "MIG 用于 GPU 资源隔离和提高利用率。"],
  ["single", "摘要任务中，最常见的自动评价指标是？", ["ROUGE", "RMSE", "CUDA", "MIG"], [0], "数据分析", "ROUGE 常用于摘要。"],
  ["single", "语言模型 perplexity 较低通常说明什么？", ["模型对下一个 token 的预测更确定", "模型一定不会幻觉", "模型已经完成隐私审计", "模型检索召回率一定更高"], [0], "数据分析", "Perplexity 衡量语言建模不确定性，不保证事实正确。"],
  ["multiple", "评价 RAG 系统时，哪些指标或维度是合理的？", ["检索 recall@k", "回答是否忠实于检索上下文", "端到端延迟", "显示器分辨率"], [0, 1, 2], "实验", "RAG 要同时看检索质量、生成质量、性能和用户体验。"],
  ["single", "Few-shot prompting 的特点是？", ["在提示词中提供少量示例", "完全不提供任务说明", "更新模型权重", "切分 GPU"], [0], "机器学习和 AI 核心知识", "Few-shot 通过示例让模型模仿输入输出模式。"],
  ["single", "Self-attention 中 positional encoding 的作用是？", ["补充 token 顺序信息", "加密训练数据", "降低显卡价格", "替代损失函数"], [0], "机器学习和 AI 核心知识", "Self-attention 本身不天然携带顺序。"],
  ["single", "在 RAG 中 chunk 太小可能带来的问题是？", ["丢失必要上下文", "模型参数无法保存", "NCCL 无法通信", "ROUGE 一定为零"], [0], "机器学习和 AI 核心知识", "chunk 太小可能缺少上下文，太大可能引入噪声。"],
  ["single", "如果希望模型输出更可控、更稳定，以下哪项通常有帮助？", ["明确输出格式和约束", "随机删除系统提示", "无限提高 temperature", "不做任何评估"], [0], "机器学习和 AI 核心知识", "结构化格式、明确约束和低随机性通常提升稳定性。"],
  ["single", "RLHF 中 reward model 学到的主要是？", ["人类偏好信号", "向量数据库索引", "GPU 分区规则", "HTML 样式"], [0], "实验", "Reward model 用人类偏好数据学习如何评价输出好坏。"],
  ["single", "模型评估时把测试集信息用于调参，属于什么风险？", ["数据泄漏", "模型压缩", "NIM 部署", "提示词工程"], [0], "实验", "测试信息进入训练或调参流程，会导致评估虚高。"],
  ["single", "汽车零件寿命预测通常属于哪类机器学习任务？", ["回归", "机器翻译", "摘要", "图像生成"], [0], "机器学习和 AI 核心知识", "寿命、温度、磨损量等连续数值预测通常是回归。"],
  ["multiple", "上线 LLM 应用后，哪些监控是合理的？", ["延迟和错误率", "用户反馈和异常输出", "数据漂移和质量变化", "只看页面颜色"], [0, 1, 2], "可信 AI", "生产应用需要持续监控性能、质量、安全和数据变化。"],
  ["single", "当正例漏报代价很高时，应特别关注哪个指标？", ["Recall", "BLEU", "R2", "NCCL"], [0], "数据分析", "Recall 衡量真实正例中被找出的比例。"],
  ["single", "Cosine similarity 在 LLM 应用中常用于？", ["衡量 embedding 相似度", "计算模型训练轮数", "评估图像亮度", "替代权限控制"], [0], "机器学习和 AI 核心知识", "语义检索常用 cosine similarity。"],
  ["single", "A/B 测试两个 prompt 时，最重要的是？", ["控制变量并使用一致的评价指标", "只比较 prompt 长度", "每次换不同模型和题目", "不记录结果"], [0], "实验", "A/B test 需要控制变量、固定评价集和明确目标指标。"],
  ["single", "如果训练数据中某类群体代表性不足，最直接关联的可信 AI 风险是？", ["偏见和公平性问题", "推理吞吐提升", "BLEU 自动变高", "GPU 资源隔离"], [0], "可信 AI", "数据代表性不足可能导致模型对某些群体表现更差。"],
  ["single", "要让模型输出附带证据来源，最直接的系统设计措施是？", ["RAG 保留来源元数据并在回答中引用", "只增加 batch size", "切换到 MAE 指标", "关闭日志"], [0], "可信 AI", "RAG 文档元数据和引用机制有助于可追溯性。"]
].map(([type, q, options, answer, domain, note]) => ({ type, q, options, answer, domain, note }));

const storageKeys = {
  completed: "ncaGenl.completedLessons",
  selectedLesson: "ncaGenl.selectedLesson",
  lastQuiz: "ncaGenl.lastQuiz"
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // file:// pages may restrict persistence.
  }
}

function completedSet() {
  return new Set(readJson(storageKeys.completed, []));
}

function saveCompleted(set) {
  writeJson(storageKeys.completed, [...set]);
}

function selectedLessonId() {
  return readJson(storageKeys.selectedLesson, lessons[0].id);
}

function setSelectedLesson(id) {
  writeJson(storageKeys.selectedLesson, id);
}

function nextLesson() {
  const done = completedSet();
  return lessons.find((lesson) => !done.has(lesson.id)) || lessons[lessons.length - 1];
}

function switchView(view) {
  document.querySelectorAll(".view").forEach((item) => item.classList.remove("is-active"));
  document.querySelector(`#view-${view}`).classList.add("is-active");
  document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
}

function renderStatus() {
  const done = completedSet();
  const lastQuiz = readJson(storageKeys.lastQuiz, null);
  const percent = Math.round((done.size / lessons.length) * 100);
  document.querySelector("#studyStatus").innerHTML = `
    <div class="status-tile"><span>课程进度</span><strong>${done.size}/${lessons.length}</strong></div>
    <div class="status-tile"><span>完成比例</span><strong>${percent}%</strong></div>
    <div class="status-tile"><span>当前阶段</span><strong>Week ${nextLesson().week}</strong></div>
    <div class="status-tile"><span>最近测验</span><strong>${lastQuiz ? `${lastQuiz.score}/${lastQuiz.total}` : "未提交"}</strong></div>
  `;
}

function renderDomainBars() {
  document.querySelector("#domainBars").innerHTML = domains.map(([name, weight, color, summary]) => `
    <div class="domain-bar">
      <header><span>${name}</span><span>${weight}%</span></header>
      <div class="bar-track"><span style="width:${weight * 3.1}%; background:${color}"></span></div>
      <p class="muted">${summary}</p>
    </div>
  `).join("");
}

function renderNextLessonCard() {
  const lesson = nextLesson();
  document.querySelector("#nextLessonCard").innerHTML = `
    <h3>Week ${lesson.week} Day ${lesson.day}：${lesson.title}</h3>
    <p>${lesson.objective}</p>
    <div class="tag-row"><span class="tag">${lesson.domain}</span><span class="tag">${lesson.concept.label}</span></div>
    <p class="muted">本节会学习：${lesson.detail.lecture.slice(0, 2).join(" ")}</p>
  `;
}

function renderLessonList() {
  const done = completedSet();
  document.querySelector("#lessonList").innerHTML = weeks.map(([weekTitle], weekIndex) => {
    const weekLessons = lessons.filter((lesson) => lesson.week === weekIndex + 1);
    return `
      <div class="week-group">
        <div class="week-title">Week ${weekIndex + 1}：${weekTitle}</div>
        ${weekLessons.map((lesson) => `
          <button class="lesson-button ${lesson.id === selectedLessonId() ? "is-active" : ""} ${done.has(lesson.id) ? "done" : ""}" type="button" data-lesson="${lesson.id}">
            Day ${lesson.day} ${lesson.title}
          </button>
        `).join("")}
      </div>
    `;
  }).join("");
}

function renderLessonPanel() {
  const lesson = lessons.find((item) => item.id === selectedLessonId()) || lessons[0];
  const done = completedSet();
  const c = lesson.concept;
  const detail = lesson.detail;
  document.querySelector("#lessonPanel").innerHTML = `
    <p class="eyebrow">Week ${lesson.week} / Day ${lesson.day}</p>
    <h1>${lesson.title}</h1>
    <p class="lead">${lesson.objective}</p>
    <div class="lesson-meta"><span class="tag">${lesson.domain}</span><span class="tag">${c.label}</span></div>
    <section class="lesson-section">
      <h3>今天要学懂什么</h3>
      <p>${detail.focus}</p>
    </section>
    <section class="lesson-section">
      <h3>课程讲解</h3>
      <ul>${detail.lecture.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section class="lesson-section lesson-example">
      <h3>汽车行业例子</h3>
      <p>${detail.example}</p>
    </section>
    <section class="lesson-section">
      <h3>考试会怎么考</h3>
      <ul>${c.exam.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section class="lesson-section">
      <h3>易错点</h3>
      <ul>${c.traps.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section class="lesson-section">
      <h3>今日练习</h3>
      <p>${detail.examDrill}</p>
    </section>
    <section class="lesson-section">
      <h3>自测问题</h3>
      <ul>${detail.selfCheck.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <label class="lesson-check">
      <input type="checkbox" id="lessonDone" ${done.has(lesson.id) ? "checked" : ""}>
      我已完成本节学习
    </label>
  `;
}

function renderKnowledgeMap() {
  document.querySelector("#knowledgeMap").innerHTML = knowledge.map(([title, conceptId, weight, tags]) => `
    <article class="knowledge-card">
      <h2>${title}<span>${weight}</span></h2>
      <div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      <p class="muted">${conceptLessons[conceptId].definition}</p>
      <button class="secondary-action small" type="button" data-open-concept="${conceptId}">学习这个知识点</button>
    </article>
  `).join("");
}

function renderConceptMenu(active = "transformer") {
  document.querySelector("#conceptMenu").innerHTML = Object.entries(conceptLessons).map(([id, concept]) => `
    <button class="concept-button ${id === active ? "is-active" : ""}" type="button" data-concept="${id}">
      ${concept.label}
    </button>
  `).join("");
  renderConceptArticle(active);
}

function renderConceptArticle(id) {
  const c = conceptLessons[id];
  document.querySelector("#conceptArticle").innerHTML = `
    <p class="eyebrow">${c.domain}</p>
    <h1>${c.label}</h1>
    <p class="concept-lead">${c.definition}</p>
    <section class="concept-section"><h3>系统讲解</h3><ul>${c.learn.map((item) => `<li>${item}</li>`).join("")}</ul></section>
    <section class="concept-section"><h3>考试问法</h3><ul>${c.exam.map((item) => `<li>${item}</li>`).join("")}</ul></section>
    <section class="concept-section"><h3>易错点</h3><ul>${c.traps.map((item) => `<li>${item}</li>`).join("")}</ul></section>
    <section class="concept-section"><h3>训练任务</h3><p>${c.practice}</p></section>
  `;
}

function renderFlashcard(index = 0) {
  const [q, a] = flashcards[index % flashcards.length];
  document.querySelector("#flashQuestion").textContent = q;
  const answer = document.querySelector("#flashAnswer");
  answer.textContent = a;
  answer.hidden = true;
  document.querySelector("#toggleFlash").textContent = "显示答案";
  document.querySelector("#flashcard").dataset.index = String(index % flashcards.length);
}

function renderQuizFilters() {
  const values = ["all", ...new Set(questions.map((q) => q.domain))];
  document.querySelector("#quizDomainFilter").innerHTML = values.map((value) => `
    <option value="${value}">${value === "all" ? "全部领域" : value}</option>
  `).join("");
}

function visibleQuestions() {
  const domain = document.querySelector("#quizDomainFilter")?.value || "all";
  return questions.map((q, index) => ({ ...q, index })).filter((q) => domain === "all" || q.domain === domain);
}

function renderQuiz() {
  const list = visibleQuestions();
  document.querySelector("#quiz").innerHTML = `
    ${list.map((question, order) => `
      <article class="question-card" data-question="${question.index}">
        <p class="question-title">${order + 1}. ${question.q} <span class="tag">${question.type === "multiple" ? "多选" : "单选"}</span> <span class="tag">${question.domain}</span></p>
        ${question.options.map((option, optionIndex) => `
          <label class="option">
            <input type="${question.type === "multiple" ? "checkbox" : "radio"}" name="q-${question.index}" value="${optionIndex}">
            <span>${String.fromCharCode(65 + optionIndex)}. ${option}</span>
          </label>
        `).join("")}
        <div class="answer-note">${question.note}</div>
      </article>
    `).join("")}
    <div class="lesson-actions">
      <button class="primary-action" id="submitQuiz" type="button">提交并查看解析</button>
      <span class="score-pill" id="scorePill" hidden></span>
    </div>
    <div class="score-breakdown" id="scoreBreakdown"></div>
  `;
}

function gradeQuiz() {
  const list = visibleQuestions();
  const breakdown = {};
  let score = 0;
  list.forEach((question) => {
    const card = document.querySelector(`[data-question="${question.index}"]`);
    const checked = [...card.querySelectorAll("input:checked")].map((input) => Number(input.value)).sort();
    const answer = [...question.answer].sort();
    const correct = checked.length === answer.length && checked.every((value, idx) => value === answer[idx]);
    breakdown[question.domain] ??= { score: 0, total: 0 };
    breakdown[question.domain].total += 1;
    if (correct) {
      score += 1;
      breakdown[question.domain].score += 1;
    }
    card.querySelector(".answer-note").classList.add("is-visible");
    card.querySelectorAll(".option").forEach((option, idx) => {
      option.style.borderColor = answer.includes(idx) ? "#257b5d" : "#dce4ec";
      option.style.background = answer.includes(idx) ? "#edf7f2" : "#fff";
    });
  });
  const weakest = Object.entries(breakdown).sort((a, b) => (a[1].score / a[1].total) - (b[1].score / b[1].total))[0]?.[0] || "";
  document.querySelector("#scorePill").hidden = false;
  document.querySelector("#scorePill").textContent = `得分 ${score}/${list.length}`;
  const detail = Object.entries(breakdown).map(([domain, result]) => `${domain}：${result.score}/${result.total}`).join("；");
  const box = document.querySelector("#scoreBreakdown");
  box.classList.add("is-visible");
  box.innerHTML = `<strong>领域得分</strong>${detail}<br>建议复习：${weakest || "暂无弱项"}`;
  writeJson(storageKeys.lastQuiz, { score, total: list.length, weakest });
  renderStatus();
}

function selectLesson(id) {
  setSelectedLesson(id);
  renderLessonList();
  renderLessonPanel();
}

function init() {
  renderStatus();
  renderDomainBars();
  renderNextLessonCard();
  renderLessonList();
  renderLessonPanel();
  renderKnowledgeMap();
  renderConceptMenu("transformer");
  renderFlashcard();
  renderQuizFilters();
  renderQuiz();

  document.body.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) switchView(viewButton.dataset.view);

    if (event.target.closest("[data-open-current]")) {
      selectLesson(nextLesson().id);
      switchView("course");
    }

    const lessonButton = event.target.closest("[data-lesson]");
    if (lessonButton) selectLesson(lessonButton.dataset.lesson);

    const conceptButton = event.target.closest("[data-concept]");
    if (conceptButton) renderConceptMenu(conceptButton.dataset.concept);

    const openConcept = event.target.closest("[data-open-concept]");
    if (openConcept) {
      renderConceptMenu(openConcept.dataset.openConcept);
      switchView("library");
    }

    if (event.target.id === "submitQuiz") gradeQuiz();
  });

  document.querySelector("#lessonPanel").addEventListener("change", (event) => {
    if (event.target.id !== "lessonDone") return;
    const done = completedSet();
    const id = selectedLessonId();
    if (event.target.checked) done.add(id);
    else done.delete(id);
    saveCompleted(done);
    renderStatus();
    renderNextLessonCard();
    renderLessonList();
  });

  document.querySelector("#resetProgress").addEventListener("click", () => {
    saveCompleted(new Set());
    renderStatus();
    renderNextLessonCard();
    renderLessonList();
    renderLessonPanel();
  });

  document.querySelector("#quizDomainFilter").addEventListener("change", renderQuiz);
  document.querySelector("#resetQuiz").addEventListener("click", renderQuiz);
  document.querySelector("#toggleFlash").addEventListener("click", () => {
    const answer = document.querySelector("#flashAnswer");
    answer.hidden = !answer.hidden;
    document.querySelector("#toggleFlash").textContent = answer.hidden ? "显示答案" : "隐藏答案";
  });
  document.querySelector("#nextFlash").addEventListener("click", () => {
    const current = Number(document.querySelector("#flashcard").dataset.index || "0");
    renderFlashcard(current + 1);
  });
}

init();

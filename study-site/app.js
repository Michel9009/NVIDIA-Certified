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
      objective: `掌握 ${concept.label} 在 NCA-GENL 考试中的核心判断方式，并能结合汽车行业场景解释。`,
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
    <p class="muted">本节会学习：${lesson.concept.learn.slice(0, 2).join(" ")}</p>
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
  document.querySelector("#lessonPanel").innerHTML = `
    <p class="eyebrow">Week ${lesson.week} / Day ${lesson.day}</p>
    <h1>${lesson.title}</h1>
    <p class="lead">${lesson.objective}</p>
    <div class="lesson-meta"><span class="tag">${lesson.domain}</span><span class="tag">${c.label}</span></div>
    <section class="lesson-section">
      <h3>今天要学懂什么</h3>
      <p>${c.definition}</p>
    </section>
    <section class="lesson-section">
      <h3>知识讲解</h3>
      <ul>${c.learn.map((item) => `<li>${item}</li>`).join("")}</ul>
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
      <p>${c.practice}</p>
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

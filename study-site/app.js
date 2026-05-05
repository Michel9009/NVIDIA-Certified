const domains = [
  {
    name: "机器学习和 AI 核心知识",
    weight: 30,
    color: "#286fb7",
    summary: "算法、神经网络、LLM 基础、RAG、Prompt、Embedding、模型选择。"
  },
  {
    name: "软件开发",
    weight: 24,
    color: "#258060",
    summary: "Python/NLP 库、向量数据库、应用架构、部署、性能、NVIDIA 工具栈。"
  },
  {
    name: "实验",
    weight: 22,
    color: "#b86b12",
    summary: "A/B 测试、baseline、prompt 评估、模型比较、RLHF、zero-shot/few-shot。"
  },
  {
    name: "数据分析",
    weight: 14,
    color: "#287c8e",
    summary: "EDA、清洗、可视化、损失函数、解释方差、分类/回归/NLP 指标。"
  },
  {
    name: "可信 AI",
    weight: 10,
    color: "#b95048",
    summary: "隐私、同意、偏见、公平、幻觉、解释性、安全、监控。"
  }
];

const weeks = [
  {
    phase: "foundation",
    title: "第 1 周：考试范围与 ML 基础",
    output: "项目经验转考试术语",
    goal: "确认五大领域权重，复习监督学习、无监督学习、数据划分和基础指标。",
    days: [
      "读官方学习指南，记住 30/24/22/14/10 权重。",
      "复习分类、回归、聚类、过拟合、欠拟合。",
      "复习 train/validation/test、交叉验证和数据泄漏。",
      "整理 accuracy、precision、recall、F1、MSE、RMSE、R2。",
      "把一个汽车预测模型写成考试案例：数据、特征、指标、风险。",
      "做 10 道 ML 基础题，记录错因。",
      "周复盘：列出 3 个最弱概念。"
    ]
  },
  {
    phase: "foundation",
    title: "第 2 周：Transformer 与 Embedding",
    output: "Transformer 口述稿",
    goal: "理解 token、embedding、self-attention、Q/K/V、多头注意力和上下文窗口。",
    days: [
      "学习 tokenization、embedding、positional encoding。",
      "拆解 self-attention：Q/K/V 和 attention score。",
      "理解 multi-head attention 和 feed-forward layer。",
      "学习 foundation model、pretraining、fine-tuning、instruction tuning。",
      "用汽车维修文本做 embedding 相似度例子。",
      "画一张 Transformer 数据流图。",
      "用 3 分钟口述 Transformer 如何处理一句话。"
    ]
  },
  {
    phase: "foundation",
    title: "第 3 周：Prompt Engineering 与 RAG",
    output: "RAG 流程图和 prompt 模板",
    goal: "掌握 zero-shot、few-shot、约束提示、RAG 检索链路和幻觉缓解。",
    days: [
      "学习 prompt 结构：角色、任务、上下文、约束、格式。",
      "练 zero-shot、few-shot、structured output。",
      "学习 RAG：chunk、embedding、vector DB、top-k。",
      "理解 rerank、引用来源和 faithfulness。",
      "对比无 RAG 与有 RAG 的汽车知识问答。",
      "总结 RAG 与 fine-tuning 区别。",
      "做 15 道 RAG/Prompt 题。"
    ]
  },
  {
    phase: "application",
    title: "第 4 周：实验设计与评估",
    output: "任务类型到指标表",
    goal: "掌握 A/B test、baseline、统计比较、LLM 指标和 RAG 指标。",
    days: [
      "学习 baseline、control variable、offline/online evaluation。",
      "学习 A/B test、样本量、显著性和置信区间。",
      "整理分类、回归、NLP、RAG 指标。",
      "重点记 BLEU、ROUGE、perplexity、cosine similarity。",
      "设计两个 prompt 的 A/B 测试方案。",
      "为汽车故障问答系统设计评价 rubric。",
      "做 20 道实验和指标题。"
    ]
  },
  {
    phase: "application",
    title: "第 5 周：软件开发与部署",
    output: "LLM 应用架构图",
    goal: "理解 LLM 应用组件、Python 生态、向量库、API、监控和部署权衡。",
    days: [
      "画 LLM 应用架构：前端、API、模型、向量库、日志。",
      "复习 NumPy、pandas、spaCy、scikit-learn、PyTorch 的定位。",
      "学习 latency、throughput、batch inference、streaming。",
      "理解模型版本、实验记录、测试和调试。",
      "练习文档切分、embedding、相似度检索脚本思路。",
      "分析 AI 学习平台的权限、日志和监控。",
      "做 15 道软件开发场景题。"
    ]
  },
  {
    phase: "application",
    title: "第 6 周：NVIDIA 工具栈",
    output: "工具速查表",
    goal: "快速区分 NeMo、NIM、Triton、TensorRT、RAPIDS、CUDA、NCCL、MIG。",
    days: [
      "NeMo：训练、微调、定制生成式 AI。",
      "NIM：推理微服务和快速部署。",
      "Triton：多框架模型服务和生产推理。",
      "TensorRT/TensorRT-LLM：推理优化、低延迟、高吞吐。",
      "RAPIDS：cuDF/cuML，GPU 加速数据科学。",
      "CUDA/NCCL/MIG：GPU 计算、多卡通信、资源隔离。",
      "做 20 道工具选择题。"
    ]
  },
  {
    phase: "sprint",
    title: "第 7 周：可信 AI 与治理",
    output: "风险矩阵",
    goal: "覆盖隐私、同意、偏见、公平、解释性、幻觉、安全和上线监控。",
    days: [
      "学习 hallucination、bias、fairness、privacy、consent。",
      "整理 RAG、引用、审核、guardrails 如何降低幻觉。",
      "分析训练数据偏差和评估偏差。",
      "学习匿名化、最小化收集、访问控制、审计。",
      "设计汽车企业 AI 助手风险矩阵。",
      "写 5 条安全和隐私 guardrails。",
      "做 10 道可信 AI 场景题。"
    ]
  },
  {
    phase: "sprint",
    title: "第 8 周：模拟考试与错题冲刺",
    output: "两套错题清单",
    goal: "限时练速度，只补弱项，不再扩展新内容。",
    days: [
      "完成 50 题限时模拟，统计错题领域。",
      "补实验、指标和 RAG 错题。",
      "默写 NVIDIA 工具速查表。",
      "复述 Transformer、RAG、RLHF、LoRA。",
      "完成第二次限时模拟。",
      "只看闪卡、错题和最后必背清单。",
      "确认考试地点、证件、时间和路线。"
    ]
  }
];

const knowledge = [
  {
    title: "ML/AI 基础",
    weight: "30%",
    color: "#286fb7",
    tags: ["监督/无监督", "过拟合", "数据泄漏", "神经网络", "模型选择", "Embedding"]
  },
  {
    title: "LLM 架构",
    weight: "高频",
    color: "#287c8e",
    tags: ["Transformer", "Self-Attention", "Q/K/V", "Token", "Context Window", "Temperature"]
  },
  {
    title: "RAG 与 Prompt",
    weight: "高频",
    color: "#258060",
    tags: ["Chunk", "Vector DB", "Top-k", "Few-shot", "Structured Output", "Hallucination"]
  },
  {
    title: "实验评估",
    weight: "22%",
    color: "#b86b12",
    tags: ["A/B Test", "Baseline", "BLEU", "ROUGE", "Perplexity", "Faithfulness"]
  },
  {
    title: "软件开发",
    weight: "24%",
    color: "#2d6ea9",
    tags: ["Python", "spaCy", "API", "Latency", "Throughput", "Monitoring"]
  },
  {
    title: "NVIDIA 工具",
    weight: "必背",
    color: "#4e7d38",
    tags: ["NeMo", "NIM", "Triton", "TensorRT", "RAPIDS", "CUDA", "NCCL", "MIG"]
  },
  {
    title: "数据分析",
    weight: "14%",
    color: "#7f6a2d",
    tags: ["EDA", "清洗", "可视化", "MSE", "RMSE", "R2", "Explained Variance"]
  },
  {
    title: "可信 AI",
    weight: "10%",
    color: "#b95048",
    tags: ["隐私", "同意", "偏见", "公平", "解释性", "安全", "漂移"]
  }
];

const coverage = [
  {
    domain: "机器学习和 AI 核心知识",
    points: ["监督/无监督学习", "神经网络、反向传播、激活函数", "Transformer、Embedding、Foundation Model", "RAG、Chatbot、Summarization、Prompt Engineering", "模型选择、数据和硬件需求"],
    forms: ["给业务场景选模型或方法", "解释概念作用", "识别过拟合、数据泄漏、指标误用"]
  },
  {
    domain: "软件开发",
    points: ["Python、NumPy、pandas、spaCy、PyTorch/scikit-learn", "向量数据库和 NLP 包", "API、微服务、容器、版本管理", "延迟、吞吐、batch、streaming", "NeMo、NIM、Triton、TensorRT、RAPIDS"],
    forms: ["给部署场景选 NVIDIA 工具", "判断性能瓶颈", "选择应用架构组件"]
  },
  {
    domain: "实验",
    points: ["A/B test、baseline、控制变量", "zero-shot/few-shot 评估", "Prompt 和模型比较", "RLHF、reward model、人类偏好", "统计指标、置信区间、样本量"],
    forms: ["选正确实验设计", "判断哪个指标更合适", "识别不公平对比或评估泄漏"]
  },
  {
    domain: "数据分析",
    points: ["EDA、清洗、缺失值、异常值", "数据挖掘和可视化", "MSE、RMSE、MAE、R2、explained variance", "Precision、recall、F1、BLEU、ROUGE、perplexity", "RAG 检索指标：recall@k、MRR、nDCG"],
    forms: ["根据任务选择指标", "解释图表或结果", "判断类别不平衡和误差风险"]
  },
  {
    domain: "可信 AI",
    points: ["隐私、授权同意、数据最小化", "偏见、公平、数据代表性", "幻觉、事实校验、来源引用", "解释性、透明度、审计", "安全、prompt injection、漂移监控"],
    forms: ["识别高风险做法", "选择缓解措施", "判断上线后治理方案"]
  }
];

const concepts = [
  {
    id: "transformer",
    label: "Transformer",
    definition: "Transformer 是现代 LLM 的主流基础架构。它用 self-attention 在同一层里让每个 token 与上下文中其他 token 建立关系，从而理解长距离依赖和语义关联。",
    mechanics: [
      "文本先被 tokenizer 切成 token，再映射成 embedding 向量。",
      "Self-attention 会为每个 token 生成 Query、Key、Value。Query 与 Key 计算相似度，得到注意力权重，再加权汇总 Value。",
      "Multi-head attention 会并行学习不同关系，例如主谓关系、指代关系、领域术语关系。",
      "Positional encoding 或位置嵌入补充顺序信息，因为 attention 本身不天然知道 token 的先后。"
    ],
    automotive: "把它类比成故障诊断：一个异常振动信号不能孤立判断，需要同时看转速、温度、载荷、历史维修记录。Self-attention 就是在判断当前 token 时动态查看上下文里的相关信号。",
    exam: ["问 self-attention 的价值", "问 Q/K/V 的作用", "问 positional encoding 为什么需要"],
    answer: ["每个 token 根据上下文关注其他 token", "Q 找匹配，K 提供匹配信号，V 提供被聚合的信息", "位置编码补充顺序信息"],
    traps: ["不要把 Transformer 等同于所有 LLM", "不要说 attention 只能看相邻 token", "低 perplexity 不等于事实正确"],
    drill: "拿一句维修手册文本，标出每个代词、部件名和故障现象分别需要关注哪些上下文词。"
  },
  {
    id: "rag",
    label: "RAG",
    definition: "RAG 是 Retrieval-Augmented Generation，检索增强生成。它不直接把知识写进模型参数，而是在回答前从外部知识库检索相关内容，再把内容放进 prompt 让 LLM 基于证据生成答案。",
    mechanics: [
      "离线阶段：清洗文档、切分 chunk、生成 embedding、写入向量数据库，并保留来源、章节、日期等元数据。",
      "在线阶段：用户问题转成 query embedding，在向量库中检索 top-k 相关 chunk，可再用 reranker 重排。",
      "生成阶段：把检索到的片段、任务约束和输出格式组装进 prompt，由 LLM 生成答案。",
      "评估阶段：同时看检索召回、回答忠实度、引用准确性、延迟和用户反馈。"
    ],
    automotive: "适合公司内部维修手册、质量问题库、试验报告和培训资料问答。资料经常更新时，RAG 比重新微调模型更省成本，也更容易追溯来源。",
    exam: ["问企业知识库、最新信息、私有文档", "问如何降低幻觉", "问向量数据库作用"],
    answer: ["RAG 用外部知识增强生成", "流程是 chunk、embedding、检索、上下文注入、生成", "向量库负责存储和相似检索"],
    traps: ["RAG 不改模型参数", "RAG 不能完全消除幻觉", "检索质量差会拖累生成质量"],
    drill: "选一份汽车维修 PDF，设计 chunk 大小、元数据字段、top-k 数量和回答引用格式。"
  },
  {
    id: "prompt",
    label: "Prompt",
    definition: "Prompt engineering 是把任务目标、上下文、限制条件、示例和输出格式清楚地写给模型，让模型更稳定地完成任务。考试通常考方法选择和风险边界。",
    mechanics: [
      "Zero-shot：不给示例，直接描述任务，适合简单通用任务。",
      "Few-shot：给少量高质量示例，适合格式、风格或判断标准需要模仿的任务。",
      "Structured output：要求 JSON、表格或固定字段，适合系统集成和自动解析。",
      "约束提示：明确禁止编造、要求引用来源、限定回答范围、要求不确定时说明不知道。"
    ],
    automotive: "例如让模型输出故障分析时，prompt 应限制为：现象、可能原因、验证步骤、风险等级、引用资料。这样比单纯问“帮我分析故障”更可控。",
    exam: ["问 zero-shot/few-shot", "问结构化输出", "问如何提高输出稳定性"],
    answer: ["清楚写角色、任务、上下文、约束和格式", "few-shot 提供示例", "高风险场景要配合检索、规则和审核"],
    traps: ["Prompt 不是越长越好", "示例质量比数量更重要", "不要只靠 prompt 处理隐私和安全"],
    drill: "把一个汽车质量问题分析任务改写成 zero-shot、few-shot 和 JSON 输出三种 prompt。"
  },
  {
    id: "finetune",
    label: "Fine-tuning/LoRA/RLHF",
    definition: "Fine-tuning、LoRA 和 RLHF 都是让模型更适合目标任务的方法，但作用不同：fine-tuning 改模型参数，LoRA 用更低成本改少量适配参数，RLHF 用人类偏好让输出更符合期望。",
    mechanics: [
      "Fine-tuning：用任务或领域数据继续训练模型，适合稳定任务、固定输出风格、领域术语表达。",
      "LoRA：冻结原模型大部分参数，只训练低秩适配矩阵，降低训练成本和存储成本。",
      "RLHF：收集人类偏好数据，训练 reward model，再用强化学习或类似优化方法提升偏好一致性。",
      "选择逻辑：知识频繁变化优先 RAG；固定风格或固定任务可考虑 fine-tuning/LoRA；安全和偏好对齐考虑 RLHF。"
    ],
    automotive: "如果企业术语、报告格式和故障分类标准非常固定，可以用 LoRA 适配输出风格；如果资料每天更新，仍应优先 RAG。",
    exam: ["问定制模型风格", "问低成本微调", "问人类偏好对齐"],
    answer: ["Fine-tuning 更新模型参数", "LoRA 冻结大部分参数，只训练低秩适配矩阵", "RLHF 用人类偏好训练 reward model 再优化输出"],
    traps: ["LoRA 不是检索技术", "RLHF 不是事实数据库", "Fine-tuning 不适合频繁变化的知识库"],
    drill: "为“维修知识库问答”“报告格式生成”“客服回答安全性”分别选择 RAG、LoRA 或 RLHF，并写出理由。"
  },
  {
    id: "metrics",
    label: "指标",
    definition: "指标是考试高频点。核心不是背公式，而是能根据任务类型选择合适指标，并识别误用。分类、回归、翻译、摘要、检索和生成质量使用不同评价方式。",
    mechanics: [
      "分类：precision 关注预测为正的有多少真阳性，recall 关注真实正例找回多少，F1 平衡二者。",
      "回归：MAE 直观，RMSE 对大误差更敏感，R2 表示解释方差比例。",
      "NLP：BLEU 常用于翻译，ROUGE 常用于摘要，perplexity 衡量语言模型预测不确定性。",
      "RAG：retrieval recall@k 看正确资料是否被检索到，faithfulness 看回答是否忠实于检索上下文。"
    ],
    automotive: "故障预警漏报代价高时优先看 recall；零件寿命预测看 MAE/RMSE；维修问答 RAG 同时看检索召回、答案准确性和引用质量。",
    exam: ["问分类、回归、翻译、摘要、RAG 分别用什么指标", "问类别不平衡", "问 prompt 或模型比较"],
    answer: ["分类看 precision/recall/F1", "回归看 MAE/RMSE/R2", "翻译 BLEU，摘要 ROUGE，语言模型 perplexity，检索 recall@k/MRR/nDCG"],
    traps: ["Accuracy 会掩盖类别不平衡", "BLEU/ROUGE 高不代表事实正确", "RAG 要同时评估检索和生成"],
    drill: "列出 5 个汽车 AI 任务，为每个任务选择 2 个主指标和 1 个风险指标。"
  },
  {
    id: "nvidia",
    label: "NVIDIA 工具",
    definition: "NVIDIA 工具栈题通常考“场景匹配”。你不一定需要会部署每个工具，但必须知道训练、微调、服务、推理优化、数据分析、多 GPU 通信分别该选谁。",
    mechanics: [
      "NeMo：构建、训练、微调和定制生成式 AI/LLM。",
      "NIM：把优化后的模型封装为可部署的推理微服务，适合快速上线模型 API。",
      "Triton Inference Server：统一服务 PyTorch、TensorFlow、ONNX 等多框架模型，适合生产推理。",
      "TensorRT/TensorRT-LLM：推理优化，降低延迟、提升吞吐，可涉及量化和 kernel 优化。",
      "RAPIDS：GPU 加速数据科学，cuDF 类似 pandas，cuML 类似 scikit-learn。",
      "CUDA 是 GPU 通用计算基础，NCCL 做多 GPU 通信，MIG 做 GPU 资源隔离。"
    ],
    automotive: "如果你要部署一个内部维修问答 API，NIM/Triton 相关；如果要优化延迟，TensorRT-LLM；如果要加速大量传感器数据 EDA，RAPIDS。",
    exam: ["问训练、部署、服务、优化、数据分析、多 GPU 场景该选什么"],
    answer: ["NeMo 做模型构建和定制", "NIM 做推理微服务", "Triton 做模型服务", "TensorRT 做推理优化", "RAPIDS 做 GPU 数据科学", "NCCL 做多 GPU 通信，MIG 做 GPU 分区"],
    traps: ["TensorRT 不是训练框架", "Triton 不是数据分析库", "NIM 和 NeMo 定位不同"],
    drill: "看到题目先标注关键词：训练、微调、部署、服务、优化、数据分析、多 GPU，再选工具。"
  },
  {
    id: "trust",
    label: "可信 AI",
    definition: "可信 AI 关注模型是否可靠、公平、可解释、合规和安全。考试通常给一个业务场景，让你识别风险或选择缓解措施。",
    mechanics: [
      "隐私与同意：数据最小化、授权使用、匿名化、访问控制和审计日志。",
      "偏见与公平：检查数据代表性、类别平衡、分群表现和反馈循环。",
      "幻觉治理：RAG、引用来源、事实校验、拒答策略、人工审核。",
      "安全治理：防 prompt injection、权限隔离、敏感信息过滤、上线监控和异常告警。"
    ],
    automotive: "内部 AI 助手如果能访问员工信息、供应商资料或未公开质量问题，就必须有权限控制、日志审计和敏感信息保护；维修建议还要避免未经验证的安全风险。",
    exam: ["问隐私、同意、偏见、公平、幻觉、解释性", "问上线后如何治理"],
    answer: ["数据最小化、匿名化、访问控制和审计", "用 RAG、引用、校验和人工审核降低幻觉", "监控漂移、异常输出和用户反馈"],
    traps: ["不能说 RAG 保证无幻觉", "不能忽略数据授权", "更大模型不自动代表更公平"],
    drill: "为一个汽车企业内部 AI 助手写 5 条风险和 5 条缓解措施。"
  }
];

const flashcards = [
  ["RAG 和 fine-tuning 的根本区别？", "RAG 不改模型参数，靠检索补充上下文；fine-tuning 会更新模型参数。"],
  ["TensorRT 主要解决什么？", "优化推理性能，提高吞吐、降低延迟。"],
  ["Triton Inference Server 的定位？", "多框架模型服务和生产推理部署。"],
  ["NeMo 和 NIM 怎么区分？", "NeMo 偏模型构建、训练、微调；NIM 偏推理微服务部署。"],
  ["BLEU 和 ROUGE 分别常用于什么？", "BLEU 常用于翻译，ROUGE 常用于摘要。"],
  ["类别不平衡时为什么不能只看 accuracy？", "多数类预测可能让 accuracy 很高，但少数类识别很差。"],
  ["RLHF 的目的？", "通过人类偏好反馈让模型输出更符合人类期望和安全要求。"],
  ["LoRA 的优势？", "参数高效、训练成本低、适合快速适配大模型。"],
  ["RAPIDS 用于什么？", "GPU 加速数据科学和传统机器学习工作流。"],
  ["可信 AI 最常考哪些风险？", "隐私、同意、偏见、公平、幻觉、解释性、安全和监控。"]
];

const questions = [
  {
    type: "single",
    q: "企业要让 LLM 回答内部维修手册中的最新内容，且不想重新训练模型，最合适的方案是？",
    options: ["RAG", "只提高 temperature", "只使用 BLEU", "删除向量数据库"],
    answer: [0],
    note: "私有知识、最新知识、低成本接入，优先判断为 RAG。"
  },
  {
    type: "single",
    q: "模型在训练集表现很好、测试集表现明显下降，最可能的问题是？",
    options: ["过拟合", "欠拟合", "BLEU 太低", "GPU 分区不足"],
    answer: [0],
    note: "训练好、泛化差，是典型过拟合。"
  },
  {
    type: "single",
    q: "需要优化 LLM 推理延迟和吞吐时，最相关的 NVIDIA 工具是？",
    options: ["TensorRT-LLM", "RAPIDS cuDF", "ROUGE", "spaCy NER"],
    answer: [0],
    note: "TensorRT/TensorRT-LLM 面向推理优化。"
  },
  {
    type: "multiple",
    q: "以下哪些属于 RAG 流程中的关键环节？",
    options: ["文档切分", "生成 embedding", "向量相似检索", "随机删除所有上下文"],
    answer: [0, 1, 2],
    note: "RAG 需要把外部知识处理成可检索内容，再注入 prompt。"
  },
  {
    type: "single",
    q: "在严重类别不平衡的故障预警任务中，最不应该单独依赖哪个指标？",
    options: ["Accuracy", "Recall", "F1", "Precision"],
    answer: [0],
    note: "Accuracy 可能被多数类掩盖，少数故障类表现很差也看不出来。"
  },
  {
    type: "single",
    q: "想用少量领域数据低成本适配大模型，应优先想到？",
    options: ["LoRA", "MIG", "BLEU", "Top-k 检索"],
    answer: [0],
    note: "LoRA 是参数高效微调方法。"
  },
  {
    type: "single",
    q: "用于训练、微调和定制生成式 AI 模型的 NVIDIA 框架是？",
    options: ["NeMo", "Triton", "TensorRT", "RAPIDS"],
    answer: [0],
    note: "NeMo 偏模型构建和定制。"
  },
  {
    type: "single",
    q: "用于快速部署优化模型推理 API 的 NVIDIA 推理微服务是？",
    options: ["NIM", "NCCL", "CUDA", "ROUGE"],
    answer: [0],
    note: "NIM 是 NVIDIA Inference Microservices。"
  },
  {
    type: "single",
    q: "机器翻译任务中常见的自动评价指标是？",
    options: ["BLEU", "R2", "MIG", "MAE"],
    answer: [0],
    note: "BLEU 基于 n-gram 重合，常用于翻译。"
  },
  {
    type: "multiple",
    q: "可信 AI 中，处理员工个人信息时应优先考虑哪些措施？",
    options: ["数据最小化", "授权同意", "访问控制和审计", "开放所有数据给所有模型"],
    answer: [0, 1, 2],
    note: "隐私场景关注授权、最小化、权限、审计和去标识化。"
  },
  {
    type: "single",
    q: "Triton Inference Server 最适合哪种需求？",
    options: ["统一服务多框架模型", "评价摘要质量", "进行人类偏好标注", "计算 explained variance"],
    answer: [0],
    note: "Triton 是生产推理服务工具，支持多框架模型 serving。"
  },
  {
    type: "single",
    q: "RAPIDS cuDF 的定位最接近？",
    options: ["GPU 加速的数据表处理库", "LLM 对齐算法", "模型推理微服务", "摘要评价指标"],
    answer: [0],
    note: "cuDF 可理解为 GPU 加速的数据框生态，类似 pandas 的定位。"
  },
  {
    type: "single",
    q: "NCCL 在 NVIDIA 生态中主要用于？",
    options: ["多 GPU 通信", "文档切分", "翻译评价", "Prompt 模板管理"],
    answer: [0],
    note: "NCCL 常用于多 GPU/分布式训练通信，例如 AllReduce。"
  },
  {
    type: "single",
    q: "MIG 的主要作用是？",
    options: ["将一块 GPU 切分成多个隔离实例", "提升 BLEU 分数", "自动去除训练偏见", "替代 RAG 检索"],
    answer: [0],
    note: "MIG 用于 GPU 资源隔离和提高利用率。"
  },
  {
    type: "single",
    q: "摘要任务中，最常见的自动评价指标是？",
    options: ["ROUGE", "RMSE", "CUDA", "MIG"],
    answer: [0],
    note: "ROUGE 常用于摘要，关注与参考摘要的重合。"
  },
  {
    type: "single",
    q: "语言模型 perplexity 较低通常说明什么？",
    options: ["模型对下一个 token 的预测更确定", "模型一定不会幻觉", "模型已经完成隐私审计", "模型检索召回率一定更高"],
    answer: [0],
    note: "Perplexity 衡量语言建模不确定性，不保证事实正确。"
  },
  {
    type: "multiple",
    q: "评价 RAG 系统时，哪些指标或维度是合理的？",
    options: ["检索 recall@k", "回答是否忠实于检索上下文", "端到端延迟", "显示器分辨率"],
    answer: [0, 1, 2],
    note: "RAG 要同时看检索质量、生成质量、性能和用户体验。"
  },
  {
    type: "single",
    q: "Few-shot prompting 的特点是？",
    options: ["在提示词中提供少量示例", "完全不提供任务说明", "更新模型权重", "切分 GPU"],
    answer: [0],
    note: "Few-shot 通过示例让模型模仿输入输出模式。"
  },
  {
    type: "single",
    q: "Self-attention 中 positional encoding 的作用是？",
    options: ["补充 token 顺序信息", "加密训练数据", "降低显卡价格", "替代损失函数"],
    answer: [0],
    note: "Self-attention 本身不天然携带顺序，需要位置编码。"
  },
  {
    type: "single",
    q: "在 RAG 中 chunk 太小可能带来的问题是？",
    options: ["丢失必要上下文", "模型参数无法保存", "NCCL 无法通信", "ROUGE 一定为零"],
    answer: [0],
    note: "chunk 太小可能缺少上下文，太大则可能引入噪声。"
  },
  {
    type: "single",
    q: "如果希望模型输出更可控、更稳定，以下哪项通常有帮助？",
    options: ["明确输出格式和约束", "随机删除系统提示", "无限提高 temperature", "不做任何评估"],
    answer: [0],
    note: "结构化格式、明确约束和低随机性通常提升稳定性。"
  },
  {
    type: "single",
    q: "RLHF 中 reward model 学到的主要是？",
    options: ["人类偏好信号", "向量数据库索引", "GPU 分区规则", "HTML 样式"],
    answer: [0],
    note: "Reward model 用人类偏好数据学习如何评价输出好坏。"
  },
  {
    type: "single",
    q: "模型评估时把测试集信息用于调参，属于什么风险？",
    options: ["数据泄漏", "模型压缩", "NIM 部署", "提示词工程"],
    answer: [0],
    note: "测试信息进入训练或调参流程，会导致评估虚高。"
  },
  {
    type: "single",
    q: "汽车零件寿命预测通常属于哪类机器学习任务？",
    options: ["回归", "机器翻译", "摘要", "图像生成"],
    answer: [0],
    note: "寿命、温度、磨损量等连续数值预测通常是回归。"
  },
  {
    type: "multiple",
    q: "上线 LLM 应用后，哪些监控是合理的？",
    options: ["延迟和错误率", "用户反馈和异常输出", "数据漂移和质量变化", "只看页面颜色"],
    answer: [0, 1, 2],
    note: "生产应用需要持续监控性能、质量、安全和数据变化。"
  },
  {
    type: "single",
    q: "当正例漏报代价很高时，应特别关注哪个指标？",
    options: ["Recall", "BLEU", "R2", "NCCL"],
    answer: [0],
    note: "Recall 衡量真实正例中被找出的比例，漏报高时 recall 低。"
  },
  {
    type: "single",
    q: "Cosine similarity 在 LLM 应用中常用于？",
    options: ["衡量 embedding 相似度", "计算模型训练轮数", "评估图像亮度", "替代权限控制"],
    answer: [0],
    note: "语义检索常用 cosine similarity 比较向量方向相似度。"
  },
  {
    type: "single",
    q: "A/B 测试两个 prompt 时，最重要的是？",
    options: ["控制变量并使用一致的评价指标", "只比较 prompt 长度", "每次换不同模型和题目", "不记录结果"],
    answer: [0],
    note: "A/B test 需要控制变量、固定评价集和明确目标指标。"
  },
  {
    type: "single",
    q: "如果训练数据中某类群体代表性不足，最直接关联的可信 AI 风险是？",
    options: ["偏见和公平性问题", "推理吞吐提升", "BLEU 自动变高", "GPU 资源隔离"],
    answer: [0],
    note: "数据代表性不足可能导致模型对某些群体表现更差。"
  },
  {
    type: "single",
    q: "要让模型输出附带证据来源，最直接的系统设计措施是？",
    options: ["RAG 保留来源元数据并在回答中引用", "只增加 batch size", "切换到 MAE 指标", "关闭日志"],
    answer: [0],
    note: "RAG 文档元数据和引用机制有助于可追溯性。"
  }
];

const questionDomains = [
  "机器学习和 AI 核心知识",
  "机器学习和 AI 核心知识",
  "软件开发",
  "机器学习和 AI 核心知识",
  "数据分析",
  "机器学习和 AI 核心知识",
  "软件开发",
  "软件开发",
  "数据分析",
  "可信 AI",
  "软件开发",
  "软件开发",
  "软件开发",
  "软件开发",
  "数据分析",
  "数据分析",
  "实验",
  "机器学习和 AI 核心知识",
  "机器学习和 AI 核心知识",
  "机器学习和 AI 核心知识",
  "机器学习和 AI 核心知识",
  "实验",
  "实验",
  "机器学习和 AI 核心知识",
  "可信 AI",
  "数据分析",
  "机器学习和 AI 核心知识",
  "实验",
  "可信 AI",
  "可信 AI"
];

questions.forEach((question, index) => {
  question.domain = questionDomains[index];
});

const storageKeys = {
  completedDays: "ncaGenl.completedDays",
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
    // Some browsers restrict localStorage for file:// pages. The app still works without persistence.
  }
}

function getCompletedDays() {
  return new Set(readJson(storageKeys.completedDays, []));
}

function setCompletedDays(days) {
  writeJson(storageKeys.completedDays, [...days]);
}

function getDayId(weekIndex, dayIndex) {
  return `w${weekIndex + 1}-d${dayIndex + 1}`;
}

function getCurrentFilter() {
  return document.querySelector("[data-week-filter].is-active")?.dataset.weekFilter || "all";
}

function renderDomains() {
  const root = document.querySelector("#domainGrid");
  root.innerHTML = domains.map((domain) => `
    <article class="domain-card">
      <strong>${domain.name}</strong>
      <div class="weight"><b>${domain.weight}%</b><span>考试权重</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${domain.weight * 3.1}%; background:${domain.color}"></div></div>
      <p>${domain.summary}</p>
    </article>
  `).join("");
}

function renderStudyStatus() {
  const completed = getCompletedDays();
  const totalDays = weeks.reduce((sum, week) => sum + week.days.length, 0);
  const percent = Math.round((completed.size / totalDays) * 100);
  const lastQuiz = readJson(storageKeys.lastQuiz, null);
  const nextTask = weeks.flatMap((week, weekIndex) =>
    week.days.map((day, dayIndex) => ({
      id: getDayId(weekIndex, dayIndex),
      label: `第 ${weekIndex + 1} 周 Day ${dayIndex + 1}`,
      day
    }))
  ).find((item) => !completed.has(item.id));
  const coachText = nextTask
    ? `下一步：${nextTask.label}，${nextTask.day}`
    : "8 周任务已全部打卡。现在进入错题复盘和限时模拟。";
  const quizText = lastQuiz
    ? `${lastQuiz.score}/${lastQuiz.total}，弱项：${lastQuiz.weakest || "暂无"}`
    : "尚未提交";

  document.querySelector("#studyStatus").innerHTML = `
    <div class="status-tile"><span>日历进度</span><strong>${completed.size}/${totalDays}</strong></div>
    <div class="status-tile"><span>完成比例</span><strong>${percent}%</strong></div>
    <div class="status-tile"><span>最近测验</span><strong>${quizText}</strong></div>
    <p class="coach-note">${coachText}</p>
  `;
}

function renderCalendar(filter = "all") {
  const root = document.querySelector("#studyCalendar");
  const completed = getCompletedDays();
  const visible = filter === "all" ? weeks : weeks.filter((week) => week.phase === filter);
  root.innerHTML = visible.map((week) => {
    const weekIndex = weeks.indexOf(week);
    const doneCount = week.days.filter((_, dayIndex) => completed.has(getDayId(weekIndex, dayIndex))).length;
    const weekPercent = Math.round((doneCount / week.days.length) * 100);
    return `
    <article class="week-card">
      <header class="week-header">
        <span class="week-badge">Week ${weekIndex + 1}</span>
        <div>
          <h3>${week.title}</h3>
          <p>${week.goal}</p>
        </div>
        <div class="week-meta">
          <span class="week-output">${week.output}</span>
          <div class="week-progress" aria-label="本周进度 ${weekPercent}%"><span style="width:${weekPercent}%"></span></div>
        </div>
      </header>
      <div class="days-grid">
        ${week.days.map((day, dayIndex) => `
          <div class="day-cell">
            <label class="day-check">
              <input type="checkbox" data-day-id="${getDayId(weekIndex, dayIndex)}" ${completed.has(getDayId(weekIndex, dayIndex)) ? "checked" : ""}>
              <span class="day-copy">
                <span class="day-name">Day ${dayIndex + 1}</span>
                <p>${day}</p>
              </span>
            </label>
          </div>
        `).join("")}
      </div>
    </article>
  `;
  }).join("");
}

function renderKnowledgeMap() {
  const root = document.querySelector("#knowledgeMap");
  root.innerHTML = knowledge.map((item) => `
    <article class="map-card" style="border-left-color:${item.color}">
      <h3>${item.title}<span>${item.weight}</span></h3>
      <div class="tag-row">
        ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderCoverageTable() {
  const root = document.querySelector("#coverageTable tbody");
  root.innerHTML = coverage.map((row) => `
    <tr>
      <td>${row.domain}</td>
      <td><ul>${row.points.map((item) => `<li>${item}</li>`).join("")}</ul></td>
      <td><ul>${row.forms.map((item) => `<li>${item}</li>`).join("")}</ul></td>
    </tr>
  `).join("");
}

function renderConceptTabs(activeId = concepts[0].id) {
  const tabs = document.querySelector("#conceptTabs");
  tabs.innerHTML = concepts.map((concept) => `
    <button class="tab-button ${concept.id === activeId ? "is-active" : ""}" type="button" data-concept="${concept.id}">
      ${concept.label}
    </button>
  `).join("");
  renderConceptPanel(activeId);
}

function renderConceptPanel(activeId) {
  const concept = concepts.find((item) => item.id === activeId);
  const panel = document.querySelector("#conceptPanel");
  panel.innerHTML = `
    <h3>${concept.label}</h3>
    <p class="concept-definition">${concept.definition}</p>
    <div class="concept-grid">
      <div class="concept-block concept-wide">
        <h4>工作机制</h4>
        <ul>${concept.mechanics.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div class="concept-block">
        <h4>汽车行业类比</h4>
        <p>${concept.automotive}</p>
      </div>
      <div class="concept-block">
        <h4>考试会怎么问</h4>
        <ul>${concept.exam.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div class="concept-block">
        <h4>应该怎么答</h4>
        <ul>${concept.answer.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div class="concept-block">
        <h4>易错点</h4>
        <ul>${concept.traps.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      <div class="concept-block concept-drill">
        <h4>练习任务</h4>
        <p>${concept.drill}</p>
      </div>
    </div>
  `;
}

function renderFlashcard(index = 0) {
  const card = flashcards[index % flashcards.length];
  document.querySelector("#flashQuestion").textContent = card[0];
  const answer = document.querySelector("#flashAnswer");
  answer.textContent = card[1];
  answer.hidden = true;
  document.querySelector("#toggleFlash").textContent = "显示答案";
  document.querySelector("#flashcard").dataset.index = String(index % flashcards.length);
}

function renderQuizFilters() {
  const filter = document.querySelector("#quizDomainFilter");
  const domains = ["all", ...new Set(questions.map((question) => question.domain))];
  filter.innerHTML = domains.map((domain) => `
    <option value="${domain}">${domain === "all" ? "全部领域" : domain}</option>
  `).join("");
}

function getVisibleQuestions() {
  const selectedDomain = document.querySelector("#quizDomainFilter")?.value || "all";
  return questions
    .map((question, index) => ({ ...question, originalIndex: index }))
    .filter((question) => selectedDomain === "all" || question.domain === selectedDomain);
}

function renderQuiz() {
  const root = document.querySelector("#quiz");
  const visibleQuestions = getVisibleQuestions();
  root.innerHTML = `
    ${visibleQuestions.map((question, qIndex) => `
      <article class="question-card" data-question="${question.originalIndex}">
        <p class="question-title">${qIndex + 1}. ${question.q} <span class="tag">${question.type === "multiple" ? "多选" : "单选"}</span> <span class="tag">${question.domain}</span></p>
        ${question.options.map((option, oIndex) => `
          <label class="option">
            <input type="${question.type === "multiple" ? "checkbox" : "radio"}" name="q-${question.originalIndex}" value="${oIndex}">
            <span>${String.fromCharCode(65 + oIndex)}. ${option}</span>
          </label>
        `).join("")}
        <div class="answer-note">${question.note}</div>
      </article>
    `).join("")}
    <div class="submit-row">
      <button class="primary-action" id="submitQuiz" type="button">提交并查看解析</button>
      <span class="score-pill" id="scorePill" hidden></span>
    </div>
    <div class="score-breakdown" id="scoreBreakdown" hidden></div>
  `;
}

function gradeQuiz() {
  let score = 0;
  const breakdown = {};
  const visibleQuestions = getVisibleQuestions();
  visibleQuestions.forEach((question) => {
    const card = document.querySelector(`[data-question="${question.originalIndex}"]`);
    const checked = [...card.querySelectorAll("input:checked")].map((input) => Number(input.value)).sort();
    const answer = [...question.answer].sort();
    const correct = checked.length === answer.length && checked.every((value, index) => value === answer[index]);
    if (correct) score += 1;
    breakdown[question.domain] ??= { score: 0, total: 0 };
    breakdown[question.domain].total += 1;
    if (correct) breakdown[question.domain].score += 1;
    card.querySelector(".answer-note").classList.add("is-visible");
    card.querySelectorAll(".option").forEach((option, oIndex) => {
      option.style.borderColor = answer.includes(oIndex) ? "#258060" : "#dce3eb";
      option.style.background = answer.includes(oIndex) ? "#edf7f2" : "#fff";
    });
  });
  const pill = document.querySelector("#scorePill");
  pill.hidden = false;
  pill.textContent = `得分 ${score}/${visibleQuestions.length}`;
  const weakest = Object.entries(breakdown)
    .sort((a, b) => (a[1].score / a[1].total) - (b[1].score / b[1].total))[0]?.[0] || "";
  const breakdownText = Object.entries(breakdown)
    .map(([domain, result]) => `${domain}：${result.score}/${result.total}`)
    .join("；");
  const breakdownBox = document.querySelector("#scoreBreakdown");
  breakdownBox.hidden = false;
  breakdownBox.innerHTML = `<strong>领域得分</strong>${breakdownText}<br>建议下一轮优先复习：${weakest || "暂无弱项"}`;
  writeJson(storageKeys.lastQuiz, {
    score,
    total: visibleQuestions.length,
    weakest,
    at: new Date().toISOString()
  });
  renderStudyStatus();
}

renderDomains();
renderStudyStatus();
renderCalendar();
renderKnowledgeMap();
renderCoverageTable();
renderConceptTabs();
renderFlashcard();
renderQuizFilters();
renderQuiz();

document.querySelectorAll("[data-week-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-week-filter]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderCalendar(button.dataset.weekFilter);
  });
});

document.querySelector("#studyCalendar").addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-day-id]");
  if (!checkbox) return;
  const completed = getCompletedDays();
  if (checkbox.checked) {
    completed.add(checkbox.dataset.dayId);
  } else {
    completed.delete(checkbox.dataset.dayId);
  }
  setCompletedDays(completed);
  renderStudyStatus();
  renderCalendar(getCurrentFilter());
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  setCompletedDays(new Set());
  renderStudyStatus();
  renderCalendar(getCurrentFilter());
});

document.querySelector("#conceptTabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-concept]");
  if (!button) return;
  renderConceptTabs(button.dataset.concept);
});

document.querySelector("#toggleFlash").addEventListener("click", () => {
  const answer = document.querySelector("#flashAnswer");
  answer.hidden = !answer.hidden;
  document.querySelector("#toggleFlash").textContent = answer.hidden ? "显示答案" : "隐藏答案";
});

document.querySelector("#nextFlash").addEventListener("click", () => {
  const current = Number(document.querySelector("#flashcard").dataset.index || "0");
  renderFlashcard(current + 1);
});

document.querySelector("#quiz").addEventListener("click", (event) => {
  if (event.target.id === "submitQuiz") gradeQuiz();
});

document.querySelector("#quizDomainFilter").addEventListener("change", () => {
  renderQuiz();
});

document.querySelector("#resetQuiz").addEventListener("click", () => {
  renderQuiz();
});

# 04. 闪卡

使用方法：每天 20-30 分钟，遮住答案自测。第 8 周只看错过的卡。

## LLM 基础

Q: Transformer 的核心机制是什么？  
A: Self-attention，让每个 token 根据上下文动态关注其他 token。

Q: Query、Key、Value 分别用于什么？  
A: Query 表示当前 token 想找什么，Key 表示其他 token 提供什么匹配信号，Value 是被加权聚合的信息。

Q: 为什么需要 positional encoding？  
A: Self-attention 本身不天然包含顺序信息，需要显式加入 token 位置。

Q: Embedding 是什么？  
A: 把 token、句子或文档映射成向量，使语义相似性可以用数学距离计算。

Q: Context window 是什么？  
A: 模型一次能接收和处理的最大上下文长度。

Q: Temperature 变高会怎样？  
A: 输出更随机、更有创造性，但稳定性和可控性下降。

Q: Perplexity 衡量什么？  
A: 语言模型预测下一个 token 的不确定性，越低通常表示预测越确定。

## RAG 与 Prompt

Q: RAG 解决什么问题？  
A: 让 LLM 使用外部知识、私有知识或最新知识，降低幻觉和重训成本。

Q: RAG 的核心步骤是什么？  
A: 文档切分、embedding、向量存储、相似检索、上下文注入、LLM 生成。

Q: RAG 和 fine-tuning 的区别？  
A: RAG 不改模型参数，靠检索补充上下文；fine-tuning 会更新模型参数。

Q: 向量数据库在 RAG 中做什么？  
A: 存储 embedding，并根据相似度检索相关文档片段。

Q: Few-shot prompting 是什么？  
A: 在 prompt 中提供少量示例，让模型模仿输入输出模式。

Q: Prompt engineering 的目标是什么？  
A: 通过清晰指令、约束、示例和格式要求，让模型输出更符合任务目标。

Q: 为什么 prompt 不能单独解决高风险业务问题？  
A: Prompt 易被误解或绕过，高风险场景还需要检索、规则、审核、监控和权限控制。

## 微调与对齐

Q: Fine-tuning 适合什么场景？  
A: 让模型适配特定任务、领域术语、固定输出风格或业务流程。

Q: LoRA 的核心思想是什么？  
A: 冻结大模型大部分参数，只训练小型低秩适配矩阵。

Q: LoRA 的优点是什么？  
A: 训练成本低、存储小、部署灵活，适合参数高效微调。

Q: RLHF 的目的是什么？  
A: 通过人类偏好反馈让模型输出更符合人类期望和安全要求。

Q: RLHF 的典型流程是什么？  
A: 收集偏好数据、训练 reward model、用强化学习优化模型。

## 实验与指标

Q: Precision 关注什么？  
A: 预测为正的样本中有多少是真的正。

Q: Recall 关注什么？  
A: 真实为正的样本中有多少被模型找出来。

Q: F1 适合什么情况？  
A: 需要平衡 precision 和 recall，尤其是类别不平衡时。

Q: BLEU 常用于什么？  
A: 机器翻译评价，基于 n-gram 重合。

Q: ROUGE 常用于什么？  
A: 摘要评价，衡量生成摘要与参考摘要的重合。

Q: Cosine similarity 常用于什么？  
A: 衡量 embedding 向量方向相似度，常用于语义检索。

Q: A/B test 的核心是什么？  
A: 控制变量，比较两个版本在同一目标指标上的表现。

Q: Baseline 为什么重要？  
A: 没有基线就无法判断新方法是否真的改进。

## NVIDIA 工具

Q: NeMo 主要用于什么？  
A: 构建、训练、微调和定制生成式 AI/LLM。

Q: NIM 主要用于什么？  
A: 把优化后的模型以推理微服务形式快速部署。

Q: Triton Inference Server 主要用于什么？  
A: 高性能模型服务，支持多框架、动态批处理和生产推理。

Q: TensorRT 主要用于什么？  
A: 优化模型推理性能，提高吞吐、降低延迟。

Q: RAPIDS 主要用于什么？  
A: GPU 加速数据科学和机器学习工作流。

Q: CUDA 是什么？  
A: NVIDIA GPU 通用计算平台和编程模型。

Q: NCCL 常用于什么？  
A: 多 GPU/多节点训练中的高效通信，例如 AllReduce。

Q: MIG 是什么？  
A: Multi-Instance GPU，把一块 GPU 切成多个隔离实例。

## 可信 AI

Q: Hallucination 是什么？  
A: 模型生成看似流畅但事实上错误或无依据的内容。

Q: 降低幻觉的常见方法有哪些？  
A: RAG、来源引用、事实校验、限制回答范围、人工审核。

Q: AI 偏见通常来自哪里？  
A: 训练数据、标签、采样方式、特征选择、系统反馈循环。

Q: 隐私保护的基本原则是什么？  
A: 数据最小化、授权同意、匿名化、访问控制、审计。

Q: 为什么需要模型监控？  
A: 上线后数据分布、用户行为和模型表现会变化，需要及时发现漂移和风险。


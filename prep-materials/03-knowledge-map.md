# 03. 必会知识地图与易混点

## A. 机器学习和 AI 核心知识

必会概念：

- Supervised learning：有标签数据，做分类或回归。
- Unsupervised learning：无标签数据，做聚类、降维、异常检测。
- Overfitting：训练集表现好，泛化差。
- Underfitting：模型太简单，训练集和测试集都差。
- Data leakage：测试信息泄漏到训练过程，导致评估虚高。
- Feature engineering：构造更有预测意义的输入特征。
- Neural network：由层、权重、激活函数组成，通过反向传播学习。
- Backpropagation：根据损失函数梯度更新权重。
- Foundation model：在大规模数据上预训练，可迁移到多任务的大模型。

易混点：

- Accuracy 不适合严重类别不平衡场景。
- Validation set 用于调参，test set 用于最终评估。
- 高训练准确率不代表模型可上线。
- 更大模型不必然更适合生产，延迟、成本、隐私和可维护性也重要。

## B. Transformer 与 LLM

必会概念：

- Tokenization：把文本切成 token。
- Embedding：把 token 或文本映射成向量。
- Positional encoding：补充顺序信息，因为 self-attention 本身不天然理解顺序。
- Self-attention：每个 token 根据上下文动态关注其他 token。
- Query/Key/Value：计算注意力权重并聚合信息的三组向量。
- Multi-head attention：多个注意力头并行学习不同关系。
- Context window：模型一次能处理的最大上下文长度。
- Temperature：控制生成随机性，越高越发散。
- Top-p/top-k：控制采样候选范围。

易混点：

- Embedding 不是“理解本身”，而是可计算的语义表示。
- Transformer 不等于 LLM，但现代 LLM 大多基于 Transformer。
- 低 perplexity 通常表示语言模型预测更确定，但不等于事实更正确。
- 更长上下文不能替代检索质量和事实校验。

## C. RAG

标准流程：

1. 准备外部知识文档。
2. 文档清洗和切分 chunk。
3. 生成 embedding。
4. 存入向量数据库。
5. 用户问题生成 query embedding。
6. 检索 top-k 相关 chunk。
7. 把检索内容放入 prompt。
8. LLM 基于上下文生成答案。
9. 可选：引用来源、重排、过滤、安全检查。

考试常问：

- RAG 用于引入私有知识、最新知识、领域知识。
- RAG 通常比重新训练基础模型成本低。
- RAG 可以减少幻觉，但不能保证完全无幻觉。
- 检索质量差会导致生成质量差。

易混点：

- RAG 不是 fine-tuning。
- 向量数据库负责相似度检索，不负责“生成答案”。
- Chunk 太大可能引入噪声，太小可能丢上下文。
- Top-k 太小可能漏信息，太大可能让 prompt 混乱。

## D. Prompt Engineering

常见方法：

- Zero-shot：不给示例，直接要求模型完成任务。
- Few-shot：给少量示例，让模型模仿模式。
- Role prompting：指定角色，例如“你是质量工程师”。
- Constraint prompting：指定约束，例如格式、字数、禁止臆测。
- Structured output：要求 JSON、表格、字段。
- Chain-of-thought：引导推理，但生产中可要求“先分析再给结论”或只输出结论。

易混点：

- Prompt 不是越长越好。
- 示例质量比示例数量更重要。
- 对高风险任务，需要检索、规则、人工审核和日志，不只靠 prompt。

## E. Fine-tuning、LoRA、RLHF

Fine-tuning：

- 在预训练模型基础上，用任务或领域数据继续训练。
- 适合固定风格、特定任务、领域表达习惯。

LoRA：

- Low-Rank Adaptation。
- 冻结大部分原模型参数，只训练小的低秩适配矩阵。
- 优点是训练成本低、存储小、适合快速适配。

RLHF：

- Reinforcement Learning from Human Feedback。
- 典型步骤：收集人类偏好、训练 reward model、用强化学习优化模型输出。
- 目标是让模型输出更符合人类偏好和安全要求。

易混点：

- RAG 改的是上下文信息来源，fine-tuning 改的是模型参数。
- LoRA 是一种参数高效微调方式，不是检索技术。
- RLHF 主要解决对齐问题，不是事实数据库。

## F. 实验与指标

分类任务：

- Precision：预测为正的样本里有多少是真的正。
- Recall：真实为正的样本里有多少被找出来。
- F1：precision 和 recall 的调和平均。

回归任务：

- MSE/RMSE：误差平方相关，对大误差更敏感。
- MAE：平均绝对误差，更直观。
- R2：解释方差比例。

LLM/NLP：

- Perplexity：语言模型预测不确定性。
- BLEU：常用于翻译，基于 n-gram 重合。
- ROUGE：常用于摘要，关注与参考摘要重合。
- Cosine similarity：向量相似度。

RAG：

- Recall@k：正确文档是否在前 k 个结果中。
- MRR：第一个正确结果排名越靠前越好。
- nDCG：考虑排序位置和相关性等级。
- Faithfulness：回答是否忠实于检索上下文。

易混点：

- BLEU/ROUGE 高不代表事实正确。
- Perplexity 低不代表回答没有幻觉。
- RAG 评估要同时看 retrieval 和 generation。

## G. NVIDIA 工具栈

| 工具 | 关键词 | 典型场景 |
| --- | --- | --- |
| NeMo | 训练、微调、定制生成式 AI | 定制 LLM、LoRA、对话模型 |
| NIM | 推理微服务 | 快速部署模型 API |
| Triton Inference Server | 模型服务 | 多框架统一 serving、动态批处理 |
| TensorRT | 推理优化 | 降低延迟、提高吞吐、量化 |
| TensorRT-LLM | LLM 推理优化 | 优化大语言模型部署 |
| RAPIDS | GPU 数据科学 | cuDF、cuML、加速 EDA/ML |
| CUDA | GPU 编程基础 | GPU 通用计算 |
| NCCL | 多 GPU 通信 | 分布式训练 AllReduce |
| MIG | GPU 分区 | 隔离资源、提高利用率 |

易混点：

- TensorRT 优化推理，不是训练框架。
- Triton 负责服务模型，不是专门的数据分析库。
- RAPIDS 类似 GPU 加速版 pandas/scikit-learn 生态。
- NIM 更偏打包好的推理微服务，NeMo 更偏构建和定制模型。

## H. 可信 AI

必会风险：

- Hallucination：模型编造看似合理但错误的信息。
- Bias：训练数据或系统设计导致不公平输出。
- Privacy：训练或推理中泄露敏感信息。
- Consent：数据使用是否取得授权。
- Explainability：结果是否能被理解和审计。
- Security：prompt injection、数据外泄、越权访问。
- Drift：上线后数据分布或用户行为变化导致性能下降。

缓解措施：

- RAG 加来源引用。
- 人工审核高风险输出。
- 数据匿名化和最小化收集。
- 访问控制和日志审计。
- 持续监控模型指标和用户反馈。
- 对敏感场景设置拒答和升级流程。


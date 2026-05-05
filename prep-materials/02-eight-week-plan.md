# 02. 八周备考计划

假设每周投入 6-8 小时。若工作忙，保底完成每周的“必做”；若时间宽裕，再做“加分实践”。

## 第 1 周：校准考试范围与 ML/AI 基础

目标：把已有机器学习经验转成考试语言。

必做：

- 阅读官方学习指南，记住五大领域和权重。
- 复习监督学习、无监督学习、分类、回归、聚类、过拟合、欠拟合。
- 复习训练集、验证集、测试集、交叉验证、数据泄漏。
- 复习常见指标：accuracy、precision、recall、F1、MSE、RMSE、R2。
- 用你做过的汽车预测模型写一页总结：问题、数据、特征、模型、指标、风险。

加分实践：

- 用一个汽车相关数据集做 EDA：分布、缺失值、异常值、相关性。
- 试着解释“为什么准确率高不一定代表模型好”。

产出：

- 一页 ML 基础错题/弱点清单。
- 一页个人项目转考试术语总结。

## 第 2 周：Transformer、Embedding 与 LLM 基础

目标：能说清 LLM 为什么能理解上下文，以及 Embedding/RAG 的前置知识。

必做：

- 学习 Transformer 架构：token、embedding、positional encoding、self-attention、multi-head attention、feed-forward、layer norm。
- 理解 Query/Key/Value 的作用。
- 理解为什么 attention 可以建模长距离依赖。
- 学习 foundation model、pretraining、fine-tuning、instruction tuning。
- 学习 tokenization 和上下文窗口的意义。

加分实践：

- 手动画一张 Transformer 数据流图。
- 用一句汽车场景文本做 token/embedding/相似度示例。

产出：

- 能用 3 分钟口述：Transformer 如何处理一句话。
- 背下 15 张 LLM 基础闪卡。

## 第 3 周：Prompt Engineering 与 RAG

目标：掌握 LLM 应用最常考的两个方向。

必做：

- 学习 prompt engineering：zero-shot、few-shot、role prompting、instruction、constraint、output format。
- 理解 chain-of-thought 的用途和风险。
- 学习 RAG 流程：文档切分、embedding、向量库、检索、rerank、上下文注入、生成。
- 理解 RAG 如何减少幻觉，但不能完全消除幻觉。
- 学习向量相似度：cosine similarity、top-k retrieval。

加分实践：

- 用汽车维修手册、质量报告或学习平台资料做一个小型 RAG demo。
- 对比同一问题在“无检索”和“有检索”下的回答质量。

产出：

- 一张 RAG 流程图。
- 10 个高质量 prompt 模板。

## 第 4 周：实验设计与评估

目标：拿下 22% 的 Experimentation。

必做：

- 学习 A/B test、离线评估、在线评估、zero-shot/few-shot evaluation。
- 理解 baseline 的意义。
- 复习统计对比：均值、方差、置信区间、显著性、样本量。
- 学习 LLM 指标：perplexity、BLEU、ROUGE、exact match、semantic similarity。
- 学习 RAG 指标：retrieval recall、precision@k、MRR、nDCG、faithfulness。

加分实践：

- 设计一个“两个 prompt 哪个更好”的 A/B 测试。
- 为汽车故障问答系统设计 5 个评价维度。

产出：

- 一页“任务类型 -> 指标选择”表。
- 20 道实验与指标练习题。

## 第 5 周：软件开发与部署思维

目标：补齐考试对应用开发、部署、性能和系统组件的要求。

必做：

- 学习 LLM 应用基本架构：前端、API、模型服务、向量库、日志、监控。
- 学习 Python NLP 常用库：NumPy、pandas、spaCy、scikit-learn、PyTorch。
- 理解 API、batch inference、streaming、latency、throughput。
- 学习容器化、微服务、模型版本管理。
- 复习测试、调试、可观测性、实验记录。

加分实践：

- 写一个简单脚本：读取文本、分块、生成 embedding、做相似度检索。
- 为你的 AI 学习平台画一张模型调用架构图。

产出：

- 一页 LLM 应用架构图。
- 一页开发和部署术语表。

## 第 6 周：NVIDIA 工具栈

目标：能在选择题里快速判断“这个场景该选哪个 NVIDIA 工具”。

必做：

- NeMo：用于构建、定制、训练、微调生成式 AI 模型。
- NIM：NVIDIA Inference Microservices，用于快速部署优化后的模型服务。
- Triton Inference Server：统一服务多框架模型，支持高性能推理。
- TensorRT/TensorRT-LLM：优化推理性能，降低延迟、提高吞吐。
- RAPIDS：GPU 加速数据科学，cuDF 类似 pandas，cuML 类似 scikit-learn。
- CUDA：GPU 通用计算基础。
- NCCL：多 GPU/多节点通信。
- MIG：把 GPU 分割成多个隔离实例，提高资源利用和隔离。

加分实践：

- 按“训练/微调/部署/优化/数据分析/多 GPU”分类整理工具。
- 看 1-2 个 NVIDIA 官方 demo 或文档页面，记住工具定位，不追深安装细节。

产出：

- 一张 NVIDIA 工具速查表。
- 20 张工具闪卡。

## 第 7 周：可信 AI、隐私、偏见与安全

目标：把最后 10% 稳稳拿下，同时帮助应用题判断风险。

必做：

- 学习 hallucination、bias、fairness、privacy、consent、explainability。
- 理解为什么 RAG、引用来源、后处理校验、人工审核能降低幻觉风险。
- 理解训练数据偏差如何影响模型输出。
- 理解敏感数据处理：匿名化、最小化收集、访问控制、审计日志。
- 学习模型监控：漂移、性能下降、异常输出、用户反馈。

加分实践：

- 给汽车企业内部 AI 助手写一份风险清单。
- 设计 5 条安全和隐私 guardrails。

产出：

- 一页 Trustworthy AI 风险矩阵。
- 10 道可信 AI 练习题。

## 第 8 周：冲刺与模拟

目标：形成考试肌肉记忆。

必做：

- 每天复习闪卡 20-30 分钟。
- 做 `05-practice-questions.md`，错题重做。
- 按 60 分钟完成一次 50 题模拟。
- 对错题按领域归类，补弱项。
- 最后 2 天只看：工具栈、指标、RAG、Transformer、可信 AI。

加分实践：

- 用英文再读一遍关键术语，避免考试中英文切换卡壳。
- 给自己录一段 10 分钟口述：NCA-GENL 五大领域都考什么。

考前一天：

- 不再学新概念。
- 只看错题、闪卡、工具速查表。
- 确认考试地点、证件、时间、路线。


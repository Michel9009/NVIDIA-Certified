# 05. 原创模拟选择题

说明：这些题不是官方题库，而是按官方考试领域和常见考点原创，用来训练判断力。建议第 4 周开始做第一遍，第 8 周限时重做。

## 题目

1. 在 RAG 系统中，向量数据库最主要的作用是什么？
   A. 微调 LLM 参数  
   B. 存储和检索 embedding 相似的文本片段  
   C. 替代 LLM 生成最终答案  
   D. 自动标注训练数据

2. 一个汽车质量问答助手经常编造不存在的维修步骤，最直接的改进方向是？
   A. 提高 temperature  
   B. 引入基于官方维修文档的 RAG 和来源引用  
   C. 删除所有系统提示词  
   D. 只增加模型参数量

3. Transformer 中 self-attention 的主要价值是？
   A. 让模型只能关注相邻 token  
   B. 让每个 token 根据上下文关注其他 token  
   C. 压缩图片尺寸  
   D. 替代所有训练数据

4. LoRA 的核心优势是？
   A. 完全不需要训练数据  
   B. 通过参数高效方式微调大模型  
   C. 专门用于向量数据库检索  
   D. 只能用于图像生成

5. 对于类别极不平衡的故障检测任务，只看 accuracy 最大的问题是？
   A. accuracy 无法用于分类任务  
   B. 模型可能把所有样本预测为多数类仍获得高 accuracy  
   C. accuracy 等同于 recall  
   D. accuracy 只能用于回归

6. BLEU 更常用于评价哪类任务？
   A. 机器翻译  
   B. GPU 显存占用  
   C. 图像分类  
   D. 数据库事务

7. ROUGE 更常用于评价哪类任务？
   A. 文本摘要  
   B. 硬件温度  
   C. 模型压缩率  
   D. 用户登录安全

8. Perplexity 主要衡量什么？
   A. 语言模型预测 token 的不确定性  
   B. 向量数据库容量  
   C. 图像分辨率  
   D. API 调用次数

9. 如果目标是降低 LLM 推理延迟，最相关的 NVIDIA 工具是？
   A. TensorRT/TensorRT-LLM  
   B. cuDF 电子表格  
   C. Git  
   D. Matplotlib

10. 如果目标是统一服务 PyTorch、TensorFlow、ONNX 等多框架模型，较合适的是？
    A. Triton Inference Server  
    B. Excel  
    C. Jupyter Notebook 主题  
    D. BLEU

11. NeMo 更适合以下哪类任务？
    A. 构建和定制生成式 AI 模型  
    B. 浏览网页  
    C. 管理考试报名  
    D. 绘制机械 CAD 图

12. NIM 的定位更接近？
    A. 推理微服务，帮助快速部署模型 API  
    B. 一种文本相似度指标  
    C. 一种激活函数  
    D. 一种数据泄漏检测算法

13. RAPIDS 的主要价值是？
    A. GPU 加速数据科学和传统 ML 工作流  
    B. 让 prompt 自动变短  
    C. 替代所有数据库  
    D. 提高显示器刷新率

14. 在 prompt engineering 中提供几个输入输出示例属于？
    A. Few-shot prompting  
    B. Zero-shot prompting  
    C. Gradient descent  
    D. Quantization

15. RAG 中 chunk 太大可能导致什么问题？
    A. 上下文噪声增加，检索结果不够聚焦  
    B. 模型无法生成任何文字  
    C. GPU 自动损坏  
    D. BLEU 必然为 100

16. RLHF 中 reward model 的作用是？
    A. 根据人类偏好评估输出好坏  
    B. 存储 PDF 文件  
    C. 计算 GPU 温度  
    D. 生成训练集文件名

17. 数据泄漏最可能造成什么结果？
    A. 离线评估结果虚高，上线后表现变差  
    B. 模型参数自动归零  
    C. 所有类别完全平衡  
    D. 推理速度必然下降

18. 对一个 RAG 系统，retrieval recall@k 衡量的是？
    A. 正确相关文档是否出现在前 k 个检索结果中  
    B. LLM 生成速度  
    C. 用户界面颜色  
    D. 模型训练轮数

19. 如果企业内部 AI 助手会处理员工个人信息，最应该优先考虑？
    A. 数据最小化、授权同意、访问控制和审计  
    B. 把 temperature 调到最高  
    C. 关闭所有日志但开放所有权限  
    D. 只看 BLEU 分数

20. Multi-head attention 的意义是？
    A. 让模型从多个表示子空间学习不同关系  
    B. 让多个用户同时登录  
    C. 让模型只能处理英文  
    D. 让 embedding 维度固定为 1

21. 对比两个 prompt 哪个更好时，最合理的方法是？
    A. 设定固定测试集和评价指标，控制变量比较  
    B. 只看哪个 prompt 更长  
    C. 只凭第一次输出判断  
    D. 每次换不同问题和不同模型

22. 在汽车机械行业预测零件寿命时，回归任务常用指标是？
    A. MAE/RMSE/R2  
    B. BLEU/ROUGE  
    C. top-k accuracy only  
    D. nDCG only

23. 为什么 RAG 通常比重新训练基础模型更适合接入企业知识库？
    A. 成本更低、更新更快、不必改动基础模型参数  
    B. 它一定比所有 fine-tuning 更准确  
    C. 它不需要任何文档清洗  
    D. 它会自动消除所有偏见

24. 如果模型在训练集表现很好、测试集表现差，最可能是？
    A. Overfitting  
    B. Underfitting  
    C. 数据完全无噪声  
    D. 模型没有任何参数

25. 在严重类别不平衡的故障预警系统中，更关注漏报时应特别看？
    A. Recall  
    B. 字体大小  
    C. BLEU  
    D. 显示器亮度

26. CUDA 更接近以下哪种定位？
    A. NVIDIA GPU 通用计算平台和编程模型  
    B. 摘要评价指标  
    C. Prompt 模板库  
    D. 文档切分算法

27. NCCL 常出现在什么场景？
    A. 多 GPU/分布式训练通信  
    B. 单词拼写检查  
    C. PDF 页面排版  
    D. 数据库备份

28. MIG 的主要用途是？
    A. 将一块 GPU 分成多个隔离实例  
    B. 生成摘要  
    C. 计算 BLEU  
    D. 替代 tokenization

29. 可信 AI 中 explainability 的意义是？
    A. 帮助人理解、审计和信任模型决策  
    B. 保证模型永远正确  
    C. 自动提高显存  
    D. 让模型不需要数据

30. 在生产 LLM 应用中，日志和监控的主要作用是？
    A. 发现性能下降、异常输出、漂移和安全问题  
    B. 增加随机性  
    C. 删除评估指标  
    D. 替代所有测试

## 答案与解析

1. B。向量数据库负责 embedding 存储和相似度检索。
2. B。用权威文档检索和引用可降低幻觉。
3. B。Self-attention 让 token 动态聚合上下文信息。
4. B。LoRA 是参数高效微调。
5. B。类别不平衡时 accuracy 可能掩盖少数类失败。
6. A。BLEU 常用于机器翻译。
7. A。ROUGE 常用于摘要。
8. A。Perplexity 衡量语言模型预测不确定性。
9. A。TensorRT/TensorRT-LLM 用于推理优化。
10. A。Triton 是多框架推理服务工具。
11. A。NeMo 面向生成式 AI 模型构建和定制。
12. A。NIM 是推理微服务。
13. A。RAPIDS 加速数据科学和 ML。
14. A。给示例是 few-shot。
15. A。Chunk 太大容易带入噪声。
16. A。Reward model 学习人类偏好。
17. A。数据泄漏会让评估虚高。
18. A。Recall@k 看正确结果是否进入前 k。
19. A。个人信息场景优先隐私和权限治理。
20. A。多头注意力学习不同关系。
21. A。实验需要固定测试集、指标和控制变量。
22. A。寿命预测是回归，常用 MAE/RMSE/R2。
23. A。RAG 成本低、更新快、无需改模型参数。
24. A。训练好测试差通常是过拟合。
25. A。漏报对应真实正例没被找出，关注 recall。
26. A。CUDA 是 GPU 通用计算平台。
27. A。NCCL 用于多 GPU 通信。
28. A。MIG 用于 GPU 分区和隔离。
29. A。可解释性帮助理解和审计模型。
30. A。监控帮助发现漂移、异常和安全风险。


import type { Level, ProjectIdea } from './types'

export const levels: Level[] = [
  {
    id: 'l0',
    number: 0,
    title: 'Python & ML Foundations',
    blurb:
      'Solid Python, numerical libraries, and practical ML intuition are load-bearing — every level above builds on them. Skip nothing here.',
    prereqs: [],
    estWeeks: 3,
    skills: [
      {
        id: 'l0-python',
        title: 'Python Proficiency',
        priority: 'core',
        tags: ['python', 'fundamentals'],
        resources: [
          {
            id: 'l0-python-r1',
            title: 'Real Python — practical tutorials',
            url: 'https://realpython.com',
            type: 'blog',
            cost: 'freemium',
          },
          {
            id: 'l0-python-r2',
            title: 'Python for Everybody (Coursera)',
            url: 'https://www.coursera.org/specializations/python',
            type: 'course',
            cost: 'freemium',
          },
        ],
      },
      {
        id: 'l0-numpy',
        title: 'NumPy & Pandas',
        priority: 'core',
        tags: ['python', 'data'],
        resources: [
          {
            id: 'l0-numpy-r1',
            title: 'Kaggle Pandas micro-course',
            url: 'https://www.kaggle.com/learn/pandas',
            type: 'course',
            cost: 'free',
          },
          {
            id: 'l0-numpy-r2',
            title: 'NumPy Documentation',
            url: 'https://numpy.org/doc/stable/',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l0-stats',
        title: 'Statistics & Probability',
        priority: 'core',
        tags: ['math', 'statistics'],
        resources: [
          {
            id: 'l0-stats-r1',
            title: 'StatQuest with Josh Starmer (YouTube)',
            url: 'https://www.youtube.com/@statquest',
            type: 'video',
            cost: 'free',
          },
          {
            id: 'l0-stats-r2',
            title: 'Think Stats — free book',
            url: 'https://greenteapress.com/wp/think-stats-2e/',
            type: 'book',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l0-ml',
        title: 'ML Fundamentals',
        priority: 'core',
        tags: ['ml', 'fundamentals'],
        resources: [
          {
            id: 'l0-ml-r1',
            title: 'Fast.ai — Practical Deep Learning for Coders',
            url: 'https://course.fast.ai',
            type: 'course',
            cost: 'free',
          },
          {
            id: 'l0-ml-r2',
            title: 'CS229 Machine Learning (Stanford)',
            url: 'https://cs229.stanford.edu',
            type: 'course',
            cost: 'free',
          },
          {
            id: 'l0-ml-r3',
            title: 'Hands-On ML with Scikit-Learn & TensorFlow (O\'Reilly)',
            url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
            type: 'book',
            cost: 'paid',
          },
        ],
      },
    ],
  },
  {
    id: 'l1',
    number: 1,
    title: 'Transformers & LLMs',
    blurb:
      'Understanding the architecture beneath every modern LLM is non-negotiable — it determines how you debug, fine-tune, and reason about model behavior.',
    prereqs: ['Python & ML Foundations'],
    estWeeks: 3,
    skills: [
      {
        id: 'l1-nn',
        title: 'Neural Network Basics',
        priority: 'core',
        tags: ['deep-learning', 'fundamentals'],
        resources: [
          {
            id: 'l1-nn-r1',
            title: '3Blue1Brown — Neural Networks playlist (YouTube)',
            url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
            type: 'video',
            cost: 'free',
          },
          {
            id: 'l1-nn-r2',
            title: 'Andrej Karpathy — micrograd: backprop from scratch',
            url: 'https://www.youtube.com/watch?v=VMj-3S1tku0',
            type: 'video',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l1-transformers',
        title: 'Transformer Architecture',
        priority: 'core',
        tags: ['transformers', 'architecture'],
        resources: [
          {
            id: 'l1-transformers-r1',
            title: 'Attention Is All You Need (paper)',
            url: 'https://arxiv.org/abs/1706.03762',
            type: 'paper',
            cost: 'free',
          },
          {
            id: 'l1-transformers-r2',
            title: 'The Illustrated Transformer — Jay Alammar',
            url: 'https://jalammar.github.io/illustrated-transformer/',
            type: 'blog',
            cost: 'free',
            note: 'Read this before the paper.',
          },
          {
            id: 'l1-transformers-r3',
            title: "Andrej Karpathy — Let's build GPT from scratch (YouTube)",
            url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
            type: 'video',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l1-tokenization',
        title: 'Tokenization',
        priority: 'recommended',
        tags: ['transformers', 'nlp'],
        resources: [
          {
            id: 'l1-tokenization-r1',
            title: "Andrej Karpathy — Let's build the GPT Tokenizer (YouTube)",
            url: 'https://www.youtube.com/watch?v=zduSFxRajkE',
            type: 'video',
            cost: 'free',
          },
          {
            id: 'l1-tokenization-r2',
            title: 'Hugging Face Tokenizers docs',
            url: 'https://huggingface.co/docs/tokenizers/index',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l1-pretraining',
        title: 'Pre-training vs Fine-tuning',
        priority: 'recommended',
        tags: ['training', 'concepts'],
        resources: [
          {
            id: 'l1-pretraining-r1',
            title: 'Hugging Face NLP Course (free)',
            url: 'https://huggingface.co/learn/nlp-course',
            type: 'course',
            cost: 'free',
          },
          {
            id: 'l1-pretraining-r2',
            title: 'Build a Large Language Model From Scratch — Raschka (GitHub)',
            url: 'https://github.com/rasbt/LLMs-from-scratch',
            type: 'repo',
            cost: 'free',
          },
        ],
      },
    ],
  },
  {
    id: 'l2',
    number: 2,
    title: 'Working with LLMs',
    blurb:
      'The day-to-day skills: prompting models reliably, calling APIs from code, working with embeddings, and building your first retrieval-augmented generation pipeline.',
    prereqs: ['Transformers & LLMs'],
    estWeeks: 2,
    skills: [
      {
        id: 'l2-prompting',
        title: 'Prompt Engineering',
        priority: 'core',
        tags: ['prompting', 'applied'],
        resources: [
          {
            id: 'l2-prompting-r1',
            title: 'Anthropic Prompt Engineering Guide',
            url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l2-prompting-r2',
            title: 'Prompt Engineering Guide (promptingguide.ai)',
            url: 'https://www.promptingguide.ai',
            type: 'blog',
            cost: 'free',
          },
          {
            id: 'l2-prompting-r3',
            title: 'ChatGPT Prompt Engineering for Developers (DeepLearning.AI)',
            url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
            type: 'course',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l2-apis',
        title: 'LLM APIs & SDKs',
        priority: 'core',
        tags: ['apis', 'applied'],
        resources: [
          {
            id: 'l2-apis-r1',
            title: 'Anthropic API Documentation',
            url: 'https://docs.anthropic.com',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l2-apis-r2',
            title: 'OpenAI API Reference',
            url: 'https://platform.openai.com/docs/api-reference',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l2-apis-r3',
            title: 'Hugging Face Inference API',
            url: 'https://huggingface.co/docs/api-inference/index',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l2-embeddings',
        title: 'Embeddings',
        priority: 'core',
        tags: ['embeddings', 'vectors'],
        resources: [
          {
            id: 'l2-embeddings-r1',
            title: 'What Are Embeddings? — Vicki Boykis',
            url: 'https://vickiboykis.com/what_are_embeddings/',
            type: 'blog',
            cost: 'free',
          },
          {
            id: 'l2-embeddings-r2',
            title: 'OpenAI Embeddings Guide',
            url: 'https://platform.openai.com/docs/guides/embeddings',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l2-rag-basics',
        title: 'Basic RAG',
        priority: 'core',
        tags: ['rag', 'applied'],
        resources: [
          {
            id: 'l2-rag-basics-r1',
            title: 'LangChain RAG Tutorial',
            url: 'https://python.langchain.com/docs/tutorials/rag/',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l2-rag-basics-r2',
            title: 'Building and Evaluating Advanced RAG (DeepLearning.AI)',
            url: 'https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/',
            type: 'course',
            cost: 'free',
          },
        ],
      },
    ],
  },
  {
    id: 'l3',
    number: 3,
    title: 'Production RAG',
    blurb:
      'Moving RAG from demo to production: smarter retrieval, rigorous evaluation, observability, and managed cloud platforms — including Amazon Bedrock, which is now mainstream in enterprise job specs.',
    prereqs: ['Working with LLMs'],
    estWeeks: 3,
    skills: [
      {
        id: 'l3-advanced-rag',
        title: 'Advanced RAG Patterns',
        priority: 'core',
        tags: ['rag', 'production'],
        resources: [
          {
            id: 'l3-advanced-rag-r1',
            title: 'Advanced RAG — LlamaIndex docs',
            url: 'https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l3-advanced-rag-r2',
            title: 'RAG Survey — arxiv 2312.10997',
            url: 'https://arxiv.org/abs/2312.10997',
            type: 'paper',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l3-vectordb',
        title: 'Vector Databases',
        priority: 'core',
        tags: ['vectors', 'databases', 'production'],
        resources: [
          {
            id: 'l3-vectordb-r1',
            title: 'Pinecone Learning Center',
            url: 'https://www.pinecone.io/learn/',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l3-vectordb-r2',
            title: 'Chroma Documentation',
            url: 'https://docs.trychroma.com',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l3-vectordb-r3',
            title: 'pgvector — Postgres vector extension (GitHub)',
            url: 'https://github.com/pgvector/pgvector',
            type: 'repo',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l3-eval',
        title: 'LLM Evaluation',
        priority: 'core',
        tags: ['eval', 'quality', 'production'],
        resources: [
          {
            id: 'l3-eval-r1',
            title: 'RAGAS Documentation',
            url: 'https://docs.ragas.io',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l3-eval-r2',
            title: 'Evaluating and Debugging Generative AI (DeepLearning.AI)',
            url: 'https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/',
            type: 'course',
            cost: 'free',
          },
          {
            id: 'l3-eval-r3',
            title: 'TruLens — evaluation framework (GitHub)',
            url: 'https://github.com/truera/trulens',
            type: 'repo',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l3-bedrock',
        title: 'Amazon Bedrock',
        priority: 'recommended',
        tags: ['aws', 'cloud', 'production'],
        blurb:
          'Managed access to foundation models (Claude, Llama, Titan) via AWS APIs. Bedrock Knowledge Bases handles RAG infrastructure; Bedrock Agents handles orchestration — both increasingly required in enterprise roles.',
        resources: [
          {
            id: 'l3-bedrock-r1',
            title: 'Amazon Bedrock Developer Guide',
            url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l3-bedrock-r2',
            title: 'Amazon Bedrock Workshop — aws-samples (GitHub)',
            url: 'https://github.com/aws-samples/amazon-bedrock-workshop',
            type: 'repo',
            cost: 'free',
          },
          {
            id: 'l3-bedrock-r3',
            title: 'Building with Amazon Bedrock and LangChain (DeepLearning.AI)',
            url: 'https://www.deeplearning.ai/short-courses/building-with-amazon-bedrock-and-langchain/',
            type: 'course',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l3-observability',
        title: 'Observability & Tracing',
        priority: 'recommended',
        tags: ['observability', 'production'],
        resources: [
          {
            id: 'l3-observability-r1',
            title: 'LangSmith Documentation',
            url: 'https://docs.smith.langchain.com',
            type: 'docs',
            cost: 'freemium',
          },
          {
            id: 'l3-observability-r2',
            title: 'Arize AI Phoenix — open-source LLM observability (GitHub)',
            url: 'https://github.com/Arize-ai/phoenix',
            type: 'repo',
            cost: 'free',
          },
          {
            id: 'l3-observability-r3',
            title: 'Weights & Biases Prompts — LLM tracing',
            url: 'https://docs.wandb.ai/guides/prompts',
            type: 'docs',
            cost: 'freemium',
          },
        ],
      },
    ],
  },
  {
    id: 'l4',
    number: 4,
    title: 'Agents & Orchestration',
    blurb:
      "LLMs as reasoning engines: tool use, multi-step planning, and building agent pipelines that don't collapse in production.",
    prereqs: ['Production RAG'],
    estWeeks: 3,
    skills: [
      {
        id: 'l4-tool-use',
        title: 'Tool Use & Function Calling',
        priority: 'core',
        tags: ['agents', 'applied'],
        resources: [
          {
            id: 'l4-tool-use-r1',
            title: 'Anthropic Tool Use Documentation',
            url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l4-tool-use-r2',
            title: 'OpenAI Function Calling Guide',
            url: 'https://platform.openai.com/docs/guides/function-calling',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l4-agent-patterns',
        title: 'Agent Patterns (ReAct, CoT)',
        priority: 'core',
        tags: ['agents', 'patterns'],
        resources: [
          {
            id: 'l4-agent-patterns-r1',
            title: 'ReAct: Synergizing Reasoning and Acting in LLMs (paper)',
            url: 'https://arxiv.org/abs/2210.03629',
            type: 'paper',
            cost: 'free',
          },
          {
            id: 'l4-agent-patterns-r2',
            title: 'LangChain Agents Conceptual Guide',
            url: 'https://python.langchain.com/docs/concepts/agents/',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l4-langgraph',
        title: 'LangGraph & Orchestration',
        priority: 'recommended',
        tags: ['orchestration', 'framework'],
        resources: [
          {
            id: 'l4-langgraph-r1',
            title: 'LangGraph Documentation',
            url: 'https://langchain-ai.github.io/langgraph/',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l4-langgraph-r2',
            title: 'AI Agents in LangGraph (DeepLearning.AI)',
            url: 'https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/',
            type: 'course',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l4-multi-agent',
        title: 'Multi-Agent Systems',
        priority: 'optional',
        tags: ['agents', 'advanced'],
        resources: [
          {
            id: 'l4-multi-agent-r1',
            title: 'Multi AI Agent Systems with crewAI (DeepLearning.AI)',
            url: 'https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/',
            type: 'course',
            cost: 'free',
          },
          {
            id: 'l4-multi-agent-r2',
            title: 'AutoGen Documentation',
            url: 'https://microsoft.github.io/autogen/',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l4-multi-agent-r3',
            title: 'CrewAI Documentation',
            url: 'https://docs.crewai.com',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
    ],
  },
  {
    id: 'l5',
    number: 5,
    title: 'MLOps & Deployment',
    blurb:
      'Shipping models to production reliably: inference servers, quantization for cost control, fine-tuning on your own data, and monitoring for drift and failures.',
    prereqs: ['Agents & Orchestration'],
    estWeeks: 3,
    skills: [
      {
        id: 'l5-serving',
        title: 'Model Serving',
        priority: 'core',
        tags: ['deployment', 'production', 'inference'],
        resources: [
          {
            id: 'l5-serving-r1',
            title: 'vLLM Documentation',
            url: 'https://docs.vllm.ai',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l5-serving-r2',
            title: 'Hugging Face Text Generation Inference (TGI)',
            url: 'https://github.com/huggingface/text-generation-inference',
            type: 'repo',
            cost: 'free',
          },
          {
            id: 'l5-serving-r3',
            title: 'BentoML Documentation',
            url: 'https://docs.bentoml.com',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l5-quantization',
        title: 'Quantization & Optimization',
        priority: 'recommended',
        tags: ['optimization', 'inference'],
        resources: [
          {
            id: 'l5-quantization-r1',
            title: 'Hugging Face Quantization Overview',
            url: 'https://huggingface.co/docs/transformers/quantization/overview',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l5-quantization-r2',
            title: 'llama.cpp — GGUF format & CPU inference (GitHub)',
            url: 'https://github.com/ggerganov/llama.cpp',
            type: 'repo',
            cost: 'free',
          },
          {
            id: 'l5-quantization-r3',
            title: 'AutoAWQ — 4-bit quantization (GitHub)',
            url: 'https://github.com/casper-hansen/AutoAWQ',
            type: 'repo',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l5-finetuning',
        title: 'Fine-tuning (LoRA / QLoRA)',
        priority: 'recommended',
        tags: ['fine-tuning', 'training'],
        resources: [
          {
            id: 'l5-finetuning-r1',
            title: 'Hugging Face PEFT Documentation',
            url: 'https://huggingface.co/docs/peft/index',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l5-finetuning-r2',
            title: 'QLoRA: Efficient Finetuning of Quantized LLMs (paper)',
            url: 'https://arxiv.org/abs/2305.14314',
            type: 'paper',
            cost: 'free',
          },
          {
            id: 'l5-finetuning-r3',
            title: 'Finetuning Large Language Models (DeepLearning.AI)',
            url: 'https://www.deeplearning.ai/short-courses/finetuning-large-language-models/',
            type: 'course',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l5-monitoring',
        title: 'LLM Monitoring & Drift',
        priority: 'recommended',
        tags: ['monitoring', 'production'],
        resources: [
          {
            id: 'l5-monitoring-r1',
            title: 'MLflow LLM Evaluate',
            url: 'https://mlflow.org/docs/latest/llms/llm-evaluate/index.html',
            type: 'docs',
            cost: 'free',
          },
          {
            id: 'l5-monitoring-r2',
            title: 'Evidently AI Documentation',
            url: 'https://docs.evidentlyai.com',
            type: 'docs',
            cost: 'free',
          },
        ],
      },
    ],
  },
  {
    id: 'l6',
    number: 6,
    title: 'Interview Prep',
    blurb:
      'Converting roadmap knowledge into job offers: system-design walkthroughs for LLM products, behavioral STAR stories, and the paper canon interviewers expect you to know.',
    prereqs: ['MLOps & Deployment'],
    estWeeks: 2,
    skills: [
      {
        id: 'l6-system-design',
        title: 'LLM System Design',
        priority: 'core',
        tags: ['interview', 'system-design'],
        resources: [
          {
            id: 'l6-system-design-r1',
            title: 'AI Engineering — Chip Huyen (O\'Reilly)',
            url: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
            type: 'book',
            cost: 'paid',
          },
          {
            id: 'l6-system-design-r2',
            title: 'Designing ML Systems — Chip Huyen (O\'Reilly)',
            url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/',
            type: 'book',
            cost: 'paid',
          },
          {
            id: 'l6-system-design-r3',
            title: 'System Design for Discovery — Eugene Yan',
            url: 'https://eugeneyan.com/writing/system-design-for-discovery/',
            type: 'blog',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l6-behavioral',
        title: 'Behavioral Interviews',
        priority: 'core',
        tags: ['interview', 'behavioral'],
        resources: [
          {
            id: 'l6-behavioral-r1',
            title: 'Tech Interview Handbook — Behavioral',
            url: 'https://www.techinterviewhandbook.org/behavioral-interview/',
            type: 'blog',
            cost: 'free',
          },
          {
            id: 'l6-behavioral-r2',
            title: 'Levels.fyi Interview Resources',
            url: 'https://www.levels.fyi/resources/',
            type: 'blog',
            cost: 'free',
          },
        ],
      },
      {
        id: 'l6-papers',
        title: 'Paper Canon',
        priority: 'recommended',
        tags: ['papers', 'research'],
        blurb:
          'Papers every LLM engineer is expected to know: Attention, BERT, GPT-3, InstructGPT, LoRA, RAGAS, ReAct, Chain-of-Thought. See the Reading List page for the full annotated set.',
        resources: [
          {
            id: 'l6-papers-r1',
            title: 'Papers With Code — Language Models',
            url: 'https://paperswithcode.com/methods/category/language-models',
            type: 'blog',
            cost: 'free',
          },
          {
            id: 'l6-papers-r2',
            title: 'Semantic Scholar',
            url: 'https://www.semanticscholar.org',
            type: 'blog',
            cost: 'free',
          },
        ],
      },
    ],
  },
]

export const projectIdeas: ProjectIdea[] = [
  {
    levelId: 'l0',
    title: 'Text Classifier',
    description:
      'Train a sentiment or topic classifier with scikit-learn. Focus on data cleaning, feature engineering, and eval metrics.',
    tags: ['python', 'ml'],
  },
  {
    levelId: 'l1',
    title: 'Mini GPT',
    description:
      "Implement a character-level language model with a tiny transformer (follow Karpathy's nanoGPT). Understand every tensor shape.",
    tags: ['transformers', 'deep-learning'],
  },
  {
    levelId: 'l2',
    title: 'Document Q&A Bot',
    description:
      'RAG over your own PDFs or notes using any embedding model + in-memory vector store. No framework — just direct API calls.',
    tags: ['rag', 'apis'],
  },
  {
    levelId: 'l3',
    title: 'RAG with Eval Pipeline',
    description:
      'Extend the Q&A bot with RAGAS evaluation, a persistent vector DB, hybrid search, and LangSmith tracing. Target >0.8 faithfulness.',
    tags: ['rag', 'eval', 'production'],
  },
  {
    levelId: 'l4',
    title: 'Tool-calling Research Agent',
    description:
      'Agent that can search the web, run code, and answer multi-hop questions. Implement the ReAct loop manually first, then migrate to LangGraph.',
    tags: ['agents', 'tool-use'],
  },
  {
    levelId: 'l5',
    title: 'Fine-tuned Model Endpoint',
    description:
      'QLoRA fine-tune a 7B model on a domain dataset, quantize with GGUF, serve with vLLM, add drift monitoring.',
    tags: ['fine-tuning', 'deployment'],
  },
  {
    levelId: 'l6',
    title: 'System Design Portfolio',
    description:
      'Write up 2–3 system designs for LLM products (e.g., enterprise RAG, coding assistant, content moderation pipeline). Publish to GitHub.',
    tags: ['system-design', 'interview'],
  },
]

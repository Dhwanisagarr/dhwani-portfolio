export const PROJECT_CASE_STUDIES = {
  'product-thinking-teardowns': {
    id: 'product-thinking-teardowns',
    slug: 'product-thinking-teardowns',
    liveUrl: 'https://pickled-chair-247.notion.site/Product-Thinking-Teardowns-3e0900d91be98010a138e2571183e521',
    title: 'Product Thinking & Teardowns',
    subtitle: 'A collection of product analyses and case studies exploring how existing digital products can be improved through user-focused thinking, feature analysis, and product strategy.',
    role: 'Product Analyst & Strategist',
    timeline: '2026',
    team: 'Solo Analyst & Product Designer',
    tools: ['Product Strategy', 'UX Teardowns', 'Notion', 'Product Analytics', 'User Research'],
    brief: {
      overview: 'A collection of product analyses and case studies exploring how existing digital products can be improved through user-focused thinking, feature analysis, and product strategy. Includes teardowns and improvement ideas for products such as Google, CRED, Slice, Stripe, and Groww.',
      role: 'Product Analyst & Strategist — Product teardowns, funnel analysis, UX heuristic evaluation, and feature redesign strategy.',
      timeline: 'Ongoing (2026)',
      team: 'Solo Analyst',
      context: 'Hosted on Notion as an interactive knowledge base. Target audience: Product Managers, Designers, and Engineers interested in evidence-backed product strategy.'
    },
    problem: {
      statement: 'Digital products evolve rapidly, but feature changes often lack clear user intent or evidence-backed rationale.',
      userContext: 'Users encounter friction points in onboarding funnels, payment checkouts, and navigation loops. Product teardowns help break down what works, what fails, and how to improve customer retention.',
      improvementNeed: 'The challenge:\n• Deconstruct product mechanics of market leaders\n• Identify hidden UX friction & funnel drop-offs\n• Propose high-impact product redesigns',
      keyChallenge: 'Scope:\n• Covers top products including Google, CRED, Slice, Stripe, Groww.\n• Evaluates user psychology, growth levers, and design patterns.\n• Published as open Notion documentation.'
    },
    thinking: {
      approach: 'Deconstruct products across 5 core dimensions: Onboarding, Core Value Loop, Growth/Retention, UX Friction, and Business Strategy.',
      userNeeds: 'Clear visual breakdowns, heuristic analysis, and actionable product recommendations.',
      prioritization: 'Focused on high-frequency user touchpoints and monetization funnels.',
      decisionsAndTradeoffs: [
        'Key Decision: Deep-dive case study format with visual wireframes over surface-level app reviews.',
        'Key Decision: Focus on real-world Indian & global tech giants (Google, CRED, Slice, Stripe, Groww).',
        'Key Decision: Published directly on Notion for instant access and readability.'
      ]
    },
    design: {
      userFlow: 'Deconstruct → Analyze Friction → Formulate Hypotheses → Redesign Solution → Evaluate Impact',
      exploration: 'Focus areas: Onboarding velocity, cognitive load reduction, notification strategy, and checkout optimization.',
      iterations: [
        'Iterative teardown framework refined across 5+ major product case studies.',
        'Structured Notion documentation with embedded diagrams and teardown slides.'
      ]
    },
    demo: {
      headline: 'Explore the full Product Thinking & Teardowns database on Notion.',
      description: 'Access the complete interactive Notion repository featuring deep-dive breakdowns and strategic redesign proposals.',
      highlights: [
        'Deep-dive product teardowns for Google, CRED, Slice, Stripe, & Groww.',
        'UX heuristic audits and onboarding funnel friction analyses.',
        'Strategic redesign proposals and growth hypothesis frameworks.'
      ]
    }
  },
  'signaldesk': {
    id: 'signaldesk',
    slug: 'signaldesk',
    liveUrl: 'https://signaldesk.streamlit.app/',
    title: 'SignalDesk',
    subtitle: 'A Voice-of-Customer tool that turns messy customer feedback into prioritized product issues backed by evidence.',
    role: 'Solo PM & Builder',
    timeline: '2 Weeks (Singula 4PM MVP)',
    team: 'Solo MVP',
    tools: ['Python', 'Streamlit', 'SQLite', 'Pandas', 'Scikit-learn', 'Pytest'],
    brief: {
      overview: 'SignalDesk is a Voice-of-Customer tool that turns messy customer feedback into prioritized product issues backed by evidence.\n\nGoal: Help PMs move from “What are customers saying?” to “What should we fix?”',
      role: 'Solo PM & Builder — Product discovery, workflow design, analysis algorithms, UI implementation, and evaluation metrics.',
      timeline: '2 weeks (Singula’s 4PM program)',
      team: 'Solo MVP',
      context: 'Built in 2 weeks as a solo MVP during Singula’s 4PM program. This is a concept project (not deployed to production). Target users: PMs and founders in B2B SaaS who juggle feedback across tickets, surveys, and reviews.'
    },
    problem: {
      statement: 'Customer feedback is everywhere. Product insight isn’t.',
      userContext: 'PMs collect feedback in support tickets, NPS surveys, app reviews, and sales calls—but recurring problems and important signals are hard to spot manually. Patterns drown in noise, and prioritization becomes gut-feel.',
      improvementNeed: 'The challenge:\n• Find what matters\n• Understand why it matters\n• Prove it with customer evidence',
      keyChallenge: 'Constraints:\n• No access to production data; used synthetic + sample feedback datasets.\n• Single-builder MVP in 2 weeks; scope limited to text feedback only.\n• Avoided LLMs in v1 to keep results predictable, testable, and explainable.\n• Concept project: not deployed to real teams; metrics are planned, not observed.'
    },
    thinking: {
      approach: 'I designed the workflow around the product decision.\n\nWorkflow:\nImport → Analyze → Prioritize → Investigate → Review → Share',
      userNeeds: 'Evidence alongside raw quotes, explainable score calculations, default PII masking, and human-in-the-loop review before stakeholder sharing.',
      prioritization: 'Prioritized explainable deterministic scoring (frequency + recency + impact signals) over black-box LLM magic to keep outputs testable and trusted.',
      decisionsAndTradeoffs: [
        'Key Decision: Evidence alongside every issue – no insight without raw quotes.',
        'Key Decision: Explainable prioritization – scores based on frequency, recency, and impact signals, not black-box magic.',
        'Key Decision: PII masked by default – privacy built into the analysis layer.',
        'Key Decision: Human review before sharing – PMs validate before exporting to stakeholders.',
        'Trade-off: Started with deterministic analysis instead of an LLM to keep results predictable, testable, and explainable. This made it easier to debug, evaluate, and trust in early testing.',
        'Intended Success Metrics (if piloted): Reduce time to identify top issues from ~2 hours of manual tagging to <10 minutes.',
        'Intended Success Metrics: ≥80% of pilot PMs say the evidence view changes their prioritization.',
        'Intended Success Metrics: Exported insights used in at least one roadmap decision per pilot user.',
        'Measurement Plan: Time-on-task in a short usability test (identify top 3 issues in a sample dataset).',
        'Measurement Plan: Post-task survey: “Did the evidence view change how you would prioritize?” (Yes/No + comment).',
        'Measurement Plan: Follow-up check: whether exported insights appear in a roadmap doc or ticket within 1 week.'
      ]
    },
    design: {
      userFlow: 'From technical dashboard → PM workspace\n\nThe first version focused too much on analysis. I redesigned it around the question:\n“What problem deserves my attention?”\n\nFinal Flow:\nImport → Workspace → Evidence → Review → Export',
      exploration: 'Design principles:\n• Issue-first – start with problems, not charts.\n• Evidence-led – every issue shows supporting customer quotes.\n• Progressive disclosure – show simple summaries first; let users drill into details.\n• Technical details secondary – keep models and parameters out of the main flow.',
      iterations: [
        'Validation (what I actually did): Walked through the flow myself with multiple sample datasets to ensure end-to-end usability.',
        'Shared the prototype with 3 peers for informal feedback on clarity of issues and evidence.',
        'Iterated on labels, ordering, and export format based on that feedback.'
      ]
    },
    demo: {
      headline: 'See SignalDesk in action.',
      description: 'Working Prototype: Upload feedback → discover issues → inspect evidence → prioritize → export.\n\nNote: This is a concept prototype built for portfolio purposes, not a production tool.',
      highlights: [
        'Upload a CSV of customer feedback (text + optional metadata).',
        'Review auto-detected issues and their supporting quotes.',
        'Adjust priorities and export a summary for your team or roadmap doc.'
      ],
      videoPlaceholder: 'SIGNALDESK INTERACTIVE PROTOTYPE DEMO'
    },
    learnings: {
      whatWorked: 'Building the analysis was only half the problem. The bigger challenge was turning analysis into something a PM could act on.\n\nWhat worked:\n• Evidence-backed issues made discussions more concrete during walkthroughs.\n• Explainable prioritization helped justify why certain issues ranked higher.\n• Human review step prevented over-trusting the model.',
      whatDidnt: 'Good product analytics shouldn’t just show what happened. It should make the next decision easier.',
      futureImprovements: 'What I’d do differently:\n• Add lightweight topic clustering to reduce manual grouping of similar issues.\n• Introduce a “confidence score” per issue so PMs know when to trust the signal.\n• Integrate with one real source (e.g., Intercom/Zendesk export) and run a small pilot with 2–3 PMs to validate time saved and decision quality.'
    }
  },

  'cerebral-palsy-speech-enhancement': {
    id: 'signaldesk',
    slug: 'signaldesk',
    title: 'SignalDesk',
    subtitle: 'A Voice-of-Customer tool that turns messy customer feedback into prioritized product issues backed by evidence.',
    role: 'Solo PM & Builder',
    timeline: '2 Weeks (Singula 4PM MVP)',
    team: 'Solo MVP',
    tools: ['Python', 'Streamlit', 'SQLite', 'Pandas', 'Scikit-learn', 'Pytest'],
    brief: {
      overview: 'SignalDesk is a Voice-of-Customer tool that turns messy customer feedback into prioritized product issues backed by evidence.\n\nGoal: Help PMs move from “What are customers saying?” to “What should we fix?”',
      role: 'Solo PM & Builder — Product discovery, workflow design, analysis algorithms, UI implementation, and evaluation metrics.',
      timeline: '2 weeks (Singula’s 4PM program)',
      team: 'Solo MVP',
      context: 'Built in 2 weeks as a solo MVP during Singula’s 4PM program. This is a concept project (not deployed to production). Target users: PMs and founders in B2B SaaS who juggle feedback across tickets, surveys, and reviews.'
    },
    problem: {
      statement: 'Customer feedback is everywhere. Product insight isn’t.',
      userContext: 'PMs collect feedback in support tickets, NPS surveys, app reviews, and sales calls—but recurring problems and important signals are hard to spot manually. Patterns drown in noise, and prioritization becomes gut-feel.',
      improvementNeed: 'The challenge:\n• Find what matters\n• Understand why it matters\n• Prove it with customer evidence',
      keyChallenge: 'Constraints:\n• No access to production data; used synthetic + sample feedback datasets.\n• Single-builder MVP in 2 weeks; scope limited to text feedback only.\n• Avoided LLMs in v1 to keep results predictable, testable, and explainable.\n• Concept project: not deployed to real teams; metrics are planned, not observed.'
    },
    thinking: {
      approach: 'I designed the workflow around the product decision.\n\nWorkflow:\nImport → Analyze → Prioritize → Investigate → Review → Share',
      userNeeds: 'Evidence alongside raw quotes, explainable score calculations, default PII masking, and human-in-the-loop review before stakeholder sharing.',
      prioritization: 'Prioritized explainable deterministic scoring (frequency + recency + impact signals) over black-box LLM magic to keep outputs testable and trusted.',
      decisionsAndTradeoffs: [
        'Key Decision: Evidence alongside every issue – no insight without raw quotes.',
        'Key Decision: Explainable prioritization – scores based on frequency, recency, and impact signals, not black-box magic.',
        'Key Decision: PII masked by default – privacy built into the analysis layer.',
        'Key Decision: Human review before sharing – PMs validate before exporting to stakeholders.',
        'Trade-off: Started with deterministic analysis instead of an LLM to keep results predictable, testable, and explainable. This made it easier to debug, evaluate, and trust in early testing.',
        'Intended Success Metrics (if piloted): Reduce time to identify top issues from ~2 hours of manual tagging to <10 minutes.',
        'Intended Success Metrics: ≥80% of pilot PMs say the evidence view changes their prioritization.',
        'Intended Success Metrics: Exported insights used in at least one roadmap decision per pilot user.',
        'Measurement Plan: Time-on-task in a short usability test (identify top 3 issues in a sample dataset).',
        'Measurement Plan: Post-task survey: “Did the evidence view change how you would prioritize?” (Yes/No + comment).',
        'Measurement Plan: Follow-up check: whether exported insights appear in a roadmap doc or ticket within 1 week.'
      ]
    },
    design: {
      userFlow: 'From technical dashboard → PM workspace\n\nThe first version focused too much on analysis. I redesigned it around the question:\n“What problem deserves my attention?”\n\nFinal Flow:\nImport → Workspace → Evidence → Review → Export',
      exploration: 'Design principles:\n• Issue-first – start with problems, not charts.\n• Evidence-led – every issue shows supporting customer quotes.\n• Progressive disclosure – show simple summaries first; let users drill into details.\n• Technical details secondary – keep models and parameters out of the main flow.',
      iterations: [
        'Validation (what I actually did): Walked through the flow myself with multiple sample datasets to ensure end-to-end usability.',
        'Shared the prototype with 3 peers for informal feedback on clarity of issues and evidence.',
        'Iterated on labels, ordering, and export format based on that feedback.'
      ]
    },
    demo: {
      headline: 'See SignalDesk in action.',
      description: 'Working Prototype: Upload feedback → discover issues → inspect evidence → prioritize → export.\n\nNote: This is a concept prototype built for portfolio purposes, not a production tool.',
      highlights: [
        'Upload a CSV of customer feedback (text + optional metadata).',
        'Review auto-detected issues and their supporting quotes.',
        'Adjust priorities and export a summary for your team or roadmap doc.'
      ],
      videoPlaceholder: 'SIGNALDESK INTERACTIVE PROTOTYPE DEMO'
    },
    learnings: {
      whatWorked: 'Building the analysis was only half the problem. The bigger challenge was turning analysis into something a PM could act on.\n\nWhat worked:\n• Evidence-backed issues made discussions more concrete during walkthroughs.\n• Explainable prioritization helped justify why certain issues ranked higher.\n• Human review step prevented over-trusting the model.',
      whatDidnt: 'Good product analytics shouldn’t just show what happened. It should make the next decision easier.',
      futureImprovements: 'What I’d do differently:\n• Add lightweight topic clustering to reduce manual grouping of similar issues.\n• Introduce a “confidence score” per issue so PMs know when to trust the signal.\n• Integrate with one real source (e.g., Intercom/Zendesk export) and run a small pilot with 2–3 PMs to validate time saved and decision quality.'
    }
  },

  'dahlia': {
    id: 'dahlia',
    slug: 'dahlia',
    liveUrl: 'https://mydahlia.vercel.app/',
    title: 'DAHLIA — A Personal Memory Garden',
    subtitle: 'DAHLIA turns everyday photos into a quiet, visual record of the year—one memory per day, one growing garden.',
    role: 'Solo (Product + Design + Frontend)',
    timeline: '2 Weeks (2024)',
    team: 'Solo MVP',
    tools: ['Next.js', 'React', 'JavaScript', 'CSS', 'IndexedDB', 'Vercel'],
    brief: {
      overview: 'DAHLIA turns everyday photos into a quiet, visual record of the year—one memory per day, one growing garden.',
      role: 'Solo — Product, visual design, and front-end development.',
      timeline: '2 weeks, solo (product + design + front-end)',
      team: 'Solo MVP',
      context: 'Camera rolls are full, but memories feel invisible. Journals and productivity trackers add pressure: streaks, consistency, “perform your life.” Target user: someone who wants to document life through photos without maintaining a detailed journal or feeding a social feed.'
    },
    problem: {
      statement: 'Camera rolls are full, but memories feel invisible.',
      userContext: 'Journals and productivity trackers add pressure: streaks, consistency, “perform your life.” DAHLIA is designed to be calm instead of productive, private instead of public, for ordinary days, not highlight reels.',
      improvementNeed: 'How It Works:\nPick a date → add one photo → a flower appears in your garden.\nOver time, the garden becomes a visual map of your year. Each month has its own botanical identity. Missing days is normal; there are no streaks or scores.',
      keyChallenge: 'MVP scope:\n• Add a photo memory to a specific day\n• Calendar navigation across months/years\n• Search, personalise (themes/colours), year overview, simple export\n\nOut of scope (on purpose):\nStreaks, likes, followers, public feeds, productivity metrics.'
    },
    thinking: {
      approach: 'Shaping the Experience: Calendar as backbone, Flowers as memories, Calm, private, minimal visual design, and Forgiving by design.',
      userNeeds: 'No pressure, private local browser storage, organic visual progression, and effortless daily photo logging.',
      prioritization: 'Prioritized visual calm and forgiving design over social mechanics, public feeds, and streak gamification.',
      decisionsAndTradeoffs: [
        'Key Principle: Calendar as backbone – memories stay tied to exact days, giving time structure without feeling like a task list.',
        'Key Principle: Flowers as memories – each memory becomes part of a living garden; time passing is visible as it grows.',
        'Key Principle: Calm, private, minimal – soft colours, botanical illustrations, organic shapes, editorial typography, minimal controls, light/dark themes.',
        'Key Principle: Forgiving by design – no “you’re behind,” no completion percentage.'
      ]
    },
    design: {
      userFlow: 'Pick a Date → Add Photo Memory → Watch Flower Grow in Garden → Navigate Months/Years → Search & Personalise',
      exploration: 'Soft colours, botanical illustrations, organic shapes, editorial typography, minimal controls, light/dark themes.',
      iterations: [
        'Validation so far: Walked through the full flow with multiple test datasets and shared the prototype with 3 peers for informal feedback.',
        'Iterated on flower density, colour contrast, and navigation based on feedback.'
      ]
    },
    demo: {
      headline: 'See It Live — DAHLIA Working Web Prototype',
      description: 'Working web prototype: add memories, navigate months/years, search, personalise, view year overview, watch the garden grow.',
      highlights: [
        'Add a photo memory to a specific day and see your garden grow',
        'Calendar navigation across months and years with distinct botanical identities',
        'Search, personalise themes/colours, year overview, and simple export',
        'Concept prototype for portfolio purposes. Memories are stored locally in your browser.'
      ],
      videoPlaceholder: 'DAHLIA MEMORY GARDEN INTERACTIVE DEMO'
    },
    learnings: {
      whatWorked: 'Early visuals were too busy; large flowers and many colours overwhelmed the garden. Moving to a more restrained botanical system made the experience feel calmer and clearer.',
      whatDidnt: 'Key learning: the strongest version of DAHLIA came from deciding what not to include. Product decisions, visual design, and technical constraints all shaped each other over the 2 weeks.',
      futureImprovements: 'If this became real, I’d add optional cloud sync, improve long-term organisation (multi-year views, filters), explore shared/private gardens, and test with real users to validate emotional impact and usage patterns.'
    }
  },

  'streakup': {
    id: 'streakup',
    slug: 'streakup',
    liveUrl: 'https://streak-up-streakup.vercel.app/',
    title: 'StreakUp',
    subtitle: 'StreakUp is a challenge-based habit tracker built around showing progress, not just checking boxes.',
    role: 'Solo Builder',
    timeline: '2023',
    team: 'Solo MVP',
    tools: ['React', 'JavaScript', 'Local Storage', 'CSS'],
    brief: {
      overview: 'StreakUp is a challenge-based habit tracker built around showing progress, not just checking boxes.',
      role: 'Solo Builder',
      timeline: '2023',
      team: 'Solo MVP',
      context: 'Backstory: I wanted a simpler way to stay consistent with things I actually care about, without turning them into another boring habit list. Goal: Make consistency feel visible, flexible, and motivating.'
    },
    problem: {
      statement: 'Most habit trackers focus on individual tasks, but don\'t make longer-term progress feel meaningful.',
      userContext: 'Target User: People trying to build consistency around personal goals.',
      improvementNeed: 'Pain Points:\n• Hard to see progress over time\n• Missing one day can feel discouraging\n• Habit lists can become repetitive',
      keyChallenge: 'Why It Matters: Consistency is easier to maintain when progress is visible.'
    },
    thinking: {
      approach: 'Turn habits into time-bound challenges with visible progress.',
      userNeeds: 'Consistency isn\'t always perfect. A system should allow flexibility without losing momentum.',
      prioritization: 'Prioritisation: Focused first on the daily check-in and progress experience.',
      decisionsAndTradeoffs: [
        'Product Decision: 21, 30, 66, 90-day challenges',
        'Product Decision: Flexible daily completion',
        'Product Decision: Streaks and progress calendar',
        'Product Decision: Notes and challenge templates',
        'Trade-offs: Kept it login-free and local-first, making it simple to use but limiting cross-device syncing.',
        'Reasoning: The product should feel lightweight enough to actually use every day.'
      ]
    },
    design: {
      userFlow: 'User Flow: Create challenge → Set habits → Check in → Complete day → Track progress',
      exploration: 'UI / Interface: Warm, minimal interface with strong visual feedback and simple navigation.',
      iterations: [
        'Wireframes: Started with the core daily check-in and progress flow before building the full interface.',
        'Design Decisions: Progress should be visible at a glance, while daily actions stay simple.',
        'Iterations: Refined the desktop, mobile, readability, navigation, and progress experience.',
        'Final Design: A responsive challenge tracker designed to feel simple, personal, and motivating.'
      ]
    },
    demo: {
      headline: 'Working Prototype — Explore the full StreakUp experience',
      description: 'What you can explore: Create challenges, add habits, check in daily, track streaks, view progress, and manage notes.',
      highlights: [
        'Create 21, 30, 66, 90-day challenges and set daily habits',
        'Check in daily with flexible completion and track streaks',
        'View visual progress calendars and manage notes and challenge templates'
      ],
      videoPlaceholder: 'STREAKUP CHALLENGE TRACKER DEMO'
    },
    learnings: {
      whatWorked: 'Outcome / Result: Built a working end-to-end prototype from idea to product. What Worked: Keeping the core loop simple: challenge → check in → progress.',
      whatDidnt: 'What Didn\'t: Some early versions felt more like a habit checklist than a challenge experience.',
      futureImprovements: 'What I Learned: Small product decisions around flexibility and feedback can significantly change how a product feels. Limitations: No accounts, backend, or cross-device syncing. What I\'d Improve: Add cloud sync, deeper progress insights, and more personalised motivation.'
    }
  },

  'cp-speech-pain': {
    id: 'cp-speech-pain',
    slug: 'cp-speech-pain',
    title: 'Speech & Pain Assessment ML for Cerebral Palsy',
    subtitle: 'A machine-learning application for speech clarity assessment and facial-expression-based pain detection for individuals with cerebral palsy.',
    role: 'Solo Developer',
    timeline: '2024 (Rebuilt Web App)',
    team: 'Solo Developer',
    tools: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'TensorFlow', 'InceptionV3', 'KNN', 'MFCC', 'Librosa'],
    brief: {
      overview: 'A machine-learning application for speech clarity assessment and facial-expression-based pain detection for individuals with cerebral palsy.',
      role: 'Solo Developer',
      timeline: '2024',
      team: 'Solo Developer',
      context: 'Originally developed as a college project. Since the original application was no longer available, I recreated it from the original project report and rebuilt it as a working web application.'
    },
    problem: {
      statement: 'Individuals with cerebral palsy may experience difficulty with speech clarity and communicating discomfort. This project explores how ML can help interpret speech and facial cues.',
      userContext: 'Target User: Individuals with cerebral palsy and their caregivers/supporters.',
      improvementNeed: 'Pain Points:\n• Difficulty communicating clearly\n• Difficulty expressing discomfort\n• Limited digital support for interpreting these signals',
      keyChallenge: 'Why It Matters: Interpreting speech and facial cues could provide additional information to support communication and caregiver understanding.'
    },
    thinking: {
      approach: 'Split the problem into two ML workflows: speech clarity analysis and facial-expression-based pain detection.',
      userNeeds: 'Revisited the original project report, its architecture, ML methods, implementation and testing, then recreated the system based on those findings.',
      prioritization: 'Prioritisation: Focused on the two core analysis workflows, clear results, real-time image capture and a simple user experience.',
      decisionsAndTradeoffs: [
        'Product Decision: Keep speech and pain analysis as separate flows',
        'Product Decision: Keep the interaction simple: upload/capture → analyse → result',
        'Product Decision: Rebuild it as a web application for easier access and demonstration',
        'Trade-offs: The original concept was Android-based, so I adapted it into a web application while keeping the core ML workflows.',
        'Reasoning: A simple flow makes the ML functionality easier to understand without adding unnecessary complexity.'
      ]
    },
    design: {
      userFlow: 'Choose analysis → Upload/capture input → Analyse → View result',
      exploration: 'Separate speech and pain analysis experiences with simple inputs, clear actions and result states.',
      iterations: [
        'Wireframes: Mapped the core screens and analysis flow before building the final interface.',
        'Design Decisions: Minimal steps, clear CTAs, visible loading states and easy-to-understand results.',
        'Iterations: Refined the layout, interaction flow, loading states and result presentation while rebuilding the original concept.',
        'Final Design: A clean web interface connecting users directly to the speech and facial-expression analysis workflows.'
      ]
    },
    demo: {
      headline: 'Working Prototype — Speech KNN and InceptionV3 Models',
      description: 'What can be explored: Upload audio to analyse speech clarity, or use image capture/upload to explore the facial-expression-based pain indicator.',
      highlights: [
        'Upload audio to analyse speech clarity using MFCC & KNN models',
        'Use image capture/upload to explore facial-expression-based pain indicators using InceptionV3 neural networks',
        'Full-stack Next.js/TypeScript & FastAPI/Python integration'
      ],
      videoPlaceholder: 'CEREBRAL PALSY SPEECH & PAIN ML DEMO'
    },
    learnings: {
      whatWorked: 'Outcome / Result: Recreated the original college project as a working full-stack ML web application. What Worked: Separating the problem into two workflows, keeping the experience simple, and connecting real ML models to the product.',
      whatDidnt: 'What Didn\'t: The original application was unavailable, so the product experience had to be reconstructed from the project documentation.',
      futureImprovements: 'What I Learned: Working with ML models in a product, connecting frontend and backend systems, handling deployment constraints, and turning an academic project into a usable product. Limitations: Limited dataset and real-world validation. The system is not a medical diagnostic tool; pain results should be treated only as potential indicators. What I\'d Improve: Larger and more diverse datasets, stronger ML models, better real-world validation, multimodal speech + facial analysis, and more personalised feedback.'
    }
  },

  'together': {
    id: 'together',
    slug: 'together',
    liveUrl: 'https://fintech-stack-nine.vercel.app/',
    title: 'together.',
    subtitle: 'An AI-powered fintech stack optimizer that helps users build and improve their financial app setup.',
    role: 'Solo Creator',
    timeline: '2024',
    team: 'Solo Creator',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'AI/LLM'],
    brief: {
      overview: 'An AI-powered fintech stack optimizer that helps users build and improve their financial app setup.',
      role: 'Solo Creator',
      timeline: '2024',
      team: 'Solo Creator',
      context: 'As a beginner, I struggled to understand which fintech apps I actually needed and how they should work together. I created this to make that decision simpler.'
    },
    problem: {
      statement: 'With so many fintech apps available, beginners struggle to know which products actually fit their needs.',
      userContext: 'Target User: Beginners and young adults starting to manage their finances.',
      improvementNeed: 'Pain Points:\n• Too many choices\n• Confusing comparisons\n• Overlapping apps\n• Generic recommendations',
      keyChallenge: 'Why It Matters: Users need a financial setup that works for them, not just more apps.'
    },
    thinking: {
      approach: 'Understand the user → analyse their existing stack → identify gaps and overlaps → recommend improvements.',
      userNeeds: 'Beginners think in goals like saving, investing, spending, and simplifying rather than fintech categories.',
      prioritization: 'Prioritisation: Focused first on onboarding, stack analysis, recommendations, comparison, and Stack Advisor.',
      decisionsAndTradeoffs: [
        'Product Decision: Personalised recommendations, stack analysis, app comparison, and conversational AI.',
        'How the Mapping Works: AI/LLM extracts user\'s needs & goals → structured fintech database maps apps to categories & features → recommendation engine scores against profile → gaps/overlaps identified → optimized stack generated.',
        'Trade-offs: Kept the experience simple while balancing AI flexibility with financial accuracy.',
        'Reasoning: Shifted the question from “Which app is best?” to “What works best for me?”'
      ]
    },
    design: {
      userFlow: 'Discover → Onboard → Build Stack → Analyse → Recommend → Optimise',
      exploration: 'Dark fintech aesthetic with glassmorphism, grids, cards, and motion.',
      iterations: [
        'Wireframes: Explored onboarding, stack analysis, results, and Stack Advisor.',
        'Design Decisions: Reduce cognitive load, progressively reveal information, and make recommendations easy to understand.',
        'Iterations: Command-based AI → guided experience → natural-language Stack Advisor.',
        'Final Design: A simple, personalised experience for building and improving a fintech stack.'
      ]
    },
    demo: {
      headline: 'Working Prototype — Interactive Web Experience',
      description: 'Explore: Onboarding, stack analysis, recommendations, comparisons, and Stack Advisor.',
      highlights: [
        'Onboarding & Stack Analysis wizard',
        'Personalised AI app recommendations & gap/overlap detector',
        'Natural-language Stack Advisor and side-by-side app comparisons'
      ],
      videoPlaceholder: 'TOGETHER FINTECH STACK OPTIMIZER DEMO'
    },
    learnings: {
      whatWorked: 'Outcome / Result: Built and iterated a working AI-powered fintech product. What Worked: User-first thinking, stack-based recommendations, and conversational UX.',
      whatDidnt: 'What Didn\'t: The first AI experience was too technical and complex.',
      futureImprovements: 'What I Learned: AI still needs simple UX, structured data, and trust. Limitations: Prototype-level product with limited real-user validation. What I\'d Improve: User testing, recommendation accuracy, source transparency, and real-world validation.'
    }
  },

  'aura-design-system': {
    id: 'aura-design-system',
    slug: 'aura-design-system',
    title: 'Aura — Generative Component System',
    subtitle: 'Systemic design tokens with reactive web micro-interactions.',
    role: 'Product Designer & Lead Developer',
    timeline: '2025',
    team: 'Solo Project',
    tools: ['Figma', 'React', 'JavaScript', 'CSS Modules'],
    brief: {
      overview: 'An experimental component library bridging systemic design tokens with reactive web animations and fluid layout math.',
      role: 'Product Designer & Lead Developer',
      timeline: '2025',
      team: 'Solo Project',
      context: 'Explored how web design systems stretch when micro-interactions are driven directly by systemic design tokens.'
    },
    problem: {
      statement: 'Traditional design systems isolate visual design tokens from fluid motion, resulting in rigid, static interfaces.',
      userContext: 'Developers struggle to maintain visual consistency across micro-animations without writing custom isolated CSS hacks.',
      improvementNeed: 'A unified token bridge connecting Figma design variables directly to reactive web layout primitives.',
      keyChallenge: 'Maintaining sub-10ms render latency for dynamic glassmorphic card surfaces and proximity animations.'
    },
    thinking: {
      approach: 'Created a token-driven animation engine where spacing, shadow, and color scale dynamically with mouse proximity and scroll momentum.',
      userNeeds: 'Design token export automation, zero-runtime CSS variables, accessible ARIA primitives, and fluid typography scales.',
      prioritization: 'Prioritized core token engine performance and accessibility over auxiliary component variations.',
      decisionsAndTradeoffs: [
        'Decision: Built using native CSS custom properties for instant zero-runtime variable updates.',
        'Trade-off: Omitted legacy browser polyfills to maximize modern Web Vitals performance (99+ score).'
      ]
    },
    design: {
      userFlow: 'Token Definition in Figma → Automated Token Pipeline → Dynamic CSS Variable Injection → Reactive Component Render',
      exploration: 'Explored glassmorphism surfaces, proximity radial glows, and typography hierarchy scales.',
      iterations: ['Iteration 1: JavaScript runtime animation loop (replaced with CSS custom properties for 60fps performance).']
    },
    demo: {
      headline: 'Interactive Component Playground & Token Inspector',
      description: 'Test live token manipulation, glassmorphic card proximity lighting, and fluid layout math.',
      highlights: [
        'Zero-runtime CSS custom property manipulation panel.',
        'Proximity radial lighting glow reacting smoothly to cursor movement.',
        'Systemic typography & spacing scale dynamic previewer.'
      ],
      videoPlaceholder: 'AURA DESIGN SYSTEM COMPONENT PLAYGROUND'
    },
    learnings: {
      whatWorked: 'Achieved 99+ Web Vitals score while maintaining smooth 60fps proximity lighting effects.',
      whatDidnt: 'Backdrop-filter blur effects required fallback rules for lower-power devices.',
      futureImprovements: 'Expand component library to include web canvas acceleration for 3D token visualizations.'
    }
  },

  'quantflow-analytics': {
    id: 'quantflow-analytics',
    slug: 'quantflow-analytics',
    title: 'QuantFlow — Apprentice Analytics Platform',
    subtitle: 'Real-time market insights dashboard for intuitive data exploration.',
    role: 'Product & Tech Apprentice',
    timeline: '2025',
    team: 'Fyers Securities Team',
    tools: ['SQL', 'Google Analytics', 'Python', 'Postman', 'Figma'],
    brief: {
      overview: 'Explored during apprenticeship at Fyers Securities. Designed to simplify multi-asset market analytics into actionable visual summaries.',
      role: 'Product & Tech Apprentice',
      timeline: 'Jul 2025 – Dec 2025',
      team: 'Fyers Product & Tech Team',
      context: 'Created to reduce cognitive clutter in trading analytics dashboards and validate onboarding event tracking.'
    },
    problem: {
      statement: 'Financial analytics dashboards often overwhelm non-expert traders with dense numbers and unorganized data feeds.',
      userContext: 'Traders spend excessive time navigating fragmented metric menus to extract daily market trend insights.',
      improvementNeed: 'Contextual visual widgets with simplified custom metric filtering and validated event telemetry.',
      keyChallenge: 'Rendering high-density data visualizations while keeping time-to-insight under 5 seconds.'
    },
    thinking: {
      approach: 'Restructured trader onboarding and analytics workflows into customizable widget tiles.',
      userNeeds: 'Rapid market sentiment summaries, validated event tracking, and intuitive SQL data querying.',
      prioritization: 'Prioritized core market telemetry validation and widget customization over social trading feeds.',
      decisionsAndTradeoffs: [
        'Decision: Used Postman and cURL API validation suites to verify data accuracy across Google Analytics & CleverTap before release.'
      ]
    },
    design: {
      userFlow: 'Onboarding Selection → Customized Dashboard Layout → Live Data Feed → Metric Filter → One-Click Export',
      exploration: 'Dark theme optimized for long multi-monitor trading sessions with crisp neon data visualization indicators.',
      iterations: ['Iteration 1: Dense tabular view (replaced with widget cards for 35% faster insight discovery).']
    },
    demo: {
      headline: 'QuantFlow Live Analytics & Custom Widget Builder Demo',
      description: 'Explore market metric widgets, event telemetry validation suite, and custom data filters.',
      highlights: [
        'Interactive financial metric widget grid with custom drag-and-drop tiles.',
        'Validated event telemetry logger verifying Google Analytics payload accuracy.',
        'Instant multi-asset market sentiment visual summary widget.'
      ],
      videoPlaceholder: 'QUANTFLOW ANALYTICS INTERACTIVE DEMO'
    },
    learnings: {
      whatWorked: 'Contextual metric widgets improved user onboarding completion by 35%.',
      whatDidnt: 'Third-party tracking scripts required lazy-loading to prevent dashboard initialization delay.',
      futureImprovements: 'Incorporate predictive machine-learning trend overlays into chart views.'
    }
  },

  'pulse-mobile': {
    id: 'pulse-mobile',
    slug: 'pulse-mobile',
    title: 'Pulse — Daily Focus & Habit Experience',
    subtitle: 'Cross-platform mobile companion for deep work and mental momentum.',
    role: 'Developer Intern',
    timeline: '2025',
    team: 'Zidio Development Team',
    tools: ['React Native', 'JavaScript', 'Flask', 'Python', 'Git'],
    brief: {
      overview: 'Built using React Native and Flask backend. Focuses on frictionless interaction flows, offline-first data sync, and delightful micro-haptics.',
      role: 'Developer Intern',
      timeline: 'Feb 2025 – May 2025',
      team: 'Zidio Development Team',
      context: 'Explored mobile user experience design, offline-first state persistence, and task management efficiency.'
    },
    problem: {
      statement: 'Most productivity apps add administrative overhead and complex setup forms instead of removing friction.',
      userContext: 'Users abandon habit tracking apps when entry takes more than a few seconds.',
      improvementNeed: 'Single-tap gesture interaction with instant visual feedback and 100% offline data availability.',
      keyChallenge: 'Ensuring 60fps native gestures across both iOS and Android platforms using React Native.'
    },
    thinking: {
      approach: 'Stripped away complex form fields in favor of single-swipe habit completions.',
      userNeeds: 'Instant offline access, visual streak indicators, zero notification spam, and fast habit logging.',
      prioritization: 'Prioritized offline SQLite sync and touch gesture responsiveness over cloud social features.',
      decisionsAndTradeoffs: [
        'Decision: Built offline-first sync architecture using local storage before attempting remote server updates.'
      ]
    },
    design: {
      userFlow: 'Open App → Single Swipe Habit Check → Haptic Feedback Ring → Daily Streak Summary',
      exploration: 'Vibrant neon accent accents against dark background with fluid spring physics on gestures.',
      iterations: ['Iteration 1: Multi-step dialog form (replaced with single swipe gesture for 70% faster logging).']
    },
    demo: {
      headline: 'Pulse Mobile Gesture & Haptic Interaction Demo',
      description: 'Experience single-swipe habit completions, fluid spring animations, and offline status persistence.',
      highlights: [
        'Single-swipe completion gesture with spring physics animation.',
        'Offline-first local database sync updating instantly without network delay.',
        'Minimalist daily momentum ring visualization.'
      ],
      videoPlaceholder: 'PULSE MOBILE APP INTERACTIVE DEMO'
    },
    learnings: {
      whatWorked: 'Single swipe gesture logging reduced daily habit entry friction by 70%.',
      whatDidnt: 'Complex notification triggers drained mobile battery initially until optimized.',
      futureImprovements: 'Add smart AI scheduling suggestions based on user completion patterns.'
    }
  },

  'echo-ai-workspace': {
    id: 'echo-ai-workspace',
    slug: 'echo-ai-workspace',
    title: 'Echo — Collaborative AI Workspace',
    subtitle: 'Multi-model workspace environment for structured research teams.',
    role: 'Product Lead & Designer',
    timeline: '2024',
    team: 'Team of 3',
    tools: ['Next.js', 'TypeScript', 'Tailwind', 'OpenAI API'],
    brief: {
      overview: 'Exploration into multi-agent collaborative workspaces, allowing team members to prompt and chain AI models.',
      role: 'Product Lead & Designer',
      timeline: '2024',
      team: 'Team of 3',
      context: 'Designed to unify fragmented prompt workflows into shared team research canvases.'
    },
    problem: {
      statement: 'Teams waste time copying and pasting AI chat outputs between disconnected browser tabs.',
      userContext: 'Researchers need a single canvas where multiple AI models can work side-by-side.',
      improvementNeed: 'Multi-threaded canvas nodes with shared context state and model branching.',
      keyChallenge: 'Managing API streaming state across concurrent canvas nodes.'
    },
    thinking: {
      approach: 'Modeled AI interactions as graph node trees rather than linear chat threads.',
      userNeeds: 'Canvas branching, model comparison side-by-side, shared team prompt templates, and instant export.',
      prioritization: 'Prioritized live text streaming performance and node branching over custom theme styling.',
      decisionsAndTradeoffs: [
        'Decision: Built node-based canvas interface allowing users to branch ideas dynamically.'
      ]
    },
    design: {
      userFlow: 'Create Canvas → Drop Prompt Node → Select AI Model → Branch Sub-prompts → Export Document',
      exploration: 'Infinite spatial canvas with glowing node connections and dark mode research workspace styling.',
      iterations: ['Iteration 1: Standard linear chat list (replaced with spatial node canvas).']
    },
    demo: {
      headline: 'Echo Multi-Agent Node Canvas Demo',
      description: 'Test live prompt node branching, side-by-side model comparison, and canvas state streaming.',
      highlights: [
        'Spatial node canvas with infinite drag-and-drop prompt cards.',
        'Side-by-side AI model output comparative analysis view.',
        'Shared context memory injection across linked canvas nodes.'
      ],
      videoPlaceholder: 'ECHO AI WORKSPACE INTERACTIVE CANVAS DEMO'
    },
    learnings: {
      whatWorked: 'Node canvas structure increased multi-step research synthesis efficiency by 50%.',
      whatDidnt: 'Large canvas graphs required virtualized node rendering for smooth panning.',
      futureImprovements: 'Integrate local open-source LLM inference directly into web canvas.'
    }
  }
};

export function getProjectCaseStudy(identifier) {
  if (!identifier) return PROJECT_CASE_STUDIES['signaldesk'];

  const normalized = String(identifier).toLowerCase().trim();

  if (PROJECT_CASE_STUDIES[normalized]) {
    return PROJECT_CASE_STUDIES[normalized];
  }

  const foundBySlug = Object.values(PROJECT_CASE_STUDIES).find(p => p.slug === normalized || p.id === normalized);
  if (foundBySlug) return foundBySlug;

  if (normalized.includes('together') || normalized.includes('fintech') || normalized.includes('optimizer') || normalized.includes('stack')) {
    return PROJECT_CASE_STUDIES['together'];
  }
  if (normalized.includes('cp') || normalized.includes('speech') || normalized.includes('pain') || normalized.includes('cerebral')) {
    return PROJECT_CASE_STUDIES['cp-speech-pain'];
  }
  if (normalized.includes('signal') || normalized.includes('desk')) {
    return PROJECT_CASE_STUDIES['signaldesk'];
  }
  if (normalized.includes('dahlia') || normalized.includes('memory') || normalized.includes('garden') || normalized.includes('summariser') || normalized.includes('text')) {
    return PROJECT_CASE_STUDIES['dahlia'];
  }
  if (normalized.includes('crop') || normalized.includes('inventory')) {
    return PROJECT_CASE_STUDIES['crop-inventory'];
  }
  if (normalized.includes('aura') || normalized.includes('generative') || normalized.includes('system')) {
    return PROJECT_CASE_STUDIES['aura-design-system'];
  }
  if (normalized.includes('quant') || normalized.includes('analytics') || normalized.includes('fyers')) {
    return PROJECT_CASE_STUDIES['quantflow-analytics'];
  }
  if (normalized.includes('pulse') || normalized.includes('habit') || normalized.includes('mobile')) {
    return PROJECT_CASE_STUDIES['pulse-mobile'];
  }
  if (normalized.includes('echo') || normalized.includes('workspace')) {
    return PROJECT_CASE_STUDIES['echo-ai-workspace'];
  }

  return PROJECT_CASE_STUDIES['signaldesk'];
}

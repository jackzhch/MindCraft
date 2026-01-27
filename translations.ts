export type Language = 'en' | 'zh' | 'ja';

export interface Translations {
  // Navigation
  nav: {
    systems: string;
    about: string;
    reviews: string;
    myPurchases: string;
    cart: string;
    signIn: string;
    signOut: string;
    myAccount: string;
  };
  
  // Hero Section
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    tagline: string;
    exploreButton: string;
    manifestoButton: string;
  };
  
  // Products Section
  products: {
    heading: string;
    description: string;
    filterAll: string;
    filterSystems: string;
    filterGuides: string;
    reviews: string;
    noProducts: string;
    bundleTitle: string;
    bundleDescription: string;
    addToCart: string;
    learnMore: string;
  };
  
  // About Page
  about: {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionText1: string;
    missionText2: string;
    teamTitle: string;
    valuesTitle: string;
    statsTitle: string;
    statsCommunity: string;
    statsSystems: string;
    statsExperience: string;
    statsRating: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    backToShop: string;
    
    // Team Members
    team: {
      alex: {
        name: string;
        role: string;
        description: string;
      };
      sarah: {
        name: string;
        role: string;
        description: string;
      };
      marcus: {
        name: string;
        role: string;
        description: string;
      };
      emma: {
        name: string;
        role: string;
        description: string;
      };
      james: {
        name: string;
        role: string;
        description: string;
      };
      lisa: {
        name: string;
        role: string;
        description: string;
      };
    };
    
    // Values
    values: {
      tested: {
        title: string;
        description: string;
      };
      science: {
        title: string;
        description: string;
      };
      actionable: {
        title: string;
        description: string;
      };
      community: {
        title: string;
        description: string;
      };
    };
  };
  
  // Newsletter Section
  newsletter: {
    title: string;
    description: string;
    tagline: string;
    placeholder: string;
    button: string;
    subscribing: string;
    privacy: string;
    successMessage: string;
    errorInvalid: string;
    errorExists: string;
    errorGeneric: string;
  };
  
  // Footer
  footer: {
    copyright: string;
    about: string;
    privacy: string;
    terms: string;
    support: string;
  };
  
  // Cart
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    checkout: string;
    continueShopping: string;
    remove: string;
  };
  
  // Messages
  messages: {
    paymentSuccess: string;
    paymentSuccessDetail: string;
    checkoutCanceled: string;
    checkoutCanceledDetail: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      systems: 'Systems',
      about: 'About',
      reviews: 'Reviews',
      myPurchases: 'My Purchases',
      cart: 'Cart',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      myAccount: 'My Account',
    },
    hero: {
      title1: 'Build Your',
      title2: 'Second Brain',
      subtitle: 'Battle-tested systems for knowledge workers who refuse to drown in information.',
      tagline: 'Think clearer. Work smarter. Achieve more.',
      exploreButton: 'Explore Systems',
      manifestoButton: 'Our Manifesto',
    },
    products: {
      heading: 'Curated Tools',
      description: 'Digital artifacts to enhance your cognition.',
      filterAll: 'All',
      filterSystems: 'Systems',
      filterGuides: 'Guides',
      reviews: 'Reviews',
      noProducts: 'No products found in this category.',
      bundleTitle: '💎 Best Value Bundle',
      bundleDescription: 'Get our top 3 systems together and save big',
      addToCart: 'Add to Cart',
      learnMore: 'Learn More',
    },
    about: {
      title: 'About',
      subtitle: "We're a team of knowledge workers, productivity obsessives, and system builders who've spent years perfecting the art of information management.",
      missionTitle: 'Our Mission',
      missionText1: 'In a world drowning in information, we believe the competitive advantage belongs to those who can effectively capture, organize, and leverage knowledge. We\'ve experienced firsthand the frustration of scattered notes, forgotten insights, and the overwhelming feeling of information overload.',
      missionText2: 'That\'s why we created MindsCraft—to share battle-tested systems that have helped us and thousands of others transform chaos into clarity, and information into actionable intelligence.',
      teamTitle: 'Meet the Team',
      valuesTitle: 'Our Values',
      statsTitle: 'By the Numbers',
      statsCommunity: 'Community Members',
      statsSystems: 'Systems Deployed',
      statsExperience: 'Combined Experience',
      statsRating: 'Average Rating',
      ctaTitle: 'Ready to Transform Your Thinking?',
      ctaDescription: "Join thousands of knowledge workers who've upgraded their second brain with our battle-tested systems.",
      ctaButton: 'Explore Our Systems',
      backToShop: 'Back to Shop',
      team: {
        alex: {
          name: 'Alex Chen',
          role: 'Founder & Systems Architect',
          description: 'Former product manager at a Fortune 500 tech company. Built knowledge management systems used by 10,000+ employees. Obsessed with PKM and mental models since 2015.',
        },
        sarah: {
          name: 'Dr. Sarah Martinez',
          role: 'Learning Science Advisor',
          description: 'Ph.D. in Cognitive Science from Stanford. Published researcher on memory retention and learning methodologies. Ensures our systems are grounded in neuroscience.',
        },
        marcus: {
          name: 'Marcus Johnson',
          role: 'Content & Community Lead',
          description: 'Former journalist and content strategist. Managed knowledge bases for 3 startups through acquisition. Expert at turning complex systems into actionable frameworks.',
        },
        emma: {
          name: 'Emma Williams',
          role: 'Product Designer',
          description: '15+ years designing productivity tools at Apple and Microsoft. Passionate about creating intuitive systems that reduce cognitive load and enhance workflow.',
        },
        james: {
          name: 'Dr. James Park',
          role: 'Research & Development',
          description: 'Data scientist specializing in information retrieval and knowledge graphs. Previously built recommendation systems at a leading AI research lab.',
        },
        lisa: {
          name: 'Lisa Thompson',
          role: 'Customer Success Lead',
          description: "Former executive coach who's helped 500+ professionals optimize their workflows. Ensures our customers get maximum value from their systems.",
        },
      },
      values: {
        tested: {
          title: 'Tested, Not Theoretical',
          description: 'Every system we sell has been battle-tested in real-world scenarios. No untested theories or academic fluff—only proven frameworks that deliver results.',
        },
        science: {
          title: 'Science-Backed',
          description: "Our systems are grounded in cognitive science, learning theory, and behavioral psychology. We don't just follow productivity trends—we understand the science behind what works.",
        },
        actionable: {
          title: 'Actionable Over Complex',
          description: 'Complexity is easy. Simplicity is hard. We obsess over making our systems as simple as possible while maintaining their power and effectiveness.',
        },
        community: {
          title: 'Community-Driven',
          description: 'Our community of 12,000+ knowledge workers constantly helps us improve and evolve our systems. Your feedback shapes everything we create.',
        },
      },
    },
    newsletter: {
      title: 'Join 12,000+ Strategic Thinkers',
      description: 'Get exclusive weekly insights on knowledge management, mental models, and cognitive tools that give you an unfair advantage.',
      tagline: 'No fluff. Just actionable intelligence you can use Monday morning.',
      placeholder: 'Enter your email',
      button: 'Get Free Insights',
      subscribing: 'Subscribing...',
      privacy: '🔒 We respect your inbox. Unsubscribe anytime.',
      successMessage: 'Success! Check your email for insights.',
      errorInvalid: 'Please enter a valid email address',
      errorExists: 'This email is already subscribed!',
      errorGeneric: 'Something went wrong. Please try again.',
    },
    footer: {
      copyright: 'MindsCraft Digital. All rights reserved.',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      support: 'Support',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      subtotal: 'Subtotal',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
      remove: 'Remove',
    },
    messages: {
      paymentSuccess: 'Payment Successful!',
      paymentSuccessDetail: 'Your order has been confirmed. Check your email for details.',
      checkoutCanceled: 'Checkout Canceled',
      checkoutCanceledDetail: 'No charges were made. Your cart is still available.',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
    },
  },
  
  zh: {
    nav: {
      systems: '系统',
      about: '关于我们',
      reviews: '用户评价',
      myPurchases: '我的购买',
      cart: '购物车',
      signIn: '登录',
      signOut: '退出',
      myAccount: '我的账户',
    },
    hero: {
      title1: '构建你的',
      title2: '第二大脑',
      subtitle: '为拒绝被信息淹没的知识工作者提供经过实战检验的系统。',
      tagline: '思维更清晰。工作更智能。成就更多。',
      exploreButton: '探索系统',
      manifestoButton: '我们的理念',
    },
    products: {
      heading: '精选工具',
      description: '提升认知能力的数字工具。',
      filterAll: '全部',
      filterSystems: '系统',
      filterGuides: '指南',
      reviews: '用户评价',
      noProducts: '该分类下没有找到产品。',
      bundleTitle: '💎 超值套装',
      bundleDescription: '一次获得我们的前3个系统，大幅节省费用',
      addToCart: '加入购物车',
      learnMore: '了解更多',
    },
    about: {
      title: '关于我们',
      subtitle: '我们是一支由知识工作者、效率追求者和系统构建者组成的团队，多年来致力于完善信息管理的艺术。',
      missionTitle: '我们的使命',
      missionText1: '在一个信息泛滥的世界里，我们相信竞争优势属于那些能够有效捕获、组织和利用知识的人。我们亲身体验过笔记分散、洞察被遗忘以及信息过载带来的挫败感。',
      missionText2: '这就是我们创建 MindsCraft 的原因——分享经过实战检验的系统，这些系统已经帮助我们和成千上万的其他人将混乱转化为清晰，将信息转化为可操作的智慧。',
      teamTitle: '认识我们的团队',
      valuesTitle: '我们的价值观',
      statsTitle: '数据说话',
      statsCommunity: '社区成员',
      statsSystems: '部署系统',
      statsExperience: '综合经验',
      statsRating: '平均评分',
      ctaTitle: '准备好改变你的思维方式了吗？',
      ctaDescription: '加入数千名知识工作者的行列，用我们经过实战检验的系统升级你的第二大脑。',
      ctaButton: '探索我们的系统',
      backToShop: '返回商店',
      team: {
        alex: {
          name: 'Alex Chen',
          role: '创始人兼系统架构师',
          description: '曾任职于世界500强科技公司的产品经理。构建了被10,000多名员工使用的知识管理系统。自2015年起痴迷于个人知识管理和思维模型。',
        },
        sarah: {
          name: 'Dr. Sarah Martinez',
          role: '学习科学顾问',
          description: '斯坦福大学认知科学博士。关于记忆保持和学习方法的发表研究者。确保我们的系统基于神经科学。',
        },
        marcus: {
          name: 'Marcus Johnson',
          role: '内容与社区负责人',
          description: '前记者和内容策略师。在3家初创公司被收购期间管理知识库。擅长将复杂系统转化为可操作的框架。',
        },
        emma: {
          name: 'Emma Williams',
          role: '产品设计师',
          description: '在Apple和Microsoft设计生产力工具超过15年。热衷于创建减少认知负荷并增强工作流程的直观系统。',
        },
        james: {
          name: 'Dr. James Park',
          role: '研发负责人',
          description: '专注于信息检索和知识图谱的数据科学家。曾在领先的人工智能研究实验室构建推荐系统。',
        },
        lisa: {
          name: 'Lisa Thompson',
          role: '客户成功负责人',
          description: '前执行教练，已帮助500多名专业人士优化他们的工作流程。确保我们的客户从系统中获得最大价值。',
        },
      },
      values: {
        tested: {
          title: '经过检验，而非理论',
          description: '我们销售的每个系统都经过了真实场景的实战检验。没有未经测试的理论或学术空谈——只有能够带来成果的经过验证的框架。',
        },
        science: {
          title: '科学支持',
          description: '我们的系统基于认知科学、学习理论和行为心理学。我们不只是跟随生产力趋势——我们理解背后的科学原理。',
        },
        actionable: {
          title: '可操作胜过复杂',
          description: '复杂性很容易。简单性很难。我们痴迷于让我们的系统尽可能简单，同时保持其力量和有效性。',
        },
        community: {
          title: '社区驱动',
          description: '我们由12,000多名知识工作者组成的社区不断帮助我们改进和发展系统。您的反馈塑造了我们创建的一切。',
        },
      },
    },
    newsletter: {
      title: '加入 12,000+ 战略思考者',
      description: '获取关于知识管理、思维模型和认知工具的独家每周见解，让你获得不公平的优势。',
      tagline: '没有废话。只有你可以在周一早上使用的可操作情报。',
      placeholder: '输入您的邮箱',
      button: '获取免费见解',
      subscribing: '订阅中...',
      privacy: '🔒 我们尊重您的收件箱。随时取消订阅。',
      successMessage: '成功！请查看您的邮箱获取见解。',
      errorInvalid: '请输入有效的邮箱地址',
      errorExists: '该邮箱已订阅！',
      errorGeneric: '出现问题。请重试。',
    },
    footer: {
      copyright: 'MindsCraft Digital. 版权所有。',
      about: '关于我们',
      privacy: '隐私政策',
      terms: '服务条款',
      support: '支持',
    },
    cart: {
      title: '购物车',
      empty: '购物车是空的',
      subtotal: '小计',
      checkout: '结账',
      continueShopping: '继续购物',
      remove: '移除',
    },
    messages: {
      paymentSuccess: '支付成功！',
      paymentSuccessDetail: '您的订单已确认。请查看您的邮箱获取详情。',
      checkoutCanceled: '结账已取消',
      checkoutCanceledDetail: '没有产生任何费用。您的购物车仍然可用。',
    },
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      close: '关闭',
    },
  },
  
  ja: {
    nav: {
      systems: 'システム',
      about: '私たちについて',
      reviews: 'レビュー',
      myPurchases: '購入履歴',
      cart: 'カート',
      signIn: 'ログイン',
      signOut: 'ログアウト',
      myAccount: 'マイアカウント',
    },
    hero: {
      title1: 'あなたの',
      title2: 'セカンドブレイン',
      subtitle: '情報に溺れることを拒否する知識労働者のための実戦で検証されたシステム。',
      tagline: 'より明確に考える。よりスマートに働く。より多くを達成する。',
      exploreButton: 'システムを探索',
      manifestoButton: '私たちの理念',
    },
    products: {
      heading: '厳選ツール',
      description: '認知能力を高めるデジタルツール。',
      filterAll: 'すべて',
      filterSystems: 'システム',
      filterGuides: 'ガイド',
      reviews: 'レビュー',
      noProducts: 'このカテゴリに製品が見つかりません。',
      bundleTitle: '💎 ベストバリューバンドル',
      bundleDescription: 'トップ3システムをまとめてお得に',
      addToCart: 'カートに追加',
      learnMore: '詳細を見る',
    },
    about: {
      title: '私たちについて',
      subtitle: '私たちは知識労働者、生産性オタク、システム構築者のチームで、長年にわたり情報管理の技術を完成させてきました。',
      missionTitle: '私たちの使命',
      missionText1: '情報に溺れる世界では、知識を効果的に捕捉し、整理し、活用できる人々に競争上の優位性があると信じています。私たちは、散らばったメモ、忘れられた洞察、そして圧倒的な情報過多の感覚を直接経験してきました。',
      missionText2: 'だからこそMindsCraftを作りました—私たちや何千人もの人々が混沌を明確さに、情報を実行可能なインテリジェンスに変えるのを助けた実戦で検証されたシステムを共有するためです。',
      teamTitle: 'チームに会う',
      valuesTitle: '私たちの価値観',
      statsTitle: '数字で見る',
      statsCommunity: 'コミュニティメンバー',
      statsSystems: '展開されたシステム',
      statsExperience: '総合経験',
      statsRating: '平均評価',
      ctaTitle: '思考を変える準備はできましたか？',
      ctaDescription: '実戦で検証されたシステムでセカンドブレインをアップグレードした何千人もの知識労働者に参加してください。',
      ctaButton: 'システムを探索',
      backToShop: 'ショップに戻る',
      team: {
        alex: {
          name: 'Alex Chen',
          role: '創設者兼システムアーキテクト',
          description: 'フォーチュン500のテクノロジー企業の元プロダクトマネージャー。10,000人以上の従業員が使用する知識管理システムを構築。2015年以来、PKMとメンタルモデルに夢中。',
        },
        sarah: {
          name: 'Dr. Sarah Martinez',
          role: '学習科学アドバイザー',
          description: 'スタンフォード大学認知科学博士。記憶保持と学習方法論に関する研究者。当社のシステムが神経科学に基づいていることを保証。',
        },
        marcus: {
          name: 'Marcus Johnson',
          role: 'コンテンツ＆コミュニティリード',
          description: '元ジャーナリスト兼コンテンツストラテジスト。買収を通じて3つのスタートアップの知識ベースを管理。複雑なシステムを実行可能なフレームワークに変えるエキスパート。',
        },
        emma: {
          name: 'Emma Williams',
          role: 'プロダクトデザイナー',
          description: 'AppleとMicrosoftで生産性ツールを15年以上設計。認知負荷を減らし、ワークフローを強化する直感的なシステムの作成に情熱を注ぐ。',
        },
        james: {
          name: 'Dr. James Park',
          role: '研究開発',
          description: '情報検索と知識グラフを専門とするデータサイエンティスト。以前は大手AI研究所でレコメンデーションシステムを構築。',
        },
        lisa: {
          name: 'Lisa Thompson',
          role: 'カスタマーサクセスリード',
          description: '500人以上の専門家のワークフローの最適化を支援した元エグゼクティブコーチ。お客様がシステムから最大限の価値を得られるようサポート。',
        },
      },
      values: {
        tested: {
          title: 'テスト済み、理論ではない',
          description: '私たちが販売するすべてのシステムは、実際のシナリオで実戦テストされています。未テストの理論や学術的な空論はありません—結果をもたらす実証済みのフレームワークのみです。',
        },
        science: {
          title: '科学に基づく',
          description: '私たちのシステムは認知科学、学習理論、行動心理学に基づいています。単に生産性のトレンドに従うのではなく、何が機能するかの背後にある科学を理解しています。',
        },
        actionable: {
          title: '複雑さより実用性',
          description: '複雑さは簡単です。シンプルさは難しいです。力と有効性を維持しながら、システムを可能な限りシンプルにすることに執着しています。',
        },
        community: {
          title: 'コミュニティ主導',
          description: '12,000人以上の知識労働者のコミュニティが、システムの改善と進化を常に支援しています。あなたのフィードバックが、私たちが作成するすべてのものを形作ります。',
        },
      },
    },
    newsletter: {
      title: '12,000人以上の戦略的思考者に参加',
      description: '知識管理、メンタルモデル、不公平な優位性を与える認知ツールに関する独占的な週次インサイトを入手。',
      tagline: '無駄なし。月曜日の朝に使える実用的なインテリジェンスのみ。',
      placeholder: 'メールアドレスを入力',
      button: '無料インサイトを入手',
      subscribing: '購読中...',
      privacy: '🔒 受信トレイを尊重します。いつでも購読解除できます。',
      successMessage: '成功！インサイトのためにメールを確認してください。',
      errorInvalid: '有効なメールアドレスを入力してください',
      errorExists: 'このメールはすでに購読済みです！',
      errorGeneric: '問題が発生しました。もう一度お試しください。',
    },
    footer: {
      copyright: 'MindsCraft Digital. 無断転載を禁じます。',
      about: '私たちについて',
      privacy: 'プライバシー',
      terms: '利用規約',
      support: 'サポート',
    },
    cart: {
      title: 'ショッピングカート',
      empty: 'カートは空です',
      subtotal: '小計',
      checkout: 'チェックアウト',
      continueShopping: '買い物を続ける',
      remove: '削除',
    },
    messages: {
      paymentSuccess: '支払い成功！',
      paymentSuccessDetail: 'ご注文が確認されました。詳細はメールをご確認ください。',
      checkoutCanceled: 'チェックアウトがキャンセルされました',
      checkoutCanceledDetail: '請求は発生していません。カートは引き続き利用可能です。',
    },
    common: {
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      close: '閉じる',
    },
  },
};

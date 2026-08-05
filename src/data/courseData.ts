export interface AlgorithmCard {
  title: string;
  notation: string;
  explanation: string;
}

export interface CourseChapter {
  id: string;
  slug: string;
  title: string;
  summary: string;
  objectives: string[];
  keyTakeaways: string[];
  tips: string[];
  mistakes: string[];
  videoLabel: string;
  algorithms: AlgorithmCard[];
  quiz: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
}

export interface CourseLevel {
  id: string;
  slug: string;
  title: string;
  accent: string;
  description: string;
  chapters: CourseChapter[];
}

export const courseLevels: CourseLevel[] = [
  {
    id: 'beginner',
    slug: 'debutant',
    title: 'Débutant',
    accent: 'from-emerald-500/20 to-cyan-500/10',
    description: 'Posez les bases, comprenez la structure du cube et maîtrisez vos premiers mouvements.',
    chapters: [
      {
        id: 'intro-cube',
        slug: 'introduction-au-rubiks-cube',
        title: 'Introduction au Rubik’s Cube',
        summary: 'Découvrez le cube, ses pièces et la logique fondamentale derrière chaque mouvement.',
        objectives: ['Identifier les centres, arêtes et coins', 'Comprendre l’orientation du cube', 'Se familiariser avec la terminologie'],
        keyTakeaways: ['Le cube est un système de pièces mobiles', 'Les centres déterminent les couleurs principales', 'Le cube reste cohérent si chaque mouvement est exécuté correctement'],
        tips: ['Tenez toujours le cube avec une main stable', 'Apprenez à repérer les pièces avant de tourner'],
        mistakes: ['Tourner trop vite', 'Perdre le repère de la face active'],
        videoLabel: 'Introduction visuelle et posture',
        algorithms: [
          { title: 'Repères de base', notation: 'U / D / L / R / F / B', explanation: 'Apprenez la notation des six faces pour pouvoir lire les leçons suivantes.' },
        ],
        quiz: {
          question: 'Quelle pièce définit la couleur d’une face ?',
          options: ['Le centre', 'L’arête', 'Le coin'],
          answer: 'Le centre',
          explanation: 'Les centres ne bougent pas de place et servent de référence pour chaque face.',
        },
      },
      {
        id: 'notation',
        slug: 'notation-des-mouvements',
        title: 'Notation des mouvements',
        summary: 'Comprenez la logique de la notation et lisez des algorithmes sans confusion.',
        objectives: ['Lire une séquence simple', 'Associer chaque lettre à une face', 'Comprendre le sens horaire et antihoraire'],
        keyTakeaways: ['U, D, L, R, F, B représentent les faces', 'Un apostrophe signifie un tour antihoraire', 'Un 2 signifie deux tours'],
        tips: ['Pratiquez avec une seule face à la fois', 'Relisez chaque notation à voix haute'],
        mistakes: ['Mélanger les faces', 'Oublier l’apostrophe'],
        videoLabel: 'Découverte de la notation',
        algorithms: [
          { title: 'R', notation: 'R', explanation: 'Tourne la face droite dans le sens horaire.' },
          { title: 'R’', notation: 'R’', explanation: 'Tourne la face droite dans le sens antihoraire.' },
        ],
        quiz: {
          question: 'Que signifie R’ ?',
          options: ['Un tour de la face droite dans le sens antihoraire', 'Un tour de la face gauche', 'Un double tour du haut'],
          answer: 'Un tour de la face droite dans le sens antihoraire',
          explanation: 'L’apostrophe indique un sens antihoraire.',
        },
      },
      {
        id: 'first-layer',
        slug: 'premiere-couche',
        title: 'Première couche',
        summary: 'Construisez votre première couche avec méthode simple et intention claire.',
        objectives: ['Former une croix', 'Placer les arêtes', 'Terminer la première couche'],
        keyTakeaways: ['La première couche repose sur la cohérence des couleurs', 'Chaque pièce doit être placée à sa bonne position', 'Le cube se résout plus facilement en étapes'],
        tips: ['Focalisez sur un seul objectif par étape', 'Ne vous pressez pas'],
        mistakes: ['Forcer les pièces', 'Changer de stratégie trop souvent'],
        videoLabel: 'Première couche',
        algorithms: [
          { title: 'Croix simple', notation: 'F U R U’ R’ F’', explanation: 'Une séquence classique pour positionner une arête au bon endroit.' },
        ],
        quiz: {
          question: 'Quel est l’objectif principal de la première couche ?',
          options: ['Créer la base stable du cube', 'Résoudre la dernière face', 'Échanger les centres'],
          answer: 'Créer la base stable du cube',
          explanation: 'La première couche crée une base solide pour les étapes suivantes.',
        },
      },
      {
        id: 'yellow-cross',
        slug: 'croix-jaune',
        title: 'Croix jaune',
        summary: 'Apprenez à orienter la dernière face pour obtenir une croix propre.',
        objectives: ['Orienter les arêtes du dessus', 'Repérer la forme finale', 'Éviter les erreurs d’orientation'],
        keyTakeaways: ['La croix jaune relève surtout de l’orientation', 'Le cube doit rester stable lors du mouvement', 'Chaque rotation doit être pensée'],
        tips: ['Travaillez face à face', 'Vérifiez la couleur à chaque étape'],
        mistakes: ['Perdre la structure précédente', 'Ignorer l’orientation'],
        videoLabel: 'Croix jaune',
        algorithms: [
          { title: 'Formation de croix', notation: 'F R U R’ U’ F’', explanation: 'Une séquence simple pour orienter un motif de croix.',
          },
        ],
        quiz: {
          question: 'Que cherchez-vous à obtenir avec la croix jaune ?',
          options: ['Une croix sur la face jaune', 'Une face blanche', 'Un cube complètement résolu'],
          answer: 'Une croix sur la face jaune',
          explanation: 'La croix jaune est une étape clé de l’orientation de la dernière face.',
        },
      },
    ],
  },
  {
    id: 'intermediate',
    slug: 'intermediaire',
    title: 'Intermédiaire',
    accent: 'from-sky-500/20 to-indigo-500/10',
    description: 'Passez à une résolution plus fluide avec F2L, OLL et PLL simplifiés.',
    chapters: [
      {
        id: 'f2l',
        slug: 'f2l',
        title: 'F2L',
        summary: 'Apprenez à résoudre deux couches en un seul mouvement fluide.',
        objectives: ['Former des paires coin-arête', 'Insérer les paires proprement', 'Réduire le nombre de mouvements'],
        keyTakeaways: ['F2L optimise la résolution', 'La logique de placement est essentielle', 'Une bonne paire réduit le temps de résolution'],
        tips: ['Visualisez la paire avant de l’insérer', 'Travaillez lentement puis augmentez la vitesse'],
        mistakes: ['Oublier la rotation de la face', 'Générer trop de mouvements inutiles'],
        videoLabel: 'F2L introductif',
        algorithms: [{ title: 'Insertion simple', notation: 'U R U’ R’', explanation: 'Une séquence courante pour insérer une paire déjà préparée.' }],
        quiz: {
          question: 'À quoi sert F2L ?',
          options: ['Résoudre les deux premières couches', 'Résoudre la dernière couche', 'Créer une croix jaune'],
          answer: 'Résoudre les deux premières couches',
          explanation: 'F2L permet de résoudre les deux premières couches plus efficacement.',
        },
      },
      {
        id: 'oll',
        slug: 'oll-simplifie',
        title: 'OLL simplifié',
        summary: 'Apprenez une version simplifiée de l’orientation de la dernière couche.',
        objectives: ['Orienter la dernière couche', 'Comprendre les cas fréquents', 'Gagner en fluidité'],
        keyTakeaways: ['OLL prépare la dernière couche', 'Quelques cas couvrent beaucoup de situations', 'L’orientation se résout souvent par répétition'],
        tips: ['Repérez la forme déjà présente', 'Ne changez pas de méthode au milieu d’un cas'],
        mistakes: ['Oublier de refaire la séquence', 'Confondre la face de référence'],
        videoLabel: 'OLL simplifié',
        algorithms: [{ title: 'Cas de base', notation: 'F R U R’ U’ F’', explanation: 'Une séquence utile pour orienter les derniers stickers de la dernière face.' }],
        quiz: {
          question: 'Quel objectif a OLL ?',
          options: ['Orienter la dernière couche', 'Placer les morceaux au bon endroit', 'Créer une croix', 'Créer la première couche'],
          answer: 'Orienter la dernière couche',
          explanation: 'OLL sert à orienter les pièces de la dernière couche.',
        },
      },
      {
        id: 'pll',
        slug: 'pll-simplifie',
        title: 'PLL simplifié',
        summary: 'Terminez la résolution avec une approche simple de permutation de la dernière couche.',
        objectives: ['Permuter les pièces de la dernière couche', 'Réduire les erreurs de placement', 'Construire une résolution plus stable'],
        keyTakeaways: ['PLL termine la résolution', 'Le placement est plus important que la vitesse au début', 'Une méthode répétée devient naturelle'],
        tips: ['Apprenez un cas à la fois', 'Vérifiez la position avant d’exécuter'],
        mistakes: ['Mélanger l’orientation et le placement', 'Exécuter une algorithme sans repère'],
        videoLabel: 'PLL simplifié',
        algorithms: [{ title: 'Permutation simple', notation: 'R U R’ U’ R’ F R2 U’ R’ U’ R U R’ F’', explanation: 'Une séquence classique pour permuter les coins de la dernière couche.' }],
        quiz: {
          question: 'Que fait PLL ?',
          options: ['Permute les pièces de la dernière couche', 'Oriente la croix', 'Crée la première couche'],
          answer: 'Permute les pièces de la dernière couche',
          explanation: 'PLL sert à permuter les pièces de la dernière couche à leur bonne place.',
        },
      },
    ],
  },
  {
    id: 'advanced',
    slug: 'avance',
    title: 'Avancé',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
    description: 'Perfectionnez votre technique avec une approche plus rapide et plus précise.',
    chapters: [
      {
        id: 'f2l-advanced',
        slug: 'f2l-avance',
        title: 'F2L avancé',
        summary: 'Passez de la compréhension simple à une exécution plus rapide et plus efficace.',
        objectives: ['Gérer des paires plus vite', 'Optimiser les mouvements', 'Rendre le solve plus fluide'],
        keyTakeaways: ['Le gain de temps vient de la fluidité', 'Les paires doivent être vues avant d’être exécutées', 'L’efficacité rend le solve plus propre'],
        tips: ['Préparez les paires avant de les insérer', 'Travaillez l’anticipation'],
        mistakes: ['Trop d’attente entre les mouvements', 'Mélanger les paires'],
        videoLabel: 'F2L avancé',
        algorithms: [{ title: 'Insertion rapide', notation: 'U’ R’ U R', explanation: 'Un mouvement court et efficace pour l’insertion de paire.' }],
        quiz: {
          question: 'Quel bénéfice apporte F2L avancé ?',
          options: ['Moins de mouvements et plus de fluidité', 'Plus de pièces à manipuler', 'Une face entièrement résolue'],
          answer: 'Moins de mouvements et plus de fluidité',
          explanation: 'L’objectif est de gagner en efficacité sur les deux premières couches.',
        },
      },
      {
        id: 'full-oll',
        slug: 'full-oll',
        title: 'Full OLL',
        summary: 'Approfondissez l’orientation de la dernière couche avec des cas plus complets.',
        objectives: ['Reconnaître davantage de cas', 'Construire des réflexes', 'Augmenter la cohérence'],
        keyTakeaways: ['La reconnaissance est la clé du speedcubing', 'Les cas fréquents sont les meilleurs à mémoriser', 'La répétition améliore la rapidité'],
        tips: ['Apprenez l’aspect visuel d’un cas', 'Mémorisez les schémas de base'],
        mistakes: ['Conserver une mauvaise orientation', 'Mélanger les cas complexes'],
        videoLabel: 'OLL complet',
        algorithms: [{ title: 'Cas courant', notation: 'R U R’ U R’ F’ R2 U’ R’ U’ R U R’ F', explanation: 'Un algorithme classique pour orienter complètement la dernière couche.' }],
        quiz: {
          question: 'Que pose Full OLL ?',
          options: ['Une orientation complète de la dernière couche', 'Une croix jaune', 'Une résolution complète'],
          answer: 'Une orientation complète de la dernière couche',
          explanation: 'Full OLL traite l’orientation complète de la dernière couche.',
        },
      },
    ],
  },
  {
    id: 'expert',
    slug: 'expert',
    title: 'Expert',
    accent: 'from-amber-500/20 to-orange-500/10',
    description: 'Approchez le speedcubing de haut niveau avec des méthodes avancées et des réflexes plus fins.',
    chapters: [
      {
        id: 'cfop',
        slug: 'cfop-complet',
        title: 'CFOP complet',
        summary: 'Maîtrisez la méthode la plus répandue en speedcubing.',
        objectives: ['Intégrer la logique complète de CFOP', 'Combiner Cross/F2L/OLL/PLL', 'Réduire les temps de résolution'],
        keyTakeaways: ['CFOP est totalement structuré', 'Chaque étape a sa logique propre', 'La fluidité vient de la répétition'],
        tips: ['Entraînez chaque étape séparément', 'Travaillez la transition entre les étapes'],
        mistakes: ['Essayer de tout faire en même temps', 'Ignorer la préparation'],
        videoLabel: 'CFOP complet',
        algorithms: [{ title: 'Structure de base', notation: 'Cross → F2L → OLL → PLL', explanation: 'CFOP structure la résolution autour de quatre grandes étapes.' }],
        quiz: {
          question: 'Quelles sont les quatre étapes majeures du CFOP ?',
          options: ['Cross, F2L, OLL, PLL', 'Cross, OLL, PLL, Roux', 'F2L, OLL, PLL, ZZ'],
          answer: 'Cross, F2L, OLL, PLL',
          explanation: 'CFOP se construit sur ces quatre grandes étapes.',
        },
      },
      {
        id: 'roux',
        slug: 'roux-method',
        title: 'Roux Method',
        summary: 'Explorez une méthode alternative qui privilégie la logique de blocs.',
        objectives: ['Comprendre la logique de blocs', 'Créer deux premiers blocs', 'Apprendre à penser différemment'],
        keyTakeaways: ['Roux privilégie la logique de blocs', 'Elle demande une autre façon de voir le cube', 'Elle peut devenir très efficace avec de la pratique'],
        tips: ['Apprenez la structure avant les algos', 'Gardez un regard global sur le cube'],
        mistakes: ['Confondre les blocs avec les couches'],
        videoLabel: 'Roux Method',
        algorithms: [{ title: 'Bloc de base', notation: 'M2 U M2 U2 M2 U M2', explanation: 'Une séquence utile pour la manipulation de blocs dans la méthode Roux.' }],
        quiz: {
          question: 'Quelle est la logique centrale de Roux ?',
          options: ['La construction de blocs', 'La croix sur la face blanche', 'La résolution complètement à deux mains'],
          answer: 'La construction de blocs',
          explanation: 'Roux repose sur la création de blocs et non sur une approche de couche classique.',
        },
      },
    ],
  },
];

export const allCourseChapters = courseLevels.flatMap((level) => level.chapters.map((chapter) => ({ levelSlug: level.slug, chapter })));

export function getLevelBySlug(slug: string) {
  return courseLevels.find((level) => level.slug === slug);
}

export function getChapterBySlug(levelSlug: string, chapterSlug: string) {
  const level = getLevelBySlug(levelSlug);
  if (!level) return null;
  return level.chapters.find((chapter) => chapter.slug === chapterSlug) ?? null;
}

export function getChapterNavigation(levelSlug: string, chapterSlug: string) {
  const level = getLevelBySlug(levelSlug);
  if (!level) return null;
  const currentIndex = level.chapters.findIndex((chapter) => chapter.slug === chapterSlug);
  if (currentIndex < 0) return null;
  return {
    previous: currentIndex > 0 ? level.chapters[currentIndex - 1] : null,
    next: currentIndex < level.chapters.length - 1 ? level.chapters[currentIndex + 1] : null,
  };
}

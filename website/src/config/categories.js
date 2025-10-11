export const CATEGORIES = {
  SAREES: 'sarees',
  LEHENGAS: 'lehengas', 
  KURTIS: 'kurtis',
  LATEST: 'latestcollection'
};

export const CATEGORY_CONFIG = {
  [CATEGORIES.SAREES]: {
    name: 'Sarees',
    icon: '🥻',
    route: '/sarees'
  },
  [CATEGORIES.LEHENGAS]: {
    name: 'Lehengas', 
    icon: '👗',
    route: '/lehengas'
  },
  [CATEGORIES.KURTIS]: {
    name: 'Kurtis',
    icon: '👚', 
    route: '/kurtis'
  },
  [CATEGORIES.LATEST]: {
    name: 'New Collection',
    icon: '✨',
    route: '/new-arrivals'
  }
};

export const getAllCategories = () => Object.values(CATEGORIES);
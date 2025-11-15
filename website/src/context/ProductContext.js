import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProductContext = createContext();

const initialState = {
  sarees: [],
  lehengas: [],
  kurtis: [],
  anarkalis: [],
  shararas: [],
  suits: [],
  latestCollection: [],
  loading: true,
  error: null
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PRODUCTS':
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchAllData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const [sareesRes, lehengasRes, kurtisRes, anarkalisRes, shararasRes, suitsRes, latestRes] = await Promise.all([
          fetch('/data/sarees.json'),
          fetch('/data/lehengas.json'),
          fetch('/data/kurtis.json'),
          fetch('/data/anarkalis.json'),
          fetch('/data/shararas.json'),
          fetch('/data/suits.json'),
          fetch('/data/latestcollection.json')
        ]);

        if (!sareesRes.ok || !lehengasRes.ok || !kurtisRes.ok || !anarkalisRes.ok || !shararasRes.ok || !suitsRes.ok || !latestRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [sarees, lehengas, kurtis, anarkalis, shararas, suits, latestRefs] = await Promise.all([
          sareesRes.json(),
          lehengasRes.json(),
          kurtisRes.json(),
          anarkalisRes.json(),
          shararasRes.json(),
          suitsRes.json(),
          latestRes.json()
        ]);

        // Resolve latest collection references
        const allProducts = { sarees, lehengas, kurtis, anarkalis, shararas, suits };
        const latestCollection = latestRefs.map(ref => {
          const categoryItems = allProducts[ref.category] || [];
          const item = categoryItems.find(item => item.id === ref.id);
          return item ? { ...item, category: ref.category } : null;
        }).filter(Boolean);

        dispatch({
          type: 'SET_PRODUCTS',
          payload: {
            sarees: sarees || [],
            lehengas: lehengas || [],
            kurtis: kurtis || [],
            anarkalis: anarkalis || [],
            shararas: shararas || [],
            suits: suits || [],
            latestCollection: latestCollection || []
          }
        });
      } catch (error) {
        console.error('Error loading product data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    fetchAllData();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
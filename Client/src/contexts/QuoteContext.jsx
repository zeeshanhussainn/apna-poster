import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabaseClient';

const QuoteContext = createContext();

export const useQuotes = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
};

export const QuoteProvider = ({ children }) => {
  const { currentLanguage } = useLanguage();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');

  const addQuote = (quote) => {
    setQuotes(prev => {
      if (prev.find(q => q.id === quote.id)) {
        return prev;
      }
      return [quote, ...prev].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    });
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('language', currentLanguage)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching quotes:', error);
          setQuotes([]);
        } else {
          setQuotes(data);
        }
      } catch (error) {
        console.error('Error in fetchQuotes:', error);
        setQuotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [currentLanguage]);

  useEffect(() => {
    const channel = supabase
      .channel('public:quotes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quotes' },
        (payload) => {
          if (payload.new && payload.new.language === currentLanguage) {
            addQuote(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentLanguage]);

  const filteredQuotes = useMemo(() => {
    let tempQuotes = quotes;
    
    if (selectedCategory !== 'all') {
      tempQuotes = tempQuotes.filter(quote => quote.category === selectedCategory);
    }

    if (selectedCategory === 'politics' && selectedSubCategory !== 'all') {
      tempQuotes = tempQuotes.filter(quote => quote.subcategory === selectedSubCategory);
    }
    
    return tempQuotes;
  }, [selectedCategory, selectedSubCategory, quotes]);

  const value = {
    quotes: filteredQuotes,
    loading,
    addQuote,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
};














// import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { supabase } from '@/lib/supabaseClient';
 
// const QuoteContext = createContext();
 
// export const useQuotes = () => {
//   const context = useContext(QuoteContext);
//   if (!context) {
//     throw new Error('useQuotes must be used within a QuoteProvider');
//   }
//   return context;
// };
 
// export const QuoteProvider = ({ children }) => {
//   const { currentLanguage } = useLanguage();

//   console.log('currentLanguage is', currentLanguage);
 
//   // QUOTES STATE
//   const [quotes, setQuotes] = useState([]);
//   const [loadingQuotes, setLoadingQuotes] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedSubCategory, setSelectedSubCategory] = useState('all');
 
//   // USER-CREATED QUOTES STATE
//   const [userQuotes, setUserQuotes] = useState([]);
//   const [loadingUserQuotes, setLoadingUserQuotes] = useState(true);
 
//   // QUOTES LOGIC
 
//   const addQuote = (quote) => {
//     setQuotes((prev) => {
//       if (prev.find((q) => q.id === quote.id)) {
//         return prev;
//       }
//       return [quote, ...prev].sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//     });
//   };
 
//   useEffect(() => {
//     const fetchQuotes = async () => {
//       setLoadingQuotes(true);
//       try {
//         const { data, error } = await supabase
//           .from('quotes')
//           .select('*')
//           .eq('language', currentLanguage)
//           .order('created_at', { ascending: false });
 
//         if (error) {
//           console.error('Error fetching quotes:', error);
//           setQuotes([]);
//         } else {
//           setQuotes(data);
//         }
//       } catch (error) {
//         console.error('Error in fetchQuotes:', error);
//         setQuotes([]);
//       } finally {
//         setLoadingQuotes(false);
//       }
//     };
 
//     fetchQuotes();
//   }, [currentLanguage]);
 
//   useEffect(() => {
//     const channel = supabase
//       .channel('public:quotes')
//       .on(
//         'postgres_changes',
//         { event: 'INSERT', schema: 'public', table: 'quotes' },
//         (payload) => {
//           if (payload.new && payload.new.language === currentLanguage) {
//             addQuote(payload.new);
//           }
//         }
//       )
//       .subscribe();
 
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [currentLanguage]);
 
//   const filteredQuotes = useMemo(() => {
//     let tempQuotes = quotes;
 
//     if (selectedCategory !== 'all') {
//       tempQuotes = tempQuotes.filter(
//         (quote) => quote.category === selectedCategory
//       );
//     }
 
//     if (selectedCategory === 'politics' && selectedSubCategory !== 'all') {
//       tempQuotes = tempQuotes.filter(
//         (quote) => quote.subcategory === selectedSubCategory
//       );
//     }
 
//     return tempQuotes;
//   }, [selectedCategory, selectedSubCategory, quotes]);
 
//   // USER-CREATED QUOTES LOGIC
 
//   const fetchUserQuotes = async () => {
//     setLoadingUserQuotes(true);
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         setUserQuotes([]);
//         return;
//       }
 
//       const { data, error } = await supabase
//         .from('user_created_quotes')
//         .select('*')
//         .eq('user_id', user.id)
//         .order('created_at', { ascending: false });
 
//       if (error) {
//         console.error('Error fetching user quotes:', error);
//         setUserQuotes([]);
//       } else {
//         setUserQuotes(data);
//       }
//     } catch (error) {
//       console.error('Error in fetchUserQuotes:', error);
//       setUserQuotes([]);
//     } finally {
//       setLoadingUserQuotes(false);
//     }
//   };
 
//   // Add a new user-created quote
//   const addUserQuote = async (text, category, subcategory) => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return { error: 'User not signed in' };
 
//     const { data, error } = await supabase
//       .from('user_created_quotes')
//       .insert({
//         user_id: user.id,
//         text,
//         category,
//         subcategory,
//       })
//       .select()
//       .single();
 
//     if (error) return { error: error.message };
 
//     setUserQuotes((prev) => [data, ...prev]);
//     return { success: true };
//   };
 
//   // Delete a user-created quote
//   const deleteUserQuote = async (quoteId) => {
//     try {
//       await supabase.from('user_created_quotes').delete().eq('id', quoteId);
//       setUserQuotes((prev) => prev.filter((q) => q.id !== quoteId));
//     } catch (error) {
//       console.error('Error deleting user quote:', error);
//     }
//   };
 
//   // Subscribe to realtime user-created quotes
//   useEffect(() => {
//     const channel = supabase
//       .channel('public:user_created_quotes')
//       .on(
//         'postgres_changes',
//         { event: 'INSERT', schema: 'public', table: 'user_created_quotes' },
//         (payload) => {
//           setUserQuotes((prev) => [payload.new, ...prev]);
//         }
//       )
//       .subscribe();
 
//     fetchUserQuotes();
 
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);
 
//   // PROVIDER VALUE
 
//   const value = {
//     // system quotes
//     quotes: filteredQuotes,
//     loadingQuotes,
//     addQuote,
//     selectedCategory,
//     setSelectedCategory,
//     selectedSubCategory,
//     setSelectedSubCategory,
 
//     // user-created quotes
//     userQuotes,
//     loadingUserQuotes,
//     fetchUserQuotes,
//     addUserQuote,
//     deleteUserQuote,
//   };
 
//   return (
//     <QuoteContext.Provider value={value}>
//       {children}
//     </QuoteContext.Provider>
//   );
// };


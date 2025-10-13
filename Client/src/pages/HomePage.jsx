// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet';
// import { Download, Share2 } from 'lucide-react';
// import { useQuotes } from '@/contexts/QuoteContext';
// import { Button } from '@/components/ui/button';
// import QuoteActionsModal from '@/components/modals/QuoteActionsModal';

// const SkeletonReel = () => (
//   <div className="h-full w-full relative flex items-center justify-center snap-start p-2">
//     <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
//       <div className="w-full h-full bg-slate-700 animate-pulse"></div>
//     </div>̥
//   </div>
// );

// const QuoteImageReel = ({ quote, onAction }) => {
//   return (
//     <motion.div
//       className="h-full w-full relative flex items-center justify-center snap-start p-2"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       layout
//     >
//       <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
//         <img
//           alt={`Inspirational poster on ${quote.category}`}
//           className="w-full h-full object-cover"
//           src={quote.image_url}
//           crossOrigin="anonymous"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//         <div className="absolute bottom-4 right-4 flex flex-col space-y-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => onAction(quote)}
//             className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
//           >
//             <Download className="w-6 h-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => onAction(quote)}
//             className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
//           >
//             <Share2 className="w-6 h-6" />
//           </Button>
//         </div>
//         <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white text-xs font-bold py-1 px-3 rounded-full capitalize">
//           {quote.category.replace(/_/g, ' ')}
//         </div>
//       </div>
//     </motion.div>
//   );
// };


// const HomePage = () => {
//   const { quotes, loading } = useQuotes();
//   const [selectedQuote, setSelectedQuote] = useState(null);

//   console.log('quotes from context', quotes);

//   const handleQuoteAction = (quote) => {
//     setSelectedQuote(quote);
//   };

//   return (
//     <div className="h-[calc(100vh-8rem)] w-screen overflow-hidden">
//       <Helmet>
//         <title>Apna Poster - Daily Inspiration</title>
//         <meta name="description" content="Discover and share daily inspirational posters." />
//       </Helmet>

//       <div className="h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar">
//         {loading ? (
//           [...Array(3)].map((_, i) => <SkeletonReel key={i} />)
//         ) : quotes.length === 0 ? (
//           <div className="h-full flex flex-col justify-center items-center text-center px-4">
//              <div className="glass-effect p-8 rounded-2xl max-w-md mx-auto">
//               <h3 className="text-2xl font-semibold text-white mb-2">No Images Found</h3>
//               <p className="text-slate-300">
//                 There are no images for this category or language yet. Try another one!
//               </p>
//             </div>
//           </div>
//         ) : (
//           quotes.map((quote) => (
//             <QuoteImageReel quote={quote} key={quote.id} onAction={handleQuoteAction} />
//           ))
//         )}
//       </div>

//       <QuoteActionsModal
//         open={!!selectedQuote}
//         onOpenChange={() => setSelectedQuote(null)}
//         quote={selectedQuote}
//       />
//     </div>
//   );
// };

// export default HomePage;











import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Download, Share2 } from 'lucide-react';
import { useQuotes } from '@/contexts/QuoteContext';
import { Button } from '@/components/ui/button';
import QuoteActionsModal from '@/components/modals/QuoteActionsModal';

import { useAuth } from '@/contexts/AuthContext'

const SkeletonReel = () => (
  <div className="h-full w-full relative flex items-center justify-center snap-start p-2 ">
    <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
      <div className="w-full h-full bg-slate-700 animate-pulse"></div>
    </div>̥
  </div>
);

// const QuoteImageReel = ({ quote, onAction, avatarUrl }) => {
//   return (
//     <motion.div
//       className="h-full w-full relative flex items-center justify-center snap-start p-2"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       layout
//     >
//       <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
//         <img
//           alt={`Inspirational poster on ${quote.category}`}
//           className="w-full h-full object-cover"
//           src={quote.image_url}
//           crossOrigin="anonymous"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />



//         {/* ✅ user avatar overlay */}
//         {avatarUrl && (
//           <img
//             src={avatarUrl}
//             alt="user avatar"
//             className="absolute bottom-4 left-10 w-30 h-40 rounded-full border-2 border-white shadow-md object-cover"
//           />
//         )}



//         <div className="absolute bottom-4 right-4 flex flex-col space-y-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => onAction(quote)}
//             className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
//           >
//             <Download className="w-6 h-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => onAction(quote)}
//             className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
//           >
//             <Share2 className="w-6 h-6" />
//           </Button>
//         </div>
//         <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white text-xs font-bold py-1 px-3 rounded-full capitalize">
//           {quote.category.replace(/_/g, ' ')}
//         </div>
//       </div>
//     </motion.div>
//   );
// };






// const QuoteImageReel = ({ quote, onAction, avatarUrl }) => {
//   return (
//     <motion.div
//       className="h-full w-full relative flex flex-col items-center justify-start snap-start p-2"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       layout
//     >
//       {/* Poster */}
//       <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
//         <img
//           alt={`Inspirational poster on ${quote.category}`}
//           className="w-full h-full object-cover"
//           src={quote.image_url}
//           crossOrigin="anonymous"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//         {/* ✅ avatar bottom-right */}
//         {avatarUrl && (
//           <img
//             src={avatarUrl}
//             alt="user avatar"
//             className="absolute bottom-4 right-4 w-30 h-40 rounded-full border-2 border-white shadow-md object-cover"
//           />
//         )}

//         {/* category tag */}
//         <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white text-xs font-bold py-1 px-3 rounded-full capitalize">
//           {quote.category.replace(/_/g, ' ')}
//         </div>
//       </div>

//       {/* ✅ buttons BELOW poster
//       <div className="mt-4 flex space-x-4 self-start">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => onAction(quote)}
//           className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
//         >
//           <Download className="w-6 h-6" />
//         </Button>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => onAction(quote)}
//           className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
//         >
//           <Share2 className="w-6 h-6" />
//         </Button>
//       </div> */}
//     </motion.div>
//   );
// };
















const QuoteImageReel = ({ quote, onAction, avatarUrl }) => {
  return (
    <motion.div
      className="h-full w-full relative flex items-center justify-center snap-start p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-800 my-2">
        <img
          alt={`Inspirational poster on ${quote.category}`}
          className="w-full h-full"
          src={quote.image_url}
          crossOrigin="anonymous"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* ✅ user avatar overlay – bottom-right */}
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="user avatar"
            className="absolute bottom-4 right-4 w-32 h-32 rounded-full shadow-md object-cover"
          />
        )}

        {/* ✅ action buttons – centered at bottom */}
        <div className="absolute bottom-4 left-0 w-full flex space-x-4 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAction(quote)}
            className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
          >
            <Download className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAction(quote)}
            className="text-white bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 hover:bg-white/20"
          >
            <Share2 className="w-6 h-6" />
          </Button>
        </div>

        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white text-xs font-bold py-1 px-3 rounded-full capitalize">
          {quote.category.replace(/_/g, ' ')}
        </div>
      </div>
    </motion.div>
  );
};












const HomePage = () => {
  const { quotes, loading } = useQuotes();

  const { user } = useAuth();

  const [selectedQuote, setSelectedQuote] = useState(null);

  console.log('quotes from context', quotes);

  const handleQuoteAction = (quote) => {
    setSelectedQuote(quote);
  };

  return (
    <div className="h-full w-screen overflow-hidden">
      <Helmet>
        <title>Apna Poster - Daily Inspiration</title>
        <meta name="description" content="Discover and share daily inspirational posters." />
      </Helmet>

      <div className="h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar pt-12">
        {loading ? (
          [...Array(3)].map((_, i) => <SkeletonReel key={i} />)
        ) : quotes.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center px-4">
            <div className="glass-effect p-8 rounded-2xl max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-2">No Images Found</h3>
              <p className="text-slate-300">
                There are no images for this category or language yet. Try another one!
              </p>
            </div>
          </div>
        ) : (
          quotes.map((quote) => (
            <QuoteImageReel quote={quote} key={quote.id} onAction={handleQuoteAction}
              // avatarUrl={
              //   user?.avatar_url ||
              //   `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || user?.email}`
              // }

              avatarUrl={
                user
                  ? (user.avatar_url ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`)
                  : null
              }
            />
          ))
        )}
      </div>

      <QuoteActionsModal
        open={!!selectedQuote}
        onOpenChange={() => setSelectedQuote(null)}
        quote={selectedQuote}
        // avatarUrl={
        //   user?.avatar_url ||
        //   `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || user?.email}`
        // }

                      avatarUrl={
                user
                  ? (user.avatar_url ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`)
                  : null
              }

      />
    </div>
  );
};

export default HomePage;
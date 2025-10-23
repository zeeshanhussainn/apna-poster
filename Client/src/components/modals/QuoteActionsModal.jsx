// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import * as htmlToImage from 'html-to-image';
// import { Download, Share2, RefreshCw, Trash2 } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
// import { toast } from '@/components/ui/use-toast';

// const QuoteActionsModal = ({ open, onOpenChange, quote, onDelete }) => {
//   const { user } = useAuth();
//   const imageRef = useRef(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const generateImage = async () => {
//     if (!imageRef.current) return null;
//     try {
//       const blob = await htmlToImage.toBlob(imageRef.current, {
//         quality: 0.98,
//         pixelRatio: 2,
//         cacheBust: true,
//       });
//       return blob;
//     } catch (error) {
//       console.error('Image generation failed:', error);
//       toast({ title: 'Error', description: 'Could not generate image. The background might be protected.', variant: 'destructive' });
//       return null;
//     }
//   };

//   const handleDownload = async () => {
//     setIsProcessing(true);
//     const blob = await generateImage();
//     if (blob) {
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = `apna-poster-${Date.now()}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       toast({ title: 'Downloaded!', description: 'Your poster has been saved.' });
//     }
//     setIsProcessing(false);
//   };

//   const handleShare = async () => {
//     setIsProcessing(true);
//     const blob = await generateImage();
//     if (blob && navigator.share) {
//       const file = new File([blob], `apna-poster-${Date.now()}.png`, { type: 'image/png' });
//       try {
//         await navigator.share({
//           title: 'Apna Poster',
//           text: 'Check out this poster I made!',
//           files: [file],
//         });
//         toast({ title: 'Shared!', description: 'Your poster has been shared.' });
//       } catch (error) {
//         if (error.name !== 'AbortError') {
//           toast({ title: 'Share Failed', description: 'Could not share the poster.', variant: 'destructive' });
//         }
//       }
//     } else if (blob) {
//       toast({ title: 'Share Not Supported', description: 'Your browser does not support sharing files directly. Please download and share manually.', variant: 'destructive' });
//     }
//     setIsProcessing(false);
//   };

//   const handleConfirmDelete = async () => {
//     if (!onDelete) return;
//     setIsDeleting(true);
//     await onDelete(quote);
//     setIsDeleting(false);
//   };

//   if (!quote) return null;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Share or Download</DialogTitle>
//         </DialogHeader>
//         <div className="py-4 flex justify-center">

//                    {/* ✅ user avatar overlay */}
//         {avatarUrl && (
//           <img
//             src={avatarUrl}
//             alt="user avatar"
//             className="absolute bottom-4 left-10 w-30 h-40 rounded-full border-2 border-white shadow-md object-cover"
//           />
//         )}

//           <motion.div
//             ref={imageRef}
//             className="relative w-full max-w-xs aspect-[4/5] rounded-lg overflow-hidden"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <img src={quote.image_url} alt="User created poster" className="w-full h-full object-cover" crossOrigin="anonymous" />
//             {user?.is_premium && (
//               <div className="absolute bottom-2 right-2 z-10 flex items-center space-x-2 bg-black/40 backdrop-blur-sm p-1.5 rounded-md">
//                 {user.avatar_url && <img src={user.avatar_url} alt={user.name || 'User avatar'} className="w-5 h-5 rounded-full" crossOrigin="anonymous" />}
//                 <span className="text-white text-[10px] font-bold">{user.name}</span>
//               </div>
//             )}
//           </motion.div>
//         </div>
//         <DialogFooter className="flex flex-col gap-2">
//           <Button onClick={handleDownload} disabled={isProcessing || isDeleting} variant="outline" className="w-full">
//             {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
//             Download
//           </Button>
//           <Button onClick={handleShare} disabled={isProcessing || isDeleting} className="w-full bg-custom-blue hover:bg-blue-600">
//             {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Share2 className="w-4 h-4 mr-2" />}
//             Share
//           </Button>
//           {onDelete && (
//              <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" className="w-full" disabled={isProcessing || isDeleting}>
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     This action cannot be undone. This will permanently delete your creation.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
//                     {isDeleting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : 'Continue'}
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default QuoteActionsModal;

















import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as htmlToImage from 'html-to-image';
import { Download, Share2, RefreshCw, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';

// ✅ added avatarUrl prop
const QuoteActionsModal = ({ open, onOpenChange, quote, onDelete, avatarUrl }) => {
  const { user } = useAuth();
  const imageRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const generateImage = async () => {
    if (!imageRef.current) return null;
    try {
      const blob = await htmlToImage.toBlob(imageRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        cacheBust: true,
      });
      return blob;
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        title: 'Error',
        description: 'Could not generate image. The background might be protected.',
        variant: 'destructive'
      });
      return null;
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    const blob = await generateImage();
    if (blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `apna-poster-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: 'Downloaded!', description: 'Your poster has been saved.' });
    }
    setIsProcessing(false);
  };

  const handleShare = async () => {
    setIsProcessing(true);
    const blob = await generateImage();
    if (blob && navigator.share) {
      const file = new File([blob], `apna-poster-${Date.now()}.png`, { type: 'image/png' });
      try {
        await navigator.share({
          title: 'Apna Poster',
          text: 'Check out this poster I made!',
          files: [file],
        });
        toast({ title: 'Shared!', description: 'Your poster has been shared.' });
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast({
            title: 'Share Failed',
            description: 'Could not share the poster.',
            variant: 'destructive'
          });
        }
      }
    } else if (blob) {
      toast({
        title: 'Share Not Supported',
        description: 'Your browser does not support sharing files directly. Please download and share manually.',
        variant: 'destructive'
      });
    }
    setIsProcessing(false);
  };

  const handleConfirmDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    await onDelete(quote);
    setIsDeleting(false);
  };

  if (!quote) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share or Download</DialogTitle>
        </DialogHeader>
        <div className="py-1 flex justify-center">
          <motion.div
            ref={imageRef}
            className="relative w-full max-w-xs aspect-[3/4] rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <img
              src={quote.image_url}
              alt="User created poster"
              className="w-full h-full"
              crossOrigin="anonymous"
            />



            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="user avatar"
                className="absolute bottom-4 right-4 w-30 h-40 rounded-full shadow-md object-cover"
              />
            )}


            {user?.is_premium && (
              <div className="absolute bottom-2 right-2 z-10 flex items-center space-x-2 bg-black/40 backdrop-blur-sm p-1.5 rounded-md">
                {user.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name || 'User avatar'}
                    className="w-5 h-5 rounded-full"
                    crossOrigin="anonymous"
                  />
                )}
                <span className="text-white text-[10px] font-bold">{user.name}</span>
              </div>
            )}
          </motion.div>
        </div>
        <DialogFooter className="flex flex-col gap-2">
          <Button onClick={handleDownload} disabled={isProcessing || isDeleting} variant="outline" className="w-full">
            {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Download
          </Button>
          <Button onClick={handleShare} disabled={isProcessing || isDeleting} className="w-full bg-custom-blue hover:bg-blue-600">
            {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Share2 className="w-4 h-4 mr-2" />}
            Share
          </Button>
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full" disabled={isProcessing || isDeleting}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your creation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : 'Continue'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteActionsModal;

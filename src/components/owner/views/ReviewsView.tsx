import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { INITIAL_REVIEWS } from '../../../data/mockData';
import { Star, MessageSquare, Send, ThumbsUp } from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const { activeRestaurant, addToast } = useApp();
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  if (!activeRestaurant) return null;

  const handleSendReply = (reviewId: string) => {
    const text = replyText[reviewId];
    if (!text?.trim()) return;

    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, response: text } : r))
    );

    setReplyText((prev) => ({ ...prev, [reviewId]: '' }));

    addToast({
      type: 'success',
      title: 'Response Published',
      message: 'Owner response posted to customer review.',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Rating Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-amber-500 text-white text-center shrink-0 shadow-md shadow-amber-500/20">
            <span className="block text-2xl font-black leading-none">{activeRestaurant.rating}</span>
            <span className="text-[10px] font-bold tracking-wide">OUT OF 5</span>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              Customer Experience & Reviews
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Based on {activeRestaurant.reviewCount} verified guest reviews for {activeRestaurant.name}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
          <span>★★★★★ 5-Star Average Rating</span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-slate-100">
                  {rev.author}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <span>{'★'.repeat(rev.rating)}</span>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              "{rev.comment}"
            </p>

            {/* Published Owner Response */}
            {rev.response ? (
              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200/60 dark:border-blue-900/60 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Official Owner Response:
                </div>
                <p className="text-slate-700 dark:text-slate-300">{rev.response}</p>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText[rev.id] || ''}
                  onChange={(e) =>
                    setReplyText((prev) => ({ ...prev, [rev.id]: e.target.value }))
                  }
                  placeholder="Write a public owner reply to this review..."
                  className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSendReply(rev.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
                >
                  <Send className="w-3 h-3" /> Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

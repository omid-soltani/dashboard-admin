import { dateHandler } from "../utile/utile.js";

const patternOfAllComments = (comment) => {
  return `
    <tr class="tr-row comment-row transition-all duration-300 hover:bg-neon-500/5">
        <td class="px-4 sm:px-5 py-3.5" data-cell="user">
            <div class="flex items-center gap-3 min-w-0">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Nima" class="w-9 h-9 rounded-full ring-2 ring-neon-500/20 shrink-0" alt="Avatar">
                <div class="min-w-0">
                    <p class="text-xs md:text-sm font-inter-medium text-ink-light dark:text-ink-dark truncate" data-cell="name">${comment.userId.userName}</p>
                    <p class="text-[10px] md:text-xs text-ink-light/45 dark:text-ink-dark/45 truncate" data-cell="product">On:${comment.productId.title}</p>
                </div>
            </div>
        </td>
        <td class="hidden sm:table-cell px-5 py-3.5 max-w-70" data-cell="comment">
            <p class="text-sm text-ink-light/70 dark:text-ink-dark/70 truncate">
                ${comment.text}
            </p>
        </td>
        <td class="px-4 sm:px-5 py-3.5" data-cell="status">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium text-neon-600 dark:text-neon-400 bg-neon-500/10 px-2.5 py-1 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-neon-500"></span>
                ${comment.status}
            </span>
        </td>
        <td class="hidden sm:table-cell px-5 py-3.5" data-cell="replied">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium text-neon-600 dark:text-neon-400 bg-neon-500/10 px-2.5 py-1 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-neon-500"></span>
                ${comment.replied ? "replied" : "not replied"}
            </span>
        </td>
        <td class="hidden sm:table-cell px-5 py-3.5 text-sm text-ink-light/70 dark:text-ink-dark/70 tabular" data-cell="date">${new Date(comment.createdAt).toLocaleDateString("en-US")}</td>
        <td class="px-4 sm:px-5 py-3.5">
            <div class="flex items-center justify-end">
                <div class="actions-default flex items-center gap-1">
                    <button type="button" data-action="view-details" title="Comment details" class="sm:hidden w-9 h-9 grid place-items-center rounded-lg
    text-ink-light/60 dark:text-ink-dark/60
    hover:bg-neon-500/10 hover:text-neon-600 dark:hover:text-neon-400
    transition-all duration-200 active:scale-90">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button onclick="openReplyCommentModal('${comment._id}')" type="button" data-action="reply" title="Reply to comment" class="w-9 h-9 grid place-items-center rounded-lg
    text-ink-light/60 dark:text-ink-dark/60
    hover:bg-neon-500/10 hover:text-neon-600 dark:hover:text-neon-400
    transition-all duration-200 active:scale-90">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                    <button data-isBan = ${comment.ban ? 0 : 1} onclick = "banCommentUser(event,'${comment._id}')" type="button" data-action="request-ban" title="Ban comment" class="w-9 h-9 grid place-items-center rounded-lg
    text-ink-light/60 dark:text-ink-dark/60
    hover:bg-amber-500/10 hover:text-amber-500
    transition-all duration-200 active:scale-90">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        </svg>
                    </button>
                    <button type="button" data-action="request-delete" title="Delete comment" class="w-9 h-9 grid place-items-center rounded-lg
    text-ink-light/60 dark:text-ink-dark/60
    hover:bg-red-500/10 hover:text-red-500
    transition-all duration-200 active:scale-90">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"></path>
                            <path d="M10 11v6M14 11v6"></path>
                        </svg>
                    </button>
                </div> 
            </div>
        </td>
    </tr>
    `;
};

const patternOfRecentComment = (comment) => {
  return `<li class="py-2.5 sm:py-3 flex items-center justify-between gap-3 group cursor-pointer">
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Nima" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-neon-500/20 shrink-0" alt="Avatar">
            <div class="min-w-0">
                <p class="font-inter-medium text-xs sm:text-sm text-ink-light dark:text-ink-dark truncate group-hover:text-neon-600 dark:group-hover:text-neon-400 transition-colors">
                    ${comment.userId.userName}
                </p>
                <p class="font-inter-regular text-[11px] sm:text-xs text-ink-light/45 dark:text-ink-dark/45 truncate">
                    ${comment.text}
                </p>
            </div>
        </div>
        <span class="font-inter-regular text-[10px] sm:text-xs text-neon-600 dark:text-neon-400 shrink-0 tabular bg-neon-500/10 px-2 py-0.5 rounded-full">
            ${dateHandler(comment.createdAt)}
        </span>
    </li>
    `;
};

const patternOfBanComments = (comment) => {
  return `
    <li class="li-row py-2.5 sm:py-3 flex items-center justify-between gap-3 group cursor-pointer">
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:scale-105 transition-transform duration-200">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="4.9" y1="4.9" x2="19.1" y2="19.1"></line>
                </svg>
            </div>
            <div class="min-w-0">
                <p class="font-inter-medium text-xs sm:text-sm text-ink-light dark:text-ink-dark truncate group-hover:text-neon-600 dark:group-hover:text-neon-400 transition-colors">
                    ${comment.userId.userName}
                </p>
                <p class="font-inter-regular text-[11px] sm:text-xs text-ink-light/45 dark:text-ink-dark/45 truncate">
                    On: ${comment.productId.title}
                </p>
            </div>
        </div>
        <span class="font-inter-bold text-[11px] sm:text-xs text-red-500 tabular shrink-0 bg-red-500/10 px-2 py-0.5 rounded-full">
            ? reports
        </span>
    </li>
    `;
};

export { patternOfAllComments, patternOfRecentComment, patternOfBanComments };

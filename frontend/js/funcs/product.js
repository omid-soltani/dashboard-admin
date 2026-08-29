const patternAllProduct = (product) => {
  return `
    <tr class="tr-row product-row transition-all duration-300 hover:bg-neon-500/5">
        <td class="px-4 sm:px-5 py-3 md:py-3.5" data-cell="name">
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-linear-to-br from-neon-400/20 to-neon-700/20 dark:from-neon-400/10 dark:to-neon-700/10 grid place-items-center shrink-0">
                    <svg class="size-3.5 md:size-4.5 text-neon-600 dark:text-neon-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="7" width="18" height="13" rx="2"></rect>
                        <path d="M8 7V5a4 4 0 0 1 8 0v2"></path>
                    </svg>
                </div>
                <div class="min-w-0">
                    <p class="text-xs md:text-sm font-inter-medium text-ink-light dark:text-ink-dark truncate">
                         ${product.title}</p>
                    <p class="text-[10px] md:text-xs text-ink-light/45 dark:text-ink-dark/45" data-cell="sku">
                        ${product.shortID}</p>
                </div>
            </div>
        </td>
        <td class="hidden sm:table-cell px-5 py-3.5 text-sm text-ink-light/70 dark:text-ink-dark/70" data-cell="category">${product.category}</td>
        <td class="px-3 sm:px-5 py-3 md:py-3.5 text-[11px] md:text-sm font-inter-medium text-ink-light dark:text-ink-dark tabular" data-cell="price">${product.price}</td>
        <td class="hidden sm:table-cell px-5 py-3.5 text-sm text-ink-light/70 dark:text-ink-dark/70 tabular" data-cell="stock">${product.stock}</td>
        <td class="hidden sm:table-cell px-5 py-3.5" data-cell="status">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium text-neon-600 dark:text-neon-400 bg-neon-500/10 px-2.5 py-1 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-neon-500"></span>
                In Stock
            </span>
        </td>
        <td class="px-3 sm:px-5 py-3 md:py-3.5">
            <div class="flex items-center justify-center">
                <div class="actions-default flex items-center gap-1">
                    <button onclick="showDetailProduct('${product._id}')" type="button" data-action="view-details" title="Product details" class="sm:hidden btn
    
    hover:bg-neon-500/10 hover:text-neon-600 dark:hover:text-neon-400
    ">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button onclick="editModalOpen('${product._id}')" type="button" data-action="edit" title="Edit product" class="btn
    
    hover:bg-neon-500/10 hover:text-neon-600 dark:hover:text-neon-400
    ">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button onclick ="removeProductHandler('${product._id}')" type="button" data-action="request-delete" title="Delete product" class="btn
    hover:bg-red-500/10 hover:text-red-500
    ">
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

const patternLowStockProducts = (product) => {
  return `
    <li class="li-row py-2.5 sm:py-3 flex items-center justify-between gap-3 group cursor-pointer">
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.4 14.5 16 10 4 20"></path>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <path d="M20 4 4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                </svg>
            </div>
            <div class="min-w-0">
                <p class="font-inter-medium text-xs sm:text-sm text-ink-light dark:text-ink-dark truncate group-hover:text-neon-600 dark:group-hover:text-neon-400 transition-colors">
                     ${product.title}
                </p>
                <p class="font-inter-regular text-[11px] sm:text-xs text-ink-light/45 dark:text-ink-dark/45 tabular">
                    ${product.shortID}
                </p>
            </div>
        </div>
        <span class="font-inter-bold text-[11px] sm:text-xs text-amber-500 tabular shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-full">
            ${product.stock} left
        </span>
    </li>    `;
};

const patternTopSellerProducts = (product) => {
  return `<li class="li-row py-2.5 sm:py-3 flex items-center justify-between gap-3 group cursor-pointer">
            <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div
                    class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neon-500/10 dark:bg-neon-400/10 flex items-center justify-center shrink-0 border border-neon-500/20 group-hover:scale-105 transition-transform duration-200">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-neon-600 dark:text-neon-400"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="3" />
                        <circle cx="9" cy="9" r="1.5" />
                        <path d="m5 17 4-4 3 3 5-6 3 4" />
                    </svg>
                </div>
                <div class="min-w-0">
                    <p
                        class="font-inter-medium text-xs sm:text-sm text-ink-light dark:text-ink-dark truncate group-hover:text-neon-600 dark:group-hover:text-neon-400 transition-colors">
                       ${product.title}
                    </p>
                    <p
                        class="font-inter-regular text-[11px] sm:text-xs text-ink-light/45 dark:text-ink-dark/45 tabular">
                        ${product.sale} sold
                    </p>
                </div>
            </div>
            <span
                class="font-inter-bold text-[11px] sm:text-xs text-neon-600 dark:text-neon-400 tabular shrink-0">
                ${product.price} $
            </span>
        </li>`;
};

export { patternAllProduct, patternLowStockProducts, patternTopSellerProducts };

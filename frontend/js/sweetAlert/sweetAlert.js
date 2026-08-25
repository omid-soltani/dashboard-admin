const customClasses = {
  popup:
    "w-[92vw] sm:w-auto sm:max-w-sm rounded-2xl p-1 sm:p-2 " +
    "bg-white dark:bg-surface-dark-2! " +
    "border border-neon-500/10 dark:border-neon-400/10 " +
    "shadow-2xl shadow-neon-500/10 font-inter-regular",
  title:
    "font-inter-semibold text-[15px] sm:text-base text-ink-light dark:text-white/90! pt-3",
  htmlContainer: "text-xs sm:text-sm text-ink-light/55 dark:text-ink-dark/55",
  icon: "border-neon-500/30 text-neon-500 my-3",
  actions:
    "flex items-center gap-2.5 sm:gap-3 w-full px-4 sm:px-5 pb-4 sm:pb-5 pt-2",
  confirmButton:
    "h-10 sm:h-11 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-medium bg-neon-500 " +
    "dark:text-white/90! text-white! " +
    "border border-neon-500/10 dark:border-neon-400/10 " +
    "hover:bg-neon-600 transition-colors duration-200 ",
  cancelButton:
    "flex-1 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-medium  dark:text-white/90! text-white! px-3.5 sm:px-4 " +
    "bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all duration-200 ",
};

const SweetAlert = (
  title,
  icon,
  showCancel = false,
  showConfirm = true,
  confirmText = "ok",
  cancelText = "try again !!",
  func = (res) => {},
) => {
  Swal.fire({
    title,
    icon,
    showCancelButton: showCancel,
    showConfirmButton: showConfirm,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    buttonsStyling: false, // let Tailwind fully control button look
    focusConfirm: false,
    customClass: customClasses,
  }).then(func);
};

export { SweetAlert };

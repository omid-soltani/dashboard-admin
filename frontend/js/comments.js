import {
  getBanCommentApi,
  getCommentsApi,
  getNewCommentApi,
  getOneCommentApi,
  replyCommentApi,
  banCommentApi,
} from "./api/comment.js";
import {
  openModal,
  closeModal,
  addItemsInfoToDom,
  changePagination,
  setUrlSearchParam,
  paginationNextAndPrevHandler,
  searchHand,
  debounce,
} from "./utile/utile.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";
import {
  patternOfAllComments,
  patternOfBanComments,
  patternOfRecentComment,
} from "./funcs/comments.js";

const d = document;

let commentId = null;
let comments = [];
let searchValue = "";
// wrapper for comments
const allCommentsWrapper = d.getElementById("comments-tbody");
const recentCommentWrapper = d.getElementById("recent-comment-wrapper");
const banCommentWrapper = d.getElementById("ban-comment-wrapper");

const modalCloseBtn = d.querySelectorAll(".modal-close-btn");

const allCommentsNum = d.querySelectorAll(".all-comments-num");

// reply comment modal
const replyCommentModal = d.getElementById("reply-comment-modal");
const commentText = d.getElementById("rc-text");
const commentReplyText = d.getElementById("rc-textarea");
const replyBtn = d.getElementById("reply-comment-btn");
const replyTextCount = d.getElementById("rc-count");

// pagination tag
const paginationWrapper = d.getElementById("pagination-wrapper");

// searchInput
const commentSearchInput = d.getElementById("comment-search");

const allCommentsNumHandler = (value) => {
  allCommentsNum.forEach((commentNum) => {
    commentNum.textContent = value;
  });
};

const pageBtns = d.querySelectorAll(".page-btn");

const renderComments = async () => {
  try {
    const [resBanComment, resComment, resNewComment] = await Promise.all([
      getBanCommentApi(),
      getCommentsApi(),
      getNewCommentApi(),
    ]);
    if (!resBanComment.ok || !resComment.ok || !resNewComment.ok) {
      throw new Error("Failed to fetch Comments");
    }

    const banComment = await resBanComment.json();
    comments = await resComment.json();
    const newComment = await resNewComment.json();
    setUrlSearchParam("page", 1);
    allCommentsNumHandler(comments.data.length);

    addItemsInfoToDom(
      comments.data,
      allCommentsWrapper,
      patternOfAllComments,
      true,
    );
    addItemsInfoToDom(
      newComment.data,
      recentCommentWrapper,
      patternOfRecentComment,
    );
    addItemsInfoToDom(banComment.data, banCommentWrapper, patternOfBanComments);
  } catch (err) {
    SweetAlert(err.message, "error");
  }
};

const openReplyCommentModal = async (id) => {
  openModal(replyCommentModal);
  commentId = id;
  const res = await getOneCommentApi(id);
  const comment = await res.json();
  replyTextCount.textContent = comment.data.replyText.length;
  commentText.textContent = comment.data.text;
  commentReplyText.value = comment.data.replyText;
};
window.openReplyCommentModal = openReplyCommentModal;

const banCommentUser = (event, id) => {
  let isBan = +event.currentTarget.dataset.isban;
  SweetAlert(
    isBan
      ? "Are you sure about the comment UnBan?"
      : "Are you sure about the comment Ban?",
    "warning",
    true,
    true,
    "ok",
    "not Sure",
    async (res) => {
      if (res.isConfirmed) {
        const res = await banCommentApi(id, isBan);
        const result = await res.json();
        console.log(result);
        if (!res.ok) {
          throw new Error(result.message);
        }
        SweetAlert(
          isBan ? "Comment unBan was successful" : "Comment ban was successful",
          "success",
        );

        renderComments();
      }
    },
  );
  event.currentTarget.dataset.isban = !isBan;
};
window.banCommentUser = banCommentUser;

const replyCommentHandler = async () => {
  const replyText = commentReplyText.value.trim();
  try {
    const res = await replyCommentApi(commentId, replyText);
    const result = await res.json();
    console.log(result);
    if (!res.ok) {
      throw new Error(result.message);
    }
    SweetAlert("Comment reply was successful.", "success");
    closeModal(replyCommentModal);
    renderComments();
  } catch (err) {
    renderComments();
    SweetAlert(err.message, "error");
  }
};

const countTextAreaHand = (target) => {
  replyTextCount.textContent = target.length;
};

window.addEventListener("load", () => {
  renderComments();
});

modalCloseBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    closeModal(e);
  });
});

replyBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await replyCommentHandler();
});

commentReplyText.addEventListener("keyup", (e) => {
  countTextAreaHand(e.target.value);
});

paginationWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-link-btn")) {
    const page = +e.target.dataset.page;
    changePagination(
      page,
      comments.data.slice(),
      "text",
      searchValue,
      allCommentsWrapper,
      patternOfAllComments,
    );
  }
});

pageBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const type = e.currentTarget.dataset.type;
    paginationNextAndPrevHandler(
      type,
      comments.data,
      "text",
      searchValue,
      allCommentsWrapper,
      patternOfAllComments,
    );
  });
});

commentSearchInput.addEventListener("keyup", (e) => {
  searchValue = e.currentTarget.value;
  setUrlSearchParam("page", 1);

  debounce(async () => {
    const searchComments = searchHand(
      comments.data.slice(),
      "text",
      searchValue,
    );

    addItemsInfoToDom(
      searchComments,
      allCommentsWrapper,
      patternOfAllComments,
      true,
    );
  })();
});

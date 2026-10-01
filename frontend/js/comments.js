import {
  getBanComment,
  getComments,
  getNewComment,
  getOneCommentApi,
  replyCommentApi,
  banCommentApi,
} from "./api/comment.js";
import { openModal, closeModal } from "./utile/utile.js";
import { SweetAlert } from "./sweetAlert/sweetAlert.js";
import {
  patternOfAllComments,
  patternOfBanComments,
  patternOfRecentComment,
} from "./funcs/comments.js";

const d = document;

let commentId = null;

// wrapper for comments
const commentsAllWrapper = d.getElementById("comments-tbody");
const recentCommentWrapper = d.getElementById("recent-comment-wrapper");
const banCommentWrapper = d.getElementById("ban-comment-wrapper");

const modalCloseBtn = d.querySelectorAll(".modal-close-btn");

// reply comment modal
const replyCommentModal = d.getElementById("reply-comment-modal");
const commentText = d.getElementById("rc-text");
const commentReplyText = d.getElementById("rc-textarea");
const replyBtn = d.getElementById("reply-comment-btn");
const replyTextCount = d.getElementById("rc-count");

const renderComments = async () => {
  try {
    const [resBanComment, resComment, resNewComment] = await Promise.all([
      getBanComment(),
      getComments(),
      getNewComment(),
    ]);
    if (!resBanComment.ok || !resComment.ok || !resNewComment.ok) {
      throw new Error("Failed to fetch Comments");
    }

    const banComment = await resBanComment.json();
    const comments = await resComment.json();
    const newComment = await resNewComment.json();

    commentsAllWrapper.innerHTML = "";
    comments.data.forEach((comment) => {
      commentsAllWrapper.insertAdjacentHTML(
        "beforeend",
        patternOfAllComments(comment),
      );
    });

    banCommentWrapper.innerHTML = "";
    banComment.data.forEach((comment) => {
      banCommentWrapper.insertAdjacentHTML(
        "beforeend",
        patternOfBanComments(comment),
      );
    });

    recentCommentWrapper.innerHTML = "";
    newComment.data.forEach((comment) => {
      recentCommentWrapper.insertAdjacentHTML(
        "beforeend",
        patternOfRecentComment(comment),
      );
    });
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

const countTextAreaHand = (targe) => {
  replyTextCount.textContent = targe.length;
};

window.addEventListener("load", () => {
  renderComments();
});

modalCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(replyCommentModal);
  });
});

replyBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await replyCommentHandler();
});

commentReplyText.addEventListener("keyup", (e) => {
  countTextAreaHand(e.target.value);
});

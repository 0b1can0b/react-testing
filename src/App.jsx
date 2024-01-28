import "./Reset.css";
import "./App.scss";
// import * as tempCricData from "./cric.json";
import { useEffect, useState } from "react";
import $ from "jquery";

function timeAgo(input) {
  var seconds = Math.floor((new Date() - input) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? Math.floor(interval) + " month" : Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? Math.floor(interval) + " day" : Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? Math.floor(interval) + " hour" : Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? Math.floor(interval) + " minute" : Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) === 1 ? Math.floor(seconds) + " second" : Math.floor(seconds) + " seconds";
}
// function timeAgo(input) {
//   const date = input instanceof Date ? input : new Date(input);
//   const formatter = new Intl.RelativeTimeFormat("en");
//   const ranges = {
//     years: 3600 * 24 * 365,
//     months: 3600 * 24 * 30,
//     weeks: 3600 * 24 * 7,
//     days: 3600 * 24,
//     hours: 3600,
//     minutes: 60,
//     seconds: 1,
//   };
//   const secondsElapsed = (date.getTime() - Date.now()) / 1000;
//   for (let key in ranges) {
//     if (ranges[key] < Math.abs(secondsElapsed)) {
//       const delta = secondsElapsed / ranges[key];
//       return formatter.format(Math.round(delta), key);
//     }
//   }
// }

const RedditIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
      <path fill="currentColor" d="M373 138.6c-25.2 0-46.3-17.5-51.9-41c-30.6 4.3-54.2 30.7-54.2 62.4v.2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4c-25.4-11.9-43-37.7-43-67.7C0 214.4 33.4 181 74.7 181c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4v-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3M157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9.4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4"></path>
    </svg>
  );
};

console.clear();

const Comment = ({ commentData, commentDepth }) => {
  const onClick = (onClickEvent) => {
    if (onClickEvent.altKey) {
      console.log(commentData);
    }
  };
  return (
    <div className={commentData.IsNew ? "comment-container is-new" : "comment-container"} style={{ "--m": commentDepth }}>
      <div className="comment-container-inner">
        <div className="comment" onClick={onClick}>
          <div className="left"></div>
          <div className="right">
            <div className="header">
              <div className="user">
                <div className="name">{commentData.data.author}</div>
                {commentData.data.author_flair_richtext?.length > 0 ? (
                  <div className="flair">
                    {commentData.data.author_flair_richtext.map((e, i) => {
                      return e.t !== " " ? (
                        <div className="flair-item" key={i}>
                          {e.u ? <img src={e.u} alt={e.u} /> : e.t}
                        </div>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {commentData.data.replies?.data?.children.length > 0 ? (
                <div className="replies-count">
                  {commentData.data.replies.data.children.length} {commentData.data.replies.data.children.length === 1 ? "Reply" : "Replies"}
                </div>
              ) : (
                ""
              )}
              <div className="voting">
                <div className="upvote"></div>
                <div className="score">
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                  }).format(commentData.data.score)}
                </div>
                <div className="downvote"></div>
              </div>
              <div className="created">
                <div className="origial">{timeAgo(commentData.data.created * 1000)}</div>
                {commentData.data.edited ? <div className="edited">(edited: {timeAgo(commentData.data.edited * 1000)})</div> : ""}
              </div>
              <a href={"https://www.reddit.com/" + commentData.data.permalink} target="_blank" className="open-in-reddit">
                <RedditIcon />
              </a>
            </div>
            <div className="body" dangerouslySetInnerHTML={{ __html: commentData.data.body_html }}></div>
          </div>
        </div>
        {commentData.data.replies ? (
          <div className="replies">
            {commentData.data.replies.data.children.map((reply, replyIndex) =>
              reply.kind === "t1" ? (
                <Comment key={replyIndex} commentData={reply} commentDepth={commentDepth + 1} />
              ) : reply.kind === "more" ? (
                <div key={replyIndex} className="more-replies">
                  MORE REPLIES
                </div>
              ) : (
                ""
              )
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    // console.log("GETTING COMMENTS");
    fetch("https://www.reddit.com/r/Cricket/comments/1acslkm/match_thread_1st_test_england_vs_india_day_4/.json?raw_json=1&limit=500", { cache: "no-store" })
      .then((response) => response.json())
      .then((json) => {
        setComments((prev) => {
          const tempComments = json
            .at(1)
            .data.children.reverse()
            .filter((tempComment) => {
              return !prev.map((comment) => comment.data.id).includes(tempComment.data.id);
            })
            .filter((tempComment) => tempComment.kind === "t1")
            .map((e) => {
              return { ...e, IsNew: true };
            });
          const tempPrev = prev.map((e) => {
            return { ...e, IsNew: false };
          });
          return [...tempPrev, ...tempComments];
          // return [...tempComments, ...tempPrev];
        });
      });
  };

  const [DoScrollToBottom, setDoScrollToBottom] = useState(true);
  useEffect(() => {
    if (comments.length > 0 && DoScrollToBottom) {
      // console.log("SCROLLED TO BOTTOM");
      setTimeout(() => {
        // [...document.querySelectorAll(".comment-container.is-new")].at(-1)?.scrollIntoView({ behavior: "smooth" });
        $("html, body").animate({ scrollTop: [...document.querySelectorAll(".comment-container")].at(-1)?.offsetTop }, 250);
      }, 800);
      setDoScrollToBottom(false);
    }
    if (comments.length === 0) {
      getComments();
    }
    if (window.scrollY + window.innerHeight > document.body.offsetHeight - 250) {
      setTimeout(() => {
        // [...document.querySelectorAll(".comment-container.is-new")].at(-1)?.scrollIntoView({ behavior: "smooth" });
        $("html, body").animate({ scrollTop: [...document.querySelectorAll(".comment-container")].at(-1)?.offsetTop }, 250, "linear");
      }, 50);
    }
    const timeout = setTimeout(() => getComments(), 500);
    // const interval = setInterval(getComments, 2000);
    return () => {
      clearTimeout(timeout);
      // clearInterval(interval);
    };
  }, [comments]);

  // console.log(comments);
  // console.log(comments.at(0));
  // console.log(comments.map((e) => e.replies));

  useEffect(() => {
    const windowLoadFun = (windowLoadEvent) => {
      // console.log(document.body.offsetWidth);
    };
    window.addEventListener("load", windowLoadFun);

    return () => {
      window.removeEventListener("load", windowLoadFun);
    };
  }, []);

  useEffect(() => {
    let bool = false;
    const scrollFun = (keydownEvent) => {
      // console.log("scrollFun");

      if (keydownEvent.ctrlKey || keydownEvent.altKey) return;
      if (document.activeElement.tagName === "INPUT") return;
      if (document.activeElement.tagName === "TEXTAREA") return;
      if (document.activeElement.getAttribute("contenteditable")) return;

      if (!["f", "r", "F", "R"].includes(keydownEvent.key)) return;
      keydownEvent.preventDefault();

      let comments;
      if (keydownEvent.shiftKey) {
        comments = [...document.querySelectorAll(".comments > .comment-container")];
      } else {
        comments = [...document.querySelectorAll(".comment-container")];
      }

      const offset = 15;
      if (keydownEvent.key === "f" || keydownEvent.key === "F") {
        const filteredComments = comments.filter((comment) => comment.getBoundingClientRect().top > offset + 5);
        if (!filteredComments.at(0)) return;
        $("html, body").animate({ scrollTop: filteredComments.at(0).offsetTop - 15 }, 150);
      }
      if (keydownEvent.key === "r" || keydownEvent.key === "R") {
        const filteredComments = comments.filter((comment) => comment.getBoundingClientRect().top < offset - 5);
        if (!filteredComments.at(-1)) return;
        $("html, body").animate({ scrollTop: filteredComments.at(-1).offsetTop - 15 }, 150);
      }
    };
    let interval;
    const keyDownFun = (keydownEvent) => {
      scrollFun(keydownEvent);
      // if (bool) return;
      // scrollFun(keydownEvent);
      // interval = setInterval(() => {
      //   scrollFun(keydownEvent);
      // }, 150);
      // bool = true;
    };
    // const keyUpFun = (keyupEvent) => {
    //   if (!bool) return;
    //   clearInterval(interval);
    //   bool = false;
    // };
    document.addEventListener("keydown", keyDownFun);
    // document.addEventListener("keyup", keyUpFun);

    return () => {
      document.removeEventListener("keydown", keyDownFun);
      // document.removeEventListener("keyup", keyUpFun);
    };
  }, []);

  return (
    <div className="App">
      {comments.length > 0 ? (
        <div className="comments">
          {comments.map((commentData, commentDataIndex) => {
            if (commentData.kind !== "more") {
              return <Comment key={commentDataIndex} commentData={commentData} commentDepth={1} />;
            } else {
              return `${commentData.data.count} More Comments`;
            }
          })}
        </div>
      ) : (
        <div className="loading">--- No comments to load, Yet ---</div>
      )}
      <div className="refresh-alert">--- Refreshes about every 3 to 5 seconds ---</div>
    </div>
  );
};

export default App;

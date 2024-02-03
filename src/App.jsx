import "./Reset.css";
import "./App.scss";
// import * as tempCricData from "./cric.json";
import { useEffect, useState } from "react";
import $ from "jquery";
import { Route, Routes, useParams, Outlet, useNavigate } from "react-router-dom";

function timeAgo(input) {
  var seconds = Math.floor((new Date() - input) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "M";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + "s";
}
// function timeAgo(input) {
//   var seconds = Math.floor((new Date() - input) / 1000);
//   var interval = seconds / 31536000;
//   if (interval > 1) {
//     return Math.floor(interval) + " years";
//   }
//   interval = seconds / 2592000;
//   if (interval > 1) {
//     return Math.floor(interval) === 1 ? Math.floor(interval) + " month" : Math.floor(interval) + " months";
//   }
//   interval = seconds / 86400;
//   if (interval > 1) {
//     return Math.floor(interval) === 1 ? Math.floor(interval) + " day" : Math.floor(interval) + " days";
//   }
//   interval = seconds / 3600;
//   if (interval > 1) {
//     return Math.floor(interval) === 1 ? Math.floor(interval) + " hour" : Math.floor(interval) + " hours";
//   }
//   interval = seconds / 60;
//   if (interval > 1) {
//     return Math.floor(interval) === 1 ? Math.floor(interval) + " minute" : Math.floor(interval) + " minutes";
//   }
//   return Math.floor(seconds) === 1 ? Math.floor(seconds) + " second" : Math.floor(seconds) + " seconds";
// }
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

const RefreshIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M4 20v-2h2.75l-.4-.35q-1.3-1.15-1.825-2.625T4 12.05q0-2.775 1.662-4.938T10 4.25v2.1Q8.2 7 7.1 8.563T6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V14h2v6zm10-.25v-2.1q1.8-.65 2.9-2.212T18 11.95q0-1.125-.425-2.187T16.25 7.8L16 7.55V10h-2V4h6v2h-2.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.775-1.662 4.938T14 19.75"></path>
    </svg>
  );
};
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
  const [finalCommentData, setFinalCommentData] = useState(commentData);
  const [IsRefreshingComment, setIsRefreshingComment] = useState(false);
  const refreshComment = () => {
    if (IsRefreshingComment) return;
    setIsRefreshingComment(true);
    fetch(`https://www.reddit.com${commentData.data.permalink}.json?raw_json=1&limit=500`, { cache: "no-store" })
      .then((response) => response.json())
      .then((json) => {
        if (json.at(1).data.children.length > 0) {
          setTimeout(() => {
            [...document.querySelectorAll(`#${json.at(1).data.children.at(0).data.id} .comment-container`)]
              .filter((e) => {
                const bcr = e.getBoundingClientRect();
                const t = bcr.top;
                const b = bcr.bottom;
                const h = window.innerHeight;
                if (t > 0 && b < h + 200) return true;
              })
              .reverse()
              .slice(0, 12)
              .forEach((e) => {
                const btn = e.querySelector(".refresh-comment");
                btn.click();
              });
          }, 0);
          setFinalCommentData((prev) => {
            return { ...prev, data: json.at(1).data.children.at(0).data };
          });
        }
        setIsRefreshingComment(false);
      });
  };
  return (
    <div className={commentData.IsNew ? "comment-container is-new" : "comment-container"} style={{ "--depth": commentDepth }} id={finalCommentData.data.id}>
      <div className="comment-container-inner">
        <div className="comment" onClick={onClick}>
          <div className="left"></div>
          <div className="right">
            <div className="header">
              <div className="user">
                <div className="name">{finalCommentData.data.author}</div>
                {finalCommentData.data.author_flair_richtext?.length > 0 ? (
                  <div className="flair">
                    {finalCommentData.data.author_flair_richtext.map((e, i) => {
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
              <div className={IsRefreshingComment ? "refresh-comment is-refreshing-comment" : "refresh-comment"} onClick={refreshComment}>
                <RefreshIcon />
              </div>
              {/* {finalCommentData.data.replies?.data?.children.length > 0 ? (
                <div className="replies-count">
                  {finalCommentData.data.replies.data.children.length} {finalCommentData.data.replies.data.children.length === 1 ? "Reply" : "Replies"}
                </div>
              ) : (
                ""
              )} */}
              <div className="voting">
                <div className="upvote"></div>
                <div
                  className="score"
                  style={{
                    width: `${
                      Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(finalCommentData.data.score).length * 10
                    }px`,
                  }}
                >
                  {Intl.NumberFormat("en-US", {
                    notation: "compact",
                  }).format(finalCommentData.data.score)}
                </div>
                <div className="downvote"></div>
              </div>
              <div className="created">
                <div className="origial" style={{ width: `${timeAgo(finalCommentData.data.created * 1000).length * 10}px` }}>
                  {timeAgo(finalCommentData.data.created * 1000)}
                </div>
                {finalCommentData.data.edited ? (
                  <div className="edited" style={{ width: `${timeAgo(finalCommentData.data.edited * 1000).length * 10}px` }}>
                    ({timeAgo(finalCommentData.data.edited * 1000)})
                  </div>
                ) : (
                  ""
                )}
              </div>
              <a href={"https://www.reddit.com" + finalCommentData.data.permalink} target="_blank" className="open-in-reddit">
                <RedditIcon />
              </a>
            </div>
            <div className="body" dangerouslySetInnerHTML={{ __html: finalCommentData.data.body_html }}></div>
          </div>
        </div>
        {finalCommentData.data.replies ? (
          // <div className={IsRefreshingComment ? "replies-container is-refreshing-comment" : "replies-container"}>
          <div className={IsRefreshingComment ? "replies-container" : "replies-container"}>
            <div className="replies">
              <div className="replies-inner">
                {finalCommentData.data.replies.data.children.map((reply, replyIndex) =>
                  reply.kind === "t1" ? (
                    <Comment key={replyIndex} commentData={reply} commentDepth={commentDepth + 1} />
                  ) : reply.kind === "more" ? (
                    <div key={replyIndex} className="more-replies">
                      ~~~~~ MORE REPLIES
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const Comments = () => {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    // console.log("GETTING COMMENTS");
    fetch(`https://www.reddit.com${window.location.pathname}.json?raw_json=1&limit=100&sort=new`, { cache: "no-store" })
      .then((response) => response.json())
      .then((json) => {
        setComments((prev) => {
          const fetchedComments = json.at(1).data.children;
          // const fetchedCommentsIds = fetchedComments.map((comment) => comment.data.id);

          // const tempOldNotUpdatedComments = prev
          //   .filter((tempComment) => {
          //     return !fetchedCommentsIds.includes(tempComment.data.id);
          //   })
          //   .map((e) => {
          //     return { ...e, IsNew: false, IsVeryOld: true };
          //   });

          // const tempOldUpdatedComments = fetchedComments
          //   .filter((tempComment) => tempComment.kind === "t1")
          //   .filter((tempComment) => {
          //     return prev.map((comment) => comment.data.id).includes(tempComment.data.id);
          //   })
          //   .reverse()
          //   .map((e) => {
          //     return { ...e, IsNew: false };
          //   });
          const tempNewComments = fetchedComments
            .filter((tempComment) => tempComment.kind === "t1")
            .filter((tempComment) => {
              return !prev.map((comment) => comment.data.id).includes(tempComment.data.id);
            })
            .reverse()
            .map((e, i) => {
              return { ...e, IsNew: true };
            });
          const tempPrev = prev.map((e) => {
            return { ...e, IsNew: false };
          });
          return [...tempPrev, ...tempNewComments];
          // return [...tempOldNotUpdatedComments, ...tempOldUpdatedComments, ...tempNewComments];
          // return [...tempNewComments, ...tempPrev];
        });
      });
  };

  const [DoScrollToBottom, setDoScrollToBottom] = useState(true);
  useEffect(() => {
    if (comments.length > 0 && DoScrollToBottom) {
      setTimeout(() => {
        // console.log("SCROLLED TO BOTTOM");
        // setTimeout(() => {
        //   // [...document.querySelectorAll(".comment-container.is-new")].at(-1)?.scrollIntoView({ behavior: "smooth" });
        //   $("html, body").animate({ scrollTop: [...document.querySelectorAll(".comment-container")].at(-1)?.offsetTop }, 500);
        // }, 500);
        $("html, body").animate(
          {
            scrollTop: document.body.scrollHeight + 150,
            // [...document.querySelectorAll(".comment-container")].at(-1)?.offsetTop
          },
          500
        );
        setDoScrollToBottom(false);
      }, 250);
    }

    if (comments.length === 0) {
      getComments();
    }

    if (window.scrollY + window.innerHeight > document.body.offsetHeight - 150) {
      setTimeout(() => {
        // [...document.querySelectorAll(".comment-container.is-new")].at(-1)?.scrollIntoView({ behavior: "smooth" });
        // [...document.querySelectorAll(".comment-container.is-new")].at(-1)?.scrollIntoView();
        // $("html, body").animate({ scrollTop: window.scrollY + [...document.querySelectorAll(".comment-container.is-new > .comment-container-inner")].map((newComment) => newComment.scrollHeight * 1 + 15 + 5).reduce((a, b) => a + b, 0) }, 0, "linear");
        $("html, body").animate(
          {
            scrollTop: document.body.scrollHeight + 150,
            // window.scrollY +
            // [...document.querySelectorAll(".comment-container.is-new > .comment-container-inner")]
            //   .map((newComment) => {
            //     return newComment.scrollHeight * 1 + 15 + 5;
            //   })
            //   .reduce((a, b) => a + b, 0),
          },
          250
        );
      }, 0);
    }

    const timeout = setTimeout(() => getComments(), 3000);
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

      if (keydownEvent.key === "e" || keydownEvent.key === "E") {
        const comments = [...document.querySelectorAll(".comment")];
        const currentComment = comments.filter((comment) => comment.getBoundingClientRect().bottom > 15).at(0);
        currentComment.querySelector(".open-in-reddit").click();
      }

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
        filteredComments.at(0).scrollIntoView({ behavior: "smooth" });
        // $("html, body").animate({ scrollTop: filteredComments.at(0).offsetTop - 15 }, 150);
      }
      if (keydownEvent.key === "r" || keydownEvent.key === "R") {
        const filteredComments = comments.filter((comment) => comment.getBoundingClientRect().top < offset - 5);
        if (!filteredComments.at(-1)) return;
        filteredComments.at(-1).scrollIntoView({ behavior: "smooth" });
        // $("html, body").animate({ scrollTop: filteredComments.at(-1).offsetTop - 15 }, 150);
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

  useEffect(() => {
    const int = setInterval(() => {
      [...document.querySelectorAll(".comments > .comment-container")]
        .filter((e) => {
          const bcr = e.getBoundingClientRect();
          const t = bcr.top;
          const b = bcr.bottom;
          const h = window.innerHeight;
          if (t > 0 && b < h + 200) return true;
        })
        .reverse()
        .slice(0, 12)
        .forEach((e) => {
          const btn = e.querySelector(".refresh-comment");
          btn.click();
        });
    }, 5000);

    return () => {
      clearInterval(int);
    };
  }, []);

  return (
    <>
      {comments.length > 0 ? (
        <div className="comments">
          {comments.map((commentData, commentDataIndex) => {
            if (commentData.kind !== "more") {
              return <Comment key={commentDataIndex} commentData={commentData} commentDepth={0} />;
            } else {
              return `${commentData.data.count} More Comments`;
            }
          })}
        </div>
      ) : (
        <div className="loading">--- No comments to load, Yet ---</div>
      )}
      <div className="refresh-alert">--- Refreshes about every 3 to 5 seconds ---</div>
    </>
  );
};

const Subreddit = () => {
  const subName = useParams().subreddit;
  const sort = useParams().sort;
  const path = window.location.pathname;

  const [postsData, setPostsData] = useState([]);
  const [nextPageID, setNextPageID] = useState("");

  useEffect(() => {
    fetch(`https://www.reddit.com${path}.json?raw_json=1&limit=15`, { cache: "no-store" })
      .then((response) => response.json())
      .then((json) => {
        setNextPageID(json.data.after);
        setPostsData(json.data.children);
        // setPostsData((prev) => [...prev, ...json.data.children]);
      });

    return () => setPostsData([]);
  }, []);

  const [IsFetching, setIsFetching] = useState(false);
  const onClick = () => {
    setIsFetching(true);
  };
  useEffect(() => {
    if (IsFetching) {
      fetch(`https://www.reddit.com${path}.json?raw_json=1&limit=15&after=${nextPageID}`, { cache: "no-store" })
        .then((response) => response.json())
        .then((json) => {
          setNextPageID(json.data.after);
          // setPostsData(json.data.children);
          setPostsData((prev) => [...prev, ...json.data.children]);
          setIsFetching(false);
        });
    }
  }, [IsFetching]);

  const [filterMatchThreads, setFilterMatchThreads] = useState(false);

  return postsData.length > 0 ? (
    <div className="posts">
      <div className="header">
        <div className="sub-name">{subName}</div>
        <div className="toolbar">
          <div className="sort-sub">
            <a className={sort === "hot" || sort === undefined ? "sort active" : "sort"} href={`/r/${subName}/hot`}>
              Hot
            </a>
            <a className={sort === "new" ? "sort active" : "sort"} href={`/r/${subName}/new`}>
              New
            </a>
          </div>
          <div className="filter-match-threads" onClick={() => setFilterMatchThreads((e) => !e)}>
            {filterMatchThreads ? "✅ " : ""} Fliter Match Threads
          </div>
        </div>
      </div>
      {(filterMatchThreads ? postsData.filter((postData) => /match thread|post match thread|post day thread/.test(postData.data.title.toLowerCase())) : postsData).map((postData, postDataIndex) => {
        return (
          <div className="post" key={postDataIndex}>
            <a href={postData.data.permalink} className="title">
              {postData.data.title}
            </a>
            <div className="footer">
              <div className="comments-num">{postData.data.num_comments} comments</div>
              <div className="created">
                <div className="original">{timeAgo(postData.data.created * 1000)} ago</div>
                {postData.data.edited ? <div className="edited">(edited {timeAgo(postData.data.edited * 1000)} ago)</div> : ""}
              </div>
            </div>
          </div>
        );
      })}
      {IsFetching ? (
        <div className="fetching-alert">Fetching 50 more posts</div>
      ) : (
        <div className="load-more-posts" onClick={onClick}>
          Load 50 more posts
        </div>
      )}
    </div>
  ) : (
    <div className="loading">--- No posts to load, Yet ---</div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <p>
        This is homepage, there's nothing in it except this text. <a href="/r/cricket">go to /r/cricket</a> or type any /r/subreddit in url bar to start using this
      </p>
      <p>There are sort buttons (new, hot) to sort the subreddit posts, the comments will always be sorted by new (cause you know... "live-thread")</p>
      <p>There is also a filter only match threads button that would only keep the post that have "Match Thread"/"Post Match Thread"/"Post Day Thread" text in the title</p>
      <p>It would get new comments every (3 seconds + the time to fetch the request) so thats around 3.5 to 4.5 seconds</p>
      <p>the comments that are in the view would keep refreshing every 5 seconds so we don't have to keep pressing the refresh button</p>
      <p>Very new comments would be more saturated + brightened till other new comments are fetched so you would notice them quickly</p>
      <p>Keyboard navigation is available as well. "f" for next comment, "r" for previous and "e" would open the first comment visible in normal "reddit.com" so you can reply or vote there</p>
      <p>"if" you see a blank page it means that it's some bug and i didn't map data correctly :/</p>
      <p>or if it was working just fine and suddenly shows blank page and it keeps showing blank page for few minutes then reddit might have rate limited you, i think it undoes that in few minutes... but this should only happen if we're making too many requests per second (currently i check it's somewhat 80-100 per minute and i haven't seen issues so it should be fine)</p>
      <p>And there are sometimes duplicate replies for half a second and it gets updated, this is a bug that i for some damn reason can't find reason for, but it's only about half a second so it shouldn't be a big issue</p>
      <p>Also reload the page once a while if you're not planning on reading older comments, just so there aren't like 1000 comments at the same time (for performance's sake)</p>

      <p>Thanks :)</p>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="r/:subreddit" element={<Subreddit />} />
        <Route path="r/:subreddit/:sort" element={<Subreddit />} />
        <Route path="r/:subreddit/comments/:postId/:postString" element={<Comments />} />
        <Route path="" element={<Home />} />
        <Route path="*" element="404. check url" />
      </Routes>
      {/* {subWithSortRegex.test(path) && ["new", "hot"].includes(path.split("/").at(-2)) ? <Subreddit sort={path.split("/").at(-2)} /> : ""}
      {commentsRegex.test(path) ? <Comments /> : ""}
      {!subRegex.test(path) && !subWithSortRegex.test(path) && !["new", "hot"].includes(path.split("/").at(-2)) && !commentsRegex.test(path) ? "404 wrong url probably" : ""} */}
    </div>
  );
};

export default App;

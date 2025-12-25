import { jsx } from "react/jsx-runtime";
import Codepen from "react-codepen-embed";
import { GithubGist } from "react-gistlab";
import { Tweet } from "react-twitter-widgets";
const urlTypeMap = {
  "codepen.io": 0,
  "gist.github.com": 1,
  "twitter.com": 2
  /* twitter */
};
function getType(url) {
  const urlDomain = Object.keys(urlTypeMap).find(
    (domain) => url.includes(domain)
  );
  return urlDomain ? urlTypeMap[urlDomain] : null;
}
function Embed({ block }) {
  var _a, _b, _c, _d;
  if (!((_a = block.embed) == null ? void 0 : _a.url)) return null;
  const type = getType(block.embed.url);
  let EmbeddedItem;
  if (type === 0) {
    const hash = (_b = /pen\/(.*?)(\?|$)/.exec(block.embed.url)) == null ? void 0 : _b[1];
    const user = (_c = /codepen\.io\/(.*?)(\/pen)/.exec(block.embed.url)) == null ? void 0 : _c[1];
    EmbeddedItem = hash && user ? /* @__PURE__ */ jsx(Codepen, { hash, height: 500, user }) : null;
  }
  if (type === 1) {
    EmbeddedItem = /* @__PURE__ */ jsx(GithubGist, { url: block.embed.url });
  }
  if (type === 2) {
    const tweetId = (_d = /status\/(.*?)(\?|$)/.exec(block.embed.url)) == null ? void 0 : _d[1];
    EmbeddedItem = tweetId ? /* @__PURE__ */ jsx(Tweet, { tweetId }) : null;
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: type === 2 ? "w-full md:w-4/5" : "w-full",
      children: EmbeddedItem
    }
  ) });
}
export {
  Embed
};
//# sourceMappingURL=Embed-BACyl67-.js.map

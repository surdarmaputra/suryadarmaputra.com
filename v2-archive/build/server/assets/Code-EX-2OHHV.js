import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { SlArrowDown } from "react-icons/sl";
import { Prism } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import { c as concatPlainTexts } from "./server-build-BR9HeBqZ.js";
import "node:stream";
import "@react-router/node";
import "isbot";
import "react-dom/server";
import "react-router";
import "sharp";
import "undici";
import "fs/promises";
import "lodash/identity.js";
import "path";
import "tailwind-merge";
import "react-icons/hi2";
import "react-lazyload";
import "embla-carousel-auto-scroll";
import "embla-carousel-react";
import "lodash/debounce.js";
import "dayjs";
import "react-icons/si";
const shellLanguages = ["shell", "bash"];
const expandableHeightThreshold = 400;
function Code({ block }) {
  const codeRef = useRef(null);
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const { language, rich_text: richTexts } = block.code;
  const codeText = concatPlainTexts(richTexts);
  useEffect(() => {
    var _a;
    if (((_a = codeRef.current) == null ? void 0 : _a.offsetHeight) && codeRef.current.offsetHeight > expandableHeightThreshold) {
      setExpanded(false);
    }
  }, [block]);
  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(!copied);
      }, 3e3);
    } else {
      clearTimeout(timeout);
    }
  }, [copied]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative my-4 overflow-y-hidden transition ${expanded ? "h-fit" : "h-96"}`,
      ref: codeRef,
      children: [
        /* @__PURE__ */ jsx(CopyToClipboard, { onCopy: () => setCopied(true), text: codeText, children: /* @__PURE__ */ jsx("button", { className: "absolute right-0 top-0 rounded-bl bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-slate-400", children: copied ? "Copied" : "Copy" }) }),
        !expanded && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 h-32 w-full bg-linear-to-b from-transparent to-white dark:to-slate-900" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-slate-800 px-6 py-1 text-sm text-slate-300 shadow-lg transition hover:bg-slate-700",
              onClick: () => setExpanded(true),
              children: [
                "Expand ",
                /* @__PURE__ */ jsx(SlArrowDown, { className: "ml-2 h-3 w-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Prism,
          {
            customStyle: { margin: 0 },
            language,
            showLineNumbers: !shellLanguages.includes(language),
            style: coldarkDark,
            children: codeText
          }
        )
      ]
    }
  );
}
export {
  Code
};
//# sourceMappingURL=Code-EX-2OHHV.js.map

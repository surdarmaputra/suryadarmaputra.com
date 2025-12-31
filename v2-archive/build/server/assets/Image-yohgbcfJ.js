import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useMemo, useEffect } from "react";
import { SlClose } from "react-icons/sl";
import LazyLoad from "react-lazyload";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { g as getFileExtensionFromUrl, R as RichText, O as OptimizedImage } from "./server-build-BR9HeBqZ.js";
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
import "embla-carousel-auto-scroll";
import "embla-carousel-react";
import "lodash/debounce.js";
import "dayjs";
import "react-icons/si";
function getAltText(caption) {
  return caption.reduce((finalText, text) => finalText + text.plain_text, "");
}
function Image({ basePath = "/images/posts", block }) {
  const [isClientReady, setIsClientReady] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const handlers = useRef({});
  const captionRichTexts = block.image.caption;
  const extension = "type" in block.image && block.image.type === "file" ? getFileExtensionFromUrl(block.image.file.url) : "";
  const url = `${basePath}/${block.id}.${extension}`;
  const placeholderUrl = `${basePath}/${block.id}-placeholder.png`;
  const altText = getAltText(captionRichTexts);
  const caption = captionRichTexts.map((richTextBlock, index) => /* @__PURE__ */ jsx(RichText, { block: richTextBlock }, index));
  const placeholder = /* @__PURE__ */ jsx("img", { alt: altText, className: "h-64 blur-xl md:h-96", src: placeholderUrl });
  const className = useMemo(
    () => zoomEnabled ? "fixed top-0 left-0 right-0 bottom-0 mt-0" : "my-2 cursor-zoom-in rounded-md overflow-hidden shadow-lg",
    [zoomEnabled]
  );
  const handleWrapperClick = () => {
    if (!zoomEnabled) {
      setZoomEnabled(true);
    }
  };
  const handleZoomClose = () => {
    if (handlers.current.resetTransform) handlers.current.resetTransform();
    setZoomEnabled(false);
  };
  const handleWrapperKeyUp = (event) => {
    if (event.code !== "Space" && event.code !== "Escape") return;
    if (!zoomEnabled) {
      setZoomEnabled(true);
    } else {
      handleZoomClose();
    }
  };
  useEffect(() => {
    setIsClientReady(true);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `z-40 flex flex-col items-center justify-center transition ${className}`,
      onClick: handleWrapperClick,
      onKeyUp: handleWrapperKeyUp,
      role: "button",
      tabIndex: 0,
      children: [
        zoomEnabled ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute h-full w-full bg-white opacity-95 dark:bg-slate-900",
            onClick: handleZoomClose,
            onKeyUp: handleWrapperKeyUp,
            role: "button",
            tabIndex: 0
          }
        ) }) : null,
        isClientReady ? /* @__PURE__ */ jsx(LazyLoad, { placeholder, children: /* @__PURE__ */ jsx(TransformWrapper, { centerOnInit: true, disabled: !zoomEnabled, children: ({ resetTransform }) => {
          handlers.current.resetTransform = resetTransform;
          return /* @__PURE__ */ jsx(TransformComponent, { children: /* @__PURE__ */ jsx(
            OptimizedImage,
            {
              alt: altText,
              className: "z-50",
              onClick: (event) => event.stopPropagation(),
              src: url
            }
          ) });
        } }) }) : placeholder,
        zoomEnabled ? /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsxs(
          "button",
          {
            className: "z-50 flex w-28 items-center justify-center text-slate-400 dark:text-slate-500",
            onClick: handleZoomClose,
            type: "button",
            children: [
              /* @__PURE__ */ jsx(SlClose, { className: "mr-2" }),
              " Close"
            ]
          }
        ) }) : null,
        !zoomEnabled && (caption == null ? void 0 : caption.length) ? /* @__PURE__ */ jsx("span", { className: "p-4 text-center text-sm font-light text-slate-400 dark:text-slate-600", children: caption }) : null
      ]
    }
  );
}
export {
  Image
};
//# sourceMappingURL=Image-yohgbcfJ.js.map

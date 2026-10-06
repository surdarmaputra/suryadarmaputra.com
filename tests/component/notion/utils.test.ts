import { describe, expect, test } from "vitest";
import { getFileExtensionFromUrl } from "../../../src/modules/core/libs/notion/utils";

describe("getFileExtensionFromUrl", () => {
  test.each([
    ["https://files.example/thumb.png?X-Amz-Signature=abc", "png"],
    ["https://files.example/anim.gif", "gif"],
    ["https://files.example/photo.jpg?X-Amz-Signature=abc", "jpg"],
    ["https://files.example/photo.jpeg", "jpeg"],
  ])("detects the extension of %s", (url, extension) => {
    expect(getFileExtensionFromUrl(url)).toBe(extension);
  });

  test("returns undefined for an unsupported or missing extension", () => {
    expect(getFileExtensionFromUrl("https://files.example/shot.webp")).toBeUndefined();
    expect(getFileExtensionFromUrl(undefined)).toBeUndefined();
  });
});

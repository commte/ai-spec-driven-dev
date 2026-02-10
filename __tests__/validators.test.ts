import { describe, it, expect } from "vitest";
import { validateTodoTitle } from "@/lib/validators";

describe("validateTodoTitle", () => {
  it("正常なタイトルはvalidを返す", () => {
    const result = validateTodoTitle("買い物に行く");
    expect(result).toEqual({ valid: true });
  });

  it("空文字はinvalidとエラーメッセージを返す", () => {
    const result = validateTodoTitle("");
    expect(result).toEqual({
      valid: false,
      error: "タイトルを入力してください",
    });
  });

  it("スペースのみの文字列はinvalidを返す", () => {
    const result = validateTodoTitle("   ");
    expect(result).toEqual({
      valid: false,
      error: "タイトルを入力してください",
    });
  });

  it("100文字ちょうどのタイトルはvalidを返す", () => {
    const title = "あ".repeat(100);
    const result = validateTodoTitle(title);
    expect(result).toEqual({ valid: true });
  });

  it("101文字のタイトルはinvalidとエラーメッセージを返す", () => {
    const title = "あ".repeat(101);
    const result = validateTodoTitle(title);
    expect(result).toEqual({
      valid: false,
      error: "タイトルは100文字以内で入力してください",
    });
  });

  it("前後に空白があるタイトルはvalidを返す", () => {
    const result = validateTodoTitle("  買い物に行く  ");
    expect(result).toEqual({ valid: true });
  });
});

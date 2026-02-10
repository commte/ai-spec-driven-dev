export function validateTodoTitle(
  title: string
): { valid: boolean; error?: string } {
  const trimmed = title.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "タイトルを入力してください" };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "タイトルは100文字以内で入力してください" };
  }

  return { valid: true };
}

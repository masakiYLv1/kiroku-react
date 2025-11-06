import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("アプリタイトルが表示されている", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "学習記録アプリ" })
    ).toBeInTheDocument();
  });

  test("学習内容のinput要素に値が取得されている", () => {
    render(<App />);
    const inputElement = screen.getByLabelText("学習内容");

    fireEvent.change(inputElement, { target: { value: "テストタスク" } });
    expect(inputElement).toHaveValue("テストタスク");
  });

  test("学習時間のinput要素に値が取得されている", () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/学習時間/);

    fireEvent.change(inputElement, { target: { value: 3 } });
    expect(inputElement).toHaveValue(3);
  });

  test("新たに記録が追加される", async () => {
    render(<App />);

    const inputText = screen.getByLabelText("学習内容");
    const inputNumber = screen.getByLabelText(/学習時間/);
    const addButton = screen.getByRole("button", { name: /登録/ });
    const list = screen.getByRole("list");

    fireEvent.change(inputText, { target: { value: "テストタスクス" } });
    fireEvent.change(inputNumber, { target: { value: 5 } });
    fireEvent.click(addButton);

    await waitFor(async () => {
      await expect(list).toHaveTextContent(/テストタスクス/);
      await expect(list).toHaveTextContent(/5時間/);
    });
  });

  test("削除ボタンを押すと学習記録が削除される", async () => {
    render(<App />);

    const itemsBefore = await screen.findAllByRole("listitem");
    const deleteButtons = await screen.findAllByRole("button", {
      name: /削除/,
    });

    fireEvent.click(deleteButtons[0]);

    await waitFor(async () => {
      const itemsAfiter = await screen.findAllByRole("listitem");
      expect(itemsAfiter.length).toBe(itemsBefore.length - 1);
    });
  });

  test("入力をしないで登録を押すとエラーが表示される", () => {
    render(<App />);

    const addButton = screen.getByRole("button", { name: /登録/ });

    fireEvent.click(addButton);

    expect(
      screen.getByText("入力されていない項目があります")
    ).toBeInTheDocument();
  });
});

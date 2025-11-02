export const RecordForm = (props) => {
  const {
    inputText,
    inputNumber,
    onSubmit,
    onChangeText,
    onChangeNumber,
    isError,
    errorText,
    children,
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          学習内容
          <input type="text" value={inputText} onChange={onChangeText} />
        </label>
      </div>
      <div>
        <label>
          学習時間
          <input type="number" value={inputNumber} onChange={onChangeNumber} />
          時間
        </label>
      </div>
      <p>入力されている学習内容: {inputText}</p>
      <p>入力されている時間： {inputNumber}時間</p>
      {isError && <p style={{ color: "red" }}>{errorText}</p>}
      {children}
      <button type="submit">登録</button>
    </form>
  );
};

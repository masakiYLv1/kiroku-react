export const TotalDisplay = (props) => {
  const { total, goal = 1000 } = props;
  return (
    <p>
      合計時間：{total}/{goal}(h)
    </p>
  );
};

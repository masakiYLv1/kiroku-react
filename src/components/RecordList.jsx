export const RecordList = (props) => {
  const { records, onDelete, loading } = props;
  return (
    <>
      {loading && <p>Loading...</p>}
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <span>
              {record.title} {record.time}時間
            </span>
            <button type="button" onClick={() => onDelete(record.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

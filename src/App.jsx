import { useEffect, useState } from "react";
import { RecordList } from "./components/RecordList";
import { RecordForm } from "./components/RecordForm";
import { TotalDisplay } from "./components/TotalDisplay";
import { supabase } from "./supabaseClient";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputNumber, setInputNumber] = useState(0);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  // supabaseからデータを取得する関数
  const fetchRecords = async () => {
    setLoading(true);
    const { data: study_record, error } = await supabase
      .from("study_record")
      .select("*");

    if (error) {
      console.error("Error: ", error);
      setErrorText(`データの読込に失敗しました。${error.message}`);
      setIsError(true);
      setLoading(false);
    } else {
      // console.log(study_record);
      setRecords(study_record);
      setLoading(false);
      const sum = study_record.reduce(
        (accumulator, currentValue) => accumulator + currentValue.time,
        0
      );
      setTotal(sum);
    }
  };

  const onDeleteRecord = async (id) => {
    setLoading(true);
    const { error } = await supabase.from("study_record").delete().eq("id", id);

    if (error) {
      console.error("Error: ", error);
      setErrorText(`データの読込に失敗しました。${error.message}`);
      setIsError(true);
      setLoading(false);
    } else {
      // console.log("delete: ", id);
      fetchRecords();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const validate = (text, number) => {
    if (text.trim() === "" || number <= 0) {
      setErrorText("入力されていない項目があります");
      setIsError(true);
    } else {
      setErrorText("");
      setIsError(false);
    }
  };

  const onChangeInputText = (e) => {
    const text = e.target.value;
    setInputText(text);
    validate(text, inputNumber);
  };

  const onChangeInputNumber = (e) => {
    const number = e.target.value;
    setInputNumber(number);
    validate(inputText, number);
  };

  const onSubmitAdd = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "" || inputNumber <= 0) {
      setErrorText("入力されていない項目があります");
      setIsError(true);
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("study_record")
      .insert([{ title: inputText, time: inputNumber }]);

    if (error) {
      console.error("Error: ", error);
      setErrorText(`データの読込に失敗しました。${error.message}`);
      setIsError(true);
      setLoading(false);
    } else {
      // console.log("insert: ", study_record);
      fetchRecords();
      setLoading(false);
      setInputText("");
      setInputNumber("");
    }
  };

  return (
    <>
      <h1>学習記録アプリ</h1>
      <RecordForm
        inputText={inputText}
        inputNumber={inputNumber}
        onSubmit={onSubmitAdd}
        onChangeText={onChangeInputText}
        onChangeNumber={onChangeInputNumber}
        isError={isError}
        errorText={errorText}
      >
        <RecordList
          records={records}
          onDelete={onDeleteRecord}
          loading={loading}
        />
      </RecordForm>
      <TotalDisplay total={total} />
    </>
  );
}

export default App;

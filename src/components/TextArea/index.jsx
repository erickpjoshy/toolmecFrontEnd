import './textarea.css';
const TextArea = ({ placeHolder = '', onChange }) => {
  return (
    <>
      <textarea
        onChange={onChange}
        className="custom-textarea"
        placeholder={placeHolder}
      ></textarea>
    </>
  );
};

export default TextArea;

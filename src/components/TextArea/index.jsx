import './textarea.css';
const TextArea = ({ placeHolder = '' }) => {
  return (
    <>
      <textarea
        className="custom-textarea"
        placeholder={placeHolder}
      ></textarea>
    </>
  );
};

export default TextArea;

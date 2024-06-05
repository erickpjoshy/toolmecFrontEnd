import './input.css';

const Input = ({
  className = '',
  type = 'text',
  onChange,
  onKeydown,
  placeHolder,
  value,
  min,
  disabled,
  required,
  id,
  name,
}) => {
  return (
    <div>
      <input
        className={`custom-input ${className}`}
        placeholder={placeHolder}
        min={min}
        value={value}
        disabled={disabled}
        onChange={onChange}
        type={type}
        id={id}
        name={name}
        required={required}
        autoComplete="on"
      />
    </div>
  );
};

export default Input;

import './select.css';

const Select = ({
  className = '',
  onChange,
  onKeydown,
  options = [],
  placeHolder = '',
  disabled,
  id,
  name,
  value = '',
}) => {
  return (
    <div>
      <select
        className={`custom-select ${className} `}
        onChange={onChange}
        disabled={disabled}
        autoComplete="on"
        id={id}
        name={name}
        value={value || ''}
      >
        <option className="disableoption" value="" disabled>
          {placeHolder}
        </option>
        {options.map((value, i) => {
          return (
            <option key={i} value={value._id}>
              {value.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;

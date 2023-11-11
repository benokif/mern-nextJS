
interface FormRowSelectProps {
  name: string;
  labelText?: string;
  defaultValue?: string;
  list: string[];
  customCss?: string;
  disabled?: boolean;
}

// 🔧 for display of <option> need to convert enum types received from BE to lower case (see lines 33-34)
//     ❗️ensure <option value> and <select defaultValue> are not modified
const FormRowSelect = ({
  list,
  name,
  labelText,
  defaultValue,
  customCss,
  disabled
}: FormRowSelectProps) => {
  return (
    <div className={`form-row ${customCss}`}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select select-lowercase"
        defaultValue={defaultValue}
        disabled={disabled}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue.toLowerCase().replace("_", "-")}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;

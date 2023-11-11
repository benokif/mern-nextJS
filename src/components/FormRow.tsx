
interface FormRowProps {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  customCss?: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  customCss,
  required,
  disabled,
  accept
}: FormRowProps) => {
  return (
    <div className={`form-row ${customCss}`}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-input"
        defaultValue={defaultValue || ""}
        required={required}
        disabled={disabled}
        accept={accept}
      />
    </div>
  );
};

export default FormRow;

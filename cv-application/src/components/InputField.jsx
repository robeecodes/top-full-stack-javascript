function InputField({name, label, type, handleEditChange, value, required}) {
    return (
        <div className='input-field'>
            <label htmlFor={name}>{label}{required && ' (required)'}</label>
            <input id={name} name={name}
                   type={type}
                   value={value}
                   onChange={handleEditChange}
                   placeholder={label}
                   required={required}
            />
        </div>
    );
}

export default InputField;
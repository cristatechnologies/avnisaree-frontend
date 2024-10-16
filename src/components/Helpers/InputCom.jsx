export default function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  error = false,
  mandatory = false,
  labelClasses = "text-qgray text-[13px] font-normal",
  min,
  max,
  patternValidation,
  maxNumber,
  minNumber,
  inputHandlerOnKey,
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block  mb-2 ${labelClasses || ""}`}
          htmlFor={name}
        >
          {label}{" "}
          <span className={`${mandatory ? "text-red-600" : "hidden"}`}>*</span>
        </label>
      )}
      <div
        className={`input-wrapper border  w-full h-full overflow-hidden relative ${
          error ? "border-qred" : "border-qgray-border"
        }`}
      >
        <input
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
          onKeyUp={inputHandlerOnKey}
          className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none ${
            inputClasses || ""
          }`}
          type={type}
          id={name}
          minLength={min}
          maxLength={max}
          pattern={patternValidation}
          min={minNumber}
          max={maxNumber}
        />
        {children && children}
      </div>
    </div>
  );
}

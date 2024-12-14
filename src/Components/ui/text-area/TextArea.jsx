const TextareaField = ({label, name, value, onChange}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default TextareaField;
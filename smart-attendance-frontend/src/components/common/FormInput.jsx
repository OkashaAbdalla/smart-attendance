/**
 * Form Input Component
 * Purpose: Reusable form input with consistent styling
 */

const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
};

export default FormInput;

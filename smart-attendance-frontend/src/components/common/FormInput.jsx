/**
 * Form Input Component
 * Purpose: Reusable form input with consistent styling and error display
 */

const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, required = false, error = '' }) => {
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
        className={`w-full bg-gray-50 dark:bg-gray-700/50 border ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500/20'
        } text-gray-900 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-400 dark:placeholder-gray-500 transition`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormInput;

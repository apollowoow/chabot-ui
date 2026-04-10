export default function ChoiceButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cb:bg-white cb:border cb:border-blue-100 cb:text-blue-600 cb:px-4 cb:py-2 cb:rounded-full cb:text-xs cb:font-bold hover:cb:bg-blue-600 hover:cb:text-white cb:transition-all cb:shadow-sm"
    >
      {label}
    </button>
  );
}
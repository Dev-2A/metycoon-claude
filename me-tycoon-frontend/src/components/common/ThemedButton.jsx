// src/components/common/ThemedButton.jsx
export default function ThemedButton({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}) {
  // 버튼 스타일 지정
  const baseClass = "px-4 py-2 rounded font-semibold";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };
  
  const buttonClass = `${baseClass} ${variantClasses[variant]} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
}
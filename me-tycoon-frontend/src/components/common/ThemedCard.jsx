// src/components/common/ThemedCard.jsx
export default function ThemedCard({ children, className = "", ...props }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
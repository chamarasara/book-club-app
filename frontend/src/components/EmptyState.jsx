export default function EmptyState({ title = 'Nothing here yet', subtitle }) {
  return (
    <div className="text-center text-gray-500 py-12">
      <h3 className="text-lg font-medium">{title}</h3>
      {subtitle && <p className="mt-1">{subtitle}</p>}
    </div>
  );
}

export default function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className={`${color} rounded-lg p-6 text-white shadow`}>
      <h3 className="text-lg">{title}</h3>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
}
const Checkbox = ({ label, value, selected, setSelected }) => {
  const handleToggle = () => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm">
      <input
        type="checkbox"
        className="checkbox checkbox-xs"
        checked={selected.includes(value)}
        onChange={handleToggle}
      />

      <span className="select-none">{label}</span>
    </label>
  );
};

export default Checkbox;

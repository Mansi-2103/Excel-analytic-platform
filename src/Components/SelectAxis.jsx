function SelectAxis({ columns, onAxisChange }) {
  return (
    <div className="space-y-2">
      <select onChange={(e) => onAxisChange("x", e.target.value)}>
        <option>X-Axis</option>
        {columns.map((col) => <option key={col}>{col}</option>)}
      </select>
      <select onChange={(e) => onAxisChange("y", e.target.value)}>
        <option>Y-Axis</option>
        {columns.map((col) => <option key={col}>{col}</option>)}
      </select>
      <select onChange={(e) => onAxisChange("z", e.target.value)}>
        <option>Z-Axis (3D only)</option>
        {columns.map((col) => <option key={col}>{col}</option>)}
      </select>
    </div>
  );
}
export default SelectAxis;
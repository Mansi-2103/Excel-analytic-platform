function SelectAxis({ columns, onAxisChange, chartMode }) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* X Axis */}
      <div>
        <label className="block text-sm font-medium text-gray-700">X Axis</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          onChange={(e) => onAxisChange("x", e.target.value)}
        >
          <option value="">Select X Axis</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      {/* Y Axis */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Y Axis</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          onChange={(e) => onAxisChange("y", e.target.value)}
        >
          <option value="">Select Y Axis</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      {/* Z Axis (only if 3D is selected) */}
      {chartMode === "3D" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Z Axis</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            onChange={(e) => onAxisChange("z", e.target.value)}
          >
            <option value="">Select Z Axis</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default SelectAxis;

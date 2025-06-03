function ExcelChartApp() {
  const [excelData, setExcelData] = useState([]);
  const [axes, setAxes] = useState({ x: "", y: "", z: "" });

  const columns = excelData.length > 0 ? Object.keys(excelData[0]) : [];

  return (
    <div className="p-4 space-y-4">
      <ExcelUploader onDataParsed={setExcelData} />
      <AxisSelector columns={columns} onAxisChange={(axis, value) => setAxes({ ...axes, [axis]: value })} />
      
      {axes.x && axes.y && (
        <div>
          <h2>2D Chart</h2>
          <LineChart data={excelData} xKey={axes.x} yKey={axes.y} />
        </div>
      )}

      {axes.x && axes.y && axes.z && (
        <div>
          <h2>3D Chart</h2>
          <ThreeDChart data={excelData} xKey={axes.x} yKey={axes.y} zKey={axes.z} />
        </div>
      )}
    </div>
  );
}

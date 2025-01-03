export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-yellow-300 p-1 gap-x-2 my-6 rounded-md max-w-max"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-yellow-100 text-white border-2 border-yellow-100"
              : "bg-transparent text-white border-2 border-transparent"
          } py-2 px-5 rounded-md transition-transform duration-300 transform ${
            field === tab.type ? "scale-105" : "scale-100"
          }`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}

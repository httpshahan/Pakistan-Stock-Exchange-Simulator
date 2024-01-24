import React from "react";

const StockTable = ({ title, data }) => {
  return (
    <div className="w-fit h-full px-5 py-5 bg-white rounded-lg shadow-md flex-col justify-start items-start gap-5">
      <div className="text-center text-zinc-800  font-semibold mb-5">
        {title}
      </div>
      <div className="w-[316px] grid gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-1.5 border-b pb-2"
          >
            <div className="flex flex-col">
              <span className="text-zinc-800 text-xs font-medium">
                {item.company_name}
                <br />
                <span className="text-zinc-500 text-xs font-medium">
                  {item.stock_symbol}
                </span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-right text-zinc-800 text-sm font-normal">
                {`${item.current}`}
              </div>
              <div
                className={`text-right ${
                  item.change.startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                } text-xs font-normal`}
              >
                {`${item.change} (${item.change_percent})`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTable;

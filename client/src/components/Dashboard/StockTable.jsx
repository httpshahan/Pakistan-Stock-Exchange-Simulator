import React from "react";

const StockTable = ({ title, data }) => {
  return (
    <div className="w-auto h-full p-4 bg-white rounded-lg shadow-md flex flex-col justify-start items-start gap-4">
      <div className="text-center text-zinc-800 font-semibold mb-4">
        {title}
      </div>
      <div className="w-98 grid gap-3">
  {data.map((item, index) => (
    <div key={index} className="flex justify-between items-center border-b pb-2">
      <div className="flex flex-col">
        <a
          href={`/stock/${item.stock_symbol}`} // Replace with the actual path or URL
          className="w-auto text-zinc-800 text-xs font-medium overflow-hidden overflow-ellipsis line-clamp-1 hover:underline"
        >
          {item.company_name}
        </a>
        <a
          href={`/stock/${item.stock_symbol}`} // Replace with the actual path or URL
          className="text-zinc-500 text-xs font-medium hover:underline"
        >
          {item.stock_symbol}
        </a>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-right text-zinc-800 text-sm font-normal">
          {item.current}
        </div>
        <div className="text-right text-xs font-normal w-28">
          <span
            className={`${
              item.change.startsWith("-") ? "text-red-500" : "text-green-500"
            }`}
          >
            {`${item.change} (${item.change_percent})`}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default StockTable;

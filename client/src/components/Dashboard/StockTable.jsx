import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const StockTable = ({ title, data, type = "neutral" }) => {
  return (
    <div className="h-full p-6 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-3xl flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-1 h-5 rounded-full ${type === 'positive' ? 'bg-green-500' :
            type === 'negative' ? 'bg-red-500' :
              'bg-gray-800'
          }`} />
        <h3 className="text-gray-900 font-semibold text-lg tracking-tight">{title}</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid gap-3">
          {data.length > 0 ? (
            data.map((item, index) => {
              const isPositive = !item.change.startsWith("-");
              return (
                <div
                  key={index}
                  className="group flex justify-between items-center p-3 rounded-2xl hover:bg-white/50 border border-transparent hover:border-white/50 transition-all duration-200"
                >
                  <div className="flex flex-col gap-0.5">
                    <a
                      href={`/stock/${item.stock_symbol}`}
                      className="text-gray-900 font-semibold text-sm hover:text-black transition-colors"
                    >
                      {item.stock_symbol}
                    </a>
                    <span className="text-gray-400 text-xs font-medium max-w-[120px] truncate">
                      {item.company_name}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-gray-900 font-bold text-sm">
                      {item.current}
                    </span>
                    <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
                      }`}>
                      {isPositive ? <FaArrowUp size={8} /> : <FaArrowDown size={8} />}
                      <span>{item.change_percent}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              No stocks found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockTable;

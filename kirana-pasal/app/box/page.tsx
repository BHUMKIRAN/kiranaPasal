"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  increaseHeight,
  decreaseHeight,
  increaseWidth,
  decreaseWidth,
} from "@/lib/features/box/boxSlice";


export default function CounterBox() {
  const dispatch = useDispatch();
  const { height, width } = useSelector((state) => state.length);

  return (
    <div className="p-6 space-y-6 bg-gray-300 w-auto">
      {/* Height controls */}
      <div className="space-y-2">
        <h2 className="font-semibold">Height: {height}px</h2>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 active:bg-green-500 text-white rounded-xl 
                        active:scale-95 transition border border-2"
            onClick={() => dispatch(increaseHeight())}
          >
            +
          </button>
          <button
            className="px-4 py-2 active:bg-red-500 text-white rounded-xl 
                       active:scale-95 transition border border-2"
            onClick={() => dispatch(decreaseHeight())}
          >
            -
          </button>
        </div>
      </div>

      {/* Width controls */}
      <div className="space-y-2">
        <h2 className="font-semibold">Width: {width}px</h2>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 active:bg-green-500 text-white rounded-xl 
                        active:scale-95 transition border border-2"
            onClick={() => dispatch(increaseWidth())}
          >
            +
          </button>
          <button
            className="px-4 py-2 active:bg-red-500 text-white rounded-xl 
                       active:scale-95 transition border border-2"
            onClick={() => dispatch(decreaseWidth())}
          >
            -
          </button>
        </div>
      </div>

      {/* Dynamic box */}
      <div
        className="bg-blue-600 rounded-2xl transition-all duration-300"
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
      />
    </div>
  );
}

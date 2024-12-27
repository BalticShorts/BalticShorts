import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const PersonList = ({ data }) => {

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {data.map((person, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-start md:items-end bg-inherit p-4 border-b-2 border-black w-4/5"
          >
          <div className="flex flex-col md:items-start items-start">
            <div className="flex items-center gap-2 ">
              <div className="text-black/70 text-2xl font-bold uppercase leading-tight">
                {person.name} {person.surname}
              </div>
              <div className="text-gray-500 text-xs tracking-wide">
                {person.country}
              </div>
            </div>
            <div className="text-black/50 text-sm uppercase">{person.role}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right text-gray-500 text-xs tracking-wide">
              {person.works} DARBI
            </div>
            <div className="text-right text-gray-500 text-xs tracking-wide cursor-pointer hover:underline">
              VAIRĀK
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

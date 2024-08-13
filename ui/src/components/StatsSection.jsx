import React from "react";
import { colors, getTextColorClass } from "./colors";

const stats = [
  { id: 1, name: 'Instructors', value: '100+' },
  { id: 2, name: 'Students', value: '1500+' },
  { id: 3, name: 'Courses', value: '50+' },
];

const StatsSection = () => {
  return (
    <div className="py-6 px-0">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <dl className="flex flex-wrap justify-center lg:justify-start text-center lg:text-left w-full">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col my-4  transform transition-transform duration-500 hover:scale-110 flex-grow">
              <dd className={`order-first text-3xl font-semibold tracking-tight text-[var(--color-white)] sm:text-3xl`}>
                {stat.value}
              </dd>
              <hr className="sm:w-3/5 w-4/5 border-t-2 border-[var(--color-light-yellow)] my-2  lg:ml-0 xs:mx-auto" />
              <dt className={`text-base leading-7 text-[var(--color-white)]`}>
                {stat.name}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StatsSection;
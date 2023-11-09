"use client";

import React from "react";
import cx from "classnames";
import type { AdminData, TimespanOption } from "@/lib/types";
import GraphSection from "./GraphSection";
import { useGlobalState } from "@/lib/hooks";

const SignupGraph: React.FC<{ data: AdminData[] }> = ({ data }) => {
  const { state } = useGlobalState();
  const timeOptions: Date[] = [];
  const lastPeriodTimeOptions: Date[] = [];
  const now = new Date();
  const numDays = (() => {
    switch (state.graphTimespan) {
      case `week`:
        return 7;
      case `month`:
        return 30;
      case `3 months`:
        return 90;
      case `6 months`:
        return 180;
      case `year`:
        return 365;
    }
  })();

  for (let i = 0; i < numDays; i++) {
    timeOptions.push(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - i),
    );
    lastPeriodTimeOptions.push(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - i - numDays),
    );
  }

  const [signupData, lastPeriodSignupData] = [
    timeOptions,
    lastPeriodTimeOptions,
  ].map((period) =>
    period.reverse().map((time) => {
      const admins = data.filter((admin) => {
        const adminDate = new Date(admin.createdAt);
        return (
          adminDate.getDate() === time.getDate() &&
          adminDate.getMonth() === time.getMonth() &&
          adminDate.getFullYear() === time.getFullYear()
        );
      });
      return {
        time,
        numSignups: admins.length,
        admins,
      };
    }),
  );

  if (!signupData || !lastPeriodSignupData) return <div>Error: TODO</div>;

  const [lastPeriodSignups, thisPeriodSignups] = [
    lastPeriodSignupData,
    signupData,
  ].map((period) => period.reduce((acc, cur) => acc + cur.numSignups, 0));

  if (lastPeriodSignups === undefined || !thisPeriodSignups)
    return <div>Error: TODO</div>;

  const percentChange = Math.round(
    ((thisPeriodSignups - lastPeriodSignups) / lastPeriodSignups) * 100,
  );

  return (
    <div className="p-4 rounded-3xl border flex flex-col h-96">
      <div className="flex-grow flex justify-between bg-slate-50 rounded-3xl">
        {signupData.map((data, index) => {
          const maxHeight = 5;
          const nextData = signupData[index + 1];

          const direction =
            data.numSignups > (nextData?.numSignups ?? 0)
              ? `down`
              : data.numSignups < (nextData?.numSignups ?? 0)
              ? `up`
              : `flat`;

          return (
            <div
              className="flex flex-col justify-end w-[calc((1/7)*100%)] items-center relative -translate-y-8"
              key={data.time.toISOString() + state.graphTimespan}
            >
              {nextData && (
                <div
                  className={cx(
                    `absolute w-full left-1/2 min-h-[4px] scale-x-[102%]`,
                  )}
                  style={{
                    height: `calc(${
                      ((Math.max(data.numSignups, nextData.numSignups) -
                        Math.min(data.numSignups, nextData.numSignups)) *
                        100) /
                      maxHeight
                    }% ${direction === `flat` ? `` : `+ 4px`})`,
                    bottom: `calc(${
                      (Math.min(data.numSignups, nextData.numSignups) * 100) /
                      maxHeight
                    }% - 2px)`,
                  }}
                >
                  <GraphSection
                    className="w-full h-full"
                    direction={direction}
                  />
                </div>
              )}
              {/* <span className="translate-y-8"> */}
              {/*   {data.time.toLocaleDateString(`en-US`, { weekday: `long` })} */}
              {/* </span> */}
            </div>
          );
        })}
      </div>
      <div className="pt-6 pb-2 px-4 flex justify-between items-center gap-8">
        <div className="flex flex-col w-52">
          <span className="text-slate-500">
            {thisPeriodSignups} new signups
          </span>
          <span
            className={cx(
              `text-4xl font-semibold`,
              percentChange >= 0 ? `text-green-600` : `text-rose-500`,
            )}
          >
            {percentChange >= 0 && `+`}
            {percentChange}%
          </span>
        </div>
        <div className="flex gap-8 items-center">
          <TimespanButton option="week" />
          <TimespanButton option="month" />
          <TimespanButton option="3 months" />
          <TimespanButton option="6 months" />
          <TimespanButton option="year" />
        </div>
        <div className="w-52" />
      </div>
    </div>
  );
};

export default SignupGraph;

const TimespanButton: React.FC<{ option: TimespanOption }> = ({ option }) => {
  const { state, dispatch } = useGlobalState();
  return (
    <button
      onClick={() =>
        dispatch({ type: `graphTimespanOptionClicked`, payload: option })
      }
      className={cx(
        `capitalize hover:scale-105 px-4 py-1 rounded-lg transition-[background-color,transform,color] duration-300 active:scale-95 shrink-0`,
        state.graphTimespan === option
          ? `text-violet-700 bg-violet-100 hover:bg-violet-200 active:bg-violet-300`
          : `hover:bg-slate-50 text-slate-400 hover:text-slate-600 active:bg-slate-200`,
      )}
    >
      {option}
    </button>
  );
};

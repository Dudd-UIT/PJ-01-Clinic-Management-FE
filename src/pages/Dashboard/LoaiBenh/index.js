import React, { useState, useEffect } from "react";
import {
  ResponsiveChartContainer,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsGrid,
  ChartsTooltip,
} from "@mui/x-charts";
import { IFSelect } from "../../../component/Layout/TabLayout/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchThongKeBenhAction } from "../../../redux/action/fetchDataAction/fetchThongKeBenhAction";

// const dataset = [
//     { month: '1', year: '2024', name: 'A', frequency: 43, },
//     { month: '1', year: '2024', name: 'B', frequency: 3, },
//     { month: '1', year: '2024', name: 'C', frequency: 23, },
//     { month: '1', year: '2024', name: 'D', frequency: 41, },
//     { month: '1', year: '2024', name: 'E', frequency: 12, },
//     { month: '1', year: '2024', name: 'F', frequency: 21, },
//     { month: '1', year: '2024', name: 'G', frequency: 42, },
//     { month: '1', year: '2024', name: 'H', frequency: 22, },
//     { month: '1', year: '2024', name: 'I', frequency: 33, },

//     { month: '2', year: '2024', name: 'A', frequency: 4, },
//     { month: '2', year: '2024', name: 'B', frequency: 3, },
//     { month: '2', year: '2024', name: 'C', frequency: 23, },
//     { month: '2', year: '2024', name: 'D', frequency: 41, },
//     { month: '2', year: '2024', name: 'E', frequency: 52, },
//     { month: '2', year: '2024', name: 'F', frequency: 13, },
//     { month: '2', year: '2024', name: 'G', frequency: 22, },
//     { month: '2', year: '2024', name: 'H', frequency: 24, },
//     { month: '2', year: '2024', name: 'I', frequency: 13, },

//     { month: '3', year: '2024', name: 'A', frequency: 33, },
//     { month: '3', year: '2024', name: 'B', frequency: 2, },
//     { month: '3', year: '2024', name: 'C', frequency: 53, },
//     { month: '3', year: '2024', name: 'D', frequency: 43, },
//     { month: '3', year: '2024', name: 'E', frequency: 22, },
//     { month: '3', year: '2024', name: 'F', frequency: 11, },
//     { month: '3', year: '2024', name: 'G', frequency: 32, },
//     { month: '3', year: '2024', name: 'H', frequency: 22, },
//     { month: '3', year: '2024', name: 'I', frequency: 30, },

//     { month: '4', year: '2024', name: 'A', frequency: 13, },
//     { month: '4', year: '2024', name: 'B', frequency: 32, },
//     { month: '4', year: '2024', name: 'C', frequency: 26, },
//     { month: '4', year: '2024', name: 'D', frequency: 31, },
//     { month: '4', year: '2024', name: 'E', frequency: 32, },
//     { month: '4', year: '2024', name: 'F', frequency: 31, },
//     { month: '4', year: '2024', name: 'G', frequency: 12, },
//     { month: '4', year: '2024', name: 'H', frequency: 32, },
//     { month: '4', year: '2024', name: 'I', frequency: 3, },

//     { month: '11', year: '2023', name: 'A', frequency: 3, },
//     { month: '11', year: '2023', name: 'B', frequency: 23, },
//     { month: '11', year: '2023', name: 'C', frequency: 33, },
//     { month: '11', year: '2023', name: 'D', frequency: 21, },
//     { month: '11', year: '2023', name: 'E', frequency: 2, },
//     { month: '11', year: '2023', name: 'F', frequency: 31, },
//     { month: '11', year: '2023', name: 'G', frequency: 22, },
//     { month: '11', year: '2023', name: 'H', frequency: 12, },
//     { month: '11', year: '2023', name: 'I', frequency: 33, },

//     { month: '12', year: '2023', name: 'A', frequency: 43, },
//     { month: '12', year: '2023', name: 'B', frequency: 31, },
//     { month: '12', year: '2023', name: 'C', frequency: 2, },
//     { month: '12', year: '2023', name: 'D', frequency: 21, },
//     { month: '12', year: '2023', name: 'E', frequency: 2, },
//     { month: '12', year: '2023', name: 'F', frequency: 41, },
//     { month: '12', year: '2023', name: 'G', frequency: 12, },
//     { month: '12', year: '2023', name: 'H', frequency: 12, },
//     { month: '12', year: '2023', name: 'I', frequency: 43, },
// ];

const LoaiBenh = () => {
  const dispatch = useDispatch();
  const d = new Date();
  const defaultMonth = (d.getMonth() + 1).toString().padStart(2, "0");
  const defaultYear = d.getFullYear().toString();
  const dataset = useSelector((state) => state.tkBenh?.data) || [];
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [totalIntensityData, setTotalIntensityData] = useState([]);
  const [monthlyIntensityData, setMonthlyIntensityData] = useState([]);

  useEffect(() => {
    dispatch(fetchThongKeBenhAction());
  }, []);

  // Tính tổng cường độ cho mỗi loại bệnh trong năm được chọn
  useEffect(() => {
    if (year) {
      const yearData = dataset.filter((item) => item.YEAR === year);
      const intensityMap = {};
      const nameMap = {};
      yearData.forEach((item) => {
        if (!intensityMap[item.ID]) {
          intensityMap[item.ID] = 0;
        }
        intensityMap[item.ID] += item.FREQUENCY;

        if (!nameMap[item.ID]) {
          nameMap[item.ID] = 0;
        }
        nameMap[item.ID] = item.NAME;
      });
      const totalIntensity = Object.keys(intensityMap).map((id) => ({
        id,
        name: nameMap[id],
        totalIntensity: intensityMap[id],
      }));
      setTotalIntensityData(totalIntensity);
    }
  }, [year, dataset]);

  // Tính tổng cường độ cho mỗi loại bệnh trong từng tháng của năm được chọn
  useEffect(() => {
    if (year && month) {
      const monthlyData = dataset.filter(
        (item) => item.YEAR === year && item.MONTH === month
      );
      const intensityMap = {};
      const nameMap = {};
      monthlyData.forEach((item) => {
        if (!intensityMap[item.ID]) {
          intensityMap[item.ID] = 0;
        }
        intensityMap[item.ID] += item.FREQUENCY;

        if (!nameMap[item.ID]) {
          nameMap[item.ID] = 0;
        }
        nameMap[item.ID] = item.NAME;
      });
      const monthlyIntensity = Object.keys(intensityMap).map((id) => ({
        id,
        name: nameMap[id],
        monthlyIntensity: intensityMap[id],
      }));
      setMonthlyIntensityData(monthlyIntensity);
    }
  }, [year, month, dataset]);

  return (
    <div className="shadow rounded pt-4">
      <h2 className="d-flex justify-content-center">
        Biểu Đồ Thống Kê Loại Bệnh
      </h2>
      <div className="row d-flex justify-content-center mb-4">
        <IFSelect
          title="Tháng"
          size={1}
          options={Array.from({ length: 12 }, (_, i) => ({
            month: `${String(i + 1).padStart(2, "0")}`,
          }))}
          def={"Chọn"}
          onChange={(value) => setMonth(value === "Chọn" ? null : value)}
          value={month}
          keyObj="month"
          showObj={"month"}
        />

        <IFSelect
          title="Năm"
          size={1}
          options={[{ year: "2022" }, { year: "2023" }, { year: "2024" }]}
          def={"Chọn"}
          onChange={(value) => setYear(value === "Chọn" ? null : value)}
          value={year}
          keyObj="year"
          showObj={"year"}
        />
      </div>

      <div className="row">
        <div className="col col-md-6">
          <h4 className="d-flex justify-content-center">
            Thống kê loại bệnh trong cả năm {year}
          </h4>
          <ResponsiveChartContainer
            series={[
              {
                type: "bar",
                dataKey: "totalIntensity",
                color: "var(--sub)",
                label: "Cường độ",
              },
            ]}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "id",
                label: "Mã ICD Bệnh",
                tickLabelStyle: {
                  angle: 75,
                  textAnchor: "start",
                  fontSize: 12,
                },
                valueFormatter: (id, context) =>
                  context.location === "tick"
                    ? id
                    : `${id}. ${
                        totalIntensityData.find((d) => d.id === id)?.name
                      }`,
              },
            ]}
            yAxis={[{ label: "Tổng cường độ" }]}
            dataset={totalIntensityData}
            height={400}
            margin={{ left: 90, right: 50, bottom: 80 }}
          >
            <ChartsGrid horizontal />
            <BarPlot />
            <ChartsXAxis
              labelStyle={{
                fontSize: 14,
                translate: "0px 25px",
              }}
            />
            <ChartsYAxis
              label="Tổng cường độ"
              labelStyle={{ translate: "-25px 0px" }}
            />
            <ChartsTooltip />
          </ResponsiveChartContainer>
        </div>
        {month && (
          <div className="col col-md-6">
            <h4 className="d-flex justify-content-center">
              Thống kê loại bệnh trong tháng {month}/{year}
            </h4>
            <ResponsiveChartContainer
              series={[
                {
                  type: "bar",
                  dataKey: "monthlyIntensity",
                  color: "var(--sub)",
                  label: "Cường độ",
                },
              ]}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "id",
                  label: "Mã ICD Bệnh",
                  tickLabelStyle: {
                    angle: 75,
                    textAnchor: "start",
                    fontSize: 12,
                  },
                  valueFormatter: (id, context) =>
                    context.location === "tick"
                      ? id
                      : `${id}. ${
                          totalIntensityData.find((d) => d.id === id)?.name
                        }`,
                },
              ]}
              yAxis={[{ label: "Cường độ trong tháng" }]}
              dataset={monthlyIntensityData}
              height={400}
              margin={{ left: 90, right: 50, bottom: 80 }}
            >
              <ChartsGrid horizontal />
              <BarPlot />
              <ChartsXAxis
                labelStyle={{
                  fontSize: 14,
                  translate: "0px 25px",
                }}
              />
              <ChartsYAxis
                label="Cường độ trong tháng"
                labelStyle={{ translate: "-25px 0px" }}
              />
              <ChartsTooltip />
            </ResponsiveChartContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoaiBenh;

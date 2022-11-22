import { Divider, Grid, Typography } from "@mui/material";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

const PropertyBarChart = (props) => {
  const { title, xAxisData, yAxis, name, type, data } = props;

  return (
    <div style={{ marginTop: "20px" }}>
      <Divider />
      <ReactEcharts
        option={{
          title: {
            text: title,
          },
          tooltip: {},
          xAxis: {
            data: xAxisData,
          },
          yAxis: {},
          series: [
            {
              name: name,
              type: type,
              data: data,
            },
          ],
        }}
      />
    </div>
  );
};

export default PropertyBarChart;

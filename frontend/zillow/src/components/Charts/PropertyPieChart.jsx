import { Divider } from "@mui/material";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

const PropertyPieChart = (props) => {
  const { data, title } = props;

  console.log(data, title);

  return (
    <div style={{ marginTop: "20px" }}>
      <Divider />
      <ReactEcharts
        option={{
          title: {
            text: title,
          },
          series: [
            {
              name: title,
              type: "pie",
              data: data,
            },
          ],
        }}
      />
    </div>
  );
};

export default PropertyPieChart;

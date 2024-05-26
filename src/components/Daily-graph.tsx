import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "1日",
  "2日",
  "3日",
  "4日",
  "5日",
  "6日",
  "7日",
  "8日",
  "9日",
  "10日",
  "11日",
  "12日",
  "13日",
  "14日",
  "15日",
  "16日",
  "17日",
  "18日",
  "19日",
  "20日",
  "21日",
  "22日",
  "23日",
  "24日",
  "25日",
  "26日",
  "27日",
  "28日",
  "29日",
  "30日",
  "31日",
];

export const data = {
  labels,
  datasets: [
    {
      label: "5月の日別学習時間",
      data: [300, 200, 350, 125, 360, 60, 300, 340, 360, 500],
      backgroundColor: "#ff9100",
    },
  ],
};

export function dailyGraph() {
  return <Bar options={options} data={data} />;
}
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
import { useStudyHours } from "./Contexts/StudyTimeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function DailyGraph() {
  const { calcMonthlyTotalMins } = useStudyHours();

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

  const today = new Date();
  const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const numberDate = lastDate.getDate();
  const labels = [];
  for (let i = 1; i <= numberDate; i++) {
    const date = `${i}日`;
    labels.push(date);
  }

  const data = {
    labels,
    datasets: [
      {
        label: `${today.getMonth() + 1}月の日別学習時間`,
        data: calcMonthlyTotalMins,
        backgroundColor: "#ff9100",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

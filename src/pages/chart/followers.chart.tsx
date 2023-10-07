
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FollowersUserData } from '../../interfaces/user/follower'; 


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


// Registra los elementos de Chart.js que necesitas
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const FollowersChart = ({ data }: { data: FollowersUserData[] }) => {
  const [followerCounts, setFollowerCounts] = useState<number[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const counts: number[] = [];
      const names: string[] = [];

      for (const user of data) {
        try {
          const response = await fetch(user.followers_url);
          if (response.ok) {
            const followers = await response.json();
            counts.push(followers.length);
            names.push(user.login);
          }
        } catch (error) {
          console.error(`Error fetching data for ${user.login}: ${error}`);
        }
      }

      setFollowerCounts(counts);
      setUsernames(names);
    };

    fetchData();
  }, [data]);

  const chartData = {
    labels: usernames,
    datasets: [
      {
        label: 'Followers Count',
        data: followerCounts,
        backgroundColor: '#60A5FA', 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Followers Chart',
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

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
      try {
        const promises = data.map(async (user) => {
          const response = await fetch(user.followers_url);
          if (response.ok) {
            const followers = await response.json();
            return followers.length;
          } else {
            throw new Error(`Error fetching data for ${user.login}`);
          }
        });

        const counts = await Promise.all(promises);
        const names = data.map((user) => user.login);

        setFollowerCounts(counts);
        setUsernames(names);
      } catch (error) {
        console.error(error);
      }
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

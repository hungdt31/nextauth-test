import axios from 'axios'
import { GitPullRequest, TabletSmartphone, Code } from 'lucide-react'
import { ForwardRefExoticComponent } from 'react'
import { LucideProps } from 'lucide-react'
import { RefAttributes } from 'react'

const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

const UNSPLASH_ROOT = 'https://api.unsplash.com'

export const getPhotosByCollection = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/collections?client_id=${clientId}&per_page=3&page=1`
  )
  return data
}

export const getPhotosOrderByPopular = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/photos?client_id=${clientId}&order_by=popular&per_page=5&page=1`
  )
  return data
}

export const getUsers = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/search/users?query=tr&client_id=${clientId}&per_page=3`
  )
  return data.results
}
export const getTheRestUsers = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/search/users?query=tr&client_id=${clientId}&per_page=5&page=2`
  )
  return data.results
}
interface StatDevelopers {
  totalLabel: string,
  total: number,
  monthLabel: string,
  month: number,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
export const getStatMonth = async () => {
  let data = null;

  try {
    const { data: monthData } = await axios.get(
      `${UNSPLASH_ROOT}/stats/month?client_id=${clientId}`
    );
    const { data: totalData } = await axios.get(
      `${UNSPLASH_ROOT}/stats/total?client_id=${clientId}`
    );

    data = {
      ...monthData,
      ...totalData
    };
  } catch (error) {
    console.error('Error fetching data from API, using fallback data.', error);

    data = {
      developers: 546680,
      applications: 25155,
      requests: 191284511079,
      new_developers: 8990,
      new_applications: 34,
      new_requests: 1513227041
    };
  }

  const result: StatDevelopers[] = [
    {
      totalLabel: "All-time API requests",
      total: data.requests,
      monthLabel: "API requests this month",
      month: data.new_requests,
      icon: GitPullRequest
    },
    {
      totalLabel: "API applications",
      total: data.applications,
      monthLabel: "Applications released this month",
      month: data.new_applications,
      icon: TabletSmartphone
    },
    {
      totalLabel: "Developers",
      total: data.developers,
      monthLabel: "New developers this month",
      month: data.new_developers,
      icon: Code
    }
  ];

  return result;
};
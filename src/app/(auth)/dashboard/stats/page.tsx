import { getStats } from "@/app/lib/data/externalAPIgetters";
import ChartsContainer from "@/components/ChartsContainer";
import StatsContainer from "@/components/StatsContainer";

const Page = async () => {
  const stats = await getStats();

  const { jobStatusStats, monthlyApplicationStats, maxCount } = stats?.data;



  return (
    <>
      <StatsContainer data={jobStatusStats} />
      {monthlyApplicationStats.length ? (
        <ChartsContainer
          data={
            monthlyApplicationStats.length > 6
              ? monthlyApplicationStats.slice(0, 6)
              : monthlyApplicationStats
          }
          count={maxCount}
        />
      ) : null}
    </>
  );
};

export default Page;

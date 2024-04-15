import { useEffect, useState } from "react";
import { ChartWidgetComponent } from "../../components/Widget/index";

export const WindowPatchComponent = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const fetchedData = {
          windowsPatchTrend: {
            dates: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"],
            data: [
              {
                name: "On-Prem",
                values: [0, 0, 0, 0],
              },
              {
                name: "Cloud",
                values: [0, 0, 0, 0],
              },
              {
                name: "Total",
                values: [0, 0, 0, 0],
              },
            ],
          },
        };
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const series = {
    xAxis: data && data?.windowsPatchTrend?.dates,
    data:
      data &&
      data?.windowsPatchTrend?.data?.map((a, i) => ({
        name: a.name,
        value: a.values,
        type: i % 2 === 0 ? "line" : "bar",
      })),
  };

  return (
    <div>
      <ChartWidgetComponent
        type="line"
        title="Window Patch Trend"
        isLoading={loading}
        series={series || []}
        color={["#B1985E", "#008080", "#77B489", "#B57432", "#2E85D9"]}
        max={100}
      />
    </div>
  );
};

export const LinuxPatchComponent = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const fetchedData = {
          linuxPatchTrend: {
            dates: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"],
            data: [
              {
                name: "On-Prem",
                values: [0, 0, 0, 0],
              },
              {
                name: "Cloud",
                values: [0, 0, 0, 0],
              },
              {
                name: "Total",
                values: [0, 0, 0, 0],
              },
            ],
          },
        };
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const series = {
    xAxis: data && data?.linuxPatchTrend?.dates,
    data:
      data &&
      data?.linuxPatchTrend?.data?.map((a, i) => ({
        name: a.name,
        value: a.values,
        type: i % 2 === 0 ? "line" : "bar",
      })),
  };

  return (
    <div>
      <ChartWidgetComponent
        type="line"
        title="Linux Patch Trend"
        series={series || []}
        isLoading={loading}
        color={["#B1985E", "#008080", "#77B489", "#B57432", "#2E85D9"]}
        max={100}
      />
    </div>
  );
};

export const CompliantComponent = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const fetchedData = {
          compliantAndNoncompliantTrend: {
            dates: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"],
            data: [
              {
                name: "Compliant",
                values: [0, 0, 0, 0],
              },
              {
                name: "Non-Compliant",
                values: [0, 0, 0, 0],
              },
              {
                name: "Total",
                values: [0, 0, 0, 0],
              },
            ],
          },
        };
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const series = {
    xAxis: data && data?.compliantAndNoncompliantTrend?.dates,
    data:
      data &&
      data?.compliantAndNoncompliantTrend?.data?.map((a, i) => ({
        name: a.name,
        value: a.values,
        type: i % 2 === 0 ? "line" : "bar",
      })),
  };

  return (
    <div>
      <ChartWidgetComponent
        type="line"
        title="Compliant Vs Non Compliant"
        isLoading={loading}
        series={series || []}
        color={["#B1985E", "#008080", "#77B489", "#B57432", "#2E85D9"]}
        max={100}
      />
    </div>
  );
};

export const WindowComplianceComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const fetchedData = {
          WindowsPatchingCompliance: {
            dates: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"],
            data: [
              {
                name: "Patch Compliant",
                values: [0, 0, 0, 0],
              },
            ],
          },
        };
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const series = {
    xAxis: data && data?.WindowsPatchingCompliance?.dates,
    data:
      data &&
      data?.WindowsPatchingCompliance?.data?.map((a, i) => ({
        name: a.name,
        value: a.values,
        type: i % 2 === 0 ? "line" : "bar",
      })),
  };

  return (
    <div>
      <ChartWidgetComponent
        type="line"
        title="Window Patch Compliance"
        isLoading={loading}
        series={series || []}
        color={["#B1985E", "#008080", "#77B489", "#B57432", "#2E85D9"]}
        max={100}
      />
    </div>
  );
};

export const LinuxComplianceComponent = () => {


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const fetchedData = {
          LinuxPatchingCompliance: {
            dates: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"],
            data: [
              {
                name: "Patch Compliant",
                values: [0, 0, 0, 0],
              },
            ],
          },
        };
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const series = {
    xAxis: data && data?.LinuxPatchingCompliance?.dates,
    data:
      data &&
      data?.LinuxPatchingCompliance?.data?.map((a, i) => ({
        name: a.name,
        value: a.values,
        type: i % 2 === 0 ? "line" : "bar",
      })),
  };

  return (
    <div>
      <ChartWidgetComponent
        type="line"
        isLoading={loading}
        title="Linux Patch Compliance"
        series={series || []}
        color={["#B1985E", "#008080", "#77B489", "#B57432", "#2E85D9"]}
        max={100}
      />
    </div>
  );
};

export const LastPatchedComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const fetchedData = {
          last_patched_aging_chart: {
            data: [
              {
                name: "Windows",
                percentage: [0, 0, 0, "69.81", "30.19"],
                values: [0, 0, 0, 1649, 713],
              },
              {
                name: "Linux",
                percentage: [0, 0, 0, "99.23", "0.77"],
                values: [0, 0, 0, 1803, 14],
              },
            ],
            days: ["0-30 Days", "31-60 Days", "61-90 Days", "> 90 Days", "No Data"],
          },
        };
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ChartWidgetComponent
        type="bar"
        title="Last Patched - Aging Chart (Count)"
        isLoading={loading}
        series={{
          xAxis: data?.last_patched_aging_chart?.days || [],
          data: [
            ...(data?.last_patched_aging_chart?.data?.map((item, index) => ({
              name: item.name,
              value: item.percentage || [],
              type: index % 2 === 0 ? "line" : "bar",
            })) || []),
          ],
          percentCount: data?.last_patched_aging_chart?.data?.[0]?.values?.map((item, index) => [
            item,
            data?.last_patched_aging_chart?.data?.[1]?.values[index],
          ]),
        }}
        color={["#008080", "#77B489"]}
        max={100}
      />
    </div>
  );
};

export const LastRebootedComponent = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        const fetchedData = {
          last_patched_aging_chart: {
            data: [
              {
                name: "Windows",
                percentage: [0, 0, 0, "69.81", "30.19"],
                values: [0, 0, 0, 1649, 713],
              },
              {
                name: "Linux",
                percentage: [0, 0, 0, "99.23", "0.77"],
                values: [0, 0, 0, 1803, 14],
              },
            ],
            days: ["0-30 Days", "31-60 Days", "61-90 Days", "> 90 Days", "No Data"],
          },
        };
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ChartWidgetComponent
        type="bar"
        isLoading={loading}
        title="Last Patched - Aging Chart (Count)"
        series={{
          xAxis: data?.last_patched_aging_chart?.days || [],
          data: [
            ...(data?.last_patched_aging_chart?.data?.map((item, index) => ({
              name: item.name,
              value: item.percentage || [],
              type: index % 2 === 0 ? "line" : "bar",
            })) || []),
          ],
          percentCount: data?.last_patched_aging_chart?.data?.[0]?.values?.map(
            (item, index) => [item, data?.last_patched_aging_chart?.data?.[1]?.values[index]],
          ),
        }}
        color={["#008080", "#77B489"]}
        max={100}
      />
    </div>
  );
};

import React, { useEffect, useState, memo } from "react";

import LoaderInline from "@jetbrains/ring-ui-built/components/loader-inline/loader-inline";
import Banner from "@jetbrains/ring-ui-built/components/banner/banner";
import Toggle from "@jetbrains/ring-ui-built/components/toggle/toggle";
import Avatar from "@jetbrains/ring-ui-built/components/avatar/avatar";
import { H1 } from "@jetbrains/ring-ui-built/components/heading/heading";

const AppComponent = () => {
  const [host, setHost] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const ytApp = await (window as any).YTApp.register();
      setHost(ytApp);

      try {
        const projectsResponse = await ytApp.fetchYouTrack(
          "admin/projects?fields=name,shortName,iconUrl,description,archived"
        );
        console.log("Fetched projects:", projectsResponse);
        setProjects(projectsResponse);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }

      try {
        const { flag: savedFlag } = await ytApp.fetchApp("backend/flag", {
          scope: false,
        });

        setFlag(savedFlag ?? false);
      } catch (error) {
        console.error("Failed to fetch flag:", error);
        setFlag(false);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleToggle = async (newFlag: boolean) => {
    setFlag(newFlag);

    try {
      await host.fetchApp("backend/flag", {
        method: "POST",
        body: JSON.stringify({ flag: newFlag }),
        headers: { "Content-Type": "application/json" },
        scope: false,
      });
    } catch (error) {
      console.error("Failed to update flag:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <LoaderInline />
      ) : (
        <>
          <H1>Test Management</H1>
          <h3>Available Projects:</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {" "}
            {/* Container for stacked banners */}
            {projects.map((project) => (
              <Banner key={project.id}>
                {" "}
                {/* Use 'info' type for neutral banner; adjust to 'success'/'warning' if needed */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                  }}
                >
                  <Avatar
                    src={
                      project.iconUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/2/2d/JetBrains_company_logo.svg"
                    }
                    title={project.name}
                    size={32}
                    style={{ flexShrink: 0 }} // Retain flex behavior
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {" "}
                    {/* Column for title + desc, but desc is row */}
                    <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                      {project.name} ({project.shortName})
                    </div>
                    <div
                      style={{
                        fontSize: "small",
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <span>
                        Description: {project.description || "Not Available"}
                      </span>
                      <span>Archived: {project.archived ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </Banner>
            ))}
          </div>

          <h3>Test Flag:</h3>
          <Toggle
            checked={flag}
            onChange={(e) => handleToggle(e.target.checked)}
          >
            {flag ? "Enabled" : "Disabled"}
          </Toggle>
        </>
      )}
    </div>
  );
};

export const App = memo(AppComponent);

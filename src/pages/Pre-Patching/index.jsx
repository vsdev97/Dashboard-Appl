import React from "react";
import { TableComponent } from "../../components/Table";

const PrePatchng = () => {
  const columns = [
    { key: "site_name", name: "Site Name" },
    { key: "site_code", name: "Site Code" },
    { key: "site_manager", name: "Site Manager" },
    { key: "division", name: "Division" },
    { key: "city", name: "City" },
    { key: "country", name: "Country" },
    { key: "handbook_status", name: "Handbook Status" },
    { key: "comments", name: "Comments" },
  ];

  const rows = [
    {
      site_name: "Persian",
      site_code: "Salmon",
      site_manager: "-",
      division: "Life",
      city: "New York",
      country: "USA",
      handbook_status: "Does Not Exist",
      comments: "Sales Office, Consumer",
    },
    {
      site_name: "Siamese",
      site_code: "Tuna",
      site_manager: "-",
      division: "Auto",
      city: "Los Angeles",
      country: "USA",
      handbook_status: "Active",
      comments:
        "Manufacturing Plant for Consumer Products  (repackage of products) and Automotive Operations",
    },
    {
      site_name: "Maine Coon",
      site_code: "Trout",
      site_manager: "-",
      division: "HCS",
      city: "Chicago",
      country: "USA",
      handbook_status: "Verified",
      comments:
        "A smaller number of Sales representatives are present from Site is mainly for DTS. Lifestyle and Auto",
    },
    {
      site_name: "Sphynx",
      site_code: "Catfish",
      site_manager: "-",
      division: "Life, Corp",
      city: "Houston",
      country: "USA",
      handbook_status: "Does Not Exist",
      comments: "Sales Office, Consumer",
    },
    {
      site_name: "Bengal",
      site_code: "Marlin",
      site_manager: "-",
      division: "Pro",
      city: "Miami",
      country: "USA",
      handbook_status: "Active",
      comments: "Manufacturing Plant for Electronics",
    },
    {
      site_name: "Ragdoll",
      site_code: "Bass",
      site_manager: "-",
      division: "DTS, Auto",
      city: "San Francisco",
      country: "USA",
      handbook_status: "Verified",
      comments: "DTS Center",
    },
    {
      site_name: "Scottish Fold",
      site_code: "Pike",
      site_manager: "-",
      division: "Life, Auto",
      city: "Seattle",
      country: "USA",
      handbook_status: "Does Not Exist",
      comments: "Sales Office, Consumer Electronics",
    },
    {
      site_name: "British Shorthair",
      site_code: "Walleye",
      site_manager: "-",
      division: "Corp, Life",
      city: "Boston",
      country: "USA",
      handbook_status: "Active",
      comments: "Distribution Center",
    },
    {
      site_name: "Persian",
      site_code: "Bluefish",
      site_manager: "-",
      division: "Corp, Life",
      city: "Austin",
      country: "USA",
      handbook_status: "Verified",
      comments: "Manufacturing Plant",
    },
    {
      site_name: "Siamese",
      site_code: "Carp",
      site_manager: "-",
      division: "Life",
      city: "Portland",
      country: "USA",
      handbook_status: "Does Not Exist",
      comments: "Sales Office, Consumer Electronics",
    },
    {
      site_name: "Maine Coon",
      site_code: "Salmon",
      site_manager: "-",
      division: "Corp",
      city: "Denver",
      country: "USA",
      handbook_status: "Active",
      comments: "Research & Development Center",
    },
    {
      site_name: "Siberian",
      site_code: "Trout",
      site_manager: "-",
      division: "HCS",
      city: "Dallas",
      country: "USA",
      handbook_status: "Verified",
      comments: "Manufacturing Plant for Automotive",
    },
    {
      site_name: "Russian Blue",
      site_code: "Sturgeon",
      site_manager: "-",
      division: "Corp, Life",
      city: "Las Vegas",
      country: "USA",
      handbook_status: "Does Not Exist",
      comments: "Sales Office, Consumer Goods",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col" style={{ height: "100vh" }}>
      <div
        style={{
          height: "65px",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "600" }}>Pre-Patching</span>
      </div>
      <div
        style={{
          height: "calc(100vh - 130px)",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          padding: "10px",
          overflowY: "scroll",
        }}
      >
        <div>
          <TableComponent columns={columns} rows={rows} />
        </div>
      </div>
    </div>
  );
};
export default PrePatchng;

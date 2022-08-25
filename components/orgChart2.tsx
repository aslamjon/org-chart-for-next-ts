import React from "react";
import { get } from "lodash";
import dynamic from "next/dynamic";
import "react-orgchart/dist/ChartContainer.css";
import "react-orgchart/dist/ChartNode.css";

let OrganizationChart: any;

if (process.browser) OrganizationChart = dynamic(() => import("react-orgchart/dist/ChartContainer"));

const OrgChart = ({ data }) => {
  const renderNode = ({ nodeData }) => {
    return (
      <div className="org-node-container">
        {/* <div
          className="open-user-details"
          onClick={() => {
            window.open("https://h65cz.csb.app/");
          }}
        >
          <ExternalLink size={14} />
        </div> */}
        <div className="org-person">
          <img src="avatar.svg" alt="" width={50} />
        </div>
        <div className="org-name">{get(nodeData, "person.name", get(nodeData, "name", ""))}</div>
        <div className="org-title">{get(nodeData, "person.last_name", get(nodeData, "last_name", ""))}</div>
        {/* <div className="org-title">Data unclassified: {nodeData.data_unclassified}</div> */}
        {/* <div className="org-title">compliance: {nodeData.compliance}</div> */}
        {get(nodeData, "children", []).length > 0 && (
          <div
            className="org-node-children"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let childNodes = document.getElementById(nodeData.id).parentElement.childNodes;
              if (childNodes[1].className.includes("hidden")) {
                childNodes[0].className = "oc-node";
                childNodes[1].className = "";
              } else {
                childNodes[0].className = "oc-node isChildrenCollapsed";
                childNodes[1].className = "hidden";
              }
            }}
          >
            {nodeData.children.length} Reportees
          </div>
        )}
      </div>
    );
  };
  return (
    process.browser && (
      <OrganizationChart
        datasource={data}
        chartClass="sekure-org-chart"
        pan={true}
        zoom={true}
        zoominLimit={2}
        NodeTemplate={renderNode}
        onClickNode={(e: object) => {
          console.log(e);
        }}
      />
    )
  );
};

export default OrgChart;

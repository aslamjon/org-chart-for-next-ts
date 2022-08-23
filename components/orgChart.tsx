import dynamic from "next/dynamic";
import { get } from "lodash";
import React from "react";
import employee from "../pages/Employees.json";

let OrgChart: any;

if (process.browser) OrgChart = dynamic(() => import("react-org-chart-for-next"));

function listToTree(arr: any) {
  console.log('dsf', arr.length)
  let map = {},
    node,
    roots = [],
    i
  for (i = 0; i < arr.length; i++) {
    map[arr[i].id] = i
    arr[i].children = []
  }
  for (i = 0; i < arr.length; i++) {
    node = arr[i]
    if (node.line_manager_id !== null) {
      arr[map[node.line_manager_id]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}


let data = {
  "id": "05247ea3-c2d2-46d3-af67-ea8a6515e7f5",
  "person": {
    "id": "05247ea3-c2d2-46d3-af67-ea8a6515e7f5",
    "name": "Cynthia Aliaga",
    "last_name": "Aliaga",
    "title": "Founder",
    "location": "Netherlands",
    "start_date": "2021-11-24T01:51:05.222Z",
    "corporate_email": "cynthia@givver.io",
    "totalReports": 1,
    "department": "Management"
  },
  "name": "Cynthia Aliaga",
    "last_name": "Aliaga",
  "line_manager_id": null,
  "personal_linkedin": null,
  "personal_twitter": null,
  "status": 1,
  children: [
    {
      "id": "529b2b02-7fb8-4f14-9a42-b9069a989bbc",
      "person": {
        "id": "529b2b02-7fb8-4f14-9a42-b9069a989bbc",
        "name": "Matthew Boyle",
        "last_name": "Boyle",
        "title": "Senior Software Engineer",
        "location": "UK",
        "start_date": "2021-06-12T14:03:51.291Z",
        "corporate_email": "matthew.boyle@givver.io",
        "totalReports": 2
      },
      "line_manager_id": "05247ea3-c2d2-46d3-af67-ea8a6515e7f5",
      "personal_linkedin": null,
      "personal_twitter": null,
      "status": 1,
      "department": {
        "id": "bd1b117b-751d-4e26-9e60-58ac05e7e7ea",
        "name": "engineering"
      }
      ,
      "children": [
        {
      "id": "529b2b02-7fb8-4f14-9a42-b9069a989bb2",
      "person": {
        "id": "529b2b02-7fb8-4f14-9a42-b9069a989bbc",
        "name": "Matthew Boyle22222",
        "last_name": "Boyle",
        "title": "Senior Software Engineer",
        "location": "UK",
        "start_date": "2021-06-12T14:03:51.291Z",
        "corporate_email": "matthew.boyle@givver.io",
        "totalReports": 2
      },
      "line_manager_id": "05247ea3-c2d2-46d3-af67-ea8a6515e7f5",
      "personal_linkedin": null,
      "personal_twitter": null,
      "status": 1,
      "department": {
        "id": "bd1b117b-751d-4e26-9e60-58ac05e7e7ea",
        "name": "engineering"
      }
    }
      ]
    },
  ],
}
// console.log(employee, data);

class UnicefReactOrgChart extends React.Component<
{},
{
  tree: any;
  config: any;
  highlightPostNumbers: any;
  downloadingChart: boolean;
}
>  {
  constructor(props: object) {
    super(props);

    this.state = {
      tree: data,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    };
  }

  getChild = (id: number) => {
    switch (id) {
      case 100:
        // return tree1;
      // case 36:
      //   return tree2;
      // case 56:
      //   return tree3;
      // case 25:
      //   return tree4;
      default:
        return console.log("no children");
    }
  };

  getParent = (d: object) => {
    let id = get(d, "id");
    if (id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: "avatar.svg",
          department: "",
          name: "Pascal ruth",
          title: "Member",
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      };
    } else if (id === 500) {
      return {
        id: 1,
        person: {
          id: 1,
          avatar: "avatar.svg",
          department: "",
          name: "Bryce joe",
          title: "Director",
          totalReports: 1,
        },
        hasChild: false,
        hasParent: false,
        children: [d],
      };
    } else {
      return d;
    }
  };

  handleDownload = () => {
    this.setState({ downloadingChart: false });
  };

  handleOnChangeConfig = (config: object) => {
    this.setState({ config: config });
  };

  handleLoadConfig = () => this.state.config;

  // componentDidMount() {
  //   // console.log("componentDidMount", this.state);
  // }

  render() {
    //For downloading org chart as image or pdf based on id
    const downloadImageId = "download-image";
    const downloadPdfId = "download-pdf";
    return (
      <>
        <div className="zoom-buttons">
          <button className="btn btn-outline-primary zoom-button" id="zoom-in">
            +
          </button>
          <button className="btn btn-outline-primary zoom-button" id="zoom-out">
            -
          </button>
        </div>
        <div className="download-buttons">
          <button className="btn btn-outline-primary" id="download-image">
            Download as image
          </button>
          <button className="btn btn-outline-primary" id="download-pdf">
            Download as PDF
          </button>
          {/* <a className="github-link" href="https://github.com/unicef/react-org-chart">
            Github
          </a> */}
          {get(this, "state.downloadingChart", false) && <div>Downloading chart</div>}
        </div>
        <OrgChart
          tree={this.state.tree}
          // tree={get(this, "state.tree",{})}
          downloadImageId={downloadImageId}
          downloadPdfId={downloadPdfId}
          onConfigChange={(config: object) => {
            // console.log("config", config);
            this.handleOnChangeConfig(config);
          }}
          loadConfig={(d: any) => {
            // console.log("loadConfig", d);
            let configuration = this.handleLoadConfig();
            if (configuration) {
              return configuration;
            }
          }}
          downlowdedOrgChart={(d: any) => {
            this.handleDownload();
          }}
          loadImage={(d: any) => {
            return Promise.resolve("avatar.svg");
          }}
          loadParent={(d: any) => {
            console.log("loadParent", d);
            const parentData = this.getParent(d);
            return parentData;
          }}
          loadChildren={(d: any) => {
            console.log("loadChildren", d);
            const childrenData = this.getChild(d.id);
            return childrenData;
          }}
        />
      </>
    );
  }
}

export default UnicefReactOrgChart;
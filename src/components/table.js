import React from "react";
import USWDS from "uswds/src/js/components";
// tslint:disable-next-line:no-submodule-imports
// import '@cmsgov/design-system-core/dist/index.css';
// tslint:disable-next-line:no-submodule-imports
import '@cmsgov/design-system/dist/css/index.css';
const { table } = USWDS;

// const API_KEY =
//   process.env.NODE_ENV === "development" && process.env.REACT_APP_FORMIO_API;
 const Spinner = () => {
    return (
      <div
        className="ds-u-display--flex ds-u-justify-content--center ds-u-align-items--center"
        style={{ position: 'absolute', width: '100%', height: '100%', top: '0', right: '24rem' }}
      >
        <span
          className="ds-c-spinner ds-c-spinner--filled ds-u-fill--background-inverse ds-u-color--base-inverse"
          aria-valuetext="Loading"
          role="progressbar"
        />
      </div>
    );
  };

const TableRows = ({ data }) => {
  let tableData = [];
  data.forEach((item) => {
    tableData.push(item.data);
  });

  return tableData.map((item, index) => {
    console.log(item);
    return (
        <tr>
          {Object.keys(item).map((k, i) => {
            return <td key={i}>{item[k]}</td>
          })}
        </tr>
    );
  });
};

function DataTable(props) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const ref = document.body;

  const getTestData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://dev-portal.fs.gsa.gov/dev/federalistapp/submission`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          "x-token": process.env.REACT_APP_FORMIO_TOKEN,
          // 'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      }
    );
    //   return response.json(); // parses JSON response into native JavaScript objects
    // }
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getTestData();
    // initialize
    table.on(ref);
    // remove event listeners when component un-mounts.
    return () => {
      table.off();
    };
  }, [ref]);

  return (
    <div className="ds-u-padding--2" style={{ position: 'relative' }}>
      <div className="usa-table-container--scrollable usa-table--striped">
        <table className="usa-table usa-table--borderless">
          <caption>Form Service Data</caption>
          <thead>
            <tr>
              <th data-sortable scope="col" role="columnheader">
                First Name
              </th>
              <th data-sortable scope="col" role="columnheader">
                Last Name
              </th>
              <th data-sortable scope="col" role="columnheader">
                Address
              </th>
              <th data-sortable scope="col" role="columnheader">
                Occupation
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              <TableRows data={data} />
            ) : (
              <div>No Fetched Data {data?.error}</div>
            )}
          </tbody>
        </table>
        <div
          className="usa-sr-only usa-table__announcement-region"
          aria-live="polite"
        />
      </div>
      <button className="usa-button usa-button--big usa-button--unstyled" onClick={getTestData}>REFRESH DATA</button>
      {loading && <Spinner />}
    </div>
  );
}

export default DataTable;

import React, { useState, useEffect } from 'react';

export const FetchData = ({ pair, interval, toggle}) => {

  const [resultsArr, setResultsArr] = useState([]);

  useEffect(() => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.kraken.com/0/public/OHLC?pair=" + String(pair) + "&interval=" + String(interval)
    //const XRPUrl = "https://api.kraken.com/0/public/OHLC?pair=XRPUSD&interval=1"
    fetch(proxy + url)
      .then(res => res.json())
      .then(
        (result) => {
          setResultsArr(result.result[pair]);
        }
      ) 
  }, [])
  
  resultsArr.forEach(sect => {
    var date = new Date(sect[0] * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2)
    sect[0] = formattedTime
  })

    return (
      <>
        <span onClick={() => toggle()} >&#8592; Back</span>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Time</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>VWAP</th>
              <th>Volume</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {
              resultsArr.map(sect => {
                return (
                  <tr key={sect[0]}>
                    {sect.map((data, id) => {
                      return (
                        <td key={data + id}>{data}</td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
    );
}


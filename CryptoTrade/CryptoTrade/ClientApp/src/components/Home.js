import React, {useState, useEffect} from 'react';
import { FetchData } from './FetchData';

export const Home = () => {

  const [showData, setShowData] = useState(false);
  const [selectedPair, setSelectedPair] = useState('');
  const [resultsArr, setResultsArr] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(1);

  useEffect(() => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url ="https://api.kraken.com/0/public/AssetPairs"
    fetch(proxy + url)
      .then(res => res.json())
      .then(
        (result) => {
          setResultsArr(result.result);
        }
      ) 
  }, [])

  const toggleShowData = () => {
    setShowData(!showData)
  }

  const handleClick = (pair) => {
    setSelectedPair(pair)
    toggleShowData()
  }

  return (
    <>
      {!showData && (
        <select onChange={e => {setSelectedInterval(e.target.value)}}>
          <option value={1}>1m</option>
          <option value={5}>5m</option>
          <option value={15}>15m</option>
          <option value={30}>30m</option>
          <option value={60}>1h</option>
          <option value={360}>6h</option>
          <option value={1440}>24h</option>
        </select>
      )}
      {!showData ?
        (Object.keys(resultsArr).map(pair => 
          {
            if (pair.includes("USD")) {
              return (
                <p onClick={() => handleClick(pair)} key={pair}>{pair}</p>
              )
            }
        })) : (
          <FetchData pair={selectedPair} interval={selectedInterval} toggle={toggleShowData} />
        )
      }
    </>
  );

}

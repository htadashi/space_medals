import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import {getLevelsCompleted} from '../services/ethernautAward'

const LevelsMessage = () => {

  const [levelsCompleted, setLevelsCompleted] = useState();
  const [selectedMetamaskAddress, setMetamaskAddress] = useState();
  
  useEffect(() => {

    if (window.ethereum) {
      setMetamaskAddress(window.ethereum.selectedAddress);      
      window.ethereum.on("accountsChanged", accounts => {
        setMetamaskAddress(accounts[0]);   
        getLevelsCompleted(accounts[0])
        .then(data => {
          setLevelsCompleted(data);
        });                   
      });      
    }
  }, []);

    
  return (
    <div>      
      <Alert variant="dark"> 👛 <b>Wallet</b>: {selectedMetamaskAddress} </Alert>
      <Alert variant="light"> 🧗🏻‍♂️ <b>Levels completed</b>: {levelsCompleted}</Alert>       
    </div>
  )
}

export default LevelsMessage
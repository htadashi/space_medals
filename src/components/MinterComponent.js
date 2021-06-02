import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import LevelsMessage from './LevelsMessage';
import {getAlreadyAwarded, getLevelsCompleted, mintAward} from '../services/ethernautAward'

const MinterComponent = () => {

  const [levelsCompleted, setLevelsCompleted] = useState();
  const [showLevelsCompleted, setShowLevelsCompleted] = useState(false);
  const [alreadyAwarded, setAlreadyAwarded] = useState();
  
  useEffect(() => {
    getLevelsCompleted()
    .then(data => {
      setLevelsCompleted(data);
      setShowLevelsCompleted(true);
    });

    getAlreadyAwarded()
    .then(response => {
      if(response){ 
        setAlreadyAwarded(true);
      }else{
        setAlreadyAwarded(false);
      }
    });

  }, []);

  return (            
      <div>
      { (showLevelsCompleted) ?
        <LevelsMessage levelsCompleted={levelsCompleted}></LevelsMessage> :
        null }
      <Card style={{background: "rgba(50, 50, 50, 1)"}}>
      <Card.Img src={"badges/badge22.jpg"} />
      <Card.Body>
      <Card.Title> 👩🏻‍🚀 Complete 23 levels </Card.Title>
      <div className="d-grid gap-2">            
      { 
        (() => {
        if(levelsCompleted === 23){
          if(alreadyAwarded){
            return <Button onClick={mintAward}>🥇 Receive your award</Button>
          }else{
            return <Button disabled>🥇 Already awarded </Button>
          }          
        }else{
          return <Alert variant="warning"> ⚠ Complete 23 levels to receive</Alert>
        }
        }
        )()
      }
      </div>
      </Card.Body>
      </Card>
      </div>
  )
}

export default MinterComponent
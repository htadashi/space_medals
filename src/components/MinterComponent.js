import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {getAlreadyAwarded, getLevelsCompleted, mintAward} from '../services/ethernautAward'

const MinterComponent = (props) => {

  const [levelsCompleted, setLevelsCompleted] = useState();
  const [alreadyAwarded, setAlreadyAwarded] = useState();

  useEffect(() => {

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        getLevelsCompleted(accounts[0])
        .then(data => {
          setLevelsCompleted(data);
        });
        getAlreadyAwarded(accounts[0])
        .then(response => {
          if(response){ 
            setAlreadyAwarded(true);
          }else{
            setAlreadyAwarded(false);
          }
        });           
      });
    }

  }, []);

  return (            
        <>
        <style type="text/css">
        {`
        .btn-flat {
          background-color: #faf0b9;
          color: white;
        }`}
      </style>      
      <div>
      <Card style={{background: "rgba(50, 50, 50, 1)"}}>
      <Card.Img src={props.badgeSrc}/>
      <Card.Body>
      <Card.Title style={{color: "white"}}> 👩🏻‍🚀 Complete {props.nLevels} level{(props.nLevels > 1)? 's' : null} </Card.Title>
      <div className="d-grid gap-2">            
      { 
        (() => {
        if(levelsCompleted >= props.nLevels){
          if(alreadyAwarded){
            return <Button onClick={mintAward}>🥇 Receive your award</Button>
          }else{
            return <Button disabled>🥇 Already awarded </Button>
          }          
        }else{
          return <Button disabled> ⚠ Complete {props.nLevels} levels to receive</Button>
        }
        }
        )()
      }
      </div>
      </Card.Body>
      </Card>
      </div>
      </>
  )
}

export default MinterComponent
import Alert from 'react-bootstrap/Alert'

const LevelsMessage = ({ levelsCompleted }) => {
    return (
      <div>
      <Alert variant="primary"> Levels completed : {levelsCompleted}</Alert>
      </div>
  )
}

export default LevelsMessage
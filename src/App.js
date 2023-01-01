import { useState } from 'react'
import Joke from './Joke';
import Stories from './Stories';
import Tasks from './Tasks';
import Matrix from './Matrix';

const  App = () => {
  const [userQuery, setUserQuery] = useState('');

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      searchQuery();
    }
  }
  
  const updateUserQuery = event => {
    setUserQuery(event.target.value)
  }


  return (
    <div className="App">
      <h1>Hello, Will!</h1>
      <div className='form'>
        <input 
          value={userQuery} 
          onChange={updateUserQuery} 
          onKeyPress={handleKeyPress}
        />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Tasks />
      <hr />
      <Stories />
      <hr />
      <Matrix />
    </div>
  );
}

export default App;

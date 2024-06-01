import React from 'react';
import './index.scss';
import axios from 'axios';
import { Collection } from './components/Collection';

// axios.get('api').then(data => {
//   console.log(data);
// });

const terrainValue = [
  {
    "name": "Все",
    "value": ""
  },
  {
    "name": "Пустынный ландшафт",
    "value": "desert"
  },
  {
    "name": "Горный ландшафт",
    "value": "mountain"
  },
  {
    "name": "Лесной ландшафт",
    "value": "forest"
  },
  {
    "name": "Джунгли",
    "value": "jungle"
  },
]

function App() {
  const [terrain, setTerrain] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5555/planets${terrain ? `/sorting?terrain=${terrain}` : `?`}`)
      .then((response) => {
        setCollections(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [terrain]);

  return (
    <div className="App">
      <h1>Планеты из вселенной Star Wars</h1>
      <div className="top">
        <ul className="tags">
          {terrainValue.map((obj) => (
            <li
              onClick={() => setTerrain(obj.value)}
              className={terrain === obj.value ? 'active' : ''} key={obj.name}>{obj.name}</li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? (
            <h2>Loading...</h2>
          )
            : (
              Array.isArray(collections) && collections
                .filter(obj => {
                  return obj.name.toLowerCase().includes(searchValue.toLowerCase());
                }).map((obj) => (
                  <Collection
                    key={obj.id}
                    name={obj.name}
                    climate={obj.climate}
                    terrain={obj.terrain}
                    imageUrl={obj.imageUrl}
                    population={obj.population}
                  />
                ))
            )
        }

      </div>
      
    </div>
  );
}

export default App;
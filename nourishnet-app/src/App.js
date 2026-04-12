import './App.css';
import MapView from './components/ryan/MapView';

const sampleLocations = [
  { id: 1, name: 'Capital Area Food Bank', address: '5000 Auth Way, Camp Springs, MD 20746', lat: 38.8106, lng: -76.9078 },
  { id: 2, name: 'Bread of Life Kitchen', address: '4012 Edmonston Rd, Hyattsville, MD 20781', lat: 38.9548, lng: -76.9455 },
  { id: 3, name: 'PG County Food Hub', address: '9201 Basil Ct, Largo, MD 20774', lat: 38.8975, lng: -76.8294 },
];

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-primary-700">NourishNet — MapView Preview</h1>
        <p className="text-neutral-500">PG County food resources</p>
      </header>
      <MapView locations={sampleLocations} />
    </div>
  );
}

export default App;

import CovidDataTable from './components/CovidDataTable'
import './styles/App.scss';
import './styles/CovidDataTable.scss'

function App() {
  return (
    <div>
      <CovidDataTable displayHeader/>
      <CovidDataTable />
    </div>
  );
}

export default App;

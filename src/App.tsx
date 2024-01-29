import reactLogo from './assets/react.svg';
import './App.css';
import DeliveryFeeCalc from './pages/deliveryFeeCalc/DeliveryFeeCalc';

function App() {
  return (
    <>
      <div>
        <a href="https:/knopgm.com" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <DeliveryFeeCalc items={[]} />
    </>
  );
}

export default App;

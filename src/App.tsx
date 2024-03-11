import DeliveryFeeCalc from './pages/deliveryFeeCalc/DeliveryFeeCalc';
import logo from './assets/Rectangle-1Courier-delivery-apps.webp';

import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div className="topImgs">
        <a href="https:/knopgm.com" target="_blank" className="logo-wrapper">
          <img src={logo} className="logo react" alt="React logo" />
        </a>
        {/* <div className="imgYuho-wrapper">
          <img src={imgYuho} className="imgYuho" alt="" />
        </div> */}
      </div>
      <DeliveryFeeCalc />
    </div>
  );
}

export default App;

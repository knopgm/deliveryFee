import DeliveryFeeCalc from './pages/deliveryFeeCalc/DeliveryFeeCalc';
import woltImg from './assets/Wolt-Symbol.png';
// import backgroundWolt from './assets/Portrait_FB_Insta-Yuho_with_woltapp_phone.png';

import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div>
        <div className="backgroundImg-wrapper">
          {/* <img src={backgroundWolt} className="backgroundImg" alt="" /> */}
        </div>
        <div>
          <a href="https:/knopgm.com" target="_blank">
            <img src={woltImg} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
      <DeliveryFeeCalc />
    </div>
  );
}

export default App;

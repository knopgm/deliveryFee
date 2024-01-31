import DeliveryFeeCalc from './pages/deliveryFeeCalc/DeliveryFeeCalc';
import woltImg from './assets/Wolt-Symbol.png';
import imgYuho from './assets/Portrait_FB_Insta-Yuho_with_woltapp_phone.png';

import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div className="topImgs">
        <a href="https:/knopgm.com" target="_blank" className="logo-wrapper">
          <img src={woltImg} className="logo react" alt="React logo" />
        </a>
        <div className="imgYuho-wrapper">
          <img src={imgYuho} className="imgYuho" alt="" />
        </div>
      </div>
      <DeliveryFeeCalc />
    </div>
  );
}

export default App;

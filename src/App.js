import {
  AccountBalanceWalletRounded,
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  SummarizeRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./App.css";
import BannerName from "./Components/BannerName";
// import Footer from "./Components/Footer";
import Header from "./Components/Header";
import MenuContainer from "./Components/MenuContainer";
import MuneCard from "./Components/MuneCard";
import SubMenuContainer from "./Components/SubMenuContainer";
import { MenuItems, Items } from "./Components/Data";
import ItemCard from "./Components/ItemCard";
import DebitCard from "./Components/DebitCard";
import CartItem from "./Components/CartItem";
import { useStateValue } from "./Components/StateProvider";

function App() {
  // main Dish State
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId === "buger01")
  );
  const [{ cart, total }, dispatch] = useStateValue();
  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");
    // console.log(menuLi);
    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }
    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    //MenuCard Active toggle
    function setMenuCardActive() {
      menuCard.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    const menuCard = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenuCard");
    menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));
  }, [isMainData,cart]);

  // set main dish items on filter
  const setData = (itemId) => {
    setMainData(Items.filter((element) => element.itemId === itemId));
  };
  return (
    <div className="App">
      {/* Header Section */}
      <Header />
      {/* Main Container */}

      <main>
        <div className="mainContainer">
          <div className="banner">
            <BannerName name={"Vetri"} discount={"20"} link={"#"} />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
              alt=""
              className="deliveryPic"
            />
          </div>

          {/* dishContainer */}

          <div className="dishContainer">
            <div className="menuCard">
              <SubMenuContainer name={"Menu Category"} />
            </div>
            <div className="rowContainer">
              {MenuItems &&
                MenuItems.map((data) => (
                  <div key={data.id} onClick={() => setData(data.itemId)}>
                    <MuneCard
                      imgSrc={data.imgSrc}
                      name={data.name}
                      isActive={data.id === 1 ? true : false}
                    />
                  </div>
                ))}
            </div>
            <div className="dishitemContainer">
              {isMainData &&
                isMainData.map((data) => (
                  <ItemCard
                    key={data.id}
                    itemId={data.id}
                    imgSrc={data.imgSrc}
                    name={data.name}
                    ratings={data.ratings}
                    price={data.price}
                  />
                ))}
            </div>
          </div>
          <div className="rightMenu">
            <div className="debitCardContainer">
              <div className="debitCard">
                <DebitCard />
              </div>
            </div>  
          
       
            {!cart ? (
            <div className="addSomeItem">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2FemptyCart.png?alt=media&token=50b733d4-cdd9-4025-bffe-8efa4066ca24"
                alt=""
                className="emptyCart"
              />
            </div>
          ) : (
            <div className="cartCheckOutContianer">
              <div className="cartContainer">
                <SubMenuContainer />

                <div className="cartItems">
                  {cart &&
                    cart.map((data) => (
                      <CartItem
                        key={data.id}
                        itemId={data.id}
                        name={data.name}
                        imgSrc={data.imgSrc}
                        qty={"4"}
                        price={data.price}
                      />
                    ))}
                </div>
              </div>
              <div className="totalSection">
                <h3>Total</h3>
                <p>
                  <span>$ </span> {total}
                </p>
              </div>
              <button className="checkOut">Check Out</button>
            </div>
          )}
        </div>
        </div>
      </main>
      {/* Bottom Menu */}

      <div className="bottomMenu">
        <ul id="menu">
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<HomeRounded />} isHome />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<Chat />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<AccountBalanceWalletRounded />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<Favorite />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<SummarizeRounded />} />
          {/* prettier ignore */}
          <MenuContainer link={"#"} icon={<Settings />} />
          <div className="indicator"></div>
        </ul>
      </div>
    </div>
  );
}

export default App;

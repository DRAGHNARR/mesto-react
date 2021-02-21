import React from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardsContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [isSelected, setIsSelected] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsSelected(true);
    setSelectedCard(card);
  }
  
  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsSelected(false);
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user)
      .then((response) => {
        setCurrentUser({
          key: response._id,
          name: response.name,
          desc: response.about,
          pic: response.avatar
        });
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
        setCurrentUser({
          key: "0",
          name: "BIG BADABOOM",
          desc: "SORRY, BUT WE HAVE SOME TROUBLES.",
          pic: "https://s5o.ru/storage/simple/cyber/edt/d1/d9/85/c0/cyberea2fce3ee29.jpg"
        });
      });
  }

  function handleUpdateAvatar(pic) {
    api.setUserPic(pic)
      .then((response) => {
        setCurrentUser({
          key: response._id,
          name: response.name,
          desc: response.about,
          pic: response.avatar
        });
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
        setCurrentUser({
          key: "0",
          name: "BIG BADABOOM",
          desc: "SORRY, BUT WE HAVE SOME TROUBLES.",
          pic: "https://s5o.ru/storage/simple/cyber/edt/d1/d9/85/c0/cyberea2fce3ee29.jpg"
        });
      });
  }

  function handleAddCard({name, pic}) {
    api.setCard(name, pic)
      .then((response) => {
          setCards([response, ...cards]);
          closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleCardLike(card) {
    api.likeCard(card._id, card.likes.some(item => item._id === currentUser.key))
      .then(response => {
        setCards(cards.map(item => {
          return item._id === response._id ? response : item;
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(response => {
        setCards(cards.filter(item => {
          return item._id !== card._id;
        }));
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(response => {
        setCurrentUser({
          key: response[0]._id,
          name: response[0].name,
          desc: response[0].about,
          pic: response[0].avatar
        });
        setCards(response[1]);
      })
      .catch(error => {
        console.log(error);
        setCurrentUser({
          key: "0",
          name: "BIG BADABOOM",
          desc: "SORRY, BUT WE HAVE SOME TROUBLES.",
          pic: "https://s5o.ru/storage/simple/cyber/edt/d1/d9/85/c0/cyberea2fce3ee29.jpg"
        });
        setCards([]);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <div className="page__box">
            <Header/>
            <Main 
              onEditAvatar={handleEditAvatarClick} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onDeletePlace={handleDeletePlaceClick} 
              onCardClick={handleCardClick} 
              setCards={setCards}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}/>
            <Footer/>
          </div>

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdatePic={handleUpdateAvatar}/> 

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}/> 

          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddCard={handleAddCard}/> 

          <PopupWithForm
            name="post_form" 
            title="Вы уверены?" 
            isOpen={isDeletePlacePopupOpen}
            buttonTitle="Да"
            onClose={closeAllPopups}/>
      
          <ImagePopup
            card={selectedCard}
            isSelected={isSelected}
            onClose={closeAllPopups}
          />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

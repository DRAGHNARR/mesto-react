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
      .then((answer) => {
        setCurrentUser({
          key: answer._id,
          name: answer.name,
          desc: answer.about,
          pic: answer.avatar
        });
      });
  }

  function handleUpdateAvatar(pic) {
    api.setUserPic(pic)
      .then((answer) => {
        setCurrentUser({
          key: answer._id,
          name: answer.name,
          desc: answer.about,
          pic: answer.avatar
        });
      });
  }

  function handleAddCard({name, pic}) {
    api.setCard(name, pic)
      .then((answer) => {
          setCards([{
            key: answer._id,
            name: answer.name,
            pic: answer.link,
            likes: answer.likes,
            owner: answer.owner._id,
            deletable: currentUser.key === answer.owner._id,
            liked: answer.likes.some(item => item._id === currentUser.key)
          }, ...cards]);
      });
  }

  function handleCardLike(card) {
    api.likeCard(card.key, card.liked)
      .then(answer => {
        setCards(cards.map(item => {
          return item.key === answer._id ? {
            key: answer._id,
            name: answer.name,
            pic: answer.link,
            likes: answer.likes,
            owner: answer.owner._id,
            deletable: answer._id === currentUser.key,
            liked: answer.likes.some(item => item._id === currentUser.key)
          } : item;
        }));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card.key)
      .then(answer => {
        setCards(cards.filter(item => {
          return item.key !== card.key;
        }));
      });
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(answers => {
        setCurrentUser({
          key: answers[0]._id,
          name: answers[0].name,
          desc: answers[0].about,
          pic: answers[0].avatar
        });

        setCards(answers[1].map((item) => {
          return ({
            key: item._id,
            name: item.name,
            pic: item.link,
            likes: item.likes,
            owner: item.owner._id,
            deletable: answers[0]._id === item.owner._id,
            liked: item.likes.some(item => item._id === answers[0]._id)
          });
        }));
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

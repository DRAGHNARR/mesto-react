import React from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
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
    setSelectedCard({...card, selected: true});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  return (
    <div className="page">
      <div className="page__box">
        <Header/>
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
        <Footer/>
      </div>

      <PopupWithForm 
        name="who_eddit_form" 
        title="Обновить аватар" 
        children={(
          <>
            <input id="who-image" className="popup__input" type="url" name="who_image" required placeholder="Ссылка на картинку"/>
            <span id="who-image-error" className="popup__input-error"></span>
          </>
        )}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}/>

      <PopupWithForm 
        name="who_form" 
        title="Редактировать профиль" 
        children={(
          <>
            <input id="who-title" className="popup__input" type="text" name="who_title" minLength="2" maxLength="40" required placeholder="Ваше имя"/>
            <span id="who-title-error" className="popup__input-error"></span>
            <input id="who-subtitle" className="popup__input" type="text" name="who_subtitle" minLength="2" maxLength="200" required placeholder="Ваше призвание"/>
            <span id="who-subtitle-error" className="popup__input-error"></span>
          </>
        )}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}/>

      <PopupWithForm 
        name="post_form" 
        title="Новое место" 
        children={(
          <>
            <input id="post-title" className="popup__input" type="text" name="post_title"  minLength="2" maxLength="30" required placeholder="Название"/>
            <span id="post-title-error" className="popup__input-error"></span>
            <input id="post-image" className="popup__input" type="url" name="post_image" required placeholder="Ссылка на картинку"/>
            <span id="post-image-error" className="popup__input-error"></span>
          </>
        )}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}/>
  
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
  
      <section className="popup" id="image-delete-popup">
        <div className="popup__box">
          <button className="popup__button-close" type="button"></button>
          <form className="popup__form" method="get" action="index.js" name="post_delete_form">
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="popup__button-save" type="submit">Да</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;

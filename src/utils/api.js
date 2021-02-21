import {apiConfig} from "./consts";

class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.header = headers;
    this.userUrl = baseUrl + "/users/me";
    this.cardUrl = baseUrl + "/cards";
    this.likeUrl = baseUrl + "/cards/likes";
    this.userPicUrl = baseUrl + "/users/me/avatar";
  }

  getUserInfo() {
    return fetch(this.userUrl, {headers: this.header})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  setUserInfo({name, desc}) {
    return fetch(this.userUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        name,
        about: desc
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  setUserPic(pic) {
    return fetch(this.userPicUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        avatar: pic
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  getCards() {
    return fetch(this.cardUrl, {headers: this.header})
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      });
  }

  setCard(name, pic) {
    return fetch(this.cardUrl, {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({
        name: name,
        link: pic
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  deleteCard(id) {
    return fetch(this.cardUrl + "/" + id, {
      method: 'DELETE',
      headers: this.header
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  likeCard(id, isLiked) {
    return fetch(this.likeUrl + "/" + id, {
      method: !isLiked ? 'PUT' : 'DELETE',
      headers: this.header
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }
}

const api = new Api(apiConfig);

export default api;

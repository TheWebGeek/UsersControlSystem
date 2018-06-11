class Customer {
   constructor(id ,firstName , lastName , phone , item) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.item = item ;
   }
}
class UI {
   addUserToList (user) {
      const list = document.querySelector('.tbody');
      //Create tr
      const row = document.createElement('tr');
      //Insert data

      row.innerHTML = `
          <td class='count'></td>
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.phone}</td>
          <td>${user.item}</td>
          <td><a class="btn btn-outline-danger delete">X</a></td>
      `;

      list.appendChild(row);
   }
   showAlert (msg , className) {
      const alert = document.createElement('div');
      alert.className = `alert ${className}`;
      alert.appendChild(document.createTextNode(msg));


      const container = document.querySelector('.container');
      const form = document.querySelector('#form');

      //insert alert
      container.insertBefore(alert , form)
      //timout
      setTimeout(function(){
          document.querySelector('.alert').remove();
      },2000);

   }
   removeUser (target) {
         target.parentElement.parentElement.remove();
   }
   clearFields(){
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('item').value = '';
   }
   clearAll(){
      document.querySelector('.tbody').innerHTML = '';
   }
}
class Store {
   static getUsers() {
      let users ;
      if (localStorage.getItem('users') === null) {
         users = [];
      }else {
         users = JSON.parse(localStorage.getItem('users'));
      }
      return users;
   }
   static displayUsers (){
      const users = Store.getUsers();
      users.forEach(function (user) {
         const ui = new UI;
         // console.log(user);
         ui.addUserToList(user);

      });
   }
   static addUser (user){
      const users = Store.getUsers();
      users.push(user);
      localStorage.setItem('users' ,JSON.stringify(users));
   }
   static removeUsers (id){
      const users = Store.getUsers();
      users.forEach(function (user , index) {
         if (user.id == id) {
            users.splice(index , 1)
         }
         localStorage.setItem('users' ,JSON.stringify(users));
      });
   }
   static clearAll(){
      localStorage.removeItem('users');
   }
}
//Event Listeners
document.addEventListener('DOMContentLoaded' , Store.displayUsers);

document.querySelector('#btn2').addEventListener('click' , function (e) {
   const firstName = document.getElementById('firstName').value,
         lastName = document.getElementById('lastName').value ,
         phone = document.getElementById('phone').value,
         item = document.getElementById('item').value;
   e.preventDefault();
   const allUsers = Store.getUsers();

   var id = 'user_' + Math.random().toString(36).substr(2,9) ;

   const user = new Customer (id,firstName ,lastName , phone , item);

   const ui = new UI();
   //Add user to ui

   if (firstName === '' || lastName === '' || phone === '' || item === '') {
      //Error Alert
      ui.showAlert('Please fill in all fields', 'error');
   }else {
      ui.addUserToList(user);
      ui.showAlert('User added succesfully !' , 'success')
      //Add to localStorage
      Store.addUser(user);
      //display users form localStorage
      ui.clearFields();
      // console.log(user);
   }

});
document.querySelector('.tbody').addEventListener('click' , function functionName(e) {
   // console.log(e.target.parentElement.parentElement);
   const ui = new UI();
   if (e.target.classList.contains('delete')) {
      ui.removeUser(e.target);
      Store.removeUsers(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
   }

})
document.querySelector('#btn3').addEventListener('click' , function () {
   Store.clearAll();

   const ui = new UI ();
   ui.clearAll();
});

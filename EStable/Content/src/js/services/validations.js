(function(){
  "use strict";

  var wizard = angular.module("wizard"),
  validation = function(){
   var maxLength = 150,
   minLength = 2,
   emailPattern= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+/g,
   getMaxLengthMessage = function(){
      var message = "please enter less than " + maxLength + " characters";
      return message;
    },
    getMinLengthMessage = function(){
      var message = "please enter more than " + minLength  + " characters";
      return message;
    },
    getRequiredMessage = function(){
      return "required";
    },
    messages = {
       maxlength: getMaxLengthMessage(),
       minlength: getMinLengthMessage(),
       required: getRequiredMessage()
     };

    return{
      maxLength: maxLength,
      minLength: minLength,
      emailPattern: emailPattern,
      messages: messages
    };
  };
  wizard.service("validation", validation);
}());

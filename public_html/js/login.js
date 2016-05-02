$(function (){
     var APPLICATION_ID = "CFDECE62-F954-CB53-FFFC-8AE2A5150500",
        SECRET_KEY = "3D5326F5-315C-E478-FFFD-0762B5266E00",
        VERSION = "v1";
        
   Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
  
    if(Backendless.UserService.isValidLogin()) {
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    }else{
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);  
   }
          
   $(document).on('submit', '.form-signin', function(event){
       event.preventDefault();
       
       var data = $(this).serializeArray(),
            email = data[0].value,
            password = data[1].value;
            
            Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
  });
  
   $(document).on('click', '.add-blog', function(){
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
        
           $('.main-container').html(addBlogTemplate);    
             
     
  });
       $(document).on('submit', '.form-add-blog', function (event){
         event.preventDefault();
         
         var data = $(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            
           if (title === "") {
           Materialize.toast('Cannot leave title empty!', 4000, 'rounded');
        }
       else if (content === "") {
           Materialize.toast('Cannot leave content empty!', 4000, 'rounded');
       }
       else {
            
        var dataStore = Backendless.Persistence.of(Tasks);
        
        var taskObject = new Tasks({
            title: title,
            content: content,
             authorEmail: Backendless.UserService.getCurrentUser().email
        });
      

        Materialize.toast('Posted', 5000);
        
        dataStore.save(taskObject);
        
        this.title.value = "";
        this.content.value = "";
        
    }
     });
     
     
     $(document).on('click', '.logout', function(){
         Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
         
          var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);  
     
     });
 });

function Tasks(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
    //this.complete = args.complete || false || true;
}

$(document).on('click', '.sign-template ', function(){
     var signScript = $("#sign-up-template").html();
        var signTemplate = Handlebars.compile(signScript);
        $('.main-container').html(signTemplate);  
    
});

$(document).on('click', '.sign-up', function(event){
    
 /*     event.preventDefault();
         
         var data = $(this).serializeArray(),
            email = data[0].value,
            password = data[1].value;
            
           if (email === "") {
           Materialize.toast('Cannot leave email empty!', 4000, 'rounded');
        }
       else if (password === "") {
           Materialize.toast('Cannot leave password empty!', 4000, 'rounded');
       }
       else {
            
        var dataStore = Backendless.Persistence.of(Users);
        
        var user = new Tasks({
            email: email,
            password: pawssword,
             
        });
      

        Materialize.toast('yes', 5000);
        
        dataStore.save(user);
        
        this.email.value = "";
        this.password.value = "";
    }
            
  var user = new Backendless.User();
user.email = email;
user.password = password;

 
Backendless.UserService.register( user, new Backendless.Async( userRegistered, GotError ) );
    
    
    
    
    
    
    console.log("new user");
    var userData;
    if(typeof user == "string"){
        userData = Backendless.Data.of(Backendless.User).findById(user);
    }
    else{
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);*/
});

function userRegistered()
{
  console.log( "user has been registered" );
}
 
function GotError( err ) // see more on error handling
{
  console.log( "error message - " + err.message );
  console.log( "error code - " + err.statusCode );
}




function userLoggedIn(user){
    console.log("user logged in");
    var userData;
    if(typeof user == "string"){
        userData = Backendless.Data.of(Backendless.User).findById(user);
    }
    else{
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}

function userLoggedOut(){
    console.log("logged out");
}

function gotError(error){
    console.log("Error message - " + error.message);
    console.log("Error code - " + error.code);
   Materialize.toast('Login Incorrect', 4000, 'rounded');
}

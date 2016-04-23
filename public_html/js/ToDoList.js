
$(function (){
    var APPLICATION_ID = "CFDECE62-F954-CB53-FFFC-8AE2A5150500",
        SECRET_KEY = "3D5326F5-315C-E478-FFFD-0762B5266E00",
        VERSION = "v1";
        
   Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
   var tasksCollection = Backendless.Persistence.of(Tasks).find();
   
   console.log(tasksCollection);
   
   var wrapper = {
       tasks: tasksCollection.data
       
       
   }; 
   
    $(document).on('click', '.add-blog', function(){
        console.log("DUUUUUUUUUUUDE IT WORKED!!");
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
        
           $('.main-container').html(addBlogTemplate);    });
       
        $(document).on('submit', '.form-add-blog', function (event){
         event.preventDefault();
         
         var data = $(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            
           if (content === "" || title === "") {
           Materialize.toast('Cannot leave title or content empty!', 4000, 'rounded');
        }
       else {
            
        var dataStore = Backendless.Persistence.of(Tasks);
        
        var taskObject = new Tasks({
            title: title,
            content: content,
         //   authorEmail: Backendless.UserService.getCurrentUser().email
        });
        Materialize.toast('Posted', 5000);
        
        dataStore.save(taskObject);
        
        this.title.value = "";
        this.content.value = "";
    }
     });
     
     
   
   Handlebars.registerHelper('format', function (time){
       return moment(time).format("dddd, MMMM Do YYYY"); 
   });
   
   var blogScript = $("#blogs-template").html();
   var blogTemplate = Handlebars.compile(blogScript);
   var blogHTML = blogTemplate(wrapper);
   
   $('.main-container').html(blogHTML);
});

function Tasks(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}


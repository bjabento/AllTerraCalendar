$(document).ready(function() {
    var profilePicture = "profileImages/profile_picture.png"; // Default profile picture URL
    
    $('#editBtn').click(function() {
      $('input').prop('disabled', false);
      $('#editBtn').hide();
      $('#saveBtn').show();
    });
    
    $('#image').change(function() {
      readURL(this);
    });
});
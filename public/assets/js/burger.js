// Don't attach handlers until DOM is loaded.
$(function () {
  $(".change-devour").on("click", function (event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour");

    var newDevourState = {
      devoured: newDevour,
    };

    // PUT request
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState,
    }).then(function () {
      console.log("changed devour to", newDevour);
      // Reload page to get updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim(),
    };

    // POST request
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("created new burger");
      // Reload page to get updated list
      location.reload();
    });
  });

  $(".delete-burger").on("click", function (event) {
    var id = $(this).data("id");

    // DELETE request
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);
      // Reload page to get updated list
      location.reload();
    });
  });
});

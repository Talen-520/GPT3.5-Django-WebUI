$(document).ready(function() {
    $("#chat-form").on("submit", function(e) {
        e.preventDefault();
        var userMessage = $("#user-input").val();
        console.log("User message:", userMessage);
        $("#user-input").val("");
        $("#chat-box").append("<p>User: " + userMessage + "</p>"); //change user or user input partern here

        // Fetch the CSRF token from the meta tag
        var csrfToken = $("meta[name=csrf-token]").attr("content");

        // Include the CSRF token in the AJAX request headers
        $.ajax({
            type: "POST",
            url: "/chat/",
            headers: {
                "X-CSRFToken": csrfToken  // Include the CSRF token in the headers
            },
            data: { message: userMessage },
            success: function(data) {
                var botResponse = data.bot_response;
                $("#chat-box").append("<p>gpt 3.5 assistant: " + botResponse + "</p>");//change bot or bot input partern here
            },
            error: function() {
                console.error("Error in AJAX request");
            }
        });
    });
});

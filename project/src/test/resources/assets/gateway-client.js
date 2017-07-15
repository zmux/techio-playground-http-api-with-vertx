function invoke(e) {
    // No param
    var req = {
        path : "/",
        method : "GET"
    };

    $.ajax({
        dataType: "json",
        method: "POST",
        url: "https://" + window.location.host + "/gateway",
        cache: false,
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(req)
    })
        .done(function(res) {
            var content = "";
            if (res.success) {
                content = "<strong>Status:</strong> " + res["status-code"] + " "
                    + res["status-message"]

                    + "<br/><strong>Headers:</strong><br/>";
                
                content += "<br/><strong>Content:</strong><br/>" + res.body;
                if (res["status-code"] < 400) {
                    $("#result").html("<p class='bg-success result'>" + content + "</p>");
                } else {
                    $("#result").html("<p class='bg-warning result'>" + content + "</p>");
                }
            } else {
                content = res["error"] + ": " + res["reason"];
                $("#result").html("<p class='bg-danger result'>" + content + "</p>");
            }
        })
        .fail(function(jqXHR, textStatus) {
            $("#result").html("<p class='bg-danger result'>Gateway invocation failed with status: " + textStatus +
                "</p>");
        });

    e.preventDefault();
}

$( document ).ready(function() {
    $("#invoke").click(invoke);
});
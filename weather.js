$(document).ready(function () {
    var delay = 2000;

    $('#submitWeather').click(function () {
        var city = $("#city").val();
        if (city != '') {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=908d84ab33ac4de4474fecfff8ce13ea",
                type: "GET",
                dataType: "jsonp",
                beforeSend: function () {
                    $('#loadingmessage').show();
                    $('#loadingtext').show();
                },
                success: function (data) {
                    setTimeout(function() {
                        console.log(data);
                        $('#loadingtext').hide();
                        var widget = show(data);
                        $("#result").html(widget);
                        var keyword = getCondition(data.weather[0].description);
                        console.log(keyword);
                        changeSummaryImage(keyword);
                        $("#city").val('');
                        }, delay);
                        
                }
            });
        } else {
            $("#error").html('Field cannot be empty!');
        }
    });
});

function show(data) {
    return '<div class="top">' +
             '<div>' +
                '<p class="fontbig">' + data.name + " , " + data.sys.country + '</p>' +
                '<p><i>' + data.weather[0].main + '</i></p>' +
             '</div>'+
             '<div>' +
                '<img id="weatherimage" src="images/sunnybanner.jpg" alt="weather icon">' +
             '</div>'+
           '</div>' +
           '<div class="middle">' +
            '<div>' +
            '<p class=" big center">' + data.main.temp + '&deg;F' +
            '</p></div>'+
            '<div>' +
             '<p class="subtitle"><b>Details:</b></p>' +
             '<hr>' +
             '<table>' +
                '<tr>' +
                    '<td><b>Description</b></td>' +
                    '<td><span>' + data.weather[0].description +
                '</span><img class="icon" src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="weather icon">' +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td><b>Wind</b></td>' +
                    '<td>' + data.wind.speed + ' m/s</td>' +
                '</tr>' +
                '<tr>' +
                    '<td><b>Humidity</b></td>' +
                    '<td>' + data.main.humidity + '%</td>' +
                '</tr>' +
                '<tr>' +
                    '<td><b>Precip Pressure</b></td>' +
                    '<td>' + data.main.pressure + 'hPa</td>' +
                '</tr>' +
              '</table>' +
             '</div>' +
            '</div>' +
            '<div class="split">' +
              '<div>' +
                '<img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/logo_OpenWeatherMap_orange.svg" alt="logo">' +
              '</div>'+
              '<div>' +
                '<p></p>' +
              '</div>'+
            '</div>';
}

function getCondition(phrase) {
    if (phrase.includes("cloudy") || phrase.includes("party cloudy") || phrase.includes("overcast") || phrase.includes("few clouds") || phrase.includes("broken clouds")) {
        let keyword = "clouds";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("rain") || phrase.includes("rainny") || phrase.includes("wet weather") || phrase.includes("light rain") || phrase.includes("moderate rain") || phrase.includes("light rain") || phrase.includes("shower rain")) {
        let keyword = "rain";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("Ssnow") || phrase.includes("snowy") || phrase.includes("white weather") || phrase.includes("light snow") || phrase.includes("heavy snow") || phrase.includes("rain and snow") || phrase.includes("sleet")) {
        let keyword = "snow";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("fog") || phrase.includes("foggy") || phrase.includes("mist") || phrase.includes("smoke")|| phrase.includes("haze")) {
        let keyword = "fog";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("clear") || phrase.includes("sunny") || phrase.includes("clear sky")) {
        let keyword = "clear";
        console.log(keyword);
        return keyword;
    }
}

function changeSummaryImage(keyword) {
    switch (keyword) {
        case "clouds":
             weatherimage.setAttribute("src", "images/cloudybanner.png");
            break;
        case "rain":
            weatherimage.setAttribute("src", "images/rainnybanner.png");
            break;
        case "snow":
            weatherimage.setAttribute("src", "images/snowbanner.jpg");
            break;
        case "fog":
            weatherimage.setAttribute("src", "images/foggybanner.jpg");
            break;
        case "clear":
            weatherimage.setAttribute("src", "images/sunnybanner.jpg");
            break;
    }
}

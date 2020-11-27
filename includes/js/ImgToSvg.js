
var svgImages = document.getElementsByClassName('svg');
var l = svgImages.length;
var xhr = [];
var scaleValue = 1.25;
var box = "";
var eleWidth, eleHeight, eleWidthWithScale, eleHeightWithScale, xValue, yValue;
for (var i = 0; i < l; i++) {
    
    if (svgImages[i].getAttribute("class").toLowerCase() === 'location-summary-image svg') {

        (function (i) {
            var self = svgImages[i];
            var parent = self.parentNode;
            var imgID = svgImages[i].id;
            var imgClass = svgImages[i].className;
            var imgURL = svgImages[i].src;
            var svgOuterHTML = "";

            var defaultWidth = 40;

            if (imgURL !== 'undefined') {

                xhr[i] = new XMLHttpRequest();

                xhr[i].open("GET", imgURL, true);
                xhr[i].onreadystatechange = function () {
                    if (xhr[i].readyState == 4 && xhr[i].status == 200) {


                        var returnData = document.createElement("div");
                        returnData.innerHTML = xhr[i].responseText;
                        var svg = returnData.querySelectorAll("svg");

                        // Add replaced image's ID to the new SVG
                        if (typeof imgID !== 'undefined') {

                            svg[0].setAttribute("id", imgID);
                        }

                        // Add replaced image's classes to the new SVG
                        if (typeof imgClass !== 'undefined') {
                            svg[0].setAttribute("class", imgClass + " replaced-svg");

                        }

                        parent.innerHTML = "";
                        parent.appendChild(svg[0]);


                        if (svg[0].querySelectorAll("g").length == 0) {
                            var originBox = svg[0].getBBox();
                            var originViewBox = [originBox.x, originBox.y, originBox.width, originBox.height].join(" ");
                            svg[0].setAttribute("viewBox", originViewBox);
                            box = svg[0].querySelectorAll("path")[0].getBBox();
                            eleWidth = box.width, eleHeight = box.height;
                            scaleValue = defaultWidth / eleWidth;
                            eleWidthWithScale = eleWidth * scaleValue, eleHeightWithScale = eleHeight * scaleValue;
                            xValue = ((eleWidth - (eleWidthWithScale)) / 2) * scaleValue;
                            yValue = ((eleHeight - (eleHeightWithScale)) / 2) * scaleValue;
                            svg[0].setAttribute("width", eleWidthWithScale);
                            svg[0].setAttribute("height", eleHeightWithScale);
                            svg[0].setAttribute("viewBox", xValue + " " + yValue + " " + eleWidthWithScale + " " + eleHeightWithScale);
                            svg[0].querySelectorAll("path")[0].setAttribute("transform", "translate(" + xValue + ", " + yValue + "), scale(" + scaleValue + ")");
                       
                        }
                    }

                    if (i == (l - 1)) {
                        document.getElementById("landing-sublocations").className = "active";
                    }
                };
                xhr[i].send();
            }



        })(i);


    }
}

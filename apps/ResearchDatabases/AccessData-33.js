var researchDataFilePath = '/xmldata/DATA.xml?v=r2rr1e2135zzgzdfEEEEdddffhggjddddd1' + new Date().toJSON().slice(0, 10);
window.onload = function () {
    $("#panel-heading").css({'background-color': 'white', 'padding-top': '15px', 'padding-bottom': '15px'});
    $("#panel-heading-market").css({ 'background-color': 'white', 'padding-top': '8px', 'padding-bottom': '15px' });
    $("#panel-heading-company").css({ 'background-color': 'white', 'padding-top': '8px', 'padding-bottom': '15px' });
    $("#panel-heading-country").css({ 'background-color': 'white', 'padding-top': '8px', 'padding-bottom': '15px' });
    $("#panel-heading-project").css({ 'background-color': 'white', 'padding-top': '8px', 'padding-bottom': '15px' });

    $("#accordion-toggle").css({ 'color': '#0093d0',  'text-decoration': 'none', 'font-size': '1.375em', 'font-family': 'inherit' });
    $("#accordion-toggle-market").css({ 'color': '#0093d0',  'text-decoration': 'none', 'font-size': '1.375em', 'font-family': 'inherit' });
    $("#accordion-toggle-country").css({ 'color': '#0093d0',  'text-decoration': 'none', 'font-size': '1.375em', 'font-family': 'inherit' });
    $("#accordion-toggle-company").css({ 'color': '#0093d0',  'text-decoration': 'none', 'font-size': '1.375em', 'font-family': 'inherit' });
    $("#accordion-toggle-project").css({ 'color': '#0093d0', 'text-decoration': 'none', 'font-size': '1.375em', 'font-family': 'inherit' });

    loadXMLDoc(researchDataFilePath);
};
function loadXMLDoc(url) {

    var xmlhttp;
    var txt, x, xx, i, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"AllDatabasesComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";

            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");

            for (i = 0; i < x.length; i++) {
                dbRsltCount++;
                //  txt = count + " " + "database(s) found" + "</br>"
                txt = txt + "<tbody><tr>";
                xx = x[i].getElementsByTagName("SiteName");
                link = x[i].getElementsByTagName("Url");
                newCompany = x[i].getElementsByTagName("IsNew");
                newCompanyBool = newCompany[0].firstChild.nodeValue;
                newImageSrc = "/apps/researchdatabases/new_small.png";
                {
                    try {

                        txt = txt + "<td>" + "<a  href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                        if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                            txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                        }
                        txt = txt + "</td>";
                    }
                    catch (er) {
                        txt = txt + "<td> </td>";
                    }
                }
                xx = x[i].getElementsByTagName("Description");
                {
                    try {
                        txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                    }
                    catch (er) {
                        txt = txt + "<td> </td>";
                    }
                }
                txt = txt + "</tr>";
            }
            txt = txt + "</tbody></table>";
            if (dbRsltCount == 0) {
                dbtxt = "No database(s) found.";
                document.getElementById('db').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found.";
                document.getElementById('db').innerHTML = dbTxt;
                document.getElementById('info').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLCountryInformation(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"CountryInfoComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("Country");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {
                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";
            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found";
                document.getElementById('dbCountry').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found.";
                document.getElementById('dbCountry').innerHTML = dbTxt;
                document.getElementById('countryInformation').innerHTML = txt;
            }                              
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLProjectLeads(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"ProjectLeadComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("ProjectLead");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {
                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";
            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found";
                document.getElementById('dbProject').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found.";
                document.getElementById('dbProject').innerHTML = dbTxt;
                document.getElementById('projectLead').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLcompanyInformation(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"CompanyInfoComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("Company");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/ResearchDatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";
            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found.";
                document.getElementById('dbCompany').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found.";
                document.getElementById('dbCompany').innerHTML = dbTxt;
                document.getElementById('companyInformation').innerHTML = txt;
            }

        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecCleantech(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"CleantechComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("Cleantech");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";
            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('Cleantech').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"CleantechExport\" onclick=\"mrktSctrCleantechExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('Cleantech').innerHTML = exprtBtnTxt;
                document.getElementById('CleantechExportWord').innerHTML = txt;
            }

        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecConstruction(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"ConstructionComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("Construction");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('Construction').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"ConstructionExport\" onclick=\"mrktSctrConstructionExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('Construction').innerHTML = exprtBtnTxt;
                document.getElementById('ConstructionExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecConsumerProducts(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"ConsumerProdComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("ConsumerProducts");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('ConsumerProducts').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"ConsumerProdExport\" onclick=\"mrktSctrConsumerProductsExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('ConsumerProducts').innerHTML = exprtBtnTxt;
                document.getElementById('ConsumerProductsExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecElectronics(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"ElectronicComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("Electronics");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('Electronics').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"ElectronicExport\" onclick=\"mrktSctrElectronicsExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('Electronics').innerHTML = exprtBtnTxt;
                document.getElementById('ElectronicsExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecEnergy(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"EnergyComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("Energy");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('Energy').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"EnergyExport\" onclick=\"mrktSctrEnergyExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('Energy').innerHTML = exprtBtnTxt;
                document.getElementById('EnergyExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecEngineering(url) {
    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            txt = "<table id=\"EngineeringComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {
                xx = x[i].getElementsByTagName("Engineering");
                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }
            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('Engineering').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"EngineeringExport\" onclick=\"mrktSctrEngineeringExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('Engineering').innerHTML = exprtBtnTxt;
                document.getElementById('EngineeringExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecFinancialServices(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"FinSrvcComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("FinancialServices");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('FinancialServices').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"FinSrvcExport\" onclick=\"mrktSctrFinancialServicesExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('FinancialServices').innerHTML = exprtBtnTxt;
                document.getElementById('FinancialServicesExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecFoodBeverages(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"FoodBvrgsComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("FoodandBeverages");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('FoodBeverages').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"FoodBvrgsExport\" onclick=\"mrktSctrFoodBeveragesExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('FoodBeverages').innerHTML = exprtBtnTxt;
                document.getElementById('FoodBeveragesExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecLifesciencesHealthcare(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"LifeScHealthComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("LifescienceandHealthcare");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('LifesciencesHealthcare').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"LifeScHealthExport\" onclick=\"mrktSctrLifesciencesHealthcareExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('LifesciencesHealthcare').innerHTML = exprtBtnTxt;
                document.getElementById('LifesciencesHealthcareExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecPrintPackaging(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"PrintPckgngComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("PrintandPackaging");
                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }
            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('PrintPackaging').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"PrintPckgngExport\" onclick=\"mrktSctrPrintPackagingExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('PrintPackaging').innerHTML = exprtBtnTxt;
                document.getElementById('PrintPackagingExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecRetail(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"RetailComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("Retail");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('Retail').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"RetailExport\" onclick=\"mrktSctrRetailExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('Retail').innerHTML = exprtBtnTxt;
                document.getElementById('RetailExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecSoftware(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"SoftwareComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {
                xx = x[i].getElementsByTagName("Software");
                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }
            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('Software').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"SoftwareExport\" onclick=\"mrktSctrSoftwareExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('Software').innerHTML = exprtBtnTxt;
                document.getElementById('SoftwareExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function loadXMLmarketSecTelecomsInternetMediaEntertainment(url) {

    var xmlhttp;
    var txt, x, xx, i, trueTxt, TrueTxt, specificTxt, link, newCompany, newCompanyBool, newImageSrc, dbRsltCount = 0, dbTxt, finalTxt;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            txt = "<table id=\"EntertainmentComp\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"70%\"><thead><tr><th>Database</th><th>Description</th></tr></thead>";
            specificTxt = " ";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("Database");
            for (i = 0; i < x.length; i++) {

                xx = x[i].getElementsByTagName("TelecomsInternetMediaEntertainment");


                specificTxt = xx[0].firstChild.nodeValue;
                trueTxt = "true";
                TrueTxt = "True";
                if (((trueTxt.localeCompare(specificTxt)) == 0) || ((TrueTxt.localeCompare(specificTxt)) == 0)) {
                    dbRsltCount++;
                    txt = txt + "<tr>";
                    xx = x[i].getElementsByTagName("SiteName");
                    link = x[i].getElementsByTagName("Url");
                    newCompany = x[i].getElementsByTagName("IsNew");
                    newCompanyBool = newCompany[0].firstChild.nodeValue;
                    newImageSrc = "/apps/researchdatabases/new_small.png";
                    {
                        try {

                            txt = txt + "<td>" + "<a href = \"" + link[0].firstChild.nodeValue + "\"" + " " + "target = \"" + "_blank\">" + xx[0].firstChild.nodeValue + "</a>";
                            if ((newCompanyBool == "true") || (newCompanyBool == "True")) {

                                txt = txt + "<img src=\"" + newImageSrc + "\" alt=\"New Company\">";
                            }
                            txt = txt + "</td>";
                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    xx = x[i].getElementsByTagName("Description");
                    {
                        try {
                            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";

                        }
                        catch (er) {
                            txt = txt + "<td> </td>";
                        }
                    }
                    txt = txt + "</tr>";
                } else {

                    continue;
                }


            }
            txt = txt + "</table>";

            if (dbRsltCount == 0) {
                dbTxt = "No database(s) found."
                document.getElementById('TelecomsInternetMediaEntertainment').innerHTML = dbTxt;
            } else {
                dbTxt = dbRsltCount + " database(s) found." + "</br>";
                finalTxt = dbTxt + txt;
                var btnTxt = " &nbsp;&nbsp;  <button type =\"button\" class=\"btn btn-success\" id=\"EntertainmentExport\" onclick=\"mrktSctrTelecomsInternetMediaEntertainmentExport();\">Export</button>";
                var exprtBtnTxt = finalTxt + btnTxt;
                document.getElementById('TelecomsInternetMediaEntertainment').innerHTML = exprtBtnTxt;
                document.getElementById('TelecomsInternetMediaEntertainmentExportWord').innerHTML = txt;
            }
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
$(document).ready(function () {
    // we call the function
    $("#ProjectLeadExport").click(function (event) {
        $("#projectLead").wordExport();
    });
    $("#CountryInfoExport").click(function (event) {
        $("#countryInformation").wordExport();
    });
    $("#CompanyInfoExport").click(function (event) {
        $("#companyInformation").wordExport();
    });
    $("#AllDatabasesExport").click(function (event) {
        $("#info").wordExport();
    });
});

function mrktSctrCleantechExport() {    
    $("#CleantechExportWord").wordExport();
}
function mrktSctrConstructionExport() {
    $("#ConstructionExportWord").wordExport();
}
function mrktSctrConsumerProductsExport() {
    $("#ConsumerProductsExportWord").wordExport();
}
function mrktSctrElectronicsExport() {
    $("#ElectronicsExportWord").wordExport();
}
function mrktSctrEnergyExport() {
    $("#EnergyExportWord").wordExport();
}
function mrktSctrFinancialServicesExport() {
    $("#FinancialServicesExportWord").wordExport();
}
function mrktSctrFoodBeveragesExport() {
    $("#FoodBeveragesExportWord").wordExport();
}
function mrktSctrLifesciencesHealthcareExport() {
    $("#LifesciencesHealthcareExportWord").wordExport();
}
function mrktSctrPrintPackagingExport() {
    $("#PrintPackagingExportWord").wordExport();
}
function mrktSctrEngineeringExport() {
    $("#EngineeringExportWord").wordExport();
}
function mrktSctrRetailExport() {
    $("#RetailExportWord").wordExport();
}
function mrktSctrSoftwareExport() {
    $("#SoftwareExportWord").wordExport();
}
function mrktSctrTelecomsInternetMediaEntertainmentExport() {
    $("#TelecomsInternetMediaEntertainmentExportWord").wordExport();
}

// * function for exporting html table to excel 
// * works for all browsers
// * but gives the warning before opening the document.
//function fnExcelReport(category) {
//    var tableID = category;
//    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
//    var textRange; var j = 0;
//    tab = document.getElementById(tableID); // id of table

//    for (j = 0 ; j < tab.rows.length ; j++) {
//        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
//        //tab_text=tab_text+"</tr>";
//    }

//    tab_text = tab_text + "</table>";
//    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
//    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
//    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

//    var ua = window.navigator.userAgent;
//    var msie = ua.indexOf("MSIE ");

//    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
//    {
//        txtArea1.document.open("application/x-msexcel", "replace");
//        txtArea1.document.write(tab_text);
//        txtArea1.document.close();
//        txtArea1.focus();
//        sa = txtArea1.document.execCommand("SaveAs", true, "Report.xls");
//    }
//    else                 //other browser not tested on IE 11
//        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

//    return (sa);
//}



























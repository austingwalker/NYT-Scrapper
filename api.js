

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var queryTerm = "";
var numResults = 0;
var startingYear = 0;
var endingYear = 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

var articleCounter = 0;

function runQuery(numArticles, queryURL){

    $.ajax({url: queryURL, method: "GET"})
    .done(function(NYTData){

        $(".article-view").empty()

        for(var i = 0; i < numArticles; i++){
        // for(var i = 0; i < NYTData.response.docs.length; i++){



            var articleCard = $("<div>");
            articleCard.addClass("card articleBox");
            articleCard.attr('id', 'articleCard-' + i);
            

            $(".article-view").append(articleCard);

            if(NYTData.response.docs[i].headline != null){
                console.log(NYTData.response.docs[i].headline.main);
                $("#articleCard-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>")
            }

        
            
            if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
                console.log(NYTData.response.docs[i].byline.original);
                $("#articleCard-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>")
            }
            else {

                $("#articleCard-" + i).append("<h6>Not Found</h6>")

            }

            
            if(NYTData.response.docs[i].pub_date != undefined){
                console.log(NYTData.response.docs[i].pub_date);
                $("#articleCard-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>")
            }
            else {

                $("#articleCard-" + i).append("<h6>Not Found</h6>")

            }
            
           if(NYTData.response.docs[i].web_url != undefined){
            console.log(NYTData.response.docs[i].web_url);
            $("#articleCard-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>")
           }
           else {
            $("#articleCard-" + i).append("<h6>Not Found</h6>")
           }

          
        }

        console.log(queryURL);
        console.log(NYTData);
        console.log(numArticles);

    })

    
}

$(".search").on("click", function(){

 queryTerm = $("#search-terms").val().trim();
 

 var newURL = queryURLBase + "&q=" + queryTerm;


 numResults = $("#number-records").val();


 startingYear = $("#start-year").val().trim();
 endingYear = $("#end-year").val().trim();

 if (parseInt(startingYear)){
    
    startingYear = startingYear + "0101";
    newURL = newURL + "&begin_date=" + startingYear
 }

 if (parseInt(endingYear)){

    endingYear = endingYear + "0101";
    newURL = newURL + "&end_date=" + endingYear;
 }

    runQuery(numResults, newURL);

    return false;
})

$(document).on("click", ".clear", function(e){

    $("#search-terms").empty();
    $("#number-records").empty();
    $("#start-year").empty();
    $("#end-year").empty();
    $("#article-view").empty();
})






//First draft below
//-------------------------------------------

// $(document).on("click", ".search", function(e){

//     e.preventDefault();

//     var term = $("#search-terms").val();
//     var records = $("#number-records").val();
//     var start = $("#start-year").val();
//     var end = $("#end-year").val();

//     // var numbRecords = parseInt(records);
//     // var startYear = parseInt(start);
//     // var endYear = parseInt(end);

//     start = start + '0101';
//     end = end + '0101';


//     console.log(term);
//     console.log(records);
//     console.log(start);
//     console.log(end);
//     // console.log(term);
//     // console.log(numbRecords);
//     // console.log(startYear);
//     // console.log(endYear);

//     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//     url += '?' + $.param({
//       'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
//       'q': term,
//       'page': records,
//       'begin_date': start,
//       'end_date': end

//     });

//     console.log(url);

//     $.ajax({
//       url: url,
//       method: 'GET',
//     }).done(function(result) {
//       console.log(result);

//       var articles = $("<div id='articlesDisplay'>");

//       for(var i = 0; i < result.response.docs.length; i++){
  

//         console.log(result.response.docs[i]);

//         var title = $("<h2 id='title'>").text(result.response.docs[i].headline.main);

//         var author = $("<p>").text(result.response.docs[i].byline.original);

//         var published = $("<h2>").text(result.response.docs[i].pub_date);

//         var websiteBox = $("<div id='contentSplit'>")

//         var website = $("<a>").text(result.response.docs[i].web_url);
//         website.attr("href", result.response.docs[i].web_url);

//         websiteBox.append(website);

//         console.log("-----");
//         console.log(title);
//         console.log(author);
//         console.log(published);
//         console.log(website);



//           articles.append(title);
//           articles.append(author);
//           articles.append(published);
//           articles.append(websiteBox);
//           $(".article-view").append(articles);
//       }



//     }).fail(function(err) {
//       throw err;
//     });

   


//     })

// $(document).on("click", ".clear", function(e){

//     $("#search-terms").empty();
//     $("#number-records").empty();
//     $("#start-year").empty();
//     $("#end-year").empty();
//     $("#article-view").empty();
// })








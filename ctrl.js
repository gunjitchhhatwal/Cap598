var app = angular.module('mining', []);
app.controller('myCtrl', function ($scope) {

    $scope.result = {};

    $scope.setRes = function () {
        $scope.result = {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            7: -1,
            8: -1,
            9: -1,
        };

        $scope.showCuisines = [];
    }

    $scope.showCuisines = [];

    $scope.complete = function () {
        $("#query").autocomplete({ source: cuisines });
    }

    $scope.size = function (obj) {        
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }

    $scope.findfood = function () {
        $scope.setRes();
        cuisine = $("#query").val();
        compareType = $("input[name=compareType]:checked").val();
        scale = $("#scale").val();
        var cuisineIndex = cuisines.indexOf(cuisine);
        if (cuisineIndex !== -1) {
            $scope.lookup(compareType, cuisineIndex);
            $scope.showResults(scale);
        } else {
            alert("Please select a valid cuisine!");
        }
    }

    $scope.findMostSimilar = function (similarties, cuisineIndex) {
        //find top 5 highest values
        var res = $scope.result;
        var simLength = similarties.length;
        var resLength = $scope.size(res);
        for (var i = 0; i < simLength; i++) {
            if (i === cuisineIndex) {
                continue;
            }
            for (var j = 0; j < resLength; j++) {
                if (res[j] === -1 || similarties[res[j]] < similarties[i]) {
                    res[j] = i;
                    break;
                }
            }
        }
    }

    $scope.findLeastSimilar = function (similarties, cuisineIndex) {
        //find bottom 5 lowest values
        var res = $scope.result;
        var simLength = similarties.length;
        var resLength = $scope.size(res);
        for (var i = 0; i < simLength; i++) {
            if (i === cuisineIndex) {
                continue;
            }
            for (var j = 0; j < resLength; j++) {
                if (res[j] === -1 || similarties[res[j]] > similarties[i]) {
                    res[j] = i;
                    break;
                }
            }
        }
    }

    $scope.showResults = function (scale) {
        //return cuisines for these indices
        var res = $scope.result;
        scale = parseInt(scale)
        scale = 5 - scale
        var temp = []
        max = scale + 5
        for (var key in res) {
            temp.push(cuisines[res[key]]);
        }
        $scope.showCuisines = temp.slice(scale, max);
    }

    $scope.lookup = function (compareType, cuisineIndex) {
        //get similarties for cuisine
        similarities = matrix[cuisineIndex];
        if (compareType === "same") {
            $scope.findMostSimilar(similarities, cuisineIndex);
        }
        else {
            $scope.findLeastSimilar(similarities, cuisineIndex);
        }
    }

});

var cuisines = ['American(Traditional)',
    'Chinese',
    'AsianFusion',
    'Mexican',
    'American(New)',
    'Italian',
    'Japanese',
    'Tex-Mex',
    'MiddleEastern',
    'Mediterranean',
    'Lebanese',
    'Indian',
    'Steakhouses',
    'Barbeque',
    'Greek',
    'Caribbean',
    'Thai',
    'Southern',
    'Fish&Chips',
    'LatinAmerican',
    'Salvadoran',
    'Pakistani',
    'British',
    'Vegetarian',
    'Kosher',
    'French',
    'Polish',
    'Vegan',
    'Hawaiian',
    'Cuban',
    'Russian',
    'Irish',
    'Vietnamese',
    'Korean',
    'Arabian',
    'Peruvian',
    'Mongolian',
    'German',
    'Filipino',
    'Cantonese',
    'Taiwanese',
    'Argentine',
    'Moroccan',
    'Ethiopian',
    'African',
    'Indonesian',
    'Turkish',
    'Afghan',
    'Spanish',
    'Basque',
    'Brazilian',
    'Laotian',
    'Szechuan',
    'Belgian',
    'Malaysian',
    'Singaporean',
    'Burmese',
    'Scandinavian',
    'Canadian(New)',
    'Czech',
    'Slovakian',
    'Scottish',
    'ModernEuropean',
    'Bangladeshi',
    'Portuguese',
    'Ukrainian',
    'Shanghainese',
    'Cambodian',
    'Venezuelan',
    'Colombian',
    'Dominican',
    'Australian',
    'Egyptian']
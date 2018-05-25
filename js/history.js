// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.
function buildHistoryPopupDom(divName, data) {
    var tbody = document.getElementById(divName);
    for (var i = 0, ie = data.length; i < ie; ++i) {
        // Create row tag
        var tableRow = document.createElement('tr');

        // Create items for rows
        var index = document.createElement('td');
        var lastTime = document.createElement('td');
        var address = document.createElement('td');
        var title = document.createElement('td');
        var typedCount = document.createElement('td');
        var visitCount = document.createElement('td');
        var id = document.createElement('td');

        // Populate tags with text
        index.append(String(i+1));
        address.append(data[i].url);
        lastTime.append(data[i].lastVisitTime);
        title.append(data[i].title);
        typedCount.append(data[i].typedCount);
        visitCount.append(data[i].visitCount);
        id.append(data[i].id);

        // Attach to DOM
        tbody.appendChild(tableRow);
        tableRow.appendChild(index);
        tableRow.appendChild(typedCount);
        tableRow.appendChild(visitCount);
        tableRow.appendChild(id);
        tableRow.appendChild(lastTime);
        tableRow.appendChild(title);
        tableRow.appendChild(address);
    }
}

function getVisitInfo(data){
    for (var i = 0, ie = data.length; i < ie; ++i) {
        chrome.history.getVisits({
            'url': data[i].url
        }, 
        function(visits){
            //console.log(visits);
        })
    }
}

function buildHistoryTableBody(divName) {
    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var microsecondsPerDay = 1000 * 60 * 60 * 24;
    
    var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
    var oneDayAgo = (new Date).getTime() - microsecondsPerDay

    chrome.history.search({
        'text': '',              // Return every history item....
        'startTime': oneDayAgo  // that was accessed less than one week ago.
    },
    function(historyItems) {
        getVisitInfo(historyItems)
        buildHistoryPopupDom(divName, historyItems);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    buildHistoryTableBody("history-table-body"); //where to put table
});
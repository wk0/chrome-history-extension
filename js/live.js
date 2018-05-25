// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var currentHistory = [];

// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.
function buildLivePopupDom(divName, data, callback) {
    var tbody = document.getElementById(divName);

    if(!data || data.length < 1) callback();
    for (var i = 0, ie = data.length; i < ie; ++i) {
        // Create row tag
        var tableRow = document.createElement('tr');

        // Create items for rows
        var index = document.createElement('td');
        var click = document.createElement('td');
        var typing = document.createElement('td');
        var scroll = document.createElement('td');
        var x = document.createElement('td');
        var y = document.createElement('td');
        var time = document.createElement('td');
        var title = document.createElement('td');
        var address = document.createElement('td');

        // Populate tags with text
        index.append(String(i+1));
        click.append(data[i].click);
        typing.append(data[i].typing);
        scroll.append(data[i].scroll);
        x.append(data[i].x);
        y.append(data[i].y);
        time.append(data[i].time);
        title.append(data[i].title);
        address.append(data[i].address);

        // Attach to DOM
        tbody.appendChild(tableRow);
        tableRow.appendChild(index);
        tableRow.appendChild(click);
        tableRow.appendChild(typing);
        tableRow.appendChild(scroll);
        tableRow.appendChild(x);
        tableRow.appendChild(y);
        tableRow.appendChild(time);
        tableRow.appendChild(title);
        tableRow.appendChild(address);
    }
    callback();
}

function buildLiveTableBody(divName) {

    // var items = [
    //     {
    //         click : false,
    //         typing: false,
    //         scroll: false,
    //         x: '0',
    //         y: '1',
    //         time : '1231',
    //         title: 'Bitcoin plunges',
    //         address : 'www.coindesk.com'
    //     }
    // ]

    chrome.storage.local.get(['HISTORY_SELLER'], function(result) {
        var history =  result['HISTORY_SELLER'];
        buildLivePopupDom(divName, history, function(){
        });
    });


}

document.addEventListener('DOMContentLoaded', function () {
    buildLiveTableBody("live-table-body"); 
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        buildLiveTableBody("live-table-body"); 
    });
});



/**
 * @author Kutsan Kaplan <me@kutsankaplan.com>
 *         http://kutsankaplan.com
 *         22.05.2016
 */

function updateTime()
{
    var d = new Date();
    var h = checkTime(d.getHours());
    var m = checkTime(d.getMinutes());
    var s = checkTime(d.getSeconds());

    document.getElementById("hex").innerHTML = "#" + h + m + s;
    
    chrome.storage.sync.get(
        {
            "font": "Roboto",
            "size": 250,
            "padding": 19,
            "custombg": "Default"
        }, function (items)
        {
            if (!chrome.runtime.error)
            {
                document.getElementById("hex").style.fontFamily = items.font;
                document.getElementById("hex").style.fontSize = items.size + "px";
                document.getElementById("hex").style.paddingTop = items.padding + "vh";

                if (/([0-9A-F]{6}$)|([0-9A-F]{3}$)/i.test(items.custombg))
                {
                    document.body.style.backgroundColor = "#" + items.custombg;
                } else
                {
                    document.body.style.backgroundColor = "#" + h + m + s;
                }
            }
        }
    );

    setTimeout(function ()
    {
        updateTime();
    }, 500);
}

document.body.onload = function ()
{
    updateTime();
};

function checkTime(i)
{
    if (i < 10)
        i = "0" + i;
    return i;
}

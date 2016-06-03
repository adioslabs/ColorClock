/**
 * @author Kutsan Kaplan
 *         http://kutsankaplan.com
 *         22/05/16
 */

function updateTime()
{
    var d = new Date();
    var h = checkTime(d.getHours());
    var m = checkTime(d.getMinutes());
    var s = checkTime(d.getSeconds());

    document.getElementById("hex").innerHTML = "#" + h + m + s;
    document.body.style.backgroundColor = "#" + h + m + s;

    /**
     * Her 500ms'de bir sync biriminden girdileri cagirir ve uygular.
     */
    chrome.storage.sync.get(
        {
            "font": "Roboto",
            "size": 250,
            "padding": 19
        }, function (items)
        {
            if (!chrome.runtime.error)
            {
                document.getElementById("hex").style.fontFamily = items.font;
                document.getElementById("hex").style.fontSize = items.size + "px";
                document.getElementById("hex").style.paddingTop = items.padding + "vh";
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

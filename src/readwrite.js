/**
 * @author Kutsan Kaplan
 *         http://kutsankaplan.com
 *         02/06/16
 */

var OPfontFamily;
var OPfontSize;
var OPpaddingTop;

/**
 * Save butonuna bastiktan sonra kullanicidan alinan input
 * verilerini sync birimine yollar.
 */
function save_options()
{
    // ...
    OPfontSize = document.getElementById("op-font-size").value;
    OPpaddingTop = document.getElementById("op-padding-top").value;
    OPfontFamily = document.getElementById("op-font-family").value;

    chrome.storage.sync.set(
        {
            "font": OPfontFamily,
            "size": OPfontSize,
            "padding": OPpaddingTop
        }, function ()
        {
            Materialize.toast('Options saved.', 2000);
        });
}

/**
 * Varsayilan degerleri uygular ve sync birimine yollar.
 */
function reset_options()
{
    chrome.storage.sync.set(
        {
            // Real values
            "font": "Roboto",
            "size": 250,
            "padding": 19
        }, function ()
        {
            // ...
            document.getElementById("op-font-size").value = 250;
            document.getElementById("op-padding-top").value = 19;
            document.getElementById("op-font-family").value = "Roboto";
            Materialize.toast('Done', 2000);
        });
}

/**
 * Pop-up acildiginda sync biriminden gelen input girdilerini
 * okur ve range-field'lara yazar.
 */
document.body.onload = function ()
{
    chrome.storage.sync.get(
        {
            "font": "Roboto",
            "size": 250,
            "padding": 19
        }, function (items)
        {
            if (!chrome.runtime.error)
            {
                document.getElementById("op-font-family").value = items.font;
                document.getElementById("op-font-size").value = items.size;
                document.getElementById("op-padding-top").value = items.padding;
            }
        }
    );
};

document.getElementById("save-button").addEventListener('click', save_options);
document.getElementById("reset-button").addEventListener('click', reset_options);
/**
 * @author Kutsan Kaplan
 *         http://kutsankaplan.com
 *         02/06/16
 */

var OPfontFamily;
var OPfontSize;
var OPpaddingTop;
var OPcustomBgColor;

/**
 * Save butonuna bastiktan sonra kullanicidan alinan input
 * verilerini sync birimine yollar.
 */
function save_options()
{
    OPfontSize = document.getElementById("op-font-size").value;
    OPpaddingTop = document.getElementById("op-padding-top").value;

    if (document.getElementById("op-font-family").value.length != 0)
        OPfontFamily = document.getElementById("op-font-family").value;

    if (document.getElementById("op-custom-bg-color").value.length != 0)
        OPcustomBgColor = document.getElementById("op-custom-bg-color").value.toUpperCase();

    chrome.storage.sync.set(
        {
            "font": OPfontFamily,
            "size": OPfontSize,
            "padding": OPpaddingTop,
            "custombg": OPcustomBgColor
        }, function ()
        {
            Materialize.toast('Options saved.', 1500);
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
            "padding": 19,
            "custombg": "Default"
        }, function ()
        {
            document.getElementById("op-font-size").value = 250;
            document.getElementById("op-padding-top").value = 19;
            document.getElementById("op-font-family").value = "Roboto";
            document.getElementById("op-custom-bg-color").value = "Default";

            Materialize.toast('Defaults loaded.', 1500);
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
            "padding": 19,
            "custombg": "Default"
        }, function (items)
        {
            if (!chrome.runtime.error)
            {
                document.getElementById("op-font-family").value = items.font;
                document.getElementById("op-font-size").value = items.size;
                document.getElementById("op-padding-top").value = items.padding;
                document.getElementById("op-custom-bg-color").value = items.custombg;
            }
        }
    );
};

document.getElementById("save-button").addEventListener('click', save_options);
document.getElementById("reset-button").addEventListener('click', reset_options);